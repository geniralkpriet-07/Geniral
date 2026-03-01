import Groq from 'groq-sdk';
import { pipeline } from '@xenova/transformers';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL_NAME = process.env.GROQ_CHAT_MODEL || 'llama-3.3-70b-versatile';

let groqClient = null;
let embeddingPipeline = null;

export const getGroqClient = () => {
    if (!groqClient) {
        if (!GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY is not set in environment variables');
        }
        groqClient = new Groq({ apiKey: GROQ_API_KEY });
    }
    return groqClient;
};

const getEmbeddingPipeline = async () => {
    if (!embeddingPipeline) {
        embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    return embeddingPipeline;
};

export const generateChatCompletion = async (messages, options = {}) => {
    const client = getGroqClient();
    
    try {
        const response = await client.chat.completions.create({
            model: MODEL_NAME,
            messages,
            stream: false,
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 2048,
            top_p: options.top_p || 0.9,
            ...options,
        });
        
        return response.choices[0]?.message?.content || '';
    } catch (error) {
        console.error('❌ Groq chat error:', error.message);
        throw new Error(`Groq generation failed: ${error.message}`);
    }
};

export const generateChatCompletionStream = async function* (messages, options = {}) {
    const client = getGroqClient();
    
    try {
        const stream = await client.chat.completions.create({
            model: MODEL_NAME,
            messages,
            stream: true,
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 2048,
            top_p: options.top_p || 0.9,
            ...options,
        });
        
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                yield content;
            }
        }
    } catch (error) {
        console.error('❌ Groq streaming error:', error.message);
        throw new Error(`Groq streaming failed: ${error.message}`);
    }
};

export const generateEmbedding = async (text) => {
    try {
        const pipe = await getEmbeddingPipeline();
        const result = await pipe(text, { pooling: 'mean', normalize: true });
        return Array.from(result.data);
    } catch (error) {
        console.error('❌ Embedding generation error:', error.message);
        throw new Error(`Embedding generation failed: ${error.message}`);
    }
};

export const checkGroqHealth = async () => {
    const client = getGroqClient();
    
    try {
        const models = await client.models.list();
        const availableModels = models.data.map(m => m.id);
        const hasMainModel = availableModels.includes(MODEL_NAME);
        
        return {
            online: true,
            mainModel: hasMainModel ? MODEL_NAME : 'not found',
            availableModels,
        };
    } catch (error) {
        return {
            online: false,
            error: error.message,
        };
    }
};

export { MODEL_NAME };
