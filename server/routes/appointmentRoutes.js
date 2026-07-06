import express from 'express';
import {
  getDoctorsList,
  createAppointment,
  getMyAppointments,
  getDoctorAppointments,
  deleteAppointment,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/doctors', getDoctorsList);
router.get('/doctor/mine', getDoctorAppointments);
router.post('/', createAppointment);
router.get('/', getMyAppointments);
router.delete('/:id', deleteAppointment);
router.patch('/:id/status', updateAppointmentStatus);

export default router;