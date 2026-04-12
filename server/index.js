import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRouter from "./Routes/AuthRouter.js";
import UserRouter from "./Routes/UserRouter.js";
import ComplaintRouter from "./Routes/ComplaintRouter.js";
import DonorRouter from "./Routes/DonorRoutes.js";
import eventRoute from "./Routes/eventRoute.js";
import volunteerRoute from "./Routes/volunteerRoute.js";
import log from "./Middlewares/logger.js";
import carbonTracker from "./Middlewares/carbonTracker.js"; // 👈 added
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(`Error connecting to database ${err}`));

const dir = "uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
  }),
);
app.use(log);
app.use(carbonTracker); // 👈 added

app.use("/auth", AuthRouter);
app.use("/user", UserRouter);
app.use("/complaint", ComplaintRouter);
app.use("/donors", DonorRouter);
app.use("/api", eventRoute);
app.use("/app", volunteerRoute);

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}`);
});