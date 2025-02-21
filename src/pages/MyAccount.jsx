import React, { useState } from 'react';
import styled from "styled-components";
import { Link, Outlet, useLocation } from 'react-router-dom';
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

const Content = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  border-right: 1px solid #eee;
  padding-right: 20px;
  
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
  }
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
const FormSection = styled.div`
  max-width: 800px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
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

const PhoneInput = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 10px;
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f8f9fc;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const SaveButton = styled.button`
  padding: 12px 40px;
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

const RewardsSection = styled.div`
  text-align: center;
  margin: 60px 0;
  
  h2 {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RewardCard = styled.div`
  background: #F7F7F7;
  padding: 24px;
  text-align: center;
  
  svg {
    margin-bottom: 16px;
  }
  
  h3 {
    margin-bottom: 12px;
  }
  
  p {
    color: #666;
    margin-bottom: 16px;
    font-size: 14px;
  }
  
  a {
    color: #000;
    text-decoration: none;
    font-weight: 500;
  }
`;

const PromotionLink = styled.a`
  display: inline-block;
  margin-top: 40px;
  color: #000;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Layout = () => {
  const location = useLocation();
  const rewardsData = [
        { icon: justatyourservice_1, title: "VAULT REWARDS" },
        { icon: justatyourservice_2, title: "VAULT REWARDS" },
        { icon: justatyourservice_3, title: "VAULT REWARDS" },
        { icon: justatyourservice_4, title: "VAULT REWARDS" }
      ];
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+1',
    phone: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  

  return (
    <Container>
      <BreadCrumb>
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Terms of Use</span>
      </BreadCrumb>

      <Title>My Account</Title>

      <AssistantBox>
        <img src={daimond_logo  } alt="Diamond" />
        <span>506 results too many? Our Jewelry Assistant can help!</span>
        <Link to="#">Describe what you're looking for?</Link>
      </AssistantBox>

      <Content>
        <Sidebar>
          <SidebarLink 
            to="/my-account" 
            className={location.pathname === '/my-account' ? 'active' : ''}
          >
            My Account
          </SidebarLink>
          <SidebarLink 
            to="/my-order" 
            className={location.pathname === '/my-order' ? 'active' : ''}
          >
            My Orders
          </SidebarLink>
          <SidebarLink 
            to="/favorites" 
            className={location.pathname === '/favorites' ? 'active' : ''}
          >
            Favourites
          </SidebarLink>
          <SidebarLink 
            to="/track-order" 
            className={location.pathname === '/track-order' ? 'active' : ''}
          >
            Track Order
          </SidebarLink>
          <SidebarLink 
            to="/saved-order" 
            className={location.pathname === '/saved-order' ? 'active' : ''}
          >
            Saved Address
          </SidebarLink>
        </Sidebar>
       
        <Outlet />
        <FormSection>
      <form onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <label>Full Name</label>
            <Input
              type="text"
              name="firstName"
              placeholder="Enter name"
              value={formData.firstName}
              onChange={handleInputChange}
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
            />
          </FormGroup>
        </FormGrid>

        <FormGrid>
          <FormGroup>
            <label>Email Address</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter Last Name"
              value={formData.email}
              onChange={handleInputChange}
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
              />
            </PhoneInput>
          </FormGroup>
        </FormGrid>

        <FormGroup>
          <label>Password</label>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormGroup>

        <SaveButton type="submit">Save</SaveButton>
      </form>
    </FormSection>
    </Content>
   
    <RewardsSection>
        <h2>JSK At Your Service</h2>
        <RewardsGrid>
          {rewardsData.map((reward, index) => (
            <RewardCard key={index}>
              <img src={reward.icon} alt={reward.title} />
              <h3>VAULT REWARDS</h3>
              <p>"This was one of the first rings I had looked at in person. After looking at hundreds"</p>
              <a href="#">LEARN MORE</a>
            </RewardCard>
          ))}
        </RewardsGrid>
        <PromotionLink href="#">PROMOTION TERMS & CONDITIONS</PromotionLink>
      </RewardsSection>

    </Container>
  );
};

export default Layout;

