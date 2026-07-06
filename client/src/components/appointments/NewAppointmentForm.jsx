import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, AlertTriangle, CalendarCheck } from 'lucide-react';

const EMERGENCY_KEYWORDS = ['chest pain', 'severe', 'difficulty breathing', 'unconscious', 'bleeding', 'seizure'];

const NewAppointmentForm = ({ doctors = [], onSubmit, submitting }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const symptoms = watch('symptoms') || '';
  const isEmergency = EMERGENCY_KEYWORDS.some((k) => symptoms.toLowerCase().includes(k));

  const submitHandler = async (values) => {
    const doctor = doctors.find((d) => d._id === values.doctor);
    await onSubmit({
      doctor: values.doctor,
      doctorName: doctor ? `Dr. ${doctor.name}` : values.doctor,
      appointmentDate: values.appointmentDate,
      reason: values.reason,
      symptoms: values.symptoms
    });
    reset();
  };

  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-6">
        <Plus size={18} className="text-emerald-500" /> New Appointment
      </div>

      <form onSubmit={handleSubmit(submitHandler)} noValidate className="space-y-5">
        <div>
          <label className="field-label">Select Doctor *</label>
          <select className="input-field" {...register('doctor', { required: 'Please select a doctor' })}>
            <option value="">— Select a Doctor —</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>Dr. {d.name} — {d.specialization}</option>
            ))}
          </select>
          {errors.doctor && <p className="field-error">{errors.doctor.message}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="field-label">Appointment Date &amp; Time *</label>
            <input
              type="datetime-local"
              className="input-field"
              {...register('appointmentDate', { required: 'Please select date and time' })}
            />
            {errors.appointmentDate && <p className="field-error">{errors.appointmentDate.message}</p>}
          </div>
          <div>
            <label className="field-label">Reason for Visit</label>
            <input type="text" placeholder="e.g. Annual check-up" className="input-field" {...register('reason')} />
          </div>
        </div>

        <div>
          <label className="field-label flex items-center gap-1.5">
            <AlertTriangle size={14} className="text-red-500" /> Describe Your Symptoms (used for AI Triage)
          </label>
          <textarea
            rows={4}
            placeholder="Describe your symptoms in detail, e.g. 'severe chest pain, difficulty breathing' or 'routine check-up, mild headache'..."
            className="input-field resize-none"
            {...register('symptoms')}
          />
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs text-slate-400">Emergency keywords:</span>
            {EMERGENCY_KEYWORDS.map((k) => (
              <span key={k} className="text-xs font-medium bg-red-50 text-red-500 px-2 py-0.5 rounded-full">{k}</span>
            ))}
            <span className="text-xs text-slate-400">→ triggers <strong className="text-red-500">High Priority</strong></span>
          </div>
          {isEmergency && (
            <p className="mt-2 text-xs font-semibold text-red-600 flex items-center gap-1.5">
              <AlertTriangle size={14} /> This will be flagged as a high priority emergency appointment.
            </p>
          )}
        </div>

        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
          <CalendarCheck size={18} /> Book Appointment
        </button>
      </form>
    </div>
  );
};

export default NewAppointmentForm;