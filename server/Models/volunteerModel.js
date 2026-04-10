import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// optional safety: prevent duplicate enroll
volunteerSchema.index({ userId: 1, eventId: 1 }, { unique: true });

export default mongoose.model("Volunteers", volunteerSchema);
