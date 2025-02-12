import React, { useState } from 'react';
import styled from "styled-components";
import about_image from "../assets/about_image.png";
import ringicon from "../assets/ringicon.svg";
import Stariconsvg from "../assets/Stariconsvg.svg"; 
import Frame from "../assets/Frame.svg"
import ourMissionvision from  "../assets/ourMission&vision.png";
import hearwhatclient from "../assets/hearwhatclient.png";
import hearwhatclientbackground from "../assets/hearwhatclientbackground.png";
import flowus_1 from "../assets/flowus_1.png";
import flowus_2 from "../assets/flowus_2.png";
import flowus_3 from "../assets/flowus_3.png";
import flowus_4 from "../assets/flowus_4.png";
import flowus_5 from "../assets/flowus_5.png";
import discoverworldbestbackground from "../assets/discoverworldbestbackground.png";
import discoverworldbest from "../assets/discoverworldbest.png";
import AboutUsTwo from '../pages/AboutUsTwo';


const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 4rem;
  overflow: hidden;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StatsSection = styled.div`
  background: #FF8C8C;
  border-radius: 20px;
  padding: 3rem;
  margin: 4rem 0;
  color: white;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
`;

const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StatNumber = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
`;

const StatText = styled.p`
  font-size: 1.1rem;
  margin: 0;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Subtitle = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  color: #666;
  line-height: 1.6;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 4rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
  font-size: 3rem;
  font-weight: bold;
  padding: 2rem;
  color: ${props => props.active ? 'white' : '#FF0000'};
`;

const CardContent = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 20px 20px 0 0;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
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
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
`;
const MissionSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin: 4rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MissionImage = styled.div`
  position: relative;
  width: 100%;
  height: 600px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MissionContent = styled.div`
  background: #faf9f6;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// const Title = styled.h2`
//   font-size: 2.5rem;
//   margin-bottom: 2rem;
//   font-weight: bold;
// `;

const Text = styled.p`
  color: #333;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const Tagline = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TestimonialsSection = styled.div`
  margin: 6rem 0;
`;

const TestimonialsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TestimonialTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
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
  grid-template-columns: 400px 1fr;
  gap: 4rem;
  position: relative;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ClientImage = styled.div`
  position: relative;
  width: 100%;
  height: 500px;

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
  padding: 3rem;
  background: #fff;
  border: 1px solid #e5e5e5;
  transform: perspective(1000px) rotateY(-5deg);

  &::before {
    content: '"';
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 4rem;
    color: #ff0000;
    font-family: serif;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ClientInfo = styled.div`
  margin-top: 2rem;
`;

const ClientName = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
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
    // Add more testimonials as needed
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