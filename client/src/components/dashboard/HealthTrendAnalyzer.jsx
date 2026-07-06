import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BrainCircuit } from 'lucide-react';

const levelColors = {
  LOW: 'bg-emerald-100 text-emerald-700',
  MODERATE: 'bg-amber-100 text-amber-700',
  HIGH: 'bg-red-100 text-red-700'
};

const AiHealthRiskCard = ({ riskScore = 0, maxScore = 9, riskLevel = 'LOW', trend = [] }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-primary-950">
          <BrainCircuit size={18} className="text-primary-600" /> AI Health Risk Prediction
        </div>
        <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Predictive Analytics</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl font-extrabold text-emerald-500">{riskScore}</span>
        <div>
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${levelColors[riskLevel]}`}>
            Health Risk Level: {riskLevel}
          </span>
          <p className="text-xs text-slate-400 mt-1">Max score: {maxScore} | Based on latest vitals</p>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">
        {riskLevel === 'LOW' ? 'No risk factors detected in latest vitals.' : 'Some risk indicators detected — monitor closely.'}
      </p>

      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={trend}>
          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, maxScore]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Line type="monotone" dataKey="score" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AiHealthRiskCard;