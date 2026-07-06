import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, FileText } from "lucide-react";

const DoctorPatientsTable = ({ patients = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
            <th className="py-3 font-semibold">Patient</th>
            <th className="py-3 font-semibold">Age</th>
            <th className="py-3 font-semibold">Gender</th>
            <th className="py-3 font-semibold">Blood Group</th>
            <th className="py-3 font-semibold">Phone</th>
            <th className="py-3 font-semibold">Registered</th>
            <th className="py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 && (
            <tr>
              <td colSpan={7} className="py-10 text-center text-slate-400">
                No patients found
              </td>
            </tr>
          )}
          {patients.map((p) => (
            <tr key={p._id} className="border-b border-slate-50 last:border-0">
              <td className="py-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center flex-shrink-0">
                    {p.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-primary-950">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3.5 text-slate-600">
                {p.dateOfBirth
                  ? new Date().getFullYear() -
                    new Date(p.dateOfBirth).getFullYear()
                  : "--"}
              </td>
              <td className="py-3.5 text-slate-600 capitalize">
                {p.gender || "--"}
              </td>
              <td className="py-3.5">
                <span className="text-xs font-bold bg-red-50 text-red-500 px-2 py-1 rounded-full">
                  {p.bloodGroup || "--"}
                </span>
              </td>
              <td className="py-3.5 text-slate-600">{p.phone || "--"}</td>
              <td className="py-3.5 text-slate-400">
                {new Date(p.createdAt).toLocaleDateString("en-GB")}
              </td>
              <td className="py-3.5">
                <div className="flex gap-2">
                  <Link
                    to={`/doctor/patients/${p._id}/vitals`}
                    className="btn-secondary !py-1.5 !px-4 text-xs"
                  >
                    <HeartPulse size={13} /> Vitals
                  </Link>
                  <Link
                    to={`/doctor/patients/${p._id}/records`}
                    className="btn-primary !py-1.5 !px-4 text-xs"
                  >
                    <FileText size={13} /> Records
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorPatientsTable;
