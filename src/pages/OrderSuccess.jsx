import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import orderAPI from '../api/order';
import { ArrowRightCircle, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { cartAPI } from '../services/api';
// Styled components
const SuccessContainer = styled.div`
  max-width: 800px;
  margin: 60px auto;
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled.div`
  font-size: 80px;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
`;

const OrderInfo = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: left;
`;

const InfoItem = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span``;

const Button = styled(Link)`
  display: inline-block;
  background-color: #000;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 20px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #333;
  }
`;

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCartItems } = useCart();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get query params
  const queryParams = new URLSearchParams(location.search);
  const orderNumber = queryParams.get('orderNumber');
  const amount = queryParams.get('amount');
  const date = queryParams.get('date') ? new Date(queryParams.get('date')).toLocaleDateString() : new Date().toLocaleDateString();
  const status = queryParams.get('status') || 'pending';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderAPI.getOrder(orderId);
        setOrder(response.data.data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  useEffect(() => {
    // Clear the cart after successful payment
    const clearCartData = async () => {
      try {
        // Clear cart in API
        await cartAPI.clearCart();
        // Update context
        setCartItems([]);
        console.log('Cart cleared successfully');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    };
    
    clearCartData();
    
    // If no orderId, redirect to home
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate, setCartItems]);

  if (loading) {
    return (
      <SuccessContainer>
        <Message>Loading order details...</Message>
      </SuccessContainer>
    );
  }

  return (
    <SuccessContainer>
      <SuccessIcon>✓</SuccessIcon>
      <Title>Thank You for Your Order!</Title>
      <Message>Your payment has been processed successfully.</Message>
      
      {order && (
        <OrderInfo>
          <InfoItem>
            <Label>Order Number:</Label>
            <Value>{order.orderNumber}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Date:</Label>
            <Value>{new Date(order.createdAt).toLocaleDateString()}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Total Amount:</Label>
            <Value>${order.total.toFixed(2)}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Payment Status:</Label>
            <Value>{order.paymentStatus}</Value>
          </InfoItem>
        </OrderInfo>
      )}
      
      <Message>
        A confirmation email has been sent to your email address.
      </Message>
      
      <div>
        <Button to="/my-order">View My Orders</Button>
        <Button to="/" style={{ marginLeft: '15px', background: '#555' }}>Continue Shopping</Button>
      </div>
    </SuccessContainer>
  );
};

export default OrderSuccessPage; 