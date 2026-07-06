import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    reason: {
      type: String,
      default: ''
    },
    symptoms: {
      type: String,
      default: ''
    },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high'],
      default: 'normal'
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'rejected'],
      default: 'pending'
    },
    token: {
      type: String
    }
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;