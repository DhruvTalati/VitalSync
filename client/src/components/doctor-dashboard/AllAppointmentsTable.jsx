import React from "react";
import {
  ListChecks,
  Phone,
  FilePlus2,
  Video,
  Trash2,
  Check,
  X,
} from "lucide-react";

const statusBadge = {
  completed: "bg-slate-200 text-slate-600",
  pending: "bg-amber-100 text-amber-700",
  awaiting: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
  confirmed: "bg-emerald-100 text-emerald-700",
};

const AllAppointmentsTable = ({
  appointments = [],
  onAddRecord,
  onCall,
  onDelete,
  onConfirm,
  onReject,
}) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-5">
        <ListChecks size={18} className="text-primary-600" /> All Appointments
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 font-semibold">Patient</th>
              <th className="py-3 font-semibold">Phone</th>
              <th className="py-3 font-semibold">Token</th>
              <th className="py-3 font-semibold">Date &amp; Time</th>
              <th className="py-3 font-semibold">Status</th>
              <th className="py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No appointments found
                </td>
              </tr>
            )}
            {appointments.map((appt) => (
              <tr
                key={appt._id}
                className="border-b border-slate-50 last:border-0 align-top"
              >
                <td className="py-3.5">
                  <p className="font-semibold text-primary-950">
                    {appt.patient?.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {appt.patient?.gender} |{" "}
                    {appt.patient?.dateOfBirth
                      ? `${new Date().getFullYear() - new Date(appt.patient.dateOfBirth).getFullYear()}yrs`
                      : ""}
                  </p>
                </td>
                <td className="py-3.5">
                  <a
                    href={`tel:${appt.patient?.phone}`}
                    className="flex items-center gap-1 text-blue-500 font-medium"
                  >
                    <Phone size={12} /> {appt.patient?.phone || "--"}
                  </a>
                </td>
                <td className="py-3.5 text-blue-500 font-medium">
                  {appt.token || "—"}
                </td>
                <td className="py-3.5 text-slate-600 whitespace-nowrap">
                  {new Date(appt.appointmentDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                  ,{" "}
                  {new Date(appt.appointmentDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-3.5">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusBadge[appt.status]}`}
                  >
                    {appt.status}
                  </span>
                </td>
                <td className="py-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {appt.status === "pending" && (
                      <>
                        <button
                          onClick={() => onConfirm(appt._id)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => onReject(appt._id)}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {appt.status === "confirmed" && (
                      <>
                        <button
                          onClick={() => onAddRecord(appt.patient?._id)}
                          className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          <FilePlus2 size={12} /> Add Record
                        </button>
                        <button
                          onClick={() => onCall(appt._id)}
                          className="border border-primary-200 text-primary-700 hover:bg-primary-50 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1"
                        >
                          <Video size={12} /> Call
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDelete(appt._id)}
                      className="h-7 w-7 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  {appt.status === "pending" && (
                    <button
                      onClick={() => onConfirm(appt._id, true)}
                      className="mt-2 btn-primary !py-1 !px-3 text-xs"
                    >
                      Confirm &amp; Add Record
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointmentsTable;
