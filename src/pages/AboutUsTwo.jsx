import React, { useState } from 'react';
import styled from 'styled-components';
import flowus_1 from "../assets/flowus_1.png";
import flowus_2 from "../assets/flowus_2.png";
import flowus_3 from "../assets/flowus_3.png";
import flowus_4 from "../assets/flowus_4.png";
import flowus_5 from "../assets/flowus_5.png";
import discoverworldbestbackground from "../assets/discoverworldbestbackground.png";
import discoverworldbest from "../assets/discoverworldbest.png";
import { ChevronDown, ChevronUp } from 'lucide-react';

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const InstagramGrid = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  
  grid-template-areas:
    "big big"
    "small1 small2"
    "small3 small4"
    "wide wide";

  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 2rem;
    grid-template-areas:
      "big big small1 small2 small3"
      "big big wide wide small4";
  }
`;

const InstagramImage = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;

  &:nth-child(1) {
    grid-area: big;
    height: 400px;
  }

  &:nth-child(2) { grid-area: small1; }
  &:nth-child(3) { grid-area: small2; }
  &:nth-child(4) { 
    grid-area: wide;
    height: 250px;
  }
  &:nth-child(5) { grid-area: small3; }
  &:nth-child(6) { grid-area: small4; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    height: 300px;

    &:nth-child(1) {
      height: 610px;
    }

    &:nth-child(4) {
      height: 300px;
    }
  }
`;

const ExploreButton = styled.button`
  display: block;
  margin: 1.5rem auto;
  padding: 0.75rem 2rem;
  background: #000;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  max-width: 300px;

  &:hover {
    background: #333;
  }

  @media (min-width: 768px) {
    margin: 2rem auto;
    width: auto;
  }
`;

const DiscoverSection = styled.div`
  position: relative;
  margin: 2rem 0;
  min-height: 600px;
  background: #FDF7F7;
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  padding: 1rem;

  @media (min-width: 768px) {
    margin: 4rem 0;
    height: 500px;
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }
`;

const DiscoverContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @media (min-width: 768px) {
    padding: 4rem;
    text-align: left;
  }
`;

const DiscoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    height: 100%;
  }
`;

const CircleDecoration = styled.div`
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background: white;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);

  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
    right: -100px;
  }
`;

const SquareDecoration = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background: white;
  ${props => props.position};

  @media (min-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const DiscoverTitle = styled.div`
  margin-bottom: 1.5rem;

  .discover {
    font-size: 2rem;
    font-family: 'Playfair Display', serif;
    margin-bottom: 0.5rem;
  }

  .worlds-best {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .jewellery {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    .discover {
      font-size: 3rem;
    }

    .worlds-best {
      font-size: 3.5rem;
    }

    .jewellery {
      font-size: 3rem;
    }
  }
`;

const DiscoverText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #666;
  max-width: 100%;
  padding: 0 1rem;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
    max-width: 400px;
    padding: 0;
  }
`;

const DiscoverImage = styled.img`
  position: relative;
  z-index: 2;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;

  @media (min-width: 768px) {
    max-width: 80%;
  }
`;

const NewArrivalButton = styled.button`
  padding: 0.75rem 2rem;
  background: #000;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  transition: background-color 0.2s;

  &:hover {
    background: #333;
  }

  @media (min-width: 768px) {
    width: fit-content;
    margin: 0;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    padding: 0;
  }
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 3rem;
    padding: 0;
  }
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 0.75rem;

  @media (min-width: 768px) {
    padding-bottom: 1rem;
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 0;

  @media (min-width: 768px) {
    padding: 1rem 0;
  }
`;

const AccordionTitle = styled.h3`
  font-size: 1.1rem;
  color: #000;
  flex-grow: 1;
  margin-right: 1rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const AccordionIcon = styled.div`
  color: ${props => props.isOpen ? '#FF0000' : '#000'};
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AccordionContent = styled.div`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactSection = styled.div`
  background: #faf9f7;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
  margin-top: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    margin-top: 3rem;
    text-align: left;
  }
`;

const ContactInfo = styled.div`
  flex-grow: 1;
`;

const ContactTitle = styled.h3`
  font-size: 1.25rem;
  color: #000;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContactText = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const GetInTouchButton = styled.button`
  background: #000;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  transition: background-color 0.2s;

  &:hover {
    background: #333;
  }

  @media (min-width: 768px) {
    width: auto;
    margin: 0;
  }
`;

const InstagramDiscoverPage = () => {
  const instagramImages = [
    flowus_1,
    flowus_2,
    flowus_3,
    flowus_4,
    flowus_5
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore et?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur incididunt ut labore ?",
      answer: "Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <Container>
      <section>
        <Title>Follow Us On Instagram</Title>
        <InstagramGrid>
          {instagramImages.map((image, index) => (
            <InstagramImage key={index}>
              <img src={image} alt={`Instagram post ${index + 1}`} />
            </InstagramImage>
          ))}
        </InstagramGrid>
        <ExploreButton>Explore Instagram</ExploreButton>
      </section>

      <DiscoverSection>
        <DiscoverContent>
          <DiscoverTitle>
            <div className="discover">Discover</div>
            <div className="worlds-best">WORLD'S BEST</div>
            <div className="jewellery">JEWELLERY</div>
          </DiscoverTitle>
          <DiscoverText>
            Lorem Ipsum Dolor Sit Amet Consectetur. Morbi Duis Id Sit Elit Ut
            Interdum Massa Dapibus.Lorem Ipsum Dolor Sit Amet Consectetur.
            Morbi Duis Id Sit Elit.
          </DiscoverText>
          <NewArrivalButton>NEW ARRIVAL</NewArrivalButton>
        </DiscoverContent>

        <DiscoverImageWrapper>
          <CircleDecoration />
          <SquareDecoration position="top: 20px; left: 20px;" />
          <SquareDecoration position="bottom: 20px; right: 20px;" />
          <DiscoverImage src={discoverworldbest} alt="Discover World's Best Jewellery" />
        </DiscoverImageWrapper>
      </DiscoverSection>

      <Title>FAQ Section</Title>
      
      <AccordionContainer>
        {faqData.map((faq, index) => (
          <AccordionItem key={index}>
            <AccordionHeader onClick={() => toggleAccordion(index)}>
              <AccordionTitle>{faq.question}</AccordionTitle>
              <AccordionIcon isOpen={openIndex === index}>
                {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </AccordionIcon>
            </AccordionHeader>
            <AccordionContent isOpen={openIndex === index}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionContainer>

      <ContactSection>
        <ContactInfo>
          <ContactTitle>Still have questions?</ContactTitle>
          <ContactText>
            Can't find the answer you're looking for? Please chat to our friendly team.
          </ContactText>
        </ContactInfo>
        <GetInTouchButton>Get in touch</GetInTouchButton>
      </ContactSection>
    </Container>
  );
};

export default InstagramDiscoverPage;