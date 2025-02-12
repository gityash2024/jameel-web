import React, { useState } from 'react';
import styled from "styled-components";
import daimond_logo from "../assets/daimond_logo.svg";
import ring_1 from '../assets/ring_1.svg';
import ring_2 from '../assets/ring_2.svg';


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BreadCrumb = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 30px;
`;

const AssistantBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  
  img {
    width: 24px;
    height: 24px;
  }
  
  span {
    color: #333;
  }
  
  a {
    color: #000;
    text-decoration: underline;
    font-weight: 500;
  }
`;

const CartTable = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 0.5fr;
  padding: 15px;
  background: #f5f5f5;
  font-weight: 500;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 0.5fr;
  padding: 15px;
  border-bottom: 1px solid #eee;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f5;
  padding: 5px;
  border-radius: 4px;
  width: fit-content;
  
  button {
    border: none;
    background: none;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
      background: #e0e0e0;
    }
  }
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #999;
  font-size: 18px;
  
  &:hover {
    color: #666;
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &.continue {
    background: #fff;
    border: 1px solid #000;
  }
  
  &.checkout {
    background: #000;
    color: #fff;
  }
`;

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Memories, Moments,',
      price: 49.99,
      originalPrice: 199.00,
      quantity: 1,
      image: ring_1
    },
    {
      id: 2,
      name: 'Memories, Moments,',
      price: 49.99,
      originalPrice: 199.00,
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

  const calculateSubTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <Container>
      <BreadCrumb>
        <a href="/">Home</a>
        <span>/</span>
        <span>Custom Jewelry</span>
      </BreadCrumb>
      
      <Title>Cart</Title>
      
      <AssistantBox>
        <img src={daimond_logo} alt="Diamond" />
        <span>506 results too many? Our Jewelry Assistant can help!</span>
        <a href="#">Describe what you're looking for?</a>
      </AssistantBox>
      
      <CartTable>
        <TableHeader>
          <div>Image</div>
          <div>Products Name</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
          <div>Action</div>
        </TableHeader>
        
        {cartItems.map(item => (
          <CartItem key={item.id}>
            <ProductImage>
              <img src={item.image} alt={item.name} />
            </ProductImage>
            <div>{item.name}</div>
            <div>
              ${item.price.toFixed(2)}
              <span style={{ textDecoration: 'line-through', color: '#999', marginLeft: '10px' }}>
                ${item.originalPrice.toFixed(2)}
              </span>
            </div>
            <QuantityControl>
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </QuantityControl>
            <div>${(item.price * item.quantity).toFixed(2)}</div>
            <RemoveButton onClick={() => removeItem(item.id)}>×</RemoveButton>
          </CartItem>
        ))}
      </CartTable>
      
      <Summary>
        <div>Sub Total: ${calculateSubTotal().toFixed(2)}</div>
      </Summary>
      
      <ButtonGroup>
        <Button className="continue">Continue Shopping</Button>
        <Button className="checkout">Checkout</Button>
      </ButtonGroup>
    </Container>
  );
};

export default CartPage;