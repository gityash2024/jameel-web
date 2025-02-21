import React from "react";
import styled from "styled-components";
import flexiblepayment_1 from '../assets/flexiblepayment_1.svg';
import flexiblepayment_2 from '../assets/flexiblepayment_2.svg';
import flexiblepayment_3 from '../assets/flexiblepayment_3.svg';
import justatyourservice_1 from '../assets/justatyourservice_1.svg';
import justatyourservice_2 from '../assets/justatyourservice_2.svg';
import justatyourservice_3 from '../assets/justatyourservice_3.svg';
import justatyourservice_4 from '../assets/justatyourservice_4.svg';

const PaymentSection = styled.section`
  padding: 80px 20px;
  max-width: 1920px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 40px 16px;
  }
`;

const SectionHeading = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 32px;
  }
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const PaymentCard = styled.div`
  text-align: center;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const PaymentLogo = styled.div`
  height: 60px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 200px;
    max-height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    height: 50px;
    margin-bottom: 24px;
    
    img {
      max-width: 160px;
    }
  }
`;

const PaymentTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

const PaymentDescription = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 20px;
  }
`;

const ActionButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 30px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 13px;
  }
`;

const ServiceSection = styled.section`
  padding: 80px 40px;
  max-width: 1920px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const ServiceHeading = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 32px;
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const ServiceCard = styled.div`
  background: #f8f8f8;
  padding: 40px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const DiamondIcon = styled.div`
  margin-bottom: 20px;
  
  img {
    width: 48px;
    height: 48px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const VaultTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const ServiceDescription = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 280px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 16px;
  }
`;

const LearnMoreLink = styled.a`
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  
  &:hover {
    color: #333;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const PromotionLink = styled.a`
  display: block;
  text-align: center;
  color: #000;
  text-decoration: underline;
  margin-top: 50px;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    color: #333;
  }
  
  @media (max-width: 768px) {
    margin-top: 40px;
    font-size: 13px;
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
const Homepayment = () => {
    const paymentOptions = [
        {
          image: flexiblepayment_1,
          title: 'Zero Down Special Financing',
          description: 'This was one of the first rings I had looked at in person. After looking at hundreds'
        },
        {
          image: flexiblepayment_2,
          title: 'Zero Down Special Financing',
          description: 'This was one of the first rings I had looked at in person. After looking at hundreds'
        },
        {
          image: flexiblepayment_3,
          title: 'Zero Down Special Financing',
          description: 'This was one of the first rings I had looked at in person. After looking at hundreds'
        }
    ];
    
  const rewardsData = [
          { icon: justatyourservice_1, title: "VAULT REWARDS" },
          { icon: justatyourservice_2, title: "VAULT REWARDS" },
          { icon: justatyourservice_3, title: "VAULT REWARDS" },
          { icon: justatyourservice_4, title: "VAULT REWARDS" }
        ];
    
    return (
        <>
        <PaymentSection>
            <SectionHeading>Flexible Payment Options</SectionHeading>
            <PaymentGrid>
                {paymentOptions.map((option, index) => (
                    <PaymentCard key={index}>
                        <PaymentLogo>
                            <img src={option.image} alt={option.title} />
                        </PaymentLogo>
                        <PaymentTitle>{option.title}</PaymentTitle>
                        <PaymentDescription>{option.description}</PaymentDescription>
                        <ActionButton>SEE DETAILS</ActionButton>
                    </PaymentCard>
                ))}
            </PaymentGrid>
        </PaymentSection>

        <ServiceSection>
            <ServiceHeading>JSK At Your Service</ServiceHeading>
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
            <PromotionLink href="/terms-use">PROMOTION TERMS & CONDITIONS</PromotionLink>
        </ServiceSection> 
        </>
    )
};

export default Homepayment;