import React, { useState } from 'react';
import styled from "styled-components";
import daimond_logo from "../assets/daimond_logo.svg";
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

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 42px;
    margin-bottom: 20px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  a {
    color: #000;
    text-decoration: underline;
  }
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 80px;
  background: #fff;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ToolsSection = styled.div`
  h2 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 40px;
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  padding: 24px;
  border: 1px solid #eee;
  text-align: center;
  background: #fff;
  
  h3 {
    font-size: 20px;
    margin-bottom: 12px;
  }
  
  p {
    color: #666;
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.6;
  }
  
  a {
    color: #000;
    text-decoration: underline;
    font-weight: 500;
  }
`;

const FAQSection = styled.div`
  margin-bottom: 60px;
  
  h2 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 40px;
  }
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
`;

const AccordionButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 16px 0;
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  
  span {
    color: #e60023;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.3s ease;
  }
`;

const AccordionContent = styled.div`
  color: #666;
  line-height: 1.6;
  padding-bottom: 16px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;
const Section = styled.div`
  margin-bottom: 80px;
  
  h2 {
    font-size: 32px;
    text-align: center;
    margin-bottom: 40px;
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
const HelpCenter = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activePayment, setActivePayment] = useState(null);
 
  const services = [
    {
      title: "Style Help",
      description: "Shop with a jewelry expert to find the perfect piece.",
      link: "Get Style Help"
    },
    {
      title: "Store Finder",
      description: "Find a KAY near you for in-store services and shopping events.",
      link: "Find Stores Nearby"
    },
    {
      title: "E-Gift Cards",
      description: "Give them the gift of choice. Delivered within 24 hours.",
      link: "Purchase e-Gift Cards"
    },
    {
      title: "Start A Return",
      description: "Returns must start within 30 days of purchase or shipment date.",
      link: "Get Style Help"
    },
    {
      title: "Request A Service",
      description: "Book an appointment or visit a store for any service-related help.",
      link: "Start Request"
    },
    {
      title: "Track A Service",
      description: "Easily track where your item is within the repair process.",
      link: "Track Service"
    },
    {
      title: "Track Your Order",
      description: "Check the location and estimated arrival time of your order.",
      link: "Track Order"
    },
    {
      title: "Cancel Your Order",
      description: "Changed your mind? Cancel an order within one hour of placing it.",
      link: "Cancel Order"
    }
  ];

  const faqItems = [
    {
      title: "How can I have a Jewelry Style Expert help me?",
      content: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget."
    },
    {
      title: "How can I find the perfect gift?",
      content: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue."
    },
    {
      title: "Do you offer gift cards?",
      content: "Yes, we offer both physical and digital gift cards."
    }
  ];


  const paymentQuestions = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards, debit cards, and PayPal."
    },
    {
      question: "How do I redeem my gift card?",
      answer: "Enter your gift card number during checkout."
    },
    {
      question: "How can I apply for a KAY Jewelers Credit Card?",
      answer: "Visit our credit application page online."
    },
    {
      question: "How long does it take to receive my KAY Jewelers Credit Card?",
      answer: "7-10 business days after approval."
    },
    {
      question: "What if I need help reading my billing statement and account materials?",
      answer: "Contact our customer service for assistance."
    },
    {
      question: "How do I link my KAY Jewelers Credit Card to my KAY account?",
      answer: "Login to your account and go to payment methods."
    },
    {
      question: "Will I receive monthly statements for my KAY Jewelers Credit Card?",
      answer: "Yes, either electronically or by mail."
    },
    {
      question: "When will I be charged a late fee on my KAY Jewelers Credit Card?",
      answer: "If payment is not received by due date."
    },
    {
      question: "How do I sign up for online account management?",
      answer: "Visit our account registration page."
    },
    {
      question: "What to do if I am locked out of my account?",
      answer: "Use the password reset feature or contact support."
    },
    {
      question: "Who can I contact for questions about my KAY Jewelers Credit Card?",
      answer: "Call our dedicated credit card support line."
    }
  ];

   const rewardsData = [
     { icon: justatyourservice_1, title: "VAULT REWARDS" },
     { icon: justatyourservice_2, title: "VAULT REWARDS" },
     { icon: justatyourservice_3, title: "VAULT REWARDS" },
     { icon: justatyourservice_4, title: "VAULT REWARDS" }
   ];


  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <Container>
      <Header>
        <h1>Help Center</h1>
        <SearchBox>
          <img src={daimond_logo} alt="Diamond" />
          <span>506 results too many? Our Jewelry Assistant can help!</span>
          <a href="#">Describe what you're looking for?</a>
        </SearchBox>
      </Header>

      <HeroSection>
        <img src={jewelryservices} alt="Help Center" />
        <div>
          <h2>Customer Help Center</h2>
          <p>Need help with something? You're in the right place! From quick self-service tools to live support, we've got you covered.</p>
        </div>
      </HeroSection>

      <ToolsSection>
        <h2>Self-Service Tools</h2>
        <ServiceGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#">{service.link}</a>
            </ServiceCard>
          ))}
        </ServiceGrid>
      </ToolsSection>

      <FAQSection>
        <h2>Style Help & Gifting</h2>
        {faqItems.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton 
              onClick={() => toggleQuestion(index)}
              $isOpen={activeQuestion === index}
            >
              {item.title}
              <span>▼</span>
            </AccordionButton>
            <AccordionContent $isOpen={activeQuestion === index}>
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </FAQSection>
      <Section>
        <h2>Payment</h2>
        {paymentQuestions.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionButton 
              onClick={() => setActivePayment(activePayment === index ? null : index)}
              $isOpen={activePayment === index}
            >
              {item.question}
              <span>▼</span>
            </AccordionButton>
            <AccordionContent $isOpen={activePayment === index}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Section>

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

export default HelpCenter;