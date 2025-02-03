import React from 'react';
import styled from "styled-components";
import appraisal from '../assets/appraisal.svg';
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

// Main Container Styles
const MainWrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;

  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Breadcrumb Styles
const Breadcrumb = styled.div`
  padding: 16px 0;
  color: #666;
  font-size: 14px;
`;

// Header Styles
const HeaderSection = styled.div`
  text-align: center;
  padding: 20px 0 40px;
`;

const MainTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
  
  span {
    font-size: 15px;
    color: #333;
  }
`;

const SearchLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

// Appraisal Section Styles
const AppraisalSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 40px 0;
  background: #f8f9fa;
`;

const ImageContainer = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #333;
  }
`;

// Pricing Section Styles
const PricingSection = styled.div`
  padding: 80px 0;
  background: #fff;
`;

const PricingTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-bottom: 60px;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;

const PriceCard = styled.div`
  background: #f9fafb;
  padding: 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const DiamondIcon = styled.div`
  font-size: 32px;
  margin-bottom: 8px;
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin: 8px 0;
`;

const ServiceType = styled.div`
  font-size: 18px;
  color: #333;
`;

const LoremSection = styled.div`
  padding: 40px 0;
  background: #fff;
`;

const Appraisal = () => {
  const pricingData = [
    { id: 1, price: "$150", service: "Diamond Jewelry", icon: "💎" },
    { id: 2, price: "$165", service: "Gemstone Jewelry", icon: "💎" },
    { id: 3, price: "$90", service: "Gold/Metal Pricing", icon: "💎" },
    { id: 4, price: "$125", service: "Pearl Jewelry", icon: "💎" }
  ];

  return (
    <MainWrapper>
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb>Home/ Appraisals</Breadcrumb>

        {/* Header Section */}
        <HeaderSection>
          <MainTitle>Appraisals</MainTitle>
          <SearchBar>
            <span>💎</span>
            <span>
              <strong>506 results too many?</strong> Our Jewelry Assistant can help!{" "}
              <SearchLink>Describe what you're looking for?</SearchLink>
            </span>
          </SearchBar>
        </HeaderSection>
      </Container>

      {/* Appraisal Section with Background */}
      <div style={{ background: "#f8f9fa" }}>
        <Container>
          <AppraisalSection>
            <ImageContainer>
              <img src={appraisal} alt="Jewelry appraisal" />
            </ImageContainer>
            <ContentContainer>
              <SectionTitle>Appraisals</SectionTitle>
              <Description>
                Your jewelry is valuable to you. If you want to insure it, you'll need to
                know what it's worth (and not just to you).
              </Description>
              <ButtonGroup>
                <Button>FIND STORE</Button>
                <Button>Book Appointment</Button>
              </ButtonGroup>
            </ContentContainer>
          </AppraisalSection>
        </Container>
      </div>

      {/* Lorem Ipsum Section */}
      <Container>
        <LoremSection>
          <SectionTitle>What is Lorem Ipsum?</SectionTitle>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book.
          </Description>
          <Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </Description>
        </LoremSection>
      </Container>

      {/* Pricing Section */}
      <Container>
        <PricingSection>
          <PricingTitle>Easy, Simplified Pricing</PricingTitle>
          <PricingGrid>
            {pricingData.map((item) => (
              <PriceCard key={item.id}>
                <DiamondIcon>{item.icon}</DiamondIcon>
                <Price>{item.price}</Price>
                <ServiceType>{item.service}</ServiceType>
              </PriceCard>
            ))}
          </PricingGrid>
        </PricingSection>
      </Container>
    </MainWrapper>
  );
};

export default Appraisal;