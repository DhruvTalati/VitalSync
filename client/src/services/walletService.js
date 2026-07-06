import api from './api';

export const fetchWallet = async () => {
  const { data } = await api.get('/wallet');
  return data;
};

export const addFunds = async (amount) => {
  const { data } = await api.post('/wallet/add-funds', { amount });
  return data;
};

export const payBill = async (billId) => {
  const { data } = await api.post(`/wallet/pay-bill/${billId}`);
  return data;
};