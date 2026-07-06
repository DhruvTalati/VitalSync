import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Gauge, Wind, Thermometer, ListChecks, CalendarCheck2, Clock, FileText } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import WelcomeBanner from '../components/dashboard/WelcomeBanner.jsx';
import VitalStatCard from '../components/dashboard/VitalStatCard.jsx';
import QuickStatCard from '../components/dashboard/QuickStatCard.jsx';
import MedicalWalletCard from '../components/dashboard/MedicalWalletCard.jsx';
import RecentTransactionsCard from '../components/dashboard/RecentTransactionsCard.jsx';
import BudgetTrackerChart from '../components/dashboard/BudgetTrackerChart.jsx';
import AiHealthRiskCard from '../components/dashboard/AiHealthRiskCard.jsx';
import HealthTrendAnalyzer from '../components/dashboard/HealthTrendAnalyzer.jsx';
import VitalsTrendChart from '../components/dashboard/VitalsTrendChart.jsx';
import UpcomingAppointmentsCard from '../components/dashboard/UpcomingAppointmentsCard.jsx';
import RecentVitalsHistoryTable from '../components/dashboard/RecentVitalsHistoryTable.jsx';
import MedicationRemindersCard from '../components/dashboard/MedicationRemindersCard.jsx';
import RecentActivityCard from '../components/dashboard/RecentActivityCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useDashboardData } from '../hooks/useDashboardData.js';
import {
  buildBudgetData,
  buildVitalsTrendData,
  buildHealthTrendData,
  computeRiskScore,
  buildRiskTrend,
  buildRecentActivity
} from '../utils/dashboardHelpers.js';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { vitals, appointments, wallet, records, loading, refreshing, refresh, addFunds } = useDashboardData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-96 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  const latest = vitals[0];
  const { score: riskScore, level: riskLevel } = computeRiskScore(vitals);
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;

  return (
    <DashboardLayout>
      <WelcomeBanner
        name={user?.name}
        onLogVitals={() => navigate('/dashboard/add-vitals')}
        onBookAppointment={() => navigate('/dashboard/book-appointment')}
        onRefresh={refresh}
        refreshing={refreshing}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <VitalStatCard icon={HeartPulse} value={latest ? `${latest.heartRate}` : '--'} label="Heart Rate (bpm)" badge="Normal" color="red" />
        <VitalStatCard icon={Gauge} value={latest ? `${latest.bloodPressureSystolic}/${latest.bloodPressureDiastolic}` : '--'} label="Blood Pressure" badge="Latest" color="blue" />
        <VitalStatCard icon={Wind} value={latest ? `${latest.oxygenLevel}%` : '--'} label="Oxygen Level (%)" badge="Normal" color="green" />
        <VitalStatCard icon={Thermometer} value={latest ? `${latest.temperature}°C` : '--'} label="Temperature (°C)" badge="Normal" color="amber" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <QuickStatCard icon={ListChecks} value={vitals.length} label="Total Vitals Logged" color="blue" />
        <QuickStatCard icon={CalendarCheck2} value={confirmedCount} label="Confirmed Appointments" color="green" />
        <QuickStatCard icon={Clock} value={pendingCount} label="Awaiting Response" color="amber" />
        <QuickStatCard icon={FileText} value={records.length} label="Medical Records" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MedicalWalletCard balance={wallet?.balance} onAddFunds={addFunds} />
        </div>
        <div className="lg:col-span-2">
          <RecentTransactionsCard transactions={wallet?.transactions} />
        </div>
      </div>

      <BudgetTrackerChart data={buildBudgetData(wallet?.transactions)} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AiHealthRiskCard riskScore={riskScore} riskLevel={riskLevel} trend={buildRiskTrend(vitals)} />
        <HealthTrendAnalyzer data={buildHealthTrendData(vitals)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VitalsTrendChart data={buildVitalsTrendData(vitals)} onAddVitals={() => navigate('/dashboard/add-vitals')} />
        </div>
        <UpcomingAppointmentsCard appointments={appointments} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentVitalsHistoryTable vitals={vitals.slice(0, 10)} />
        </div>
        <MedicationRemindersCard reminders={[]} />
      </div>

      <RecentActivityCard activities={buildRecentActivity({ appointments, vitals, records })} />
    </DashboardLayout>
  );
};

export default DashboardPage;