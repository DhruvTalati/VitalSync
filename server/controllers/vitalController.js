import asyncHandler from "../utils/asyncHandler.js";
import Vital from "../models/Vital.js";
import ApiError from "../utils/ApiError.js";

const evaluateStatus = (vital) => {
  const abnormal =
    vital.heartRate < 60 ||
    vital.heartRate > 100 ||
    vital.oxygenLevel < 95 ||
    vital.temperature < 36.1 ||
    vital.temperature > 37.5;
  return abnormal ? "Abnormal" : "Normal";
};

export const createVital = asyncHandler(async (req, res) => {
  const {
    heartRate,
    bloodPressureSystolic,
    bloodPressureDiastolic,
    oxygenLevel,
    temperature,
    weight,
    notes,
  } = req.body;

  if (
    !heartRate ||
    !bloodPressureSystolic ||
    !bloodPressureDiastolic ||
    !oxygenLevel ||
    !temperature
  ) {
    throw new ApiError(
      400,
      "Heart rate, blood pressure, oxygen level and temperature are required",
    );
  }

  const vital = await Vital.create({
    patient: req.user._id,
    heartRate,
    bloodPressureSystolic,
    bloodPressureDiastolic,
    oxygenLevel,
    temperature,
    weight,
    notes,
  });

  const io = req.app.get("io");
  io.to(String(req.user._id)).emit("vitals:new", vital);

  res
    .status(201)
    .json({ success: true, message: "Vitals logged successfully", vital });
});

export const getMyVitals = asyncHandler(async (req, res) => {
  const vitals = await Vital.find({ patient: req.user._id }).sort({
    recordedAt: -1,
  });
  const withStatus = vitals.map((v) => ({
    ...v.toObject(),
    status: evaluateStatus(v),
  }));
  res
    .status(200)
    .json({ success: true, count: vitals.length, vitals: withStatus });
});

export const getPatientVitals = asyncHandler(async (req, res) => {
  const vitals = await Vital.find({ patient: req.params.patientId }).sort({
    recordedAt: -1,
  });
  const withStatus = vitals.map((v) => ({
    ...v.toObject(),
    status: evaluateStatus(v),
  }));
  res
    .status(200)
    .json({ success: true, count: vitals.length, vitals: withStatus });
});

export const deleteVital = asyncHandler(async (req, res) => {
  const vital = await Vital.findOneAndDelete({
    _id: req.params.id,
    patient: req.user._id,
  });
  if (!vital) {
    throw new ApiError(404, "Vital record not found");
  }
  res.status(200).json({ success: true, message: "Vital record deleted" });
});
