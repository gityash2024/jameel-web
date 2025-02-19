import React from "react";
import styled from "styled-components";
import { Star } from 'lucide-react';
import holidaycollections_1 from "../assets/holidaycollections_1.svg";
import holidaycollections_2 from "../assets/holidaycollections_2.svg";
import holidaycollections_3 from "../assets/holidaycollections_3.svg";
import customers_1 from "../assets/customers_1.svg";
import customers_2 from "../assets/customers_2.svg";
import customers_3 from "../assets/customers_3.svg";
import customers_4 from "../assets/customers_4.svg";

const Section = styled.section`
  padding: 80px 40px;
  max-width: 1920px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const SectionHeading = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 12px;
  }
`;

const SubHeading = styled.p`
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const ShopButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 30px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: block;
  margin: 0 auto;
  margin-bottom: 60px;
  
  &:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 13px;
    margin-bottom: 40px;
  }
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const CustomerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ProductCard = styled.div`
  text-align: center;

  img {
    width: 100%;
    height: auto;
    margin-bottom: 24px;
  }
  
  @media (max-width: 768px) {
    img {
      margin-bottom: 16px;
    }
  }
`;

const DiscountText = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const CollectionName = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const StyledButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 40px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    padding: 10px 32px;
    font-size: 13px;
  }
`;

const ReviewCard = styled.div`
  text-align: center;
  
  img {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  
  @media (max-width: 768px) {
    img {
      margin-bottom: 16px;
    }
  }
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    gap: 3px;
    margin-bottom: 12px;
  }
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 0 12px;
    margin-bottom: 16px;
  }
`;

const ReviewLink = styled.a`
  color: #000;
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    color: #333;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const ReviewSection = styled.section`
  padding: 100px 40px 80px;
  max-width: 1920px;
  margin: 0 auto;
  background: #fff;
  
  @media (max-width: 768px) {
    padding: 60px 20px 40px;
  }
`;

const ReviewHeading = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 20px;
    color: #000;
  }
  
  p {
    font-size: 16px;
    color: #333;
    margin-bottom: 30px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
    
    h2 {
      font-size: 24px;
      margin-bottom: 16px;
    }
    
    p {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
`;

const CustomerReviews = () => {
  return (
    <ReviewSection>
      <ReviewHeading>
        <h2>What Our Customers Are Saying</h2>
        <p>Unwrap Mariah's handpicked holiday favorites at JSK.</p>
        <ShopButton>SHOP 5-STAR STYLES</ShopButton>
      </ReviewHeading>
    </ReviewSection>
  );
};

const HomeEarrings = () => {
  const collections = [
    {
      image: customers_1,
      discount: "20% OFF*",
      name: "Milestones Collection"
    },
    {
      image: customers_2,
      discount: "20% OFF*",
      name: "Milestones Collection"
    },
    {
      image: customers_3,
      discount: "20% OFF*",
      name: "Milestones Collection"
    }
  ];

  const reviews = [
    {
      image: customers_1,
      text: "This was one of the first rings I had looked at in person. After looking at hundreds online and three different stores, I came back to this one."
    },
    {
      image: customers_2,
      text: "This was one of the first rings I had looked at in person. After looking at hundreds online and three different stores, I came back to this one."
    },
    {
      image: customers_3,
      text: "This was one of the first rings I had looked at in person. After looking at hundreds online and three different stores, I came back to this one."
    },
    {
      image: customers_4,
      text: "This was one of the first rings I had looked at in person. After looking at hundreds online and three different stores, I came back to this one."
    }
  ];

  return (
    <>
      <Section>
        <SectionHeading>Save on Must-Have Holiday Collections</SectionHeading>
        <CollectionGrid>
          {collections.map((collection, index) => (
            <ProductCard key={index}>
              <img src={collection.image} alt={`Collection ${index + 1}`} />
              <DiscountText>{collection.discount}</DiscountText>
              <CollectionName>{collection.name}</CollectionName>
              <StyledButton href="/products">SHOP NOW</StyledButton>
            </ProductCard>
          ))}
        </CollectionGrid>
      </Section>

      <Section>
        <SectionHeading>What Our Customers Are Saying</SectionHeading>
        <SubHeading>Unwrap Mariah's handpicked holiday favorites at JSK.</SubHeading>
        <ShopButton>SHOP 5-STAR STYLES</ShopButton>
        <CustomerGrid>
          {reviews.map((review, index) => (
            <ReviewCard key={index}>
              <img src={review.image} alt={`Review ${index + 1}`} />
              <StarRating>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="black" color="black" />
                ))}
              </StarRating>
              <ReviewText>{review.text} - Cat223</ReviewText>
              <ReviewLink href="/products">Shop Now</ReviewLink>
            </ReviewCard>
          ))}
        </CustomerGrid>
      </Section>
    </>
  );
};

export default HomeEarrings;