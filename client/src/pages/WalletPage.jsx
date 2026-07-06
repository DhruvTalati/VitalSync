import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { IndianRupee, FileWarning, Receipt as ReceiptIcon, ListOrdered } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import QuickStatCard from '../components/dashboard/QuickStatCard.jsx';
import WalletBalanceBanner from '../components/wallet/WalletBalanceBanner.jsx';
import MedicalBillsCard from '../components/wallet/MedicalBillsCard.jsx';
import TransactionHistoryCard from '../components/wallet/TransactionHistoryCard.jsx';
import { fetchWallet, addFunds as addFundsRequest, payBill as payBillRequest } from '../services/walletService';

const WalletPage = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadWallet = async () => {
    try {
      const data = await fetchWallet();
      setWallet(data.wallet);
    } catch (err) {
      toast.error('Failed to load wallet');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  const handleAddFunds = async (amount) => {
    try {
      const data = await addFundsRequest(amount);
      setWallet(data.wallet);
      toast.success(`₹${amount} added to your wallet`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add funds');
    }
  };

  const handlePayBill = async (billId) => {
    try {
      const data = await payBillRequest(billId);
      setWallet(data.wallet);
      toast.success('Bill paid successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to pay bill');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-96 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  const totalAdded = (wallet?.transactions || []).filter((t) => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalSpent = (wallet?.transactions || []).filter((t) => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);
  const unpaidBills = (wallet?.bills || []).filter((b) => b.status === 'unpaid').length;

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
          <IndianRupee className="text-primary-600" size={24} /> My Wallet
        </h1>
        <p className="text-slate-500 mt-1">Manage your funds and pay medical bills seamlessly.</p>
      </div>

      <WalletBalanceBanner balance={wallet?.balance} onAddFunds={handleAddFunds} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <QuickStatCard icon={IndianRupee} value={`₹${totalAdded}`} label="Total Added" color="green" />
        <QuickStatCard icon={FileWarning} value={`₹${totalSpent}`} label="Total Spent" color="amber" />
        <QuickStatCard icon={ReceiptIcon} value={unpaidBills} label="Unpaid Bills" color="blue" />
        <QuickStatCard icon={ListOrdered} value={(wallet?.transactions || []).length} label="Transactions" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicalBillsCard bills={wallet?.bills} onPay={handlePayBill} />
        <TransactionHistoryCard transactions={wallet?.transactions} />
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;