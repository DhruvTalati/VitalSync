import asyncHandler from '../utils/asyncHandler.js';
import Wallet from '../models/Wallet.js';
import ApiError from '../utils/ApiError.js';

const getOrCreateWallet = async (patientId) => {
  let wallet = await Wallet.findOne({ patient: patientId });
  if (!wallet) {
    wallet = await Wallet.create({ patient: patientId, balance: 0, transactions: [], bills: [] });
  }
  return wallet;
};

export const getMyWallet = asyncHandler(async (req, res) => {
  const wallet = await getOrCreateWallet(req.user._id);
  res.status(200).json({ success: true, wallet });
});

export const addFunds = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    throw new ApiError(400, 'Enter a valid amount to add');
  }

  const wallet = await getOrCreateWallet(req.user._id);
  wallet.balance += Number(amount);
  wallet.transactions.unshift({
    type: 'credit',
    description: 'Funds added via Dashboard',
    amount: Number(amount),
    date: new Date()
  });
  await wallet.save();

  res.status(200).json({ success: true, message: 'Funds added successfully', wallet });
});

export const payBill = asyncHandler(async (req, res) => {
  const wallet = await getOrCreateWallet(req.user._id);
  const bill = wallet.bills.find((b) => String(b._id) === req.params.billId);
  if (!bill) {
    throw new ApiError(404, 'Bill not found');
  }
  if (bill.status === 'paid') {
    throw new ApiError(400, 'Bill already paid');
  }
  if (wallet.balance < bill.totalAmount) {
    throw new ApiError(400, 'Insufficient wallet balance');
  }

  wallet.balance -= bill.totalAmount;
  bill.status = 'paid';
  wallet.transactions.unshift({
    type: 'debit',
    description: `Auto-payment for ${bill.label}`,
    amount: bill.totalAmount,
    date: new Date()
  });
  await wallet.save();

  res.status(200).json({ success: true, message: 'Bill paid successfully', wallet });
});