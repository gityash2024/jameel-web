import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Heart, ChevronDown } from "lucide-react";
import { productAPI, userAPI } from "../services/api";
import { toast } from "react-hot-toast";
import { HeaderContext } from "../components/layout/Header";
import ring_1 from "../assets/ring_1.svg";
import ring_2 from "../assets/ring_2.svg";
import ring_3 from "../assets/ring_3.svg";

const defaultContextValues = {
  wishlistItems: [],
  setWishlistItems: () => {},
  isLoggedIn: false
};

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const AccordionSection = styled.div`
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    margin-bottom: 40px;
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  margin: 60px 0 40px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin: 40px 0 30px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 60px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 100%;
    height: auto;
    margin-bottom: 16px;
  }
  
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const FeaturedTag = styled.div`
  position: absolute;
  top: 20px;
  right: 50px;
  font-size: 12px;
  color: #666;
  
  @media (max-width: 768px) {
    right: 40px;
    font-size: 11px;
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${props => props.active ? '#ED4956' : '#666'};
  
  &:hover {
    color: ${props => props.active ? '#ED4956' : '#000'};
  }
`;

const ProductTitle = styled.h3`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 12px;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SaleTag = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .current-price {
    font-weight: bold;
  }
  
  .original-price {
    color: #666;
    text-decoration: line-through;
  }
  
  .discount {
    background: #e8f4f0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
`;

const RelatedCategories = styled.div`
  margin-top: 60px;
  
  @media (max-width: 768px) {
    margin-top: 40px;
  }
`;

const CategoryTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

const CategoryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  background: white;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`;

const Productstwo = () => {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems, isLoggedIn } = useContext(HeaderContext) || defaultContextValues;
  
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'shipping', title: 'Shipping & Returns' },
    { id: 'details', title: 'Details' },
    { id: 'reviews', title: 'Reviews' }
  ];
  
  const similarProducts = [
    {
      id: 1,
      image: ring_1,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true,
      sale: true
    },
    {
      id: 2,
      image: ring_2,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true,
      sale: true
    },
    {
      id: 3,
      image: ring_3,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true,
      sale: true
    },
    {
      id: 4,
      image: ring_1,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true,
      sale: true
    }
  ];
  
  const relatedCategories = [
    "HALO ENGAGEMENT RINGS",
    "DIAMOND ENGAGEMENT RINGS",
    "PLATINUM ENGAGEMENT RINGS",
    "VINTAGE ENGAGEMENT RINGS",
    "SOLITAIRE ENGAGEMENT RINGS",
    "GEMSTONE ENGAGEMENT RINGS",
    "CUSTOM ENGAGEMENT RINGS"
  ];
  
  const handleWishlistToggle = async (productId) => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to your wishlist');
      navigate('/login');
      return;
    }
    
    try {
      if (wishlistItems.includes(productId)) {
        await userAPI.removeFromWishlist(productId);
        setWishlistItems(prev => prev.filter(id => id !== productId));
        toast.success('Removed from wishlist');
      } else {
        await userAPI.addToWishlist(productId);
        setWishlistItems(prev => [...prev, productId]);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };
  
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };
  
  const handleCategoryClick = (category) => {
    navigate(`/product-details?category=${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <Container>
      {sections.map((section) => (
        <AccordionSection key={section.id}>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
          >
            {section.title}
            <ChevronDown 
              size={20} 
              style={{ 
                transform: openSection === section.id ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease'
              }} 
            />
          </AccordionHeader>
        </AccordionSection>
      ))}

      <SectionTitle>View More Like This</SectionTitle>
      
      <ProductGrid>
        {similarProducts.map(product => (
          <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
            {product.featured && <FeaturedTag>Featured Item</FeaturedTag>}
            <WishlistButton
              active={wishlistItems.includes(product.id.toString())}
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle(product.id.toString());
              }}
            >
              <Heart size={20} fill={wishlistItems.includes(product.id.toString()) ? "#ED4956" : "none"} />
            </WishlistButton>
            <img src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <SaleTag>Sale</SaleTag>
            <PriceInfo>
              <span className="current-price">${product.currentPrice}</span>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount">{product.discount}</span>
            </PriceInfo>
          </ProductCard>
        ))}
      </ProductGrid>

      <RelatedCategories>
        <CategoryTitle>Related Categories</CategoryTitle>
        <CategoryGrid>
          {relatedCategories.map((category, index) => (
            <CategoryButton 
              key={index}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryGrid>
      </RelatedCategories>
    </Container>
  );
};

export default Productstwo;