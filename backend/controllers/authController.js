import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { notifyAdminOnEventCreation, sendOTPEmail, sendWelcomeOTPEmail } from "../utils/emailService.js";
import otpGenerator from "otp-generator";

// Success helper
const sendResponse = (res, status, success, message, data = {}) => {
  res.status(status).json({ success, message, data });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, department, role } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      if (existing.isVerified) {
        return sendResponse(res, 400, false, "Email already registered");
      } else {
        // If user exists but is not verified, update their OTP and resend
        const otpCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        existing.otp = { code: otpCode, expiresAt: new Date(Date.now() + 10 * 60 * 1000) };
        existing.name = name || existing.name;
        existing.password = password || existing.password;
        existing.department = department || existing.department;
        existing.role = 'user';
        await existing.save();
        await sendWelcomeOTPEmail(existing.email, otpCode);
        return sendResponse(res, 201, true, "New verification OTP sent to your email.");
      }
    }

    const otpCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      department,
      role: 'user',
      otp: { code: otpCode, expiresAt }
    });

    await user.save();
    await sendWelcomeOTPEmail(user.email, otpCode);

    sendResponse(res, 201, true, "Registration successful! OTP sent to email. Please verify to complete.");
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return sendResponse(res, 404, false, "User not found");
    if (user.isVerified) return sendResponse(res, 400, false, "User already verified");
    if (user.otp.code !== code || user.otp.expiresAt < new Date()) {
      return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    sendResponse(res, 200, true, "OTP verified successfully. You can now login.");
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      return sendResponse(res, 401, false, "Invalid email or password");
    }

    if (!user.isVerified) {
      return sendResponse(res, 403, false, "Please verify your email first");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email, name: user.name, department: user.department },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    sendResponse(res, 200, true, "Login successful", {
      token,
      user: { id: user._id, name: user.name, role: user.role, email: user.email, department: user.department }
    });
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return sendResponse(res, 404, false, "User not found");

    const otpCode = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    user.otp = { code: otpCode, expiresAt: new Date(Date.now() + 10 * 60 * 1000) };
    await user.save();
    await sendOTPEmail(user.email, otpCode);

    sendResponse(res, 200, true, "Reset OTP sent to email");
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.otp?.code !== code || user.otp?.expiresAt < new Date()) {
      return sendResponse(res, 400, false, "Invalid or expired OTP");
    }

    user.password = newPassword;
    user.otp = undefined;
    await user.save();

    sendResponse(res, 200, true, "Password reset successful");
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    sendResponse(res, 200, true, "User fetched", user);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};
