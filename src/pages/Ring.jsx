import React, { useState, useEffect } from 'react';
import styled, { keyframes } from "styled-components";
import desginyourown from "../assets/desginyourown.svg";
import engagementring_1 from "../assets/engagementring_1.svg";
import engagementring_2 from "../assets/engagementring_2.svg";
import engagementring_3 from "../assets/engagementring_3.svg";
import trendethat_1 from '../assets/trendethat_1.png';
import trendethat_2 from '../assets/trendethat_2.png';
import trendethat_3 from '../assets/trendethat_3.png';
import createaneil from "../assets/createaneil.svg";
import diamondband from "../assets/diamondband.svg";
import customizejewlry from "../assets/customizejewlry.svg";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.8s ease-out;
  width: 100%;
`;

const Title = styled.h1`
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.2;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  padding: 0 10px;

  svg {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }
`;

const SearchText = styled.span`
  color: #666;
  text-align: center;
  font-size: clamp(14px, 3vw, 16px);
  
  a {
    color: #000;
    text-decoration: underline;
    margin-left: 5px;
    display: inline-block;
    word-wrap: break-word;
  }

  @media (max-width: 768px) {
    width: 100%;
    a {
      display: block;
      margin: 5px 0 0;
    }
  }
`;

const MainContent = styled.div`
  animation: ${scaleIn} 1s ease-out;
  display: flex;
  gap: 40px;
  align-items: center;
  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 84px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  min-height: 300px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: 200px;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 40px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ContentTitle = styled.h2`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 600;
  margin-bottom: 20px;
  line-height: 1.2;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 30px;
  font-size: clamp(14px, 3vw, 16px);
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  position: relative;
  overflow: hidden;
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.3s;
  white-space: nowrap;
  font-size: clamp(14px, 2.5vw, 16px);
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${shimmer} 2s infinite;
  }

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 20px;
  }
`;

const CollectionGrid = styled.div`
  text-align: center;
  margin-top: 60px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const GridTitle = styled.h2`
  font-size: clamp(24px, 4vw, 36px);
  font-weight: bold;
  margin-bottom: 40px;
  line-height: 1.2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const GridItem = styled.div`
  transform: translateY(50px);
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.$index * 0.2}s;
  transition: transform 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;

const ItemTitle = styled.h3`
  font-size: clamp(18px, 3vw, 20px);
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.2;
`;

const ItemSubtitle = styled.p`
  color: #666;
  margin-bottom: 16px;
  font-size: clamp(14px, 2.5vw, 16px);
`;

const Section = styled.div`
  opacity: 0;
  transform: translateX(-50px);
  animation: ${slideIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.$index * 0.3}s;
  display: flex;
  align-items: center;
  background: #F7F7F7;
  margin-bottom: 30px;
  margin-top: 85px;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 40px;
    
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const Subtitle = styled.p`
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  font-size: clamp(14px, 2.5vw, 16px);
  line-height: 1.5;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  margin: 0 -20px;
  padding: 0 20px;
  width: calc(100% + 40px);

  @media (max-width: 768px) {
    margin: 0 -15px;
    padding: 0 15px;
    width: calc(100% + 30px);
  }
`;

