import Event from "../models/Event.js";
import ChatSession from "../models/ChatSession.js";
import Message from "../models/Message.js";
import { generateEmbedding, generateChatCompletion, generateChatCompletionStream } from "../utils/groqClient.js";
import { searchSimilarEvents } from "../utils/vectorStore.js";
import { v4 as uuidv4 } from 'uuid';

// ─── Memory Management ────────────────────────────────────────────────────────

export const createSession = async (userId = null, userRole = 'guest') => {
    const session = await ChatSession.create({
        sessionId: uuidv4(),
        userId,
        userRole,
        title: 'New Chat',
        lastActiveAt: new Date(),
    });
    return session;
};

export const getSession = async (sessionId) => {
    return await ChatSession.findOne({ sessionId }).lean();
};

export const getOrCreateSession = async (sessionId, userId = null, userRole = 'guest') => {
    if (sessionId) {
        const existing = await ChatSession.findOne({ sessionId });
        if (existing) {
            existing.lastActiveAt = new Date();
            await existing.save();
            return { session: existing, created: false };
        }
    }
    const session = await createSession(userId, userRole);
    return { session, created: true };
};

export const getConversationHistory = async (sessionId, limit = 10) => {
    const messages = await Message.find({ sessionId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

    return messages.reverse().map(m => ({
        role: m.role,
        content: m.content,
    }));
};

export const saveMessage = async (sessionId, role, content, userId = null, metadata = {}) => {
    const message = await Message.create({
        sessionId,
        role,
        content,
        userId,
        metadata,
    });

    // Update session message count
    await ChatSession.updateOne(
        { sessionId },
        {
            $inc: { messageCount: 1 },
            lastActiveAt: new Date(),
        }
    );

    return message;
};

export const clearSession = async (sessionId) => {
    // Delete all messages in the session
    await Message.deleteMany({ sessionId });
    // Delete the session itself
    await ChatSession.deleteOne({ sessionId });
};

// ─── RAG Pipeline ─────────────────────────────────────────────────────────────

const formatEvent = (event, index) => {
    const date = new Date(event.eventDate);
    const dateStr = date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return `[EVENT ${index + 1}]
Title: ${event.title}
Category: ${event.category?.replace(/_/g, ' ') || 'General'}
Department: ${event.department || 'All Departments'}
Date & Time: ${dateStr}
Venue: ${event.venue}
Description: ${event.description || 'No description available'}
Tags: ${event.tags?.join(', ') || 'None'}
${event.registrationLink ? `Registration: ${event.registrationLink}` : ''}
`;
};

const buildSystemPrompt = (eventsContext, userRole) => {
    const roleInfo = userRole === 'admin'
        ? "You have admin privileges and can provide detailed event management information."
        : "You're helping a student find and understand campus events.";

    return `You are Kai, a helpful and intelligent campus event assistant with memory. ${roleInfo}

CAMPUS EVENTS DATABASE:
${eventsContext}

INSTRUCTIONS:
- Answer using ONLY the events listed above. Never invent events.
- Remember our conversation history - refer back to previous messages when relevant.
- If the user says "that one", "it", or similar, use conversation context to understand.
- Provide full details (date, venue, registration) when asked about specific events.
- Format event listings clearly and readably.
- If asked about event creation, registration, or management, guide users appropriately.
- Be concise, friendly, and student-appropriate.
- If no relevant event matches, suggest: "I don't see that event right now. You can check back later or create a new event!"

Current date: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}`;
};

export const ragAnswer = async (question, sessionId, userId = null, userRole = 'guest') => {
    const startTime = Date.now();

    try {
        // 1. Get or create session
        const { session } = await getOrCreateSession(sessionId, userId, userRole);

        // 2. Generate embedding for query
        const queryEmbedding = await generateEmbedding(question);

        // 3. Search similar events in Qdrant
        const similarEvents = await searchSimilarEvents(queryEmbedding, 8);

        // 4. Fetch full event details from MongoDB
        const eventIds = similarEvents.map(r => r.id);
        const events = await Event.find({ _id: { $in: eventIds }, status: 'approved' })
            .sort({ eventDate: 1 })
            .lean();

        // 5. Build context
        const eventsContext = events.length > 0
            ? events.map(formatEvent).join('\n\n')
            : 'No campus events are currently available in the database.';

        // 6. Get conversation history
        const history = await getConversationHistory(session.sessionId, 8);

        // 7. Build messages for LLM
        const messages = [
            { role: 'system', content: buildSystemPrompt(eventsContext, userRole) },
            ...history,
            { role: 'user', content: question },
        ];

        // 8. Generate response with Ollama
        const answer = await generateChatCompletion(messages, {
            temperature: 0.7,
            num_ctx: 4096,
        });

        // 9. Save messages
        await saveMessage(session.sessionId, 'user', question, userId);
        await saveMessage(session.sessionId, 'assistant', answer, userId, {
            eventsUsed: eventIds.map(id => id.toString()),
            responseTime: Date.now() - startTime,
        });

        return {
            answer,
            sessionId: session.sessionId,
            eventsUsed: events.length,
            totalEvents: await Event.countDocuments({ status: 'approved' }),
            responseTime: Date.now() - startTime,
        };
    } catch (error) {
        console.error('❌ RAG pipeline error:', error);
        throw error;
    }
};

export const generateEventDescription = async (title, category, venue) => {
    try {
        const prompt = `Generate a compelling 2-3 sentence description for this campus event:

Title: ${title}
Category: ${category?.replace(/_/g, ' ') || 'General'}
Venue: ${venue}

Description should be:
- Exciting and engaging for students
- Professional but friendly tone
- Highlight key benefits of attending
- Be specific to the category

Generate ONLY the description, no extra text:`;

        const messages = [
            { role: 'system', content: 'You are a creative campus event copywriter. Generate concise, engaging event descriptions.' },
            { role: 'user', content: prompt },
        ];

        const description = await generateChatCompletion(messages, {
            temperature: 0.8,
            num_ctx: 512,
        });

        return description.trim();
    } catch (error) {
        console.error('❌ Description generation error:', error);
        throw error;
    }
};

// ─── Streaming RAG Pipeline ────────────────────────────────────────────────────

export const ragAnswerStream = async function* (question, sessionId, userId = null, userRole = 'guest') {
    const startTime = Date.now();
    let fullAnswer = '';

    try {
        // 1. Get or create session
        const { session } = await getOrCreateSession(sessionId, userId, userRole);

        // Yield session ID immediately
        yield { type: 'session', sessionId: session.sessionId };

        // 2. Generate embedding for query
        const queryEmbedding = await generateEmbedding(question);

        // 3. Search similar events in Qdrant
        const similarEvents = await searchSimilarEvents(queryEmbedding, 8);

        // 4. Fetch full event details from MongoDB
        const eventIds = similarEvents.map(r => r.id);
        const events = await Event.find({ _id: { $in: eventIds }, status: 'approved' })
            .sort({ eventDate: 1 })
            .lean();

        // Yield metadata
        yield {
            type: 'metadata',
            eventsUsed: events.length,
            eventIds: eventIds.map(id => id.toString()),
        };

        // 5. Build context
        const eventsContext = events.length > 0
            ? events.map(formatEvent).join('\n\n')
            : 'No campus events are currently available in the database.';

        // 6. Get conversation history
        const history = await getConversationHistory(session.sessionId, 8);

        // 7. Build messages for LLM
        const messages = [
            { role: 'system', content: buildSystemPrompt(eventsContext, userRole) },
            ...history,
            { role: 'user', content: question },
        ];

        // 8. Stream response from Ollama
        for await (const chunk of generateChatCompletionStream(messages, {
            temperature: 0.7,
            num_ctx: 4096,
        })) {
            fullAnswer += chunk;
            yield { type: 'content', content: chunk };
        }

        // 9. Save messages after streaming completes
        await saveMessage(session.sessionId, 'user', question, userId);
        await saveMessage(session.sessionId, 'assistant', fullAnswer, userId, {
            eventsUsed: eventIds.map(id => id.toString()),
            responseTime: Date.now() - startTime,
        });

        // 10. Yield completion
        yield {
            type: 'done',
            responseTime: Date.now() - startTime,
            totalEvents: await Event.countDocuments({ status: 'approved' }),
        };
    } catch (error) {
        console.error('❌ RAG streaming error:', error);
        yield { type: 'error', error: error.message };
    }
};
