import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, ChevronDown, ChevronUp, Diamond } from 'lucide-react';
import ring_1 from '../assets/ring_1.svg';
import ring_2 from '../assets/ring_2.svg';
import ring_3 from '../assets/ring_3.svg';
import ring_4 from '../assets/ring_4.svg';
import ring_5 from '../assets/ring_5.svg';
import ring_6 from '../assets/ring_6.svg';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
`;
const BreadCrumb = styled.div`
  margin-bottom: 30px;
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
const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;
const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const SearchHelp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  
  a {
    color: #000;
    text-decoration: underline;
  }
`;
const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
`;

const FilterSidebar = styled.div`
  padding-right: 20px;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  
  button {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 0 10px;
`;
const ProductCard = styled.div`
  border: 1px solid #eee;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;

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
`;

const WishlistButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #666;

  &:hover {
    color: #000;
  }
`;

const ProductTitle = styled.h3`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 8px;
  color: #333;
`;

const SaleTag = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  .current-price {
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
  
  .original-price {
    text-decoration: line-through;
    color: #666;
    font-size: 14px;
  }
  
  .discount {
    background: #e8f4f0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
  }
`;




// const ProductCard = styled.div`
//   border: 1px solid #eee;
//   padding: 24px;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   transition: box-shadow 0.3s ease;

//   &:hover {
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   }
  
//   .image-container {
//     position: relative;
//     width: 100%;
//     padding-bottom: 100%;
//     margin-bottom: 20px;
    
//     img {
//       position: absolute;
//       top: 0;
//       left: 0;
//       width: 100%;
//       height: 100%;
//       object-fit: contain;
//     }
//   }
// `;

// const FeaturedTag = styled.div`
//   position: absolute;
//   top: 20px;
//   right: 50px;
//   font-size: 12px;
//   color: #666;
//   background: white;
//   padding: 4px 8px;
//   border-radius: 2px;
//   z-index: 1;
// `;

// const WishlistButton = styled.button`
//   position: absolute;
//   top: 16px;
//   right: 16px;
//   background: white;
//   border: none;
//   cursor: pointer;
//   padding: 6px;
//   border-radius: 50%;
//   z-index: 1;
  
//   &:hover {
//     background: #f5f5f5;
//   }
// `;

// const ProductTitle = styled.h3`
//   font-size: 14px;
//   line-height: 1.4;
//   margin-bottom: 16px;
//   flex-grow: 1;
//   color: #333;
// `;

// const PriceInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
  
//   .current-price {
//     font-size: 18px;
//     font-weight: bold;
//     color: #000;
//   }
  
//   .original-price {
//     text-decoration: line-through;
//     color: #666;
//     font-size: 14px;
//   }
  
//   .discount {
//     background: #e8f4f0;
//     padding: 4px 8px;
//     border-radius: 4px;
//     font-size: 12px;
//     color: #000;
//   }
// `;



const PriceRange = styled.div`
  margin: 15px 0;
  
  .slider-container {
    margin: 20px 0;
    position: relative;
  }
  
  .range-inputs {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
  
  input[type="number"] {
    width: 100px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .range-track {
    height: 2px;
    background: #ddd;
    position: relative;
    margin: 10px 0;
  }

  .range-handle {
    width: 16px;
    height: 16px;
    background: white;
    border: 2px solid #000;
    border-radius: 50%;
    position: absolute;
    top: -7px;
    cursor: pointer;
  }
`;

// const ProductGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 24px;
// `;

// const ProductCard = styled.div`
//   border: 1px solid #eee;
//   padding: 20px;
//   position: relative;
  
//   img {
//     width: 100%;
//     height: auto;
//     margin-bottom: 15px;
//   }
// `;

// const FeaturedTag = styled.div`
//   position: absolute;
//   top: 20px;
//   right: 50px;
//   font-size: 12px;
//   color: #666;
// `;

