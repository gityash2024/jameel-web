import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerData = {
 
    personalised: {
      title: 'Personalised',
      items: [
        { name: 'Design Your Own Jewelry', link: '/product-details' },
        { name: 'Design From Scratch', link: '/product-details' },
        { name: 'Personalize & Engrave', link: '/product-details' },
        { name: 'Virtual Custom Consultations', link: '/product-details' }
      ]
    },
    services: {
      title: 'Our Services',
      items: [
        { name: 'Payment Options', link: '/payment-hub' },
        { name: 'Repairs & Maintenance', link: '/help-center' },
        { name: 'JSK Gold Exchange', link: '/learn-more-about' },
        { name: 'In-Store Appraisals', link: '/appraisals' }
      ]
    },
    about: {
      title: 'About JSK JEWELERS',
      items: [
        { name: 'About JSK', link: '/about-us' },
        { name: 'Book An Appointment', link: '/booking-appoinment' },
        { name: 'Find Your JSK', link: '/find-your-store' },
        { name: 'Blogs', link: '/blogs-one' },
        { name: "FAQ's", link: '/faq' }
      ]
    },
    quickLinks: {
      title: 'Quick Links',
      items: [
        { name: 'My Order', link: '/my-order' },
        { name: 'My Account', link: '/my-account' },
        { name: 'Wishlist', link: '/favorites' }
      ]
    },
    contact: {
      title: 'Contact Us',
      email: ['examplemail@gmail.com', 'Example@gmail.com'],
      phone: ['+91 47839 73829', '+91 76458 78990'],
      address: 'Lorem ipsum dolor sit amet consectetur, Ultricies senectus, State, Pin: XXXXX'
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white py-8 md:py-16 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        

          <div className="w-full">
            <h3 className="font-semibold mb-4 text-base">{footerData.personalised.title}</h3>
            <ul className="space-y-2">
              {footerData.personalised.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm block">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="font-semibold mb-4 text-base">{footerData.services.title}</h3>
            <ul className="space-y-2">
              {footerData.services.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm block">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="font-semibold mb-4 text-base">{footerData.about.title}</h3>
            <ul className="space-y-2">
              {footerData.about.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm block">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="font-semibold mb-4 text-base">{footerData.quickLinks.title}</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm block">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="font-semibold mb-4 text-base">{footerData.contact.title}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                {footerData.contact.email.map((email, index) => (
                  <p key={index} className="flex items-center text-gray-600 text-sm">
                    <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="break-all">{email}</span>
                  </p>
                ))}
              </div>
              <div className="space-y-2">
                {footerData.contact.phone.map((phone, index) => (
                  <p key={index} className="flex items-center text-gray-600 text-sm">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{phone}</span>
                  </p>
                ))}
              </div>
              <p className="flex items-start text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <span>{footerData.contact.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="w-full md:w-auto">
              <h4 className="font-semibold mb-4 text-center md:text-left">FOLLOW US</h4>
              <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-gray-400 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-900 text-white rounded-r hover:bg-gray-800 text-sm whitespace-nowrap"
                >
                  SIGN UP
                </button>
              </form>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <h4 className="font-semibold">FOLLOW US</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;