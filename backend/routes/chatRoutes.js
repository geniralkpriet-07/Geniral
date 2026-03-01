import express from "express";
import {
    createChatSession,
    getChatSession,
    getUserChatSessions,
    deleteChatSession,
    askKai,
    askKaiStream,
    generateDescription,
    executeTool,
    listTools,
    chatHealthCheck,
} from "../controllers/chatController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────

// Health check
router.get("/health", chatHealthCheck);

// Create session (public or authenticated)
router.post("/session", (req, res, next) => {
    // Make auth optional - if token exists, attach user, otherwise continue
    if (req.headers.authorization) {
        return authenticateToken(req, res, next);
    }
    next();
}, createChatSession);

// Get session and messages (public)
router.get("/session/:sessionId", getChatSession);

// Clear session
router.delete("/session/:sessionId", deleteChatSession);

// Ask Kai (public or authenticated)
router.post("/ask", (req, res, next) => {
    // Make auth optional
    if (req.headers.authorization) {
        return authenticateToken(req, res, next);
    }
    next();
}, askKai);

// Ask Kai with streaming (public or authenticated)
router.post("/ask/stream", (req, res, next) => {
    // Make auth optional
    if (req.headers.authorization) {
        return authenticateToken(req, res, next);
    }
    next();
}, askKaiStream);

// Generate event description
router.post("/generate-description", generateDescription);

// MCP Tools
router.post("/tools/execute", executeTool);
router.get("/tools/list", listTools);

// ─── Authenticated Routes ─────────────────────────────────────────────────────

// Get user's chat sessions
router.get("/my-sessions", authenticateToken, getUserChatSessions);

export default router;
