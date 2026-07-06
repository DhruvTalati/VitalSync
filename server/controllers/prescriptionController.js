import asyncHandler from "../utils/asyncHandler.js";
import Prescription from "../models/Prescription.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const getMyPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions =
    req.user.role === "doctor"
      ? await Prescription.find({ doctor: req.user._id })
          .populate("patient", "name phone gender bloodGroup dateOfBirth")
          .sort({ issuedDate: -1 })
      : await Prescription.find({ patient: req.user._id }).sort({
          issuedDate: -1,
        });

  res.status(200).json({
    success: true,
    count: prescriptions.length,
    prescriptions,
  });
});

export const createPrescription = asyncHandler(async (req, res) => {
  const { patient, title, medication, doctorNotes, issuedDate } = req.body;

  if (!title || !medication) {
    throw new ApiError(400, "Title and medication are required");
  }

  if (req.user.role !== "doctor") {
    throw new ApiError(403, "Only doctors can create prescriptions");
  }

  if (!patient) {
    throw new ApiError(400, "Patient is required");
  }

  const patientDoc = await User.findOne({
    _id: patient,
    role: "patient",
  });

  if (!patientDoc) {
    throw new ApiError(404, "Patient not found");
  }

  const count = await Prescription.countDocuments({
    patient,
  });

  const prescription = await Prescription.create({
    patient,
    doctor: req.user._id,
    rxNumber: count + 1,
    title,
    doctorName: req.user.name,
    specialization: req.user.specialization || "General Physician",
    medication,
    doctorNotes,
    issuedDate,
  });

  res.status(201).json({
    success: true,
    message: "Prescription created",
    prescription,
  });
});

export const deletePrescription = asyncHandler(async (req, res) => {
  const filter =
    req.user.role === "doctor"
      ? {
          _id: req.params.id,
          doctor: req.user._id,
        }
      : {
          _id: req.params.id,
          patient: req.user._id,
        };

  const prescription = await Prescription.findOneAndDelete(filter);

  if (!prescription) {
    throw new ApiError(404, "Prescription not found");
  }

  res.status(200).json({
    success: true,
    message: "Prescription deleted",
  });
});
