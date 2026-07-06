import React from 'react';
import { History, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const TransactionHistoryCard = ({ transactions = [] }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-primary-950">
          <History size={18} className="text-primary-600" /> Transaction History
        </div>
        <span className="h-6 w-6 flex items-center justify-center bg-slate-900 text-white text-xs font-bold rounded-full">
          {transactions.length}
        </span>
      </div>

      {transactions.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-10">No transactions yet</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li key={tx._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                  {tx.type === 'credit' ? <ArrowDownCircle size={18} /> : <ArrowUpCircle size={18} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary-950">{tx.description}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(tx.date).toLocaleDateString('en-GB')}, {new Date(tx.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <p className={`font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistoryCard;
