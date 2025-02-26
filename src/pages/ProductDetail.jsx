import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Diamond,
  Truck,
  Store,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { productAPI, userAPI, cartAPI } from "../services/api";
import { toast } from "react-hot-toast";
import { HeaderContext } from "../components/layout/Header";
import RelatedProducts from "../components/product/RelatedProducts";
const defaultContextValues = {
  wishlistItems: [],
  setWishlistItems: () => {},
  cartItems: [],
  setCartItems: () => {},
  isLoggedIn: false
};
const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Breadcrumb = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  color: #666;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 16px;
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr 480px;
  gap: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 80px 1fr 400px;
    gap: 30px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 70px 1fr 350px;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ThumbColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductDetails = styled.div`
  padding-left: 20px;
  
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .item-number {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #666;
    font-size: 14px;
  }

  .new-tag {
    background: #f5f2ee;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    
    .item-number {
      font-size: 12px;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 24px;
  line-height: 1.2;
  
  @media (max-width: 992px) {
    font-size: 28px;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;

  .current {
    font-size: 32px;
    font-weight: bold;
  }

  .original {
    font-size: 32px;
    color: #666;
    text-decoration: line-through;
  }

  .discount {
    background: #e8f4f0;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    .current, .original {
      font-size: 24px;
    }
    
    .discount {
      font-size: 12px;
    }
  }
`;

const SizeSelector = styled.div`
  margin: 30px 0;
`;

const SizeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .guide {
    color: #000;
    text-decoration: underline;
  }
`;

const SizeGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const SizeButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  background: ${props => props.selected ? '#000' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#000'};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 576px) {
    width: 44px;
    height: 44px;
    font-size: 13px;
  }
`;

const AddToCartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  margin-top: 30px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const AddToCartButton = styled.button`
  background: #000;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const WishlistButton = styled.button`
  width: 50px;
  background: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.active ? '#ED4956' : '#666'};

  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 576px) {
    width: 100%;
    padding: 12px;
  }
`;

const AssistanceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 30px 0;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;

  a {
    color: #000;
    text-decoration: underline;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 16px 0;
  }
`;

const ThumbImage = styled.div`
  border: 1px solid ${props => props.active ? '#000' : '#e0e0e0'};
  padding: 8px;
  cursor: pointer;
  height: 90px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
  background: white;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 992px) {
    height: 70px;
    width: 70px;
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  margin: 0 40px;
  
  @media (max-width: 768px) {
    margin: 0;
  }

  .image-wrapper {
    border: 1px solid #e0e0e0;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    background: white;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    @media (max-width: 992px) {
      min-height: 500px;
      padding: 30px;
    }
    
    @media (max-width: 768px) {
      min-height: 350px;
      padding: 20px;
    }
    
    @media (max-width: 576px) {
      min-height: 280px;
      padding: 16px;
    }
  }

  .zoom-text {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 12px;
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const MobileThumbsContainer = styled.div`
  display: none;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 8px;
  margin-top: 16px;
  padding-bottom: 8px;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileThumb = styled.div`
  border: 1px solid ${props => props.active ? '#000' : '#e0e0e0'};
  padding: 4px;
  cursor: pointer;
  flex: 0 0 auto;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: border-color 0.2s ease;

  &.prev {
    left: -20px;
  }
  &.next {
    right: -20px;
  }

  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 992px) {
    width: 36px;
    height: 36px;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  label {
    font-size: 14px;
    margin-right: 12px;
    font-weight: 500;
  }
  
  .control {
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    
    button {
      width: 36px;
      height: 36px;
      background: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: #f5f5f5;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    input {
      width: 50px;
      height: 36px;
      border: none;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      text-align: center;
      font-size: 14px;
      
      &:focus {
        outline: none;
      }
    }
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
  font-weight: 500;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    padding: 16px 0;
    font-size: 15px;
  }
`;

const AccordionContent = styled.div`
  padding-bottom: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  p {
    line-height: 1.6;
    color: #666;
    font-size: 14px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
      color: #666;
      font-size: 14px;
    }
  }
`;

const DeliveryInfo = styled.div`
  margin-top: 30px;
  
  > div {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    
    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      div:first-child {
        font-weight: 500;
      }
      
      div:last-child {
        color: #666;
        font-size: 14px;
      }
    }
  }
  
  a {
    color: #000;
    text-decoration: underline;
    display: inline-block;
    margin-top: 12px;
    font-size: 14px;
  }
`;

