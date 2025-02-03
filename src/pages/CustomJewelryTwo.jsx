import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import engagementring_1 from "../assets/engagementring_1.svg";
import howworks_1 from '../assets/howworks_1.svg';
import howworks_2 from '../assets/howworks_2.svg';
import howworks_3 from '../assets/howworks_3.svg';
import howworks_4 from '../assets/howworks_4.svg';
import jskcustomlookbook from '../assets/jskcustomlookbook.svg';
import expertengraving from '../assets/expertengraving.svg';
import customizejewlry from '../assets/customizejewlry.svg';
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: 2rem;
`;

const BreadcrumbList = styled.ol`
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const SearchAssistant = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #666;
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const Description = styled.p`
  font-size: 1.125rem;
  color: #666;
  line-height: 1.6;
`;
const StyledButton = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  background-color: #000;
  color: white;
  text-align: center;
  font-weight: 500;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const HowItWorksSection = styled.div`
  padding: 4rem 0;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProcessStep = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProcessImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
`;

const StepDescription = styled.p`
  color: #666;
  line-height: 1.5;
`;

const DiamondIcon = styled.span`
  display: inline-block;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const GetStartedSection = styled.section`
  padding: 4rem 0;
  text-align: center;
`;

// const SectionTitle = styled.h2`
//   font-size: 2.5rem;
//   font-weight: 600;
//   margin-bottom: 2rem;
//   text-align: center;
// `;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled(Link)`
  background-color: #E31837;
  color: white;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #C61530;
  }
`;

const LookbookSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  background-color: #F8F8F8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LookbookImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LookbookContent = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

// const ContentTitle = styled.h2`
//   font-size: 2.5rem;
//   font-weight: 600;
//   margin-bottom: 1rem;
// `;

// const ContentDescription = styled.p`
//   color: #333;
//   line-height: 1.6;
//   margin-bottom: 1.5rem;
// `;

const ExploreButton = styled(Link)`
  display: inline-block;
  background-color: #000;
  color: white;
  padding: 1rem 2rem;
  font-weight: 500;
  width: fit-content;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const EngravingSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background-color: #F8F8F8;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EngravingContent = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
    order: 2;
  }
`;

const EngravingImage = styled.div`
  @media (max-width: 768px) {
    order: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ServicesSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  background-color: #F8F8F8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ServiceContent = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ContentTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContentDescription = styled.p`
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const AppointmentButton = styled(Link)`
  display: inline-block;
  background-color: #000;
  color: white;
  padding: 1rem 2rem;
  font-weight: 500;
  width: fit-content;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

// FAQ Section Styles
const FAQSection = styled.div`
  padding: 4rem 0;
`;

const FAQTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
`;

const AccordionContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #E5E5E5;
  margin-bottom: 1rem;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 500;
  text-align: left;
  color: #000;

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    color: ${props => props.$isOpen ? '#E31837' : '#000'};
  }
`;

const AccordionContent = styled.div`
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  color: #666;
  padding-bottom: ${props => props.$isOpen ? '1rem' : '0'};
`;

const QuestionBox = styled.div`
  background-color: #FAF7F2;
  padding: 2rem;
  border-radius: 4px;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionText = styled.div`
  h3 {
    color: #666;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
  }
`;

const GetInTouchButton = styled.button`
  background-color: #000;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 500;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background-color: #F8F8F8;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const LearnMoreButton = styled(Link)`
  color: #000;
  text-decoration: underline;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #666;
  }
`;

const TermsLink = styled(Link)`
  display: block;
  text-align: center;
  color: #000;
  text-decoration: underline;
  font-size: 0.875rem;
  margin-top: 2rem;

  &:hover {
    color: #666;
  }