const SliderTrack = styled.div`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.$offset}%);
  width: 100%;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Slide = styled.div`
  transition: transform 0.3s ease;
  min-width: calc(33.333% - 14px);
  flex: 1;
  text-align: center;
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    min-width: calc(100% - 30px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  width: 100%;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoryName = styled.h3`
  font-size: clamp(20px, 3.5vw, 24px);
  font-weight: 500;
  margin: 0;
  line-height: 1.2;
`;

const SliderButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  ${props => props.$position === 'left' ? 'left: 10px;' : 'right: 10px;'}
  
  &:hover {
    background: rgba(255, 255, 255, 1);
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;
const Ring = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        if (isInView) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const sections = [
    {
      image: createaneil,
      title: "Create A Neil Lane Ring Set",
      description: "Design your own Neil Lane engagement ring and matching wedding band online.",
      buttonText: "ORDER NOW"
    },
    {
      image: diamondband,
      title: "Design A Diamond Band",
      description: "Explore both natural diamond and lab-grown diamond options to create your perfect diamond band.",
      buttonText: "Create Now"
    },
    {
      image: customizejewlry,
      title: "Customize Your Jewelry",
      description: "Create a meaningful gift they'll treasure with personalized jewelry available in lab-created or natural gemstone designs.",
      buttonText: "Shop All Styles"
    }
  ];

  const handleButtonClick = (section) => {
    console.log(`Clicked ${section.buttonText}`);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const items = [
    { image: trendethat_1, title: 'Rings' },
    { image: trendethat_2, title: 'Bracelets' },
    { image: trendethat_3, title: 'Earrings' },
  ];

  const handlePrev = () => {
    setCurrentSlide(current => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    setCurrentSlide(current => Math.min(current + 1, items.length - 1));
  };

  return (
    <Container>
      <Header>
        <Title>Design Your Own Jewelry & Engagement Ring</Title>
        <SearchBox>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <SearchText>
            506 results too many? Our Jewelry Assistant can help!
            <a href="#" onClick={() => handleSearch("custom")}>Describe what you're looking for?</a>
          </SearchText>
        </SearchBox>
      </Header>

      <MainContent>
        <ImageSection>
          <img src={desginyourown} alt="Design your own jewelry" />
        </ImageSection>
        <ContentSection>
          <ContentTitle>Design Your Own</ContentTitle>
          <Description>
            Lorem ipsum is simply dummy text of the printing and typesetting industry.
          </Description>
          <ButtonGroup>
            <Button onClick={() => handleSearch("featured")}>FEATURED STYLE</Button>
            <Button onClick={() => handleSearch("new")}>NEW ARRIVAL</Button>
          </ButtonGroup>
        </ContentSection>
      </MainContent>

      <CollectionGrid>
        <GridTitle>Design Your Own Engagement Ring Online</GridTitle>
        <Grid>
          <GridItem $index={0}>
            <img src={engagementring_1} alt="Find Your Ideal Diamond" />
            <ItemTitle>Find Your Ideal Diamond</ItemTitle>
            <ItemSubtitle>Milestones Collection</ItemSubtitle>
            <Button>Create Now</Button>
          </GridItem>
          
          <GridItem $index={1}>
            <img src={engagementring_2} alt="Select A Setting" />
            <ItemTitle>Select A Setting</ItemTitle>
            <ItemSubtitle>Milestones Collection</ItemSubtitle>
            <Button>Create Now</Button>
          </GridItem>
          
          <GridItem $index={2}>
            <img src={engagementring_3} alt="Create Your Ring" />
            <ItemTitle>Create Your Ring</ItemTitle>
            <ItemSubtitle>Milestones Collection</ItemSubtitle>
            <Button>Create Now</Button>
          </GridItem>
        </Grid>
      </CollectionGrid>
      
      <Header>
        <Title>Explore Loose Diamonds by Shape</Title>
        <Subtitle>
          The shape of your diamond defines the style of your engagement ring and meaning that's unique to you.
        </Subtitle>
      </Header>
      
      <SliderContainer>
        <SliderButton $position="left" onClick={handlePrev}>←</SliderButton>
        <SliderTrack $offset={-currentSlide * (window.innerWidth <= 768 ? 100 : 33.333)}>
          {items.map((item, index) => (
            <Slide key={index} $index={index}>
              <ImageContainer $index={index}>
                <Image src={item.image} alt={item.title} />
              </ImageContainer>
              <CategoryName $index={index}>{item.title}</CategoryName>
            </Slide>
          ))}
        </SliderTrack>
        <SliderButton $position="right" onClick={handleNext}>→</SliderButton>
      </SliderContainer>

      {sections.map((section, index) => (
        <Section key={index} $index={index}>
          <ImageSection>
            <img src={section.image} alt={section.title} />
          </ImageSection>
          <ContentSection>
            <Title>{section.title}</Title>
            <Description>{section.description}</Description>
            <Button onClick={() => handleButtonClick(section)}>
              {section.buttonText}
            </Button>
          </ContentSection>
        </Section>
      ))}
    </Container>
  );
};

export default Ring;