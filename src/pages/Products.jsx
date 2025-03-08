import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Diamond, Heart, ChevronDown, ChevronUp, X, Check } from "lucide-react";
import { productAPI, userAPI } from "../services/api";
import { toast } from "react-hot-toast";
import { HeaderContext } from "../components/layout/Header";

const defaultContextValues = {
  wishlistItems: [],
  setWishlistItems: () => {},
  isLoggedIn: false
};

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const BreadCrumb = styled.div`
  margin-bottom: 30px;
  font-size: 14px;
  color: #666;
  @media (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 12px;
  }
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
  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const SearchHelp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
    flex-wrap: wrap;
    text-align: center;
  }
  a {
    color: #000;
    text-decoration: underline;
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  @media (max-width: 1024px) {
    grid-template-columns: 250px 1fr;
    gap: 24px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const FilterSidebar = styled.div`
  padding-right: 20px;
  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

const MobileSidebarToggle = styled.button`
  display: none;
  width: 100%;
  padding: 12px 16px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 16px;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  h2 {
    font-size: 20px;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 18px;
    }
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
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    padding: 0;
  }
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProductCard = styled.div`
  border: 1px solid #eee;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
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

const FilterOptions = styled.div`
  padding: 8px 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
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
    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
    }
  }
  label {
    font-size: 14px;
    color: #666;
    cursor: pointer;
    @media (max-width: 768px) {
      font-size: 13px;
    }
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
    @media (max-width: 768px) {
      font-size: 15px;
    }
  }
  svg {
    color: #666;
  }
`;

const PriceRangeContent = styled.div`
  padding: 16px 0;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const InputLabel = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const RangeInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  @media (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
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
    left: ${props => props.leftPercent}%;
    right: ${props => 100 - props.rightPercent}%;
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
      left: ${props => props.leftPercent}%;
      transform: translateX(-50%);
    }
    &:last-of-type {
      right: ${props => 100 - props.rightPercent}%;
      transform: translateX(50%);
    }
    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
      top: -6px;
    }
  }
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  
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

const NoResults = styled.div`
  text-align: center;
  padding: 40px 0;
  
  h3 {
    font-size: 18px;
    margin-bottom: 12px;
  }
  
  p {
    color: #666;
    margin-bottom: 24px;
  }
  
  button {
    padding: 10px 20px;
    background: #000;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      background: #333;
    }
  }
`;

const MobileSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 1000;
  overflow-y: auto;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const MobileSidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
  
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }
`;

const MobileSidebarContent = styled.div`
  padding: 16px;
  flex: 1;
  overflow-y: auto;
`;

const MobileSidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  
  button {
    padding: 12px 16px;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    width: 48%;
    
    &:first-child {
      background: white;
      border: 1px solid #e0e0e0;
      color: #333;
    }
    
    &:last-child {
      background: black;
      border: none;
      color: white;
    }
  }
`;

const CompareButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #000;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  
  &:hover {
    background: #333;
  }
  
  &:disabled {
    background: #999;
    cursor: not-allowed;
  }
`;

