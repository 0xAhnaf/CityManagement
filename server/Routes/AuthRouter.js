import express from "express";
import checkToken from "../Middlewares/checkToken.js";
import { login, logout, signup } from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", checkToken, logout);
router.post("/signup", signup);

export default router;
