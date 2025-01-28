import React, { useState } from 'react';
import styled from "styled-components";
import daimond_logo from "../assets/daimond_logo.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
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
const Header = styled.div`
 text-align: center;
 margin-bottom: 40px;
 h1 {
   font-size: 36px;
 }
`;

const SearchBox = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 8px;
 
 img {
   width: 24px;
 }
 
 a {
   color: #000;
   text-decoration: underline;
 }
`;

const Accordion = styled.div`
 margin-top: 40px;
`;

const AccordionItem = styled.div`
 border-bottom: 1px solid #eee;
 margin-bottom: 16px;
`;

const Button = styled.button`
 width: 100%;
 text-align: left;
 padding: 16px;
 background: none;
 border: none;
 font-size: 16px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 cursor: pointer;
 
 span {
   color: #e60023;
   transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'none'};
   transition: transform 0.3s;
 }
`;

const Content = styled.div`
 padding: 0 16px 16px;
 color: #666;
 line-height: 1.6;
 display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const  FAQ = () => {
    const [activeItem, setActiveItem] = useState(null);

     const rewardsData = [
        { icon: justatyourservice_1, title: "VAULT REWARDS" },
        { icon: justatyourservice_2, title: "VAULT REWARDS" },
        { icon: justatyourservice_3, title: "VAULT REWARDS" },
        { icon: justatyourservice_4, title: "VAULT REWARDS" }
      ];
      const faqItems = [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal and financing options."
        },
        {
          question: "How do I redeem my gift card?",
          answer: "Enter your gift card code during checkout."
        },
        {
          question: "How can I apply for a JSKJewelers Credit Card?",
          answer: "You can apply online or in-store."
        },
        {
          question: "How long does it take to receive my JSK Jewelers Credit Card?",
          answer: "7-10 business days after approval."
        }
        // Add more FAQ items as needed
      ];
     
    return (
        <Container>
        
      <Header>
       <h1>FAQ</h1>
       <SearchBox>
         <img src={daimond_logo} alt="Diamond" />
         <span>506 results too many? Our Jewelry Assistant can help!</span>
         <a href="#">Describe what you're looking for?</a>
       </SearchBox>
     </Header>

     <Accordion>
       {faqItems.map((item, index) => (
         <AccordionItem key={index}>
           <Button 
             onClick={() => setActiveItem(activeItem === index ? null : index)}
             $isOpen={activeItem === index}
           >
             {item.question}
             <span>▼</span>
           </Button>
           <Content $isOpen={activeItem === index}>
             {item.answer}
           </Content>
         </AccordionItem>
       ))}
     </Accordion>
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

export default FAQ