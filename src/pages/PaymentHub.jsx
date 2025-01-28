import React, { useState } from 'react';
import styled from "styled-components";
import daimond_logo from "../assets/daimond_logo.svg";
import jskcustomlookbook from '../assets/jskcustomlookbook.svg';
import arrowimage from '../assets/arrowimage.svg';
import layawaypayment from '../assets/layawaypayment.svg';
import acceptpayment from '../assets/acceptpayment.svg';
import Visa from '../assets/Visa.svg';
import Mastercard from '../assets/Mastercard.svg';
import AmericanExpress from '../assets/AmericanExpress.svg';
import Discover from '../assets/Discover.svg';
import ApplePay from '../assets/ApplePay.svg';
import GooglePay from '../assets/GooglePay.svg';
import PayPal from '../assets/PayPal.svg';
import giftCard from '../assets/giftCard.svg';
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

// const Container = styled.div`
//   max-width: 1280px;
//   margin: 0 auto;
//   padding: 2rem;
// `;

// const Navigation = styled.nav`
//   margin-bottom: 2rem;
//   font-size: 0.875rem;
//   color: #666;
// `;

// const Header = styled.div`
//   text-align: center;
//   margin-bottom: 3rem;
// `;

// const Title = styled.h1`
//   font-size: 2.5rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
// `;

// const SearchInfo = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.5rem;

//   img {
//     width: 24px;
//     height: 24px;
//   }

//   span {
//     color: #666;
//   }

//   a {
//     color: inherit;
//     text-decoration: underline;
//   }
// `;

// const ContentSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 3rem;
//   margin-bottom: 4rem;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const ImageContainer = styled.div`
//   img {
//     width: 100%;
//     height: auto;
//     object-fit: cover;
//     border-radius: 4px;
//   }
// `;

// const ContentText = styled.div`
//   padding: 2rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   background: #8080801a;
//   margin-left: -48px;
// `;
const ContentTexts = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  
`;

// const SectionTitle = styled.h2`
//   font-size: 2.5rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
// `;

// const Description = styled.p`
//   color: #000;
//   line-height: 1.6;
//   font-size: 1rem;
// `;

const PaymentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// const CardContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;

//   img {
//     max-width: 100%;
//     height: auto;
//   }
// `;

// const ArrowImage = styled.img`
//   width: 100px;
//   margin: 0 2rem;
// `;
// const PaymentMethodsSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 4rem;
//   margin: 4rem 0;
//   align-items: start;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const PaymentMethodsLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `;

// const PaymentMethodsSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 4rem;
//   margin: 4rem 0;
//   align-items: start;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const PaymentMethodsLeft = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `;

// const PaymentIcons = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 1rem;
//   max-width: 400px;
// `;

// const PaymentIcon = styled.div`
//   background: white;
//   padding: 1.5rem;
//   border-radius: 16px;
//   box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   img {
//     width: 100%;
//     height: auto;
//     max-width: 80px;
//   }
// `;

// const PaymentNote = styled.p`
//   color: #333;
//   font-size: 23px;
//   text-align: center;
//   font-weight: 500;
// `;

// const GiftCardContainer = styled.div`
//   img {
//     width: 100%;
//     max-width: 500px;
//     height: auto;
//     border-radius: 12px;
//     border: 2px solid #B8860B;  // Gold border
//   }
// `;

// const PaymentDetailsSection = styled.div`
//   margin: 4rem 0;
// `;

// const PaymentDetail = styled.div`
//   margin-bottom: 3rem;
  
//   &:last-child {
//     margin-bottom: 0;
//   }
// `;


// const DetailTitle = styled.h2`
//   font-size: 2rem;
//   font-weight: 600;
//   margin-bottom: 1rem;
//   color: #000;
// `;

// const DetailText = styled.p`
//   color: #666;
//   line-height: 1.8;
//   font-size: 1rem;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;

//   img {
//     max-width: 100%;
//     height: auto;
//   }
// `;

// const ArrowImage = styled.img`
//   width: 100px;
//   margin: 0 2rem;
// `;
const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
`;

const Navigation = styled.nav`
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: #666;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SearchInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    color: #666;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ContentText = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
`;

const PaymentMethodsSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin: 4rem 0;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethodsLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const PaymentIcons = styled.div`
  display: grid;
  grid-template-areas:
    "visa amex gpay"
    "mastercard discover applepay"
    ". paypal .";
  gap: 1.5rem;
  max-width: 450px;
  position: relative;
