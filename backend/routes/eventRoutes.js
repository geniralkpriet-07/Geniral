import express from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import { cacheMiddleware } from '../middleware/cache.js';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getFeaturedEvents
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/events", cacheMiddleware(3600), getAllEvents);
router.get("/events/featured", cacheMiddleware(3600), getFeaturedEvents);
router.get("/events/:id", cacheMiddleware(3600), getEventById);
router.post("/events", authenticateToken, requireAdmin, createEvent);
router.put("/events/:id", authenticateToken, requireAdmin, updateEvent);
router.delete("/events/:id", authenticateToken, requireAdmin, deleteEvent);

export default router;