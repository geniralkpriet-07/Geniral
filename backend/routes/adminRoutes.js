import express from "express";
import { approveEvent, rejectEvent, updateEvent, deleteEvent, getAllEventsAdmin, getAllUsers, deleteUser, getOverviewAnalytics, getAllRegistrations, getEventRegistrations, createStudent } from "../controllers/adminController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken, requireAdmin);

router.put("/events/:id/approve", approveEvent);
router.put("/events/:id/reject", rejectEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);
router.get("/events", getAllEventsAdmin);
router.get("/events/:id/registrations", getEventRegistrations);

router.get("/users", getAllUsers);
router.post("/users", createStudent);
router.delete("/users/:id", deleteUser);

router.get("/analytics/overview", getOverviewAnalytics);
router.get("/registrations", getAllRegistrations);

export default router;
