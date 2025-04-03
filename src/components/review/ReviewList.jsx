import React, { useState, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { reviewAPI } from '../../services/api';
import { toast } from 'react-hot-toast';

const Container = styled.div`
  margin-bottom: 30px;
`;

const ReviewListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ReviewCount = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const SortFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const FilterLabel = styled.label`
  font-size: 14px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const ReviewGrid = styled.div`
  display: grid;
  gap: 24px;
`;

const ReviewCard = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 24px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: #555;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 14px;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const VerifiedPurchase = styled.span`
  background-color: #e8f4f0;
  color: #2e7d32;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
`;

const RatingStars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const ReviewTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const ReviewContent = styled.p`
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  color: #333;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-size: 12px;
  color: ${props => props.active ? '#000' : '#666'};
  cursor: pointer;
  padding: 4px 0;
  
  &:hover {
    color: #000;
  }
`;

const NoReviews = styled.div`
  text-align: center;
  padding: 40px 0;
  
  p {
    margin-bottom: 12px;
    color: #666;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #fdecea;
  border-radius: 4px;
  margin-bottom: 20px;
  
  p {
    color: #d32f2f;
  }
`;

const LoadMoreButton = styled.button`
  background: none;
  border: 1px solid #e0e0e0;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin: 20px auto 0;
  cursor: pointer;
  display: block;
  
  &:hover {
    border-color: #000;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ReviewSkeleton = styled.div`
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  
  .skeleton-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  
  .skeleton-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }
  
  .skeleton-line {
    height: 12px;
    border-radius: 4px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }
  
  .skeleton-title {
    height: 18px;
    width: 70%;
    margin-bottom: 16px;
  }
  
  .skeleton-content {
    height: 14px;
    width: 100%;
    margin-bottom: 8px;
  }
  
  .skeleton-content:last-child {
    width: 80%;
  }
  
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ReviewList = forwardRef(({ productId, isLoggedIn, localIsLoggedIn }, ref) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalReviews, setTotalReviews] = useState(0);
  
  const fetchReviews = async (reset = false) => {
    try {
      setLoading(true);
      
      const currentPage = reset ? 1 : page;
      let sortParam = '-createdAt'; // default sorting (newest first)
      
      if (sortBy === 'oldest') sortParam = 'createdAt';
      if (sortBy === 'highest') sortParam = '-rating';
      if (sortBy === 'lowest') sortParam = 'rating';
      if (sortBy === 'helpful') sortParam = '-helpfulVotes';
      
      const params = {
        page: currentPage,
        limit: 5,
        sort: sortParam
      };
      
      if (filter === 'verified') {
        params.isVerifiedPurchase = true;
      } else if (filter === 'images') {
        params.hasImages = true;
      } else if (filter !== 'all' && !isNaN(parseInt(filter))) {
        params.rating = parseInt(filter);
      }
      
      const response = await reviewAPI.getProductReviews(productId, params);
      
      if (reset) {
        setReviews(response.data.data.reviews);
      } else {
        setReviews([...reviews, ...response.data.data.reviews]);
      }
      
      setTotalReviews(response.data.total);
      setHasMore(response.data.data.reviews.length === 5);
      setPage(reset ? 2 : currentPage + 1);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
    if (productId) {
      fetchReviews(true);
    }
  }, [productId, sortBy, filter]);
  
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleLoadMore = () => {
    fetchReviews();
  };
  
  const handleHelpfulVote = async (reviewId, isAlreadyHelpful) => {
    if (!isLoggedIn && !localIsLoggedIn) {
      toast.error('Please login to mark reviews as helpful');
      return;
    }
    
    try {
      if (isAlreadyHelpful) {
        await reviewAPI.removeHelpfulMark(reviewId);
        // Update local state to reflect the removed vote
        setReviews(reviews.map(review => {
          if (review._id === reviewId) {
            return {
              ...review,
              helpfulVotes: review.helpfulVotes.filter(id => id !== (isLoggedIn ? id : null)), // Filter out the current user's ID
              isHelpful: false
            };
          }
          return review;
        }));
        
        toast.success('Vote removed');
      } else {
        await reviewAPI.markReviewHelpful(reviewId);
        // Update local state to reflect the new vote
        setReviews(reviews.map(review => {
          if (review._id === reviewId) {
            return {
              ...review,
              helpfulVotes: [...review.helpfulVotes, isLoggedIn ? null : null], // Add a placeholder for the user's ID
              isHelpful: true
            };
          }
          return review;
        }));
        
        toast.success('Marked as helpful');
      }
    } catch (error) {
      console.error('Error updating helpful vote:', error);
    }
  };
  
  const handleReportReview = async (reviewId) => {
    if (!isLoggedIn && !localIsLoggedIn) {
      toast.error('Please login to report reviews');
      return;
    }
    
    toast.success('Review reported. Thank you for your feedback.');
  };
  
  useImperativeHandle(ref, () => ({
    fetchReviews
  }));
  
  if (loading && page === 1) {
    return (
      <Container>
        <ReviewListHeader>
          <ReviewCount>Loading reviews...</ReviewCount>
        </ReviewListHeader>
        {[1, 2, 3].map((_, index) => (
          <ReviewSkeleton key={index}>
            <div className="skeleton-header">
              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="skeleton-avatar"></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="skeleton-line" style={{ width: '120px' }}></div>
                  <div className="skeleton-line" style={{ width: '80px' }}></div>
                </div>
              </div>
              <div className="skeleton-line" style={{ width: '100px' }}></div>
            </div>
            <div className="skeleton-title"></div>
            <div className="skeleton-content"></div>
            <div className="skeleton-content"></div>
            <div className="skeleton-content"></div>
          </ReviewSkeleton>
        ))}
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <p>{error}</p>
        </ErrorContainer>
      </Container>
    );
  }
  
  if (reviews.length === 0 && !loading) {
    return (
      <Container>
        <NoReviews>
          <p>No reviews yet for this product.</p>
        </NoReviews>
      </Container>
    );
  }
  
  return (
    <Container>
      <ReviewListHeader>
        <ReviewCount>{totalReviews} Reviews</ReviewCount>
        <SortFilter>
          <FilterLabel>
            Filter by:
            <Select value={filter} onChange={handleFilterChange}>
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Stars</option>
              <option value="verified">Verified Purchase</option>
              <option value="images">With Images</option>
            </Select>
          </FilterLabel>
          
          <FilterLabel>
            Sort by:
            <Select value={sortBy} onChange={handleSortChange}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="helpful">Most Helpful</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </Select>
          </FilterLabel>
        </SortFilter>
      </ReviewListHeader>
      
      <ReviewGrid>
        {reviews.map((review) => {
          const isHelpful = review.helpfulVotes?.includes(isLoggedIn || localIsLoggedIn ? null : null) || false;
          
          return (
            <ReviewCard key={review._id}>
              <ReviewHeader>
                <UserInfo>
                  <UserAvatar>
                    {review.user.avatar ? (
                      <img src={review.user.avatar.url} alt={review.user.firstName} />
                    ) : (
                      `${review.user.firstName.charAt(0)}${review.user.lastName?.charAt(0) || ''}`
                    )}
                  </UserAvatar>
                  <UserMeta>
                    <UserName>
                      {review.user.firstName} {review.user.lastName}
                      {review.isVerifiedPurchase && (
                        <VerifiedPurchase>Verified Purchase</VerifiedPurchase>
                      )}
                    </UserName>
                    <ReviewDate>
                      {format(new Date(review.createdAt), 'MMM d, yyyy')}
                    </ReviewDate>
                  </UserMeta>
                </UserInfo>
                
                <RatingStars>
                  {[...Array(5)].map((_, index) => (
                    <Star 
                      key={index}
                      size={16}
                      fill={index < review.rating ? '#f9a826' : 'none'}
                      color={index < review.rating ? '#f9a826' : '#e0e0e0'}
                    />
                  ))}
                </RatingStars>
              </ReviewHeader>
              
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewContent>{review.content}</ReviewContent>
              
              {review.images && review.images.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  {review.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image.url} 
                      alt={`Review image ${index + 1}`} 
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid #e0e0e0'
                      }} 
                    />
                  ))}
                </div>
              )}
              
              <ReviewActions>
                <ActionButton 
                  active={isHelpful}
                  onClick={() => handleHelpfulVote(review._id, isHelpful)}
                >
                  <ThumbsUp size={14} />
                  Helpful ({review.helpfulVotes?.length || 0})
                </ActionButton>
                
                <ActionButton onClick={() => handleReportReview(review._id)}>
                  <Flag size={14} />
                  Report
                </ActionButton>
              </ReviewActions>
            </ReviewCard>
          );
        })}
      </ReviewGrid>
      
      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More Reviews'}
        </LoadMoreButton>
      )}
    </Container>
  );
});

export default ReviewList; 