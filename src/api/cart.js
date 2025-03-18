import axios from 'axios';
import { API_URL } from '../config/constants';
import { 
  getCartFromStorage, 
  saveCartToStorage 
} from '../utils/cartStorage';

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
    console.log('Cart API Request:', request.method, request.url);
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

// Log responses for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log('Cart API Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('Cart API Error:', error.message, error.config?.url);
    return Promise.reject(error);
  }
);

const cartAPI = {
  // Get the user's cart
  getCart: async () => {
    try {
      const response = await axiosInstance.get('/cart');
      return response;
    } catch (error) {
      console.error('Error getting cart:', error);
      throw error;
    }
  },

  // Add an item to the cart
  addToCart: async (productData) => {
    try {
      const response = await axiosInstance.post('/cart/items', productData);
      return response;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },

  // Update the quantity of an item in the cart
  updateQuantity: async (itemId, quantity) => {
    try {
      const response = await axiosInstance.put(`/cart/items/${itemId}`, { 
        quantity 
      });
      return response;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  },

  // Remove an item from the cart
  removeItem: async (itemId) => {
    try {
      const response = await axiosInstance.delete(`/cart/items/${itemId}`);
      return response;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  // Clear the entire cart
  clearCart: async () => {
    try {
      const response = await axiosInstance.delete('/cart');
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Apply a coupon to the cart
  applyCoupon: async (couponCode) => {
    try {
      const response = await axiosInstance.post('/cart/apply-coupon', { 
        code: couponCode 
      });
      return response;
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  },

  // Remove coupon from the cart
  removeCoupon: async () => {
    try {
      const response = await axiosInstance.delete('/cart/remove-coupon');
      return response;
    } catch (error) {
      console.error('Error removing coupon:', error);
      throw error;
    }
  }
};

export default cartAPI; 