import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    message: String,
}, { timestamps: true })

const Activity = new mongoose.model("Activity", ActivitySchema);
export default Activity