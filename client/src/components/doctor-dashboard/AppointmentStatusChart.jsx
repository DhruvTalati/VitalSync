import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

const COLORS = { Pending: '#f59e0b', Confirmed: '#22c55e', Completed: '#3b82f6', Rejected: '#ef4444' };

const AppointmentStatusChart = ({ pending = 0, confirmed = 0, completed = 0, rejected = 0 }) => {
  const data = [
    { name: 'Pending', value: pending },
    { name: 'Confirmed', value: confirmed },
    { name: 'Completed', value: completed },
    { name: 'Rejected', value: rejected }
  ];

  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-6">
        <PieIcon size={18} className="text-primary-600" /> Appointment Status
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={65} outerRadius={95} paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry) => (
          <span key={entry.name} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[entry.name] }} />
            {entry.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AppointmentStatusChart;