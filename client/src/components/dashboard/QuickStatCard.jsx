import React from 'react';

const colorMap = {
  blue: 'bg-blue-50 text-blue-500',
  green: 'bg-emerald-50 text-emerald-500',
  amber: 'bg-amber-50 text-amber-500',
  purple: 'bg-violet-50 text-violet-500'
};

const QuickStatCard = ({ icon: Icon, value, label, color }) => {
  return (
    <div className="card-surface p-5 flex items-center gap-4">
      <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xl font-extrabold text-primary-950">{value}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
};

export default QuickStatCard;