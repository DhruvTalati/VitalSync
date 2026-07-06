import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, Plus } from 'lucide-react';

const MedicalWalletCard = ({ balance, onAddFunds }) => {
  const [submitting, setSubmitting] = useState(false);

  const handleAddFunds = async () => {
    setSubmitting(true);
    try {
      await onAddFunds(500);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white p-7 flex flex-col justify-between min-h-[280px]">
      <div className="flex items-center gap-2 text-violet-200 text-sm font-semibold">
        <Wallet size={18} /> Medical Wallet
      </div>

      <div className="text-center my-6">
        <p className="text-xs uppercase tracking-widest text-violet-300 mb-2">Available Balance</p>
        <p className="text-4xl font-extrabold">
          ₹{Number(balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <button
        onClick={handleAddFunds}
        disabled={submitting}
        className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
      >
        <Plus size={18} /> Add Funds
      </button>

      <Link to="/dashboard/wallet" className="text-center text-xs text-violet-200 mt-3 hover:text-white">
        View wallet details
      </Link>
    </div>
  );
};

export default MedicalWalletCard;