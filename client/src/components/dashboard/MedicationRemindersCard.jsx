import React from 'react';
import { Pill } from 'lucide-react';

const MedicationRemindersCard = ({ reminders = [] }) => {
  return (
    <div className="card-surface p-6 flex flex-col">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-6">
        <Pill size={18} className="text-primary-600" /> Medication Reminders
      </div>

      {reminders.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <Pill className="text-slate-300 mb-3" size={40} />
          <p className="text-slate-400 text-sm">No active medications. Reminders appear after doctor adds prescriptions.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {reminders.map((r) => (
            <li key={r._id} className="border border-slate-100 rounded-xl px-4 py-3">
              <p className="font-semibold text-sm text-primary-950">{r.medication}</p>
              <p className="text-xs text-slate-500">{r.schedule}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicationRemindersCard;