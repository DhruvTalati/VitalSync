import React from "react";
import { Link } from "react-router-dom";
import { CalendarClock, Check, X } from "lucide-react";

const AwaitingConfirmationCard = ({
  appointments = [],
  onConfirm,
  onReject,
}) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-primary-950">
          <CalendarClock size={18} className="text-primary-600" /> Awaiting
          Confirmation
          <span className="h-5 w-5 flex items-center justify-center bg-amber-500 text-white text-xs font-bold rounded-full">
            {appointments.length}
          </span>
        </div>
        <Link
          to="/doctor/patients"
          className="btn-secondary !py-1.5 !px-4 text-sm"
        >
          View All Patients
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-8">
          No appointments awaiting confirmation
        </p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="flex items-start justify-between border border-slate-100 rounded-xl p-4 flex-wrap gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <CalendarClock size={16} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary-950">
                    {appt.patient?.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(appt.appointmentDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" },
                    )}
                    ,{" "}
                    {new Date(appt.appointmentDate).toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit" },
                    )}{" "}
                    | Age:{" "}
                    {appt.patient?.dateOfBirth
                      ? new Date().getFullYear() -
                        new Date(appt.patient.dateOfBirth).getFullYear()
                      : "--"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {appt.reason || "Routine"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {appt.symptoms || "Detailed consultation"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => onConfirm(appt._id)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => onReject(appt._id)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <button
                  onClick={() => onConfirm(appt._id, true)}
                  className="btn-primary !py-1.5 !px-4 text-xs whitespace-nowrap"
                >
                  Confirm &amp; Record
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AwaitingConfirmationCard;
