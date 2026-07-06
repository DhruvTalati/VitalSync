import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  fetchDoctorStats,
  fetchAbnormalVitals,
  fetchMyPatientsWithRisk,
  fetchBeds,
  fetchBloodInventory,
  fetchDoctorAppointments,
} from "../services/doctorService";

export const useDoctorDashboardData = () => {
  const [stats, setStats] = useState(null);
  const [abnormalVitals, setAbnormalVitals] = useState([]);
  const [patients, setPatients] = useState([]);
  const [beds, setBeds] = useState([]);
  const [bloodInventory, setBloodInventory] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [statsRes, abnormalRes, patientsRes, bedsRes, bloodRes, apptRes] =
        await Promise.all([
          fetchDoctorStats(),
          fetchAbnormalVitals(),
          fetchMyPatientsWithRisk(),
          fetchBeds(),
          fetchBloodInventory(),
          fetchDoctorAppointments(),
        ]);
      setStats(statsRes.stats);
      setAbnormalVitals(abnormalRes.abnormalVitals || []);
      setPatients(patientsRes.patients || []);
      setBeds(bedsRes.beds || []);
      setBloodInventory(bloodRes.inventory || []);
      setAppointments(apptRes.appointments || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to load doctor dashboard",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return {
    stats,
    abnormalVitals,
    patients,
    beds,
    bloodInventory,
    appointments,
    setAppointments,
    setBeds,
    setBloodInventory,
    loading,
    refreshing,
    refresh: () => loadAll(true),
  };
};
