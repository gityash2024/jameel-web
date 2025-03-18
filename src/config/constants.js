// API URL based on environment
export const API_URL = import.meta.env.VITE_API_URL;

// Image CDN URL
export const IMAGE_CDN_URL = import.meta.env.NODE_ENV === 'production'
  ? 'https://res.cloudinary.com/dssi3kihf/image/upload'
  : 'http://localhost:5000/uploads';

// Payment constants
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Currency
export const CURRENCY = {
  code: 'USD',
  symbol: '$'
};

// Order status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Shipping methods
export const SHIPPING_METHODS = {
  STANDARD: {
    id: 'standard',
    name: 'Standard Shipping',
    price: 5.99,
    duration: '5-7 business days'
  },
  EXPRESS: {
    id: 'express',
    name: 'Express Shipping',
    price: 14.99,
    duration: '2-3 business days'
  },
  OVERNIGHT: {
    id: 'overnight',
    name: 'Overnight Shipping',
    price: 24.99,
    duration: '1 business day'
  }
};

// Product categories
export const PRODUCT_CATEGORIES = {
  RINGS: 'rings',
  NECKLACES: 'necklaces',
  EARRINGS: 'earrings',
  BRACELETS: 'bracelets',
  WATCHES: 'watches',
  ACCESSORIES: 'accessories'
};

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/jskelite',
  INSTAGRAM: 'https://instagram.com/jskelite',
  TWITTER: 'https://twitter.com/jskelite',
  PINTEREST: 'https://pinterest.com/jskelite'
}; 