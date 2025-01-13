const Home = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to Jameel Jewelry</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Featured Collections</h2>
            <p className="text-gray-600">
              Discover our latest collections of fine jewelry, crafted with precision and elegance.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">New Arrivals</h2>
            <p className="text-gray-600">
              Explore our newest additions to find the perfect piece for any occasion.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;