`;

const  CustomJewelryTwo = () => {   
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = [
        {
          question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore et?",
          answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget."
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ];
      const services = [
        {
          icon: justatyourservice_1,
          title: "Join Vault Rewards",
          description: "This was one of the first rings I had looked at in person. After looking at hundreds",
          link: "/rewards"
        },
        {
          icon: justatyourservice_2,
          title: "Join Vault Rewards",
          description: "This was one of the first rings I had looked at in person. After looking at hundreds",
          link: "/rewards"
        },
        {
          icon: justatyourservice_3,
          title: "Join Vault Rewards",
          description: "This was one of the first rings I had looked at in person. After looking at hundreds",
          link: "/rewards"
        },
        {
          icon: justatyourservice_4,
          title: "Join Vault Rewards",
          description: "This was one of the first rings I had looked at in person. After looking at hundreds",
          link: "/rewards"
        }
      ];
    
      const handleAccordionClick = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
      };
    
      const handleGetInTouch = () => {
        // Add your get in touch functionality here
        console.log("Get in touch clicked");
      };    
    return (
        <Container>
          <BreadcrumbNav>
            <BreadcrumbList>
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li>Custom Jewelry</li>
            </BreadcrumbList>
          </BreadcrumbNav>
    
          <PageTitle>Custom Jewelry</PageTitle>
          
          <SearchAssistant>
            <DiamondIcon>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </DiamondIcon>
            <p>506 results too many? Our Jewelry Assistant can help! Describe what you're looking for?</p>
          </SearchAssistant>
    
          <HeroSection>
            <ImageContainer>
              <img src={engagementring_1} alt="Custom Jewelry" />
            </ImageContainer>
    
            <ContentSection>
              <SectionTitle>Create From Scratch</SectionTitle>
              <Description>
                If you can dream it, we can design it. Collaborate with our Jewelry 
                Experts to create a unique piece that reflects your personal style.
              </Description>
    
              <ButtonGrid>
                <StyledButton to="/contact-us">Contact Us</StyledButton>
                <StyledButton to="/book-appointment">Book APPOINTMENT</StyledButton>
                <StyledButton to="/text-us">TEXT (+1)-123-4567</StyledButton>
                <StyledButton to="/find-store">Find A Store</StyledButton>
              </ButtonGrid>
            </ContentSection>
          </HeroSection>
    
          <HowItWorksSection>
            <SectionTitle style={{ textAlign: 'center' }}>How It Works</SectionTitle>
            <Description style={{ textAlign: 'center' }}>
              Custom design a one-of-a-kind piece from start to finish with our Jewelry Experts.
            </Description>
    
            <ProcessGrid>
              <ProcessStep>
                <ProcessImage src={howworks_1} alt="Design Your Jewelry" />
                <StepTitle>Step 1: Design Your Jewelry</StepTitle>
                <StepDescription>
                  Our designers use your ideas to virtually design your custom piece.
                </StepDescription>
              </ProcessStep>
    
              <ProcessStep>
                <ProcessImage src={howworks_2} alt="3D Render & Wax Model" />
                <StepTitle>Step 2: 3D Render & Wax Model</StepTitle>
                <StepDescription>
                  Receive a 3D rendering and wax model to ensure every detail is 
                  just right or to make any final adjustments.
                </StepDescription>
              </ProcessStep>
    
              <ProcessStep>
                <ProcessImage src={howworks_3} alt="Cast & Set" />
                <StepTitle>Step 3: Cast & Set</StepTitle>
                <StepDescription>
                  Once approved, we'll cast the jewelry in the metal of your choice 
                  and set your selected diamonds or gemstones.
                </StepDescription>
              </ProcessStep>
    
              <ProcessStep>
                <ProcessImage src={howworks_4} alt="Crafted to Perfection" />
                <StepTitle>Step 4: Crafted to Perfection</StepTitle>
                <StepDescription>
                  Final piece is meticulously set, polished, and finished by hand.
                </StepDescription>
              </ProcessStep>
            </ProcessGrid>
          </HowItWorksSection>

          <GetStartedSection>
        <SectionTitle>Get Started On Your Design</SectionTitle>
        <ButtonGrid>
          <ActionButton to="/appointment">Appointment</ActionButton>
          <ActionButton to="/find-store">Find A Store</ActionButton>
          <ActionButton to="/contact">Contact Us</ActionButton>
          <ActionButton to="/text">Text</ActionButton>
        </ButtonGrid>
      </GetStartedSection>

      <LookbookSection>
        <LookbookImage>
          <img src={jskcustomlookbook} alt="JSK Custom Design Lookbook" />
        </LookbookImage>
        <LookbookContent>
          <ContentTitle>The JSK Custom Design Lookbook</ContentTitle>
          <ContentDescription>
            Learn more about the design process and get inspired by real life examples of how our talented 
            jewelers and artisans have brought customers' ideas to life.
          </ContentDescription>
          <ExploreButton to="/lookbook">Explore the LookBook</ExploreButton>
        </LookbookContent>
      </LookbookSection>

      <EngravingSection>
        <EngravingContent>
          <ContentTitle>Expert Engraving</ContentTitle>
          <ContentDescription>
            Our engraving services at JSK are unparalleled.
          </ContentDescription>
          <ContentDescription>
            With our in-store capabilities, we can meticulously engrave your jewelry with precision and care.
          </ContentDescription>
          <ExploreButton to="/appointment">Book Appointment</ExploreButton>
        </EngravingContent>
        <EngravingImage>
          <img src={expertengraving} alt="Expert Engraving Services" />
        </EngravingImage>
      </EngravingSection>

      <ServicesSection>
        <ServiceImage>
          <img src={customizejewlry} alt="Expert Jewelry Services" />
        </ServiceImage>
        <ServiceContent>
          <ContentTitle>Expert Jewelry Services</ContentTitle>
          <ContentDescription>
            Our skilled artisans are committed to bringing your design ideas to life. 
            They work with you every step of the way to create the jewelry of your dreams.
          </ContentDescription>
          <AppointmentButton to="/booking-appointment">
            Book Appointment
          </AppointmentButton>
        </ServiceContent>
      </ServicesSection>

      <FAQSection>
        <FAQTitle>Custom Design Frequently Asked Questions</FAQTitle>
        <AccordionContainer>
          {faqData.map((item, index) => (
            <AccordionItem key={index}>
              <AccordionHeader 
                onClick={() => handleAccordionClick(index)}
                $isOpen={openIndex === index}
              >
                {item.question}
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </AccordionHeader>
              <AccordionContent $isOpen={openIndex === index}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionContainer>

        <QuestionBox>
          <QuestionText>
            <h3>Still have questions?</h3>
            <p>Can't find the answer you're looking for? Please chat to our friendly team.</p>
          </QuestionText>
          <GetInTouchButton onClick={handleGetInTouch}>
            Get in touch
          </GetInTouchButton>
        </QuestionBox>
      </FAQSection>

      <ServicesSection>
        <ServiceImage>
          <img src={customizejewlry} alt="Online Design Tools" />
        </ServiceImage>
        <ServiceContent>
          <ContentTitle>Online Design Tools</ContentTitle>
          <ContentDescription>
          Looking for more options? Check out our online <br />
          customizable jewelry with delivery times under 2 <br />
          weeks.
          </ContentDescription>
          <AppointmentButton to="/booking-appointment">
          Explore Online Options
          </AppointmentButton>
        </ServiceContent>
      </ServicesSection>

      <SectionTitle>JSK At Your Service</SectionTitle>
      
      <CardGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <ServiceIcon src={service.icon} alt={service.title} />
            <CardTitle>{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
            <LearnMoreButton to={service.link}>LEARN MORE</LearnMoreButton>
          </ServiceCard>
        ))}
      </CardGrid>

      <TermsLink to="/terms">
        PROMOTION TERMS & CONDITIONS
      </TermsLink>
        </Container>
      );
    };

export default CustomJewelryTwo