import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { cartAPI } from "../services/api";
import { toast } from 'react-hot-toast';

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
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const loadCartData = async () => {
      try {
        setLoading(true);
        const response = await cartAPI.getCart();
        if (response.data && response.data.data && response.data.data.cart) {
          setCartItems(response.data.data.cart.items || []);
        } else {
          setCartItems([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading cart:', error);
        toast.error('Failed to load cart items');
        setCartItems([]);
        setLoading(false);
      }
    };
    
    loadCartData();
  }, []);

  useEffect(() => {
    // Calculate subtotal from cart items
    const total = cartItems.reduce((sum, item) => {
      const price = item.product?.salePrice || item.product?.regularPrice || 0;
      return sum + (price * item.quantity);
    }, 0);
    
    setSubTotal(total);
  }, [cartItems]);

  const handleQuantityChange = async (itemId, change, currentQuantity) => {
    try {
      const newQuantity = Math.max(1, currentQuantity + change);
      
      await cartAPI.updateCartItem(itemId, { quantity: newQuantity });
      
      // Update local state
      setCartItems(prevItems => 
        prevItems.map(item => 
          item._id === itemId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
      
      toast.success('Cart updated');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await cartAPI.removeCartItem(itemId);
      
      // Update local state
      setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
      
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const handleContinueShopping = () => {
    navigate('/product-details');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </Container>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Container>
        <Navigation>
          <NavLink to="/">Home</NavLink>
          {" / "}
          <span>Cart</span>
        </Navigation>
        
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <Button primary onClick={handleContinueShopping}>
            <ShoppingBag size={16} />
            Start Shopping
          </Button>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Navigation>
        <NavLink to="/">Home</NavLink>
        {" / "}
        <span>Cart</span>
      </Navigation>

      <Header>
        <Title>Your Shopping Cart</Title>
        <SearchText>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </SearchText>
      </Header>

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
              const price = item.product?.salePrice || item.product?.regularPrice;
              const originalPrice = item.product?.regularPrice;
              const hasDiscount = item.product?.salePrice && item.product?.salePrice < item.product?.regularPrice;
              
              return (
                <tr key={item._id}>
                  <Td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <ProductImage 
                        src={item.product?.images?.[0]?.url || '/placeholder.png'} 
                        alt={item.product?.name} 
                      />
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.product?.name}</div>
                        {item.attributes && item.attributes.length > 0 && (
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            {item.attributes[0].name}: {item.attributes[0].value}
                          </div>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td>
                    <Price>
                      ${price?.toFixed(2)}
                      {hasDiscount && (
                        <OriginalPrice>${originalPrice?.toFixed(2)}</OriginalPrice>
                      )}
                    </Price>
                  </Td>
                  <Td>
                    <QuantityControl>
                      <QuantityButton 
                        onClick={() => handleQuantityChange(item._id, -1, item.quantity)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </QuantityButton>
                      {item.quantity}
                      <QuantityButton 
                        onClick={() => handleQuantityChange(item._id, 1, item.quantity)}
                      >
                        <Plus size={16} />
                      </QuantityButton>
                    </QuantityControl>
                  </Td>
                  <Td>${(price * item.quantity).toFixed(2)}</Td>
                  <Td>
                    <RemoveButton onClick={() => handleRemoveItem(item._id)}>
                      <X size={20} />
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
          <span>${subTotal.toFixed(2)}</span>
        </SubTotal>
        <div style={{ fontSize: '0.875rem', color: '#666', textAlign: 'right', maxWidth: '300px' }}>
          Shipping and taxes will be calculated at checkout
        </div>
        <ButtonGroup>
          <Button onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <Button primary onClick={handleCheckout}>
            <ShoppingBag size={16} />
            Checkout
          </Button>
        </ButtonGroup>
      </Summary>
    </Container>
  );
};

export default Cart;