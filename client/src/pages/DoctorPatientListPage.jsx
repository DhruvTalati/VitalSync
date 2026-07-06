import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Search, Users } from "lucide-react";
import DoctorDashboardLayout from "../layouts/DoctorDashboardLayout.jsx";
import DoctorPatientsTable from "../components/doctor-patients/DoctorPatientsTable.jsx";
import { fetchAllPatients } from "../services/doctorService";

const DoctorPatientListPage = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadPatients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllPatients({ search, gender });
      setPatients(data.patients || []);
    } catch (err) {
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  }, [search, gender]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadPatients();
    }, 300);
    return () => clearTimeout(timeout);
  }, [loadPatients]);

  return (
    <DoctorDashboardLayout>
      <div>
        <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
          <Users className="text-primary-600" size={24} /> Patient List
        </h1>
        <p className="text-slate-500 mt-1">
          All registered patients in the VitalSync system.
        </p>
      </div>

      <div className="card-surface p-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email, blood group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input-field sm:w-48"
        >
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="card-surface p-6">
        <div className="flex items-center gap-2 font-bold text-primary-950 mb-5">
          <Users size={18} className="text-primary-600" /> All Registered
          Patients
          <span className="h-6 w-6 flex items-center justify-center bg-primary-600 text-white text-xs font-bold rounded-full">
            {patients.length}
          </span>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
          </div>
        ) : (
          <DoctorPatientsTable patients={patients} />
        )}
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorPatientListPage;
