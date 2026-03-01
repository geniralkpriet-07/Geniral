import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getClubs,
  createClub,
  updateJoinCount,
  deleteClub
} from "../controllers/clubController.js";

const router = express.Router();

router.get("/", getClubs);
router.post("/", authenticateToken, createClub);
router.post("/:clubId/join", updateJoinCount);
router.delete("/:id", authenticateToken, deleteClub);

export default router;