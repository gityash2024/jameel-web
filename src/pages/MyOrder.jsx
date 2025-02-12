import React from 'react';
import styled from "styled-components";
import { Eye } from 'lucide-react';
import daimond_logo from "../assets/daimond_logo.svg";
import { Link, Outlet } from 'react-router-dom';
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
  const orders = [
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' },
    { id: '#12345', date: '11 DEC 2024', amount: '$49.99', status: 'Pending', method: 'COD' }
  ];

  return (
    <Container>
         <BreadCrumb>
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Terms of Use</span>
      </BreadCrumb>

      <Title>My Oder</Title>

      <AssistantBox>
        <img src={daimond_logo  } alt="Diamond" />
        <span>506 results too many? Our Jewelry Assistant can help!</span>
        <Link to="#">Describe what you're looking for?</Link>
      </AssistantBox>
      <OrderTable>
        <TableHeader>
          <div>Order NO</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Payment Status</div>
          <div>Payment Method</div>
          <div>Option</div>
        </TableHeader>
        {orders.map((order, index) => (
          <TableRow key={index}>
            <div>{order.id}</div>
            <div>{order.date}</div>
            <div>{order.amount}</div>
            <div>
              <StatusBadge status={order.status}>{order.status}</StatusBadge>
            </div>
            <div>{order.method}</div>
            <div>
              <ViewButton>
                <Eye size={20} />
              </ViewButton>
            </div>
          </TableRow>
        ))}
      </OrderTable>
    </Container>
  );
};

export default MyOrder;