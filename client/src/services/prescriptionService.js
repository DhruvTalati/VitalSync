import api from "./api";

export const fetchPrescriptions = async () => {
  const { data } = await api.get("/prescriptions");
  return data;
};

export const createPrescription = async (payload) => {
  const { data } = await api.post("/prescriptions", payload);
  return data;
};

export const removePrescription = async (id) => {
  const { data } = await api.delete(`/prescriptions/${id}`);
  return data;
};
