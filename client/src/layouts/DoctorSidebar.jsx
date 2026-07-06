import React from "react";
import { NavLink } from "react-router-dom";
import {
  HeartPulse,
  LayoutDashboard,
  Users,
  FilePlus2,
  Pill,
  Wallet,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const navItems = [
  { label: "Dashboard", to: "/doctor/dashboard", icon: LayoutDashboard },
  { label: "My Patients", to: "/doctor/patients", icon: Users },
  { label: "Medical Records", to: "/doctor/medical-records", icon: FilePlus2 },
  { label: "Prescriptions", to: "/doctor/prescriptions", icon: Pill },
  { label: "My Wallet", to: "/doctor/wallet", icon: Wallet },
];

const DoctorSidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#0b1220] text-slate-300 flex-shrink-0">
      <div className="px-6 py-7 flex items-center gap-2 border-b border-white/5">
        <HeartPulse className="text-primary-400" size={26} />
        <span className="text-white font-extrabold text-lg">
          Vital<span className="text-primary-400">Sync</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/doctor/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-600/15 text-primary-300"
                  : "hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-5 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="h-9 w-9 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
            {user?.name?.charAt(0) || "D"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold leading-tight truncate">
              Dr. {user?.name || "Doctor"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.specialization || "Physician"}
              {user?.hospitalName ? ` • ${user.hospitalName}` : ""}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-lg py-2 text-sm font-semibold transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default DoctorSidebar;
