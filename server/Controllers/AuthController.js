import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../Utils/helper.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { sendVerificationEmail, sendPasswordResetEmail } from "../Utils/emailService.js";

const lifetime = "3600000";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use." });
    }

    const hashedPassword = await hashPassword(password);

    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = Date.now() + 1000 * 60 * 60 * 24; // 24 hours

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verifyToken,
      verifyTokenExpiry,
    });
    await newUser.save();

    try{
      await sendVerificationEmail(email, verifyToken);
      console.log("Email sent successfully");
    }catch (emailError){
      console.error("EMAIL ERROR:", emailError.message);
      return res.status(200).json({ message: "Signup successful. Please verify your email." });
    }

    // No JWT cookie yet — user must verify first
    return res.status(200).json({ message: "Signup successful. Please verify your email." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link." });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // Always return 200 to avoid enumeration
    if (!user || user.isVerified) {
      return res.status(200).json({ message: "If that email exists and is unverified, a new link has been sent." });
    }

    // Cooldown: block resend if last token was sent less than 2 minutes ago
    const twoMinutesAgo = Date.now() - 1000 * 60 * 2;
    if (user.verifyTokenExpiry && user.verifyTokenExpiry > twoMinutesAgo + 1000 * 60 * 60 * 24 - 1000 * 60 * 2) {
      return res.status(429).json({ message: "Please wait 2 minutes before requesting a new link." });
    }

    const verifyToken = crypto.randomBytes(32).toString("hex");
    user.verifyToken = verifyToken;
    user.verifyTokenExpiry = Date.now() + 1000 * 60 * 60 * 24;
    await user.save();

    await sendVerificationEmail(email, verifyToken);

    return res.status(200).json({ message: "If that email exists and is unverified, a new link has been sent." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update login to block unverified users
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    const isPassEqual = await comparePassword(password, user.password);
    if (!isPassEqual) {
      return res.status(400).json({ message: "Wrong password." });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: lifetime }
    );

    res.cookie("token", token, {
      maxAge: lifetime,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json({ message: "Logout successful" });
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    // Always return 200 to avoid email enumeration
    if (!user) {
      return res.status(200).json({ message: "If that email exists, a reset link has been sent." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"City Connect" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>
        <p>You requested a password reset. Click the link below. It expires in 30 minutes.</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    return res.status(200).json({ message: "If that email exists, a reset link has been sent." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // token must not be expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    user.password = await hashPassword(password);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
