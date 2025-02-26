import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { productAPI, userAPI } from "../../services/api";
import { toast } from "react-hot-toast";
import { HeaderContext } from "../../components/layout/Header";
const defaultContextValues = {
  wishlistItems: [],
  setWishlistItems: () => {},
  isLoggedIn: false
};
const Container = styled.div`
  max-width: 1440px;
  margin: 60px auto 0;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    margin: 40px auto 0;
    padding: 0 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProductCard = styled.div`
  position: relative;
  padding: 20px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  
  img {
    width: 100%;
    height: auto;
    margin-bottom: 16px;
    aspect-ratio: 1;
    object-fit: contain;
  }
`;

const FeaturedTag = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 12px;
  color: #666;
  
  @media (max-width: 768px) {
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
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  
  .current-price {
    font-weight: bold;
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
  
  .original-price {
    color: #666;
    text-decoration: line-through;
    font-size: 14px;
    
    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
  
  .discount {
    background: #e8f4f0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    
    @media (max-width: 768px) {
      font-size: 11px;
    }
  }
`;

const RelatedProducts = ({ productId, categoryId }) => {
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems, isLoggedIn } = useContext(HeaderContext)||defaultContextValues;
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        // If you have a dedicated API endpoint for related products, use it
        // Otherwise, fetch products by category
        let response;
        if (productAPI.getRelatedProducts) {
          response = await productAPI.getRelatedProducts(productId);
        } else if (categoryId) {
          response = await productAPI.getAllProducts({ 
            category: categoryId, 
            limit: 4,
            exclude: productId
          });
        } else {
          // Fallback to featured products
          response = await productAPI.getFeaturedProducts();
        }
        
        // Filter out the current product if it's in the results
        const filteredProducts = response.data.data.products
          ? response.data.data.products.filter(p => p._id !== productId).slice(0, 4)
          : [];
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchRelatedProducts();
    }
  }, [productId, categoryId]);
  
  const handleWishlistToggle = async (e, product) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      toast.error('Please login to add items to your wishlist');
      navigate('/login');
      return;
    }
    
    try {
      if (wishlistItems.includes(product._id)) {
        await userAPI.removeFromWishlist(product._id);
        setWishlistItems(prev => prev.filter(id => id !== product._id));
        toast.success('Removed from wishlist');
      } else {
        await userAPI.addToWishlist(product._id);
        setWishlistItems(prev => [...prev, product._id]);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };
  
  const handleProductClick = (product) => {
    navigate(`/products/${product.slug}`);
  };
  
  if (loading) {
    return (
      <Container>
        <SectionTitle>View More Like This</SectionTitle>
        <div style={{ textAlign: 'center', padding: '30px 0' }}>Loading related products...</div>
      </Container>
    );
  }
  
  if (products.length === 0) {
    return null;
  }
  
  return (
    <Container>
      <SectionTitle>View More Like This</SectionTitle>
      
      <ProductGrid>
        {products.map(product => {
          const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
          const discountPercentage = hasDiscount 
            ? Math.round((1 - product.salePrice / product.regularPrice) * 100) 
            : 0;
          
          return (
            <ProductCard key={product._id} onClick={() => handleProductClick(product)}>
              {product.isNewArrival && <FeaturedTag>New Arrival</FeaturedTag>}
              <WishlistButton 
                active={wishlistItems.includes(product._id)}
                onClick={(e) => handleWishlistToggle(e, product)}
              >
                <Heart size={20} fill={wishlistItems.includes(product._id) ? "#ED4956" : "none"} />
              </WishlistButton>
              
              <img 
                src={product.images?.[0]?.url || '/placeholder.png'} 
                alt={product.name} 
              />
              
              <ProductTitle>{product.name}</ProductTitle>
              
              {hasDiscount && <SaleTag>Sale</SaleTag>}
              
              <PriceInfo>
                <span className="current-price">
                  ${(hasDiscount ? product.salePrice : product.regularPrice).toFixed(2)}
                </span>
                
                {hasDiscount && (
                  <>
                    <span className="original-price">${product.regularPrice.toFixed(2)}</span>
                    <span className="discount">{discountPercentage}% off</span>
                  </>
                )}
              </PriceInfo>
            </ProductCard>
          );
        })}
      </ProductGrid>
    </Container>
  );
};

export default RelatedProducts;