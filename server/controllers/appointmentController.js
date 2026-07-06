import asyncHandler from '../utils/asyncHandler.js';
import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { triagePriority, generateToken } from '../services/triageService.js';

export const getDoctorsList = asyncHandler(async (req, res) => {
  const doctors = await User.find({ role: 'doctor' }).select('name specialization');
  res.status(200).json({ success: true, doctors });
});

export const createAppointment = asyncHandler(async (req, res) => {
  const { doctor, doctorName, appointmentDate, reason, symptoms } = req.body;

  if (!doctorName || !appointmentDate) {
    throw new ApiError(400, 'Doctor and appointment date are required');
  }

  const priority = triagePriority(symptoms);

  const appointment = await Appointment.create({
    patient: req.user._id,
    doctor: doctor || undefined,
    doctorName,
    appointmentDate,
    reason,
    symptoms,
    priority,
    status: 'pending',
    token: generateToken()
  });

  res.status(201).json({ success: true, message: 'Appointment requested successfully', appointment });
});

export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: appointments.length, appointments });
});

export const deleteAppointment = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'doctor' ? { _id: req.params.id, doctor: req.user._id } : { _id: req.params.id, patient: req.user._id };
  const appointment = await Appointment.findOneAndDelete(filter);
  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }
  res.status(200).json({ success: true, message: 'Appointment removed' });
});

export const getDoctorAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ doctor: req.user._id })
    .populate('patient', 'name phone gender dateOfBirth')
    .sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: appointments.length, appointments });
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    throw new ApiError(404, 'Appointment not found');
  }
  appointment.status = status;
  await appointment.save();
  res.status(200).json({ success: true, message: 'Appointment status updated', appointment });
});