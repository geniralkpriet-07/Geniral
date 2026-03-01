import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const REWARD_TYPES = {
  EARLY_ENTRY: {
    id: "EARLY_ENTRY",
    title: "Early Entry Access",
    description: "30 minutes early entry + front row seating + meet the speaker first",
    icon: "🥈",
    color: "from-blue-500 to-blue-700",
  },
  STUDY_NOTES: {
    id: "STUDY_NOTES",
    title: "Exclusive Study Notes",
    description: "Premium notes, recorded session access, extra coding resources & resume templates",
    icon: "🥉",
    color: "from-green-500 to-green-700",
  },
  PRIORITY_REGISTRATION: {
    id: "PRIORITY_REGISTRATION",
    title: "Priority Registration",
    description: "Guaranteed seat & priority booking for limited-seat events",
    icon: "🏅",
    color: "from-yellow-500 to-yellow-700",
  },
  NETWORKING_LOUNGE: {
    id: "NETWORKING_LOUNGE",
    title: "Networking Lounge Access",
    description: "Private networking room + 15-min one-on-one with guest speaker",
    icon: "🏅",
    color: "from-purple-500 to-purple-700",
  },
  DIGITAL_BADGE: {
    id: "DIGITAL_BADGE",
    title: "Campus Influencer Badge",
    description: "Exclusive '🔥 Campus Influencer' digital badge on your profile",
    icon: "🏅",
    color: "from-pink-500 to-pink-700",
  },
  MERCHANDISE: {
    id: "MERCHANDISE",
    title: "Event Merchandise Priority",
    description: "Priority access to stickers, wristbands, certificates & goodie bags",
    icon: "🏅",
    color: "from-orange-500 to-orange-700",
  },
  RESUME_BOOST: {
    id: "RESUME_BOOST",
    title: "Resume Boost Token",
    description: "Featured volunteer status + priority leadership role consideration",
    icon: "🏅",
    color: "from-teal-500 to-teal-700",
  },
  INVITE_ONLY: {
    id: "INVITE_ONLY",
    title: "Exclusive Invite-Only Event",
    description: "Access to closed-door workshops, advanced bootcamps & hackathon mentorship",
    icon: "🏅",
    color: "from-indigo-500 to-indigo-700",
  },
  LUNCH_PASS: {
    id: "LUNCH_PASS",
    title: "Free Sponsored Lunch Pass",
    description: "Free sponsored lunch at the next major campus event",
    icon: "🥇",
    color: "from-red-500 to-red-700",
  },
  SURPRISE_BOX: {
    id: "SURPRISE_BOX",
    title: "Mystery Surprise Reward",
    description: "A surprise reward unlocked — only revealed at the event!",
    icon: "🏅",
    color: "from-gray-600 to-gray-900",
  },
};

export const REWARD_KEYS = Object.keys(REWARD_TYPES);

const vipRewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rewardType: {
      type: String,
      enum: REWARD_KEYS,
      required: true,
    },
    rewardTitle: { type: String, required: true },
    rewardDescription: { type: String },
    qrToken: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    isActive: { type: Boolean, default: true },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null = auto-issued
    },
    verifiedAt: { type: Date, default: null },
    verifiedBy: { type: String, default: null }, // organizer name/id
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

const VipReward = mongoose.model("VipReward", vipRewardSchema);
export default VipReward;
