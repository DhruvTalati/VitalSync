import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { fetchVitals } from '../services/vitalService';
import { fetchAppointments } from '../services/appointmentService';
import { fetchWallet, addFunds as addFundsRequest } from '../services/walletService';
import { fetchMedicalRecords } from '../services/medicalRecordService';

export const useDashboardData = () => {
  const [vitals, setVitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAll = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [vitalsRes, apptRes, walletRes, recordsRes] = await Promise.all([
        fetchVitals(),
        fetchAppointments(),
        fetchWallet(),
        fetchMedicalRecords()
      ]);
      setVitals(vitalsRes.vitals || []);
      setAppointments(apptRes.appointments || []);
      setWallet(walletRes.wallet || null);
      setRecords(recordsRes.records || []);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const addFunds = async (amount) => {
    const data = await addFundsRequest(amount);
    setWallet(data.wallet);
    toast.success('Funds added to wallet');
    return data.wallet;
  };

  return {
    vitals,
    appointments,
    wallet,
    records,
    loading,
    refreshing,
    refresh: () => loadAll(true),
    addFunds
  };
};