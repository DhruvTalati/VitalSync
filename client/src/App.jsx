import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AddVitalsPage from "./pages/AddVitalsPage.jsx";
import MedicalRecordsPage from "./pages/MedicalRecordsPage.jsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.jsx";
import PrescriptionsPage from "./pages/PrescriptionsPage.jsx";
import WalletPage from "./pages/WalletPage.jsx";
import DoctorDashboardPage from "./pages/DoctorDashboardPage.jsx";
import DoctorPatientListPage from "./pages/DoctorPatientListPage.jsx";
import DoctorMedicalRecordsPage from "./pages/DoctorMedicalRecordsPage.jsx";
import DoctorPrescriptionsPage from "./pages/DoctorPrescriptionsPage.jsx";
import DoctorWalletPage from "./pages/DoctorWalletPage.jsx";
import DoctorPatientVitalsPage from "./pages/DoctorPatientVitalsPage.jsx";
import DoctorPatientRecordsPage from "./pages/DoctorPatientRecordsPage.jsx";
import VideoConsultationPage from "./pages/VideoConsultationPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/add-vitals"
        element={
          <ProtectedRoute>
            <AddVitalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/medical-records"
        element={
          <ProtectedRoute>
            <MedicalRecordsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/book-appointment"
        element={
          <ProtectedRoute>
            <BookAppointmentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/prescriptions"
        element={
          <ProtectedRoute>
            <PrescriptionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/wallet"
        element={
          <ProtectedRoute>
            <WalletPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute>
            <DoctorDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patients"
        element={
          <ProtectedRoute>
            <DoctorPatientListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patients/:patientId/vitals"
        element={
          <ProtectedRoute>
            <DoctorPatientVitalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patients/:patientId/records"
        element={
          <ProtectedRoute>
            <DoctorPatientRecordsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/medical-records"
        element={
          <ProtectedRoute>
            <DoctorMedicalRecordsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/prescriptions"
        element={
          <ProtectedRoute>
            <DoctorPrescriptionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/wallet"
        element={
          <ProtectedRoute>
            <DoctorWalletPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/video-call/:appointmentId"
        element={
          <ProtectedRoute>
            <VideoConsultationPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
