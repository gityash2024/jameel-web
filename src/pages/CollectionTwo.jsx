import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styled from "styled-components";
import trendethat_1 from "../assets/trendethat_1.png";
import trendethat_2 from "../assets/trendethat_2.png";
import trendethat_3 from "../assets/trendethat_3.png";
import introducingmustlogo from "../assets/introducingmustlogo.png";
import loremipsum_1 from "../assets/loremipsum_1.png";
import loremipsum_2 from "../assets/loremipsum_2.png";
import loremipsum_3 from "../assets/loremipsum_3.png";
import milestonecollectionlogo from "../assets/milestonecollectionlogo.png";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

const TrendsSection = styled.section`
  padding: 80px 0;
  background: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const TrendsHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

// const Title = styled.h2`
//   font-size: 42px;
//   font-weight: 600;
//   margin-bottom: 16px;
//   color: #000;
// `;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${props => props.translate}%);
`;

const SlideItem = styled.div`
  flex: 0 0 calc(33.333%);
  padding: 0 12px;
`;

const TrendImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardTitle = styled.h3`
  font-size: 24px;
  text-align: center;
  color: #000;
  margin-top: 16px;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.position === 'left' ? 'left: -20px;' : 'right: -20px;'}
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f8f8;
    transform: translateY(-50%) scale(1.05);
  }
`;

// const MainTitle = styled.h1`
//   font-size: 42px;
//   text-align: center;
//   margin-bottom: 40px;
//   color: #000;
//   padding-top: 60px;
// `;

const MustHaveContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
  padding: 0 40px;
  min-height: 600px;
  position: relative;
  z-index: 2;
`;
const CollectionTitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #000;
`;

const Button = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 14px 28px;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const MainTitle = styled.h1`
  font-size: 42px;
  text-align: center;
  padding: 40px 0;
  margin: 0;
  color: #000;
`;

const BannerSection = styled.section`
  width: 100%;
  height: 600px;
  position: relative;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding-left: 120px;
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  position: relative;
  z-index: 2;
`;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 600;
  color: #000;
  margin-bottom: 24px;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 40px;
  max-width: 440px;
`;

const NewArrivalButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 14px 28px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333;
  }
`;

const TrendCard = styled.div`
  flex: 0 0 calc(33.333% - 16px);
  min-width: 300px;
`;

const PageContainer = styled.div`
  width: 100%;
  background: #fff;
`;

const MainHeader = styled.h1`
  font-size: 42px;
  text-align: center;
  padding: 60px 0 40px;
  margin: 0;
  color: #000;
`;

// const MustHaveSection = styled.section`
//   width: 100%;
//   min-height: 600px;
//   position: relative;
//   background: #FFD9D9;
//   overflow: hidden;
//   display: flex;
//   align-items: center;
// `;
const MustHaveSection = styled.section`
  width: 100%;
  min-height: 600px;
  position: relative;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

// const ContentWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   position: relative;
//   z-index: 2;
// `;

// Add this to create a semi-transparent overlay if needed
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 217, 217, 0.95); // Using the pink color with transparency
  z-index: 1;
`;


// const ContentWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: grid;
//   grid-template-columns: 1fr 1fr;
// `;

const TextContent = styled.div`
  padding-left: 120px;
  padding-top: 80px;
  padding-bottom: 80px;
  max-width: 500px;
`;

// const Description = styled.p`
//   font-size: 18px;
//   line-height: 1.6;
//   color: #333;
//   margin-bottom: 40px;
//   max-width: 440px;
// `;

// const NewArrivalButton = styled.button`
//   background: #000;
//   color: #fff;
//   border: none;
//   padding: 16px 32px;
//   font-size: 14px;
//   font-weight: 500;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     background: #333;
//     transform: translateY(-2px);
//   }
// `;

const ImageSection = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
const ShopLink = styled.a`
  font-size: 20px;
  color: #000;
  text-decoration: none;
  display: inline-block;
  position: relative;
  font-weight: 500;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #000;
    transform-origin: center;
    transform: scaleX(1);
  }

  &:hover:after {
    transform: scaleX(1.2);
  }
`;

const CollectionBanner = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 0 80px;
  background-color: #f5f5f5;
`;

const BannerContent = styled.div`
  max-width: 500px;
  color: #000;
  z-index: 1;
`;
const ServiceText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;


const ShopGrid = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 0 40px;
`;

const ShopCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ShopImage = styled.img`
  width: 180px;  // Fixed medium size
  height: 180px; // Fixed medium size
  margin-bottom: 30px;
  object-fit: contain;
`;

const ShopTitle = styled.h4`
  font-size: 18px;
  color: #000;
  margin-top: 10px;
  position: relative;
  display: inline-block;
  padding-bottom: 5px;
  font-weight: 500;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #000;
  }
`;


const ServiceSection = styled.section`
  padding: 80px 0;
  background: #fff;
`;

const ServiceTitle = styled.h2`
  font-size: 42px;
  text-align: center;
  margin-bottom: 60px;
  color: #000;
`;

const ServiceGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0 40px;
`;

const ServiceCard = styled.div`
  background: #f9f9f9;
  padding: 40px 24px;
  text-align: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }
