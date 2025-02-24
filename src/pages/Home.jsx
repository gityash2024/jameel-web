import React from 'react';
import styled from 'styled-components';
import HeroSectionimg from '../assets/HeroSectionimg.jpeg';
import earlyblackfriday from '../assets/earlyblackfriday.svg';
import shopnow_1 from '../assets/shopnow_1.svg';
import shopnow_2 from '../assets/shopnow_2.svg';
import shopnow_3 from '../assets/shopnow_3.svg';
import shopnow_4 from '../assets/shopnow_4.svg';
import nowsale_1 from '../assets/nowsale_1.svg';
import nowsale_2 from '../assets/nowsale_2.svg';
import mariahlogoimg from '../assets/mariahlogoimg.svg';
import HomeErraring from "../pages/HomeErraring";
import Homepayment from "../pages/Homepayment";

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background: #fff;
  padding-top: 40px;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    padding-top: 20px;
  }
  
  @media (max-width: 768px) {
    padding-top: 16px;
  }
`;

const HeroContainer = styled.div`
  display: grid;
  position: relative;
  margin: 0 auto;
  max-width: 1920px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HeroImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 680px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
  }
`;

const BlackFridayOverlay = styled.div`
  position: absolute;
  bottom: 120px;
  right: 0;
  z-index: 2;
  
  img {
    max-width: 220px;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    bottom: 60px;
    right: 10px;
    img {
      max-width: 160px;
    }
  }
  
  @media (max-width: 480px) {
    bottom: 40px;
    right: 5px;
    img {
      max-width: 120px;
    }
  }
`;

const OfferSection = styled.div`
  background: #E10002;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1024px) {
    padding: 40px 30px;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

const OfferContent = styled.div`
  color: white;
  margin-bottom: 60px;
  
  h1, h2 {
    font-size: 72px;
    font-weight: 700;
    line-height: 1.1;
  }
  
  h1 {
    margin-bottom: 20px;
  }

  @media (max-width: 1200px) {
    h1, h2 {
      font-size: 56px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
    h1, h2 {
      font-size: 42px;
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
    h1, h2 {
      font-size: 36px;
    }
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const CategoryButton = styled.button`
  background: #000;
  color: white;
  padding: 16px;
  width: 100%;
  border: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #1a1a1a;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;

const InspiredSection = styled.div`
  padding: 60px 20px;
  text-align: center;
  background: #f8f8f8;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 12px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const CategoryTags = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 0 40px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
    gap: 8px;
  }
`;

const CategoryTag = styled.button`
  border: 1px solid #e0e0e0;
  background: white;
  padding: 16px 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    border-color: #999;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 11px;
  }
`;

const SalesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;

  @media (max-width: 1024px) {
    padding: 30px 20px;
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 24px 16px;
  }
  
  @media (max-width: 480px) {
    gap: 32px;
    padding: 20px 12px;
  }
`;

const SalesCard = styled.div`
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    margin-bottom: 24px;
  }
  
  @media (max-width: 480px) {
    img {
      margin-bottom: 16px;
    }
  }
`;

const SalesContent = styled.div`
  text-align: left;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
`;

const PriceText = styled.div`
  color: #E10002;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  
  sup {
    font-size: 16px;
    top: -0.8em;
    position: relative;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    
    sup {
      font-size: 14px;
    }
  }
`;

const PresetText = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: #666;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const SaveText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const SaleTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const ShopButton = styled.button`
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
  
  @media (max-width: 480px) {
    padding: 10px 32px;
    font-size: 13px;
  }
`;

const GiftsSection = styled.section`
  padding: 80px 40px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`;

const GiftsTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #000;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const GiftsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const GiftButton = styled.button`
  background: #E10002;
  color: white;
  width: 100%;
  padding: 23px 86px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #cc0002;
  }

  @media (max-width: 768px) {
    padding: 16px 40px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 13px;
  }
`;

const MariahSection = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 60px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    margin: 40px auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 32px auto;
  }
  
  @media (max-width: 480px) {
    margin: 24px auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 600px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
  }
`;

const ContentContainer = styled.div`
  background: #000;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 1024px) {
    padding: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 32px;
  }
  
  @media (max-width: 480px) {
    padding: 24px;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 36px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
  
  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 16px;
  }
`;

const Subtitle = styled.p`
  color: white;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const OrderButton = styled.button`
  background: white;
  color: black;
  padding: 16px 40px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 28px;
    font-size: 13px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 40px 20px;
  margin: 0 auto;
  max-width: 1440px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 12px;
  }
