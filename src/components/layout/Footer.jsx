import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerData = {
    collections: {
      title: 'Our Collections',
      items: [
        { name: 'New Arrivals', link: '/new-arrivals' },
        { name: 'Rings', link: '/ring' },
        { name: 'Bracelet', link: '/bracelet' },
        { name: 'Necklace', link: '/necklace' },
        { name: 'Earrings', link: '/earrings' }
      ]
    },
    personalised: {
      title: 'Personalised',
      items: [
        { name: 'Design Your Own Jewelry', link: '/design-jewelry' },
        { name: 'Design From Scratch', link: '/design-scratch' },
        { name: 'Personalize & Engrave', link: '/personalized' },
        { name: 'Virtual Custom Consultations', link: '/consultations' }
      ]
    },
    services: {
      title: 'Our Services',
      items: [
        { name: 'Payment Options', link: '/payment-hub' },
        { name: 'Repairs & Maintenance', link: '/repair-and-maintances' },
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
        { name: 'Wishlist', link: '/wishlist' }
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
    // Handle subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white py-16 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Our Collections */}
          <div>
            <h3 className="font-semibold mb-4">{footerData.collections.title}</h3>
            <ul className="space-y-2">
              {footerData.collections.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Personalised */}
          <div>
            <h3 className="font-semibold mb-4">{footerData.personalised.title}</h3>
            <ul className="space-y-2">
              {footerData.personalised.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-semibold mb-4">{footerData.services.title}</h3>
            <ul className="space-y-2">
              {footerData.services.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About JSK */}
          <div>
            <h3 className="font-semibold mb-4">{footerData.about.title}</h3>
            <ul className="space-y-2">
              {footerData.about.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{footerData.quickLinks.title}</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.items.map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="text-gray-600 hover:text-gray-900 text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-4">{footerData.contact.title}</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                {footerData.contact.email.map((email, index) => (
                  <p key={index} className="flex items-center text-gray-600 text-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    {email}
                  </p>
                ))}
              </div>
              <div className="space-y-2">
                {footerData.contact.phone.map((phone, index) => (
                  <p key={index} className="flex items-center text-gray-600 text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    {phone}
                  </p>
                ))}
              </div>
              <p className="flex items-start text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                {footerData.contact.address}
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter and Social Media */}
        <div className="mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="font-semibold mb-4">FOLLOW US</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:border-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-900 text-white rounded-r hover:bg-gray-800"
                >
                  SIGN UP
                </button>
              </form>
            </div>
            <div className="flex items-center space-x-6">
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