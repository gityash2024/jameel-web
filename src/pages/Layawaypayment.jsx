import React, { useState } from 'react';
import styled from "styled-components";
import ring_1 from "../assets/ring_1.svg";
import ring_2 from "../assets/ring_2.svg";
import ring_3 from "../assets/ring_3.svg";
import labgrowndiamonds from "../assets/labgrowndiamonds.svg";
import fav from "../assets/fav.svg";
import track from "../assets/track.svg";
import home from "../assets/home.svg";
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

const Breadcrumb = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 2rem;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ThumbList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    order: 2;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ThumbImage = styled.img`
  width: 100%;
  cursor: pointer;
  border: 2px solid ${props => props.$active ? '#000' : 'transparent'};
  
  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const MainImage = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: auto;
  }

  .zoom-hint {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    color: #666;
    font-size: 0.875rem;
    font-style: italic;
  }
  
  @media (max-width: 1024px) {
    order: 1;
    
    .zoom-hint {
      display: none;
    }
  }
`;

const ZoomButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  
  @media (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
    
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const ProductInfo = styled.div`
  padding: 0 2rem;
  
  @media (max-width: 1024px) {
    padding: 0;
    order: 3;
  }
`;

const NewTag = styled.span`
  background: #F8E5D5;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  display: inline-block;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.4rem;
    margin-bottom: 0.75rem;
  }
`;

const ProductTitle = styled(Link)`
  display: block;
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.4;

  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 0.75rem;
  }
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const PaymentTable = styled.div`
  border: 1px solid #E5E5E5;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const PaymentRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #E5E5E5;
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
  }
`;

const SizeSection = styled.div`
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const SizeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const SizeButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #E5E5E5;
  background: ${props => props.$active ? '#000' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#000'};
  cursor: pointer;

  &:hover {
    background: ${props => props.$active ? '#000' : '#f5f5f5'};
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.3rem;
    font-size: 0.875rem;
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
    gap: 0.5rem;
  }
`;

const AddToBagButton = styled.button`
  background: #000;
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.875rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.75rem;
  }
`;

const FavoriteButton = styled.button`
  padding: 1rem;
  border: 1px solid #000;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem;
    
    img {
      width: 20px;
      height: 20px;
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem;
    
    img {
      width: 18px;
      height: 18px;
    }
  }
