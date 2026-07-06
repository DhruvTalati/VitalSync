import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { CalendarPlus2, Stethoscope, Radio, TicketCheck, Mail, MapPin, Locate } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import StepInfoCard from '../components/appointments/StepInfoCard.jsx';
import FacilityMap from '../components/appointments/FacilityMap.jsx';
import FacilityList from '../components/appointments/FacilityList.jsx';
import NewAppointmentForm from '../components/appointments/NewAppointmentForm.jsx';
import MyAppointmentsList from '../components/appointments/MyAppointmentsList.jsx';
import { fetchFacilities } from '../services/facilityService';
import { fetchDoctors, fetchAppointments, createAppointment, cancelAppointment } from '../services/appointmentService';

const BookAppointmentPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [filter, setFilter] = useState('all');
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadFacilities = useCallback(async (type) => {
    try {
      const data = await fetchFacilities(type);
      setFacilities(data.facilities || []);
    } catch (err) {
      toast.error('Failed to load nearby facilities');
    }
  }, []);

  const loadAll = useCallback(async () => {
    try {
      const [doctorsRes, apptRes] = await Promise.all([fetchDoctors(), fetchAppointments()]);
      setDoctors(doctorsRes.doctors || []);
      setAppointments(apptRes.appointments || []);
      await loadFacilities('all');
    } catch (err) {
      toast.error('Failed to load booking data');
    } finally {
      setLoading(false);
    }
  }, [loadFacilities]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const handleFilterChange = (value) => {
    setFilter(value);
    loadFacilities(value);
  };

  const handleBook = async (payload) => {
    setSubmitting(true);
    try {
      const data = await createAppointment(payload);
      setAppointments([data.appointment, ...appointments]);
      toast.success('Appointment requested successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      setAppointments(appointments.filter((a) => a._id !== id));
      toast.success('Appointment cancelled');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-extrabold text-primary-950 flex items-center gap-2">
          <CalendarPlus2 className="text-primary-600" size={24} /> Book Appointment
        </h1>
        <p className="text-slate-500 mt-1">Schedule a consultation. Our AI Triage System will assess urgency and assign your queue position.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StepInfoCard icon={Stethoscope} step="Step 1" title="Book with symptoms" color="blue" />
        <StepInfoCard icon={Radio} step="Step 2" title="AI Triage analysis" color="red" />
        <StepInfoCard icon={TicketCheck} step="Step 3" title="Get queue token" color="green" />
        <StepInfoCard icon={Mail} step="Step 4" title="Email confirmation" color="amber" />
      </div>

      <div className="card-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <p className="flex items-center gap-2 font-bold text-primary-950">
              <MapPin size={18} className="text-red-500" /> Nearby Medical Facilities – Anand, Gujarat
            </p>
            <p className="text-xs text-slate-400 mt-1">Showing {facilities.length} facilities</p>
          </div>
          <button className="btn-secondary !py-2 !px-4 text-sm">
            <Locate size={14} /> Locate Me
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FacilityMap facilities={facilities} />
          </div>
          <FacilityList facilities={facilities} activeFilter={filter} onFilterChange={handleFilterChange} />
        </div>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NewAppointmentForm doctors={doctors} onSubmit={handleBook} submitting={submitting} />
          <MyAppointmentsList appointments={appointments} onCancel={handleCancel} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default BookAppointmentPage;