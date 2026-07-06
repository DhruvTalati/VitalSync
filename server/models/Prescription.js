import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rxNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    medication: {
      type: String,
      required: true,
    },
    doctorNotes: {
      type: String,
      default: "",
    },
    issuedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
