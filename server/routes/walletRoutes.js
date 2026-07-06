import express from 'express';
import { getMyWallet, addFunds, payBill } from '../controllers/walletController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getMyWallet);
router.post('/add-funds', addFunds);
router.post('/pay-bill/:billId', payBill);

export default router;