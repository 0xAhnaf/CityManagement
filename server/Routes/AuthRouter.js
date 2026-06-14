import express from "express";
import checkToken from "../Middlewares/checkToken.js";
import { login, logout, signup, forgotPassword, resetPassword, verifyEmail, resendVerification } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", checkToken, logout);
router.post("/signup", signup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

export default router;
