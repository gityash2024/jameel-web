import React, { useState } from 'react';
import styled from "styled-components";
import daimond_logo from "../assets/daimond_logo.svg";


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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
  
  a {
    color: #000;
    text-decoration: underline;
  }
`;

const TrackingForm = styled.form`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fc;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const TrackButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const TrackOrder = () => {
  const [orderData, setOrderData] = useState({
    orderNumber: '',
    emailOrPhone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tracking order:', orderData);
  };

  return (
    <Container>
      <Title>Track Order</Title>

      <AssistantBox>
        <img src={daimond_logo} alt="Diamond" />
        <span>506 results too many? Our Jewelry Assistant can help!</span>
        <a href="#">Describe what you're looking for?</a>
      </AssistantBox>

      <TrackingForm onSubmit={handleSubmit}>
        <FormGroup>
          <label>Order Number</label>
          <Input
            type="text"
            name="orderNumber"
            placeholder="Enter Order Number"
            value={orderData.orderNumber}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup>
          <label>Email or Phone</label>
          <Input
            type="text"
            name="emailOrPhone"
            placeholder="Enter Email or Phone"
            value={orderData.emailOrPhone}
            onChange={handleInputChange}
          />
        </FormGroup>

        <TrackButton type="submit">Track Order</TrackButton>
      </TrackingForm>
    </Container>
  );
};

export default TrackOrder;