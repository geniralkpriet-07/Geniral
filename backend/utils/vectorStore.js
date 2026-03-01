import { QdrantClient } from "@qdrant/js-client-rest";
import axios from "axios";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const client = new QdrantClient({
    url: process.env.QDRANT_URL || "http://localhost:6333",
});

const COLLECTION_NAME = "campus_hub";
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL || "nomic-embed-text";
const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";

// Helper: Convert MongoDB ID to a format Qdrant likes (UUID-ish)
const formatId = (id) => {
    const hex = id.toString();
    // MongoDB ID is 24 chars. UUID is 32 chars + 4 dashes.
    // We can pad the 24 hex chars to 32 and format as UUID.
    const padded = hex.padEnd(32, '0');
    return `${padded.slice(0, 8)}-${padded.slice(8, 12)}-${padded.slice(12, 16)}-${padded.slice(16, 20)}-${padded.slice(20, 32)}`;
};

export const initVectorStore = async () => {
    try {
        const collections = await client.getCollections();
        const exists = collections.collections.some((c) => c.name === COLLECTION_NAME);

        if (!exists) {
            // Determine vector size dynamically by calling Ollama once
            const testEmbed = await getEmbedding("test");
            const vectorSize = testEmbed.length;

            await client.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: vectorSize,
                    distance: "Cosine",
                },
                optimizer_config: {
                    default_segment_number: 2
                },
                replication_factor: 1, // Long term: increase for production
            });
            console.log(`Qdrant collection '${COLLECTION_NAME}' created with size ${vectorSize}.`);
        }
    } catch (error) {
        console.error("Vector Store Init Error (Check if Qdrant is running):", error.message);
    }
};

export const getEmbedding = async (text) => {
    try {
        const response = await axios.post(`${OLLAMA_HOST}/api/embeddings`, {
            model: EMBEDDING_MODEL,
            prompt: text,
        });
        return response.data.embedding;
    } catch (error) {
        console.error("Ollama Embedding Error:", error.message);
        throw new Error("Failed to generate embeddings. Is Ollama running?");
    }
};

export const upsertToVectorStore = async (id, text, metadata) => {
    try {
        const vector = await getEmbedding(text);
        await client.upsert(COLLECTION_NAME, {
            wait: true,
            points: [
                {
                    id: formatId(id),
                    vector: vector,
                    payload: {
                        text,
                        ...metadata,
                        updatedAt: new Date().toISOString()
                    },
                },
            ],
        });
    } catch (error) {
        // We log but don't throw to prevent blocking the main DB operation
        console.error(`Vector Upsert Failed for ${id}:`, error.message);
    }
};

export const removeFromVectorStore = async (id) => {
    try {
        await client.delete(COLLECTION_NAME, {
            points: [formatId(id)],
        });
    } catch (error) {
        console.error(`Vector Delete Failed for ${id}:`, error.message);
    }
};

export const searchContext = async (query, limit = 5, scoreThreshold = 0.5) => {
    try {
        const vector = await getEmbedding(query);
        const results = await client.search(COLLECTION_NAME, {
            vector: vector,
            limit: limit,
            with_payload: true,
            score_threshold: scoreThreshold // Only return relevant results
        });

        if (results.length === 0) return "No specific information found in campus records.";

        return results.map((r, i) => `[Result ${i + 1}]: ${r.payload.text}`).join("\n\n");
    } catch (error) {
        console.error("Vector Search Error:", error.message);
        return "";
    }
};