// const WishlistButton = styled.button`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 5px;
// `;

// const ProductTitle = styled.h3`
//   font-size: 14px;
//   line-height: 1.4;
//   margin-bottom: 15px;
// `;

// const PriceInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
  
//   .current-price {
//     font-size: 18px;
//     font-weight: bold;
//   }
  
//   .original-price {
//     text-decoration: line-through;
//     color: #666;
//   }
  
//   .discount {
//     background: #e8f4f0;
//     padding: 4px 8px;
//     border-radius: 4px;
//     font-size: 12px;
//   }
// `;
const FilterOptions = styled.div`
  padding: 8px 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
  transition: all 0.3s ease;
`;

const FilterOption = styled.div`
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  
  label {
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
`;
const FilterSection = styled.div`
  border-bottom: 1px solid #eee;
  padding: 12px 0;
`;

const FilterTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 4px 0;
  
  h3 {
    font-size: 16px;
    color: #333;
  }

  svg {
    color: #666;
  }
`;

const PriceRangeContent = styled.div`
  padding: 16px 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const InputLabel = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const RangeInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const RangeSlider = styled.div`
  position: relative;
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  margin: 40px 0 20px;

  .track {
    position: absolute;
    height: 100%;
    background: #000;
    left: 0;
    right: 50%;
  }

  .handle {
    width: 16px;
    height: 16px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 50%;
    position: absolute;
    top: -7px;
    cursor: pointer;
    
    &:first-of-type {
      left: 0;
    }
    
    &:last-of-type {
      right: 0;
    }
  }
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
`;

