import React, { useState } from 'react';
import styled from "styled-components";
import instoreservice from '../assets/instoreservice.svg';
import diamondband from '../assets/diamondband.svg';
import fullservice from '../assets/fullservice.svg';
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background: white;
`;

const DiamondIcon = styled.span`
  font-size: 20px;
`;

const SearchText = styled.p`
  font-size: 16px;
  color: #333;
`;
const MainTitle = styled.h1`
  font-size: 42px;
  font-weight: 700;
// margin-bottom: 16px;
  text-align: center;
    margin-top: 13px;
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  padding: 40px;
  background: #f8f8f8;
  margin: 20px 0;
  gap: 60px;
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
`;

const ImageArea = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #000;
`;

const Description = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
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

  &:hover {
    background: #333;
  }
`;

const LoremSection = styled.div`
  padding: 40px;
  background: white;
`;
const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 80px 0;
  align-items: center;
`;

const FormContent = styled.div`
  max-width: 500px;
`;

// const Title = styled.h2`
//   font-size: 48px;
//   font-weight: 600;
//   margin-bottom: 40px;
//   line-height: 1.2;
// `;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #000;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 16px;

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 16px;
  color: #9ca3af;
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  width: fit-content;
  
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

// Rewards Section Styles
const RewardsSection = styled.div`
  padding: 80px 0;
  background: #fff;
`;

const RewardsTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 48px;
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
`;

const RewardCard = styled.div`
  background: #f9fafb;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const DiamondIcons = styled.div`
  font-size: 32px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 8px 0;
`;

const CardText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const LearnMoreLink = styled.a`
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

const PromotionLink = styled.a`
  text-align: center;
  display: block;
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  margin-top: 24px;
`;
const RepairandMaintances = () => {
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
      {/* Search Bar Section */}
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

      {/* In-Store Services Section */}
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

      {/* Full Service Jeweler Section */}
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

      {/* Lorem Ipsum Section */}
      <LoremSection>
        <Title>What is Lorem Ipsum?</Title>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </Description>
        <Title>What is Lorem Ipsum?</Title>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
        </Description>
        <Title>Jewelry Repair Made Easy</Title>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type 
          specimen book.
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Description>
      </LoremSection>

      <FormSection>
          <FormContent>
            <Title>Your Full Service Jeweler</Title>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Jewelry type</Label>
                <Select 
                  value={formData.jewelryType}
                  onChange={(e) => setFormData({...formData, jewelryType: e.target.value})}
                >
                  <option value="">Select type</option>
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label>Product name</Label>
                <Input 
                  type="text" 
                  placeholder="Enter Product name"
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Almost there...</Label>
                <TextArea 
                  placeholder="Comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                />
              </FormGroup>
              
              <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
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