const SpecificationList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  div {
    font-size: 14px;
    
    span:first-child {
      font-weight: 500;
      margin-right: 8px;
    }
    
    span:last-child {
      color: #666;
    }
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems, cartItems, setCartItems, isLoggedIn } = useContext(HeaderContext)||defaultContextValues;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("overview");
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await productAPI.getProductBySlug(slug);
        setProduct(response.data.data.product);
        if (response.data.data.product.attributes) {
          const sizeAttribute = response.data.data.product.attributes.find(
            attr => attr.name.toLowerCase() === 'size' || attr.name.toLowerCase() === 'ring size'
          );
          if (sizeAttribute && sizeAttribute.value) {
            // Convert to array if it's a string of sizes
            const sizes = typeof sizeAttribute.value === 'string' 
              ? sizeAttribute.value.split(',').map(s => s.trim())
              : [sizeAttribute.value];
            
            if (sizes.length > 0) {
              setSelectedSize(sizes[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
        navigate('/product-details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug, navigate]);
  
  useEffect(() => {
    if (product && wishlistItems.includes(product._id)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [product, wishlistItems]);
  
  const handlePrevImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    
    setCurrentImage((prev) => {
      const newIndex = (prev - 1 + product.images.length) % product.images.length;
      return newIndex;
    });
  };

  const handleNextImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    
    setCurrentImage((prev) => {
      const newIndex = (prev + 1) % product.images.length;
      return newIndex;
    });
  };
  
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to your cart');
      navigate('/login');
      return;
    }
    
    if (!selectedSize && product?.attributes?.some(attr => 
      attr.name.toLowerCase() === 'size' || attr.name.toLowerCase() === 'ring size'
    )) {
      toast.error('Please select a size');
      return;
    }
    
    try {
      const cartData = {
        productId: product._id,
        quantity,
        ...(selectedSize && { attributes: [{ name: 'Size', value: selectedSize }] })
      };
      
      await cartAPI.addToCart(cartData);
      setCartItems((prev) => [...prev, { ...product, quantity }]);
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };
  
  const handleWishlistToggle = async () => {
    if (!isLoggedIn) {
      toast.error('Please login to add items to your wishlist');
      navigate('/login');
      return;
    }
    
    try {
      if (isInWishlist) {
        await userAPI.removeFromWishlist(product._id);
        setWishlistItems(prev => prev.filter(id => id !== product._id));
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await userAPI.addToWishlist(product._id);
        setWishlistItems(prev => [...prev, product._id]);
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= (product?.stockQuantity || 10)) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < (product?.stockQuantity || 10)) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const getSizeOptions = () => {
    if (!product || !product.attributes) return [];
    
    const sizeAttribute = product.attributes.find(
      attr => attr.name.toLowerCase() === 'size' || attr.name.toLowerCase() === 'ring size'
    );
    
    if (!sizeAttribute) return [];
    
    // Convert to array if it's a string of sizes
    if (typeof sizeAttribute.value === 'string') {
      return sizeAttribute.value.split(',').map(s => s.trim());
    }
    
    return [sizeAttribute.value];
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>Loading product details...</div>
          <div 
            style={{ 
              display: 'inline-block', 
              width: '50px', 
              height: '50px', 
              border: '5px solid #f3f3f3', 
              borderTop: '5px solid #000', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} 
          />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </PageContainer>
    );
  }
  
  if (!product) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>Product not found</div>
          <button 
            onClick={() => navigate('/product-details')} 
            style={{ 
              padding: '10px 20px', 
              background: '#000', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Go to Products
          </button>
        </div>
      </PageContainer>
    );
  }
  
  const sizes = getSizeOptions();
  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
  const discountPercentage = hasDiscount 
    ? Math.round((1 - product.salePrice / product.regularPrice) * 100) 
    : 0;
  
  const currentPrice = hasDiscount ? product.salePrice : product.regularPrice;

  return (
    <PageContainer>
      <Breadcrumb>
        <Link to="/">Home</Link> / 
        {product.category && <Link to={`/product-details?category=${product.category.slug}`}> {product.category.name}</Link>} / 
        {product.subcategory && <Link to={`/product-details?category=${product.category.slug}&subcategory=${product.subcategory.slug}`}> {product.subcategory.name}</Link>} / 
        <span>{product.name}</span>
      </Breadcrumb>

      <ProductLayout>
        {/* Thumbnail Column */}
        <ThumbColumn>
          {product.images && product.images.map((image, index) => (
            <ThumbImage
              key={index}
              active={currentImage === index}
              onClick={() => setCurrentImage(index)}
            >
              <img src={image.url} alt={`${product.name} view ${index + 1}`} />
            </ThumbImage>
          ))}
        </ThumbColumn>

        <MainImageContainer>
          <NavigationButton className="prev" onClick={handlePrevImage}>
            <ChevronLeft size={20} />
          </NavigationButton>

          <div className="image-wrapper">
            {product.images && product.images.length > 0 && (
              <img src={product.images[currentImage].url} alt={product.name} />
            )}
          </div>

          <NavigationButton className="next" onClick={handleNextImage}>
            <ChevronRight size={20} />
          </NavigationButton>
          
          <div className="zoom-text">Hover over image to zoom</div>
          
          {/* Mobile thumbnails */}
          <MobileThumbsContainer>
            {product.images && product.images.map((image, index) => (
              <MobileThumb
                key={index}
                active={currentImage === index}
                onClick={() => setCurrentImage(index)}
              >
                <img src={image.url} alt={`${product.name} view ${index + 1}`} />
              </MobileThumb>
            ))}
          </MobileThumbsContainer>
        </MainImageContainer>

        <ProductDetails>
          <ProductHeader>
            <div className="item-number">
              <span>Item #: {product.sku}</span>
              {product.isNewArrival && <span className="new-tag">New</span>}
            </div>
            <Share2 size={20} />
          </ProductHeader>

          <Title>{product.name}</Title>

          <PriceContainer>
            <span className="current">${currentPrice.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="original">${product.regularPrice.toFixed(2)}</span>
                <span className="discount">{discountPercentage}% off</span>
              </>
            )}
          </PriceContainer>

          <Link to="#" style={{ color: "#000", textDecoration: "underline" }}>
            View Other Financing Options
          </Link>

          {sizes.length > 0 && (
            <SizeSelector>
              <SizeHeader>
                <span>Select Your Size:</span>
                <Link to="#" className="guide">
                  Size Guide
                </Link>
              </SizeHeader>
              <SizeGrid>
                {sizes.map((size) => (
                  <SizeButton
                    key={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
              </SizeGrid>
            </SizeSelector>
          )}
          
          <QuantitySelector>
            <label>Quantity:</label>
            <div className="control">
              <button onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
              <input 
                type="number" 
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stockQuantity || 10}
              />
              <button onClick={incrementQuantity} disabled={quantity >= (product.stockQuantity || 10)}>+</button>
            </div>
          </QuantitySelector>

          <AddToCartSection>
            <AddToCartButton onClick={handleAddToCart}>ADD TO BAG</AddToCartButton>
            <WishlistButton 
              active={isInWishlist}
              onClick={handleWishlistToggle}
            >
              <Heart size={20} fill={isInWishlist ? "#ED4956" : "none"} />
            </WishlistButton>
          </AddToCartSection>

          <AssistanceSection>
            <Diamond size={24} />
            <div>
              <div>Still Deciding? Let Me Help You Find the Right Piece!</div>
              <Link to="#">Describe what you're looking for?</Link>
            </div>
          </AssistanceSection>

          <DeliveryInfo>
            <div>
              <Truck size={24} />
              <div>
                <div>Delivery by Friday, November 22</div>
                <div>Order within 9 hours 10 mins</div>
              </div>
            </div>

            <div>
              <Store size={24} />
              <div>
                <div>Looking to pickup this item?</div>
                <div>See your options.</div>
              </div>
            </div>

            <Link to="#">
              Choose a Store.
            </Link>
          </DeliveryInfo>
        </ProductDetails>
      </ProductLayout>
      
      {/* Accordion sections */}
      <div style={{ maxWidth: '1200px', margin: '40px auto 0' }}>
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "overview" ? "" : "overview")}
          >
            Overview
            {openSection === "overview" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "overview"}>
            <p>{product.description}</p>
            {product.specifications && product.specifications.length > 0 && (
              <SpecificationList>
                {product.specifications.map((spec, index) => (
                  <div key={index}>
                    <span>{spec.name}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </SpecificationList>
            )}
          </AccordionContent>
        </AccordionSection>
        
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "shipping" ? "" : "shipping")}
          >
            Shipping & Returns
            {openSection === "shipping" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "shipping"}>
            <p>We want you to be completely satisfied with your purchase. If you're not happy with your item, you may return it within 30 days of delivery for a full refund of the merchandise value.</p>
            <ul>
              <li>Items must be in their original condition with all original packaging.</li>
              <li>Shipping charges are not refundable.</li>
              <li>Custom orders cannot be returned or exchanged.</li>
              <li>Please allow 5-7 business days for returns to be processed.</li>
            </ul>
          </AccordionContent>
        </AccordionSection>
        
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "details" ? "" : "details")}
          >
            Details
            {openSection === "details" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "details"}>
            <div>
              <p>{product.shortDescription}</p>
              <ul>
                {product.materials && product.materials.map((material, index) => (
                  <li key={index}>Material: {material}</li>
                ))}
                {product.dimensions && (
                  <li>
                    Dimensions: {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} {product.dimensions.unit}
                  </li>
                )}
                {product.weight && (
                  <li>
                    Weight: {product.weight.value} {product.weight.unit}
                  </li>
                )}
              </ul>
            </div>
          </AccordionContent>
        </AccordionSection>
        
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "reviews" ? "" : "reviews")}
          >
            Reviews
            {openSection === "reviews" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "reviews"}>
            <p>No reviews yet. Be the first to leave a review!</p>
            <button
              style={{
                background: '#000',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                marginTop: '16px',
                cursor: 'pointer'
              }}
            >
              Write a Review
            </button>
          </AccordionContent>
        </AccordionSection>
      </div>
      
      {/* Related Products */}
      <RelatedProducts productId={product._id} categoryId={product.category?._id} />
    </PageContainer>
  );
};

export default ProductDetail;