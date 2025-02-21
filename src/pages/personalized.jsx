import React, { useState } from "react";
import styled from "styled-components";
import daimond_logo from "../assets/daimond_logo.svg";
import personalizeEngrave from "../assets/personalizeEngrave.svg";
import freshfinds_1 from "../assets/freshfinds_1.png";
import freshfinds_2 from "../assets/freshfinds_2.png";
import freshfinds_3 from "../assets/freshfinds_3.png";
import expertEngraving from "../assets/expertengraving.svg";
import gemstonestyles from "../assets/gemstonestyles.svg";
import labgrowngemstone from "../assets/labgrowngemstone.svg";
import themitchellkcollection from "../assets/themitchellkcollection.svg";
import engagementring_1 from "../assets/engagementring_1.svg";
import engagementring_2 from "../assets/engagementring_2.svg";
import engagementring_3 from "../assets/engagementring_3.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BreadcrumbNav = styled.nav`
  margin: 1rem 0;
`;

const BreadcrumbList = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SearchAssistant = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #666;

  img {
    width: 24px;
    height: 24px;
  }
`;

const PersonalizeSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;
  background: #F8F8F8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PersonalizeImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PersonalizeContent = styled.div`
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
`;

const Description = styled.p`
  color: #333;
  line-height: 1.6;
`;

const CategorySection = styled.div`
  margin: 4rem 0;
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const CategorySubtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
`;

const SliderContainer = styled.div`
  overflow: hidden;
  position: relative;
  padding: 1rem 0;
`;

const SliderTrack = styled(motion.div)`
  display: flex;
  gap: 2rem;
`;

const CategoryCard = styled(Link)`
  flex: 0 0 auto;
  width: calc(25% - 1.5rem);
  text-decoration: none;
  color: inherit;

  @media (max-width: 1024px) {
    width: calc(33.333% - 1.5rem);
  }

  @media (max-width: 768px) {
    width: calc(50% - 1rem);
  }
`;
const EngravingSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 4rem 0;
  background-color: #F8F8F8;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentContainer = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const EngravingTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const EngravingDescription = styled.p`
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.$variant === 'white' ? '#fff' : '#000'};
  color: ${props => props.$variant === 'white' ? '#000' : '#fff'};
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  border: ${props => props.$variant === 'white' ? '1px solid #000' : 'none'};

  &:hover {
    background-color: ${props => props.$variant === 'white' ? '#f5f5f5' : '#333'};
  }
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StylesSection = styled.div`
  margin: 4rem 0;
`;

const StylesTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
`;

const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyleCard = styled.div`
  text-align: center;
`;

const StyleImage = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  margin-bottom: 1.5rem;
`;

const StyleCardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const StyleDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;
const CollectionSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 4rem 0;
  background-color: #F8F8F8;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CollectionImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CollectionContent = styled.div`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const CollectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const CollectionDescription = styled.p`
  color: #333;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #000;
  color: white;
  text-decoration: none;
  width: fit-content;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const EngagementSection = styled.div`
  margin: 6rem 0;
`;

const EngagementTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: 500;
`;

const EngagementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const EngagementCard = styled.div`
  text-align: center;
`;

const CardImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const CardSubtitle = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const CreateButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #000;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;
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

// const CardGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 2rem;
//   margin-bottom: 2rem;

//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (max-width: 640px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const ServiceCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   text-align: center;
//   padding: 2rem;
//   background-color: #F8F8F8;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//   }
// `;

// const ServiceIcon = styled.img`
//   width: 48px;
//   height: 48px;
//   margin-bottom: 1.5rem;
// `;
// const CardDescription = styled.p`
//   color: #666;
//   font-size: 0.875rem;
//   line-height: 1.6;
//   margin-bottom: 1rem;
// `;

// const LearnMoreButton = styled(Link)`
//   color: #000;
//   text-decoration: underline;
//   font-size: 0.875rem;
//   font-weight: 500;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #666;
//   }
// `;

// const TermsLink = styled(Link)`
//   display: block;
//   text-align: center;
//   color: #000;
//   text-decoration: underline;
//   font-size: 0.875rem;
//   margin-top: 2rem;

