import api from "./api";

export const fetchDoctors = async () => {
  const { data } = await api.get("/appointments/doctors");
  return data;
};

export const fetchAppointments = async () => {
  const { data } = await api.get("/appointments");
  return data;
};

export const createAppointment = async (payload) => {
  const { data } = await api.post("/appointments", payload);
  return data;
};

export const cancelAppointment = async (id) => {
  const { data } = await api.delete(`/appointments/${id}`);
  return data;
};

export const deleteAppointment = async (id) => {
  const { data } = await api.delete(`/appointments/${id}`);
  return data;
};

export const updateAppointmentStatus = async (id, payload) => {
  const { data } = await api.patch(`/appointments/${id}/status`, payload);
  return data;
};
