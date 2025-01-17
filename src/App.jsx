import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="new-arrivals" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home-erraring" element={<HomeErraring />} />
          <Route path="home-payment" element={<Homepayment />} />
          <Route path="productstwo" element={<Productstwo />} />
          <Route path="collection" element={<Collection />} />
          <Route path="collectiontwo" element={<CollectionTwo />} />
          <Route path="booking-appoinment" element={<BookingAppoiment />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;