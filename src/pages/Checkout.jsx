import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api, { cartAPI, shippingAPI } from '../services/api';
import styled from 'styled-components';
import { ArrowLeft, CreditCard, Truck, Check, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const AddressCard = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    border-color: #000;
  }
`;

const ShippingOption = styled.div`
  padding: 20px;
  border: 1px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &:hover {
    border-color: #000;
  }
  
  .option-details {
    flex: 1;
  }
  
  .option-title {
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .option-description {
    font-size: 14px;
    color: #666;
  }
  
  .option-price {
    font-weight: 600;
    text-align: right;
  }
  
  .option-delivery {
    font-size: 14px;
    color: #666;
    text-align: right;
  }
`;

const OrderSummary = styled.div`
  background: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  position: sticky;
  top: 20px;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &.total {
    border-top: 1px solid #e0e0e0;
    margin-top: 16px;
    padding-top: 16px;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 14px;
  background: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 24px;
  
  &:hover {
    background: #333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const DeliveryEstimate = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background: #f0f8ff;
  border-radius: 6px;
  font-size: 14px;
  
  h4 {
    font-weight: 500;
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    
    svg {
      margin-right: 8px;
    }
  }
  
  p {
    color: #444;
  }
`;

const Checkout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    
    // Shipping state
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [deliveryEstimate, setDeliveryEstimate] = useState(null);
    
    // Payment state
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    
    // Coupon state
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch cart
                const cartResponse = await cartAPI.getCart();
                if (cartResponse?.data?.data?.cart) {
                    setCart(cartResponse.data.data.cart);
                }
                
                // Fetch addresses
                const addressResponse = await api.get('/user/addresses');
                if (addressResponse?.data?.data?.addresses) {
                    setAddresses(addressResponse.data.data.addresses);
                    
                    // Set default address if available
                    const defaultAddress = addressResponse.data.data.addresses.find(addr => addr.isDefault);
                    if (defaultAddress) {
                        setSelectedAddress(defaultAddress._id);
                        
                        // Fetch delivery estimate if we have an address with postal code
                        if (defaultAddress.postalCode) {
                            fetchDeliveryEstimate(defaultAddress.postalCode);
                        }
                    }
                }
                
                // Fetch shipping methods
                const shippingResponse = await shippingAPI.getShippingMethods();
                if (shippingResponse?.data?.data) {
                    setShippingMethods(shippingResponse.data.data);
                    
                    // Set default shipping method
                    if (shippingResponse.data.data.length > 0) {
                        setSelectedShipping(shippingResponse.data.data[0].id);
                    }
                }
            } catch (error) {
                console.error('Error fetching checkout data:', error);
                toast.error('Failed to load checkout information');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);
    
    const fetchDeliveryEstimate = async (postalCode, shippingMethodId) => {
        try {
            const response = await shippingAPI.getDeliveryEstimate(
                postalCode, 
                shippingMethodId || (selectedShipping ? selectedShipping : undefined)
            );
            
            if (response?.data?.data) {
                setDeliveryEstimate(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching delivery estimate:', error);
        }
    };
    
    const handleAddressSelect = (addressId) => {
        setSelectedAddress(addressId);
        
        // Get postal code from selected address
        const address = addresses.find(addr => addr._id === addressId);
        if (address && address.postalCode) {
            fetchDeliveryEstimate(address.postalCode, selectedShipping);
        }
    };
    
    const handleShippingSelect = (shippingId) => {
        setSelectedShipping(shippingId);
        
        // Update delivery estimate with new shipping method
        const address = addresses.find(addr => addr._id === selectedAddress);
        if (address && address.postalCode) {
            fetchDeliveryEstimate(address.postalCode, shippingId);
        }
    };

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }
        
        try {
            const response = await api.post('/coupons/validate', {
                code: couponCode,
                amount: cart?.subTotal || 0
            });
            
            if (response.data && response.data.status === 'success') {
                const { discount } = response.data.data;
                setCouponDiscount(discount);
                setCouponApplied(true);
                setCouponError('');
                toast.success('Coupon applied successfully!');
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            setCouponError(error.response?.data?.message || 'Invalid coupon code');
            setCouponApplied(false);
            setCouponDiscount(0);
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode('');
        setCouponApplied(false);
        setCouponDiscount(0);
        setCouponError('');
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error('Please select a shipping address');
            return;
        }
        
        if (!selectedShipping) {
            toast.error('Please select a shipping method');
            return;
        }
        
        try {
            setLoading(true);
            
            // Get the shipping method details
            const shippingMethod = shippingMethods.find(method => method.id === selectedShipping);
            
            const orderData = {
                shippingAddress: selectedAddress,
                shippingMethod: selectedShipping,
                shippingCost: shippingMethod?.cost || 0,
                paymentMethod,
                couponCode: couponApplied ? couponCode : null,
                // Pass the cart items if needed or rely on the backend to use the user's cart
            };
            
            const response = await api.post('/orders', orderData);
            
            if (response.data && response.data.status === 'success') {
                toast.success('Order placed successfully!');
                
                // Redirect to order confirmation page
                navigate(`/order-confirmation/${response.data.data.order._id}`);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // Calculate totals
    const subtotal = cart?.subTotal || 0;
    const tax = cart?.tax || 0;
    const shippingCost = selectedShipping ? 
        (shippingMethods.find(method => method.id === selectedShipping)?.cost || 0) : 0;
    
    const orderTotal = subtotal + tax + shippingCost - couponDiscount;

    if (loading) {
        return (
            <PageContainer>
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <div style={{ fontSize: '24px', marginBottom: '20px' }}>Loading checkout...</div>
                    <div 
                        style={{ 
                            display: 'inline-block', 
                            width: '50px', 
                            height: '50px', 
                            border: '5px solid #f3f3f3', 
                            borderTop: '5px solid #000', 
                            borderRadius: '50%', 
                            animation: 'spin 1s linear infinite' 
                        }} 
                    />
                    <style>
                        {`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <Link to="/cart" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                <ArrowLeft size={18} style={{ marginRight: '8px' }} />
                Back to Cart
            </Link>
            
            <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px' }}>Checkout</h1>
            
            <CheckoutGrid>
                <div>
                    {/* Shipping Address */}
                    <div style={{ marginBottom: '40px' }}>
                        <SectionTitle>Shipping Address</SectionTitle>
                        
                        {addresses.length > 0 ? (
                            <>
                                {addresses.map(address => (
                                    <AddressCard 
                                        key={address._id} 
                                        selected={selectedAddress === address._id}
                                        onClick={() => handleAddressSelect(address._id)}
                                    >
                                        {selectedAddress === address._id && (
                                            <div style={{ position: 'absolute', right: '16px', top: '16px' }}>
                                                <Check size={20} />
                                            </div>
                                        )}
                                        <div style={{ fontWeight: '500', marginBottom: '8px' }}>
                                            {address.firstName} {address.lastName}
                                        </div>
                                        <div style={{ marginBottom: '4px' }}>
                                            {address.street} {address.apartment && `, ${address.apartment}`}
                                        </div>
                                        <div style={{ marginBottom: '4px' }}>
                                            {address.city}, {address.state} {address.postalCode}
                                        </div>
                                        <div>{address.phone}</div>
                                        {address.isDefault && (
                                            <div style={{ marginTop: '8px', fontSize: '13px', color: '#666' }}>
                                                Default Address
                                            </div>
                                        )}
                                    </AddressCard>
                                ))}
                                
                                <Link to="/account/addresses/new" style={{ display: 'inline-block', marginTop: '16px', textDecoration: 'underline' }}>
                                    Add a new address
                                </Link>
                            </>
                        ) : (
                            <div>
                                <p>You don't have any saved addresses.</p>
                                <Link to="/account/addresses/new" style={{ display: 'inline-block', marginTop: '16px', textDecoration: 'underline' }}>
                                    Add a new address
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Shipping Method */}
                    <div style={{ marginBottom: '40px' }}>
                        <SectionTitle>Shipping Method</SectionTitle>
                        
                        {shippingMethods.length > 0 ? (
                            <>
                                {shippingMethods.map(method => (
                                    <ShippingOption
                                        key={method.id}
                                        selected={selectedShipping === method.id}
                                        onClick={() => handleShippingSelect(method.id)}
                                    >
                                        <div className="option-details">
                                            <div className="option-title">
                                                <Truck size={16} style={{ marginRight: '8px', display: 'inline' }} />
                                                {method.name}
                                            </div>
                                            <div className="option-description">{method.description}</div>
                                        </div>
                                        <div>
                                            <div className="option-price">
                                                {method.cost > 0 ? `$${method.cost.toFixed(2)}` : 'Free'}
                                            </div>
                                            <div className="option-delivery">
                                                {method.estimatedDays} business days
                                            </div>
                                        </div>
                                    </ShippingOption>
                                ))}
                                
                                {deliveryEstimate && (
                                    <DeliveryEstimate>
                                        <h4>
                                            <Info size={16} />
                                            Estimated Delivery
                                        </h4>
                                        <p>
                                            Your order is expected to arrive by{' '}
                                            <strong>
                                                {new Date(deliveryEstimate.estimatedDeliveryDate).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </strong>
                                        </p>
                                    </DeliveryEstimate>
                                )}
                            </>
                        ) : (
                            <div>
                                <p>No shipping methods available at this time.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Payment Method */}
                    <div>
                        <SectionTitle>Payment Method</SectionTitle>
                        
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="credit_card"
                                    checked={paymentMethod === 'credit_card'}
                                    onChange={() => setPaymentMethod('credit_card')}
                                    style={{ marginRight: '12px' }}
                                />
                                <CreditCard size={20} style={{ marginRight: '8px' }} />
                                Credit Card / Debit Card
                            </label>
                            
                            <label style={{ display: 'flex', alignItems: 'center' }}>
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={() => setPaymentMethod('paypal')}
                                    style={{ marginRight: '12px' }}
                                />
                                <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                                    <path fill="#00457C" d="M7.076 21h4.331l0.565-3.523h2.117c3.527 0 5.798-1.498 6.335-4.954 0.307-1.93-0.125-3.411-1.219-4.409-1.093-0.997-2.693-1.387-4.808-1.387h-7.698l-1.812 11.286c-0.102 0.632 0.309 0.986 0.948 0.986z"></path>
                                    <path fill="#0079C1" d="M19.385 7.55c-0.536 3.456-2.808 4.954-6.335 4.954h-2.117l-0.565 3.523h-4.331c-0.639 0-1.050-0.354-0.948-0.986l0.544-3.397c-0.329 0.729-0.272 1.569 0.351 1.97 0.564 0.363 1.463 0.341 2.522 0.341h0.593l0.565-3.523h2.117c3.527 0 5.798-1.498 6.335-4.954 0.252-1.588 0.033-2.894-0.776-3.903 1.093 0.997 1.525 2.479 1.219 4.409z"></path>
                                </svg>
                                PayPal
                            </label>
                        </div>
                        
                        {paymentMethod === 'credit_card' && (
                            <div style={{ marginTop: '24px' }}>
                                <p>Credit card details will be collected on the next step.</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Order Summary */}
                <OrderSummary>
                    <SectionTitle>Order Summary</SectionTitle>
                    
                    {cart?.items && cart.items.length > 0 ? (
                        <>
                            <div style={{ marginBottom: '24px' }}>
                                {cart.items.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', marginBottom: '16px' }}>
                                        <div style={{ width: '60px', height: '60px', marginRight: '12px', border: '1px solid #e0e0e0' }}>
                                            <img 
                                                src={item.product.images?.[0]?.url || '/placeholder.jpg'} 
                                                alt={item.product.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ flex: '1' }}>
                                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{item.product.name}</div>
                                            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                                                Qty: {item.quantity}
                                                {item.variant && ` - ${item.variant.name}`}
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: '500', marginTop: '4px' }}>
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Coupon Code */}
                            <div style={{ marginBottom: '24px' }}>
                                {couponApplied ? (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: '500' }}>Coupon Applied</div>
                                            <div style={{ fontSize: '14px', color: '#666' }}>{couponCode}</div>
                                        </div>
                                        <button 
                                            onClick={handleRemoveCoupon}
                                            style={{ fontSize: '14px', color: '#c00', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{ display: 'flex', marginBottom: '8px' }}>
                                            <input
                                                type="text"
                                                placeholder="Coupon Code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                style={{ 
                                                    flex: '1', 
                                                    padding: '10px 12px', 
                                                    border: '1px solid #e0e0e0',
                                                    borderRadius: '4px 0 0 4px',
                                                    fontSize: '14px'
                                                }}
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                style={{
                                                    padding: '10px 16px',
                                                    background: '#000',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '0 4px 4px 0',
                                                    fontSize: '14px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {couponError && (
                                            <div style={{ color: '#c00', fontSize: '13px' }}>{couponError}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {/* Totals */}
                            <div>
                                <SummaryItem>
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </SummaryItem>
                                
                                {couponApplied && couponDiscount > 0 && (
                                    <SummaryItem>
                                        <span>Discount</span>
                                        <span>-${couponDiscount.toFixed(2)}</span>
                                    </SummaryItem>
                                )}
                                
                                <SummaryItem>
                                    <span>Shipping</span>
                                    <span>
                                        {selectedShipping 
                                            ? (shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free')
                                            : 'Select shipping method'}
                                    </span>
                                </SummaryItem>
                                
                                <SummaryItem>
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </SummaryItem>
                                
                                <SummaryItem className="total">
                                    <span>Total</span>
                                    <span>${orderTotal.toFixed(2)}</span>
                                </SummaryItem>
                            </div>
                            
                            <Button onClick={handlePlaceOrder} disabled={!selectedAddress || !selectedShipping || loading}>
                                {loading ? 'Processing...' : 'Place Order'}
                            </Button>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <p>Your cart is empty.</p>
                            <Link to="/product-details" style={{ display: 'inline-block', marginTop: '16px', textDecoration: 'underline' }}>
                                Continue Shopping
                            </Link>
      </div>
                    )}
                </OrderSummary>
            </CheckoutGrid>
        </PageContainer>
    );
  };
  
  export default Checkout;