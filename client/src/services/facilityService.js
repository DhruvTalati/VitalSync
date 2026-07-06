import api from './api';

export const fetchFacilities = async (type = 'all') => {
  const { data } = await api.get('/facilities', { params: { type } });
  return data;
};