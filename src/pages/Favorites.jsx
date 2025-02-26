import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Trash2, Star, ShoppingBag } from 'lucide-react';
import { userAPI, cartAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const Navigation = styled.div`
  margin-bottom: 2rem;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
  }
`;

const NavLink = styled(Link)`
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
  height: 450px; /* Fixed height */
  width: 100%;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px; /* Fixed height */
  object-fit: contain;
  margin-bottom: 1rem;
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

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  width: 100%;
  
  .stars {
    color: #f9a826;
    display: flex;
  }
  
  .count {
    color: #666;
    font-size: 14px;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s;
  
  &:hover {
    background: #333;
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.25rem;
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
  
  button {
    padding: 0.75rem 1.5rem;
    background: black;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 auto;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
    
    h2 {
      font-size: 1.25rem;
    }
    
    p {
      font-size: 0.875rem;
    }
    
    button {
      padding: 0.625rem 1.25rem;
      font-size: 0.875rem;
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  
  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid #f3f3f3;
    border-top: 6px solid #000;
    animation: spinner 1.2s linear infinite;
  }
  
  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Favorites = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    fetchWishlistData();
  }, []);

  const fetchWishlistData = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getWishlist();
      if (response.data && response.data.data && response.data.data.products) {
        setWishlistProducts(response.data.data.products);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist items');
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await userAPI.removeFromWishlist(productId);
      setWishlistProducts(prev => prev.filter(item => item.product._id !== productId));
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const addToCart = async (product) => {
    try {
      const cartData = {
        productId: product._id,
        quantity: 1
      };
      
      await cartAPI.addToCart(cartData);
      toast.success('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleContinueShopping = () => {
    navigate('/product-details');
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <Navigation>
        <NavLink to="/">Home</NavLink> / <span>Favorites</span>
      </Navigation>

      <Header>
        <Title>Your Wishlist</Title>
        <SubHeader>
          <SearchText>
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist
          </SearchText>
        </SubHeader>
      </Header>

      {wishlistProducts.length > 0 ? (
        <ProductGrid>
          {wishlistProducts.map((item) => {
            const product = item.product;
            const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
            const discountPercentage = hasDiscount 
              ? Math.round((1 - product.salePrice / product.regularPrice) * 100) 
              : 0;
              
            return (
              <ProductCard key={item._id}>
                <ButtonGroup>
                  <IconButton 
                    className="heart"
                    active={true}
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    <Heart size={20} />
                  </IconButton>
                  <IconButton 
                    className="trash"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    <Trash2 size={20} />
                  </IconButton>
                </ButtonGroup>
                
                <ProductImage 
                  src={product.images?.[0]?.url || '/placeholder.png'} 
                  alt={product.name} 
                  onClick={() => navigate(`/products/${product.slug || product._id}`)}
                  style={{ cursor: 'pointer' }}
                />
                
                <ProductTitle onClick={() => navigate(`/products/${product.slug || product._id}`)} style={{ cursor: 'pointer' }}>
                  {product.name}
                </ProductTitle>
                
                {product.averageRating > 0 && (
                  <RatingContainer>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < Math.floor(product.averageRating) ? 'currentColor' : 'none'} 
                        />
                      ))}
                    </div>
                    <span className="count">
                      ({product.numberOfReviews || 0})
                    </span>
                  </RatingContainer>
                )}
                
                <PriceContainer>
                  <Price>${(product.salePrice || product.regularPrice || 0).toFixed(2)}</Price>
                  {hasDiscount && (
                    <>
                      <OriginalPrice>${product.regularPrice.toFixed(2)}</OriginalPrice>
                      <SaleBadge>{discountPercentage}% off</SaleBadge>
                    </>
                  )}
                </PriceContainer>
                
                <AddToCartButton onClick={() => addToCart(product)}>
                  <ShoppingBag size={16} />
                  Add to Cart
                </AddToCartButton>
              </ProductCard>
            );
          })}
        </ProductGrid>
      ) : (
        <EmptyState>
          <h2>Your wishlist is empty</h2>
          <p>Start adding some items to your favorites list!</p>
          <button onClick={handleContinueShopping}>
            <ShoppingBag size={16} />
            Browse Products
          </button>
        </EmptyState>
      )}
    </Container>
  );
};

export default Favorites;