import React from 'react';
import { Receipt, CheckCircle2, Stethoscope, Pill } from 'lucide-react';

const MedicalBillsCard = ({ bills = [], onPay }) => {
  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2 font-bold text-primary-950 mb-6">
        <Receipt size={18} className="text-red-500" /> Medical Bills
      </div>

      {bills.length === 0 ? (
        <p className="text-center text-slate-400 text-sm py-10">No bills yet</p>
      ) : (
        <ul className="space-y-4">
          {bills.map((bill) => (
            <li key={bill._id} className="flex items-center justify-between border border-slate-100 rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${bill.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-primary-950 flex items-center gap-2">
                    {bill.label}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${bill.status === 'paid' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                      {bill.status}
                    </span>
                  </p>
                  <p className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <Stethoscope size={12} /> Consultation: ₹{bill.consultationFee}
                    <Pill size={12} /> Medicines: ₹{bill.medicineFee}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(bill.billDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-primary-950">₹{bill.totalAmount}</p>
                {bill.status === 'paid' ? (
                  <p className="text-xs text-emerald-600 font-medium">Auto-paid</p>
                ) : (
                  <button onClick={() => onPay(bill._id)} className="text-xs font-semibold text-primary-600 hover:text-primary-700 mt-1">
                    Pay now
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicalBillsCard;