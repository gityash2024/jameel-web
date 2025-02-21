import React, { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BeneathLogo from "../assets/BeneathLogo.svg";
import freshfinds_1 from "../assets/freshfinds_1.png";
import freshfinds_2 from "../assets/freshfinds_2.png";
import freshfinds_3 from "../assets/freshfinds_3.png";
import trendingnow_1 from "../assets/trendingnow_1.png";
import trendingnow_2 from "../assets/trendingnow_2.png";
import trendingnow_3 from "../assets/trendingnow_3.png";
import trendingnow_4 from "../assets/trendingnow_4.png";
import CollectionTwo from "./CollectionTwo";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  overflow: hidden;
  background: #fff;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 40px 0;
  }
`;

const ContentSection = styled.div`
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;

  @media (max-width: 768px) {
    padding: 0 20px;
    max-width: 100%;
    text-align: center;
    align-items: center;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  img {
    width: 97%;
    height: 80%;
    margin-top: 30px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: auto;
    
    img {
      width: 100%;
      height: auto;
      margin-top: 20px;
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: 42px;
  font-weight: 600;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 40px;
  max-width: 480px;

  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
`;

const Button = styled.button`
  padding: 14px 28px;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) => (props.variant === "featured" ? "#000" : "#000")};
  color: ${(props) => (props.variant === "featured" ? "#fff" : "#fff")};

  &:hover {
    background: ${(props) => (props.variant === "featured" ? "#333" : "#333")};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 24px;
  }
`;

const FreshFindsSection = styled.section`
  width: 100%;
  padding: 100px 0;
  background: #fff;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const FreshFindsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const SlideWrapper = styled.div`
  display: flex;
  transform: translateX(-${(props) => props.translate}%);
  transition: transform 0.5s ease-in-out;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const Slide = styled.div`
  flex: 0 0 calc(33.333% - 20px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(100% - 30px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const SlideTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  color: #000;
  margin-top: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "prev" ? "left: 0;" : "right: 0;")}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

  svg {
    width: 28px;
    height: 28px;
    color: #333;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const TrendingSection = styled.section`
  width: 100%;
  padding: 100px 0;
  background: #fff;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const TrendingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const NewArrivalButton = styled.button`
  background: #000;
  color: #fff;
  padding: 12px 24px;
  border: none;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #333;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 20px;
  }
`;

const Collection = () => {
  const [activeFeature, setActiveFeature] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    console.log(`${feature} clicked`);
  };

  const freshFindsData = [
    { id: 1, image: freshfinds_1, title: "Rings" },
    { id: 2, image: freshfinds_2, title: "Bracelets" },
    { id: 3, image: freshfinds_3, title: "Bracelets" },
    { id: 4, image: freshfinds_1, title: "Necklaces" },
    { id: 5, image: freshfinds_2, title: "Earrings" },
    { id: 6, image: freshfinds_3, title: "Pendants" },
  ];

  const trendingItems = [
    {
      id: 1,
      image: trendingnow_1,
      title: "Engagement Ring",
    },
    {
      id: 2,
      image: trendingnow_2,
      title: "Bold Gold",
    },
    {
      id: 3,
      image: trendingnow_3,
      title: "Engagement Ring",
    },
    {
      id: 4,
      image: trendingnow_4,
      title: "Bold Gold",
    },
  ];

  const totalSlides = freshFindsData.length;
  const slidesToShow = window.innerWidth <= 768 ? 1 : 3;
  const maxIndex = Math.ceil(totalSlides / slidesToShow) - 1;

  const handlePrev = () => {
    setCurrentIndex((current) => (current === 0 ? maxIndex : current - 1));
  };

  const handleNext = () => {
    setCurrentIndex((current) => (current === maxIndex ? 0 : current + 1));
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <MainContainer>
      <HeroSection>
        <ContentSection>
          <HeroTitle>Beneath the Glitter an evening full of shine</HeroTitle>
          <Description>
            Lorem ipsum dolor sit amet consectetur OLorem ipsum dolor sit amet
            consectetur Lorem ipsum dolor sit amet consectetur.
          </Description>
          <ButtonContainer>
            <Button
              variant="featured"
              onClick={() => handleFeatureClick("featured")}
              isActive={activeFeature === "featured"}
            >
              Featured Style
            </Button>
            <Button
              variant="new"
              onClick={() => handleFeatureClick("new")}
              isActive={activeFeature === "new"}
            >
              New Arrival
            </Button>
          </ButtonContainer>
        </ContentSection>
        <ImageSection>
          <img src={BeneathLogo} alt="Jewelry Collection" />
        </ImageSection>
      </HeroSection>

      <FreshFindsSection>
        <FreshFindsContainer>
          <SectionTitle>Fresh Finds</SectionTitle>
          <Subtitle>Shop New Arrivals by Category</Subtitle>

          <SliderContainer>
            <NavButton direction="prev" onClick={handlePrev}>
              <ChevronLeft />
            </NavButton>

            <SlideWrapper translate={currentIndex * 100}>
              {freshFindsData.map((item) => (
                <Slide key={item.id}>
                  <ImageContainer>
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </ImageContainer>
                  <SlideTitle>{item.title}</SlideTitle>
                </Slide>
              ))}
            </SlideWrapper>

            <NavButton direction="next" onClick={handleNext}>
              <ChevronRight />
            </NavButton>
          </SliderContainer>
        </FreshFindsContainer>
      </FreshFindsSection>

      <TrendingSection>
        <TrendingContainer>
          <SectionTitle>Trending Now</SectionTitle>
          <Subtitle>
            This seasons jewelry trends that takes your style to a new level
          </Subtitle>

          <GridContainer>
            {trendingItems.map((item) => (
              <Card key={item.id}>
                <ImageContainer>
                  <img src={item.image} alt={item.title} loading="lazy" />
                </ImageContainer>
                <CardTitle>{item.title}</CardTitle>
                <NewArrivalButton>NEW ARRIVAL</NewArrivalButton>
              </Card>
            ))}
          </GridContainer>
        </TrendingContainer>
      </TrendingSection>

      <CollectionTwo />
    </MainContainer>
  );
};

export default Collection;