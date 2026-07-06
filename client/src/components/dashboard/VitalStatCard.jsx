import React from 'react';

const colorMap = {
  red: 'bg-red-50 text-red-500',
  blue: 'bg-blue-50 text-blue-500',
  green: 'bg-emerald-50 text-emerald-500',
  amber: 'bg-amber-50 text-amber-500'
};

const badgeMap = {
  Normal: 'bg-emerald-100 text-emerald-700',
  Latest: 'bg-blue-100 text-blue-700',
  Abnormal: 'bg-amber-100 text-amber-700'
};

const VitalStatCard = ({ icon: Icon, value, label, badge, color }) => {
  return (
    <div className="card-surface p-6 flex items-center gap-4">
      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${colorMap[color]}`}>
        <Icon size={26} />
      </div>
      <div>
        <p className="text-2xl font-extrabold text-primary-950">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
        {badge && (
          <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeMap[badge] || 'bg-slate-100 text-slate-600'}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

export default VitalStatCard;