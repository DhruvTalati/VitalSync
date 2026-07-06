import React from "react";
import { AlertTriangle, TrendingUp, Eye, Trash2 } from "lucide-react";

const AbnormalVitalsCard = ({ vitals = [], onAddRecord, onView, onDelete }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-red-600 mb-5">
        <AlertTriangle size={18} /> Patients with Abnormal Vitals
      </div>

      {vitals.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-8">
          No abnormal vitals detected
        </p>
      ) : (
        <div className="space-y-4">
          {vitals.map((v) => (
            <div
              key={v.vitalId}
              className="border-l-4 border-red-500 bg-red-50/60 rounded-r-xl p-5 flex items-center justify-between flex-wrap gap-4"
            >
              <div>
                <p className="font-bold text-primary-950 flex items-center gap-2">
                  {v.patientName}
                  <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    Temp {v.temperature}°C <AlertTriangle size={11} />
                  </span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Last recorded:{" "}
                  {new Date(v.recordedAt).toLocaleDateString("en-GB")},{" "}
                  {new Date(v.recordedAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-amber-600 font-medium mt-2">
                  <TrendingUp size={13} /> Warning: {v.warning}
                </p>
              </div>
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => onAddRecord(v.patientId)}
                  className="btn-primary !py-1.5 !px-4 text-xs"
                >
                  Add Record
                </button>
                <button
                  onClick={() => onView(v.patientId)}
                  className="btn-secondary !py-1.5 !px-4 text-xs"
                >
                  <Eye size={13} /> View
                </button>
                <button
                  onClick={() => onDelete(v.vitalId)}
                  className="border border-red-300 text-red-500 hover:bg-red-100 text-xs font-semibold py-1.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 size={13} /> Delete Vital
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AbnormalVitalsCard;
