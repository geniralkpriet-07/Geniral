import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
      return res.status(400).json({ error: "Email and new password are required" });
    }
    
    // Find the user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Password reset error:", error);
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
