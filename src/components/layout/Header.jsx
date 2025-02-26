import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, HelpCircle, User, Search, ShoppingCart, Heart, ChevronDown, Camera, Menu, X, LogOut } from 'lucide-react';
import { categoryAPI, subcategoryAPI, cartAPI, userAPI } from '../../services/api';
import styled from 'styled-components';

// Styled Components
const CartPreview = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 16px;
  display: ${props => props.$show ? 'block' : 'none'};
  
  @media (max-width: 768px) {
    width: 280px;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
  
  h3 {
    font-size: 16px;
    font-weight: 500;
  }
  
  span {
    font-size: 14px;
    color: #666;
  }
`;

const CartItem = styled.div`
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f7fafc;
  
  .image {
    width: 60px;
    height: 60px;
    border: 1px solid #f0f0f0;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  .details {
    flex: 1;
    
    .title {
      font-size: 14px;
      margin-bottom: 4px;
    }
    
    .price {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .meta {
      font-size: 12px;
      color: #666;
    }
  }
`;

const CartFooter = styled.div`
  margin-top: 12px;
  
  .subtotal {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-weight: 500;
  }
  
  .buttons {
    margin-top: 12px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    
    button {
      padding: 10px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      
      &.view-cart {
        background: white;
        border: 1px solid #e2e8f0;
        
        &:hover {
          background: #f7fafc;
        }
      }
      
      &.checkout {
        background: black;
        color: white;
        border: none;
        
        &:hover {
          background: #333;
        }
      }
    }
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 20px 0;
  
  p {
    color: #666;
    margin-bottom: 12px;
  }
  
  button {
    padding: 10px 20px;
    background: black;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      background: #333;
    }
  }
`;

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [jammelUser, setUserData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCartPreview, setShowCartPreview] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('jammelUser');
    if (token && userDataStr) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(userDataStr));
      
      // Fetch cart and wishlist data
      fetchCartData();
      fetchWishlistData();
    }

    const fetchCategoriesAndSubcategories = async () => {
      try {
        setIsLoading(true);
        const [categoriesRes, subcategoriesRes] = await Promise.all([
          categoryAPI.getAllCategories(),
          subcategoryAPI.getAllSubCategories()
        ]);
        
        setCategories(categoriesRes.data.data || []);
        setSubcategories(subcategoriesRes.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoriesAndSubcategories();
  }, []);
  
  const fetchCartData = async () => {
    try {
      const response = await cartAPI.getCart();
      if (response.data.data && response.data.data.items) {
        setCartItems(response.data.data.items);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  
  const fetchWishlistData = async () => {
    try {
      const response = await userAPI.getWishlist();
      if (response.data.data && response.data.data.wishlist) {
        // Store only product IDs for easier checking
        setWishlistItems(response.data.data.wishlist.map(item => item.product._id || item.product));
      }
    } catch (error) {
      console.error('Error fetching wishlist data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('jammelUser');
    setIsLoggedIn(false);
    setUserData(null);
    setShowProfileModal(false);
    setCartItems([]);
    setWishlistItems([]);
  };

  const dynamicNavigation = [
    ...categories
      .filter(category => category.isActive)
      .map(category => {
     // In HeaderProvider component in Header.jsx
const categorySubcategories = subcategories
.filter(sub => sub.category?._id === category?._id && sub?.isActive)
.map(sub => ({
  name: sub.name,
  // Include category._id as fallback if slug is undefined
  path: `/product-details?category=${category.slug || category._id}&subcategory=${sub._id}`
}));
        return {
          name: category.name,
          path: `/product-details?category=${category.slug}`,
          hasDropdown: categorySubcategories.length > 0,
          dropdownItems: categorySubcategories.length > 0 ? categorySubcategories : null
        };
      }),
    { 
      name: 'Blogs', 
      path: '/blogs-one', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Latest Posts', path: '/blogs-one' },
        { name: 'Style Guide', path: '/blogs-two' },
      ]
    },
    { 
      name: 'Services', 
      path: '/repair-and-maintances', 
      hasDropdown: true,
      dropdownItems: [
        { name: 'Repair & Maintenance', path: '/repair-and-maintances' },
      ]
    }
  ];

  const headerData = {
    utilities: [
      { icon: MapPin, text: "Find a Store", link: "/find-your-store" },
      { icon: HelpCircle, text: "Help Centre", link: "/help-center" }
    ],
    userActions: [
      { text: "Book an Appointment", link: "/booking-appoinment" },
      { text: "Sign In / Create Account", link: "/login", icon: User }
    ],
    logo: {
      text: "JSK",
      subtext: "POWERED BY JAMEEL GROUP AI",
      link: "/"
    },
    navigation: isLoading ? [] : dynamicNavigation
  };
  
  // Calculate cart totals
  const cartSubtotal = cartItems.reduce((total, item) => {
    const itemPrice = item.product?.salePrice || item.product?.regularPrice || 0;
    return total + (itemPrice * item.quantity);
  }, 0);

  return (
    <HeaderContext.Provider value={{
      headerData,
      searchQuery,
      setSearchQuery,
      cartItems,
      setCartItems,
      wishlistItems,
      setWishlistItems,
      isLoggedIn,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isMobileSearchOpen,
      setIsMobileSearchOpen,
      showProfileModal,
      setShowProfileModal,
      jammelUser,
      handleLogout,
      isLoading,
      showCartPreview,
      setShowCartPreview,
      cartSubtotal,
      fetchCartData
    }}>
      {children}
    </HeaderContext.Provider>
  );
};

const ProfileModal = () => {
  const { jammelUser, showProfileModal, setShowProfileModal, handleLogout } = useContext(HeaderContext);
  if (!showProfileModal || !jammelUser) return null;
  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-[100]">
      <div className="p-4 border-b">
        <div className="font-semibold">{jammelUser.data.user.firstName} {jammelUser.data.user.lastName}</div>
        <div className="text-sm text-gray-600">{jammelUser.data.user.email}</div>
      </div>
      <div className="p-2">
        <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">My Profile</Link>
        <Link to="/my-order" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">My Orders</Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

const UtilityNav = () => {
  const { headerData, isLoggedIn, jammelUser } = useContext(HeaderContext);
  const navigate = useNavigate();
  return (
    <div className="border-b hidden md:block">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center gap-4 md:gap-8">
            {headerData.utilities.map((item, index) => (
              <Link 
                key={index} 
                to={item.link}
                className="flex items-center text-sm hover:text-gray-600"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.text}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <Link
              to="/booking-appoinment"
              className="flex items-center text-sm hover:text-gray-600"
            >
              Book an Appointment
            </Link>
            {isLoggedIn ? (
              <div
                className="relative"
                onClick={() => navigate('/my-account')}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex items-center text-sm hover:text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {jammelUser?.data.user.firstName.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-sm hover:text-gray-600"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In / Create Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainHeader = () => {
  const {
    headerData,
    searchQuery,
    setSearchQuery,
    cartItems,
    wishlistItems,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobileSearchOpen,
    setIsMobileSearchOpen,
    showCartPreview,
    setShowCartPreview,
    cartSubtotal,
    isLoggedIn
  } = useContext(HeaderContext);
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product-details?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };
  
  const handleCartHover = () => {
    if (isLoggedIn && cartItems.length > 0) {
      setShowCartPreview(true);
    }
  };
  
  const handleCartLeave = () => {
    setShowCartPreview(false);
  };
  
  const handleViewCart = () => {
    navigate('/card-option');
    setShowCartPreview(false);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
    setShowCartPreview(false);
  };
  
  return (
    <div className="py-4 md:py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex md:grid md:grid-cols-3 items-center gap-4">
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="hidden md:block relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="What can I help you find?"
                className="w-full px-4 py-2 pr-20 border border-gray-300 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 flex items-center gap-2">
                <button type="submit" className="p-1 hover:text-gray-600">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>

          <Link to={headerData.logo.link} className="flex flex-col items-center justify-center flex-grow md:flex-grow-0">
            <h1 className="text-3xl md:text-4xl font-bold">{headerData.logo.text}</h1>
            <p className="text-xs text-gray-500 mt-1 text-center">{headerData.logo.subtext}</p>
          </Link>

          <div className="flex justify-end items-center gap-4">
            <button 
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 hover:text-gray-600"
            >
              <Search className="w-6 h-6" />
            </button>
            
            <div 
              className="relative" 
              onMouseEnter={handleCartHover}
              onMouseLeave={handleCartLeave}
            >
              <Link to="/card-option" className="relative hover:text-gray-600">
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              
              <CartPreview $show={showCartPreview}>
              <CartHeader>
                  <h3>Shopping Bag</h3>
                  <span>{cartItems.length} items</span>
                </CartHeader>
                
                {cartItems.length === 0 ? (
                  <EmptyCart>
                    <p>Your shopping bag is empty</p>
                    <button onClick={() => navigate('/product-details')}>
                      Shop Now
                    </button>
                  </EmptyCart>
                ) : (
                  <>
                    <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                      {cartItems.slice(0, 3).map(item => (
                        <CartItem key={item._id}>
                          <div className="image">
                            <img 
                              src={item.product?.images?.[0]?.url || '/placeholder.png'} 
                              alt={item.product?.name} 
                            />
                          </div>
                          <div className="details">
                            <div className="title">
                              {item.product?.name}
                            </div>
                            <div className="price">
                              ${(item.product?.salePrice || item.product?.regularPrice).toFixed(2)}
                            </div>
                            <div className="meta">
                              Qty: {item.quantity}
                              {item.attributes && item.attributes.length > 0 && (
                                <span> • {item.attributes[0].name}: {item.attributes[0].value}</span>
                              )}
                            </div>
                          </div>
                        </CartItem>
                      ))}
                      
                      {cartItems.length > 3 && (
                        <div style={{ padding: '8px 0', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                          +{cartItems.length - 3} more items
                        </div>
                      )}
                    </div>
                    
                    <CartFooter>
                      <div className="subtotal">
                        <span>Subtotal:</span>
                        <span>${cartSubtotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="buttons">
                        <button className="view-cart" onClick={handleViewCart}>
                          View Bag
                        </button>
                        <button className="checkout" onClick={handleCheckout}>
                          Checkout
                        </button>
                      </div>
                    </CartFooter>
                  </>
                )}
              </CartPreview>
            </div>
            
            <Link to="/favorites" className="relative hover:text-gray-600">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="What can I help you find?"
                className="w-full px-4 py-2 pr-20 border border-gray-300 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="p-2 hover:text-gray-600 -ml-10">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const MobileNavigation = () => {
  const { headerData, isMobileMenuOpen } = useContext(HeaderContext);
  const [expandedItems, setExpandedItems] = useState([]);
  const location = useLocation();

  const toggleExpanded = (index) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed top-[148px] left-0 w-full h-[calc(100vh-148px)] bg-white overflow-y-auto z-50">
      <div className="container mx-auto px-4">
        {headerData.navigation.map((item, index) => (
          <div key={index} className="border-b">
            <div className="flex items-center justify-between py-3">
              <Link
                to={item.path}
                className={`text-sm ${location.pathname === item.path ? 'font-semibold' : ''}`}
              >
                {item.name}
              </Link>
              {item.hasDropdown && (
                <button
                  onClick={() => toggleExpanded(index)}
                  className="p-2"
                >
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      expandedItems.includes(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}
            </div>
            {item.hasDropdown && expandedItems?.includes(index) && item.dropdownItems && (
              <div className="bg-gray-50 px-4 py-2">
                {item.dropdownItems.map((dropItem, dropIndex) => (
                  <Link
                    key={dropIndex}
                    to={dropItem.path}
                    className="block py-2 text-sm text-gray-600"
                  >
                    {dropItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Navigation = () => {
  const { headerData } = useContext(HeaderContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const handleMouseEnter = (index) => {
    if (headerData.navigation[index]?.hasDropdown) {
      setActiveDropdown(index);
    }
  };

  // New function to handle mouse leave only when not hovering dropdown
  const handleNavItemMouseLeave = (e, index) => {
    // Check if the mouse is moving to the dropdown
    const relatedTarget = e.relatedTarget;
    const dropdown = document.getElementById(`dropdown-${index}`);
    
    if (!dropdown || !dropdown.contains(relatedTarget)) {
      setActiveDropdown(null);
    }
  };

  return (
    <div className="bg-gray-100 relative hidden md:block">
      <div className="container mx-auto">
        <nav className="flex justify-center flex-wrap">
          {headerData.navigation.map((item, index) => (
            <div
              key={index}
              className="relative group mx-1"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={(e) => handleNavItemMouseLeave(e, index)}
            >
              <div
                className={`px-3 py-3 text-sm hover:text-gray-600 flex items-center whitespace-nowrap cursor-pointer ${
                  location.pathname === item.path ? 'text-gray-900 font-semibold' : ''
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </div>
              {item.hasDropdown && activeDropdown === index && item.dropdownItems && (
                <div 
                  id={`dropdown-${index}`}
                  className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-b mt-0 py-2 z-50"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.dropdownItems.map((dropItem, dropIndex) => (
                    <Link
                      key={dropIndex}
                      to={dropItem.path}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {dropItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <HeaderProvider>
      <header className="w-full relative">
        <UtilityNav />
        <MainHeader />
        <Navigation />
        <MobileNavigation />
      </header>
    </HeaderProvider>
  );
};

export default Header;