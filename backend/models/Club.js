import mongoose from "mongoose";

export const DEPARTMENTS = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Biotechnology',
  'MBA',
  'MCA',
  'Other',
];

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    department: { type: String, required: true },
    posterUrl: { type: String, default: '' },
    founder: { type: String, default: '' },
    president: { type: String, default: '' },
    vicePresident: { type: String, default: '' },
    departmentPresident: { type: String, default: '' },
    treasurer: { type: String, default: '' },
    jointTreasurer: { type: String, default: '' },
    memberCount: { type: Number, default: 0 },
    whatsappLink: { type: String, default: '' },
    telegramLink: { type: String, default: '' },
    discordLink: { type: String, default: '' },
    websiteLink: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Club = mongoose.model('Club', clubSchema);
export default Club;

