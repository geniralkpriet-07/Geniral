import express from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import { uploadClub } from "../utils/cloudinary.js";
import {
  getClubs,
  getClub,
  createClub,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";

const router = express.Router();

// Public
router.get("/", getClubs);
router.get("/:id", getClub);

// Admin only
router.post("/", authenticateToken, requireAdmin, uploadClub.single('poster'), createClub);
router.put("/:id", authenticateToken, requireAdmin, uploadClub.single('poster'), updateClub);
router.delete("/:id", authenticateToken, requireAdmin, deleteClub);

export default router;