`;

const PaymentIcon = styled.div`
  background: white;
  padding: 1.2rem;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 70px;

  &:nth-child(1) { grid-area: visa; }        /* VISA */
  &:nth-child(2) { grid-area: mastercard; }  /* Mastercard */
  &:nth-child(3) { grid-area: amex; }        /* American Express */
  &:nth-child(4) { grid-area: discover; }    /* Discover */
  &:nth-child(5) { grid-area: paypal; }      /* PayPal */
  &:nth-child(6) { grid-area: gpay; }        /* Google Pay */
  &:nth-child(7) { grid-area: applepay; }    /* Apple Pay */

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const PaymentNote = styled.p`
  color: #333;
  font-size: 1.1rem;
  margin-top: 1rem;
  margin-left: 0.5rem;
`;

const GiftCardContainer = styled.div`
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 12px;
    border: 2px solid #B8860B;  // Gold border
  }
`;

const PaymentDetailsSection = styled.div`
  margin: 4rem 0;
`;

const PaymentDetail = styled.div`
  margin-bottom: 3rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #000;
`;

const DetailText = styled.p`
  color: #666;
  line-height: 1.8;
  font-size: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const ArrowImage = styled.img`
  width: 100px;
  margin: 0 2rem;
`;

const PaymentHub = () => {
  return (
    <Container>
      <Navigation>Home/ Payments Hub</Navigation>

      <Header>
        <Title>Payments Method</Title>
        <SearchInfo>
          <img src={daimond_logo} alt="Diamond Logo" />
          <span>
            506 results too many? Our Jewelry Assistant can help!{' '}
            <a href="#">Describe what you're looking for?</a>
          </span>
        </SearchInfo>
      </Header>

      <ContentSection>
        <ImageContainer>
          <img src={jskcustomlookbook} alt="JSK Custom Lookbook" />
        </ImageContainer>
        <ContentText>
          <SectionTitle>Payment Options</SectionTitle>
          <Description>
            Found something you love? We offer a variety of payment options <br />that make getting it easy.
          </Description>
        </ContentText>
      </ContentSection>

      <PaymentSection>
        <CardContainer>
          <img src={layawaypayment} alt="Payment Options" />
        </CardContainer>
        <ContentTexts>
          <ArrowImage src={arrowimage} alt="Arrow" />
          <SectionTitle>The JSK Jewelers Layaway Payment</SectionTitle>
        </ContentTexts>
      </PaymentSection>
      <PaymentMethodsSection>
        <PaymentMethodsLeft>
          <PaymentIcons>
            <PaymentIcon>
              <img src={Visa} alt="Visa" />
            </PaymentIcon>
            <PaymentIcon>
              <img src={Mastercard} alt="Master card" />
            </PaymentIcon>
            <PaymentIcon>
              <img src={AmericanExpress} alt="American Express" />
            </PaymentIcon>
            <PaymentIcon>
              <img src={Discover} alt="Discover" />
            </PaymentIcon>
            <PaymentIcon>
              <img src={PayPal} alt="PayPal" />
            </PaymentIcon>
            <PaymentIcon>
              <img src={GooglePay} alt="Google Pay" />
            </PaymentIcon>
            <PaymentIcon>
              <img src={ApplePay} alt="Apple Pay" />
            </PaymentIcon>
          </PaymentIcons>
          <PaymentNote>We accept the payment methods above.</PaymentNote>
        </PaymentMethodsLeft>
        <GiftCardContainer>
          <img src={giftCard} alt="JSK Jewelers Gift Card" />
        </GiftCardContainer>
      </PaymentMethodsSection>

      <PaymentDetailsSection>
        <PaymentDetail>
          <DetailTitle>Down Payment</DetailTitle>
          <DetailText>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </DetailText>
        </PaymentDetail>

        <PaymentDetail>
          <DetailTitle>Monthly Installments</DetailTitle>
          <DetailText>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </DetailText>
        </PaymentDetail>

        <PaymentDetail>
          <DetailTitle>First Payment</DetailTitle>
          <DetailText>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </DetailText>
        </PaymentDetail>

        <PaymentDetail>
          <DetailTitle>Layaway Payment</DetailTitle>
          <DetailText>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </DetailText>
        </PaymentDetail>
      </PaymentDetailsSection>
    </Container>
  );
};

export default PaymentHub;