`;

const ProductCard = styled.div`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const DiscountBanner = styled.div`
  background: #000;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 480px) {
    padding: 16px;
    gap: 6px;
  }
`;

const DiscountText = styled.div`
  color: #E10002;
  font-size: 24px;
  font-weight: bold;
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const DiscountDescription = styled.div`
  font-size: 14px;
  color: #fff;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ShopLink = styled.a`
  color: white;
  text-decoration: underline;
  font-size: 14px;
  margin-top: 4px;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 3px;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Home = () => {
  const categories = [
    'NECKLACES', 'BRACELETS', 'EARRINGS',
    'RINGS', 'ENGAGEMENT', 'WATCHES'
  ];

  const inspiredCategories = [
    'WOMEN NECKLACES', 'CHAIN NECKLACES',
    'YELLOW GOLD NECKLACES', 'YELLOW GOLD CHAINS',
    'CURB CHAIN NECKLACES', 'CUBIN CHAIN NECKLACES'
  ];

  const giftCategories = [
    { title: "FOR HIM", link: "/products" },
    { title: "FOR HER", link: "/products" },
    { title: "GIFTS UNDER $250", link: "/products" },
    { title: "GIFT GUIDE", link: "/products" }
  ];

  return (
    <Container>
      <HeroContainer>
        <HeroImageSection>
          <img src={HeroSectionimg} alt="Black Friday Hero" />
          <BlackFridayOverlay>
            <img src={earlyblackfriday} alt="Early Black Friday" />
          </BlackFridayOverlay>
        </HeroImageSection>

   
      </HeroContainer>

      <InspiredSection>
        <SectionTitle>Categories Inspired By You</SectionTitle>
        <CategoryTags>
          {inspiredCategories.map((category, index) => (
            <CategoryTag key={index}>{category}</CategoryTag>
          ))}
        </CategoryTags>
      </InspiredSection>

      <ProductGrid>
        {[shopnow_1, shopnow_2, shopnow_3, shopnow_4].map((image, index) => (
          <ProductCard key={index}>
            <DiscountBanner>
              <DiscountText>40% OFF*</DiscountText>
              <DiscountDescription>
                10K & 14K Gold Jewelry & Chains
              </DiscountDescription>
              <ShopLink href="/products">
                SHOP NOW
              </ShopLink>
            </DiscountBanner>
            <ProductImage>
              <img src={image} alt={`Product ${index + 1}`} />
            </ProductImage>
          </ProductCard>
        ))}
      </ProductGrid>

      <SalesGrid>
        <div>
          <SalesCard>
            <img src={nowsale_1} alt="Black Friday Sale" />
            <SalesContent>
              <PriceText>
                NOW $2,499<sup>99t</sup>
              </PriceText>
              <SaveText>SAVE $2,500</SaveText>
              <SaleTitle>Up to 60% OFF* Black Friday Sales</SaleTitle>
              <ShopButton>SHOP NOW</ShopButton>
            </SalesContent>
          </SalesCard>
        </div>
        
        <div>
          <SalesCard>
            <img src={nowsale_2} alt="Stocking Stuffers" />
            <SalesContent>
              <PriceText>
                NOW $2,499<sup>99t</sup>
              </PriceText>
              <PresetText>PRE SET</PresetText>
              <SaveText>SAVE $2,500</SaveText>
              <SaleTitle>Stocking Stuffers</SaleTitle>
              <ShopButton>SHOP NOW</ShopButton>
            </SalesContent>
          </SalesCard>
        </div>
      </SalesGrid>

      <GiftsSection>
        <GiftsTitle>Gifts For Everyone On Your List</GiftsTitle>
        <GiftsGrid>
          {giftCategories.map((category, index) => (
            <GiftButton
              key={index}
              onClick={() => window.location.href = category.link}
            >
              {category.title}
            </GiftButton>
          ))}
        </GiftsGrid>
      </GiftsSection>

      <MariahSection>
        <ImageContainer>
          <img src={mariahlogoimg} alt="Mariah's Holiday Collection" />
        </ImageContainer>
        
        <ContentContainer>
          <Title>
            Mariah's Holiday<br />
            Gift Picks
          </Title>
          <Subtitle>
            Unwrap Mariah's handpicked holiday favorites at JSK.
          </Subtitle>
          <OrderButton>Order Now</OrderButton>
        </ContentContainer>
      </MariahSection>

      <HomeErraring />
      <Homepayment />
    </Container>
  );
};

export default Home;