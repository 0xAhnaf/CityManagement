import mongoose, { Schema } from "mongoose";

const evidenceSchema = new Schema(
  { url: String, publicId: String },
  { _id: false }
);

const locationSchema = new Schema(
  {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  { _id: false }
);


const complaintSchema = new mongoose.Schema({
  title: String,
  category: String,
  location: locationSchema,
  evidence: [evidenceSchema],
  description: String,
  urgency: String,
  user: String,
  status: String,
  date: Date,
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",   // 👈 important
    required: true
  }
});

const Complaint = mongoose.model("Complaints", complaintSchema)
export default Complaint