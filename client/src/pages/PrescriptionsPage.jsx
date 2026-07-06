import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Pill } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import PrescriptionCard from '../components/prescriptions/PrescriptionCard.jsx';
import { fetchPrescriptions, removePrescription } from '../services/prescriptionService';
import { generatePrescriptionPdf } from '../utils/generatePrescriptionPdf';
import { useAuth } from '../context/AuthContext.jsx';

const PrescriptionsPage = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPrescriptions();
        setPrescriptions(data.prescriptions || []);
      } catch (err) {
        toast.error('Failed to load prescriptions');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await removePrescription(id);
      setPrescriptions(prescriptions.filter((p) => p._id !== id));
      toast.success('Prescription deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete prescription');
    }
  };

  const handleDownload = (prescription) => {
    generatePrescriptionPdf(prescription, user?.name);
    toast.success('Prescription PDF downloaded');
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
          <Pill className="text-primary-600" size={24} /> Prescriptions
        </h1>
        <p className="text-slate-500 mt-1">View all prescriptions and download as PDF.</p>
        <p className="text-sm text-slate-400 mt-2">{prescriptions.length} prescription(s) found</p>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
        </div>
      ) : prescriptions.length === 0 ? (
        <div className="card-surface p-16 text-center text-slate-400">No prescriptions found yet.</div>
      ) : (
        <div className="space-y-6">
          {prescriptions.map((p) => (
            <PrescriptionCard
              key={p._id}
              prescription={p}
              patientName={user?.name}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default PrescriptionsPage;