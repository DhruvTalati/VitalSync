import React from "react";
import Sidebar from "../components/layouts/Sidebar.jsx";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6 lg:p-8 space-y-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
