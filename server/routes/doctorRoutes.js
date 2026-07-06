import express from 'express';
import {
  getDashboardStats,
  getAbnormalVitalsList,
  getPatients,
  getMyPatientsWithRisk,
  getBeds,
  updateBed,
  getBloodInventory,
  updateBloodInventory
} from '../controllers/doctorController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, restrictTo('doctor'));
router.get('/stats', getDashboardStats);
router.get('/abnormal-vitals', getAbnormalVitalsList);
router.get('/patients', getPatients);
router.get('/my-patients', getMyPatientsWithRisk);
router.get('/beds', getBeds);
router.patch('/beds/:id', updateBed);
router.get('/blood-inventory', getBloodInventory);
router.patch('/blood-inventory/:bloodGroup', updateBloodInventory);

export default router;