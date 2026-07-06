import React from "react";
import { X } from "lucide-react";

const MedicationReminderRow = ({
  medication,
  onChange,
  onRemove,
  showRemove,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[2fr,1fr,1fr,auto] gap-3">
      <input
        type="text"
        placeholder="Medication Name (e.g. Paracetamol)"
        value={medication.name}
        onChange={(e) => onChange({ ...medication, name: e.target.value })}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Freq (Hrs)"
        value={medication.frequencyHours}
        onChange={(e) =>
          onChange({ ...medication, frequencyHours: e.target.value })
        }
        className="input-field"
      />
      <input
        type="number"
        placeholder="Dur (Days)"
        value={medication.durationDays}
        onChange={(e) =>
          onChange({ ...medication, durationDays: e.target.value })
        }
        className="input-field"
      />
      <button
        type="button"
        onClick={onRemove}
        disabled={!showRemove}
        className="border border-red-300 text-red-500 hover:bg-red-50 rounded-xl px-4 flex items-center justify-center disabled:opacity-40"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default MedicationReminderRow;
