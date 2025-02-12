import React, { useState } from 'react';
import styled from 'styled-components';
import daimond_logo from "../assets/daimond_logo.svg";
import ring_1 from "../assets/ring_1.svg";
import { Heart } from 'lucide-react';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const Navigation = styled.nav`
  margin-bottom: 2rem;
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
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SearchText = styled.p`
  color: #666;
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
`;

const ProductCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #f8f8f8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #666;
`;

const HeartButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    fill: ${props => props.active ? '#ff4d4d' : 'none'};
    stroke: ${props => props.active ? '#ff4d4d' : '#ff4d4d'};
    transition: all 0.2s;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-bottom: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1rem;
  text-align: left;
  width: 100%;
  margin-bottom: 0.5rem;
  color: #333;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
`;

const SaleBadge = styled.span`
  background-color: #e8f5f0;
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Price = styled.span`
  font-weight: 600;
  font-size: 1.125rem;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #666;
  font-size: 0.875rem;
`;

const Sidebar = styled.div`
  width: 280px;
  padding: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  border-right: 1px solid #eee;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuLink = styled.a`
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: #f5f5f5;
  }
  
  ${props => props.active && `
    background: #f0f0f0;
    font-weight: 500;
  `}
`;

const MainContent = styled.div`
  margin-left: ${props => props.hasSidebar ? '280px' : '0'};
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([1, 2, 3]); // Initialize with product IDs

  const products = [
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
      <Sidebar>
        <MenuLink href="/my-account">My Account</MenuLink>
        <MenuLink href="/my-orders">My Orders</MenuLink>
        <MenuLink href="/favourites" active>Favourites</MenuLink>
        <MenuLink href="/track-order">Track Order</MenuLink>
        <MenuLink href="/saved-address">Saved Address</MenuLink>
      </Sidebar>

      <MainContent hasSidebar>
        <Navigation>
          <NavLink href="/">Home</NavLink>
          {" / "}
          <NavLink href="/custom-jewelry">Custom Jewelry</NavLink>
        </Navigation>

        <Header>
          <Title>Favorites</Title>
          <SubHeader>
            <img src={daimond_logo} alt="Diamond Logo" />
            <SearchText>
              506 results too many?{" "}
              <Link>Describe what you're looking for?</Link>
            </SearchText>
          </SubHeader>
        </Header>

        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              {product.featured && (
                <FeaturedBadge>Featured Item</FeaturedBadge>
              )}
              <HeartButton 
                active={favorites.includes(product.id)}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart size={24} />
              </HeartButton>
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
      </MainContent>
    </Container>
  );
};

export default Favorites;