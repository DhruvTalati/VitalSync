import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Users,
  Clock,
  CheckCircle2,
  CalendarCheck2,
  AlertTriangle,
  FileEdit,
  CalendarDays,
  PercentCircle,
} from "lucide-react";
import DoctorDashboardLayout from "../layouts/DoctorDashboardLayout.jsx";
import DoctorWelcomeBanner from "../components/doctor-dashboard/DoctorWelcomeBanner.jsx";
import QuickStatCard from "../components/dashboard/QuickStatCard.jsx";
import AbnormalVitalsCard from "../components/doctor-dashboard/AbnormalVitalsCard.jsx";
import AppointmentStatusChart from "../components/doctor-dashboard/AppointmentStatusChart.jsx";
import AwaitingConfirmationCard from "../components/doctor-dashboard/AwaitingConfirmationCard.jsx";
import AllAppointmentsTable from "../components/doctor-dashboard/AllAppointmentsTable.jsx";
import ClinicBedAllocationsTable from "../components/doctor-dashboard/ClinicBedAllocationsTable.jsx";
import MyPatientsPanel from "../components/doctor-dashboard/MyPatientsPanel.jsx";
import BloodBankInventoryTable from "../components/doctor-dashboard/BloodBankInventoryTable.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useDoctorDashboardData } from "../hooks/useDoctorDashboardData.js";
import {
  updateAppointmentStatus,
  deleteAppointment as removeAppointment,
} from "../services/appointmentService";
import {
  updateBed as updateBedRequest,
  updateBloodInventory as updateBloodRequest,
} from "../services/doctorService";
import { generateRoomName } from "../utils/videoCall.js";

const DoctorDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    stats,
    abnormalVitals,
    patients,
    beds,
    bloodInventory,
    appointments,
    setAppointments,
    setBeds,
    setBloodInventory,
    loading,
    refreshing,
    refresh,
  } = useDoctorDashboardData();

  if (loading) {
    return (
      <DoctorDashboardLayout>
        <div className="h-96 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
        </div>
      </DoctorDashboardLayout>
    );
  }

  const handleConfirm = async (id, andRecord = false) => {
    try {
      const data = await updateAppointmentStatus(id, { status: "confirmed" });
      setAppointments(
        appointments.map((a) => (a._id === id ? data.appointment : a)),
      );
      toast.success("Appointment confirmed");
      if (andRecord) navigate("/doctor/medical-records");
    } catch (err) {
      toast.error("Failed to confirm appointment");
    }
  };

  const handleReject = async (id) => {
    try {
      const data = await updateAppointmentStatus(id, { status: "rejected" });
      setAppointments(
        appointments.map((a) => (a._id === id ? data.appointment : a)),
      );
      toast.success("Appointment rejected");
    } catch (err) {
      toast.error("Failed to reject appointment");
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await removeAppointment(id);
      setAppointments(appointments.filter((a) => a._id !== id));
      toast.success("Appointment removed");
    } catch (err) {
      toast.error("Failed to remove appointment");
    }
  };

  const handleCall = (appointmentId) => {
    const room = generateRoomName(appointmentId);
    window.open(`/doctor/video-call/${room}`, "_blank");
  };

  const handleToggleBed = async (bed) => {
    try {
      const nextStatus = bed.status === "Available" ? "Occupied" : "Available";
      const data = await updateBedRequest(bed._id, {
        status: nextStatus,
        patientId: null,
      });
      setBeds(beds.map((b) => (b._id === bed._id ? data.bed : b)));
    } catch (err) {
      toast.error("Failed to update bed");
    }
  };

  const handleUpdateBlood = async (bloodGroup, units) => {
    try {
      const data = await updateBloodRequest(bloodGroup, units);
      setBloodInventory(
        bloodInventory.map((b) =>
          b.bloodGroup === bloodGroup ? data.record : b,
        ),
      );
      toast.success("Inventory updated");
    } catch (err) {
      toast.error("Failed to update inventory");
    }
  };

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending",
  );

  return (
    <DoctorDashboardLayout>
      <DoctorWelcomeBanner
        name={user?.name}
        hospitalName={user?.hospitalName || "Zydus Hospital Anand"}
        hospitalAddress={user?.hospitalAddress || "Anand-Lambhvel Road"}
        alertsCount={stats?.abnormalVitalsCount || 0}
        onViewPatients={() => navigate("/doctor/patients")}
        onAddRecord={() => navigate("/doctor/medical-records")}
        onRefresh={refresh}
        refreshing={refreshing}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <QuickStatCard
          icon={Users}
          value={stats?.totalPatients}
          label="Total Patients"
          color="blue"
        />
        <QuickStatCard
          icon={Clock}
          value={stats?.awaitingConfirmation}
          label="Awaiting Confirmation"
          color="amber"
        />
        <QuickStatCard
          icon={CheckCircle2}
          value={stats?.confirmed}
          label="Confirmed"
          color="blue"
        />
        <QuickStatCard
          icon={CalendarCheck2}
          value={stats?.completed}
          label="Completed"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <QuickStatCard
          icon={AlertTriangle}
          value={stats?.abnormalVitalsCount}
          label="Abnormal Vitals"
          color="amber"
        />
        <QuickStatCard
          icon={FileEdit}
          value={stats?.recordsWritten}
          label="Records Written"
          color="green"
        />
        <QuickStatCard
          icon={CalendarDays}
          value={stats?.todaysAppointments}
          label="Today's Appointments"
          color="purple"
        />
        <QuickStatCard
          icon={PercentCircle}
          value={`${stats?.completionRate}%`}
          label="Completion Rate"
          color="blue"
        />
      </div>

      <AbnormalVitalsCard
        vitals={abnormalVitals}
        onAddRecord={() => navigate("/doctor/medical-records")}
        onView={(id) => navigate(`/doctor/patients/${id}/vitals`)}
        onDelete={() =>
          toast("Vital deletion available from patient vitals view")
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentStatusChart
          pending={appointments.filter((a) => a.status === "pending").length}
          confirmed={
            appointments.filter((a) => a.status === "confirmed").length
          }
          completed={
            appointments.filter((a) => a.status === "completed").length
          }
          rejected={appointments.filter((a) => a.status === "rejected").length}
        />
        <AwaitingConfirmationCard
          appointments={pendingAppointments}
          onConfirm={handleConfirm}
          onReject={handleReject}
        />
      </div>

      <AllAppointmentsTable
        appointments={appointments}
        onAddRecord={() => navigate("/doctor/medical-records")}
        onCall={handleCall}
        onDelete={handleDeleteAppointment}
        onConfirm={handleConfirm}
        onReject={handleReject}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClinicBedAllocationsTable beds={beds} onToggle={handleToggleBed} />
        <MyPatientsPanel
          patients={patients}
          onAddRecord={() => navigate("/doctor/medical-records")}
        />
      </div>

      <BloodBankInventoryTable
        inventory={bloodInventory}
        onUpdate={handleUpdateBlood}
      />
    </DoctorDashboardLayout>
  );
};

export default DoctorDashboardPage;
