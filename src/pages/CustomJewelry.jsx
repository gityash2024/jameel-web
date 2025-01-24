import React, { useState } from 'react';
import styled from "styled-components";
import customforscratch from "../assets/customforscratch.svg";
import howitwork_1 from "../assets/howitwork_1.svg";
import howitwork_2 from "../assets/howitwork_2.svg";
import howitwork_3 from "../assets/howitwork_3.svg";
import howitwork_4 from "../assets/howitwork_4.svg";
import jskcustomlookbook from "../assets/jskcustomlookbook.svg";
import expertengraving from "../assets/expertengraving.svg";
import jewelryservices from "../assets/jewelryservices.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SearchHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h1 {
    font-size: 42px;
    margin-bottom: 20px;
  }
`;

const SearchInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  a {
    color: #000;
    text-decoration: underline;
  }
`;

const HeroSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 80px;
  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 60px;
  
  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    margin-bottom: 30px;
    line-height: 1.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  background: ${props => props.$primary ? '#000' : '#e60023'};
  color: white;
  padding: 23px 24px;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ProcessSection = styled.div`
  margin-bottom: 80px;
  text-align: center;
  
  h2 {
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessCard = styled.div`
  text-align: center;
  
  img {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  p {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const StartDesignSection = styled.div`
  margin-bottom: 80px;

    h2 {
    font-size: 36px;
    margin-bottom: 40px;
    text-align: center;

  }
`;

const CategoryButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LookbookSection = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const ServiceSection = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
  margin-top: 60px;
  background: #F7F7F7;
  border-radius: 12px;
  overflow: hidden;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentSide = styled.div`
  flex: 1;
  padding: 60px;
  
  h2 {
    font-size: 36px;
    margin-bottom: 16px;
  }
  
  p {
    color: #666;
    margin-bottom: 24px;
    line-height: 1.6;
  }
`;

const ImageSide = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Buttons = styled.button`
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
`;

const FAQSection = styled.div`
  margin: 60px 0;
  
  h2 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
  }
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  font-weight: 500;
`;

const Answer = styled.div`
  color: #666;
  padding-bottom: 20px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
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

const HelpBox = styled.div`
  background: #F7F7F7;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
  transition: all 0.3s ease;
`;

const ContactForm = styled.div`
  display: ${props => props.$show ? 'block' : 'none'};
  margin-top: 20px;
`;

const CustomJewelry = () => {
    const [activeFAQ, setActiveFAQ] = useState(0);
  const [showContact, setShowContact] = useState(false);

  
  const steps = [
    {
      image: howitwork_1,
      title: "Step 1: Design Your Jewelry",
      description: "Our designers use your ideas to virtually design your custom piece."
    },
    {
      image: howitwork_2,
      title: "Step 2: 3D Render & Wax Model",
      description: "Receive a 3D rendering and wax model to ensure every detail is just right."
    },
    {
      image: howitwork_3,
      title: "Step 3: Cast & Set",
      description: "Once approved, we'll cast the jewelry and set your selected diamonds."
    },
    {
      image: howitwork_4,
      title: "Step 4: Crafted To Perfection",
      description: "Final piece is meticulously set, polished, and finished by hand."
    }
  ];

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore et?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue."
    },
    // Add more FAQs as needed
  ];
  const rewardsData = [
    { icon: justatyourservice_1, title: "VAULT REWARDS" },
    { icon: justatyourservice_2, title: "VAULT REWARDS" },
    { icon: justatyourservice_3, title: "VAULT REWARDS" },
    { icon: justatyourservice_4, title: "VAULT REWARDS" }
  ];
 

const handleGetInTouch = () => {
  setShowContact(true);
  // Add additional contact form logic here
};
  return (
    <Container>
      <SearchHeader>
        <h1>Custom Jewelry</h1>
        <SearchInfo>
          <span>506 results too many?</span>
          <span>Our Jewelry Assistant can help!</span>
          <a href="#">Describe what you're looking for?</a>
        </SearchInfo>
      </SearchHeader>

      <HeroSection>
        <ImageSection>
          <img src={customforscratch} alt="Custom jewelry creation" />
        </ImageSection>
        <ContentSection>
          <h2>Create From Scratch</h2>
          <p>If you can dream it, we can design it. Collaborate with our Jewelry Experts to create a unique piece that reflects your personal style.</p>
          <ButtonGroup>
            <Button $primary>FEATURED STYLE</Button>
            <Button $primary>NEW ARRIVAL</Button>
          </ButtonGroup>
        </ContentSection>
      </HeroSection>

      <ProcessSection>
        <h2>How It Works</h2>
        <ProcessGrid>
          {steps.map((step, index) => (
            <ProcessCard key={index}>
              <img src={step.image} alt={step.title} />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </ProcessCard>
          ))}
        </ProcessGrid>
      </ProcessSection>

      <StartDesignSection>
        <h2>Get Started On Your Design</h2>
        <CategoryButtons>
          <Button>FOR HIM</Button>
          <Button>FOR HER</Button>
          <Button>GIFTS UNDER $250</Button>
          <Button>GIFT GUIDE</Button>
        </CategoryButtons>
      </StartDesignSection>

      <LookbookSection>
        <ImageSection>
          <img src={jskcustomlookbook} alt="JSK Custom Design Lookbook" />
        </ImageSection>
        <ContentSection>
          <h2>The JSK Custom Design Lookbook</h2>
          <p>Learn more about the design process and get inspired by real life examples of how our talented jewelers and artisans have brought customers' ideas to life.</p>
          <Button $primary>Explore the LookBook</Button>
        </ContentSection>
      </LookbookSection>
      
      <ServiceSection>
        <ContentSide>
          <h2>Expert Engraving</h2>
          <p>Our engraving services at JSK are unparalleled.</p>
          <p>With our in-store capabilities, we can meticulously engrave your jewelry with precision and care.</p>
          <Buttons>Book Appointment</Buttons>
        </ContentSide>
        <ImageSide>
          <img src={expertengraving} alt="Expert Engraving" />
        </ImageSide>
      </ServiceSection>

      <ServiceSection>
        <ContentSide>
          <h2>Expert Jewelry Services</h2>
          <p>Our skilled artisans are committed to bringing your design ideas to life. They work with you every step of the way to create the jewelry of your dreams.</p>
          <Buttons>Book Appointment</Buttons>
        </ContentSide>
        <ImageSide>
          <img src={jewelryservices} alt="Jewelry Services" />
        </ImageSide>
      </ServiceSection>

      <FAQSection>
        <h2>FAQ Section</h2>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <Question onClick={() => setActiveFAQ(activeFAQ === index ? -1 : index)}>
              {faq.question}
              <span>{activeFAQ === index ? '▼' : '▶'}</span>
            </Question>
            <Answer $isOpen={activeFAQ === index}>
              {faq.answer}
            </Answer>
          </FAQItem>
        ))}
        
        <HelpBox>
  <div>
    <h3>Still have questions?</h3>
    <p>Can't find the answer you're looking for? Please chat to our friendly team.</p>
    <ContactForm $show={showContact}>
      <input type="text" placeholder="Your email" />
      <textarea placeholder="Your message"></textarea>
      <Button onClick={() => setShowContact(false)}>Send</Button>
    </ContactForm>
  </div>
  <Button onClick={handleGetInTouch}>
    {showContact ? 'Close' : 'Get in touch'}
  </Button>
</HelpBox>
      </FAQSection>

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

export default CustomJewelry;