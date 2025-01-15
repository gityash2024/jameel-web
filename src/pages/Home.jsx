import React from 'react';
import styled from 'styled-components';
import HeroSectionimg from '../assets/HeroSectionimg.png';
import earlyblackfriday from '../assets/earlyblackfriday.svg';
import shopnow_1 from '../assets/shopnow_1.svg';
import shopnow_2 from '../assets/shopnow_2.svg';
import shopnow_3 from '../assets/shopnow_3.svg';
import shopnow_4 from '../assets/shopnow_4.svg';
import nowsale_1 from '../assets/nowsale_1.svg';
import nowsale_2 from '../assets/nowsale_2.svg';
import mariahlogoimg from '../assets/mariahlogoimg.svg';

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background: #fff;
  padding-top: 40px;
  margin-top: 20px;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  margin: 0 auto;
  max-width: 1920px;
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
`;


const OfferSection = styled.div`
  background: #E10002;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
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
`;

const InspiredSection = styled.div`
  padding: 60px 0;
  text-align: center;
  background: #f8f8f8;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;
`;

const CategoryTags = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 0 40px;
  max-width: 1440px;
  margin: 0 auto;
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
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 0 20px;
  margin: 40px 0;
`;

const ProductCard = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const DiscountBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #000;
  color: #fff;
  padding: 20px;
  z-index: 1;
`;

// const SalesGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 20px;
//   padding: 0 20px;
//   margin-bottom: 40px;
// `;

// const SalesCard = styled.div`
//   margin-top: 20px;
// `;

// const Price = styled.div`
//   color: #E10002;
//   font-size: 32px;
//   font-weight: bold;
// `;

// const ShopButton = styled.button`
//   background: #000;
//   color: #fff;
//   padding: 12px 30px;
//   border: none;
//   margin-top: 20px;
//   cursor: pointer;
//   transition: background 0.3s ease;
//   &:hover {
//     background: #333;
//   }
// `;

// const MariahSection = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   margin-bottom: 60px;
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }
// `;

const MariahContent = styled.div`
  background: #000;
  color: #fff;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

// const OrderButton = styled.button`
//   background: #fff;
//   color: #000;
//   padding: 15px 30px;
//   border: none;
//   width: fit-content;
//   cursor: pointer;
//   &:hover {
//     background: #f0f0f0;
//   }
// `;

const SalesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  margin-bottom: 80px;
`;

const SalesCard = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-bottom: 24px;
  }
`;

const SalesContent = styled.div`
  text-align: left;
  padding: 0 20px;
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
`;

const PresetText = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: #666;
`;

const SaveText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const SaleTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
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
`;
const GiftsSection = styled.section`
  padding: 80px 40px;
  max-width: 1440px;
  margin: 0 auto;
`;

const GiftsTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #000;
`;

const GiftsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
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
`;

const MariahSection = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 60px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
`;

const ContentContainer = styled.div`
  background: #000;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.h2`
  color: white;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: white;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
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
    {
      title: "FOR HIM",
      link: "/for-him"
    },
    {
      title: "FOR HER",
      link: "/for-her"
    },
    {
      title: "GIFTS UNDER $250",
      link: "/gifts-under-250"
    },
    {
      title: "GIFT GUIDE",
      link: "/gift-guide"
    }
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

        <OfferSection>
          <OfferContent>
            <h1>Up to 40% OFF*</h1>
            <h2>EVERYTHING</h2>
          </OfferContent>
          <CategoryGrid>
            {categories.map((category, index) => (
              <CategoryButton key={index}>{category}</CategoryButton>
            ))}
          </CategoryGrid>
        </OfferSection>
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
              <div style={{ color: '#E10002', fontSize: '24px', fontWeight: 'bold' }}>
                40% OFF*
              </div>
              <div style={{ fontSize: '14px', margin: '8px 0' }}>
                10K & 14K Gold Jewelry & Chains
              </div>
              <a href="/shop" style={{ color: 'white', textDecoration: 'underline' }}>
                SHOP NOW
              </a>
            </DiscountBanner>
            <img src={image} alt={`Product ${index + 1}`} />
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
        <SaleTitle>Stocking Suffers</SaleTitle>
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

    </Container>
  );
};

export default Home;