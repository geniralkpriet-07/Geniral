import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['password_reset', 'email_verification'],
    default: 'password_reset'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // The document will automatically expire after 10 minutes (600 seconds)
  }
});

// Create a unique compound index to ensure one active OTP per email and purpose
otpSchema.index({ email: 1, purpose: 1 }, { unique: true });

const OTP = mongoose.model('OTP', otpSchema);

export default OTP;
