import React from "react";
import {
  Download,
  Trash2,
  ClipboardList,
  StickyNote,
  User,
} from "lucide-react";

const DoctorPrescriptionCard = ({ prescription, onDownload, onDelete }) => {
  return (
    <div className="card-surface overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="bg-white/20 text-xs font-bold px-2.5 py-1 rounded-md">
            Rx #{prescription.rxNumber}
          </span>
          <p className="font-bold">{prescription.title}</p>
        </div>
        <p className="text-sm text-primary-100">
          {new Date(prescription.issuedDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center">
            {prescription.patient?.name?.charAt(0) || "P"}
          </div>
          <div>
            <p className="font-semibold text-sm text-primary-950 flex items-center gap-1.5">
              <User size={13} className="text-primary-600" />{" "}
              {prescription.patient?.name}
            </p>
            <p className="text-xs text-slate-500">
              {prescription.specialization}
            </p>
          </div>
        </div>

        <div className="border border-dashed border-primary-200 bg-primary-50/40 rounded-lg p-4">
          <p className="flex items-center gap-2 text-xs font-bold text-primary-700 uppercase mb-1.5">
            <ClipboardList size={14} /> Prescription
          </p>
          <p className="text-sm text-slate-700">{prescription.medication}</p>
        </div>

        {prescription.doctorNotes && (
          <div className="border border-dashed border-slate-200 rounded-lg p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase mb-1.5">
              <StickyNote size={14} /> Doctor Notes
            </p>
            <p className="text-sm text-slate-700">{prescription.doctorNotes}</p>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onDownload(prescription)}
            className="btn-primary text-sm"
          >
            <Download size={16} /> Download PDF
          </button>
          <button
            onClick={() => onDelete(prescription._id)}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptionCard;
