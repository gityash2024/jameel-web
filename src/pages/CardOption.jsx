import React, { useState } from 'react';
import styled from "styled-components";
import ring_1 from "../assets/ring_1.svg";
import ring_2 from "../assets/ring_2.svg";
import { Trash2 } from 'lucide-react';

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
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
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
    width: 50%;
    background: #000;
  }
`;

const ShippingMessage = styled.p`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  h3 {
    margin: 0 0 5px;
    font-size: 16px;
    font-weight: normal;
  }
  
  .price {
    font-weight: 500;
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
`;

const CartFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Button = styled.button`
  padding: 15px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  
  &.view-cart {
    background: white;
    border: 1px solid black;
  }
  
  &.checkout {
    background: black;
    color: white;
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
  
  &:hover {
    color: #000;
  }
`;

const CardOption = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Memories, Moments,",
      price: 149.99,
      quantity: 1,
      image: ring_1
    },
    {
      id: 2,
      name: "Memories, Moments,",
      price: 149.99,
      quantity: 1,
      image: ring_2
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateSubTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <ModalOverlay>
      <ModalHeader>
        <h2>My Cart ({cartItems.length})</h2>
        <CloseButton>×</CloseButton>
      </ModalHeader>

      <ShippingMessage>
        Congratulations! Enjoy Free Shipping On US!
      </ShippingMessage>
      <ProgressBar />

      <ClearCartButton onClick={clearCart}>
        Clear Cart
      </ClearCartButton>

      <CartItems>
        {cartItems.map(item => (
          <CartItem key={item.id}>
            <ProductImage src={item.image} alt={item.name} />
            <ProductInfo>
              <h3>{item.name}</h3>
              <div className="price">${item.price}</div>
              <QuantityControl>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity.toString().padStart(2, '0')}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </QuantityControl>
            </ProductInfo>
            <DeleteButton onClick={() => removeItem(item.id)}>
              <Trash2 size={20} />
            </DeleteButton>
          </CartItem>
        ))}
      </CartItems>

      <CartFooter>
        <SubTotal>
          <span>Sub Total:</span>
          <span>${calculateSubTotal().toFixed(2)}</span>
        </SubTotal>

        <ButtonGroup>
          <Button className="view-cart">View Cart</Button>
          <Button className="checkout">Checkout</Button>
        </ButtonGroup>
      </CartFooter>
    </ModalOverlay>
  );
};

export default CardOption;