`;

const ServiceIcon = styled.div`
  margin-bottom: 24px;

  img {
    width: 80px;
    height: 80px;
  }
`;

const VaultTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #000;
  text-transform: uppercase;
`;

const VaultSubtitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #333;
`;

const ServiceDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  border: none;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  padding: 8px 0;
  text-transform: uppercase;
  
  &:hover {
    color: #333;
  }
`;

const CollectionTwo = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
    const trendsData = [
      { image: trendethat_1, title: "Rings" },
      { image: trendethat_2, title: "Bracelets" },
      { image: trendethat_3, title: "Earrings" },
      { image: trendethat_1, title: "Necklaces" },
      { image: trendethat_2, title: "Pendants" },
      { image: trendethat_3, title: "Watches" },
    ];

    const shopData = [
        { image: loremipsum_1, title: "Shop Now" },
        { image: loremipsum_2, title: "Shop Now" },
        { image: loremipsum_3, title: "Shop Now" },
        { image: loremipsum_1, title: "Shop Now" },
      ];

      const serviceData = [
        { 
          icon: justatyourservice_1, 
          title: "VAULT REWARDS", 
          description: "Join Vault Rewards",
          text: "This was one of the first rings I had looked at in person. After looking at hundreds"
        },
        { 
          icon: justatyourservice_2, 
          title: "VAULT REWARDS", 
          description: "Join Vault Rewards",
          text: "This was one of the first rings I had looked at in person. After looking at hundreds"
        },
        { 
          icon: justatyourservice_3, 
          title: "VAULT REWARDS", 
          description: "Join Vault Rewards",
          text: "This was one of the first rings I had looked at in person. After looking at hundreds"
        },
        { 
          icon: justatyourservice_4, 
          title: "VAULT REWARDS", 
          description: "Join Vault Rewards",
          text: "This was one of the first rings I had looked at in person. After looking at hundreds"
        },
      ];
      
  
    const nextSlide = () => {
      setCurrentSlide((prev) => 
        prev === Math.floor(trendsData.length / 3) ? 0 : prev + 1
      );
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => 
        prev === 0 ? Math.floor(trendsData.length / 3) : prev - 1
      );
    };
  
    // Auto-play functionality
    useEffect(() => {
      let interval;
      if (isAutoPlaying) {
        interval = setInterval(() => {
          nextSlide();
        }, 4000);
      }
      return () => clearInterval(interval);
    }, [currentSlide, isAutoPlaying]);
  
    const handleSliderHover = (isHovering) => {
      setIsAutoPlaying(!isHovering);
    };
  
      return (
        <>
           <TrendsSection>
        <Container>
          <TrendsHeader>
            <Title>Trends That are Always in Style</Title>
            <Subtitle>Discover modern classics that complete any ensemble</Subtitle>
          </TrendsHeader>

          <SliderContainer 
            onMouseEnter={() => handleSliderHover(true)}
            onMouseLeave={() => handleSliderHover(false)}
          >
            <SliderButton position="left" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </SliderButton>

            <SliderTrack translate={currentSlide * 100}>
              {trendsData.map((item, index) => (
                <SlideItem key={index}>
                  <TrendImage src={item.image} alt={item.title} />
                  <CardTitle>{item.title}</CardTitle>
                </SlideItem>
              ))}
            </SliderTrack>

            <SliderButton position="right" onClick={nextSlide}>
              <ChevronRight size={24} />
            </SliderButton>
          </SliderContainer>
        </Container>
      </TrendsSection>
    
      <MainTitle>Introducing Must-Have Collections</MainTitle>
    <BannerSection bgImage={introducingmustlogo}>
      <ContentWrapper>
        <Title>The Milestones Collection</Title>
        <Description>
          Graduating natural diamonds symbolize the moments and milestones that 
          strengthen your love through every step in your story.
        </Description>
        <NewArrivalButton>NEW ARRIVAL</NewArrivalButton>
      </ContentWrapper>
    </BannerSection>



          <ShopGrid>
  {shopData.map((item, index) => (
    <ShopCard key={index}>
      <ShopImage src={item.image} alt={item.title} />
      <ShopTitle>{item.title}</ShopTitle>
    </ShopCard>
  ))}
</ShopGrid>


  <CollectionBanner bgImage={milestonecollectionlogo}>
    <BannerContent>
      <CollectionTitle>The Milestones Collection</CollectionTitle>
      <Description>
        Graduating natural diamonds symbolize the moments and milestones that 
        strengthen your love through every step in your story.
      </Description>
      <Button>NEW ARRIVAL</Button>
    </BannerContent>
  </CollectionBanner>
  <ServiceSection>
  <ServiceTitle>JSK At Your Service</ServiceTitle>
  <ServiceGrid>
    {serviceData.map((service, index) => (
      <ServiceCard key={index}>
        <ServiceIcon>
          <img src={service.icon} alt={service.title} />
        </ServiceIcon>
        <VaultTitle>{service.title}</VaultTitle>
        <VaultSubtitle>{service.description}</VaultSubtitle>
        <ServiceDescription>{service.text}</ServiceDescription>
        <LearnMoreButton>Learn More</LearnMoreButton>
      </ServiceCard>
    ))}
  </ServiceGrid>
</ServiceSection>

        </>
      );
    };
    
export default CollectionTwo;