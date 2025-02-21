import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import daimond_logo from "../assets/daimond_logo.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 1rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
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
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// const Title = styled.h1`
//   font-size: 1.5rem;
//   font-weight: bold;
// `;

const AddButton = styled.button`
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #333;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Name = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

const Badge = styled.span`
  display: inline-block;
  background-color: #dc2626;
  color: white;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
`;

const Address = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
`;

const Phone = styled.p`
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  flex: 1;
  background-color: #e5e7eb;
  color: #1f2937;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #d1d5db;
  }
`;

// const ServiceSection = styled.div`
//   margin-top: 3rem;
//   text-align: center;
// `;

// const ServiceTitle = styled.h2`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 2rem;
// `;

// const ServiceGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//   gap: 2rem;
//   margin-top: 2rem;
// `;

// const ServiceImage = styled.img`
//   width: 100%;
//   height: auto;
// `;
// const SidebarLink = styled(Link)`
//   display: block;
//   padding: 12px 15px;
//   text-decoration: none;
//   color: #333;
//   border-radius: 4px;
//   margin-bottom: 5px;
  
//   &:hover {
//     background: #f5f5f5;
//   }
  
//   &.active {
//     background: #f0f0f0;
//     font-weight: 500;
//   }
// `;
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
const SavedAddress = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'john due',
      address: '26, Starts Hollow Colony, Denver Colorado, United States 80014',
      phone: '+1 5551855359',
      isNewHome: true
    },
    {
      id: 2,
      name: 'john due',
      address: '26, Starts Hollow Colony, Denver Colorado, United States 80014',
      phone: '+1 5551855359',
      isNewHome: true
    }
  ]);

  const rewardsData = [
          { icon: justatyourservice_1, title: "VAULT REWARDS" },
          { icon: justatyourservice_2, title: "VAULT REWARDS" },
          { icon: justatyourservice_3, title: "VAULT REWARDS" },
          { icon: justatyourservice_4, title: "VAULT REWARDS" }
        ];
        
  const handleAddAddress = () => {
    navigate('/add-address');
  };

  const handleEdit = (id) => {
    navigate(`/add-address/${id}`);
  };

  const handleRemove = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
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
      <Header>
        <AddButton onClick={handleAddAddress}>
          Add Address
        </AddButton>
      </Header>

      <Grid>
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader>
              <div>
                <Name>{address.name}</Name>
                {address.isNewHome && (
                  <Badge>New Home</Badge>
                )}
              </div>
            </CardHeader>
            
            <Address>{address.address}</Address>
            <Phone>Phone: {address.phone}</Phone>
            
            <ButtonGroup>
              <ActionButton onClick={() => handleEdit(address.id)}>
                Edit
              </ActionButton>
              <ActionButton onClick={() => handleRemove(address.id)}>
                Remove
              </ActionButton>
            </ButtonGroup>
          </Card>
        ))}
      </Grid>

      <RewardsSection>
        <h2>JSK At Your Service</h2>
        <RewardsGrid>
          {rewardsData.map((reward, index) => (
            <RewardCard key={index}>
              <img src={reward.icon} alt={reward.title} />
              <h3>Join Vault Rewards</h3>
              <p>"This was one of the first rings I had looked at in person. After looking at hundreds"</p>
              <a href="#">LEARN MORE</a>
            </RewardCard>
          ))}
        </RewardsGrid>
        <p style={{ marginTop: '40px' }}>
          <a href="#">PROMOTION TERMS & CONDITIONS</a>
        </p>
      </RewardsSection>
    </Container>
  );
};

export default SavedAddress;