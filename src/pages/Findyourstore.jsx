import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Navigation, MapPin, Phone, Globe, Clock } from 'lucide-react';


const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.div`
  height: 400px;
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/store-bg.jpg');
  background-size: cover;
  background-position: center;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const SearchSection = styled.div`
  max-width: 1200px;
  margin: -50px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 10;
`;

const SearchContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 5px;

  input {
    width: 100%;
    padding: 15px;
    border: none;
    background: transparent;
    font-size: 1rem;
    
    &:focus {
      outline: none;
    }
  }

  button {
    padding: 15px 30px;
    background: #000;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s ease;

    &:hover {
      background: #333;
    }
  }
`;

const LocationButton = styled.button`
  padding: 15px;
  background: white;
  border: 2px solid #000;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

const MapAndListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MapContainer = styled.div`
  height: 600px;
  background: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 600px;
  overflow-y: auto;
`;

const StoreCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const StoreName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const StoreDistance = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
  font-size: 0.9rem;

  svg {
    min-width: 20px;
  }
`;

const StoreActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 10px;
  background: ${props => props.$primary ? '#000' : 'white'};
  color: ${props => props.$primary ? 'white' : '#000'};
  border: 2px solid #000;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$primary ? '#333' : '#f5f5f5'};
  }
`;

const FindYourStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample store data - replace with API call
  const sampleStores = [
    {
      id: 1,
      name: 'JSK Downtown Store',
      address: '123 Main Street, New York',
      phone: '(212) 555-0123',
      hours: '10:00 AM - 9:00 PM',
      distance: '0.5 miles',
      location: { lat: 40.7128, lng: -74.0060 },
    },
    {
      id: 2,
      name: 'JSK Uptown Boutique',
      address: '456 Madison Ave, New York',
      phone: '(212) 555-0124',
      hours: '10:00 AM - 8:00 PM',
      distance: '1.2 miles',
      location: { lat: 40.7589, lng: -73.9851 },
    },
    // Add more stores as needed
  ];

  useEffect(() => {
    // Simulate API call to load stores
    setStores(sampleStores);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call with search query
    setTimeout(() => {
      // Filter stores based on search query
      const filteredStores = sampleStores.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setStores(filteredStores);
      setLoading(false);
    }, 1000);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          // Here you would typically call an API to find nearby stores
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    // Here you would typically update map to center on selected store
  };

  const getDirections = (store) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.address}`);
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Find Our Store</HeroTitle>
        </HeroContent>
      </HeroSection>

      <SearchSection>
        <SearchContainer>
          <SearchBar>
            <SearchInput>
              <input
                type="text"
                placeholder="Enter city, state or zip code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch}>
                <Search size={20} />
                Search
              </button>
            </SearchInput>
            <LocationButton onClick={getUserLocation}>
              <Navigation size={24} />
            </LocationButton>
          </SearchBar>

          <MapAndListContainer>
            <MapContainer>
              {/* Add your preferred map component here */}
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: '#e5e5e5'
              }}>
                <MapPin size={40} />
              </div>
            </MapContainer>

            <StoreList>
              {stores.map((store) => (
                <StoreCard 
                  key={store.id}
                  onClick={() => handleStoreSelect(store)}
                >
                  <StoreHeader>
                    <div>
                      <StoreName>{store.name}</StoreName>
                      <StoreDistance>{store.distance}</StoreDistance>
                    </div>
                  </StoreHeader>

                  <StoreInfo>
                    <InfoItem>
                      <MapPin size={20} />
                      {store.address}
                    </InfoItem>
                    <InfoItem>
                      <Phone size={20} />
                      {store.phone}
                    </InfoItem>
                    <InfoItem>
                      <Clock size={20} />
                      {store.hours}
                    </InfoItem>
                  </StoreInfo>

                  <StoreActions>
                    <ActionButton $primary onClick={() => getDirections(store)}>
                      Get Directions
                    </ActionButton>
                    <ActionButton onClick={() => window.open(`/store/${store.id}`)}>
                      Store Details
                    </ActionButton>
                  </StoreActions>
                </StoreCard>
              ))}
            </StoreList>
          </MapAndListContainer>
        </SearchContainer>
      </SearchSection>
    </PageContainer>
  );
};

export default FindYourStore;