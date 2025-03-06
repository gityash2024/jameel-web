import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { cartAPI, orderAPI } from "../services/api";
import { toast } from 'react-hot-toast';

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

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.error ? 'red' : '#ddd'};
  border-radius: 4px;
  background-color: #f8f9fc;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'red' : '#000'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.error ? 'red' : '#ddd'};
  border-radius: 4px;
  background-color: #f8f9fc;
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'red' : '#000'};
  }
`;

const PhoneInput = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 10px;
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadCartAndCheckAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      setIsLoggedIn(true);

      try {
        const response = await cartAPI.getCart();
        if (response.data && response.data.data && response.data.data.cart) {
          setCartItems(response.data.data.cart.items || []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        toast.error('Failed to load cart items');
      }
    };

    loadCartAndCheckAuth();
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+1',
    phone: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    delivery: 'standard',
    payment: 'cod'
  });
  const [errors, setErrors] = useState({});

  const states = [
    "New York", "California", "Texas", "Florida"
  ];

  const cities = {
    "New York": ["New York City", "Buffalo", "Albany"],
    "California": ["Los Angeles", "San Francisco", "San Diego"],
    "Texas": ["Houston", "Austin", "Dallas"],
    "Florida": ["Miami", "Orlando", "Tampa"]
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    
    const phoneRegex = /^\d{6,10}$/;
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    
    const pincodeRegex = /^\d{5,6}$/;
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!pincodeRegex.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.salePrice || item.product?.regularPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    try {
      const orderData = {
        ...formData,
        items: cartItems,
        total: calculateTotal()
      };

      const response = await orderAPI.createOrder(orderData);
      
      if (response.data.success) {
        toast.success('Order placed successfully!');
        navigate('/order-confirmation', { 
          state: { 
            orderDetails: response.data.data,
            items: cartItems 
          } 
        });
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Error placing order');
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Container>
      <BreadCrumb>
        <a href="/">Home</a>
        <span>/</span>
        <span>Checkout</span>
      </BreadCrumb>
      
      <Title>Checkout</Title>

      <form onSubmit={handleSubmit}>
        <ContentWrapper>
          <div>
            <Section>
              <h2>Shipping Details</h2>
              <FormGrid>
                <FormGroup>
                  <label>First Name</label>
                  <Input 
                    type="text" 
                    name="firstName" 
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                  />
                  {errors.firstName && <div className="error">{errors.firstName}</div>}
                </FormGroup>
                <FormGroup>
                  <label>Last Name</label>
                  <Input 
                    type="text" 
                    name="lastName" 
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                  />
                  {errors.lastName && <div className="error">{errors.lastName}</div>}
                </FormGroup>
              </FormGrid>

              </Section> 
              
              <FormGroup>
                <label>Email Address</label>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                {errors.email && <div className="error">{errors.email}</div>}
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
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                  />
                </PhoneInput>
                {errors.phone && <div className="error">{errors.phone}</div>}
              </FormGroup>
              
              <FormGroup>
                <label>Address</label>
                <Input 
                  type="text" 
                  name="address" 
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                />
                {errors.address && <div className="error">{errors.address}</div>}
              </FormGroup>
              
              <FormGrid>
                <FormGroup>
                  <label>State</label>
                  <Select 
                    name="state" 
                    value={formData.state}
                    onChange={handleInputChange}
                    error={errors.state}
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </Select>
                  {errors.state && <div className="error">{errors.state}</div>}
                </FormGroup>
                
                <FormGroup>
                  <label>City</label>
                  <Select 
                    name="city" 
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.state}
                    error={errors.city}
                  >
                    <option value="">Select City</option>
                    {formData.state && cities[formData.state].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </Select>
                  {errors.city && <div className="error">{errors.city}</div>}
                </FormGroup>
              </FormGrid>
              
              <FormGroup>
                <label>Pincode</label>
                <Input 
                  type="text" 
                  name="pincode" 
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  error={errors.pincode}
                />
                {errors.pincode && <div className="error">{errors.pincode}</div>}
              </FormGroup>

              <Section>
                <h2>Delivery Method</h2>
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
                <h2>Payment Method</h2>
                <RadioGroup>
                  <RadioOption checked={formData.payment === 'cod'}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod"
                      checked={formData.payment === 'cod'}
                      onChange={handleInputChange}
                    />
                    <span>Cash on Delivery</span>
                  </RadioOption>
                  <RadioOption checked={formData.payment === 'stripe'}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value="stripe"
                      checked={formData.payment === 'stripe'}
                      onChange={handleInputChange}
                    />
                    <span>Credit Card</span>
                  </RadioOption>
                </RadioGroup>
              </Section>
            </div>

            <div>
              <OrderSummary>
                <h2>Order Summary</h2>
                {cartItems.map(item => {
                  const price = item.product?.salePrice || item.product?.regularPrice;
                  return (
                    <OrderItem key={item._id}>
                      <img 
                        src={item.product?.images?.[0]?.url || '/placeholder.png'} 
                        alt={item.product?.name} 
                      />
                      <div className="details">
                        <h3>{item.product?.name}</h3>
                        <div className="price">
                          ${price?.toFixed(2)} x {item.quantity}
                        </div>
                        {item.attributes && item.attributes.length > 0 && (
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            {item.attributes[0].name}: {item.attributes[0].value}
                          </div>
                        )}
                      </div>
                      <div>${(price * item.quantity).toFixed(2)}</div>
                    </OrderItem>
                  );
                })}
                
                <BillingSummary>
                  <div className="row">
                    <span>Subtotal:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="row">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="row total">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </BillingSummary>

                <PlaceOrderButton 
                  type="submit"
                  disabled={cartItems.length === 0}
                >
                  Place Order
                </PlaceOrderButton>
              </OrderSummary>
            </div>
          </ContentWrapper>
        </form>
      </Container>
  );
};

export default CheckoutPage;