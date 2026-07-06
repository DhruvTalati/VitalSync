import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, FilePlus2, Plus } from "lucide-react";
import DoctorDashboardLayout from "../layouts/DoctorDashboardLayout.jsx";
import RecordCard from "../components/records/RecordCard.jsx";
import { fetchPatientRecords } from "../services/medicalRecordService";

const DoctorPatientRecordsPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPatientRecords(patientId);
        setRecords(data.records || []);
      } catch (err) {
        toast.error("Failed to load patient records");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [patientId]);

  return (
    <DoctorDashboardLayout>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary !py-2 !px-3"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
              <FilePlus2 className="text-primary-600" size={24} /> Patient
              Medical Records
            </h1>
            <p className="text-slate-500 mt-1">
              Full diagnosis and treatment history for this patient.
            </p>
          </div>
        </div>
        <Link to="/doctor/medical-records" className="btn-primary text-sm">
          <Plus size={16} /> Add New Record
        </Link>
      </div>

      <div className="card-surface p-6">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            No medical records found for this patient yet.
          </div>
        ) : (
          <div className="space-y-6">
            {records.map((record) => (
              <RecordCard key={record._id} record={record} />
            ))}
          </div>
        )}
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorPatientRecordsPage;
