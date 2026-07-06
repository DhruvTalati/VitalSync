import React from "react";
import { Users, FilePlus2, Bell, RefreshCcw } from "lucide-react";

const DoctorWelcomeBanner = ({
  name,
  hospitalName,
  hospitalAddress,
  alertsCount = 0,
  onViewPatients,
  onAddRecord,
  onRefresh,
  refreshing,
}) => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const now = new Date().toLocaleTimeString("en-US");

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-primary-950 to-primary-900 text-white p-6 lg:p-7 flex flex-wrap items-center justify-between gap-6">
      <div>
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          Good afternoon, Dr. {name} <span>👋</span>
        </h1>
        <p className="text-primary-100 text-sm mt-1">Today is {today}</p>
        {hospitalName && (
          <p className="text-primary-200/80 text-xs mt-1">
            🏥 {hospitalName}
            {hospitalAddress ? ` – ${hospitalAddress}` : ""}
          </p>
        )}
        <p className="text-primary-300/70 text-xs mt-1">Last updated: {now}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onViewPatients}
          className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <Users size={16} /> Patients
        </button>
        <button
          onClick={onAddRecord}
          className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <FilePlus2 size={16} /> Add Record
        </button>
        <button className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors relative">
          <Bell size={16} /> Alerts
          <span className="bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
            {alertsCount}
          </span>
        </button>
        <button
          onClick={onRefresh}
          className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCcw size={16} className={refreshing ? "animate-spin" : ""} />{" "}
          Refresh
        </button>
      </div>
    </div>
  );
};

export default DoctorWelcomeBanner;
