import React, { useState } from 'react';
import styled from "styled-components";
import { ChevronDown } from 'lucide-react';
import ring_1 from "../assets/ring_1.svg";
import ring_2 from "../assets/ring_2.svg";
import daimond_logo from "../assets/daimond_logo.svg";

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
  
  a {
    color: #000;
    text-decoration: underline;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  h2 {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 500;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fc;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fc;
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const PhoneInput = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 10px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
  
  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

const OrderSummary = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const OrderItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  align-items: center;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  
  .details {
    h3 {
      margin: 0 0 5px;
      font-size: 16px;
    }
    
    .price {
      color: #666;
    }
  }
`;

const BillingSummary = styled.div`
  margin-top: 20px;
  
  .row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    
    &.total {
      font-weight: 600;
      border-top: 1px solid #eee;
      margin-top: 10px;
      padding-top: 20px;
    }
  }
`;

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background: ${props => props.checked ? '#f8f9fc' : '#fff'};
  
  input {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  &:hover {
    background: #f8f9fc;
  }
`;

const PaymentOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
`;

const PaymentOption = styled(RadioOption)`
  justify-content: center;
  text-transform: uppercase;
  font-weight: 500;
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const CheckoutPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+1',
    phone: '',
    password: '',
    createAccount: false,
    title: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    delivery: 'standard',
    payment: 'cod'
  });

  // Cart items state
  const [cartItems] = useState([
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

  // Dropdown options
  const states = [
    "New York",
    "California",
    "Texas",
    "Florida"
  ];

  const cities = {
    "New York": ["New York City", "Buffalo", "Albany"],
    "California": ["Los Angeles", "San Francisco", "San Diego"],
    "Texas": ["Houston", "Austin", "Dallas"],
    "Florida": ["Miami", "Orlando", "Tampa"]
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Order total:', calculateTotal());
  };

  return (
    <Container>
      <BreadCrumb>
        <a href="/">Home</a>
        <span>/</span>
        <span>Custom Jewelry</span>
      </BreadCrumb>
      
      <Title>Checkout</Title>
      
      <AssistantBox>
        <img src={daimond_logo} alt="Diamond" />
        <span>506 results too many? Our Jewelry Assistant can help!</span>
        <a href="#">Describe what you're looking for?</a>
      </AssistantBox>

      <form onSubmit={handleSubmit}>
        <ContentWrapper>
          <div>
            <Section>
              <h2>Account Details</h2>
              <FormGrid>
                <FormGroup>
                  <label>Full Name</label>
                  <Input 
                    type="text" 
                    name="firstName" 
                    placeholder="Enter name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Last Name</label>
                  <Input 
                    type="text" 
                    name="lastName" 
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormGrid>
              
              <FormGroup>
                <label>Email Address</label>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label>Phone Number</label>
                <PhoneInput>
                  <Select 
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                  </Select>
                  <Input 
                    type="tel" 
                    name="phone" 
                    placeholder="000000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </PhoneInput>
              </FormGroup>
              
              <FormGroup>
                <label>Password</label>
                <Input 
                  type="password" 
                  name="password" 
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <Checkbox>
                <input 
                  type="checkbox" 
                  name="createAccount" 
                  checked={formData.createAccount}
                  onChange={handleInputChange}
                />
                <span>Create an account?</span>
              </Checkbox>
            </Section>

            <Section>
              <h2>Shipping Details</h2>
              <FormGroup>
                <label>Title</label>
                <Input 
                  type="text" 
                  name="title" 
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <label>Address</label>
                <Input 
                  type="text" 
                  name="address" 
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label>Select State</label>
                <Select 
                  name="state" 
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <label>Select City</label>
                <Select 
                  name="city" 
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.state}
                >
                  <option value="">Select</option>
                  {formData.state && cities[formData.state].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <label>Pincode</label>
                <Input 
                  type="text" 
                  name="pincode" 
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Phone Number</label>
                <PhoneInput>
                  <Select 
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                  </Select>
                  <Input 
                    type="tel" 
                    name="phone" 
                    placeholder="000000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </PhoneInput>
              </FormGroup>
            </Section>
            <Section>
              <h2>Billing Details</h2>
              <FormGroup>
                <label>Title</label>
                <Input 
                  type="text" 
                  name="title" 
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <label>Address</label>
                <Input 
                  type="text" 
                  name="address" 
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label>Select State</label>
                <Select 
                  name="state" 
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <label>Select City</label>
                <Select 
                  name="city" 
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.state}
                >
                  <option value="">Select</option>
                  {formData.state && cities[formData.state].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <label>Pincode</label>
                <Input 
                  type="text" 
                  name="pincode" 
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Phone Number</label>
                <PhoneInput>
                  <Select 
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+91">+91</option>
                  </Select>
                  <Input 
                    type="tel" 
                    name="phone" 
                    placeholder="000000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </PhoneInput>
              </FormGroup>
            </Section>

            <Section>
              <h2>Delivery Details</h2>
              <RadioGroup>
                <RadioOption checked={formData.delivery === 'standard'}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="standard"
                    checked={formData.delivery === 'standard'}
                    onChange={handleInputChange}
                  />
                  <div>
                    <div>Standard Delivery</div>
                    <div>Approx 5 to 7 Days</div>
                  </div>
                </RadioOption>
                <RadioOption checked={formData.delivery === 'express'}>
                  <input 
                    type="radio" 
                    name="delivery" 
                    value="express"
                    checked={formData.delivery === 'express'}
                    onChange={handleInputChange}
                  />
                  <div>
                    <div>Express Delivery</div>
                    <div>Schedule</div>
                  </div>
                </RadioOption>
              </RadioGroup>
            </Section>

            <Section>
              <h2>Payment Details</h2>
              <PaymentOptions>
                <PaymentOption checked={formData.payment === 'cod'}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod"
                    checked={formData.payment === 'cod'}
                    onChange={handleInputChange}
                  />
                  <span>COD</span>
                </PaymentOption>
                <PaymentOption checked={formData.payment === 'paypal'}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paypal"
                    checked={formData.payment === 'paypal'}
                    onChange={handleInputChange}
                  />
                  <span>PayPal</span>
                </PaymentOption>
                <PaymentOption checked={formData.payment === 'stripe'}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="stripe"
                    checked={formData.payment === 'stripe'}
                    onChange={handleInputChange}
                  />
                  <span>Stripe</span>
                </PaymentOption>
                <PaymentOption checked={formData.payment === 'sslcommerz'}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="sslcommerz"
                    checked={formData.payment === 'sslcommerz'}
                    onChange={handleInputChange}
                  />
                  <span>SSLCommerz</span>
                </PaymentOption>
              </PaymentOptions>
            </Section>
          </div>

          <div>
            <OrderSummary>
              <h2>Summary Order</h2>
              {cartItems.map(item => (
                <OrderItem key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="details">
                    <h3>{item.name}</h3>
                    <div className="price">${item.price} x {item.quantity}</div>
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </OrderItem>
              ))}
              
              <BillingSummary>
                <div className="row">
                  <span>Sub Total:</span>
                  <span>$49.99</span>
                </div>
                <div className="row">
                  <span>Shipping:</span>
                  <span>$49.99</span>
                </div>
                <div className="row">
                  <span>Tax:</span>
                  <span>$49.99</span>
                </div>
                <div className="row">
                  <span>Points:</span>
                  <span>$49.99</span>
                </div>
                <div className="row">
                  <span>Down payment:</span>
                  <span>$49.99</span>
                </div>
                <div className="row">
                  <span>Layaway Payment:</span>
                  <span>$49.99</span>
                </div>
                <div className="row">
                  <span>Monthly payment:</span>
                  <span>$49.99</span>
                </div>
                <div className="row">
                  <span>Total:</span>
                  <span>$49.99</span>
                </div>
                <div className="row total">
                  <span>Sub Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </BillingSummary>

              <PlaceOrderButton type="submit">Place Order</PlaceOrderButton>
            </OrderSummary>
          </div>
        </ContentWrapper>
      </form>
    </Container>
  );
};

export default CheckoutPage;