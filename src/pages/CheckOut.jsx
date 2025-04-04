import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { STRIPE_PUBLIC_KEY } from '../config/constants';
import orderAPI from '../api/order';
import { cartAPI } from '../services/api';
import { Copy } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

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
  background: #fff;
  
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

const PaymentMethodSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  margin-top: 5px;
`;

const CouponSection = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px dashed #ddd;
  border-radius: 4px;
`;

const CouponForm = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  
  input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 15px;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background: #555;
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
`;

const AppliedCoupon = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .coupon-info {
    display: flex;
    flex-direction: column;
    
    .code {
      font-weight: bold;
    }
    
    .discount {
      font-size: 12px;
      color: #666;
    }
  }
  
  button {
    background: none;
    border: none;
    color: #ff0000;
    cursor: pointer;
    font-size: 14px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AvailableCoupons = styled.div`
  margin-top: 15px;
  
  h4 {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
  
  .coupon-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const CouponItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f5f5f5;
  border-radius: 4px;
  border-left: 3px solid #3b82f6;
  
  .coupon-details {
    display: flex;
    flex-direction: column;
    
    .code {
      font-weight: 600;
      font-size: 14px;
    }
    
    .description {
      font-size: 12px;
      color: #666;
    }
  }
  
  .copy-btn {
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    
    &:hover {
      background: rgba(59, 130, 246, 0.1);
    }
  }
`;

const CheckoutForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cartData = location.state || {};
  const cartItems = cartData.cartItems || [];
  const cartTotal = cartData.cartTotal || 0;  

  console.log('Cart items:', cartItems);
  console.log('Cart total:', cartTotal);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(cartTotal);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    message: '',
  });

  useEffect(() => {
    fetchAvailableCoupons();
    fetchCartData();
  }, []);
  
  const fetchAvailableCoupons = async () => {
    try {
      setIsLoadingCoupons(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/coupons/my-coupons`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAvailableCoupons(data.data.coupons || []);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setIsLoadingCoupons(false);
    }
  };
  
  const fetchCartData = async () => {
    try {
      const response = await cartAPI.getCart();
      if (response.data?.data?.cart) {
        const cart = response.data.data.cart;
        console.log("Cart data:", cart);
        
        // Update cart items and total if they're not provided in the route state
        if (!cartItems || cartItems.length === 0) {
          // setCartItems(cart.items || []);
          // setCartTotal(cart.subTotal || 0);
        }
        
        // If cart has a coupon applied, set the coupon state
        if (cart.couponCode) {
          const discountAmount = parseFloat(cart.discount) || 0;
          
          setAppliedCoupon({
            code: cart.couponCode,
            type: 'fixed',
            value: discountAmount
          });
          
          setDiscount(discountAmount);
          
          // Update final total based on cart data
          if (typeof cart.total === 'number') {
            setFinalTotal(cart.total);
          } else {
            setFinalTotal(cartTotal - discountAmount);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  
  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCouponCode(code);
    toast.success(`Coupon ${code} copied!`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    setIsApplyingCoupon(true);
    
    try {
      // Use the API wrapper which is simpler and may bypass validation issues
      const response = await cartAPI.applyCoupon(couponCode.trim());
      
      if (response.data) {
        let couponData = null;
        
        // Try to find coupon data in various response formats
        if (response.data.data && response.data.data.coupon) {
          couponData = response.data.data.coupon;
        } else if (response.data.coupon) {
          couponData = response.data.coupon;
        } else if (response.data.data && response.data.data.cart) {
          // Get cart data with applied coupon
          const cart = response.data.data.cart;
          const discountAmount = cart.discount || 0;
          
          // Create coupon data object
          couponData = {
            code: cart.couponCode || couponCode.trim(),
            type: 'fixed', // Assume fixed as we're using the actual discount amount
            value: discountAmount,
          };
          
          // Set the exact discount amount from cart and update final total
          setDiscount(discountAmount);
          setFinalTotal(cart.total || (cartTotal - discountAmount));
          setAppliedCoupon(couponData);
          toast.success('Coupon applied successfully!');
          return;
        } else if (response.data.data) {
          couponData = response.data.data;
        } else {
          couponData = response.data;
        }
        
        if (couponData) {
          setAppliedCoupon(couponData);
          
          // Calculate discount
          let discountAmount = 0;
          if (couponData.type === 'percentage') {
            discountAmount = (cartTotal * couponData.value) / 100;
            // Apply max discount if specified
            if (couponData.maxDiscount && discountAmount > couponData.maxDiscount) {
              discountAmount = couponData.maxDiscount;
            }
          } else {
            discountAmount = couponData.value || 0;
          }
          
          setDiscount(discountAmount);
          setFinalTotal(cartTotal - discountAmount);
          toast.success('Coupon applied successfully!');
        } else {
          throw new Error('No coupon data found in response');
        }
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast.error(error.response?.data?.message || 'Failed to apply coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };
  
  const handleRemoveCoupon = async () => {
    try {
      // Use the API wrapper instead of a direct fetch
      await cartAPI.removeCoupon();
      
      // Reset coupon state
      setAppliedCoupon(null);
      setDiscount(0);
      setFinalTotal(cartTotal);
      setCouponCode(''); // Clear the coupon code input
      toast.success('Coupon removed successfully');
    } catch (error) {
      console.error('Error removing coupon:', error);
      toast.error(error.response?.data?.message || 'Failed to remove coupon');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsProcessing(true);

    try {
      // Prepare order data with ALL required fields
      const orderData = {
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.zipCode,
          country: "US"
        },
        message: formData.message,
        items: cartItems.map(item => {
          // Handle different product data structures
          const productId = item.product?._id || item.product?.id || item._id || item.id;
          const itemPrice = parseFloat(
            item.product?.salePrice || 
            item.product?.regularPrice || 
            item.product?.price || 
            item.salePrice || 
            item.regularPrice || 
            item.price || 
            0
          );
          const quantity = parseInt(item.quantity || 1);
          
          return {
            product: productId,
            quantity: quantity,
            price: itemPrice,
            total: itemPrice * quantity
          };
        }),
        paymentMethod: "stripe",
        shippingMethod: "standard",
        // Include financial information
        subtotal: cartTotal,
        discount: discount || 0,
        tax: 0,
        shippingCost: 0,
        total: isNaN(finalTotal) ? cartTotal : finalTotal
      };
      
      // Include coupon if applied
      if (appliedCoupon?.code) {
        orderData.couponCode = appliedCoupon.code;
      }
      
      console.log('Sending order data:', orderData);
      
      // Create order using direct API call
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });
      
      // Handle response
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create order');
      }
      
      console.log('Order created successfully:', responseData);
      
      // Extract order ID from the response
      let orderId = null;
      if (responseData.data?.order?._id) {
        orderId = responseData.data.order._id;
      } else if (responseData.order?._id) {
        orderId = responseData.order._id;
      } else if (responseData.data?._id) {
        orderId = responseData.data._id;
      }
      
      if (!orderId) {
        throw new Error('Could not find order ID in response');
      }
      
      // Get payment intent with direct API call
      const paymentResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ orderId })
      });
      
      if (!paymentResponse.ok) {
        const paymentError = await paymentResponse.json();
        throw new Error(paymentError.message || 'Failed to create payment intent');
      }
      
      const paymentData = await paymentResponse.json();
      console.log('Payment intent created:', paymentData);
      
      if (paymentData.clientSecret) {
        // Store the client secret and order ID in localStorage for payment
        localStorage.setItem('stripe_client_secret', paymentData.clientSecret);
        localStorage.setItem('current_order_id', orderId);
        
        // Clear cart after successful order
        try {
          await cartAPI.clearCart();
        } catch (err) {
          console.log('Failed to clear cart, but order was created');
        }
        
        // Redirect to payment page
        window.location.href = `/payment/${orderId}`;
      } else {
        throw new Error('No client secret returned from payment intent');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
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
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Phone Number</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <label>Special Instructions or Requirements</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Add any special requirements or instructions for your order"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fc',
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
            </FormGroup>
            <FormGroup>
              <label>Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGrid>
              <FormGroup>
                <label>City</label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>State</label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>ZIP Code</label>
                <Input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormGrid>
          </Section>

          <PaymentMethodSection>
            <h3>Payment Method</h3>
            <RadioOption>
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={true}
                readOnly
              />
              <span>Credit/Debit Card (Stripe)</span>
            </RadioOption>
          </PaymentMethodSection>
        </div>

        <OrderSummary>
          <h2>Order Summary</h2>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map(item => {
              // Handle various possible price structures
              let itemPrice = 0;
              let quantity = 1;
              let name = '';
              let image = '';
              
              if (item.product) {
                // Handle nested product object
                itemPrice = parseFloat(
                  item.product.regularPrice || 
                  item.product.salePrice || 
                  item.product.price || 
                  0
                );
                quantity = parseInt(item.quantity || 1);
                name = item.product.name || 'Product';
                image = item.product.images?.[0]?.url || '/placeholder.jpg';
              } else {
                // Handle flat product structure
                itemPrice = parseFloat(
                  item.regularPrice || 
                  item.salePrice || 
                  item.price || 
                  0
                );
                quantity = parseInt(item.quantity || 1);
                name = item.name || 'Product';
                image = item.images?.[0]?.url || '/placeholder.jpg';
              }
              
              return (
                <OrderItem key={item._id || item.id || Math.random().toString()}>
                  <img 
                    src={image} 
                    alt={name} 
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                  <div className="details">
                    <h3>{name}</h3>
                    <p className="price">${itemPrice.toFixed(2)} × {quantity}</p>
                  </div>
                  <div>${(itemPrice * quantity).toFixed(2)}</div>
                </OrderItem>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              No items in cart
            </div>
          )}
          <CouponSection>
            <h3>Apply Coupon</h3>
            {appliedCoupon ? (
              <AppliedCoupon>
                <div className="coupon-info">
                  <span className="code">{appliedCoupon.code || 'Coupon Applied'}</span>
                  <span className="discount">
                    {appliedCoupon.type === 'percentage' 
                      ? `${appliedCoupon.value}% off` 
                      : `$${(appliedCoupon.value || 0).toFixed(2)} off`}
                  </span>
                </div>
                <button type="button" onClick={handleRemoveCoupon}>Remove</button>
              </AppliedCoupon>
            ) : (
              <CouponForm>
                <Input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon}
                >
                  {isApplyingCoupon ? 'Applying...' : 'Apply'}
                </button>
              </CouponForm>
            )}
            
            {availableCoupons.length > 0 && !appliedCoupon && (
              <AvailableCoupons>
                <h4>Available Coupons:</h4>
                <div className="coupon-list">
                  {availableCoupons.map((coupon) => (
                    <CouponItem key={coupon._id}>
                      <div className="coupon-details">
                        <span className="code">{coupon.code}</span>
                        <span className="description">
                          {coupon.type === 'percentage' 
                            ? `${coupon.value}% off` 
                            : `$${(coupon.value || 0).toFixed(2)} off`}
                          {coupon.minOrderAmount > 0 && ` on orders above $${coupon.minOrderAmount}`}
                        </span>
                      </div>
                      <button 
                        className="copy-btn"
                        onClick={() => handleCopyCoupon(coupon.code)}
                        title="Click to copy"
                      >
                        <Copy size={16} />
                      </button>
                    </CouponItem>
                  ))}
                </div>
              </AvailableCoupons>
            )}
          </CouponSection>
          <BillingSummary>
            <div className="row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="row" style={{ color: '#4CAF50' }}>
                <span>Discount {appliedCoupon && `(${appliedCoupon.code || 'Coupon'})`}</span>
                <span>-${typeof discount === 'number' ? discount.toFixed(2) : '0.00'}</span>
              </div>
            )}
            <div className="row">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="row">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="row total">
              <span>Total</span>
              <span>${
                isNaN(finalTotal) 
                  ? cartTotal.toFixed(2) 
                  : typeof finalTotal === 'number' 
                    ? finalTotal.toFixed(2) 
                    : (cartTotal - (discount || 0)).toFixed(2)
              }</span>
            </div>
          </BillingSummary>
          <PlaceOrderButton type="submit" disabled={isProcessing || cartItems.length === 0}>
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </PlaceOrderButton>
        </OrderSummary>
      </ContentWrapper>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <Container>
        <BreadCrumb>
          <a href="/">Home</a> / <span>Checkout</span>
        </BreadCrumb>
        <Title>Checkout</Title>
        <CheckoutForm />
      </Container>
    </Elements>
  );
};

export default CheckoutPage;