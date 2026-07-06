import React from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

const riskBadge = {
  Low: "bg-emerald-100 text-emerald-700",
  Moderate: "bg-amber-100 text-amber-700",
  High: "bg-red-100 text-red-700",
};

const MyPatientsPanel = ({ patients = [], onAddRecord }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 font-bold text-primary-950">
          <UserRound size={18} className="text-primary-600" /> My Patients
        </div>
        <Link
          to="/doctor/patients"
          className="btn-secondary !py-1.5 !px-4 text-sm"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4 max-h-[640px] overflow-y-auto pr-1">
        {patients.map(({ patient, riskScore, riskLevel }) => (
          <div
            key={patient._id}
            className="flex items-center justify-between border border-slate-100 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                {patient.name?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm text-primary-950">
                  {patient.name}
                </p>
                <p className="text-xs text-slate-500">
                  {patient.gender} | Age:{" "}
                  {patient.dateOfBirth
                    ? new Date().getFullYear() -
                      new Date(patient.dateOfBirth).getFullYear()
                    : "--"}{" "}
                  |{" "}
                  <span className="text-red-500 font-semibold">
                    {patient.bloodGroup}
                  </span>
                </p>
                <span
                  className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${riskBadge[riskLevel]}`}
                >
                  Risk: {riskLevel} ({riskScore})
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0">
              <button
                onClick={() => onAddRecord(patient._id)}
                className="btn-primary !py-1.5 !px-4 text-xs"
              >
                Add Record
              </button>
              <Link
                to={`/doctor/patients/${patient._id}/vitals`}
                className="btn-secondary !py-1.5 !px-4 text-xs text-center"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPatientsPanel;
