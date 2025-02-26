import React, { useContext, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { HeaderContext } from "../components/layout/Header";
import { cartAPI } from "../services/api";
import { toast } from "react-hot-toast";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    width: 100%;
    padding: 16px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 24px;
    font-weight: 500;

    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  margin: 10px 0 20px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => Math.min(100, props.percent)}%;
    background: #000;
  }
`;

const ShippingMessage = styled.p`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-right: 5px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 2px;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;

  @media (max-width: 480px) {
    gap: 10px;
    padding: 12px 0;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;

  @media (max-width: 480px) {
    width: 70px;
    height: 70px;
  }
`;

const ProductInfo = styled.div`
  h3 {
    margin: 0 0 5px;
    font-size: 16px;
    font-weight: normal;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  
  .price {
    font-weight: 500;
    
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f5;
  padding: 5px 10px;
  border-radius: 4px;
  margin-top: 10px;
  
  button {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0 5px;
    font-size: 16px;
    
    @media (max-width: 480px) {
      font-size: 14px;
      padding: 0 3px;
    }
  }

  span {
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
  
  &:hover {
    color: #000;
  }

  @media (max-width: 480px) {
    padding: 3px;
  }
`;

const CartFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #eee;

  @media (max-width: 480px) {
    padding-top: 16px;
  }
`;

const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const Button = styled.button`
  padding: 15px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &.view-cart {
    background: white;
    border: 1px solid black;
    
    &:hover {
      background: #f5f5f5;
    }
  }
  
  &.checkout {
    background: black;
    color: white;
    
    &:hover {
      background: #333;
    }
  }

  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
  }
`;

const ClearCartButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  padding: 5px;
  font-size: 14px;
  
  &:hover {
    color: #000;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 4px;
  }
`;

const EmptyCart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  h3 {
    margin-bottom: 16px;
    font-size: 18px;
  }
  
  p {
    color: #666;
    margin-bottom: 24px;
    max-width: 240px;
  }
  
  button {
    padding: 12px 24px;
    background: black;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      background: #333;
    }
  }
`;

const LoadingSpinner = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:after {
    content: "";
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CardOption = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, fetchCartData } = useContext(HeaderContext);
  const [loading, setLoading] = React.useState(true);
  const [subTotal, setSubTotal] = React.useState(0);
  const [freeShippingThreshold] = React.useState(100); // Set your free shipping threshold here

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        await fetchCartData();
        setLoading(false);
      } catch (error) {
        console.error('Error loading cart:', error);
        setLoading(false);
      }
    };
    
    loadCart();
  }, [fetchCartData]);

  useEffect(() => {
    // Calculate subtotal
    if (cartItems && cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => {
        const price = item.product?.salePrice || item.product?.regularPrice || 0;
        return acc + (price * item.quantity);
      }, 0);
      setSubTotal(total);
    } else {
      setSubTotal(0);
    }
  }, [cartItems]);

  const updateQuantity = async (itemId, change, currentQuantity) => {
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
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (itemId) => {
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

  const clearCart = async () => {
    try {
      await cartAPI.clearCart();
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleShopNow = () => {
    navigate('/product-details');
  };

  // Calculate progress toward free shipping
  const progressPercent = (subTotal / freeShippingThreshold) * 100;
  const freeShippingRemaining = freeShippingThreshold - subTotal;

  return (
    <ModalOverlay>
      <ModalHeader>
        <h2>My Cart ({cartItems?.length || 0})</h2>
        <CloseButton onClick={handleCloseModal}>
          <X size={24} />
        </CloseButton>
      </ModalHeader>

      <ShippingMessage>
        {subTotal >= freeShippingThreshold
          ? "Congratulations! You've qualified for FREE shipping!"
          : `Add $${freeShippingRemaining.toFixed(2)} more to qualify for FREE shipping`}
      </ShippingMessage>
      <ProgressBar percent={progressPercent} />

      {cartItems && cartItems.length > 0 && (
        <ClearCartButton onClick={clearCart}>
          Clear Cart
        </ClearCartButton>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : cartItems && cartItems.length > 0 ? (
        <>
          <CartItems>
            {cartItems.map(item => {
              const price = item.product?.salePrice || item.product?.regularPrice;
              
              return (
                <CartItem key={item._id}>
                  <ProductImage 
                    src={item.product?.images?.[0]?.url || '/placeholder.png'} 
                    alt={item.product?.name} 
                  />
                  <ProductInfo>
                    <h3>{item.product?.name}</h3>
                    <div className="price">${price?.toFixed(2)}</div>
                    {item.attributes && item.attributes.length > 0 && (
                      <div style={{ fontSize: '0.875rem', color: '#666', marginTop: '4px' }}>
                        {item.attributes[0].name}: {item.attributes[0].value}
                      </div>
                    )}
                    <QuantityControl>
                      <button onClick={() => updateQuantity(item._id, -1, item.quantity)} disabled={item.quantity <= 1}>-</button>
                      <span>{item.quantity.toString().padStart(2, '0')}</span>
                      <button onClick={() => updateQuantity(item._id, 1, item.quantity)}>+</button>
                    </QuantityControl>
                  </ProductInfo>
                  <DeleteButton onClick={() => removeItem(item._id)}>
                    <Trash2 size={20} />
                  </DeleteButton>
                </CartItem>
              );
            })}
          </CartItems>

          <CartFooter>
            <SubTotal>
              <span>Subtotal:</span>
              <span>${subTotal.toFixed(2)}</span>
            </SubTotal>

            <ButtonGroup>
              <Button className="view-cart" onClick={handleViewCart}>
                View Cart
              </Button>
              <Button className="checkout" onClick={handleCheckout}>
                Checkout
              </Button>
            </ButtonGroup>
          </CartFooter>
        </>
      ) : (
        <EmptyCart>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any items to your cart yet</p>
          <button onClick={handleShopNow}>
            <ShoppingBag size={16} />
            Shop Now
          </button>
        </EmptyCart>
      )}
    </ModalOverlay>
  );
};

export default CardOption;