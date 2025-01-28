import React, { useState } from 'react';
import styled from "styled-components";
import daimond_logo from "../assets/daimond_logo.svg";
import contactUs from "../assets/contactUs.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

// Styled Components
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Navigation = styled.nav`
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #666;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SearchInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: ${props => props.double ? '1fr 1fr' : '1fr'};
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.125rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #black;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  width: 100px;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  width: 100%;
  resize: none;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #black;
  }
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;

  &:hover {
    background-color: #333;
  }
`;

const ServiceSection = styled.div`
  margin-bottom: 4rem;
`;

const ServiceHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background-color: #fafafa;
  padding: 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    width: 32px;
    height: 32px;
    margin-bottom: 1rem;
  }
`;

const VaultTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-style: italic;
`;

const LearnMoreButton = styled.button`
  background: none;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0.5rem 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TermsLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 3rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  text-decoration: underline;
  color: black;
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const rewardCards = [
    { id: 1, title: 'Join Vault Rewards', image: justatyourservice_1 },
    { id: 2, title: 'Join Vault Rewards', image: justatyourservice_2 },
    { id: 3, title: 'Join Vault Rewards', image: justatyourservice_3 },
    { id: 4, title: 'Join Vault Rewards', image: justatyourservice_4 }
  ];

  return (
    <Container>
      <Navigation>Home/ Terms of Use</Navigation>

      <Header>Contact Us</Header>
      <SearchInfo>
        <img src={daimond_logo} alt="Diamond Logo" width="24" height="24" />
        <span>
          <strong>506 results too many?</strong> Our Jewelry Assistant can help!{' '}
          <a href="#">Describe what you're looking for?</a>
        </span>
      </SearchInfo>

      <FormGrid>
        <ImageContainer>
          <img 
            src={contactUs}
            alt="Jewelry hand" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.5rem' }}
          />
        </ImageContainer>

        <Form onSubmit={handleSubmit}>
          <InputGroup double>
            <FormField>
              <Label>Full Name</Label>
              <Input 
                type="text" 
                placeholder="Enter name"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </FormField>
            <FormField>
              <Label>Last Name</Label>
              <Input 
                type="text" 
                placeholder="Enter Last Name"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </FormField>
          </InputGroup>

          <FormField>
            <Label>Email</Label>
            <Input 
              type="email" 
              placeholder="Enter Last Name"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </FormField>

          <FormField>
            <Label>Phone Number</Label>
            <InputGroup>
              <Select>
                <option>+1</option>
              </Select>
              <Input 
                type="tel" 
                placeholder="000000"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </InputGroup>
          </FormField>

          <FormField>
            <Label>Almost there...</Label>
            <TextArea 
              placeholder="Comment"
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
            />
          </FormField>

          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>
      </FormGrid>

      <ServiceSection>
        <ServiceHeader>JSK At Your Service</ServiceHeader>
        
        <ServiceGrid>
          {rewardCards.map((card) => (
            <ServiceCard key={card.id}>
              <img src={card.image} alt="Service Icon" width="48" height="48" />
              {/* <CardTitle>VAULT REWARDS</CardTitle> */}
              <CardTitle>{card.title}</CardTitle>
              <CardText>
                "This was one of the first rings I had looked at in person. After looking at hundreds"
              </CardText>
              <LearnMoreButton>LEARN MORE</LearnMoreButton>
            </ServiceCard>
          ))}
        </ServiceGrid>

        <TermsLink href="#">PROMOTION TERMS & CONDITIONS</TermsLink>
      </ServiceSection>

    </Container>
  );
};

export default ContactUs;