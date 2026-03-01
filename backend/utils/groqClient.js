import Groq from "groq-sdk";
import { pipeline } from '@xenova/transformers';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL_NAME = process.env.GROQ_CHAT_MODEL || "llama-3.3-70b-versatile";

let groqClient = null;
let embeddingPipeline = null;

export const getGroqClient = () => {
    if (!groqClient) {
        groqClient = new Groq({ apiKey: GROQ_API_KEY });
    }
    return groqClient;
};

// Local embedding generation (replaces Ollama embeddings)
export const generateEmbedding = async (text) => {
    try {
        if (!embeddingPipeline) {
            embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        }
        const output = await embeddingPipeline(text, { pooling: 'mean', normalize: true });
        return Array.from(output.data);
    } catch (error) {
        console.error('❌ Embedding error:', error.message);
        throw new Error(`Local embedding generation failed: ${error.message}`);
    }
};

export const generateChatCompletion = async (messages, options = {}) => {
    const client = getGroqClient();
    try {
        const response = await client.chat.completions.create({
            model: MODEL_NAME,
            messages,
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 8192,
            top_p: options.top_p || 1,
            stream: false,
        });
        return response.choices[0]?.message?.content || "";
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
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 8192,
            top_p: options.top_p || 1,
            stream: true,
        });
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) yield content;
        }
    } catch (error) {
        console.error('❌ Groq streaming error:', error.message);
        throw new Error(`Groq streaming failed: ${error.message}`);
    }
};

export const checkGroqHealth = async () => {
    try {
        // Simple call to check key validity
        const client = getGroqClient();
        await client.models.list();
        return { online: true, model: MODEL_NAME };
    } catch (error) {
        return { online: false, error: error.message };
    }
};
