import VipReward, { REWARD_TYPES, REWARD_KEYS } from "../models/VipReward.js";
import Registration from "../models/Registration.js";
import User from "../models/User.js";
import { sendVipRewardEmail } from "../utils/emailService.js";

const APP_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// ─── Get total referral count for a user (across all events) ─────────────────

export const getMyTotalReferralCount = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const count = await Registration.countDocuments({
      referredBy: { $regex: `-${userId}$` },
    });
    res.json({ success: true, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const pickRandomReward = () => {
  const key = REWARD_KEYS[Math.floor(Math.random() * REWARD_KEYS.length)];
  const reward = REWARD_TYPES[key];
  return { rewardType: key, rewardTitle: reward.title, rewardDescription: reward.description };
};

export const autoAssignVipReward = async (referrerId) => {
  if (!referrerId) return null;

  // Check if already has a reward
  const existing = await VipReward.findOne({ userId: referrerId, isActive: true });
  if (existing) return null;

  // Count how many referrals this user has made (across all events)
  const count = await Registration.countDocuments({
    referrer: referrerId,
  });

  if (count < 3) return null;

  // Auto-assign a random reward
  const { rewardType, rewardTitle, rewardDescription } = pickRandomReward();
  const reward = await VipReward.create({
    userId: referrerId,
    rewardType,
    rewardTitle,
    rewardDescription,
    issuedBy: null,
  });

  // Send congratulations email
  try {
    const user = await User.findById(referrerId).select('name email').lean();
    if (user?.email) {
      const meta = REWARD_TYPES[rewardType] || {};
      await sendVipRewardEmail({
        name: user.name || 'Student',
        email: user.email,
        rewardTitle,
        rewardDescription,
        icon: meta.icon || '🏅',
        vipCardUrl: `${APP_URL}/dashboard/vip-card`,
      });
    }
  } catch (e) {
    console.error('VIP reward email error:', e.message);
  }

  return reward;
};

// ─── Student: Get my VIP card ─────────────────────────────────────────────────

export const getMyVipCard = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;
    const reward = await VipReward.findOne({ userId, isActive: true })
      .populate("userId", "name email department")
      .lean();

    if (!reward) {
      return res.json({ success: true, hasReward: false, reward: null });
    }

    const meta = REWARD_TYPES[reward.rewardType] || {};
    res.json({
      success: true,
      hasReward: true,
      reward: { ...reward, icon: meta.icon, color: meta.color },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Verify QR (public — for event organizer scan) ────────────────────────────

export const verifyQrToken = async (req, res) => {
  try {
    const { qrToken } = req.params;
    const reward = await VipReward.findOne({ qrToken })
      .populate("userId", "name email department")
      .lean();

    if (!reward) {
      return res.status(404).json({ success: false, message: "Invalid QR code" });
    }

    const meta = REWARD_TYPES[reward.rewardType] || {};

    // Mark as verified (first scan wins)
    if (!reward.verifiedAt) {
      await VipReward.findByIdAndUpdate(reward._id, { verifiedAt: new Date() });
    }

    res.json({
      success: true,
      valid: reward.isActive,
      reward: {
        ...reward,
        icon: meta.icon,
        color: meta.color,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Get all VIP reward holders ───────────────────────────────────────

export const adminGetAllVipRewards = async (req, res) => {
  try {
    const rewards = await VipReward.find()
      .populate("userId", "name email department")
      .populate("issuedBy", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const enriched = rewards.map((r) => ({
      ...r,
      icon: REWARD_TYPES[r.rewardType]?.icon || "🏅",
      color: REWARD_TYPES[r.rewardType]?.color || "from-gray-500 to-gray-700",
    }));

    res.json({ success: true, data: enriched, total: enriched.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Manually issue VIP reward to a user ──────────────────────────────

export const adminIssueVipReward = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rewardType, notes } = req.body;
    const adminId = req.user.userId || req.user._id;

    if (!REWARD_KEYS.includes(rewardType)) {
      return res.status(400).json({ success: false, message: "Invalid reward type" });
    }

    // Revoke existing active reward first
    await VipReward.updateMany({ userId, isActive: true }, { isActive: false });

    const meta = REWARD_TYPES[rewardType];
    const reward = await VipReward.create({
      userId,
      rewardType,
      rewardTitle: meta.title,
      rewardDescription: meta.description,
      issuedBy: adminId,
      notes: notes || "",
    });

    const populated = await VipReward.findById(reward._id)
      .populate("userId", "name email department")
      .lean();

    // Send email to the user
    try {
      if (populated.userId?.email) {
        await sendVipRewardEmail({
          name: populated.userId.name || 'Student',
          email: populated.userId.email,
          rewardTitle: meta.title,
          rewardDescription: meta.description,
          icon: meta.icon || '🏅',
          vipCardUrl: `${APP_URL}/dashboard/vip-card`,
        });
      }
    } catch (e) {
      console.error('VIP admin-issue email error:', e.message);
    }

    res.status(201).json({ success: true, reward: { ...populated, icon: meta.icon, color: meta.color } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Revoke reward ─────────────────────────────────────────────────────

export const adminRevokeVipReward = async (req, res) => {
  try {
    const { rewardId } = req.params;
    await VipReward.findByIdAndUpdate(rewardId, { isActive: false });
    res.json({ success: true, message: "Reward revoked" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Admin: Get all available reward types ────────────────────────────────────

export const getRewardTypes = async (_req, res) => {
  res.json({ success: true, data: REWARD_TYPES });
};
