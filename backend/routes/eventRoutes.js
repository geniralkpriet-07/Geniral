import express from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getFeaturedEvents
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/events/featured", getFeaturedEvents);
router.get("/events/:id", getEventById);
router.post("/events", authenticateToken, requireAdmin, createEvent);
router.put("/events/:id", authenticateToken, requireAdmin, updateEvent);
router.delete("/events/:id", authenticateToken, requireAdmin, deleteEvent);

export default router;