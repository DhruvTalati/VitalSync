import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import vitalRoutes from "./routes/vitalRoutes.js";
import medicalRecordRoutes from "./routes/medicalRecordRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import errorMiddleware, { notFound } from "./middleware/errorMiddleware.js";
import { registerSocketHandlers } from "./services/socketService.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "VitalSync API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vitals", vitalRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/doctor", doctorRoutes);

app.use(notFound);
app.use(errorMiddleware);

registerSocketHandlers(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`VitalSync server running on port ${PORT}`);
});
