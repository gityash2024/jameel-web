import axios from 'axios';
import { API_URL } from '../config/constants';

// Create an axios instance with default configs
const axiosInstance = axios.create({
  baseURL: API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include auth token from localStorage if available
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Log requests for debugging
axiosInstance.interceptors.request.use(
  request => {
    console.log('Order API Request:', request.method, request.url);
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// Log responses for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log('Order API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('Order API Error:', error.message, error.config?.url);
    return Promise.reject(error);
  }
);

const orderAPI = {
  // Create a new order
  createOrder: async (orderData) => {
    try {
      console.log('Creating order with data:', orderData);
      const response = await axiosInstance.post(`/orders`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('Order created successfully:', response);
      return response;
    } catch (error) {
      console.error('Error creating order:', error.response || error);
      throw error;
    }
  },

  // Get payment intent for an order
  getPaymentIntent: async (orderId) => {
    try {
      const response = await axiosInstance.post(`/payments/create-payment-intent`, {
        orderId
      });
      return response.data;
    } catch (error) {
      console.error('Error getting payment intent:', error);
      throw error;
    }
  },

  // Get user's orders
  getOrders: async () => {
    try {
      const response = await axiosInstance.get(`/orders`);
      return response;
    } catch (error) {
      console.error('Error getting orders:', error);
      throw error;
    }
  },

  // Get single order details
  getOrder: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      console.error('Error getting order details:', error);
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/cancel`, {});
      return response;
    } catch (error) {
      console.error('Error canceling order:', error);
      throw error;
    }
  },

  // Track order
  trackOrder: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}/track`);
      return response;
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  },

  // Update shipping address
  updateShippingAddress: async (orderId, addressData) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}/shipping`, addressData);
      return response;
    } catch (error) {
      console.error('Error updating shipping address:', error);
      throw error;
    }
  },

  // Request refund
  requestRefund: async (orderId, refundData) => {
    try {
      const response = await axiosInstance.post(`/orders/${orderId}/refund`, refundData);
      return response;
    } catch (error) {
      console.error('Error requesting refund:', error);
      throw error;
    }
  }
};

export default orderAPI; 