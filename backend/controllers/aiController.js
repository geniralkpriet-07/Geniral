import { searchContext } from "../utils/vectorStore.js";
import { generateChatCompletion } from "../utils/groqClient.js";

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

        const answer = await generateChatCompletion([
            { role: "system", content: systemPrompt },
            { role: "user", content: question }
        ]);

        res.json({ success: true, answer });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ success: false, message: "Kai is offline" });
    }
};

export const generateDescription = async (req, res) => {
    try {
        const { title, venue } = req.body;
        const systemPrompt = "You are a creative marketing expert for college events. Generate a catchy 3-sentence description.";
        const userPrompt = `Event: ${title} at ${venue}.`;

        const description = await generateChatCompletion([
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]);

        res.json({ success: true, description });
    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ success: false, message: "AI Generator error" });
    }
};

// ─── EURI Image Generation ───────────────────────────────────────────────────

const buildPosterPrompt = ({ title, eventDate, venue, description }) => {
    let prompt = `Create a stunning event poster for: "${title}"`;
    if (eventDate) prompt += ` | Date: ${eventDate}`;
    if (venue) prompt += ` | Venue: ${venue}`;
    if (description) prompt += ` | About: ${description.substring(0, 150)}`;
    prompt += `. Style: Bold typography, vibrant colors, clean layout, portrait poster, college campus aesthetic.`;
    return prompt;
};

const callEuriImageAPI = async (prompt) => {
    const apiKey = process.env.EURI_IMAGE_API_KEY;
    const model = process.env.EURI_IMAGE_MODEL || 'gemini-3-pro-image-preview';
    const baseURL = process.env.EURI_BASE_URL || 'https://api.euron.one/api/v1/euri';

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    try {
        const response = await fetch(`${baseURL}/images/generations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ model, prompt, n: 1, size: '1024x1024' }),
            signal: controller.signal,
        });
        clearTimeout(timeout);

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(`EURI API ${response.status}: ${text.substring(0, 200)}`);
        }

        const data = await response.json();
        const imageUrl = data.data?.[0]?.url;
        if (!imageUrl) throw new Error('No image URL in EURI response');
        return imageUrl;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
};

export const generatePoster = async (req, res) => {
    const { title, eventDate, venue, description } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Event title is required.' });
    }
    if (!process.env.EURI_IMAGE_API_KEY) {
        return res.status(500).json({ success: false, message: 'EURI_IMAGE_API_KEY not configured.' });
    }

    const prompt = buildPosterPrompt({ title, eventDate, venue, description });
    console.log(`[generate-poster] "${title}"`);

    try {
        const imageUrl = await callEuriImageAPI(prompt);
        res.json({ success: true, imageUrl });
    } catch (err) {
        console.error('[generate-poster] Error:', err?.message);
        if (err.name === 'AbortError') {
            return res.status(504).json({ success: false, message: 'Image generation timed out. Please try again.' });
        }
        res.status(500).json({ success: false, message: err?.message || 'Poster generation failed.' });
    }
};
