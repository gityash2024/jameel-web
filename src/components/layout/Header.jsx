import React, { createContext, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, HelpCircle, User, Search, ShoppingCart, Heart, ChevronDown, Camera, Menu, X } from 'lucide-react';

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const headerData = {
    topBanner: {
      text: "Early Black Friday. Up to 40% Off Everything",
      backgroundColor: "#E10002"
    },
    utilities: [
      { icon: MapPin, text: "Find a Store", link: "/search-in-store" },
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
    navigation: [
      { name: 'Home', path: '/', hasDropdown: false },
      { 
        name: 'New Arrivals', 
        path: '/new-arrivals', 
        hasDropdown: true,
        dropdownItems: [
          { name: 'Latest Collection', path: '/new-arrivals' },
          { name: 'Trending Now', path: '/products' }
        ]
      },
      { 
        name: 'Collections', 
        path: '/collection', 
        hasDropdown: true,
        dropdownItems: [
          { name: 'Featured', path: '/collection' },
          { name: 'Seasonal', path: '/collectiontwo' }
        ]
      },
      { 
        name: 'Rings', 
        path: '/ring', 
        hasDropdown: true,
        dropdownItems: [
          { name: 'Engagement Rings', path: '/ring' },
          { name: 'Wedding Bands', path: '/products' }
        ]
      },
      { name: 'Necklace', path: '/products', hasDropdown: true },
      { name: 'Bracelets', path: '/productstwo', hasDropdown: true },
      { name: 'Earrings', path: '/home-erraring', hasDropdown: true },
      { 
        name: 'Personalized', 
        path: '/custom-jewelry', 
        hasDropdown: true,
        dropdownItems: [
          { name: 'Custom Design', path: '/custom-jewelry' },
          { name: 'Engraving', path: '/custom-jewelrytwo' }
        ]
      },
      { 
        name: 'Blogs', 
        path: '/blogs-one', 
        hasDropdown: true,
        dropdownItems: [
          { name: 'Latest Posts', path: '/blogs-one' },
          { name: 'Style Guide', path: '/blogs-two' },
          { name: 'Care Tips', path: '/blogs-three' },
          { name: 'News', path: '/blogs-four' }
        ]
      },
      { 
        name: 'Services', 
        path: '/repair-and-maintances', 
        hasDropdown: true,
        dropdownItems: [
          { name: 'Repair & Maintenance', path: '/repair-and-maintances' },
          { name: 'Sizing & Adjustment', path: '/services' }
        ]
      }
    ]
  };

  return (
    <HeaderContext.Provider value={{
      headerData,
      searchQuery,
      setSearchQuery,
      cartItems,
      wishlistItems,
      isLoggedIn,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      isMobileSearchOpen,
      setIsMobileSearchOpen
    }}>
      {children}
    </HeaderContext.Provider>
  );
};

const TopBanner = () => {
  const { headerData } = useContext(HeaderContext);
  return (
    <div className="w-full py-2 text-center text-white text-sm md:text-base px-4" style={{ backgroundColor: headerData.topBanner.backgroundColor }}>
      {headerData.topBanner.text}
    </div>
  );
};

const UtilityNav = () => {
  const { headerData } = useContext(HeaderContext);
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
            {headerData.userActions.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="flex items-center text-sm hover:text-gray-600"
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.text}
              </Link>
            ))}
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
    setIsMobileSearchOpen
  } = useContext(HeaderContext);
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
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
                <button type="button" className="p-1 hover:text-gray-600">
                  <Camera className="w-5 h-5 text-gray-400" />
                </button>
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
            <Link to="/cart" className="relative hover:text-gray-600">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link to="/my-account" className="relative hover:text-gray-600">
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
            {item.hasDropdown && expandedItems.includes(index) && item.dropdownItems && (
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
  
  return (
    <div className="bg-gray-100 relative hidden md:block">
      <div className="container mx-auto">
        <nav className="flex justify-center">
          {headerData.navigation.map((item, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.path}
                className={`px-4 md:px-6 py-3 text-sm hover:text-gray-600 flex items-center whitespace-nowrap ${
                  location.pathname === item.path ? 'text-gray-900 font-semibold' : ''
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </Link>
              {item.hasDropdown && activeDropdown === index && item.dropdownItems && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-b mt-1 py-2 z-50">
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
        <TopBanner />
        <UtilityNav />
        <MainHeader />
        <Navigation />
        <MobileNavigation />
      </header>
    </HeaderProvider>
  );
};

export default Header;