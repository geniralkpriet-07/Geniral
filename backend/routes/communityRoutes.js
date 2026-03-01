import express from "express";
import { getAllCommunities, createCommunity, joinCommunity, deleteCommunity } from "../controllers/communityController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllCommunities);
router.post("/:id/join", authenticateToken, joinCommunity);

// Admin only
router.post("/", authenticateToken, requireAdmin, createCommunity);
router.delete("/:id", authenticateToken, requireAdmin, deleteCommunity);

export default router;