const CompareCheckbox = styled.div`
  position: absolute;
  top: 18px;
  right: 60px;
  z-index: 5;
  
  input {
    display: none;
  }
  
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.checked ? '#000' : '#fff'};
    border: 1px solid ${props => props.checked ? '#000' : '#ddd'};
    cursor: pointer;
    transition: all 0.2s ease;
    
    svg {
      color: #fff;
      width: 16px;
      height: 16px;
    }
  }
`;

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems } = useContext(HeaderContext) || defaultContextValues;

  let isLoggedIn=false;
  const token = localStorage.getItem('token');
  const userDataStr = localStorage.getItem('jammelUser');
  if (token && userDataStr) {
    isLoggedIn=true;
  }
  
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [openFilters, setOpenFilters] = useState({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: 0, max: 10000 });
  const [categoryData, setCategoryData] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [compareProducts, setCompareProducts] = useState([]);
  
  const searchParams = new URLSearchParams(location.search);
  const categorySlug = searchParams.get('category');
  const subcategorySlug = searchParams.get('subcategory');
  const searchQuery = searchParams.get('search');
  
  const [filters, setFilters] = useState({
    brands: [],
    styles: [],
    materials: [],
    priceRange: { min: 0, max: 10000 },
    sortBy: 'newest'
  });
  
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    styles: [],
    materials: [],
    offers: [
      { id: 'onSale', name: 'On Sale' },
      { id: 'newArrivals', name: 'New Arrivals' },
      { id: 'featured', name: 'Featured Items' }
    ],
    sortOptions: [
      { id: 'newest', name: 'Newest First' },
      { id: 'price_asc', name: 'Price: Low to High' },
      { id: 'price_desc', name: 'Price: High to Low' },
      { id: 'name_asc', name: 'Name: A to Z' },
      { id: 'name_desc', name: 'Name: Z to A' },
      { id: 'popular', name: 'Popularity' }
    ]
  });
  
  const filterCategories = [
    {
      id: "offersDiscounts",
      title: "Offers & Discounts",
      options: filterOptions.offers
    },
    {
      id: "brands",
      title: "Brands",
      options: filterOptions.brands
    },
    {
      id: "styles",
      title: "Styles",
      options: filterOptions.styles
    },
    {
      id: "materials",
      title: "Materials",
      options: filterOptions.materials
    }
  ];
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let response;
        
        if (searchQuery) {
          response = await productAPI.searchProducts({ q: searchQuery });
        } else if (subcategorySlug) {
          response = await productAPI.getAllProducts({ subcategory: subcategorySlug });
          setCategoryData({ name: "Products" });
        } else if (categorySlug && categorySlug !== "undefined") {
          response = await productAPI.getProductsByCategory(categorySlug);
          setCategoryData(response.data.data.category);
        } else {
          response = await productAPI.getAllProducts();
        }
        
        if (response.data.data.products) {
          setProducts(response.data.data.products);
          setFilteredProducts(response.data.data.products);
          setTotalProducts(response.data.total || response.data.results || response.data.data.products.length);
        }
        
        extractFilterOptions(response.data.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categorySlug, subcategorySlug, searchQuery]);
  
  const extractFilterOptions = (products) => {
    const brands = new Set();
    const styles = new Set();
    const materials = new Set();
    
    products.forEach(product => {
      if (product.brand) brands.add(product.brand);
      
      if (product.attributes) {
        product.attributes.forEach(attr => {
          if (attr.name.toLowerCase() === 'style') styles.add(attr.value);
          if (attr.name.toLowerCase() === 'material') materials.add(attr.value);
        });
      }
      
      if (product.materials && Array.isArray(product.materials)) {
        product.materials.forEach(material => materials.add(material));
      }
    });
    
    setFilterOptions(prev => ({
      ...prev,
      brands: Array.from(brands).map(brand => ({ id: brand, name: brand })),
      styles: Array.from(styles).map(style => ({ id: style, name: style })),
      materials: Array.from(materials).map(material => ({ id: material, name: material }))
    }));
  };
  
  const toggleFilter = (filterId) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };
  
  const handleFilterChange = (category, itemId) => {
    setFilters(prev => {
      const currentFilters = [...prev[category]];
      
      if (currentFilters.includes(itemId)) {
        return {
          ...prev,
          [category]: currentFilters.filter(id => id !== itemId)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentFilters, itemId]
        };
      }
    });
  };
  
  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: Number(value) || 0
    }));
  };
  
  const applyFilters = () => {
    setAppliedPriceRange({...priceRange});
    
    let filtered = [...products];
    
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.regularPrice;
      return price >= priceRange.min && price <= priceRange.max;
    });
    
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
    if (filters.styles.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.attributes) return false;
        return product.attributes.some(attr => 
          attr.name.toLowerCase() === 'style' && filters.styles.includes(attr.value)
        );
      });
    }
    
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product => {
        if (product.attributes && product.attributes.some(attr => 
          attr.name.toLowerCase() === 'material' && filters.materials.includes(attr.value)
        )) {
          return true;
        }
        
        if (product.materials && Array.isArray(product.materials)) {
          return product.materials.some(material => filters.materials.includes(material));
        }
        
        return false;
      });
    }
    
    setFilteredProducts(filtered);
    setIsMobileSidebarOpen(false);
  };
  
  const resetFilters = () => {
    setFilters({
      brands: [],
      styles: [],
      materials: [],
      priceRange: { min: 0, max: 10000 },
      sortBy: 'newest'
    });
    setPriceRange({ min: 0, max: 10000 });
    setAppliedPriceRange({ min: 0, max: 10000 });
    setFilteredProducts(products);
    setIsMobileSidebarOpen(false);
  };
  
  const handleWishlistToggle = async (product, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      toast.error('Please login to add items to your wishlist');
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }
    
    try {
      const isCurrentlyInWishlist = wishlistItems.includes(product._id);
      
      if (isCurrentlyInWishlist) {
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
      console.error('Wishlist error:', error);
    }
  };
  
  const handleProductClick = (product) => {
    // Previously using product.slug which might be undefined
    // Now using product._id which is always present
    navigate(`/products/${product._id}`);
  };
  
  const minPrice = 0;
  const maxPrice = 10000;
  const priceSpan = maxPrice - minPrice;
  const leftPercent = ((priceRange.min - minPrice) / priceSpan) * 100;
  const rightPercent = ((priceRange.max - minPrice) / priceSpan) * 100;
  
  const pageTitle = searchQuery 
    ? `Search Results for "${searchQuery}"` 
    : categoryData?.name || "All Products";
  
  const handleCompareToggle = (product, e) => {
    e.stopPropagation();
    
    setCompareProducts(prev => {
      const isAlreadyAdded = prev.some(p => p._id === product._id);
      
      if (isAlreadyAdded) {
        return prev.filter(p => p._id !== product._id);
      } else {
        if (prev.length >= 5) {
          toast.error('You can compare maximum 5 products at once');
          return prev;
        }
        return [...prev, product];
      }
    });
  };
  
  const navigateToCompare = () => {
    if (compareProducts.length < 2) {
      toast.error('Please select at least 2 products to compare');
      return;
    }
    
    // Pass the full products data through state
    navigate(`/product-compare`, {
      state: { 
        products: compareProducts
      }
    });
  };
  
  const renderMobileSidebar = () => (
    <MobileSidebar isOpen={isMobileSidebarOpen}>
      <MobileSidebarHeader>
        <h2>Filters</h2>
        <button onClick={() => setIsMobileSidebarOpen(false)}>
          <X size={24} />
        </button>
      </MobileSidebarHeader>
      
      <MobileSidebarContent>
        <FilterSection>
          <FilterTitle onClick={() => toggleFilter("price")}>
            <h3>Price</h3>
            {openFilters.price ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </FilterTitle>
          <PriceRangeContent isOpen={openFilters.price}>
            <InputGroup>
              <InputRow>
                <div>
                  <InputLabel>Min. Amount</InputLabel>
                  <RangeInput
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <InputLabel>Max. Amount</InputLabel>
                  <RangeInput
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    placeholder="10000"
                  />
                </div>
              </InputRow>
            </InputGroup>

            <RangeSlider leftPercent={leftPercent} rightPercent={rightPercent}>
              <div className="track" />
              <div className="handle" />
              <div className="handle" />
            </RangeSlider>

            <RangeValues>
              <span>${priceRange.min}</span>
              <span>${priceRange.max}</span>
            </RangeValues>
          </PriceRangeContent>
        </FilterSection>
        
        {filterCategories.map((category) => (
          <FilterSection key={category.id}>
            <FilterTitle onClick={() => toggleFilter(category.id)}>
              <h3>{category.title}</h3>
              {openFilters[category.id] ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </FilterTitle>

            <FilterOptions isOpen={openFilters[category.id]}>
              {category?.options?.map((option) => (
                <FilterOption key={option.id}>
                  <input 
                    type="checkbox" 
                    id={`mobile-${option.id}`}
                    checked={filters[category?.id?.toLowerCase()]?.includes(option.id)}
                    onChange={() => handleFilterChange(category.id.toLowerCase(), option.id)}
                  />
                  <label htmlFor={`mobile-${option.id}`}>{option.name}</label>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterSection>
        ))}
      </MobileSidebarContent>
      
      <MobileSidebarFooter>
        <button onClick={resetFilters}>
          Reset
        </button>
        <button onClick={applyFilters}>
          Apply Filters
        </button>
      </MobileSidebarFooter>
    </MobileSidebar>
  );

  return (
    <Container>
      <BreadCrumb>
        <a href="/">Home</a> / 
        {categoryData && <><a href={`/product-details?category=${categorySlug}`}>{categoryData.name}</a> / </>}
        {searchQuery ? <span>Search Results</span> : <span>Products</span>}
      </BreadCrumb>
      
      <PageHeader>
        <Title>{pageTitle}</Title>
        <SearchHelp>
          <Diamond size={16} /> {totalProducts} items found
          <a href="#">Need help finding the perfect piece?</a>
        </SearchHelp>
      </PageHeader>
      
      <MobileSidebarToggle onClick={() => setIsMobileSidebarOpen(true)}>
        Filters
        <ChevronDown size={16} />
      </MobileSidebarToggle>
      
      {renderMobileSidebar()}
      
      <MainGrid>
        <FilterSidebar>
          <FilterHeader>
            <h2>Filters</h2>
            <button onClick={resetFilters}>Reset</button>
          </FilterHeader>

          <FilterSection>
            <FilterTitle onClick={() => toggleFilter("price")}>
              <h3>Price</h3>
              {openFilters.price ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </FilterTitle>
            <PriceRangeContent isOpen={openFilters.price}>
              <InputGroup>
                <InputRow>
                  <div>
                    <InputLabel>Min. Amount</InputLabel>
                    <RangeInput
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <InputLabel>Max. Amount</InputLabel>
                    <RangeInput
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      placeholder="10000"
                    />
                  </div>
                </InputRow>
              </InputGroup>

              <RangeSlider leftPercent={leftPercent} rightPercent={rightPercent}>
                <div className="track" />
                <div className="handle" />
                <div className="handle" />
              </RangeSlider>

              <RangeValues>
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
              </RangeValues>
              
              <button 
                onClick={applyFilters}
                style={{
                  background: '#000',
                  color: '#fff',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  marginTop: '16px',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Apply Price Filter
              </button>
            </PriceRangeContent>
          </FilterSection>

          {filterCategories.map((category) => (
            <FilterSection key={category.id}>
              <FilterTitle onClick={() => toggleFilter(category.id)}>
                <h3>{category.title}</h3>
                {openFilters[category.id] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </FilterTitle>

              <FilterOptions isOpen={openFilters[category.id]}>
                {category.options.map((option) => (
                  <FilterOption key={option.id}>
                    <input 
                      type="checkbox" 
                      id={option.id}
                      checked={filters[category.id.toLowerCase()]?.includes(option.id)}
                      onChange={() => handleFilterChange(category.id.toLowerCase(), option.id)}
                    />
                    <label htmlFor={option.id}>{option.name}</label>
                  </FilterOption>
                ))}
              </FilterOptions>
            </FilterSection>
          ))}
        </FilterSidebar>

        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length === 0 ? (
          <NoResults>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button onClick={resetFilters}>Clear all filters</button>
          </NoResults>
        ) : (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id}>
                <CompareCheckbox checked={compareProducts.some(p => p._id === product._id)}>
                  <input 
                    type="checkbox" 
                    id={`compare-${product._id}`}
                    checked={compareProducts.some(p => p._id === product._id)}
                    onChange={(e) => handleCompareToggle(product, e)}
                  />
                  <label htmlFor={`compare-${product._id}`}>
                    {compareProducts.some(p => p._id === product._id) && <Check size={16} />}
                  </label>
                </CompareCheckbox>
                
                <ProductHeader>
                  {product.isFeatured && <FeaturedTag>Featured Item</FeaturedTag>}
                  <WishlistButton 
                    active={wishlistItems?.includes(product._id)}
                    onClick={(e) => handleWishlistToggle(product, e)}
                  >
                    <Heart size={25} fill={wishlistItems.includes(product._id) ? "#ED4956" : "none"} />
                  </WishlistButton>
                </ProductHeader>
                <div 
  className="image-container"
  onClick={() => handleProductClick(product)}
  style={{ cursor: 'pointer' }}
>
  <img 
    src={product.images?.[0]?.url || '/placeholder.png'} 
    alt={product.name} 
  />
</div>

<ProductTitle onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
  {product.name}
</ProductTitle>

                <ProductTitle onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
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
        )}
      </MainGrid>
      
      {compareProducts.length > 0 && (
        <CompareButton 
          onClick={navigateToCompare}
          disabled={compareProducts.length < 2}
        >
          Compare {compareProducts.length} Products
        </CompareButton>
      )}
    </Container>
  );
};

export default Products;