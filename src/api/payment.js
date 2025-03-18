import axios from './axios';

const paymentAPI = {
  processPayment: async (data) => {
    return await axios.post('/api/payments/process', data);
  },

  confirmPayment: async (paymentIntentId) => {
    return await axios.post('/api/payments/confirm', { paymentIntentId });
  },

  getPaymentMethods: async () => {
    return await axios.get('/api/payments/methods');
  },

  addPaymentMethod: async (data) => {
    return await axios.post('/api/payments/methods', data);
  },

  removePaymentMethod: async (paymentMethodId) => {
    return await axios.delete(`/api/payments/methods/${paymentMethodId}`);
  },

  setDefaultPaymentMethod: async (paymentMethodId) => {
    return await axios.put(`/api/payments/methods/${paymentMethodId}/default`);
  }
};

export default paymentAPI; 