import React from 'react';
import { ListChecks, Trash2, Ticket } from 'lucide-react';

const statusBadge = {
  completed: 'bg-slate-200 text-slate-600',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
  confirmed: 'bg-emerald-100 text-emerald-700'
};

const MyAppointmentsList = ({ appointments = [], onCancel }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-6">
        <ListChecks size={18} className="text-primary-600" /> My Appointments
      </div>

      <div className="space-y-4 max-h-[560px] overflow-y-auto pr-1">
        {appointments.length === 0 && <p className="text-center text-slate-400 text-sm py-8">No appointments yet</p>}
        {appointments.map((appt) => (
          <div key={appt._id} className="flex items-start justify-between border-b border-slate-50 last:border-0 pb-4 last:pb-0">
            <div>
              <p className="font-semibold text-sm text-primary-950">{appt.doctorName}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {new Date(appt.appointmentDate).toLocaleDateString('en-GB')}, {new Date(appt.appointmentDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </p>
              {appt.token && (
                <p className="flex items-center gap-1 text-xs text-blue-500 font-medium mt-1">
                  <Ticket size={12} /> Token: {appt.token}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusBadge[appt.status]}`}>{appt.status}</span>
              <button onClick={() => onCancel(appt._id)} className="h-7 w-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointmentsList;