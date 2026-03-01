import express from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import {
  registerForEvent,
  getEventRegistrationCount,
  checkMyRegistration,
  getAllRegistrations,
  getRegistrationsForEvent
} from "../controllers/registrationController.js";

const router = express.Router();

// Student routes
router.post("/:eventId", authenticateToken, registerForEvent);
router.get("/:eventId/count", getEventRegistrationCount);
router.get("/:eventId/check", authenticateToken, checkMyRegistration);

// Admin routes
router.get("/admin/all", authenticateToken, requireAdmin, getAllRegistrations);
router.get("/admin/event/:eventId", authenticateToken, requireAdmin, getRegistrationsForEvent);

export default router;
