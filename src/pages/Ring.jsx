import React, { useState } from 'react';
import styled from "styled-components";
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


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SearchText = styled.span`
  color: #666;
  
  a {
    color: #000;
    text-decoration: underline;
    margin-left: 5px;
  }
`;

const MainContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  background: #f8f8f8;
  border-radius: 12px;
  overflow: hidden;
  margin-top : 84px

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
  padding: 40px;
`;

const ContentTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;
const HeroSection = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 60px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const CollectionGrid = styled.div`
  text-align: center;
  margin-top: 60px;
`;

const GridTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridItem = styled.div`
  text-align: center;
  
  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 16px;
  }
`;

const ItemTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const ItemSubtitle = styled.p`
  color: #666;
  margin-bottom: 16px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  background: #F7F7F7;
  margin-bottom: 30px;
  margin-top: 85px;
  border-radius: 12px;
  overflow: hidden;

   
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

// const Container = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 60px 20px;
// `;

// const Header = styled.div`
//   text-align: center;
//   margin-bottom: 40px;
// `;

// const Title = styled.h2`
//   font-size: 36px;
//   font-weight: 600;
//   margin-bottom: 16px;
// `;

const Subtitle = styled.p`
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const SliderTrack = styled.div`
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.$offset}px);
`;

const Slide = styled.div`
  min-width: calc(33.333% - 14px);
  flex: 1;
  text-align: center;
  
  @media (max-width: 768px) {
    min-width: calc(100% - 20px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
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
  font-size: 24px;
  font-weight: 500;
  margin: 0;
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
`;
const Ring = () => {
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
          <GridItem>
            <img src={engagementring_1} alt="Find Your Ideal Diamond" />
            <ItemTitle>Find Your Ideal Diamond</ItemTitle>
            <ItemSubtitle>Milestones Collection</ItemSubtitle>
            <Button>Create Now</Button>
          </GridItem>
          
          <GridItem>
            <img src={engagementring_2} alt="Select A Setting" />
            <ItemTitle>Select A Setting</ItemTitle>
            <ItemSubtitle>Milestones Collection</ItemSubtitle>
            <Button>Create Now</Button>
          </GridItem>
          
          <GridItem>
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
        <SliderTrack $offset={-currentSlide * (100 / 3)}>
          {items.map((item, index) => (
            <Slide key={index}>
              <ImageContainer>
                <Image src={item.image} alt={item.title} />
              </ImageContainer>
              <CategoryName>{item.title}</CategoryName>
            </Slide>
          ))}
        </SliderTrack>
        <SliderButton $position="right" onClick={handleNext}>→</SliderButton>
      </SliderContainer>

      {sections.map((section, index) => (
        <Section key={index}>
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