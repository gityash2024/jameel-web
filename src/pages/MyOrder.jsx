import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderAPI from '../api/order';
import daimond_logo from "../assets/daimond_logo.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

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
    &:hover { text-decoration: underline; }
  }
`;
const OrderTable = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow-x: auto;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.2fr 1fr 0.5fr;
  padding: 15px;
  background: #f5f5f5;
  font-weight: 500;
  gap: 10px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1.2fr 1fr 0.5fr;
  padding: 15px;
  border-bottom: 1px solid #eee;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background: #f9f9f9;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  margin-bottom: 30px;
`;
const SidebarLink = styled(Link)`
  display: block;
  padding: 12px 15px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  margin-bottom: 5px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &.active {
    background: #f0f0f0;
    font-weight: 500;
  }
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


const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  background: ${props => props.status === 'Pending' ? '#FFF3DC' : '#E8F8F3'};
  color: ${props => props.status === 'Pending' ? '#FFB82E' : '#1EC263'};
`;

const ViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #000;
  }
`;

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrders();
      
      if (response?.data?.data?.orders) {
        setOrders(response.data.data.orders);
      } else {
        setOrders([]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/track-order/${orderId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  return (
    <Container>
      {loading ? (
        <p>Loading your orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-4">You haven't placed any orders yet</h2>
          <p className="mb-6">Explore our collection and place your first order today.</p>
          <Link to="/products" className="bg-black text-white px-6 py-2 rounded">Shop Now</Link>
        </div>
      ) : (
        <OrderTable>
          <TableHeader>
            <div>Order NO</div>
            <div>Date</div>
            <div>Amount</div>
            <div>Order Status</div>
            <div>Payment Method</div>
            <div>Option</div>
          </TableHeader>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <div>{order.orderNumber || 'N/A'}</div>
              <div>{formatDate(order.createdAt)}</div>
              <div>${order.total ? order.total.toFixed(2) : '0.00'}</div>
              <div>
                <StatusBadge status={order.orderStatus || 'Pending'}>
                  {order.orderStatus ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1) : 'Pending'}
                </StatusBadge>
              </div>
              <div>{order.paymentMethod ? order.paymentMethod.toUpperCase() : 'N/A'}</div>
              <div>
                <ViewButton onClick={() => handleViewOrder(order._id)}>
                  <Eye size={20} />
                </ViewButton>
              </div>
            </TableRow>
          ))}
        </OrderTable>
      )}
    </Container>
  );
};

export default MyOrder;