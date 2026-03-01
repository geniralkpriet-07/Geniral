import { QdrantClient } from "@qdrant/js-client-rest";
import { generateEmbedding } from "./groqClient.js";
import dotenv from "dotenv";

dotenv.config();

const client = new QdrantClient({
    url: process.env.QDRANT_URL || "http://localhost:6333",
});

const COLLECTION_NAME = "campus_hub";
const VECTOR_SIZE = 384; // Matches MiniLM-L6-v2 used in groqClient.js

/**
 * Sync MongoDB ID to Qdrant compatible UUID format
 */
const formatId = (id) => {
    const hex = id.toString();
    const padded = hex.padEnd(32, '0');
    return `${padded.slice(0, 8)}-${padded.slice(8, 12)}-${padded.slice(12, 16)}-${padded.slice(16, 20)}-${padded.slice(20, 32)}`;
};

export const initVectorStore = async () => {
    try {
        const collections = await client.getCollections();
        const exists = collections.collections.some((c) => c.name === COLLECTION_NAME);

        if (!exists) {
            await client.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: VECTOR_SIZE,
                    distance: "Cosine",
                },
            });
            console.log(`✅ Qdrant collection '${COLLECTION_NAME}' created.`);
        }
    } catch (error) {
        console.error("❌ Qdrant Init Error:", error.message);
    }
};

export const upsertToVectorStore = async (id, text, metadata) => {
    try {
        const vector = await generateEmbedding(text);
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
        console.log(`✅ Indexed into vector store: ${metadata.title || id}`);
    } catch (error) {
        console.error(`❌ Vector Upsert Failed:`, error.message);
    }
};

export const searchSimilarEvents = async (queryEmbedding, limit = 8) => {
    try {
        const results = await client.search(COLLECTION_NAME, {
            vector: queryEmbedding,
            limit: limit,
            with_payload: true,
        });

        // Return in a clean format that ragService expects
        return results.map(r => ({
            id: r.payload.id || r.payload.eventId || r.id, // Support different payload structures
            payload: r.payload,
            score: r.score
        }));
    } catch (error) {
        console.error("❌ Vector Search Error:", error.message);
        return [];
    }
};

export const removeFromVectorStore = async (id) => {
    try {
        await client.delete(COLLECTION_NAME, {
            points: [formatId(id)],
        });
    } catch (error) {
        console.error(`❌ Vector Delete Failed:`, error.message);
    }
};
export const searchContext = async (query, limit = 5, scoreThreshold = 0.5) => {
    try {
        const vector = await generateEmbedding(query);
        const results = await client.search(COLLECTION_NAME, {
            vector: vector,
            limit: limit,
            with_payload: true,
            score_threshold: scoreThreshold
        });

        if (results.length === 0) return "No specific information found in campus records.";

        return results.map((r, i) => `[Result ${i + 1}]: ${r.payload.text}`).join("\n\n");
    } catch (error) {
        console.error("Vector Search Error:", error.message);
        return "";
    }
};
