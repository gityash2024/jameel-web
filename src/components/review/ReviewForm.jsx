import React, { useState } from 'react';
import styled from 'styled-components';
import { Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { reviewAPI } from '../../services/api';

const FormContainer = styled.div`
  margin-bottom: 30px;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const StarIcon = styled(Star)`
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SubmitButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  
  &:hover {
    background: #333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CharCounter = styled.div`
  font-size: 12px;
  color: ${props => props.isLimit ? '#d32f2f' : '#666'};
  text-align: right;
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
`;

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 0
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Review title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Review content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Review must be at least 10 characters';
    }
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating
    });
    
    if (errors.rating) {
      setErrors({
        ...errors,
        rating: ''
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await reviewAPI.addProductReview(productId, formData);
      
      toast.success('Review submitted successfully');
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        rating: 0
      });
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // Error is already handled by the API interceptor
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FormContainer>
      <FormTitle>Write a Review</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="rating">Rating</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon 
                key={star}
                size={24}
                fill={star <= formData.rating ? '#f9a826' : 'none'}
                color={star <= formData.rating ? '#f9a826' : '#999'}
                onClick={() => handleRatingClick(star)}
              />
            ))}
          </RatingContainer>
          {errors.rating && <ErrorMessage>{errors.rating}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Summarize your experience"
            maxLength={100}
          />
          <CharCounter isLimit={formData.title.length >= 100}>
            {formData.title.length}/100
          </CharCounter>
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="content">Review</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Share your experience with this product"
            maxLength={1000}
          />
          <CharCounter isLimit={formData.content.length >= 1000}>
            {formData.content.length}/1000
          </CharCounter>
          {errors.content && <ErrorMessage>{errors.content}</ErrorMessage>}
        </FormGroup>
        
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default ReviewForm; 