import express from "express";
import {
  getMyPrescriptions,
  getDoctorPrescriptions,
  createPrescription,
  deletePrescription,
} from "../controllers/prescriptionController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// Patient: view own prescriptions
router.get("/", getMyPrescriptions);

// Doctor: view prescriptions created by the logged-in doctor
router.get("/doctor/mine", restrictTo("doctor"), getDoctorPrescriptions);

// Doctor: create prescription
router.post("/", restrictTo("doctor"), createPrescription);

// Patient or doctor: delete (controller already checks ownership)
router.delete("/:id", deletePrescription);

export default router;
