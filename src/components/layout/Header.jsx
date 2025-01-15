import React, { createContext, useContext, useState } from 'react';
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
      { icon: MapPin, text: "Find a Store", link: "/store-locator" },
      { icon: HelpCircle, text: "Help Centre", link: "/help" }
    ],
    userActions: [
      { text: "Book an Appointment", link: "/book-appointment" },
      { text: "Sign In / Create Account", link: "/auth", icon: User }
    ],
    logo: {
      text: "JSK",
      subtext: "POWERED BY JAMEEL GROUP AI"
    },
    navigation: [
      { name: 'Home', path: '/', hasDropdown: false },
      { name: 'New Arrivals', path: '/new-arrivals', hasDropdown: true },
      { name: 'Collections', path: '/collections', hasDropdown: true },
      { name: 'Rings', path: '/rings', hasDropdown: true },
      { name: 'Necklace', path: '/necklace', hasDropdown: true },
      { name: 'Bracelets', path: '/bracelets', hasDropdown: true },
      { name: 'Earrings', path: '/earrings', hasDropdown: true },
      { name: 'Personalized', path: '/personalized', hasDropdown: true },
      { name: 'Blogs', path: '/blogs', hasDropdown: false },
      { name: 'Services', path: '/services', hasDropdown: false }
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
              <button key={index} className="flex items-center text-sm hover:text-gray-600">
                <item.icon className="w-4 h-4 mr-2" />
                {item.text}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-8">
            {headerData.userActions.map((item, index) => (
              <button key={index} className="flex items-center text-sm hover:text-gray-600">
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainHeader = () => {
  const { headerData, searchQuery, setSearchQuery, cartItems, wishlistItems } = useContext(HeaderContext);
  
  return (
    <div className="py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-3 items-center gap-4">
          <div className="relative">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="What can I help you find?"
                className="w-full px-4 py-2 pr-20 border border-gray-300 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 flex items-center gap-2">
                <button className="p-1 hover:text-gray-600">
                  <Camera className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-1 hover:text-gray-600">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">{headerData.logo.text}</h1>
            <p className="text-xs text-gray-500 mt-1">{headerData.logo.subtext}</p>
          </div>

          <div className="flex justify-end items-center gap-4">
            <button className="relative hover:text-gray-600">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button className="relative hover:text-gray-600">
              <Heart className="w-6 h-6" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navigation = () => {
  const { headerData } = useContext(HeaderContext);
  
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto">
        <nav className="flex justify-center">
          {headerData.navigation.map((item, index) => (
            <button
              key={index}
              className="px-6 py-3 text-sm hover:text-gray-600 flex items-center whitespace-nowrap"
            >
              {item.name}
              {item.hasDropdown && (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </button>
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