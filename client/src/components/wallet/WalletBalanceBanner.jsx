import React, { useState } from 'react';
import { Wallet, ShieldCheck, Zap, Plus } from 'lucide-react';

const quickAmounts = [100, 250, 500, 1000];

const WalletBalanceBanner = ({ balance, onAddFunds }) => {
  const [amount, setAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (value) => {
    const numeric = Number(value);
    if (!numeric || numeric <= 0) return;
    setSubmitting(true);
    try {
      await onAddFunds(numeric);
      setAmount('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary-800 to-primary-600 text-white p-7 grid lg:grid-cols-2 gap-8">
      <div>
        <p className="flex items-center gap-2 text-primary-200 text-xs font-bold uppercase tracking-widest mb-2">
          <Wallet size={16} /> Available Balance
        </p>
        <p className="text-4xl font-extrabold mb-2">₹ {Number(balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        <p className="text-primary-200 text-sm mb-4">VitalSync Health Wallet</p>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-xs font-semibold px-3 py-1.5 rounded-full">
            <ShieldCheck size={14} /> Secure
          </span>
          <span className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Zap size={14} /> Instant Pay
          </span>
        </div>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
        <p className="flex items-center gap-2 font-semibold mb-4">
          <Plus size={16} /> Add Funds
        </p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => handleAdd(amt)}
              disabled={submitting}
              className="bg-white/15 hover:bg-white/25 rounded-full py-2 text-sm font-semibold transition-colors disabled:opacity-60"
            >
              ₹{amt}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 rounded-xl bg-white/90 text-slate-900 placeholder:text-slate-400 px-4 py-2.5 text-sm outline-none"
          />
          <button
            onClick={() => handleAdd(amount)}
            disabled={submitting}
            className="bg-violet-600 hover:bg-violet-700 font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors disabled:opacity-60"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceBanner;