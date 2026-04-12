import Complaint from "../Models/ComplaintModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const submitComplaint = async (req, res) => {
  try {
    const { title, category, description, urgency, date } = req.body;
    const location = JSON.parse(req.body.location);
    const files = req.files;
    let evidenceUrls = [];

    if (files && files.length > 0) {
      for (let file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "complaints",
        });

        evidenceUrls.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
        fs.unlinkSync(file.path);
      }
    }
    const newComplaint = new Complaint({
      title,
      category,
      location,
      evidence: evidenceUrls,
      description,
      urgency,
      user: req.user.name,
      status: "pending",
      date: new Date(date),
      userID: req.user.id,
    });
    await newComplaint.save();

    return res.json({ message: "Complaint submitted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaintData = await Complaint.find();
    if (!complaintData || complaintData.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaintData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComplaintsById = async (req, res) => {
  try {
    const userID = req.params.id;
    const complaintData = await Complaint.find({ userID });
    if (!complaintData || complaintData.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaintData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateComplaintStatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedComplaint = await Complaint.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json({ message: "Complaint updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteComplaintById = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedComplaint = await Complaint.findById(id);

    if (!deletedComplaint) {
      return res.status(400).json({ message: "Complaint not found" });
    }
    await Complaint.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComplaintCount = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "pending" });
    const resolved = await Complaint.countDocuments({ status: "resolved" });

    res.status(200).json({ total, pending, resolved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
