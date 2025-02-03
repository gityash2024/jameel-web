import React, { createContext, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, HelpCircle, User, Search, ShoppingCart, Heart, ChevronDown, Camera } from 'lucide-react';

// Create context for header data
const HeaderContext = createContext();

// Data provider component
export const HeaderProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      isLoggedIn
    }}>
      {children}
    </HeaderContext.Provider>
  );
};

const TopBanner = () => {
  const { headerData } = useContext(HeaderContext);
  return (
    <div className="w-full py-2 text-center text-white" style={{ backgroundColor: headerData.topBanner.backgroundColor }}>
      {headerData.topBanner.text}
    </div>
  );
};

const UtilityNav = () => {
  const { headerData } = useContext(HeaderContext);
  return (
    <div className="border-b">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center gap-8">
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
          <div className="flex items-center gap-8">
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
  const { headerData, searchQuery, setSearchQuery, cartItems, wishlistItems } = useContext(HeaderContext);
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <div className="py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="relative">
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

          <Link to={headerData.logo.link} className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">{headerData.logo.text}</h1>
            <p className="text-xs text-gray-500 mt-1">{headerData.logo.subtext}</p>
          </Link>

          <div className="flex justify-end items-center gap-4">
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
      </div>
    </div>
  );
};

const NavigationDropdown = ({ items }) => {
  return (
    <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-b mt-1 py-2 z-50">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="block px-4 py-2 text-sm hover:bg-gray-100"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

const Navigation = () => {
  const { headerData } = useContext(HeaderContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  
  return (
    <div className="bg-gray-100 relative">
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
                className={`px-6 py-3 text-sm hover:text-gray-600 flex items-center whitespace-nowrap ${
                  location.pathname === item.path ? 'text-gray-900 font-semibold' : ''
                }`}
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </Link>
              {item.hasDropdown && activeDropdown === index && item.dropdownItems && (
                <NavigationDropdown items={item.dropdownItems} />
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
      <div className="w-full">
        <TopBanner />
        <UtilityNav />
        <MainHeader />
        <Navigation />
      </div>
    </HeaderProvider>
  );
};

export default Header;