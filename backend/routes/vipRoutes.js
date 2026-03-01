import express from "express";
import {
  getMyVipCard,
  getMyTotalReferralCount,
  verifyQrToken,
  adminGetAllVipRewards,
  adminIssueVipReward,
  adminRevokeVipReward,
  getRewardTypes,
} from "../controllers/vipController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Student
router.get("/my-card", authenticateToken, getMyVipCard);
router.get("/my-referral-count", authenticateToken, getMyTotalReferralCount);

// Public QR verify (event organizer scans)
router.get("/verify/:qrToken", verifyQrToken);

// Admin
router.get("/reward-types", authenticateToken, requireAdmin, getRewardTypes);
router.get("/admin/all", authenticateToken, requireAdmin, adminGetAllVipRewards);
router.post("/admin/issue/:userId", authenticateToken, requireAdmin, adminIssueVipReward);
router.put("/admin/revoke/:rewardId", authenticateToken, requireAdmin, adminRevokeVipReward);

export default router;
