import React, { createContext, useState, useContext } from 'react';

// Create context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Helper function to safely get price from a product or item
  const getProductPrice = (item) => {
    if (!item) return 0;
    
    // Handle case where product is nested
    const product = item.product || item;
    
    // Try sale price first, then regular price
    let price = 0;
    
    // Handle string or number values
    if (product.salePrice !== undefined && product.salePrice !== null) {
      price = parseFloat(product.salePrice);
    } else if (product.regularPrice !== undefined && product.regularPrice !== null) {
      price = parseFloat(product.regularPrice);
    } else if (product.price !== undefined && product.price !== null) {
      price = parseFloat(product.price);
    }
    
    // Ensure we have a valid number
    return isNaN(price) ? 0 : price;
  };
  
  // Update cart items and total
  const updateCart = (items) => {
    if (!items || !Array.isArray(items)) {
      console.warn('Invalid cart items received:', items);
      return;
    }
    
    console.log('Updating cart with items:', items);
    setCartItems(items);
    
    // Calculate total
    const total = items.reduce((sum, item) => {
      const itemPrice = getProductPrice(item);
      const quantity = parseInt(item.quantity || 1);
      return sum + (itemPrice * quantity);
    }, 0);
    
    console.log('Cart total calculated:', total);
    setCartTotal(total);
  };
  
  // Value to be provided
  const value = {
    cartItems,
    cartTotal,
    updateCart,
    setCartItems
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider; 