const ProductDetail = () => {
  const [openFilters, setOpenFilters] = useState({});
  const [priceRange, setPriceRange] = useState({ min: 125, max: 10245 });

  const filterCategories = [
    {
      id: 'offersDiscounts',
      title: 'Offers & Discounts',
      options: ['On Sale', 'New Arrivals', 'Limited Time']
    },
    {
      id: 'gender',
      title: 'Gender',
      options: ['Men', 'Women', 'Unisex']
    },
    {
      id: 'style',
      title: 'Style',
      options: ['Classic', 'Modern', 'Vintage', 'Contemporary']
    },
    {
      id: 'ringSize',
      title: 'Ring Size',
      options: ['4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    {
      id: 'ringStyle',
      title: 'Ring Style',
      options: ['Solitaire', 'Halo', 'Three Stone', 'Eternity', 'Vintage']
    },
    {
      id: 'metalColor',
      title: 'Metal Color',
      options: ['Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum']
    },
    {
      id: 'metalType',
      title: 'Metal Type',
      options: ['10K Gold', '14K Gold', '18K Gold', 'Platinum']
    },
    {
      id: 'goldKarat',
      title: 'Gold Karat',
      options: ['10K', '14K', '18K', '22K']
    },
    {
      id: 'stoneType',
      title: 'Stone Type',
      options: ['Diamond', 'Sapphire', 'Ruby', 'Emerald']
    },
    {
      id: 'stoneShape',
      title: 'Stone Shape',
      options: ['Round', 'Princess', 'Oval', 'Cushion', 'Pear']
    },
    {
      id: 'stoneColor',
      title: 'Stone Color',
      options: ['White', 'Blue', 'Pink', 'Yellow', 'Green']
    },
    {
      id: 'stoneNature',
      title: 'Stone Nature',
      options: ['Natural', 'Lab-Created']
    },
    {
      id: 'pearlType',
      title: 'Pearl Type',
      options: ['Freshwater', 'Akoya', 'South Sea', 'Tahitian']
    },
    {
      id: 'collections',
      title: 'Collections',
      options: ['Bridal', 'Fashion', 'Designer', 'Classic']
    },
    {
      id: 'caratRange',
      title: 'Carat Range',
      options: ['0.25-0.50', '0.50-1.00', '1.00-2.00', '2.00+']
    },
    {
      id: 'centerStoneWeight',
      title: 'Center Stone Total Weight',
      options: ['Under 0.50', '0.50-1.00', '1.00-2.00', 'Over 2.00']
    },
    {
      id: 'customerRating',
      title: 'Customer Rating',
      options: ['★★★★★', '★★★★☆ & up', '★★★☆☆ & up']
    },
    {
      id: 'certifies',
      title: 'Certifies',
      options: ['IGI Certified', 'GIA Certified', 'AGS Certified']
    },
    {
      id: 'subCollections',
      title: 'Sub Collections',
      options: ['Wedding', 'Anniversary', 'Engagement', 'Fashion']
    }
  ];

  const products = [
    {
      id: 1,
      image: ring_1,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true
    },
    {
      id: 2,
      image: ring_2,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true
    },
    {
      id: 3,
      image: ring_3,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true
    },
    {
      id: 4,
      image: ring_4,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true
    },
    {
      id: 5,
      image: ring_5,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true
    },
    {
      id: 6,
      image: ring_6,
      title: "Memories, Moments, Magic Princess-Cut Diamond Three-Stone Engagement Ring 1 ct tw 10K White Gold",
      currentPrice: 149.99,
      originalPrice: 199.00,
      discount: "25% off",
      featured: true
    },
  ];

  const toggleFilter = (filterId) => {
    setOpenFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  return (
    <Container>
       <BreadCrumb>
        <a href="/">Home</a> / <a href="/rings">Rings</a> / New Arrival Rings
      </BreadCrumb>
      <PageHeader>
        <Title>New Arrivals Rings</Title>
        <SearchHelp>
          <Diamond size={16} /> 506 results too many? Our Jewelry Assistant can help! 
          <a href="#">Describe what you're looking for?</a>
        </SearchHelp>
      </PageHeader>
      <MainGrid>
        <FilterSidebar>
          <FilterHeader>
            <h2>Filters</h2>
            <button onClick={() => setOpenFilters({})}>Reset</button>
          </FilterHeader>

          {filterCategories.map(category => (
            <FilterSection key={category.id}>
              <FilterTitle onClick={() => toggleFilter(category.id)}>
                <h3>{category.title}</h3>
                {openFilters[category.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </FilterTitle>
              
              <FilterOptions isOpen={openFilters[category.id]}>
                {category.options.map(option => (
                  <FilterOption key={option}>
                    <input type="checkbox" id={option} />
                    <label htmlFor={option}>{option}</label>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>
          ))}
          
          <FilterSection>
          <FilterTitle onClick={() => toggleFilter('price')}>
    <h3>Price</h3>
    {openFilters.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
  </FilterTitle>
            <PriceRangeContent isOpen={openFilters.price}>
    <InputGroup>
      <InputRow>
        <div>
          <InputLabel>Min. Amount</InputLabel>
          <RangeInput
            type="number"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            placeholder="125"
          />
        </div>
        <div>
          <InputLabel>Min. Amount</InputLabel>
          <RangeInput
            type="number"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            placeholder="125"
          />
        </div>
      </InputRow>
    </InputGroup>
    
    <RangeSlider>
      <div className="track" />
      <div className="handle" />
      <div className="handle" />
    </RangeSlider>
    
    <RangeValues>
      <span>10245.00</span>
      <span>10245.00</span>
    </RangeValues>
  </PriceRangeContent>
          </FilterSection>
        </FilterSidebar>

        <ProductGrid>
  {products.map(product => (
    <ProductCard key={product.id}>
      <ProductHeader>
        <FeaturedTag>Featured Item</FeaturedTag>
        <WishlistButton>
          <Heart size={18} />
        </WishlistButton>
      </ProductHeader>
      
      <div className="image-container">
        <img src={product.image} alt={product.title} />
      </div>
      
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

      </MainGrid>
    </Container>
  );
};

export default ProductDetail;