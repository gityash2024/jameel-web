import React, { useState } from 'react';
import styled from "styled-components";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PolicyHeader = styled.div`
  margin-bottom: 40px;
  h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }
  p {
    color: #666;
  }
`;

const PolicyContent = styled.div`
  margin-bottom: 60px;
  p {
    color: #333;
    line-height: 1.8;
    margin-bottom: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const InfoList = styled.ul`
  list-style: disc;
  padding-left: 24px;
  li {
    margin-bottom: 16px;
    color: #333;
    line-height: 1.6;
    
    strong {
      display: block;
      margin-bottom: 8px;
    }
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
const Privacy = () => {
  const rewardsData = [
     { icon: justatyourservice_1, title: "VAULT REWARDS" },
     { icon: justatyourservice_2, title: "VAULT REWARDS" },
     { icon: justatyourservice_3, title: "VAULT REWARDS" },
     { icon: justatyourservice_4, title: "VAULT REWARDS" }
   ];

  return (
    <Container>
      <PolicyHeader>
        <h1>JSK Jewelers Privacy Policy</h1>
        <p>Effective: October 9, 2024</p>
      </PolicyHeader>

      <PolicyContent>
        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        
        <Section>
          <h2>1. Notice At Collection</h2>
          <InfoList>
            <li>
              <strong>Identifiers (including account information):</strong>
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </li>
            <li>
              <strong>Any Personal Information Described in Subdivision (e) of Cal. Civ. Code Section 1798.80, including:</strong>
              Lorem ipsum is simply dummy text of the printing.
            </li>
            <li>
              <strong>Demographic Information:</strong>
              Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </li>
          </InfoList>
        </Section>
      </PolicyContent>

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

export default Privacy;