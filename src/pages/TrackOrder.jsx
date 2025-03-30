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
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);
  
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrderById(id);
      setOrder(response.data.data.order);
      
      // If order has tracking info, fetch detailed tracking
      if (response.data.data.order.shipping && response.data.data.order.shipping.trackingNumber) {
        try {
          console.log("Fetching tracking info for tracking number:", response.data.data.order.shipping.trackingNumber);
          const trackingResponse = await orderAPI.trackShipment(response.data.data.order._id);
          if (trackingResponse && trackingResponse.data && trackingResponse.data.data) {
            setTrackingInfo(trackingResponse.data.data);
          } else {
            console.error("Invalid tracking response format:", trackingResponse);
            // Create basic tracking info based on order data
            setTrackingInfo({
              trackingNumber: response.data.data.order.shipping.trackingNumber,
              status: response.data.data.order.orderStatus,
              statusDetails: `Order is currently ${response.data.data.order.orderStatus.replace('_', ' ')}`,
              estimatedDelivery: response.data.data.order.shipping.estimatedDeliveryDate,
              lastUpdated: response.data.data.order.updatedAt,
              trackingHistory: []
            });
          }
        } catch (trackingErr) {
          console.error("Error fetching tracking details:", trackingErr);
          // Create basic tracking info based on order data
          setTrackingInfo({
            trackingNumber: response.data.data.order.shipping.trackingNumber,
            status: response.data.data.order.orderStatus,
            statusDetails: `Order is currently ${response.data.data.order.orderStatus.replace('_', ' ')}`,
            estimatedDelivery: response.data.data.order.shipping.estimatedDeliveryDate,
            lastUpdated: response.data.data.order.updatedAt,
            trackingHistory: []
          });
        }
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError(err.response?.data?.message || "Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };
  
  const getDeliveryStatusStep = () => {
    if (!order) return 0;
    
    const statusMapping = {
      'pending': 0,
      'processing': 1,
      'packed': 2,
      'shipped': 3,
      'out_for_delivery': 4,
      'delivered': 5
    };
    
    return statusMapping[order.orderStatus] || 0;
  };
  
  const formatTrackingDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const renderTrackingHistory = () => {
    if (!trackingInfo || !trackingInfo.trackingHistory || trackingInfo.trackingHistory.length === 0) {
      return (
        <div className="p-4 bg-gray-100 rounded-md text-center">
          <p className="text-gray-500">No detailed tracking information available yet.</p>
        </div>
      );
    }
    
    return trackingInfo.trackingHistory.map((event, index) => (
      <div key={index} className="mb-6 border-l-2 border-gray-200 pl-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{event.status}</h3>
            <p className="text-sm text-gray-600">{event.statusDetails}</p>
            <p className="text-sm text-gray-500 mt-1">{event.location}</p>
          </div>
          <span className="text-xs text-gray-500">{formatTrackingDate(event.timestamp)}</span>
        </div>
      </div>
    ));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-red-500 text-center mb-4">
          <HelpCircle size={48} />
        </div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <BackButton to="/my-orders">Back to My Orders</BackButton>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-yellow-500 text-center mb-4">
          <HelpCircle size={48} />
        </div>
        <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
        <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
        <BackButton to="/my-orders">Back to My Orders</BackButton>
      </div>
    );
  }
  
  const deliveryStep = getDeliveryStatusStep();
  
  return (
    <Container>
      <Header>
        <BackButton to="/my-orders">
          <ArrowLeft size={16} />
          <span>Back to My Orders</span>
        </BackButton>
        <Title>Order #{order.orderNumber}</Title>
      </Header>
      
      <StatusContainer>
        <StatusHeader>
          <StatusTitle>Delivery Status</StatusTitle>
          <StatusBadge status={order.orderStatus}>{order.orderStatus.replace('_', ' ')}</StatusBadge>
        </StatusHeader>
        
        <div>
          <TrackingStep completed={deliveryStep >= 1} active={deliveryStep === 1}>
            <StepIcon completed={deliveryStep >= 1} active={deliveryStep === 1}>
              <Clock size={16} />
            </StepIcon>
            <StepContent>
              <StepTitle completed={deliveryStep >= 1} active={deliveryStep === 1}>
                Order Placed
                {order.createdAt && <StepTimestamp>{formatTrackingDate(order.createdAt)}</StepTimestamp>}
              </StepTitle>
              <StepInfo>Your order has been placed successfully.</StepInfo>
            </StepContent>
          </TrackingStep>
          
          <TrackingStep completed={deliveryStep >= 2} active={deliveryStep === 2}>
            <StepIcon completed={deliveryStep >= 2} active={deliveryStep === 2}>
              <Package size={16} />
            </StepIcon>
            <StepContent>
              <StepTitle completed={deliveryStep >= 2} active={deliveryStep === 2}>
                Order Processing
              </StepTitle>
              <StepInfo>Your order is being processed and items are being prepared.</StepInfo>
            </StepContent>
          </TrackingStep>
          
          <TrackingStep completed={deliveryStep >= 3} active={deliveryStep === 3}>
            <StepIcon completed={deliveryStep >= 3} active={deliveryStep === 3}>
              <Package size={16} />
            </StepIcon>
            <StepContent>
              <StepTitle completed={deliveryStep >= 3} active={deliveryStep === 3}>
                Order Shipped
                {order.shipping?.shippedAt && <StepTimestamp>{formatTrackingDate(order.shipping.shippedAt)}</StepTimestamp>}
              </StepTitle>
              <StepInfo>
                Your order has been shipped.
                {order.shipping?.trackingNumber && (
                  <div className="mt-2">
                    <span className="text-xs font-medium text-gray-700">Tracking Number:</span>
                    <a 
                      href={order.shipping.trackingUrl || `https://www.fedex.com/fedextrack/?trknbr=${order.shipping.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-sm text-blue-600 hover:underline"
                    >
                      {order.shipping.trackingNumber}
                    </a>
                  </div>
                )}
              </StepInfo>
            </StepContent>
          </TrackingStep>
          
          <TrackingStep completed={deliveryStep >= 4} active={deliveryStep === 4}>
            <StepIcon completed={deliveryStep >= 4} active={deliveryStep === 4}>
              <Truck size={16} />
            </StepIcon>
            <StepContent>
              <StepTitle completed={deliveryStep >= 4} active={deliveryStep === 4}>
                Out for Delivery
              </StepTitle>
              <StepInfo>Your order is out for delivery.</StepInfo>
            </StepContent>
          </TrackingStep>
          
          <TrackingStep completed={deliveryStep >= 5} active={deliveryStep === 5}>
            <StepIcon completed={deliveryStep >= 5} active={deliveryStep === 5}>
              <CheckCircle size={16} />
            </StepIcon>
            <StepContent>
              <StepTitle completed={deliveryStep >= 5} active={deliveryStep === 5}>
                Delivered
                {order.shipping?.deliveredAt && <StepTimestamp>{formatTrackingDate(order.shipping.deliveredAt)}</StepTimestamp>}
              </StepTitle>
              <StepInfo>Your order has been delivered.</StepInfo>
            </StepContent>
          </TrackingStep>
        </div>
      </StatusContainer>
      
      {order.shipping?.trackingNumber && (
        <StatusContainer>
          <StatusHeader>
            <StatusTitle>FedEx Tracking Details</StatusTitle>
            <span className="text-sm text-gray-500">
              Last updated: {trackingInfo?.lastUpdated ? formatTrackingDate(trackingInfo.lastUpdated) : 'N/A'}
            </span>
          </StatusHeader>
          
          {trackingInfo ? (
            <div className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">Current Status</h3>
                <p className="text-sm text-gray-600">{trackingInfo.statusDetails || 'Status information not available'}</p>
              </div>
              
              {order.shipping.estimatedDeliveryDate && (
                <div className="mb-4 p-3 bg-blue-50 rounded-md">
                  <h3 className="text-sm font-medium text-blue-800">Estimated Delivery</h3>
                  <p className="text-sm text-blue-700">{formatTrackingDate(order.shipping.estimatedDeliveryDate)}</p>
                </div>
              )}
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Tracking History</h3>
                <div className="mt-4">
                  {renderTrackingHistory()}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-100 rounded-md text-center">
              <p className="text-gray-500">Detailed tracking information is not available yet.</p>
            </div>
          )}
        </StatusContainer>
      )}
      
      <OrderDetails>
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <OrderDetailsGrid>
          <OrderInfo>
            <OrderInfoLabel>Order Date</OrderInfoLabel>
            <OrderInfoValue>{formatTrackingDate(order.createdAt)}</OrderInfoValue>
          </OrderInfo>
          
          <OrderInfo>
            <OrderInfoLabel>Payment Method</OrderInfoLabel>
            <OrderInfoValue>{order.paymentMethod.replace('_', ' ')}</OrderInfoValue>
          </OrderInfo>
          
          <OrderInfo>
            <OrderInfoLabel>Shipping Method</OrderInfoLabel>
            <OrderInfoValue>{order.shippingMethod}</OrderInfoValue>
          </OrderInfo>
          
          <OrderInfo>
            <OrderInfoLabel>Total Amount</OrderInfoLabel>
            <OrderInfoValue>${order.total.toFixed(2)}</OrderInfoValue>
          </OrderInfo>
        </OrderDetailsGrid>
      </OrderDetails>
      
      <OrderDetails>
        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
        <p className="text-gray-700">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
        <p className="text-gray-700">{order.shippingAddress.addressLine1}</p>
        {order.shippingAddress.addressLine2 && <p className="text-gray-700">{order.shippingAddress.addressLine2}</p>}
        <p className="text-gray-700">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
        <p className="text-gray-700">{order.shippingAddress.country}</p>
        <p className="text-gray-700">{order.shippingAddress.phone}</p>
      </OrderDetails>
      
      <Items>
        <h2 className="text-xl font-bold mb-4">Order Items</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left text-gray-500 font-medium">Item</th>
              <th className="py-2 text-left text-gray-500 font-medium">Quantity</th>
              <th className="py-2 text-right text-gray-500 font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 flex-shrink-0 mr-4 bg-gray-100 rounded-md overflow-hidden">
                      {item.product.images && item.product.images[0] && (
                        <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      {item.variant && (
                        <p className="text-sm text-gray-500">
                          Variant: {item.variant.name || `${item.variant.color || ''} ${item.variant.size || ''}`}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-gray-700">{item.quantity}</td>
                <td className="py-4 text-right text-gray-700">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-b">
              <td colSpan="2" className="py-2 text-right font-medium">Subtotal</td>
              <td className="py-2 text-right">${order.subTotal.toFixed(2)}</td>
            </tr>
            <tr className="border-b">
              <td colSpan="2" className="py-2 text-right font-medium">Shipping</td>
              <td className="py-2 text-right">${order.shippingCost.toFixed(2)}</td>
            </tr>
            {order.discount > 0 && (
              <tr className="border-b">
                <td colSpan="2" className="py-2 text-right font-medium text-green-600">Discount</td>
                <td className="py-2 text-right text-green-600">-${order.discount.toFixed(2)}</td>
              </tr>
            )}
            <tr className="border-b">
              <td colSpan="2" className="py-2 text-right font-medium">Tax</td>
              <td className="py-2 text-right">${order.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="2" className="py-2 text-right font-bold text-lg">Total</td>
              <td className="py-2 text-right font-bold text-lg">${order.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </Items>
    </Container>
  );
};

export default TrackOrder;