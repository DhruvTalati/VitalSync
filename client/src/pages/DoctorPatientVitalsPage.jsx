import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, HeartPulse } from "lucide-react";
import DoctorDashboardLayout from "../layouts/DoctorDashboardLayout.jsx";
import VitalsTrendChart from "../components/dashboard/VitalsTrendChart.jsx";
import { fetchPatientVitals } from "../services/vitalService";
import { buildVitalsTrendData } from "../utils/dashboardHelpers.js";

const DoctorPatientVitalsPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPatientVitals(patientId);
        setVitals(data.vitals || []);
      } catch (err) {
        toast.error("Failed to load patient vitals");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [patientId]);

  return (
    <DoctorDashboardLayout>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="btn-secondary !py-2 !px-3"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
            <HeartPulse className="text-red-500" size={24} /> Patient Vitals
          </h1>
          <p className="text-slate-500 mt-1">
            Full vitals history and trend for this patient.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
        </div>
      ) : (
        <>
          <VitalsTrendChart
            data={buildVitalsTrendData(vitals)}
            onAddVitals={() => {}}
          />

          <div className="card-surface p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
                    <th className="py-3 font-semibold">Date &amp; Time</th>
                    <th className="py-3 font-semibold">Heart Rate</th>
                    <th className="py-3 font-semibold">Blood Pressure</th>
                    <th className="py-3 font-semibold">Oxygen</th>
                    <th className="py-3 font-semibold">Temperature</th>
                    <th className="py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vitals.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-slate-400"
                      >
                        No vitals recorded for this patient
                      </td>
                    </tr>
                  )}
                  {vitals.map((v) => (
                    <tr
                      key={v._id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-3 text-slate-500 whitespace-nowrap">
                        {new Date(v.recordedAt).toLocaleDateString("en-GB")},{" "}
                        {new Date(v.recordedAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 text-slate-700">{v.heartRate} bpm</td>
                      <td className="py-3 text-slate-700">
                        {v.bloodPressureSystolic}/{v.bloodPressureDiastolic}
                      </td>
                      <td className="py-3 text-emerald-600 font-semibold">
                        {v.oxygenLevel}%
                      </td>
                      <td className="py-3 text-slate-700">{v.temperature}°C</td>
                      <td className="py-3">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${v.status === "Abnormal" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
                        >
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </DoctorDashboardLayout>
  );
};

export default DoctorPatientVitalsPage;
