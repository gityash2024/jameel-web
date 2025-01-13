const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p>Jameel Jewelry - Your trusted destination for fine jewelry.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p>Email: info@jameeljewelry.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
                <a href="#" className="hover:text-gray-300">Twitter</a>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-700">
            <p>&copy; {new Date().getFullYear()} Jameel Jewelry. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;