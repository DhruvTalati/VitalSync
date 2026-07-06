import api from "./api";

export const fetchMedicalRecords = async () => {
  const { data } = await api.get("/medical-records");
  return data;
};

export const addMedicalRecord = async (payload) => {
  const { data } = await api.post("/medical-records", payload);
  return data;
};

export const fetchPatientRecords = async (patientId) => {
  const { data } = await api.get(`/medical-records/patient/${patientId}`);
  return data;
};
