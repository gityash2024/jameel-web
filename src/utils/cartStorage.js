/**
 * Utility functions for cart storage in localStorage
 */

const CART_STORAGE_KEY = 'jsk_cart';

/**
 * Save cart items to localStorage
 * @param {Array} items - Cart items to save
 */
export const saveCartToStorage = (items) => {
  try {
    const cartData = {
      items: items || [],
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

/**
 * Get cart items from localStorage
 * @returns {Array} Cart items or empty array if not found
 */
export const getCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) return { items: [] };
    
    return JSON.parse(cartData);
  } catch (error) {
    console.error('Error retrieving cart from localStorage:', error);
    return { items: [] };
  }
};

/**
 * Add an item to the cart in localStorage
 * @param {Object} item - Item to add to cart
 * @returns {Array} Updated cart items
 */
export const addItemToStorage = (item) => {
  try {
    const cart = getCartFromStorage();
    const existingItemIndex = cart.items.findIndex(i => 
      (i._id && i._id === item._id) || 
      (i.productId && i.productId === item.productId)
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += (item.quantity || 1);
    } else {
      // Add new item
      cart.items.push(item);
    }
    
    saveCartToStorage(cart.items);
    return cart.items;
  } catch (error) {
    console.error('Error adding item to localStorage cart:', error);
    return [];
  }
};

/**
 * Remove an item from the cart in localStorage
 * @param {string} itemId - ID of the item to remove
 * @returns {Array} Updated cart items
 */
export const removeItemFromStorage = (itemId) => {
  try {
    const cart = getCartFromStorage();
    cart.items = cart.items.filter(item => 
      item._id !== itemId && item.productId !== itemId
    );
    
    saveCartToStorage(cart.items);
    return cart.items;
  } catch (error) {
    console.error('Error removing item from localStorage cart:', error);
    return [];
  }
};

/**
 * Clear all items from the cart in localStorage
 * @returns {boolean} Success status
 */
export const clearCartStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage cart:', error);
    return false;
  }
};

export default {
  saveCartToStorage,
  getCartFromStorage,
  addItemToStorage,
  removeItemFromStorage,
  clearCartStorage
}; 