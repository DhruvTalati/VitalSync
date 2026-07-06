import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    specialization: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    prescription: {
      type: String,
      default: "",
    },
    medications: [
      {
        name: String,
        frequencyHours: Number,
        durationDays: Number,
      },
    ],
    notes: {
      type: String,
      default: "",
    },
    recordDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;
