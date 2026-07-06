import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CalendarX2 } from 'lucide-react';

const UpcomingAppointmentsCard = ({ appointments = [] }) => {
  const upcoming = appointments.filter((a) => a.status === 'confirmed' || a.status === 'pending');

  return (
    <div className="card-surface p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-primary-950">
          <CalendarDays size={18} className="text-primary-600" /> Upcoming Appointments
        </div>
        <Link to="/dashboard/book-appointment" className="btn-secondary !py-1.5 !px-4 text-sm">+ Book</Link>
      </div>

      {upcoming.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <CalendarX2 className="text-slate-300 mb-3" size={40} />
          <p className="text-slate-400 text-sm mb-4">No upcoming appointments</p>
          <Link to="/dashboard/book-appointment" className="btn-primary text-sm">Book One Now</Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {upcoming.map((appt) => (
            <li key={appt._id} className="flex items-center justify-between border border-slate-100 rounded-xl px-4 py-3">
              <div>
                <p className="font-semibold text-sm text-primary-950">{appt.doctorName}</p>
                <p className="text-xs text-slate-500">{new Date(appt.appointmentDate).toLocaleString('en-GB')}</p>
              </div>
              <span className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">{appt.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingAppointmentsCard;