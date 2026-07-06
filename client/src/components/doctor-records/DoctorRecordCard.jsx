import React from "react";
import { Stethoscope, Pill, StickyNote, User } from "lucide-react";

const DoctorRecordCard = ({ record }) => {
  return (
    <div className="border-l-4 border-primary-600 bg-white rounded-r-xl shadow-soft p-6">
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <div>
          <p className="font-bold text-primary-950 flex items-center gap-2">
            <User size={15} className="text-primary-600" />{" "}
            {record.patient?.name}
          </p>
          <span className="inline-block mt-1 text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">
            {record.specialization}
          </span>
        </div>
        <p className="text-sm text-slate-400">
          {new Date(record.recordDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <p className="flex items-center gap-2 text-sm mb-3">
        <Stethoscope size={16} className="text-primary-600" />
        <span className="font-semibold text-primary-950">Diagnosis:</span>{" "}
        {record.diagnosis}
      </p>

      {record.prescription && (
        <div className="bg-emerald-50 rounded-lg px-4 py-3 mb-3 text-sm">
          <p className="flex items-center gap-2 font-semibold text-emerald-700 mb-1">
            <Pill size={16} /> Prescription:
          </p>
          <p className="text-slate-700">{record.prescription}</p>
        </div>
      )}

      {record.medications?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {record.medications.map((m, idx) => (
            <span
              key={idx}
              className="text-xs font-medium bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full"
            >
              {m.name} — every {m.frequencyHours}h for {m.durationDays}d
            </span>
          ))}
        </div>
      )}

      {record.notes && (
        <p className="flex items-start gap-2 text-sm text-slate-500">
          <StickyNote size={16} className="mt-0.5 flex-shrink-0" />
          <span>
            <span className="font-semibold text-slate-600">Notes:</span>{" "}
            {record.notes}
          </span>
        </p>
      )}
    </div>
  );
};

export default DoctorRecordCard;
