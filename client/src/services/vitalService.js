import api from "./api";

export const fetchVitals = async () => {
  const { data } = await api.get("/vitals");
  return data;
};

export const addVital = async (payload) => {
  const { data } = await api.post("/vitals", payload);
  return data;
};

export const removeVital = async (id) => {
  const { data } = await api.delete(`/vitals/${id}`);
  return data;
};

export const fetchPatientVitals = async (patientId) => {
  const { data } = await api.get(`/vitals/patient/${patientId}`);
  return data;
};
