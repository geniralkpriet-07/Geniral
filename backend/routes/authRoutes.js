import express from "express";
import { register, verifyOTP, login, forgotPassword, resetPassword, getMe } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";
import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many auth attempts, please try again in 15 mins" }
});

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/verify-otp", authLimiter, verifyOTP);
router.post("/login", authLimiter, login);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);
router.get("/me", authenticateToken, getMe);

export default router;
