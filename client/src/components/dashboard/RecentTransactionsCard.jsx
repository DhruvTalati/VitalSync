import React from 'react';
import { Receipt } from 'lucide-react';

const RecentTransactionsCard = ({ transactions = [] }) => {
  return (
    <div className="card-surface p-6 min-h-[280px]">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-4">
        <Receipt size={18} className="text-primary-600" /> Recent Transactions
      </div>

      <div className="overflow-y-auto max-h-56">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
              <th className="py-2 font-semibold">Date</th>
              <th className="py-2 font-semibold">Description</th>
              <th className="py-2 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-slate-400">No transactions yet</td>
              </tr>
            )}
            {transactions.map((tx) => (
              <tr key={tx._id} className="border-b border-slate-50 last:border-0">
                <td className="py-2.5 text-slate-500">{new Date(tx.date).toLocaleDateString('en-GB')}</td>
                <td className="py-2.5 text-slate-700">{tx.description}</td>
                <td className={`py-2.5 text-right font-semibold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {tx.type === 'credit' ? '+' : '-'}₹{Number(tx.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactionsCard;
