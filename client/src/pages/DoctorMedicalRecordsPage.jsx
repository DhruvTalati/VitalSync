import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FilePlus2, Plus, Save, History, RefreshCcw } from "lucide-react";
import DoctorDashboardLayout from "../layouts/DoctorDashboardLayout.jsx";
import DictationInput from "../components/doctor-records/DictationInput.jsx";
import DictationTextarea from "../components/doctor-records/DictationTextarea.jsx";
import MedicationReminderRow from "../components/doctor-records/MedicationReminderRow.jsx";
import DoctorRecordCard from "../components/doctor-records/DoctorRecordCard.jsx";
import { fetchAllPatients } from "../services/doctorService";
import { addMedicalRecord } from "../services/medicalRecordService";
import { fetchDoctorRecords } from "../services/doctorService";

const languages = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "hi-IN", label: "Hindi" },
  { value: "gu-IN", label: "Gujarati" },
];

const emptyMedication = { name: "", frequencyHours: "", durationDays: "" };

const DoctorMedicalRecordsPage = () => {
  const [patients, setPatients] = useState([]);
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [language, setLanguage] = useState("en-US");

  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [medications, setMedications] = useState([
    { ...emptyMedication },
    { ...emptyMedication },
  ]);
  const [notes, setNotes] = useState("");

  const loadData = async (isRefresh = false) => {
    try {
      const [patientsRes, recordsRes] = await Promise.all([
        fetchAllPatients(),
        fetchDoctorRecords(),
      ]);
      setPatients(patientsRes.patients || []);
      setRecords(recordsRes.records || []);
    } catch (err) {
      toast.error("Failed to load medical records data");
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateMedication = (index, updated) => {
    setMedications(medications.map((m, i) => (i === index ? updated : m)));
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const addMedicationRow = () => {
    setMedications([...medications, { ...emptyMedication }]);
  };

  const resetForm = () => {
    setSelectedPatient("");
    setDiagnosis("");
    setPrescription("");
    setMedications([{ ...emptyMedication }, { ...emptyMedication }]);
    setNotes("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !diagnosis) {
      toast.error("Please select a patient and enter a diagnosis");
      return;
    }
    setSubmitting(true);
    try {
      const validMedications = medications
        .filter((m) => m.name)
        .map((m) => ({
          name: m.name,
          frequencyHours: Number(m.frequencyHours) || 0,
          durationDays: Number(m.durationDays) || 0,
        }));

      const data = await addMedicalRecord({
        patient: selectedPatient,
        diagnosis,
        prescription,
        medications: validMedications,
        notes,
      });

      setRecords([
        {
          ...data.record,
          patient: patients.find((p) => p._id === selectedPatient),
        },
        ...records,
      ]);
      toast.success("Medical record added");
      resetForm();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add medical record",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DoctorDashboardLayout>
      <div>
        <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
          <FilePlus2 className="text-primary-600" size={24} /> Medical Records
        </h1>
        <p className="text-slate-500 mt-1">
          Add diagnoses and view patient medical history.
        </p>
      </div>

      <div className="card-surface p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2 font-bold text-primary-950">
            <Plus size={18} className="text-emerald-500" /> Add Medical Record
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              Dictation Language
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field !py-1.5 !w-40 text-sm"
            >
              {languages.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label">Select Patient *</label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="input-field"
              >
                <option value="">— Select Patient —</option>
                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <DictationInput
              label="Diagnosis *"
              value={diagnosis}
              onChange={setDiagnosis}
              placeholder="e.g. Hypertension"
              lang={language}
              required
            />
          </div>

          <DictationTextarea
            label="Prescription (General)"
            value={prescription}
            onChange={setPrescription}
            placeholder="Amlodipine 5mg once daily..."
            rows={3}
            lang={language}
          />

          <div>
            <p className="flex items-center gap-2 font-semibold text-sm text-primary-950 mb-3">
              <span>💊</span> Structured Medication Reminders
            </p>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <MedicationReminderRow
                  key={index}
                  medication={med}
                  onChange={(updated) => updateMedication(index, updated)}
                  onRemove={() => removeMedication(index)}
                  showRemove={medications.length > 0}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addMedicationRow}
              className="btn-secondary text-sm mt-3"
            >
              <Plus size={14} /> Add Another Medicine
            </button>
          </div>

          <DictationTextarea
            label="Treatment Notes"
            value={notes}
            onChange={setNotes}
            placeholder="Lifestyle advice, follow-up dates..."
            rows={3}
            lang={language}
          />

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-60"
          >
            <Save size={16} /> Add Record
          </button>
        </form>
      </div>

      <div className="card-surface p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-bold text-primary-950">
            <History size={18} className="text-primary-600" /> Records History
          </div>
          <button
            onClick={() => loadData(true)}
            className="btn-secondary !py-2 !px-4 text-sm"
          >
            <RefreshCcw size={14} /> Refresh
          </button>
        </div>

        {loadingRecords ? (
          <div className="h-40 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <FilePlus2 className="mx-auto mb-3 text-slate-300" size={40} />
            No medical records found.
          </div>
        ) : (
          <div className="space-y-6">
            {records.map((record) => (
              <DoctorRecordCard key={record._id} record={record} />
            ))}
          </div>
        )}
      </div>
    </DoctorDashboardLayout>
  );
};

export default DoctorMedicalRecordsPage;
