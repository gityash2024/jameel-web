import React from 'react';
import styled from "styled-components";
import thankyouordering from '../assets/thankyouordering.svg';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 40px 20px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 120px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  ${props => props.primary ? `
    background-color: #000;
    color: white;
    
    &:hover {
      background-color: #333;
    }
  ` : `
    background-color: #000;
    color: white;
    
    &:hover {
      background-color: #333;
    }
  `}
`;





const SearchInStore = () => {
    const handleViewOrder = () => {
        // Handle view order click
        console.log('View Order clicked');
    };

    const handleContinueShopping = () => {
        // Handle continue shopping click
        console.log('Continue Shopping clicked');
    };

    return (
        <Container>
            <ImageContainer>
                <img src={thankyouordering} alt="Thank you for ordering" />
            </ImageContainer>
            
            <Title>Thank you for ordering!</Title>
            
            <Description>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
            </Description>
            
            <ButtonContainer>
                <Button onClick={handleViewOrder}>
                    View Order
                </Button>
                <Button onClick={handleContinueShopping}>
                    Continue Shopping
                </Button>
            </ButtonContainer>
        </Container>
    );
};

export default SearchInStore;