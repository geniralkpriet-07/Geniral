import axios from "axios";
import { searchContext } from "../utils/vectorStore.js";
import dotenv from "dotenv";

dotenv.config();

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const CHAT_MODEL = process.env.CHAT_MODEL || "qwen2.5:3b";

export const askKai = async (req, res) => {
    try {
        const { question } = req.body;
        const context = await searchContext(question);

        const systemPrompt = `You are Kai, a helpful and friendly campus guide. 
    Use the following campus context to answer the user's question accurately. 
    If you don't know the answer based on context, say you're not sure but offer to help find out.
    CONTEXT:
    ${context}
    Be concise, helpful, and friendly.`;

        const response = await axios.post(`${OLLAMA_HOST}/api/chat`, {
            model: CHAT_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: question }
            ],
            stream: false,
        });

        res.json({ success: true, answer: response.data.message.content });
    } catch (error) {
        res.status(500).json({ success: false, message: "Kai is offline" });
    }
};

export const generateDescription = async (req, res) => {
    try {
        const { title, venue } = req.body;
        const systemPrompt = "You are a creative marketing expert for college events. Generate a catchy 3-sentence description.";
        const userPrompt = `Event: ${title} at ${venue}.`;

        const response = await axios.post(`${OLLAMA_HOST}/api/chat`, {
            model: CHAT_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            stream: false,
        });

        res.json({ success: true, description: response.data.message.content });
    } catch (error) {
        res.status(500).json({ success: false, message: "AI Generator error" });
    }
};
