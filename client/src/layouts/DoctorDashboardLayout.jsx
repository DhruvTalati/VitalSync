import React from "react";
import DoctorSidebar from "../components/layouts/DoctorSidebar.jsx";

const DoctorDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DoctorSidebar />
      <main className="flex-1 min-w-0 p-6 lg:p-8 space-y-6">{children}</main>
    </div>
  );
};

export default DoctorDashboardLayout;
