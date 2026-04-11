import express from "express"
import { getAllComplaints, submitComplaint, updateComplaintStatusById } from "../Controllers/ComplaintController.js";
import { upload } from "../Middlewares/multer.middleware.js";
import checkToken from "../Middlewares/checkToken.js";

const router = express.Router();

router.post("/submit", checkToken, upload.array("evidence", 5), submitComplaint);
router.get("/list", checkToken, getAllComplaints);
router.put("/list/:id", checkToken, updateComplaintStatusById);

export default router;