import React, { useState } from 'react';
import styled from 'styled-components';
import daimond_logo from "../assets/daimond_logo.svg";
import ring_1 from "../assets/ring_1.svg";
import { Heart, Trash2 } from 'lucide-react';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Navigation = styled.nav`
  margin-bottom: 2rem;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
  }
`;

const NavLink = styled.a`
  color: #666;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 0.75rem 0;
  }
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    margin-top: 0.75rem;
    gap: 0.375rem;
  }
`;

const SearchText = styled.p`
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Link = styled.a`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
`;

const ProductCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1;
`;

const IconButton = styled.button`
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    transition: all 0.2s;
  }
  
  &.heart {
    svg {
      fill: ${props => props.active ? '#ff4d4d' : 'none'};
      stroke: ${props => props.active ? '#ff4d4d' : '#ff4d4d'};
    }
    
    &:hover svg {
      transform: scale(1.1);
    }
  }
  
  &.trash {
    color: #666;
    
    &:hover {
      color: #ff4d4d;
    }
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  text-align: left;
  width: 100%;
  margin-bottom: 0.5rem;
  color: #333;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    margin-bottom: 0.375rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.75rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const SaleBadge = styled.span`
  background-color: #e8f5f0;
  color: #333;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  color: #000;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #666;
  font-size: 0.875rem;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
    
    p {
      font-size: 0.875rem;
    }
  }
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([1, 2, 3]);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      price: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      image: ring_1,
      featured: true
    },
    {
      id: 2,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      price: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      image: ring_1,
      featured: true
    },
    {
      id: 3,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      price: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      image: ring_1,
      featured: true
    }
  ]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const removeProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    if (favorites.includes(productId)) {
      setFavorites(prev => prev.filter(id => id !== productId));
    }
  };

  return (
    <Container>
    

      {products.length > 0 ? (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ButtonGroup>
                <IconButton 
                  className="heart"
                  active={favorites.includes(product.id)}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart size={20} />
                </IconButton>
                <IconButton 
                  className="trash"
                  onClick={() => removeProduct(product.id)}
                >
                  <Trash2 size={20} />
                </IconButton>
              </ButtonGroup>
              <ProductImage src={product.image} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <PriceContainer>
                <Price>${product.price}</Price>
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
                <SaleBadge>{product.discount}</SaleBadge>
              </PriceContainer>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <EmptyState>
          <h2>No favorites yet</h2>
          <p>Start adding some items to your favorites list!</p>
        </EmptyState>
      )}
    </Container>
  );
};

export default Favorites;