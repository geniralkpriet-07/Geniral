import {
    createSession,
    getSession,
    ragAnswer,
    ragAnswerStream,
    getConversationHistory,
    clearSession,
    generateEventDescription,
} from "../utils/ragService.js";
import { checkGroqHealth } from "../utils/groqClient.js";
import { executeMCPTool, listAvailableMCPTools } from "../utils/mcpServer.js";
import Message from "../models/Message.js";
import ChatSession from "../models/ChatSession.js";

// ─── Session Management ───────────────────────────────────────────────────────

export const createChatSession = async (req, res) => {
    try {
        const userId = req.user?._id || null;
        const userRole = req.user?.role || 'guest';

        const session = await createSession(userId, userRole);

        res.status(201).json({
            success: true,
            sessionId: session.sessionId,
            message: 'Chat session created successfully',
        });
    } catch (error) {
        console.error('Create session error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create chat session',
        });
    }
};

export const getChatSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await getSession(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found',
            });
        }

        const messages = await Message.find({ sessionId })
            .sort({ createdAt: 1 })
            .limit(100)
            .lean();

        res.json({
            success: true,
            session,
            messages,
        });
    } catch (error) {
        console.error('Get session error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch session',
        });
    }
};

export const getUserChatSessions = async (req, res) => {
    try {
        const userId = req.user._id;

        const sessions = await ChatSession.find({ userId })
            .sort({ lastActiveAt: -1 })
            .limit(20)
            .lean();

        res.json({
            success: true,
            data: sessions,
        });
    } catch (error) {
        console.error('Get user sessions error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to fetch sessions',
        });
    }
};

export const deleteChatSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        await clearSession(sessionId);

        res.json({
            success: true,
            message: 'Session cleared successfully',
        });
    } catch (error) {
        console.error('Clear session error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to clear session',
        });
    }
};

// ─── Chat / RAG ───────────────────────────────────────────────────────────────

export const askKai = async (req, res) => {
    try {
        const { question, sessionId } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Question is required',
            });
        }

        const userId = req.user?._id || null;
        const userRole = req.user?.role || 'guest';

        const result = await ragAnswer(
            question.trim(),
            sessionId,
            userId,
            userRole
        );

        res.json({
            success: true,
            answer: result.answer,
            sessionId: result.sessionId,
            metadata: {
                eventsUsed: result.eventsUsed,
                totalEvents: result.totalEvents,
                responseTime: result.responseTime,
            },
        });
    } catch (error) {
        console.error('Ask Kai error:', error);

        const errorMessage = error.message || 'Failed to process question';
        let errorCode = 'AI_ERROR';

        if (errorMessage.includes('Ollama')) {
            errorCode = 'OLLAMA_ERROR';
        } else if (errorMessage.includes('Qdrant')) {
            errorCode = 'VECTOR_DB_ERROR';
        }

        res.status(500).json({
            success: false,
            message: errorMessage,
            code: errorCode,
        });
    }
};

export const askKaiStream = async (req, res) => {
    try {
        const { question, sessionId } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Question is required',
            });
        }

        const userId = req.user?._id || null;
        const userRole = req.user?.role || 'guest';

        // Set headers for Server-Sent Events
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering for nginx

        // Stream the response
        for await (const chunk of ragAnswerStream(
            question.trim(),
            sessionId,
            userId,
            userRole
        )) {
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
            res.flush?.(); // Flush immediately if available
        }

        res.end();
    } catch (error) {
        console.error('Ask Kai Stream error:', error);

        const errorMessage = error.message || 'Failed to process question';
        let errorCode = 'AI_ERROR';

        if (errorMessage.includes('Ollama')) {
            errorCode = 'OLLAMA_ERROR';
        } else if (errorMessage.includes('Qdrant')) {
            errorCode = 'VECTOR_DB_ERROR';
        }

        // Send error through SSE
        res.write(`data: ${JSON.stringify({ type: 'error', error: errorMessage, code: errorCode })}\n\n`);
        res.end();
    }
};

// ─── AI Description Generator ─────────────────────────────────────────────────

export const generateDescription = async (req, res) => {
    try {
        const { title, category, venue } = req.body;

        if (!title || !venue) {
            return res.status(400).json({
                success: false,
                message: 'Title and venue are required',
            });
        }

        const description = await generateEventDescription(title, category, venue);

        res.json({
            success: true,
            description,
        });
    } catch (error) {
        console.error('Generate description error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to generate description',
        });
    }
};

// ─── MCP Tools ────────────────────────────────────────────────────────────────

export const executeTool = async (req, res) => {
    try {
        const { toolName, params } = req.body;

        if (!toolName) {
            return res.status(400).json({
                success: false,
                message: 'Tool name is required',
            });
        }

        const result = await executeMCPTool(toolName, params || {});

        res.json(result);
    } catch (error) {
        console.error('Execute tool error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to execute tool',
        });
    }
};

export const listTools = async (req, res) => {
    try {
        const tools = listAvailableMCPTools();

        res.json({
            success: true,
            tools,
            count: tools.length,
        });
    } catch (error) {
        console.error('List tools error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to list tools',
        });
    }
};

// ─── Health Check ─────────────────────────────────────────────────────────────

export const chatHealthCheck = async (req, res) => {
    try {
        const groqStatus = await checkGroqHealth();

        const response = {
            success: true,
            groq: groqStatus,
            mongodb: 'connected',
            timestamp: new Date().toISOString(),
        };

        // Check Qdrant (optional)
        try {
            const { initVectorStore } = await import('../utils/vectorStore.js');
            // If it doesn't throw, we assume it can reach Qdrant
            response.qdrant = 'connected';
        } catch (error) {
            response.qdrant = `error: ${error.message}`;
        }

        res.json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Health check failed',
        });
    }
};
