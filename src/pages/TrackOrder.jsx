import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Package, Truck, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import orderAPI from '../api/order';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #666;
  font-size: 14px;
  
  &:hover {
    color: #000;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const StatusContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const StatusTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  
  ${props => {
    switch(props.status?.toLowerCase()) {
      case 'delivered':
        return `
          background: #ecfdf5;
          color: #10b981;
        `;
      case 'shipped':
        return `
          background: #e0f2fe;
          color: #0ea5e9;
        `;
      case 'processing':
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      case 'cancelled':
        return `
          background: #fee2e2;
          color: #ef4444;
        `;
      default:
        return `
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

const TrackingStep = styled.div`
  position: relative;
  padding-left: 2.5rem;
  padding-bottom: 2rem;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 14px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.completed ? '#10b981' : '#e5e7eb'};
    z-index: 1;
  }
  
  &:last-child::before {
    display: none;
  }
`;

const StepIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.completed ? '#10b981' : props.active ? '#fef3c7' : '#f3f4f6'};
  color: ${props => props.completed ? 'white' : props.active ? '#d97706' : '#6b7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const StepContent = styled.div`
  margin-left: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: ${props => props.completed ? '#10b981' : props.active ? '#d97706' : '#4b5563'};
`;

const StepInfo = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const StepTimestamp = styled.span`
  font-size: 12px;
  color: #9ca3af;
  margin-left: 0.5rem;
`;

const OrderDetails = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const OrderDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderInfo = styled.div``;

const OrderInfoLabel = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
`;

const OrderInfoValue = styled.p`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const Items = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const ItemsList = styled.div`
  border-top: 1px solid #e5e7eb;
  margin-top: 1.5rem;
`;

const Item = styled.div`
  display: flex;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1.5rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`;

const ItemMeta = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const ItemPrice = styled.div`
  text-align: right;
  min-width: 100px;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-top: 0.5rem;
  }
`;

const PriceDetail = styled.p`
  margin: 0 0 0.25rem 0;
  font-size: 14px;
  
  &:last-child {
    font-weight: 500;
    font-size: 1rem;
  }
`;

const Summary = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 14px;
  color: ${props => props.total ? '#000' : '#6b7280'};
  font-weight: ${props => props.total ? '600' : '400'};
  
  &:last-child {
    margin-bottom: 0;
    font-size: ${props => props.total ? '1.125rem' : '14px'};
  }
`;

const HelpSection = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HelpIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0f2fe;
  color: #0ea5e9;
`;

const HelpText = styled.div`
  flex: 1;
`;

const HelpTitle = styled.h4`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`;

const HelpDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: black;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('No order ID provided');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await orderAPI.getOrder(orderId);
        
        if (response?.data?.data?.order) {
          setOrder(response.data.data.order);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details. Please try again later.');
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId]);
  
  // Get current step based on order status
  const getOrderStep = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 4;
      case 'shipped':
        return 3;
      case 'processing':
        return 2;
      case 'pending':
        return 1;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };
  
  const currentStep = order ? getOrderStep(order.orderStatus) : 0;
  
  if (loading) {
    return (
      <Container>
        <p>Loading order details...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <Header>
          <BackButton to="/my-account/orders">
            <ArrowLeft size={16} />
            Back to My Orders
          </BackButton>
        </Header>
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <HelpCircle size={48} color="#d1d5db" />
          <h2 style={{ marginTop: '1rem' }}>Order Not Found</h2>
          <p style={{ color: '#6b7280' }}>{error}</p>
          <Link to="/my-account/orders" style={{ 
            display: 'inline-block', 
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            background: 'black',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            View My Orders
          </Link>
        </div>
      </Container>
    );
  }
  
  if (!order) {
    return (
      <Container>
        <Header>
          <BackButton to="/my-account/orders">
            <ArrowLeft size={16} />
            Back to My Orders
          </BackButton>
        </Header>
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          <HelpCircle size={48} color="#d1d5db" />
          <h2 style={{ marginTop: '1rem' }}>Order Not Found</h2>
          <p style={{ color: '#6b7280' }}>We couldn't find the order you're looking for.</p>
          <Link to="/my-account/orders" style={{ 
            display: 'inline-block', 
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            background: 'black',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            View My Orders
          </Link>
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <Header>
        <BackButton to="/my-account/orders">
          <ArrowLeft size={16} />
          Back to My Orders
        </BackButton>
        <Title>Track Order</Title>
      </Header>
      
      <StatusContainer>
        <StatusHeader>
          <StatusTitle>Order #{order.orderNumber || orderId}</StatusTitle>
          <StatusBadge status={order.orderStatus}>
            {order.orderStatus ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1) : 'Pending'}
          </StatusBadge>
        </StatusHeader>
        
        <div>
          <TrackingStep completed={currentStep >= 1}>
            <StepIcon completed={currentStep >= 1} active={currentStep === 1}>
              <CheckCircle size={16} />
            </StepIcon>
            <StepContent>
              <StepTitle completed={currentStep >= 1} active={currentStep === 1}>
                Order Placed
                <StepTimestamp>
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                </StepTimestamp>
              </StepTitle>
              <StepInfo>Your order has been received and is being prepared.</StepInfo>
            </StepContent>
          </TrackingStep>
          
          <TrackingStep completed={currentStep >= 2}>
            <StepIcon completed={currentStep >= 2} active={currentStep === 2}>
              {currentStep >= 2 ? <CheckCircle size={16} /> : <Package size={16} />}
            </StepIcon>
            <StepContent>
              <StepTitle completed={currentStep >= 2} active={currentStep === 2}>
                Processing
                {currentStep >= 2 && (
                  <StepTimestamp>
                    {/* You can add actual timestamps from order history here */}
                    -
                  </StepTimestamp>
                )}
              </StepTitle>
              <StepInfo>Your order is being processed and prepared for shipping.</StepInfo>
            </StepContent>
          </TrackingStep>
          
          <TrackingStep completed={currentStep >= 3}>
            <StepIcon completed={currentStep >= 3} active={currentStep === 3}>
              {currentStep >= 3 ? <CheckCircle size={16} /> : <Truck size={16} />}
            </StepIcon>
            <StepContent>
              <StepTitle completed={currentStep >= 3} active={currentStep === 3}>
                Shipped
                {currentStep >= 3 && (
                  <StepTimestamp>
                    {/* You can add actual timestamps from order history here */}
                    -
                  </StepTimestamp>
                )}
              </StepTitle>
              <StepInfo>
                Your order has been shipped.
                {order.trackingNumber && (
                  <>
                    <br />
                    Tracking Number: {order.trackingNumber}
                  </>
                )}
              </StepInfo>
            </StepContent>
          </TrackingStep>
          
          <TrackingStep completed={currentStep >= 4}>
            <StepIcon completed={currentStep >= 4} active={currentStep === 4}>
              {currentStep >= 4 ? <CheckCircle size={16} /> : <Clock size={16} />}
            </StepIcon>
            <StepContent>
              <StepTitle completed={currentStep >= 4} active={currentStep === 4}>
                Delivered
                {currentStep >= 4 && (
                  <StepTimestamp>
                    {/* You can add actual timestamps from order history here */}
                    -
                  </StepTimestamp>
                )}
              </StepTitle>
              <StepInfo>Your order has been delivered.</StepInfo>
            </StepContent>
          </TrackingStep>
          
          {currentStep === -1 && (
            <TrackingStep>
              <StepIcon active={true} style={{ background: '#fee2e2', color: '#ef4444' }}>
                <Clock size={16} />
              </StepIcon>
              <StepContent>
                <StepTitle active={true} style={{ color: '#ef4444' }}>
                  Cancelled
                  <StepTimestamp>
                    {/* You can add actual timestamps from order history here */}
                    -
                  </StepTimestamp>
                </StepTitle>
                <StepInfo>Your order has been cancelled.</StepInfo>
              </StepContent>
            </TrackingStep>
          )}
        </div>
      </StatusContainer>
      
      <OrderDetails>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Order Information</h2>
        <OrderDetailsGrid>
          <OrderInfo>
            <OrderInfoLabel>Order Number</OrderInfoLabel>
            <OrderInfoValue>{order.orderNumber || orderId}</OrderInfoValue>
          </OrderInfo>
          
          <OrderInfo>
            <OrderInfoLabel>Order Date</OrderInfoLabel>
            <OrderInfoValue>
              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
            </OrderInfoValue>
          </OrderInfo>
          
          <OrderInfo>
            <OrderInfoLabel>Payment Method</OrderInfoLabel>
            <OrderInfoValue>{order.paymentMethod || 'N/A'}</OrderInfoValue>
          </OrderInfo>
          
          <OrderInfo>
            <OrderInfoLabel>Payment Status</OrderInfoLabel>
            <OrderInfoValue>
              <StatusBadge status={order.paymentStatus || 'pending'} style={{ fontSize: '12px', padding: '0.25rem 0.5rem' }}>
                {order.paymentStatus ? order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1) : 'Pending'}
              </StatusBadge>
            </OrderInfoValue>
          </OrderInfo>
        </OrderDetailsGrid>
      </OrderDetails>
      
      <OrderDetails>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Shipping Address</h2>
        <OrderInfoValue>
          {order.shippingAddress ? (
            <>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.addressLine1}<br />
              {order.shippingAddress.addressLine2 && (
                <>
                  {order.shippingAddress.addressLine2}<br />
                </>
              )}
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
              {order.shippingAddress.country}<br />
              {order.shippingAddress.phone}
            </>
          ) : (
            'No shipping address provided'
          )}
        </OrderInfoValue>
      </OrderDetails>
      
      <Items>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Order Items</h2>
        <ItemsList>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <Item key={index}>
                {item.product?.images && item.product.images.length > 0 ? (
                  <ItemImage src={item.product.images[0]} alt={item.product.name} />
                ) : (
                  <ItemImage src="https://via.placeholder.com/80" alt="Product placeholder" />
                )}
                
                <ItemInfo>
                  <ItemName>{item.product?.name || 'Unknown Product'}</ItemName>
                  <ItemMeta>SKU: {item.product?.sku || 'N/A'}</ItemMeta>
                  <ItemMeta>Quantity: {item.quantity}</ItemMeta>
                </ItemInfo>
                
                <ItemPrice>
                  <PriceDetail>Price: ${item.price ? item.price.toFixed(2) : '0.00'}</PriceDetail>
                  <PriceDetail>Total: ${item.total ? item.total.toFixed(2) : '0.00'}</PriceDetail>
                </ItemPrice>
              </Item>
            ))
          ) : (
            <p>No items in this order</p>
          )}
        </ItemsList>
        
        <Summary>
          <SummaryRow>
            <span>Subtotal</span>
            <span>${order.subTotal ? order.subTotal.toFixed(2) : '0.00'}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>${order.shippingCost ? order.shippingCost.toFixed(2) : '0.00'}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax</span>
            <span>${order.tax ? order.tax.toFixed(2) : '0.00'}</span>
          </SummaryRow>
          {order.discount > 0 && (
            <SummaryRow>
              <span>Discount</span>
              <span>-${order.discount.toFixed(2)}</span>
            </SummaryRow>
          )}
          <SummaryRow total={true}>
            <span>Total</span>
            <span>${order.total ? order.total.toFixed(2) : '0.00'}</span>
          </SummaryRow>
        </Summary>
        
        <HelpSection>
          <HelpIcon>
            <HelpCircle size={20} />
          </HelpIcon>
          <HelpText>
            <HelpTitle>Need Help With Your Order?</HelpTitle>
            <HelpDescription>If you have any questions or concerns about your order, our customer service team is here to help.</HelpDescription>
          </HelpText>
          <ContactButton href="/contact">Contact Us</ContactButton>
        </HelpSection>
      </Items>
    </Container>
  );
};

export default TrackOrder;