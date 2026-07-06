import React, { useState } from "react";
import { Droplet } from "lucide-react";

const BloodBankInventoryTable = ({ inventory = [], onUpdate }) => {
  const [values, setValues] = useState({});

  const handleChange = (bloodGroup, value) => {
    setValues((prev) => ({ ...prev, [bloodGroup]: value }));
  };

  const handleUpdate = (bloodGroup) => {
    const units = values[bloodGroup];
    if (units === undefined) return;
    onUpdate(bloodGroup, Number(units));
  };

  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-5">
        <Droplet size={18} className="text-red-500" /> Blood Bank Inventory
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 font-semibold">Blood Group</th>
              <th className="py-3 font-semibold">Available Units</th>
              <th className="py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr
                key={item.bloodGroup}
                className="border-b border-slate-50 last:border-0"
              >
                <td className="py-3.5 font-bold text-red-500">
                  {item.bloodGroup}
                </td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={item.units}
                      onChange={(e) =>
                        handleChange(item.bloodGroup, e.target.value)
                      }
                      className="input-field !py-1.5 w-28"
                    />
                    <span className="text-slate-500">Units</span>
                  </div>
                </td>
                <td className="py-3.5">
                  <button
                    onClick={() => handleUpdate(item.bloodGroup)}
                    className="btn-secondary !py-1.5 !px-5 text-xs"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BloodBankInventoryTable;