//   &:hover {
//     color: #666;
//   }
// `;
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
const PersonalizedJewelry = () => {
    const [openIndex, setOpenIndex] = useState(0);

  const categories = [
    { image: freshfinds_1, title: 'Rings', link: '/rings' },
    { image: freshfinds_2, title: 'Bracelets', link: '/bracelets' },
    { image: freshfinds_3, title: 'Bracelets', link: '/bracelets' },
    // Add more categories as needed
  ];

  const rewardsData = [
          { icon: justatyourservice_1, title: "VAULT REWARDS" },
          { icon: justatyourservice_2, title: "VAULT REWARDS" },
          { icon: justatyourservice_3, title: "VAULT REWARDS" },
          { icon: justatyourservice_4, title: "VAULT REWARDS" }
        ];
        
  const engagementSteps = [
    {
      image: engagementring_1,
      title: "Find Your Ideal Diamond",
      subtitle: "Milestones Collection",
      link: "/create-diamond"
    },
    {
      image: engagementring_2,
      title: "Select A Setting",
      subtitle: "Milestones Collection",
      link: "/select-setting"
    },
    {
      image: engagementring_3,
      title: "Create Your Ring",
      subtitle: "Milestones Collection",
      link: "/create-ring"
    }
  ];

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
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Custom Jewelry</span>
        </BreadcrumbList>
      </BreadcrumbNav>

      <HeaderSection>
        <Title>Personalized</Title>
        <SearchAssistant>
          <img src={daimond_logo} alt="Diamond" />
          <span>506 results too many? Our Jewelry Assistant can help! Describe what you're looking for?</span>
        </SearchAssistant>
      </HeaderSection>

      <PersonalizeSection>
        <PersonalizeImage>
          <img src={personalizeEngrave} alt="Personalize & Engrave" />
        </PersonalizeImage>
        <PersonalizeContent>
          <ContentTitle>Personalize & Engrave</ContentTitle>
          <Description>
            Create personalized jewelry online by adding a name, date, or monogram to make your piece truly special.
          </Description>
          <ButtonGroup>
            <Button to="/best-sellers" $primary>BEST SELLERS</Button>
            <Button to="/shop-all">SHOP ALL</Button>
          </ButtonGroup>
        </PersonalizeContent>
      </PersonalizeSection>

      <CategorySection>
        <CategoryTitle>Shop Personalized Jewelry by Category</CategoryTitle>
        <CategorySubtitle>Shop New Arrivals by Category</CategorySubtitle>

        <SliderContainer>
          <SliderTrack
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {categories.map((category, index) => (
              <CategoryCard key={index} to={category.link}>
                <CardImage src={category.image} alt={category.title} />
                <CardTitle>{category.title}</CardTitle>
              </CategoryCard>
            ))}
          </SliderTrack>
        </SliderContainer>
      </CategorySection>

      <EngravingSection>
        <ContentContainer>
          <EngravingTitle>Expert Engraving</EngravingTitle>
          <EngravingDescription>
            Our engraving services at JSK are unparalleled.
          </EngravingDescription>
          <EngravingDescription>
            With our in-store capabilities, we can meticulously engrave your jewelry with precision and care.
          </EngravingDescription>
          <ButtonGroup>
            <Button to="/booking-appointment">BOOK APPOINTMENT</Button>
            <Button to="/find-store" $variant="white">FIND A STORE</Button>
          </ButtonGroup>
        </ContentContainer>
        <ImageContainer>
          <img src={expertEngraving} alt="Expert Engraving Service" />
        </ImageContainer>
      </EngravingSection>

      <StylesSection>
        <StylesTitle>Top Personalized Jewelry Styles</StylesTitle>
        <StylesGrid>
          <StyleCard>
            <StyleImage src={gemstonestyles} alt="Gemstone Styles" />
            <StyleCardTitle>Gemstone Styles</StyleCardTitle>
            <StyleDescription>
              Once approved, we'll cast the jewelry in the metal of your choice 
              and set your selected diamonds or gemstones.
            </StyleDescription>
            <CreateButton to="/create-gemstone">Create Now</CreateButton>
          </StyleCard>

          <StyleCard>
            <StyleImage src={labgrowngemstone} alt="LAb-Grown Gemstone Styles" />
            <StyleCardTitle>LAb - Grown Gemstone Styles</StyleCardTitle>
            <StyleDescription>
              Once approved, we'll cast the jewelry in the metal of your choice 
              and set your selected diamonds or gemstones.
            </StyleDescription>
            <CreateButton to="/create-lab-grown">Create Now</CreateButton>
          </StyleCard>
        </StylesGrid>

        <CollectionSection>
        <CollectionImage>
          <img src={themitchellkcollection} alt="The Mitchell K Collection" />
        </CollectionImage>
        <CollectionContent>
          <CollectionTitle>The Mitchell K Collection</CollectionTitle>
          <CollectionDescription>
            Transform a treasured photo or handwritten note into beautiful jewelry.
          </CollectionDescription>
          <ShopButton to="/shop-collection">Shop Now</ShopButton>
        </CollectionContent>
      </CollectionSection>

      <EngagementSection>
        <EngagementTitle>Design Your Own Engagement Ring Online</EngagementTitle>
        <EngagementGrid>
          {engagementSteps.map((step, index) => (
            <EngagementCard key={index}>
              <CardImage src={step.image} alt={step.title} />
              <CardTitle>{step.title}</CardTitle>
              <CardSubtitle>{step.subtitle}</CardSubtitle>
              <CreateButton to={step.link}>Create Now</CreateButton>
            </EngagementCard>
          ))}
        </EngagementGrid>
      </EngagementSection>

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
       
      <SectionTitle>JSK At Your Service</SectionTitle>
      
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


      </StylesSection>

    </Container>
  );
};

export default PersonalizedJewelry;