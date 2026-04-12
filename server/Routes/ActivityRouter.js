import express from "express";
import checkToken from "../Middlewares/checkToken.js";
import { createActivity, getActivityByID } from "../Controllers/ActivityController.js";

const router = express.Router();

router.post("/create", checkToken, createActivity);
router.get("/list", checkToken, getActivityByID);

export default router;