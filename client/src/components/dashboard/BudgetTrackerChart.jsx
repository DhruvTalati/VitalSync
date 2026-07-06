import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

const BudgetTrackerChart = ({ data = [] }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-primary-950">
          <BarChart3 size={18} className="text-primary-600" /> Healthcare Budget Tracker
        </div>
        <span className="bg-slate-900 text-white text-xs font-semibold px-3 py-1 rounded-full">6 Month Expense Analysis</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barGap={6}>
          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Legend
            formatter={(value) => (value === 'fundsAdded' ? 'Funds Added (₹)' : 'Medical Expenses (₹)')}
            iconType="circle"
          />
          <Bar dataKey="fundsAdded" fill="#22c55e" radius={[6, 6, 0, 0]} maxBarSize={48} />
          <Bar dataKey="medicalExpenses" fill="#f87171" radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetTrackerChart;