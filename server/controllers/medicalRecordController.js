import asyncHandler from "../utils/asyncHandler.js";
import MedicalRecord from "../models/MedicalRecord.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const getMyRecords = asyncHandler(async (req, res) => {
  const records = await MedicalRecord.find({ patient: req.user._id }).sort({
    recordDate: -1,
  });
  res.status(200).json({ success: true, count: records.length, records });
});

export const getDoctorRecords = asyncHandler(async (req, res) => {
  const records = await MedicalRecord.find({ doctor: req.user._id })
    .populate("patient", "name")
    .sort({ recordDate: -1 });
  res.status(200).json({ success: true, count: records.length, records });
});

export const getPatientRecords = asyncHandler(async (req, res) => {
  const records = await MedicalRecord.find({
    patient: req.params.patientId,
  }).sort({ recordDate: -1 });
  res.status(200).json({ success: true, count: records.length, records });
});

export const createRecord = asyncHandler(async (req, res) => {
  const {
    patient,
    doctorName,
    specialization,
    diagnosis,
    prescription,
    medications,
    notes,
    recordDate,
  } = req.body;

  if (!diagnosis) {
    throw new ApiError(400, "Diagnosis is required");
  }

  let record;
  if (req.user.role === "doctor") {
    if (!patient) throw new ApiError(400, "Patient is required");
    const patientDoc = await User.findById(patient);
    if (!patientDoc) throw new ApiError(404, "Patient not found");
    record = await MedicalRecord.create({
      patient,
      doctor: req.user._id,
      doctorName: `Dr. ${req.user.name}`,
      specialization:
        req.user.specialization || specialization || "General Physician",
      diagnosis,
      prescription,
      medications,
      notes,
      recordDate,
    });
  } else {
    record = await MedicalRecord.create({
      patient: req.user._id,
      doctorName,
      specialization,
      diagnosis,
      prescription,
      notes,
      recordDate,
    });
  }

  res
    .status(201)
    .json({ success: true, message: "Medical record added", record });
});