`;

const InfoSection = styled.div`
  background: #F8F8F8;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: start;
  gap: 1rem;

  img {
    width: 24px;
    height: 24px;
  }
  
  @media (max-width: 768px) {
    padding: 1.25rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    gap: 0.75rem;
    font-size: 0.75rem;
    
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const Accordion = styled.div`
  border-top: 1px solid #E5E5E5;
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
  font-size: 1rem;
  text-align: left;
  
  @media (max-width: 768px) {
    padding: 0.875rem 0;
    font-size: 0.875rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }
`;

const ProductCard = styled.div`
  position: relative;
  text-align: center;
`;

const FavButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
  color: ${props => props.$active ? '#E31837' : '#000'};

  &:hover {
    color: #E31837;
  }
  
  @media (max-width: 480px) {
    top: 0.75rem;
    right: 0.75rem;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const FeaturedTag = styled.div`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 0.375rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    gap: 0.375rem;
  }
`;

const SaleTag = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const Price = styled.span`
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

const OriginalPrice = styled.span`
  color: #666;
  text-decoration: line-through;
  font-size: 0.875rem;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const DiscountTag = styled.span`
  background: #E8F5F1;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 2px;
  
  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
`;

const CategoriesSection = styled.div`
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    margin-top: 2.5rem;
  }
  
  @media (max-width: 480px) {
    margin-top: 2rem;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 1.25rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const CategoryTag = styled(Link)`
  padding: 0.5rem 1rem;
  border: 1px solid #E5E5E5;
  color: #000;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
`;

const Layawaypayment = () => {
    const [selectedSize, setSelectedSize] = useState("6");
    const [activeImage, setActiveImage] = useState(0);
    const [activeAccordion, setActiveAccordion] = useState(null);
  
    const images = [ring_1, ring_2, ring_3];
    const sizes = ["5", "5.25", "5.5", "5.75", "6", "6.25", "6.5", "6.75","7","7.25","7.5","7.75"];
    const [favorites, setFavorites] = useState([]);

    const recommendedProducts = [
        {
          id: 1,
          image: ring_1,
          title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
          price: 149.99,
          originalPrice: 199.00,
          discount: "25% off",
          featured: true
        },
        {
          id: 2,
          image: ring_2,
          title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
          price: 149.99,
          originalPrice: 199.00,
          discount: "25% off",
          featured: true
        },
        {
          id: 3,
          image: ring_3,
          title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
          price: 149.99,
          originalPrice: 199.00,
          discount: "25% off",
          featured: true
        },
        {
          id: 4,
          image: ring_1,
          title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
          price: 149.99,
          originalPrice: 199.00,
          discount: "25% off",
          featured: true
        }
      ];
      const categories = [
        "HALO ENGAGEMENT RINGS",
        "HALO ENGAGEMENT RINGS",
        "HALO ENGAGEMENT RINGS",
        "HALO ENGAGEMENT RINGS",
        "HALO ENGAGEMENT RINGS",
        "HALO ENGAGEMENT RINGS",
        "HALO ENGAGEMENT RINGS"
      ];
      
      const toggleFavorite = (productId) => {
        setFavorites(prev => 
          prev.includes(productId)
            ? prev.filter(id => id !== productId)
            : [...prev, productId]
        );
      };
    
  
    return (
      <Container>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/rings">Rings</Link>
          <span>/</span>
          <span>New Arrival Rings</span>
        </Breadcrumb>
  
        <ProductLayout>
          <ThumbList>
            {images.map((img, index) => (
              <ThumbImage 
                key={index}
                src={img}
                $active={activeImage === index}
                onClick={() => setActiveImage(index)}
                alt={`Product view ${index + 1}`}
              />
            ))}
          </ThumbList>
  
          <MainImage>
            <img src={images[activeImage]} alt="Lab Grown Diamond Ring" />
            <div className="zoom-hint">Hover over image to zoom</div>
            <ZoomButton>
              <img src={track} alt="Zoom" />
            </ZoomButton>
          </MainImage>
  
          <ProductInfo>
            <NewTag>New</NewTag>
            <ProductTitle>Lab Grown Diamonds by JSK Elegant Ring with Gold</ProductTitle>
            
            <PriceSection>
              <CurrentPrice>$399.00</CurrentPrice>
              <OriginalPrice>$499.00</OriginalPrice>
              <DiscountTag>25% off</DiscountTag>
            </PriceSection>
  
            <h3>Layaway Payment</h3>
            <PaymentTable>
              <PaymentRow>
                <span>Down Payment</span>
                <span>$4000</span>
              </PaymentRow>
              <PaymentRow>
                <span>3X4000</span>
                <span>$12000</span>
              </PaymentRow>
              <PaymentRow>
                <span>6X2000</span>
                <span>$12000</span>
              </PaymentRow>
              <PaymentRow>
                <span>12X1000</span>
                <span>$12000</span>
              </PaymentRow>
            </PaymentTable>
  
            <SizeSection>
              <SizeHeader>
                <span>Select Your Size:</span>
                <Link to="/size-guide">Ring Size Guide</Link>
              </SizeHeader>
              <SizeGrid>
                {sizes.map(size => (
                  <SizeButton
                    key={size}
                    $active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
              </SizeGrid>
            </SizeSection>
  
            <ActionButtons>
              <AddToBagButton>ADD TO BAG</AddToBagButton>
              <FavoriteButton>
                <img src={fav} alt="Add to favorites" />
              </FavoriteButton>
            </ActionButtons>
  
            <InfoSection>
              <img src={home} alt="Delivery" />
              <div>
                <strong>Still Deciding?</strong> Let Me Help You Find the Right Piece!
                <Link to="/help">Describe what you're looking for?</Link>
              </div>
            </InfoSection>
  
            <InfoSection>
              <img src={track} alt="Delivery" />
              <div>
                <strong>Delivery by Friday, November 22</strong>
                <br />
                Order within 9 hours 10 mins
              </div>
            </InfoSection>
  
            <InfoSection>
              <img src={home} alt="Pickup" />
              <div>
                <strong>Looking to pickup this item?</strong>
                <br />
                <Link to="/options">See your options</Link>
              </div>
            </InfoSection>
          </ProductInfo>
        </ProductLayout>
  
        <Accordion>
          <AccordionHeader onClick={() => setActiveAccordion(activeAccordion === 'overview' ? null : 'overview')}>
            Overview
            <span>{activeAccordion === 'overview' ? '−' : '+'}</span>
          </AccordionHeader>
        </Accordion>
  
        <Accordion>
          <AccordionHeader onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}>
            Shipping & Returns
            <span>{activeAccordion === 'shipping' ? '−' : '+'}</span>
          </AccordionHeader>
        </Accordion>
  
        <Accordion>
          <AccordionHeader onClick={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')}>
            Details
            <span>{activeAccordion === 'details' ? '−' : '+'}</span>
          </AccordionHeader>
        </Accordion>
  
        <Accordion>
          <AccordionHeader onClick={() => setActiveAccordion(activeAccordion === 'reviews' ? null : 'reviews')}>
            Reviews
            <span>{activeAccordion === 'reviews' ? '−' : '+'}</span>
          </AccordionHeader>
        </Accordion>

        <SectionTitle>View More Like This</SectionTitle>
      
      <ProductGrid>
        {recommendedProducts.map(product => (
          <ProductCard key={product.id}>
            <FavButton
              onClick={() => toggleFavorite(product.id)}
              $active={favorites.includes(product.id)}
            >
              <Heart fill={favorites.includes(product.id) ? "currentColor" : "none"} />
            </FavButton>
            
            {product.featured && <FeaturedTag>Featured Item</FeaturedTag>}
            
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle to={`/product/${product.id}`}>{product.title}</ProductTitle>
            
            <SaleTag>Sale</SaleTag>
            <PriceSection>
              <Price>${product.price}</Price>
              <OriginalPrice>${product.originalPrice}</OriginalPrice>
              <DiscountTag>{product.discount}</DiscountTag>
            </PriceSection>
          </ProductCard>
        ))}
      </ProductGrid>

      <CategoriesSection>
        <CategoryTitle>Related Categories</CategoryTitle>
        <CategoryTags>
          {categories.map((category, index) => (
            <CategoryTag key={index} to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
              {category}
            </CategoryTag>
          ))}
        </CategoryTags>
      </CategoriesSection>

      </Container>
    );
  };
  
  export default Layawaypayment;