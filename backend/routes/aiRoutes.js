import express from "express";
import { askKai, generateDescription } from "../controllers/aiController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/ask", askKai);
router.post("/generate-description", authenticateToken, generateDescription);

export default router;
