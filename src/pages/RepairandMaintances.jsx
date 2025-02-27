import React, { useState } from 'react';
import styled from "styled-components";
import instoreservice from '../assets/instoreservice.svg';
import diamondband from '../assets/diamondband.svg';
import fullservice from '../assets/fullservice.svg';
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    padding: 0;
  }
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px;
  background: white;
  text-align: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
    padding: 20px;
  }
`;

const DiamondIcon = styled.span`
  font-size: 18px;
  
  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const SearchText = styled.p`
  font-size: 14px;
  color: #333;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const MainTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-top: 13px;
  
  @media (min-width: 768px) {
    font-size: 42px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f8f8f8;
  margin: 20px 0;
  gap: 30px;
  
  @media (min-width: 768px) {
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
    padding: 40px;
    gap: 60px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 10px;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 20px;
    text-align: left;
  }
`;

const ImageArea = styled.div`
  flex: 1;
  width: 100%;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #000;
  
  @media (min-width: 768px) {
    font-size: 42px;
    margin-bottom: 20px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
  
  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 16px;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }

  &:hover {
    background: #333;
  }
`;

const LoremSection = styled.div`
  padding: 20px;
  background: white;
  
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  padding: 40px 20px;
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    padding: 80px 0;
  }
`;

const FormContent = styled.div`
  max-width: 100%;
  
  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (min-width: 768px) {
    gap: 24px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  @media (min-width: 768px) {
    gap: 8px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #000;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Input = styled.input`
  padding: 10px 14px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 14px;

  @media (min-width: 768px) {
    padding: 12px 16px;
    font-size: 16px;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 10px 14px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 14px;
  color: #9ca3af;
  
  @media (min-width: 768px) {
    padding: 12px 16px;
    font-size: 16px;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 14px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  @media (min-width: 768px) {
    padding: 12px 16px;
    font-size: 16px;
    min-height: 120px;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  
  @media (min-width: 768px) {
    width: fit-content;
    font-size: 16px;
  }
  
  &:hover {
    background: #333;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const RewardsSection = styled.div`
  padding: 40px 20px;
  background: #fff;
  
  @media (min-width: 768px) {
    padding: 80px 0;
  }
`;

const RewardsTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  
  @media (min-width: 768px) {
    font-size: 36px;
    margin-bottom: 48px;
  }
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 40px;
  }
`;

const RewardCard = styled.div`
  background: #f9fafb;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  
  @media (min-width: 768px) {
    padding: 24px;
    gap: 16px;
  }
`;

const DiamondIcons = styled.div`
  font-size: 28px;
  
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 6px 0;
  
  @media (min-width: 768px) {
    font-size: 18px;
    margin: 8px 0;
  }
`;

const CardText = styled.p`
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
  
  @media (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const LearnMoreLink = styled.a`
  color: #000;
  text-decoration: underline;
  font-size: 13px;
  cursor: pointer;
  
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const PromotionLink = styled.a`
  text-align: center;
  display: block;
  color: #000;
  text-decoration: underline;
  font-size: 13px;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    font-size: 14px;
    margin-top: 24px;
  }
`;


const RepairandMaintances = () => {
  const navigate=useNavigate();
    const [formData, setFormData] = useState({
        jewelryType: '',
        productName: '',
        comment: ''
      });
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      }; 
      
      
  const rewardsData = [
    {
      id: 1,
      title: "Join Vault Rewards",
      text: "This was one of the first rings I had looked at in person. After looking at hundreds",
      image: justatyourservice_1
    },
    {
      id: 2,
      title: "Join Vault Rewards",
      text: "This was one of the first rings I had looked at in person. After looking at hundreds",
      image: justatyourservice_2
    },
    {
      id: 3,
      title: "Join Vault Rewards",
      text: "This was one of the first rings I had looked at in person. After looking at hundreds",
      image: justatyourservice_3
    },
    {
      id: 4,
      title: "Join Vault Rewards",
      text: "This was one of the first rings I had looked at in person. After looking at hundreds",
      image: justatyourservice_4
    }
  ];
  return (
    <Container>
      <MainTitle>Jewelry Services</MainTitle>
      <SearchSection>
        <DiamondIcons>💎</DiamondIcons>
        <SearchText>
          <strong>506 results too many?</strong> Our Jewelry Assistant can help!{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            Describe what you're looking for?
          </span>
        </SearchText>
      </SearchSection>

      <Section reverse>
        <ContentArea>
          <Title>In-Store Services</Title>
          <Description>
            Discover what's happening at your local JSK Jewelers and plan your next visit
          </Description>
          <ButtonGroup>
            <Button>FIND STORE</Button>
            <Button>Book Appointment</Button>
            <Button>START A REPAIR</Button>
          </ButtonGroup>
        </ContentArea>
        <ImageArea>
          <img src={instoreservice} alt="In-store services" />
        </ImageArea>
      </Section>

      <Section>
        <ContentArea>
          <Title>Your Full Service Jeweler</Title>
          <Description>
            JSK offers services to keep your jewelry sparkling for a lifetime.
          </Description>
        </ContentArea>
        <ImageArea>
          <img src={diamondband} alt="Full service jeweler" />
        </ImageArea>
      </Section>

      <LoremSection>
        <Title>Jewelry Cleaning & Polishing</Title>
        <Description>
          Regular professional cleaning is essential to maintain the brilliance and beauty of your jewelry. At JSK Jewelers, our expert technicians use state-of-the-art equipment and techniques to clean, polish and restore your precious pieces to their original luster. Our ultrasonic cleaning removes dirt and grime from hard-to-reach places, while our professional polishing services remove minor scratches and restore the shine to your jewelry.
        </Description>
        <Title>Ring Sizing & Repairs</Title>
        <Description>
          Whether you need a ring sized up or down, or repaired after damage, our master jewelers can help. We offer professional ring sizing services to ensure your rings fit perfectly and comfortably. Our repair services can address common issues such as broken prongs, damaged settings, or worn bands. With decades of experience working with all types of precious metals and gemstones, our craftsmen can restore your jewelry to its original beauty.
        </Description>
        <Title>Jewelry Repair Made Easy</Title>
        <Description>
          At JSK Jewelers, we've simplified the jewelry repair process to make it convenient and stress-free for our customers. Simply bring your pieces to any of our store locations for a complimentary evaluation by our experts. We'll provide you with a detailed assessment, including repair recommendations and a transparent pricing estimate.
          
          Most repairs can be completed within 7-10 business days, with expedited services available for urgent needs. We take exceptional care with your treasured pieces, treating each item with the attention it deserves, whether it's a family heirloom or a recent purchase.
          
          Our comprehensive jewelry repair services include prong re-tipping, stone replacement, chain soldering, clasp replacement, and pearl restringing. We also offer custom modifications to update or personalize your existing jewelry. All repairs come with our satisfaction guarantee, ensuring your precious items are returned to you in exceptional condition.
          
          Trust our skilled craftsmen to handle your valuable pieces with expert care and precision. Schedule your jewelry repair consultation today and experience the JSK difference.
        </Description>
      </LoremSection>

      <FormSection>
          <FormContent>
            <Title>Your Full Service Jeweler</Title>
            <Button onClick={()=>{navigate('/help-center')}}>Contact Us</Button>
          </FormContent>
          
          <ImageContainer>
            <img src={fullservice} alt="Full service jeweler" />
          </ImageContainer>
        </FormSection>

        <RewardsSection>
          <RewardsTitle>JSK At Your Service</RewardsTitle>
          <RewardsGrid>
            {rewardsData.map((reward) => (
              <RewardCard key={reward.id}>
                <DiamondIcon>💎</DiamondIcon>
                <CardTitle>VAULT REWARDS</CardTitle>
                <CardTitle>{reward.title}</CardTitle>
                <CardText>{reward.text}</CardText>
                <LearnMoreLink>LEARN MORE</LearnMoreLink>
              </RewardCard>
            ))}
          </RewardsGrid>
          <PromotionLink href="#">PROMOTION TERMS & CONDITIONS</PromotionLink>
        </RewardsSection>
    </Container>
  );
};

export default RepairandMaintances;