import express from "express";
import {
  getMyRecords,
  getDoctorRecords,
  getPatientRecords,
  createRecord,
} from "../controllers/medicalRecordController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getMyRecords);
router.get("/doctor/mine", getDoctorRecords);
router.get("/patient/:patientId", getPatientRecords);
router.post("/", createRecord);

export default router;
