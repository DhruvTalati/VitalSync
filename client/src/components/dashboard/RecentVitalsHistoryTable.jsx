import React from 'react';
import { Link } from 'react-router-dom';
import { Table2 } from 'lucide-react';

const RecentVitalsHistoryTable = ({ vitals = [] }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-bold text-primary-950">
          <Table2 size={18} className="text-primary-600" /> Recent Vitals History
        </div>
        <Link to="/dashboard/add-vitals" className="btn-primary !py-2 !px-4 text-sm">Log Today's Vitals</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 font-semibold">Date &amp; Time</th>
              <th className="py-3 font-semibold">Heart Rate</th>
              <th className="py-3 font-semibold">Blood Pressure</th>
              <th className="py-3 font-semibold">Oxygen</th>
              <th className="py-3 font-semibold">Temperature</th>
              <th className="py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {vitals.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">No vitals logged yet</td>
              </tr>
            )}
            {vitals.map((v) => (
              <tr key={v._id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 text-slate-500 whitespace-nowrap">
                  {new Date(v.recordedAt).toLocaleDateString('en-GB')}, {new Date(v.recordedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </td>
                <td className="py-3 text-slate-700">{v.heartRate} bpm</td>
                <td className="py-3 text-slate-700">{v.bloodPressureSystolic}/{v.bloodPressureDiastolic}</td>
                <td className="py-3 text-emerald-600 font-semibold">{v.oxygenLevel}%</td>
                <td className={`py-3 font-semibold ${v.status === 'Abnormal' ? 'text-amber-500' : 'text-slate-700'}`}>{v.temperature}°C</td>
                <td className="py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${v.status === 'Abnormal' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentVitalsHistoryTable;