import express from "express";
import { createEvent, getAllApprovedEvents, getSingleEvent, registerForEvent, getMyEvents, getEventCount, checkRegistration, getReferralCount } from "../controllers/eventController.js";
import { authenticateToken, requireStudent } from "../middleware/auth.js";
import upload from "../utils/cloudinary.js";

const router = express.Router();

router.post("/", authenticateToken, requireStudent, upload.single('poster'), createEvent);
router.get("/", getAllApprovedEvents);
router.get("/my-events", authenticateToken, getMyEvents);
router.get("/:id", getSingleEvent);
router.post("/:id/register", authenticateToken, registerForEvent);
router.get("/:id/count", getEventCount);
router.get("/:id/check", authenticateToken, checkRegistration);
router.get("/:id/referrals/:userId", getReferralCount);

export default router;