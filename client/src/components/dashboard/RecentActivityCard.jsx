import React from 'react';
import { History, CalendarCheck2, HeartPulse, FileText } from 'lucide-react';

const iconFor = (type) => {
  if (type === 'appointment') return { Icon: CalendarCheck2, color: 'bg-blue-50 text-blue-500' };
  if (type === 'vital') return { Icon: HeartPulse, color: 'bg-red-50 text-red-500' };
  return { Icon: FileText, color: 'bg-emerald-50 text-emerald-500' };
};

const RecentActivityCard = ({ activities = [] }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-6">
        <History size={18} className="text-primary-600" /> Recent Activity
      </div>

      <ul className="divide-y divide-slate-50">
        {activities.length === 0 && (
          <li className="py-6 text-center text-slate-400 text-sm">No recent activity</li>
        )}
        {activities.map((activity, index) => {
          const { Icon, color } = iconFor(activity.type);
          return (
            <li key={index} className="flex items-start gap-4 py-3.5">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-sm text-slate-800">{activity.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{activity.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivityCard;