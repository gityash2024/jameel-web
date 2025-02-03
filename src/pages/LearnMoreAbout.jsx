import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import goldexchange from '../assets/goldexchange.svg';
import goldexpressprocess_1 from '../assets/goldexpressprocess_1.svg';
import goldexpressprocess_2 from '../assets/goldexpressprocess_2.svg';
import goldexpressprocess_3 from '../assets/goldexpressprocess_3.svg';
import goldexpressprocess_4 from '../assets/goldexpressprocess_4.svg';
import whyjsk from '../assets/whyjsk.svg';
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

// Container Styles
const MainWrapper = styled.div`
  width: 100%;
    max-width: 1440px;
  margin: 0 auto;
`;

const Container = styled.div`
//   max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
`;


// Breadcrumb
const Breadcrumb = styled.div`
  padding: 12px 0;
  color: #666;
  font-size: 14px;
`;

// Header Section
const HeaderSection = styled.div`
  text-align: center;
  padding: 20px 0 40px;
`;

const MainTitle = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
`;

const SearchText = styled.span`
  color: #333;
  font-size: 15px;
`;

const SearchLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

// Gold Exchange Section
const ExchangeSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: #f8f9fa;
  padding: 40px 0;
`;

// const ImageContainer = styled.div`
//   width: 100%;
//   height: auto;
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding-right: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
`;

const Button = styled.button`
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  font-size: 14px;
  width: fit-content;
  cursor: pointer;
  
  &:hover {
    background: #333;
  }
`;

// Process Section
const ProcessSection = styled.div`
  padding: 80px 0;
`;

const ProcessTitle = styled.h2`
  font-size: 36px;
  text-align: center;
  margin-bottom: 60px;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;

const ProcessStep = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const StepIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const StepText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

// Lorem Section
const LoremSection = styled.div`
  padding: 60px 0;
  background: #fff;
`;
const WhyJSKSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  padding: 60px 0;
  background: #f8f9fa;
  align-items: center;
`;

const ContentContainers = styled.div`
  padding-right: 40px;
`;

const SectionTitles = styled.h2`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureItem = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

const FAQButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  font-size: 14px;
  margin-top: 30px;
  cursor: pointer;
  
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
  }
`;

// Vault Rewards Section
const RewardsSection = styled.div`
  padding: 80px 0;
  text-align: center;
`;

const RewardsTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
`;

const RewardCard = styled.div`
  background: #f8f9fa;
  padding: 30px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const DiamondIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 8px 0;
`;

const CardSubTitle = styled.h4`
  font-size: 16px;
  margin: 8px 0;
`;

const CardText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const LearnMoreLink = styled.a`
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

const PromotionLink = styled.a`
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  text-align: center;
  display: block;
`;

const LearnMoreAbout = () => {
  const processSteps = [
    {
      id: 1,
      title: "Step 1",
      icon: goldexpressprocess_1,
      description: "Sign up and complete a one-time, secure registration to request your Gold Exchange Packet."
    },
    {
      id: 2,
      title: "Step 2",
      icon: goldexpressprocess_2,
      description: "Secure your jewelry in your provided insured package. Ship your items to us via UPS FREE!"
    },
    {
      id: 3,
      title: "Step 3",
      icon: goldexpressprocess_3,
      description: "We inspect, clean, sort, weigh, and determine what it's worth in today's market."
    },
    {
      id: 4,
      title: "Step 4",
      icon: goldexpressprocess_4,
      description: "After we determine the value, we email the amount. You can take payment as a check or JSK Gift Card."
    }
  ];
  const navigate = useNavigate();
  
  const features = [
    "1. The most competitive offer for your items. We pay the most competitive prices for your gold or platinum - whether you send us just one item or several items!",
    "2. Peace of mind. We record your items being unpacked and processed and we post the video to your online account for viewing on KayJewelersGoldExchange.com",
    "3. Satisfaction guaranteed. Receive fast payment at the best rate available! If you are not happy with our offer, your items will be returned to you FREE!"
  ];

  const rewardsData = [
    { id: 1, image: justatyourservice_1 },
    { id: 2, image: justatyourservice_2 },
    { id: 3, image: justatyourservice_3 },
    { id: 4, image: justatyourservice_4 }
  ];

  return (
    <MainWrapper>
      <Container>
        <Breadcrumb>Home/ Learn more about the JSK Gold Exchange</Breadcrumb>
        
        <HeaderSection>
          <MainTitle>Learn more about the JSK Gold Exchange</MainTitle>
          <SearchBar>
            <img src={justatyourservice_1} alt="diamond" style={{ width: 20, height: 20 }} />
            <SearchText>
              <strong>506 results too many?</strong> Our Jewelry Assistant can help!{" "}
              <SearchLink>Describe what you're looking for?</SearchLink>
            </SearchText>
          </SearchBar>
        </HeaderSection>
      </Container>

      <div style={{ background: '#f8f9fa' }}>
        <Container>
          <ExchangeSection>
            <ImageContainer>
              <img src={goldexchange} alt="Gold Exchange" />
            </ImageContainer>
            <ContentContainer>
              <SectionTitle>Gold Exchange</SectionTitle>
              <Description>
                Want extra cash? Simply send us your old gold and platinum jewelry.
              </Description>
              <Button>START PROCESS</Button>
            </ContentContainer>
          </ExchangeSection>
        </Container>
      </div>

      <Container>
        <ProcessSection>
          <ProcessTitle>Gold Exchange Process</ProcessTitle>
          <ProcessGrid>
            {processSteps.map((step) => (
              <ProcessStep key={step.id}>
                <StepIcon src={step.icon} alt={step.title} />
                <StepTitle>{step.title}</StepTitle>
                <StepText>{step.description}</StepText>
              </ProcessStep>
            ))}
          </ProcessGrid>
        </ProcessSection>

        <LoremSection>
          <div>
            <SectionTitle>What is Lorem Ipsum?</SectionTitle>
            <Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type 
              specimen book.
            </Description>
            <SectionTitle>What is Lorem Ipsum?</SectionTitle>
            <Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type 
              specimen book.
            </Description>
            <SectionTitle>What is Lorem Ipsum?</SectionTitle>
            <Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type 
              specimen book.
            </Description>
          </div>
        </LoremSection>
        <WhyJSKSection>
            <ContentContainers>
              <SectionTitles>Why JSK?</SectionTitles>
              <FeatureList>
                {features.map((feature, index) => (
                  <FeatureItem key={index}>{feature}</FeatureItem>
                ))}
              </FeatureList>
              <FAQButton onClick={() => navigate('/faq')}>FAQs</FAQButton>
            </ContentContainers>
            <ImageContainer>
              <img src={whyjsk} alt="Why JSK" />
            </ImageContainer>
          </WhyJSKSection>

          <RewardsSection>
          <RewardsTitle>JSK At Your Service</RewardsTitle>
          <RewardsGrid>
            {rewardsData.map((reward) => (
              <RewardCard key={reward.id}>
                <DiamondIcon src={reward.image} alt="Vault Rewards" />
                <CardTitle>VAULT REWARDS</CardTitle>
                <CardSubTitle>Join Vault Rewards</CardSubTitle>
                <CardText>
                  This was one of the first rings I had looked at in person. After looking at hundreds
                </CardText>
                <LearnMoreLink>LEARN MORE</LearnMoreLink>
              </RewardCard>
            ))}
          </RewardsGrid>
          <PromotionLink href="#">PROMOTION TERMS & CONDITIONS</PromotionLink>
        </RewardsSection>
      </Container>
    </MainWrapper>
  );
};

export default LearnMoreAbout;