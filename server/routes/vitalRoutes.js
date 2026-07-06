import express from "express";
import {
  createVital,
  getMyVitals,
  getPatientVitals,
  deleteVital,
} from "../controllers/vitalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", createVital);
router.get("/", getMyVitals);
router.get("/patient/:patientId", getPatientVitals);
router.delete("/:id", deleteVital);

export default router;
