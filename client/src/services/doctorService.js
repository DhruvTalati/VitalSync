import api from "./api";

export const fetchDoctorStats = async () => {
  const { data } = await api.get("/doctor/stats");
  return data;
};

export const fetchAbnormalVitals = async () => {
  const { data } = await api.get("/doctor/abnormal-vitals");
  return data;
};

export const fetchAllPatients = async (params = {}) => {
  const { data } = await api.get("/doctor/patients", { params });
  return data;
};

export const fetchMyPatientsWithRisk = async () => {
  const { data } = await api.get("/doctor/my-patients");
  return data;
};

export const fetchBeds = async () => {
  const { data } = await api.get("/doctor/beds");
  return data;
};

export const updateBed = async (id, payload) => {
  const { data } = await api.patch(`/doctor/beds/${id}`, payload);
  return data;
};

export const fetchBloodInventory = async () => {
  const { data } = await api.get("/doctor/blood-inventory");
  return data;
};

export const updateBloodInventory = async (bloodGroup, units) => {
  const { data } = await api.patch(`/doctor/blood-inventory/${bloodGroup}`, {
    units,
  });
  return data;
};

export const fetchDoctorAppointments = async () => {
  const { data } = await api.get("/appointments/doctor/mine");
  return data;
};

export const fetchDoctorRecords = async () => {
  const { data } = await api.get("/medical-records/doctor/mine");
  return data;
};

export const fetchDoctorPrescriptions = async () => {
  const { data } = await api.get("/prescriptions/doctor/mine");
  return data;
};
