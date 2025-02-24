import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import daimond_logo from "../assets/daimond_logo.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

const MyAccountLayout = () => {
  const location = useLocation();
  
  const rewardsData = [
    { icon: justatyourservice_1, title: "VAULT REWARDS" },
    { icon: justatyourservice_2, title: "VAULT REWARDS" },
    { icon: justatyourservice_3, title: "VAULT REWARDS" },
    { icon: justatyourservice_4, title: "VAULT REWARDS" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-2 text-sm text-gray-500 mb-6">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>Terms of Use</span>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">My Account</h1>

      <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-center gap-3 mb-8">
        <img src={daimond_logo} alt="Diamond" className="w-6 h-6" />
        <span>506 results too many? Our Jewelry Assistant can help!</span>
        <Link to="#" className="text-black underline">Describe what you're looking for?</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px,1fr] gap-8">
        <div className="border-b md:border-b-0 md:border-r border-gray-200 pr-8">
          <Link 
            to="/my-account" 
            className={`block px-4 py-2 rounded mb-2 ${
              location.pathname === '/my-account' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            My Account
          </Link>
          <Link 
            to="/my-order" 
            className={`block px-4 py-2 rounded mb-2 ${
              location.pathname === '/my-order' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            My Orders
          </Link>
          <Link 
            to="/favorites" 
            className={`block px-4 py-2 rounded mb-2 ${
              location.pathname === '/favorites' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            Favourites
          </Link>
          <Link 
            to="/track-order" 
            className={`block px-4 py-2 rounded mb-2 ${
              location.pathname === '/track-order' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            Track Order
          </Link>
          <Link 
            to="/saved-address" 
            className={`block px-4 py-2 rounded mb-2 ${
              location.pathname === '/saved-address' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            Saved Address
          </Link>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-8">JSK At Your Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {rewardsData.map((reward, index) => (
            <div key={index} className="bg-gray-50 p-6 text-center">
              <img src={reward.icon} alt={reward.title} className="mx-auto mb-4" />
              <h3 className="font-bold mb-3">Join Vault Rewards</h3>
              <p className="text-gray-600 text-sm mb-4">
                "This was one of the first rings I had looked at in person. After looking at hundreds"
              </p>
              <a href="#" className="font-medium">LEARN MORE</a>
            </div>
          ))}
        </div>
        <a href="#" className="inline-block mt-10 uppercase font-semibold">
          PROMOTION TERMS & CONDITIONS
        </a>
      </div>
    </div>
  );
};

export default MyAccountLayout;