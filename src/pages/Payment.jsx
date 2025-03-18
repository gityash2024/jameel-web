import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripePromise from '../config/stripe';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// Styled components
const PaymentContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
`;

const PaymentForm = styled.form`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
`;

const PaymentHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #000;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success/${orderId}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message || 'Payment failed. Please try again.');
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
      localStorage.removeItem('stripe_client_secret');
      localStorage.removeItem('current_order_id');
      navigate(`/order-success/${orderId}`);
    } else {
      toast.info('Your payment is processing.');
      setIsLoading(false);
    }
  };

  return (
    <PaymentForm onSubmit={handleSubmit}>
      <PaymentElement />
      <Button disabled={isLoading || !stripe || !elements}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </PaymentForm>
  );
};

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the client secret from localStorage
    const secret = localStorage.getItem('stripe_client_secret');
    const storedOrderId = localStorage.getItem('current_order_id');
    
    if (!secret || !storedOrderId || storedOrderId !== orderId) {
      toast.error('Payment session expired or invalid');
      navigate('/checkout');
      return;
    }
    
    setClientSecret(secret);
  }, [orderId, navigate]);

  if (!clientSecret) {
    return <PaymentContainer>Loading payment details...</PaymentContainer>;
  }

  return (
    <PaymentContainer>
      <PaymentHeader>Complete Your Payment</PaymentHeader>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm />
      </Elements>
    </PaymentContainer>
  );
};

export default PaymentPage; 