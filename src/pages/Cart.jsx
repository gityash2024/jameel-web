import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { cartAPI } from "../services/api";
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  overflow-x: auto;
`;

const Navigation = styled.div`
  margin-bottom: 2rem;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const NavLink = styled(Link)`
  color: #666;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SearchText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #666;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
  min-width: 600px;
`;

const Th = styled.th`
  background: #f3f4f6;
  padding: 1rem;
  text-align: left;
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 300px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${props => props.primary ? `
    background: black;
    color: white;
    &:hover {
      background: #333;
    }
  ` : `
    background: white;
    color: black;
    border: 1px solid #ddd;
    &:hover {
      background: #f5f5f5;
    }
  `}

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
`;

const Price = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  white-space: nowrap;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #666;
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
    
    p {
      font-size: 0.875rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const { updateCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartData();
  }, []);

  // Helper function to safely get price from a product
  const getProductPrice = (product) => {
    if (!product) return 0;
    
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

  // Calculate subtotal whenever cart items change
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setCalculating(true);
      const total = cartItems.reduce((sum, item) => {
        const itemPrice = getProductPrice(item.product);
        const quantity = parseInt(item.quantity || 1);
        return sum + (itemPrice * quantity);
      }, 0);
      
      setSubtotal(total);
      setCalculating(false);
    } else {
      setSubtotal(0);
    }
  }, [cartItems]);

  const loadCartData = async () => {
    setLoading(true);
    try {
      const response = await cartAPI.getCart();
      console.log('Cart response:', response);
      
      let items = [];
      if (response.data?.data?.cart?.items) {
        items = response.data.data.cart.items;
      } else if (response.data?.cart?.items) {
        items = response.data.cart.items;
      } else if (response.data?.items) {
        items = response.data.items;
      }
      
      setCartItems(items);
      updateCart(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, change, currentQuantity) => {
    if (currentQuantity + change < 1) return;
    
    try {
      const newQuantity = currentQuantity + change;
      await cartAPI.updateQuantity(itemId, newQuantity);
      
      const updatedItems = cartItems.map(item => 
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      
      setCartItems(updatedItems);
      updateCart(updatedItems);
      
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await cartAPI.removeItem(itemId);
      
      const updatedItems = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedItems);
      updateCart(updatedItems);
      
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleCheckout = () => {
    console.log('Cart items:', cartItems);
    console.log('Cart total:', subtotal);
    navigate('/checkout', { state: { cartItems, cartTotal: subtotal } });
  };

  return (
    <Container>
      <Navigation>
        <NavLink to="/">Home</NavLink> / <span>Cart</span>
      </Navigation>
      
      <Header>
        <Title>Your Shopping Cart</Title>
        <SearchText>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </SearchText>
      </Header>
      
      {loading ? (
        <div>Loading cart...</div>
      ) : cartItems.length === 0 ? (
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Button onClick={handleContinueShopping}>
            <ShoppingBag size={18} />
            Continue Shopping
          </Button>
        </EmptyCart>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <thead>
                <tr>
                  <Th>Product</Th>
                  <Th>Price</Th>
                  <Th>Quantity</Th>
                  <Th>Total</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item._id}>
                      <Td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <ProductImage 
                            src={item.product?.images && Array.isArray(item.product.images) 
                              ? (item.product.images[0]?.url || '/placeholder.png') 
                              : '/placeholder.png'} 
                            alt={item.product?.name || 'Product image'} 
                            onError={(e) => {e.target.src = '/placeholder.png'}}
                          />
                          <div>
                            <div style={{ fontWeight: '500' }}>{item.product?.name}</div>
                            {item.product?.sku && <div style={{ color: '#666', fontSize: '0.875rem' }}>SKU: {item.product.sku}</div>}
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <Price>
                          ${getProductPrice(item.product).toFixed(2)}
                          {item.product?.regularPrice && item.product?.salePrice && parseFloat(item.product.regularPrice) > parseFloat(item.product.salePrice) && (
                            <OriginalPrice>${parseFloat(item.product.regularPrice).toFixed(2)}</OriginalPrice>
                          )}
                        </Price>
                      </Td>
                      <Td>
                        <QuantityControl>
                          <QuantityButton onClick={() => handleQuantityChange(item._id, -1, parseInt(item.quantity || 1))} disabled={parseInt(item.quantity || 1) <= 1}>
                            <Minus size={16} />
                          </QuantityButton>
                          <span>{parseInt(item.quantity || 1)}</span>
                          <QuantityButton onClick={() => handleQuantityChange(item._id, 1, parseInt(item.quantity || 1))}>
                            <Plus size={16} />
                          </QuantityButton>
                        </QuantityControl>
                      </Td>
                      <Td>
                        <strong>${(getProductPrice(item.product) * parseInt(item.quantity || 1)).toFixed(2)}</strong>
                      </Td>
                      <Td>
                        <RemoveButton onClick={() => handleRemoveItem(item._id)}>
                          <X size={18} />
                        </RemoveButton>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          
          <Summary>
            <SubTotal>
              <span>Subtotal:</span>
              <strong>${calculating ? '...' : subtotal.toFixed(2)}</strong>
            </SubTotal>
            <div style={{ color: '#666', fontSize: '0.875rem', textAlign: 'right' }}>
              Shipping and taxes will be calculated at checkout
            </div>
            <ButtonGroup>
              <Button onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
              <Button primary onClick={handleCheckout}>
                Checkout
              </Button>
            </ButtonGroup>
          </Summary>
        </>
      )}
    </Container>
  );
};

export default Cart;