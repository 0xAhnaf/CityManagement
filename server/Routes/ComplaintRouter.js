import express from "express"
import { deleteComplaintById, getAllComplaints, getComplaintCount, getComplaintsById, submitComplaint, updateComplaintStatusById } from "../Controllers/ComplaintController.js";
import { upload } from "../Middlewares/multer.middleware.js";
import checkToken from "../Middlewares/checkToken.js";

const router = express.Router();

router.post("/submit", checkToken, upload.array("evidence", 5), submitComplaint);
router.get("/list", checkToken, getAllComplaints);
router.get("/list/:id", checkToken, getComplaintsById);
router.put("/list/:id", checkToken, updateComplaintStatusById);
router.delete("/list/:id", checkToken, deleteComplaintById);
router.get("/count", getComplaintCount);

export default router;