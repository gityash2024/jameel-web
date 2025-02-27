import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Search, Navigation, MapPin, Phone, Clock, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { storeAPI } from '../services/api';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

const HeroSection = styled.div`
  height: 250px;
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/store-bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: white;
  text-align: center;
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

const LoadingIndicator = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  margin-left: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const StoreListContainer = styled.div`
  margin-top: 30px;
`;

const StoreListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StoreCount = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
`;

const StoreList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

const StoreCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  }
`;

const StoreName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  margin-bottom: 15px;
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 1;
`;
const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: #666;
  font-size: 0.9rem;

  svg {
    min-width: 20px;
    margin-top: 2px;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const FeatureTag = styled.span`
  font-size: 0.8rem;
  padding: 4px 10px;
  background: #f5f5f5;
  border-radius: 20px;
  color: #555;
`;

const DirectionButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;
  margin-top: auto;

  &:hover {
    background: #333;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  color: #a0aec0;
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: #4a5568;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const FindYourStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [distances, setDistances] = useState({});

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (userLocation && stores.length > 0) {
      calculateDistances();
    }
  }, [userLocation, stores]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await storeAPI.getAllStores();
      const activeStores = response.data.data.stores.filter(store => store.isActive);
      setStores(activeStores);
    } catch (error) {
      toast.error('Failed to load stores');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchStores();
      return;
    }
    
    setLoading(true);
    try {
      const response = await storeAPI.getAllStores();
      const allStores = response.data.data.stores;
      
      const filteredStores = allStores.filter(store => 
        store.isActive && (
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.zipCode.includes(searchQuery)
        )
      );
      
      setStores(filteredStores);
      
      if (filteredStores.length === 0) {
        toast.error('No stores found matching your search criteria');
      }
    } catch (error) {
      toast.error('Failed to search stores');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          setUserLocation(userLoc);
          
          try {
            const response = await storeAPI.findNearbyStores(
              userLoc.lat,
              userLoc.lng,
              50000
            );
            
            if (response.data.data.stores.length > 0) {
              setStores(response.data.data.stores);
            } else {
              toast.info('No stores found near your location. Showing all stores instead.');
              fetchStores();
            }
          } catch (error) {
            toast.error('Failed to find nearby stores');
            console.error(error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setLoading(false);
          toast.error('Error getting your location. Please allow location access or search by zip code.');
          console.error('Error getting location:', error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const calculateDistances = () => {
    if (!userLocation) return;
    
    const distanceObj = {};
    
    stores.forEach(store => {
      if (store.location && store.location.coordinates) {
        const storeLat = store.location.coordinates[1];
        const storeLng = store.location.coordinates[0];
        
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          storeLat,
          storeLng
        );
        
        distanceObj[store._id] = distance;
      }
    });
    
    setDistances(distanceObj);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  const getDirections = (store) => {
    if (store.location && store.location.coordinates) {
      const lat = store.location.coordinates[1];
      const lng = store.location.coordinates[0];
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${store.address}, ${store.city}, ${store.state} ${store.zipCode}`)}`);
    }
  };

  const renderStoreList = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <LoadingIndicator />
        </div>
      );
    }

    if (!stores || stores.length === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon>
            <MapPin size={48} />
          </EmptyStateIcon>
          <EmptyStateText>No stores found matching your criteria</EmptyStateText>
        </EmptyState>
      );
    }

    const sortedStores = [...stores].sort((a, b) => {
      if (distances[a._id] && distances[b._id]) {
        return distances[a._id] - distances[b._id];
      }
      return 0;
    });

    return (
      <>
        <StoreListHeader>
          <StoreCount>Found {sortedStores.length} stores</StoreCount>
        </StoreListHeader>
        <StoreList>
          {sortedStores.map((store) => (
            <StoreCard key={store._id}>
              <StoreName>{store.name}</StoreName>
              <RatingContainer>
                <Star size={16} fill="#FFD700" color="#FFD700" />
                <span>{store.rating?.toFixed(1) || '4.5'}</span>
                <span>({store.reviews || '0'} reviews)</span>
              </RatingContainer>

              <StoreInfo>
                <InfoItem>
                  <MapPin size={16} />
                  {`${store.address}, ${store.city}, ${store.state} ${store.zipCode}`}
                </InfoItem>
                <InfoItem>
                  <Phone size={16} />
                  {store.phone}
                </InfoItem>
                <InfoItem>
                  <Clock size={16} />
                  {store.hours}
                </InfoItem>
              </StoreInfo>
              
              {store.features && store.features.length > 0 && (
  <FeaturesList>
    {store.features.map((feature, index) => (
      <FeatureTag key={index}>{feature}</FeatureTag>
    ))}
  </FeaturesList>
)}
{store.privateViewing && (
  <div style={{ marginBottom: '15px' }}>Private Viewing Room</div>
)}
              <DirectionButton onClick={() => getDirections(store)}>
                Get Directions
              </DirectionButton>
            </StoreCard>
          ))}
        </StoreList>
      </>
    );
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroTitle>Find Our Store</HeroTitle>
      </HeroSection>

      <SearchSection>
        <SearchContainer>
          <SearchBar>
            <SearchInput>
              <input
                type="text"
                placeholder="Search by city, state, zip code or store name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button onClick={handleSearch} disabled={loading}>
                {loading ? <LoadingIndicator /> : (
                  <>
                    <Search size={20} />
                    Search
                  </>
                )}
              </button>
            </SearchInput>
            <LocationButton onClick={getUserLocation} disabled={loading}>
              <Navigation size={24} />
            </LocationButton>
          </SearchBar>

          <StoreListContainer>
            {renderStoreList()}
          </StoreListContainer>
        </SearchContainer>
      </SearchSection>
    </PageContainer>
  );
};

export default FindYourStore;