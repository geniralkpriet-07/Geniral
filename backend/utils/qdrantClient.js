import { QdrantClient } from '@qdrant/js-client-rest';

const QDRANT_URL = process.env.QDRANT_URL || 'http://localhost:6333';
const COLLECTION_NAME = 'campus_events';
const VECTOR_SIZE = 384; // all-minilm embedding dimension

let qdrantClient = null;

export const getQdrantClient = () => {
    if (!qdrantClient) {
        qdrantClient = new QdrantClient({ url: QDRANT_URL });
    }
    return qdrantClient;
};

export const initializeCollection = async () => {
    const client = getQdrantClient();
    
    try {
        // Check if collection exists
        const collections = await client.getCollections();
        const exists = collections.collections.some(c => c.name === COLLECTION_NAME);
        
        if (!exists) {
            await client.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: VECTOR_SIZE,
                    distance: 'Cosine',
                },
            });
            console.log(`✅ Qdrant collection created: ${COLLECTION_NAME}`);
        } else {
            console.log(`✅ Qdrant collection already exists: ${COLLECTION_NAME}`);
        }
        
        return true;
    } catch (error) {
        console.error('❌ Qdrant initialization error:', error.message);
        return false;
    }
};

export const addEventToVector = async (eventId, embedding, metadata = {}) => {
    const client = getQdrantClient();
    
    try {
        await client.upsert(COLLECTION_NAME, {
            wait: true,
            points: [
                {
                    id: eventId.toString(),
                    vector: embedding,
                    payload: {
                        eventId: eventId.toString(),
                        ...metadata,
                    },
                },
            ],
        });
        
        return true;
    } catch (error) {
        console.error('❌ Qdrant upsert error:', error.message);
        return false;
    }
};

export const searchSimilarEvents = async (queryEmbedding, limit = 5) => {
    const client = getQdrantClient();
    
    try {
        const results = await client.search(COLLECTION_NAME, {
            vector: queryEmbedding,
            limit,
            with_payload: true,
        });
        
        return results.map(r => ({
            id: r.payload.eventId,
            score: r.score,
            ...r.payload,
        }));
    } catch (error) {
        console.error('❌ Qdrant search error:', error.message);
        return [];
    }
};

export const deleteEventFromVector = async (eventId) => {
    const client = getQdrantClient();
    
    try {
        await client.delete(COLLECTION_NAME, {
            wait: true,
            points: [eventId.toString()],
        });
        
        return true;
    } catch (error) {
        console.error('❌ Qdrant delete error:', error.message);
        return false;
    }
};

export const checkQdrantHealth = async () => {
    const client = getQdrantClient();
    
    try {
        const collections = await client.getCollections();
        return {
            online: true,
            collections: collections.collections.map(c => c.name),
        };
    } catch (error) {
        return {
            online: false,
            error: error.message,
        };
    }
};

export { COLLECTION_NAME };
