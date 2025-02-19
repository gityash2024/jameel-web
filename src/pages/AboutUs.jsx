import React, { useState } from 'react';
import styled from "styled-components";
import about_image from "../assets/about_image.png";
import ringicon from "../assets/ringicon.svg";
import Stariconsvg from "../assets/Stariconsvg.svg";
import Frame from "../assets/Frame.svg"
import ourMissionvision from "../assets/ourMission&vision.png";
import hearwhatclient from "../assets/hearwhatclient.png";
import AboutUsTwo from '../pages/AboutUsTwo';

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  margin-bottom: 2rem;
  overflow: hidden;
  
  @media (min-width: 768px) {
    height: 400px;
    margin-bottom: 4rem;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatsSection = styled.div`
  background: #FF8C8C;
  border-radius: 20px;
  padding: 1.5rem;
  margin: 2rem 0;
  color: white;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 3rem;
    margin: 4rem 0;
  }
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StatNumber = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatText = styled.p`
  font-size: 1rem;
  margin: 0;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: #666;
  line-height: 1.6;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    margin: 0 auto 4rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 2rem 0;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin: 4rem 0;
  }
`;

const Card = styled.div`
  background: white;
  border: 1px solid #FF0000;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  ${props => props.active && `
    background: #FF8C8C;
    .number {
      color: white;
    }
  `}
`;

const CardNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  padding: 1.5rem;
  color: ${props => props.active ? 'white' : '#FF0000'};
  
  @media (min-width: 768px) {
    font-size: 3rem;
    padding: 2rem;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  background: white;
  border-radius: 20px 20px 0 0;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const CardText = styled.p`
  color: #666;
  margin-bottom: 1.2rem;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const ReadMore = styled.a`
  color: #FF0000;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const StatsIcon = styled.img`
  width: 35px;
  height: 35px;
  margin-bottom: 0.8rem;
  
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
  }
`;

const MissionSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin: 4rem 0;
  }
`;

const MissionImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;

  @media (min-width: 768px) {
    height: 600px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MissionContent = styled.div`
  background: #faf9f6;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Text = styled.p`
  color: #333;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Tagline = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TestimonialsSection = styled.div`
  margin: 3rem 0;
  
  @media (min-width: 768px) {
    margin: 6rem 0;
  }
`;

const TestimonialsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
  }
`;

const TestimonialTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SwipeButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 1px solid #000;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #000;
    color: white;
  }
`;

const TestimonialCard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;
  
  @media (min-width: 1024px) {
    grid-template-columns: 400px 1fr;
    gap: 4rem;
  }
`;

const ClientImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;

  @media (min-width: 768px) {
    height: 500px;
  }

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #ff0000;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TestimonialContent = styled.div`
  position: relative;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e5e5e5;
  transform: perspective(1000px) rotateY(-5deg);

  @media (min-width: 768px) {
    padding: 3rem;
  }

  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 3rem;
    color: #ff0000;
    font-family: serif;
    
    @media (min-width: 768px) {
      top: 2rem;
      right: 2rem;
      font-size: 4rem;
    }
  }
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const ClientInfo = styled.div`
  margin-top: 1.5rem;
  
  @media (min-width: 768px) {
    margin-top: 2rem;
  }
`;

const ClientName = styled.h4`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const ClientRole = styled.p`
  color: #666;
