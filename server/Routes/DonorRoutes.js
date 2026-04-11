import express from "express";
import checkToken from "../Middlewares/checkToken.js";
import {
  registerDonor,
  getDonors,
  getBloodGroupCounts,
  getMyDonorProfile,
  updateAvailability,
} from "../Controllers/DonorController.js";
const router = express.Router();

router.patch("/me/availability", checkToken, updateAvailability);
router.get("/", getDonors);
router.post("/",       checkToken, registerDonor);
router.get("/counts",  checkToken, getBloodGroupCounts);
router.get("/me",      checkToken, getMyDonorProfile);

export default router;