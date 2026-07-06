import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { FilePlus2, History, RefreshCcw } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import RecordCard from '../components/records/RecordCard.jsx';
import { fetchMedicalRecords } from '../services/medicalRecordService';

const MedicalRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecords = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const data = await fetchMedicalRecords();
      setRecords(data.records || []);
    } catch (err) {
      toast.error('Failed to load medical records');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
          <FilePlus2 className="text-primary-600" size={24} /> Medical Records
        </h1>
        <p className="text-slate-500 mt-1">View your medical history, diagnoses and treatment notes.</p>
      </div>

      <div className="card-surface p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-bold text-primary-950">
            <History size={18} className="text-primary-600" /> Records History
          </div>
          <button onClick={() => loadRecords(true)} className="btn-secondary !py-2 !px-4 text-sm">
            <RefreshCcw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="py-16 text-center text-slate-400">No medical records found yet.</div>
        ) : (
          <div className="space-y-6">
            {records.map((record) => (
              <RecordCard key={record._id} record={record} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MedicalRecordsPage;