import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Jameel Jewelry
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/products" className="hover:text-gray-600">Products</Link>
            <Link to="/cart" className="hover:text-gray-600">Cart</Link>
            <Link to="/login" className="hover:text-gray-600">Login</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;