import React from 'react';

const colorMap = {
  red: 'bg-red-50 text-red-500',
  blue: 'bg-blue-50 text-blue-500',
  green: 'bg-emerald-50 text-emerald-500',
  amber: 'bg-amber-50 text-amber-500'
};

const VitalRangeCard = ({ icon: Icon, range, label, color }) => {
  return (
    <div className="card-surface p-5 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="font-extrabold text-primary-950">{range}</p>
        <p className="text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
};

export default VitalRangeCard;