`;

const AboutUs = () => {
  const stats = [
    {
      number: "6,500,00",
      text: "Total Product sold",
      icon: ringicon
    },
    {
      number: "+1,000",
      text: "Average start review. 4.5 stars",
      icon: Stariconsvg
    },
    {
      number: "+20,000",
      text: "Number of happy clients",
      icon: Frame
    }
  ];

  const cards = [
    {
      number: "01",
      title: "Diamonds Quality",
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. Consectetur Vitae Vivamus Morbi Sed.",
      active: true
    },
    {
      number: "02",
      title: "Diamonds Quality",
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. Consectetur Vitae Vivamus Morbi Sed.",
      active: false
    },
    {
      number: "03",
      title: "Diamonds Quality",
      text: "Lorem Ipsum Dolor Sit Amet Consectetur. Consectetur Vitae Vivamus Morbi Sed.",
      active: false
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      image: hearwhatclient,
      name: "Joanna Prohaska",
      role: "Lead Solutions Designer",
      text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
    }
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Container>
      <HeroSection>
        <HeroImage src={about_image} alt="Jewelry" />
      </HeroSection>

      <Title>Our Success Numbers</Title>

      <StatsSection>
        {stats.map((stat, index) => (
          <StatBox key={index}>
            <StatsIcon src={stat.icon} alt={stat.text} />
            <StatNumber>{stat.number}</StatNumber>
            <StatText>{stat.text}</StatText>
          </StatBox>
        ))}
      </StatsSection>

      <Title>Know More About Us</Title>
      <Subtitle>
        Lorem Ipsum Dolor Sit Amet Consectetur. Consectetur Vitae Vivamus Morbi Sed. Tincidunt Nisi Risus Tincidunt A Tellus. Neque In Vitae Habitasse Feugiat,
        Lorem Ipsum Dolor Sit Amet Consectetur. Consectetur Vitae Vivamus Morbi Sed.
      </Subtitle>

      <CardsGrid>
        {cards.map((card, index) => (
          <Card key={index} active={card.active}>
            <CardNumber className="number" active={card.active}>{card.number}</CardNumber>
            <CardContent>
              <CardTitle>{card.title}</CardTitle>
              <CardText>{card.text}</CardText>
              <ReadMore href="#">
                Read More
                <span>→</span>
              </ReadMore>
            </CardContent>
          </Card>
        ))}
      </CardsGrid>

      <MissionSection>
        <MissionImage>
          <img src={ourMissionvision} alt="Our Mission" />
        </MissionImage>
        <MissionContent>
          <Title>Our Mission & Vision</Title>
          <Text>
            Lorem ipsum dolor sit amet consectetur. Sem mattis sit urna tristique urna mauris nulla ullamcorper. Ultricies senectus risus eleifend eget ornare. Integer sapien risus elit hendrerit pellentesque. Arcu a scelerisque cras viverra tortor id aliquet vitae vestibulum.
          </Text>
          <Text>
            Consectetur tellus id libero elit nec. Scelerisque hend rerit id condimentum aliquam eget tellus. Tincidunt neque quam dignissim risus in ridiculus sapien nisi quis. Interdum adipiscing urna viverra integer. Sem dignissim vivamus sollicitudin ornare nascetur sodales amet id imperdiet. Ut mattis semper ut fermentum est. Cursus ut hac urna eu ut morbi curabitur tincidunt in.
          </Text>
          <Tagline>DESIGNED TO BE WORTHY OF THE WOMAN WHO WEARS IT</Tagline>
        </MissionContent>
      </MissionSection>

      <TestimonialsSection>
        <TestimonialsHeader>
          <TestimonialTitle>Hear What Client Say</TestimonialTitle>
          <SwipeButton onClick={handleNextTestimonial}>
            Swipe
            <span>→</span>
          </SwipeButton>
        </TestimonialsHeader>

        <TestimonialCard>
          <ClientImage>
            <img 
              src={testimonials[currentTestimonial].image} 
              alt={testimonials[currentTestimonial].name} 
            />
          </ClientImage>
          <TestimonialContent>
            <TestimonialText>
              {testimonials[currentTestimonial].text}
            </TestimonialText>
            <ClientInfo>
              <ClientName>{testimonials[currentTestimonial].name}</ClientName>
              <ClientRole>{testimonials[currentTestimonial].role}</ClientRole>
            </ClientInfo>
          </TestimonialContent>
        </TestimonialCard>
      </TestimonialsSection>
      <AboutUsTwo />
    </Container>
  );
};

export default AboutUs;