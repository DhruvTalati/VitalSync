import React from 'react';
import { Building2, Cross, Pill, LayoutGrid, Phone } from 'lucide-react';

const filters = [
  { value: 'all', label: 'All Facilities', icon: LayoutGrid },
  { value: 'hospital', label: 'Hospitals', icon: Cross },
  { value: 'clinic', label: 'Clinics', icon: Building2 },
  { value: 'pharmacy', label: 'Pharmacies', icon: Pill }
];

const typeBadge = {
  hospital: 'bg-red-100 text-red-700',
  clinic: 'bg-blue-100 text-blue-700',
  pharmacy: 'bg-emerald-100 text-emerald-700'
};

const FacilityList = ({ facilities = [], activeFilter, onFilterChange }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`flex items-center gap-1.5 text-sm font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
              activeFilter === f.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'
            }`}
          >
            <f.icon size={14} /> {f.label}
          </button>
        ))}
      </div>

      <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-96 overflow-y-auto">
        {facilities.length === 0 && <p className="p-6 text-center text-slate-400 text-sm">No facilities found</p>}
        {facilities.map((f) => (
          <div key={f._id} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-sm text-primary-950">{f.name}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${typeBadge[f.type]}`}>{f.type}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{f.address}</p>
            {f.phone && (
              <p className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
                <Phone size={12} /> {f.phone}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityList;