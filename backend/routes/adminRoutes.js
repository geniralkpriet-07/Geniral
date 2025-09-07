import express from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import { 
  getAllEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getAllUsers,
  toggleUserStatus,
  deleteUser
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/events", authenticateToken, requireAdmin, getAllEvents);
router.post("/events", authenticateToken, requireAdmin, createEvent);
router.put("/events/:id", authenticateToken, requireAdmin, updateEvent);
router.delete("/events/:id", authenticateToken, requireAdmin, deleteEvent);

router.get("/users", authenticateToken, requireAdmin, getAllUsers);
router.patch("/users/:id/toggle-status", authenticateToken, requireAdmin, toggleUserStatus);
router.delete("/users/:id", authenticateToken, requireAdmin, deleteUser);

export default router;