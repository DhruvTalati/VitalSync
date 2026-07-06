import React from 'react';
import { History } from 'lucide-react';

const RecentRecordsList = ({ vitals = [] }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-5">
        <History size={18} className="text-primary-600" /> Recent Records
      </div>

      <ul className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
        {vitals.length === 0 && <li className="text-sm text-slate-400 text-center py-6">No records yet</li>}
        {vitals.slice(0, 8).map((v) => (
          <li key={v._id} className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-primary-950">
                {new Date(v.recordedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </p>
              <p className="text-xs text-slate-400">
                {new Date(v.recordedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold bg-red-50 text-red-500 px-2 py-1 rounded-full">♥ {v.heartRate} bpm</span>
              <span className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">O2 {v.oxygenLevel}%</span>
              <span className="text-xs font-semibold bg-amber-50 text-amber-600 px-2 py-1 rounded-full">🌡 {v.temperature}°C</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentRecordsList;