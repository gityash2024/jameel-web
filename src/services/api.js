import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = '';
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data?.error?.message) {
      message = error.response.data.error.message;
    } else {
      message = 'Something went wrong';
    }
    
    toast.error(message);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', { ...data, role: 'customer' }),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update-details', data),
  updatePassword: (data) => api.put('/auth/update-password', data),
};

export const userAPI = {
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (data) => api.post('/user/addresses', data),
  updateAddress: (id, data) => api.put(`/user/addresses/${id}`, data),
  deleteAddress: (id) => api.delete(`/user/addresses/${id}`),
  setDefaultAddress: (id) => api.put(`/user/addresses/${id}/default`),
  getWishlist: () => api.get('/user/wishlist'),
  addToWishlist: (productId) => api.post('/user/wishlist', { productId }),
  removeFromWishlist: (productId) => api.delete(`/user/wishlist/${productId}`),
};

// Add these to your api.js file
export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  getCategory: (id) => api.get(`/categories/${id}`),
};

export const subcategoryAPI = {
  getAllSubCategories: () => api.get('/subcategories'),
  getSubCategoriesByCategory: (categoryId) => api.get(`/subcategories/category/${categoryId}`),
};


export const tagAPI = {
  getAllTags: () => api.get('/tags'),
  getTag: (id) => api.get(`/tags/${id}`),
  getTagBySlug: (slug) => api.get(`/tags/${slug}`),
  createTag: (data) => api.post('/tags', data),
  updateTag: (id, data) => api.put(`/tags/${id}`, data),
  deleteTag: (id) => api.delete(`/tags/${id}`),
  updateTagStatus: (id, status) => api.put(`/tags/${id}/status`, { isActive: status }),
  bulkDeleteTags: (ids) => api.delete('/tags/bulk/delete', { data: { ids } })
};


export const mediaAPI = {
  getAllMedia: (params) => api.get('/media', { params }),
  getMedia: (id) => api.get(`/media/${id}`),
  uploadMedia: (data) => api.post('/media', data),
  updateMedia: (id, data) => api.put(`/media/${id}`, data),
  deleteMedia: (id) => api.delete(`/media/${id}`),
};




export const blogAPI = {
  getAllBlogs: (params) => api.get('/blogs', { params }),
  getBlog: (slug) => api.get(`/blogs/${slug}`),
  createBlog: (data) => api.post('/blogs', data),
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
  updateBlogStatus: (id, status) => api.put(`/blogs/${id}`, { status }),
  getBlogCategories: () => api.get('/blogs/categories'),
  getBlogTags: () => api.get('/blogs/tags'),
  getFeaturedBlogs: () => api.get('/blogs/featured'),
  likeBlog: (slug) => api.post(`/blogs/${slug}/like`),
  unlikeBlog: (slug) => api.delete(`/blogs/${slug}/like`),
  getBlogComments: (slug) => api.get(`/blogs/${slug}/comments`),
  addBlogComment: (slug, data) => api.post(`/blogs/${slug}/comments`, data),
  updateBlogComment: (id, data) => api.put(`/blogs/comments/${id}`, data),
  deleteBlogComment: (id) => api.delete(`/blogs/comments/${id}`)
};


export const productAPI = {
  getAllProducts: (params) => {
    return api.get('/products', { params });
  },
  
  getProduct: (id) => {
    // Update this to use the new endpoint
    return api.get(`/products/id/${id}`);
  },
  getWebProducts: (params) => api.get('/products/web', { params }),
  getProductBySlug: (slug) => {
    return api.get(`/products/${slug}`);
  },
  
  getProductsByCategory: (categorySlug) => 
    api.get(`/products/category/${categorySlug}`),
  getProductsBySubcategory: (categorySlug, subcategoryId) => 
    api.get(`/products?subcategory=${subcategoryId}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getNewArrivals: () => api.get('/products/new-arrivals'),
  searchProducts: (params) => api.get('/products/search', { params }),
  getRelatedProducts: (productId) => api.get(`/products/${productId}/related`),
};

export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
};

export const reviewAPI = {
  getProductReviews: (productId) => api.get(`/products/${productId}/reviews`),
  addProductReview: (productId, data) => api.post(`/products/${productId}/reviews`, data),
};
export const supportAPI = {
  createSupportTicket: (data) => api.post('/support-tickets', data),
  getAllSupportTickets: (params) => api.get('/support-tickets', { params }),
  getSupportTicket: (id) => api.get(`/support-tickets/${id}`),
  addTicketResponse: (id, data) => api.post(`/support-tickets/${id}/responses`, data),
  updateTicketStatus: (id, status) => api.put(`/support-tickets/${id}/status`, { status })
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data) => api.post('/cart/items', data),
  updateCartItem: (itemId, data) => api.put(`/cart/items/${itemId}`, data),
  removeCartItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  clearCart: () => api.delete('/cart'),
  applyCoupon: (code) => api.post('/cart/apply-coupon', { code }),
  removeCoupon: () => api.delete('/cart/remove-coupon'),
  calculateShipping: (addressId) => api.post('/cart/calculate-shipping', { addressId }),
  saveForLater: (itemId) => api.post(`/cart/items/${itemId}/save-for-later`),
  moveToCart: (itemId) => api.post(`/cart/saved/${itemId}/move-to-cart`),
  getSavedItems: () => api.get('/cart/saved-items'),
  mergeCart: (items) => api.post('/cart/merge', { items }),
  getCartSummary: () => api.get('/cart/summary')
};


export const storeAPI = {
  getAllStores: () => api.get('/stores'),
  getStore: (id) => api.get(`/stores/${id}`),
  createStore: (data) => api.post('/stores', data),
  updateStore: (id, data) => api.put(`/stores/${id}`, data),
  deleteStore: (id) => api.delete(`/stores/${id}`),
  findNearbyStores: (lat, lng, distance) => 
    api.get(`/stores/nearby?lat=${lat}&lng=${lng}&distance=${distance || 10000}`)
};

export default api;