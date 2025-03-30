import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import HomeErraring from './pages/HomeErraring';
import Homepayment from './pages/Homepayment';
import Productstwo from './pages/Productstwo';
import Collection from './pages/Collection';
import CollectionTwo from './pages/CollectionTwo';
import BookingAppoiment from './pages/BookingAppoiment';
import MakeWithJSK from './pages/MakeWithJSK';
import BlogsOne from './pages/BlogsOne';
import BlogsTwo from './pages/BlogsTwo';
import BlogsThree from './pages/BlogsThree';
import BlogsFour from './pages/BlogsFour';
import Ring from './pages/Ring';
import CustomJewelry from './pages/CustomJewelry';
import SignUp from './pages/SignUp';
import HelpCenter from './pages/HelpCenter';
import MyOrder from './pages/MyOrder';
import MyAccount from './pages/MyAccount';
import CardOption from './pages/CardOption';
import CardPage from './pages/CardPage';
import CheckOut from './pages/CheckOut';
import SearchInStore from './pages/SearchInStore';
import PaymentHub from './pages/PaymentHub';
import RepairandMaintances from './pages/RepairandMaintances';
import Privacy from './pages/Privacy';
import MyAccountLayout from './pages/MyAccountLayout';
import Termtouse from './pages/termtouse';
import CustomJewelryTwo from './pages/CustomJewelryTwo';
import FAQ from './pages/FAQ';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Appraisal from './pages/Appraisal';
import LearnMoreAbout from './pages/LearnMoreAbout';
import Findyourstore from './pages/Findyourstore';
import Personalized from './pages/personalized';
import Layawaypayment from './pages/Layawaypayment';
import CheckoutPage from './pages/CheckOut';
import PersonalizedJewelry from './pages/personalized';
import Favorites from './pages/Favorites';
import FavoritesRemove from './pages/FavoritesRemove';
import TrackOrder from './pages/TrackOrder';
import SavedOrder from './pages/SavedOrder';
import AddAddress from './pages/AddAddress';
import AboutUsTwo from './pages/AboutUsTwo';
import AuthGuard from './components/guards/AuthGuard';
import SavedAddress from './pages/SavedOrder';
import BlogDetails from './pages/BlogDetails';
import ProductCompare from './pages/ProductCompare';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import CartProvider from './context/CartContext';
import BannerModal from './components/common/BannerModal';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#059669',
                secondary: '#white',
              },
            },
            error: {
              duration: 3000,
              theme: {
                primary: '#DC2626',
                secondary: '#white',
              },
            },
          }}
          gutter={8}
          containerStyle={{}}
          containerClassName=""
          reverseOrder={false}
          limit={3}
        />
        <BannerModal />
        <Routes>
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
          <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/product-details" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="products" element={<Products />} />
            <Route path="product-compare" element={<ProductCompare />} />

            <Route path="cart" element={<AuthGuard><Cart /></AuthGuard>} />
            <Route path="checkout" element={<AuthGuard><CheckOut /></AuthGuard>} />
            <Route path="payment/:orderId" element={<AuthGuard><Payment /></AuthGuard>} />
            <Route path="order-success/:orderId" element={<AuthGuard><OrderSuccess /></AuthGuard>} />
            <Route path="profile" element={<AuthGuard><Profile /></AuthGuard>} />
            <Route path="home-erraring" element={<HomeErraring />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="home-payment" element={<Homepayment />} />
            <Route path="collection" element={<Collection />} />
            <Route path="collectiontwo" element={<CollectionTwo />} />
            <Route path="booking-appoinment" element={<AuthGuard><BookingAppoiment /></AuthGuard>} />
            <Route path="make-with-jsk" element={<AuthGuard><MakeWithJSK /></AuthGuard>} />
            <Route path="blogs-one" element={<BlogsOne />} />
            <Route path="blogs-two" element={<BlogsTwo />} />
            <Route path="ring" element={<Ring />} />
            <Route path="custom-jewelry" element={<CustomJewelry />} />
            <Route path="custom-jewelrytwo" element={<CustomJewelryTwo />} />
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="checkout-page" element={<AuthGuard><CheckoutPage /></AuthGuard>} />
            <Route path="personalized-jewelry" element={<PersonalizedJewelry />} />
            <Route path="card-page" element={<AuthGuard><CardPage /></AuthGuard>} />
            <Route path="search-in-store" element={<SearchInStore />} />
            <Route path="payment-hub" element={<AuthGuard><PaymentHub /></AuthGuard>} />
            <Route path="repair-and-maintances" element={<RepairandMaintances />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms-use" element={<Termtouse />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="appraisals" element={<Appraisal />} />
            <Route path="learn-more-about" element={<LearnMoreAbout />} />
            <Route path="find-your-store" element={<Findyourstore />} />
            <Route path="personalized" element={<Personalized />} />
            <Route path="layawaypayment" element={<AuthGuard><Layawaypayment /></AuthGuard>} />
            <Route path="saved-order" element={<AuthGuard><SavedOrder /></AuthGuard>} />
            <Route path="favorites-remove" element={<AuthGuard><FavoritesRemove /></AuthGuard>} />
            <Route path="add-address" element={<AuthGuard><AddAddress /></AuthGuard>} />
            <Route path="about-us-two" element={<AboutUsTwo />} />

            <Route path="/" element={<AuthGuard><MyAccountLayout /></AuthGuard>}>
              <Route path="my-account" element={<MyAccount />} />
              <Route path="my-order" element={<MyOrder />} />
              <Route path="saved-address" element={<SavedAddress />} />
              <Route path="add-address" element={<AddAddress />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="track-order" element={<TrackOrder />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;