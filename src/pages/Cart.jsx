import React, { useState } from 'react';
import styled from 'styled-components';
import ring_1 from "../assets/ring_1.svg";
import { X, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const Navigation = styled.nav`
  margin-bottom: 2rem;
`;

const NavLink = styled.a`
  color: #666;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SearchText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #666;
`;

const Link = styled.a`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
`;

const Th = styled.th`
  background: #f3f4f6;
  padding: 1rem;
  text-align: left;
  font-weight: 500;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
`;

const ProductImage = styled.img`
  width: 80px;
  height: auto;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
`;

const SubTotal = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
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

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Price = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #666;
  font-size: 0.875rem;
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Memories, Moments",
      price: 49.99,
      originalPrice: 199.00,
      quantity: 1,
      image: ring_1
    },
    {
      id: 2,
      name: "Memories, Moments",
      price: 49.99,
      originalPrice: 199.00,
      quantity: 1,
      image: ring_1
    }
  ]);

  const handleQuantityChange = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <Navigation>
        <NavLink href="/">Home</NavLink>
        {" / "}
        <NavLink href="/custom-jewelry">Custom Jewelry</NavLink>
      </Navigation>

      <Header>
        <Title>Cart</Title>
        <SearchText>
          506 results too many?{" "}
          <Link>Describe what you're looking for?</Link>
        </SearchText>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Image</Th>
            <Th>Products Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <Td>
                <ProductImage src={item.image} alt={item.name} />
              </Td>
              <Td>{item.name}</Td>
              <Td>
                <Price>
                  ${item.price}
                  <OriginalPrice>${item.originalPrice}</OriginalPrice>
                </Price>
              </Td>
              <Td>
                <QuantityControl>
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </QuantityButton>
                  {item.quantity}
                  <QuantityButton 
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus size={16} />
                  </QuantityButton>
                </QuantityControl>
              </Td>
              <Td>${(item.price * item.quantity).toFixed(2)}</Td>
              <Td>
                <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                  <X size={20} />
                </RemoveButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Summary>
        <SubTotal>
          <span>Sub Total:</span>
          <span>${calculateSubTotal().toFixed(2)}</span>
        </SubTotal>
        <ButtonGroup>
          <Button onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
          <Button primary onClick={handleCheckout}>
            Checkout
          </Button>
        </ButtonGroup>
      </Summary>
    </Container>
  );
};

export default Cart;