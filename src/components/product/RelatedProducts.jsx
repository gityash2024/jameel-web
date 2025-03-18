import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { productAPI, userAPI } from "../../services/api";
import { toast } from "react-hot-toast";
import { HeaderContext } from "../layout/Header";

const defaultContextValues = {
  wishlistItems: [],
  setWishlistItems: () => {},
  isLoggedIn: false
};

const Container = styled.div`
  margin: 60px 0;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 1200px) {
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
  border: 1px solid #eee;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 12px;
  }
  
  .image-container {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    margin-bottom: 12px;
    
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const FeaturedTag = styled.div`
  font-size: 12px;
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const WishlistButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: ${props => props.active ? '#ED4956' : '#666'};
  
  &:hover {
    color: ${props => props.active ? '#ED4956' : '#000'};
  }
`;

const ProductTitle = styled.h3`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 8px;
  color: #333;
  cursor: pointer;
  
  &:hover {
    color: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SaleTag = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  
  .current-price {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
  
  .original-price {
    text-decoration: line-through;
    color: #666;
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  &:after {
    content: " ";
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 6px solid #000;
    border-color: #000 transparent #000 transparent;
    animation: spinner 1.2s linear infinite;
  }
  
  @keyframes spinner {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RelatedProducts = ({ productId, categoryId }) => {
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems, isLoggedIn } = useContext(HeaderContext) || defaultContextValues;
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        let response;
        
        if (productId) {
          response = await productAPI.getRelatedProducts(productId);
        } else if (categoryId) {
          response = await productAPI.getAllProducts({ category: categoryId, limit: 4 });
        } else {
          response = await productAPI.getFeaturedProducts();
        }
        
        if (response.data.data.products) {
          setProducts(response.data.data.products.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRelatedProducts();
  }, [productId, categoryId]);
  
  const handleWishlistToggle = async (product, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      toast.error('Please login to add items to your wishlist');
      navigate('/login', { state: { from: location.pathname } });
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
      
      // Dispatch custom event to trigger wishlist update in header
      window.dispatchEvent(new Event('wishlistUpdated'));
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
        <Title>Related Products</Title>
        <LoadingSpinner />
      </Container>
    );
  }
  
  if (products.length === 0) {
    return null;
  }
  
  return (
    <Container>
      <Title>You May Also Like</Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <ProductHeader>
              {product.isFeatured && <FeaturedTag>Featured Item</FeaturedTag>}
              <WishlistButton 
                active={wishlistItems?.includes(product._id)}
                onClick={(e) => handleWishlistToggle(product, e)}
              >
                <Heart size={18} fill={wishlistItems?.includes(product._id) ? "#ED4956" : "none"} />
              </WishlistButton>
            </ProductHeader>

            <div 
              className="image-container"
              onClick={() => handleProductClick(product)}
            >
              <img 
                src={product.images?.[0]?.url || '/placeholder.png'} 
                alt={product.name} 
              />
            </div>

            <ProductTitle onClick={() => handleProductClick(product)}>
              {product.name}
            </ProductTitle>
            
            {product.salePrice && product.salePrice < product.regularPrice && (
              <SaleTag>Sale</SaleTag>
            )}

            <PriceInfo>
              <span className="current-price">
                ${(product.salePrice || product.regularPrice).toFixed(2)}
              </span>
              
              {product.salePrice && product.salePrice < product.regularPrice && (
                <>
                  <span className="original-price">${product.regularPrice.toFixed(2)}</span>
                  <span className="discount">
                    {Math.round((1 - product.salePrice / product.regularPrice) * 100)}% off
                  </span>
                </>
              )}
            </PriceInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};

export default RelatedProducts;