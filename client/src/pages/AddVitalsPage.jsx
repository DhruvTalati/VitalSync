import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HeartPulse, Activity, Wind, Thermometer, Droplet, Save, X } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import VitalRangeCard from '../components/vitals/VitalRangeCard.jsx';
import RecentRecordsList from '../components/vitals/RecentRecordsList.jsx';
import { fetchVitals, addVital } from '../services/vitalService';

const AddVitalsPage = () => {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState({ heartRate: '--', oxygenLevel: '--', temperature: '--', bloodSugar: '--' });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: { heartRate: '', bloodPressure: '', oxygenLevel: '', temperature: '', bloodSugar: '' }
  });

  const watched = watch();

  useEffect(() => {
    setPreview({
      heartRate: watched.heartRate || '--',
      oxygenLevel: watched.oxygenLevel || '--',
      temperature: watched.temperature || '--',
      bloodSugar: watched.bloodSugar || '--'
    });
  }, [watched.heartRate, watched.oxygenLevel, watched.temperature, watched.bloodSugar]);

  const loadVitals = async () => {
    try {
      const data = await fetchVitals();
      setVitals(data.vitals || []);
    } catch (err) {
      toast.error('Failed to load recent records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVitals();
  }, []);

  const onSubmit = async (values) => {
    const [systolic, diastolic] = values.bloodPressure.split('/').map((v) => Number(v.trim()));
    setSubmitting(true);
    try {
      const data = await addVital({
        heartRate: Number(values.heartRate),
        bloodPressureSystolic: systolic,
        bloodPressureDiastolic: diastolic,
        oxygenLevel: Number(values.oxygenLevel),
        temperature: Number(values.temperature),
        weight: values.bloodSugar ? Number(values.bloodSugar) : undefined
      });
      setVitals([data.vital, ...vitals]);
      toast.success('Vitals saved successfully');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save vitals');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
          <HeartPulse className="text-red-500" size={24} /> Add Vital Statistics
        </h1>
        <p className="text-slate-500 mt-1">Record your daily health measurements to track your wellness over time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <VitalRangeCard icon={Activity} range="60–100" label="Normal Heart Rate (bpm)" color="red" />
        <VitalRangeCard icon={Activity} range="120/80" label="Ideal Blood Pressure" color="blue" />
        <VitalRangeCard icon={Wind} range=">95%" label="Normal Oxygen Level" color="green" />
        <VitalRangeCard icon={Thermometer} range="36.1–37.2" label="Normal Temperature (°C)" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-surface p-6">
          <div className="flex items-center gap-2 font-bold text-primary-950 mb-6">
            <span className="text-emerald-500 text-lg">+</span> Log Today's Vitals
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="field-label">Heart Rate (bpm) *</label>
                <div className="relative">
                  <HeartPulse className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" size={18} />
                  <input
                    type="number"
                    placeholder="72"
                    className="input-field pl-10 pr-14"
                    {...register('heartRate', { required: 'Heart rate is required', min: { value: 30, message: 'Too low' }, max: { value: 220, message: 'Too high' } })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">bpm</span>
                </div>
                {errors.heartRate && <p className="field-error">{errors.heartRate.message}</p>}
              </div>

              <div>
                <label className="field-label">Blood Pressure</label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" size={18} />
                  <input
                    type="text"
                    placeholder="120/80"
                    className="input-field pl-10 pr-16"
                    {...register('bloodPressure', {
                      required: 'Blood pressure is required',
                      pattern: { value: /^\d{2,3}\/\d{2,3}$/, message: 'Format: systolic/diastolic' }
                    })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">mmHg</span>
                </div>
                {errors.bloodPressure && <p className="field-error">{errors.bloodPressure.message}</p>}
              </div>

              <div>
                <label className="field-label">Oxygen Level (SpO₂) *</label>
                <div className="relative">
                  <Wind className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={18} />
                  <input
                    type="number"
                    placeholder="98"
                    className="input-field pl-10 pr-10"
                    {...register('oxygenLevel', { required: 'Oxygen level is required', min: { value: 50, message: 'Too low' }, max: { value: 100, message: 'Max 100' } })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">%</span>
                </div>
                {errors.oxygenLevel && <p className="field-error">{errors.oxygenLevel.message}</p>}
              </div>

              <div>
                <label className="field-label">Body Temperature *</label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="36.6"
                    className="input-field pl-10 pr-10"
                    {...register('temperature', { required: 'Temperature is required', min: { value: 30, message: 'Too low' }, max: { value: 43, message: 'Too high' } })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">°C</span>
                </div>
                {errors.temperature && <p className="field-error">{errors.temperature.message}</p>}
              </div>
            </div>

            <div>
              <label className="field-label">Blood Sugar Level (optional)</label>
              <div className="relative max-w-xs">
                <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400" size={18} />
                <input type="number" placeholder="100" className="input-field pl-10 pr-16" {...register('bloodSugar')} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">mg/dL</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Normal: 70–140 mg/dL | Critical: &gt;250 mg/dL</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="bg-slate-100 rounded-lg py-3 text-center">
                <p className="text-xs text-slate-500">Heart Rate</p>
                <p className="font-bold text-primary-950">{preview.heartRate}</p>
              </div>
              <div className="bg-slate-100 rounded-lg py-3 text-center">
                <p className="text-xs text-slate-500">Oxygen</p>
                <p className="font-bold text-primary-950">{preview.oxygenLevel}</p>
              </div>
              <div className="bg-slate-100 rounded-lg py-3 text-center">
                <p className="text-xs text-slate-500">Temperature</p>
                <p className="font-bold text-primary-950">{preview.temperature}</p>
              </div>
              <div className="bg-slate-100 rounded-lg py-3 text-center">
                <p className="text-xs text-slate-500">Sugar</p>
                <p className="font-bold text-primary-950">{preview.bloodSugar}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                <Save size={16} /> Save Vitals
              </button>
              <button type="button" onClick={() => reset()} className="btn-secondary">
                <X size={16} /> Clear
              </button>
            </div>
          </form>
        </div>

        <RecentRecordsList vitals={vitals} />
      </div>
    </DashboardLayout>
  );
};

export default AddVitalsPage;