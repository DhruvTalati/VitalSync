import React from "react";
import { BedDouble } from "lucide-react";

const ClinicBedAllocationsTable = ({ beds = [], onToggle }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-5">
        <BedDouble size={18} className="text-primary-600" /> Clinic Bed
        Allocations
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 font-semibold">Bed</th>
              <th className="py-3 font-semibold">Status</th>
              <th className="py-3 font-semibold">Patient Details</th>
              <th className="py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {beds.map((bed) => (
              <tr
                key={bed._id}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="py-3.5">
                  <p className="font-semibold text-primary-950">{bed.ward}</p>
                  <p className="text-xs text-slate-400">{bed.bedNumber}</p>
                </td>
                <td className="py-3.5">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${bed.status === "Available" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
                  >
                    {bed.status}
                  </span>
                </td>
                <td className="py-3.5 text-slate-400 italic">
                  {bed.patient?.name || "Empty"}
                </td>
                <td className="py-3.5">
                  <button
                    onClick={() => onToggle(bed)}
                    className="btn-secondary !py-1.5 !px-4 text-xs"
                  >
                    {bed.status === "Available" ? "Assign" : "Discharge"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClinicBedAllocationsTable;
