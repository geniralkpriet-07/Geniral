import express from "express";
import { getStudentAnalytics } from "../controllers/studentController.js";
import { authenticateToken, requireStudent } from "../middleware/auth.js";

const router = express.Router();

router.get("/analytics", authenticateToken, requireStudent, getStudentAnalytics);

export default router;
