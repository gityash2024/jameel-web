import React, { useState } from "react";
import styled from "styled-components";
import ring_1 from "../assets/ring_1.svg";
import ring_2 from "../assets/ring_2.svg";
import ring_3 from "../assets/ring_3.svg";
import {ChevronLeft, ChevronRight, Share2, Heart, Diamond, Truck, Store,} from "lucide-react";
import labgrowndiamonds from "../assets/labgrowndiamonds.svg";

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px;
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
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 90px 1fr 480px;
  gap: 40px;
`;

const ThumbColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductDetails = styled.div`
  padding-left: 20px;
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
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 24px;
  line-height: 1.2;
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
  border: 1px solid \${props => props.selected ? '#000' : '#e0e0e0'};
  background: \${props => props.selected ? '#000' : '#fff'};
  color: \${props => props.selected ? '#fff' : '#000'};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: #000;
  }
`;

const AddToCartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  margin-top: 30px;
`;

const AddToCartButton = styled.button`
  background: #000;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #333;
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

  &:hover {
    border-color: #000;
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
`;

const ThumbImage = styled.div`
  border: 1px solid \${props => props.active ? '#000' : '#e0e0e0'};
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
`;

const MainImageContainer = styled.div`
  position: relative;
  margin: 0 40px;

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
  }

  .zoom-text {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 12px;
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
`;

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  const thumbnails = [ring_1, ring_2, ring_3];
  const mainImage = labgrowndiamonds;
  const sizes = ["5", "5.25", "5.5", "5.75", "6", "6.25", "6.5", "6.75"];

  const handlePrevImage = () => {
    setCurrentImage((prev) => {
      const newIndex = (prev - 1 + thumbnails.length) % thumbnails.length;
      return newIndex;
    });
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => {
      const newIndex = (prev + 1) % thumbnails.length;
      return newIndex;
    });
  };

  return (
    <PageContainer>
      <Breadcrumb>
        <a href="/">Home</a> / <a href="/rings">Rings</a> / New Arrival Rings
      </Breadcrumb>

      <ProductLayout>
        {/* Thumbnail Column */}
        <ThumbColumn>
          {thumbnails.map((thumbnail, index) => (
            <ThumbImage
              key={index}
              active={currentImage === index}
              onClick={() => setCurrentImage(index)}
            >
              <img src={thumbnail} alt={`Ring view ${index + 1}`} />
            </ThumbImage>
          ))}
        </ThumbColumn>

        <MainImageContainer>
          <NavigationButton className="prev" onClick={handlePrevImage}>
            <ChevronLeft size={20} />
          </NavigationButton>

          <NavigationButton className="next" onClick={handleNextImage}>
            <ChevronRight size={20} />
          </NavigationButton>
          <div className="image-wrapper">
            <img src={mainImage} alt="Lab Grown Diamond Ring" />
          </div>

          <NavigationButton
            className="next"
            onClick={() =>
              setCurrentImage((prev) => (prev + 1) % thumbnails.length)
            }
          >
            <ChevronRight size={20} />
          </NavigationButton>
          <div className="zoom-text">Hover over image to zoom</div>
        </MainImageContainer>

        <ProductDetails>
          <ProductHeader>
            <div className="item-number">
              <span>Item #: B18611903</span>
              <span className="new-tag">New</span>
            </div>
            <Share2 size={20} />
          </ProductHeader>

          <Title>Lab Grown Diamonds by JSK Elegant Ring with Gold</Title>

          <PriceContainer>
            <span className="current">$399.00</span>
            <span className="original">$499.00</span>
            <span className="discount">25% off</span>
          </PriceContainer>

          <a href="#" style={{ color: "#000", textDecoration: "underline" }}>
            View Other Financing Options
          </a>

          <div
            style={{
              margin: "20px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Diamond Total Weights are approximate.</span>
            <a href="#" style={{ color: "#000", textDecoration: "underline" }}>
              View Variance Chart + 4C's
            </a>
          </div>

          <SizeSelector>
            <SizeHeader>
              <span>Select Your Size:</span>
              <a href="#" className="guide">
                Ring Size Guide
              </a>
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

          <AddToCartSection>
            <AddToCartButton>ADD TO BAG</AddToCartButton>
            <WishlistButton>
              <Heart size={20} />
            </WishlistButton>
          </AddToCartSection>

          <AssistanceSection>
            <Diamond size={24} />
            <div>
              <div>Still Deciding? Let Me Help You Find the Right Piece!</div>
              <a href="#">Describe what you're looking for?</a>
            </div>
          </AssistanceSection>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={{ display: "flex", gap: "12px" }}>
              <Truck size={24} />
              <div>
                <div>Delivery by Friday, November 22</div>
                <div style={{ color: "#666" }}>
                  Order within 9 hours 10 mins
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <Store size={24} />
              <div>
                <div>Looking to pickup this item?</div>
                <div style={{ color: "#666" }}>See your options.</div>
              </div>
            </div>

            <a
              href="#"
              style={{
                color: "#000",
                textDecoration: "underline",
                marginTop: "12px",
              }}
            >
              Choose a Store.
            </a>
          </div>
        </ProductDetails>
      </ProductLayout>
    </PageContainer>
  );
};

export default ProductDetail;
