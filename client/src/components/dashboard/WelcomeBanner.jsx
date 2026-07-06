import React from 'react';
import { Plus, CalendarPlus, Siren, RefreshCcw } from 'lucide-react';

const WelcomeBanner = ({ name, onLogVitals, onBookAppointment, onRefresh, refreshing }) => {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const now = new Date().toLocaleTimeString('en-US');

  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600 text-white p-6 lg:p-7 flex flex-wrap items-center justify-between gap-6">
      <div>
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          Good morning, {name} <span>👋</span>
        </h1>
        <p className="text-primary-100 text-sm mt-1">Today is {today}</p>
        <p className="text-primary-200/80 text-xs mt-1">Last updated: {now}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={onLogVitals} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors">
          <Plus size={16} /> Log Vitals
        </button>
        <button onClick={onBookAppointment} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors">
          <CalendarPlus size={16} /> Book Appointment
        </button>
        <button className="bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2 transition-colors">
          <Siren size={16} /> SOS Emergency
        </button>
        <button onClick={onRefresh} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors">
          <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;