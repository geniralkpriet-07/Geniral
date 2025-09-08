import express from "express";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";
import { loginRateLimit } from "../config/security.js";
import {
  login,
  verifyToken,
  getDashboard,
  resetUsers,
  resetPassword,
  requestPasswordReset,
  verifyOTP,
  testDB
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/test-db", testDB);
router.post("/login", loginRateLimit, login);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/verify", authenticateToken, verifyToken);
router.get("/api/admin/dashboard", authenticateToken, requireAdmin, getDashboard);
router.delete("/reset-users", resetUsers);

export default router;
