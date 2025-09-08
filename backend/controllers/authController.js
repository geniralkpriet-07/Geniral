import User from "../models/User.js";
import OTP from "../models/OTP.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import otpGenerator from "otp-generator";
import { sendOTPEmail } from "../utils/emailService.js";

export const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      const adminUser = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
        isActive: true
      });
      await adminUser.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: "Account is deactivated" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    
    if (!email || !newPassword || !otp) {
      return res.status(400).json({ error: "Email, new password, and OTP are required" });
    }
    
    // Verify OTP
    const otpRecord = await OTP.findOne({ 
      email: email.toLowerCase(),
      otp,
      purpose: 'password_reset'
    });
    
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    
    // Find the user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    // Delete the used OTP
    await OTP.deleteOne({ _id: otpRecord._id });
    
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // For security reasons, don't reveal that the email doesn't exist
      // Just say we sent the email even if we didn't
      return res.status(200).json({ message: "If your email is registered, you will receive a password reset OTP" });
    }
    
    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, { 
      digits: true, 
      alphabets: false, 
      upperCase: false, 
      specialChars: false 
    });
    
    // Store OTP in database (overwriting any existing one)
    await OTP.findOneAndUpdate(
      { email: email.toLowerCase(), purpose: 'password_reset' },
      { email: email.toLowerCase(), otp, purpose: 'password_reset' },
      { upsert: true, new: true }
    );
    
    // Send OTP via email
    await sendOTPEmail(email, otp);
    
    res.status(200).json({ message: "Password reset OTP sent to your email" });
  } catch (error) {
    console.error("Request password reset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    
    // Find the OTP record
    const otpRecord = await OTP.findOne({ 
      email: email.toLowerCase(),
      otp,
      purpose: 'password_reset'
    });
    
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyToken = (req, res) => {
  res.json({
    message: "Token is valid",
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      isActive: req.user.isActive
    }
  });
};

export const getDashboard = (req, res) => {
  res.json({
    message: "Welcome to admin dashboard",
    user: req.user
  });
};

export const resetUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const testDB = async (req, res) => {
  try {
    const dbName = mongoose.connection.db.databaseName;
    res.json({ 
      message: "Database connected successfully", 
      database: dbName 
    });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
};
