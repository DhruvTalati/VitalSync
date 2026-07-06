import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';
import Vital from '../models/Vital.js';
import Appointment from '../models/Appointment.js';
import MedicalRecord from '../models/MedicalRecord.js';
import Bed from '../models/Bed.js';
import BloodInventory from '../models/BloodInventory.js';
import ApiError from '../utils/ApiError.js';
import { computeRiskScore, isAbnormal } from '../services/riskService.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const doctorId = req.user._id;

  const [totalPatients, appointments, recordsWritten] = await Promise.all([
    User.countDocuments({ role: 'patient' }),
    Appointment.find({ doctor: doctorId }),
    MedicalRecord.countDocuments({ doctor: doctorId })
  ]);

  const awaitingConfirmation = appointments.filter((a) => a.status === 'pending').length;
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
  const completed = appointments.filter((a) => a.status === 'completed').length;
  const rejected = appointments.filter((a) => a.status === 'rejected').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todaysAppointments = appointments.filter((a) => a.appointmentDate >= today && a.appointmentDate < tomorrow).length;

  const latestVitalsByPatient = await Vital.aggregate([
    { $sort: { recordedAt: -1 } },
    { $group: { _id: '$patient', latest: { $first: '$$ROOT' } } }
  ]);

  const abnormalVitals = latestVitalsByPatient.filter((v) => isAbnormal(v.latest));
  const completionRate = appointments.length ? Math.round((completed / appointments.length) * 100) : 0;

  res.status(200).json({
    success: true,
    stats: {
      totalPatients,
      awaitingConfirmation,
      confirmed,
      completed,
      rejected,
      abnormalVitalsCount: abnormalVitals.length,
      recordsWritten,
      todaysAppointments,
      completionRate
    }
  });
});

export const getAbnormalVitalsList = asyncHandler(async (req, res) => {
  const latestVitalsByPatient = await Vital.aggregate([
    { $sort: { recordedAt: -1 } },
    { $group: { _id: '$patient', latest: { $first: '$$ROOT' } } }
  ]);

  const abnormal = latestVitalsByPatient.filter((v) => isAbnormal(v.latest));
  const patientIds = abnormal.map((v) => v._id);
  const patients = await User.find({ _id: { $in: patientIds } }).select('name');
  const patientMap = Object.fromEntries(patients.map((p) => [String(p._id), p.name]));

  const result = abnormal.map((v) => {
    let warning = '';
    if (v.latest.temperature > 37.5) warning = 'Body temperature showing an upward trend. Watch for fever development.';
    else if (v.latest.oxygenLevel < 95) warning = 'Oxygen saturation trending below normal range.';
    else warning = 'Abnormal sugar level spikes detected in recent readings.';

    return {
      patientId: v._id,
      patientName: patientMap[String(v._id)] || 'Unknown',
      temperature: v.latest.temperature,
      recordedAt: v.latest.recordedAt,
      warning,
      vitalId: v.latest._id
    };
  });

  res.status(200).json({ success: true, count: result.length, abnormalVitals: result });
});

export const getPatients = asyncHandler(async (req, res) => {
  const { search, gender } = req.query;
  const filter = { role: 'patient' };

  if (gender && gender !== 'all') filter.gender = gender;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { bloodGroup: { $regex: search, $options: 'i' } }
    ];
  }

  const patients = await User.find(filter).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: patients.length, patients });
});

export const getMyPatientsWithRisk = asyncHandler(async (req, res) => {
  const patients = await User.find({ role: 'patient' }).limit(10);
  const results = await Promise.all(
    patients.map(async (p) => {
      const latestVital = await Vital.findOne({ patient: p._id }).sort({ recordedAt: -1 });
      const { score, level } = computeRiskScore(latestVital);
      return { patient: p, riskScore: score, riskLevel: level };
    })
  );
  res.status(200).json({ success: true, patients: results });
});

export const getBeds = asyncHandler(async (req, res) => {
  const beds = await Bed.find().populate('patient', 'name').sort({ ward: 1, bedNumber: 1 });
  res.status(200).json({ success: true, beds });
});

export const updateBed = asyncHandler(async (req, res) => {
  const { status, patientId } = req.body;
  const bed = await Bed.findById(req.params.id);
  if (!bed) throw new ApiError(404, 'Bed not found');
  bed.status = status;
  bed.patient = status === 'Occupied' ? patientId : null;
  await bed.save();
  res.status(200).json({ success: true, message: 'Bed updated', bed });
});

export const getBloodInventory = asyncHandler(async (req, res) => {
  const inventory = await BloodInventory.find().sort({ bloodGroup: 1 });
  res.status(200).json({ success: true, inventory });
});

export const updateBloodInventory = asyncHandler(async (req, res) => {
  const { units } = req.body;
  const record = await BloodInventory.findOneAndUpdate(
    { bloodGroup: req.params.bloodGroup },
    { units },
    { new: true, upsert: true }
  );
  res.status(200).json({ success: true, message: 'Inventory updated', record });
});