import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { categoryAPI, subcategoryAPI, productAPI, blogAPI, storeAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import { ArrowRight, ChevronLeft, ChevronRight, Diamond } from 'lucide-react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background: #fff;
  padding-top: 40px;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    padding-top: 20px;
  }
  
  @media (max-width: 768px) {
    padding-top: 16px;
  }
  
  @media (max-width: 480px) {
    padding-top: 12px;
  }
`;

const HeroContainer = styled.div`
  display: grid;
  position: relative;
  margin: 0 auto;
  max-width: 1920px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 480px) {
    margin: 0 auto 10px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 680px;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    height: 550px;
  }
  
  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
  
  @media (max-width: 360px) {
    height: 200px;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
  width: ${props => props.width}%;
  transform: translateX(-${props => props.translate}%);
`;

const Slide = styled.div`
  flex: 0 0 ${props => 100 / props.totalSlides}%;
  height: 100%;
  position: relative;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const CarouselNavigation = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 5;
  
  @media (max-width: 768px) {
    bottom: 15px;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    bottom: 10px;
    gap: 6px;
  }
`;

const NavDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ffffff;
  }
  
  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 5;
  
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    &.prev {
      left: 10px;
    }
    
    &.next {
      right: 10px;
    }
  }
  
  @media (max-width: 360px) {
    width: 25px;
    height: 25px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #333;
  margin-bottom: 40px;
  font-weight: 500;
  opacity: 0;
  
  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 360px) {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const InspiredSection = styled.div`
  padding: 60px 20px;
  text-align: center;
  background: #f8f8f8;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 12px;
  }
  
  @media (max-width: 360px) {
    padding: 25px 10px;
  }
`;

const CategoryTags = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 0 40px;
  max-width: 1440px;
  margin: 0 auto;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out 0.2s forwards;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
    gap: 8px;
  }
  
  @media (max-width: 360px) {
    padding: 0 5px;
    gap: 6px;
  }
`;

const CategoryTag = styled.button`
  border: 1px solid #e0e0e0;
  background: white;
  padding: 16px 30px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    border-color: #999;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 11px;
  }
  
  @media (max-width: 360px) {
    padding: 8px 12px;
    font-size: 10px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 40px 20px;
  margin: 0 auto;
  max-width: 1440px;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    gap: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 10px;
    gap: 10px;
  }
`;

const ProductCard = styled.div`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 480px) {
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const DiscountBanner = styled.div`
  background: #000;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  @media (max-width: 480px) {
    padding: 16px;
    gap: 6px;
  }
  
  @media (max-width: 360px) {
    padding: 12px;
    gap: 4px;
  }
`;

const DiscountText = styled.div`
  color: #E10002;
  font-size: 24px;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
  
  @media (max-width: 360px) {
    font-size: 18px;
  }
`;

const DiscountDescription = styled.div`
  font-size: 14px;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 11px;
  }
`;

const ShopLink = styled.a`
  color: white;
  text-decoration: underline;
  font-size: 14px;
  margin-top: 4px;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-top: 3px;
  }
  
  @media (max-width: 360px) {
    font-size: 11px;
    margin-top: 2px;
  }
`;

const ProductImage = styled.div`
  width: 100%;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const OfferSection = styled.div`
  background: #E10002;
  padding: 80px 60px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  font-family: 'Scope One';

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 30px;
    margin-top: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 20px;
    margin-top: 20px;
  }
  
  @media (max-width: 360px) {
    padding: 25px 15px;
    margin-top: 15px;
  }
`;

const OfferContent = styled.div`
  color: white;
  margin-bottom: 60px;
  
  h1, h2 {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.1;
    opacity: 0;
    transform: translateY(20px);
  }
  
  h1 {
    margin-bottom: 20px;
    animation: ${fadeIn} 0.8s ease-out 0.2s forwards;
  }
  
  h2 {
    animation: ${fadeIn} 0.8s ease-out 0.4s forwards;
  }

  @media (max-width: 1200px) {
    h1, h2 {
      font-size: 56px;
    }
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
    h1, h2 {
      font-size: 42px;
    }
    h1 {
      margin-bottom: 15px;
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 30px;
    h1, h2 {
      font-size: 36px;
    }
    h1 {
      margin-bottom: 10px;
    }
  }
  
  @media (max-width: 360px) {
    margin-bottom: 25px;
    h1, h2 {
      font-size: 30px;
    }
    h1 {
      margin-bottom: 8px;
    }
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  opacity: 0;
  
  &.animated {
    animation: ${fadeIn} 0.8s ease-out 0.6s forwards;
  }

  @media (max-width: 768px) {
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const CategoryButton = styled.button`
  background: #000;
  color: white;
  padding: 10px;
  width: 160px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a1a1a;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
  
  @media (max-width: 360px) {
    font-size: 13px;
    padding: 10px;
  }
`;

const SalesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 40px auto 0;
  padding: 40px;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 1024px) {
    padding: 30px 20px;
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 24px 16px;
    margin: 30px auto 0;
  }
  
  @media (max-width: 480px) {
    gap: 24px;
    padding: 20px 12px;
    margin: 20px auto 0;
  }
  
  @media (max-width: 360px) {
    gap: 20px;
    padding: 15px 10px;
    margin: 15px auto 0;
  }
`;

const SalesCard = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  
  &.animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    margin-bottom: 24px;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    img {
      margin-bottom: 20px;
    }
  }
  
  @media (max-width: 480px) {
    img {
      margin-bottom: 16px;
    }
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  @media (max-width: 360px) {
    img {
      margin-bottom: 12px;
    }
  }
`;

const SalesContent = styled.div`
  text-align: left;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  
  @media (max-width: 480px) {
    padding: 0 12px;
  }
  
  @media (max-width: 360px) {
    padding: 0 8px;
  }
`;

const PriceText = styled.div`
  color: #E10002;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  font-family: 'Scope One';
  
  sup {
    font-size: 16px;
    top: -0.8em;
    position: relative;
  }

  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 6px;
    
    sup {
      font-size: 14px;
    }
  }
  
  @media (max-width: 360px) {
    font-size: 22px;
    margin-bottom: 5px;
    
    sup {
      font-size: 12px;
    }
  }
`;

const PresetText = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
  color: #666;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 3px;
  }
  
  @media (max-width: 360px) {
    font-size: 11px;
    margin-bottom: 2px;
  }
`;

const SaveText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 360px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

const SaleTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
  font-family: 'Scope One';

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 360px) {
    font-size: 16px;
    margin-bottom: 14px;
  }
`;

const ShopButton = styled.button`
  background: #000;
  color: white;
  padding: 12px 40px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins';
  
  &:hover {
    background: #333;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 11px 36px;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 32px;
    font-size: 12px;
  }
  
  @media (max-width: 360px) {
    padding: 8px 28px;
    font-size: 11px;
  }
`;

const GiftsSection = styled.section`
  padding: 80px 40px;
  max-width: 1440px;
  margin: 40px auto 0;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    margin: 30px auto 0;
  }
  
  @media (max-width: 480px) {
    padding: 32px 16px;
    margin: 24px auto 0;
  }
  
  @media (max-width: 360px) {
    padding: 25px 12px;
    margin: 20px auto 0;
  }
`;

const GiftsTitle = styled.h2`
  text-align: center;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 40px;
  color: #000;
  opacity: 0;
  font-family: 'Poppins';

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
  
  @media (max-width: 360px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

const GiftsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out 0.3s forwards;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const GiftButton = styled.button`
  background: #E10002;
  color: white;
  width: 100%;
  padding: 23px 86px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Scope One';

  &:hover {
    background: #cc0002;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(225, 0, 2, 0.2);
  }

  @media (max-width: 1024px) {
    padding: 20px 60px;
  }

  @media (max-width: 768px) {
    padding: 16px 40px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 13px;
  }
  
  @media (max-width: 360px) {
    padding: 12px 24px;
    font-size: 12px;
    letter-spacing: 0.3px;
  }
`;

const MariahSection = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 60px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 1024px) {
    margin: 40px auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 32px auto;
  }
  
  @media (max-width: 480px) {
    margin: 24px auto;
  }
  
  @media (max-width: 360px) {
    margin: 20px auto;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 600px;
  opacity: 0;
  
  &.animated {
    animation: ${slideIn} 0.8s ease-out forwards;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 300px;
  }
  
  @media (max-width: 360px) {
    height: 250px;
  }
`;

const ContentContainer = styled.div`
  background: #000;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  opacity: 0;
  
  &.animated {
    animation: ${slideIn} 0.8s ease-out 0.3s forwards;
  }

  @media (max-width: 1024px) {
    padding: 60px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 32px;
  }
  
  @media (max-width: 480px) {
    padding: 30px 24px;
  }
  
  @media (max-width: 360px) {
    padding: 24px 20px;
  }
`;

const Title = styled.h2`
  color: white;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 20px;
  font-family: 'Scope One';

  @media (max-width: 1024px) {
    font-size: 42px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 30px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 360px) {
    font-size: 24px;
    margin-bottom: 12px;
  }
`;


const Subtitle = styled.p`
  color: white;
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
  font-family: 'Scope One'; 

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

const OrderButton = styled.button`
  background: white;
  color: black;
  padding: 16px 40px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: 'Poppins';
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 768px) {
    padding: 14px 32px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    padding: 12px 28px;
    font-size: 13px;
  }
`;

const BlogSection = styled.section`
  padding: 80px 40px;
  max-width: 1440px;
  margin: 0 auto;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out 0.3s forwards;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 20px;
`;

const BlogTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #000;
`;

const BlogExcerpt = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: #E10002;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const StoresSection = styled.section`
  padding: 80px 40px;
  background: #f8f8f8;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`;

const StoresGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1440px;
  margin: 0 auto;
  opacity: 0;

  &.animated {
    animation: ${fadeIn} 0.8s ease-out 0.3s forwards;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StoreCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StoreName = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #000;
`;

const StoreAddress = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const StorePhone = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

const DirectionsButton = styled.button`
  background: #000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: #333;
    transform: translateY(-2px);
  }
`;

const SaleOfferBanner = styled.div`
  background: #E10002;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  opacity: 0;
  
  &.animated {
    animation: ${pulse} 2s infinite;
    opacity: 1;
  }
  
  span {
    color: yellow;
    margin: 0 5px;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    padding: 12px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const LoadingAnimation = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #E10002;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ServicesBannerSection = styled.section`
  margin: 60px auto;
  padding: 0 20px;
  max-width: 1440px;
  opacity: 0;
  
  &.animated {
    animation: ${fadeIn} 0.8s ease-out forwards;
  }
`;

const ServicesBanner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: #f8f8f8;
  padding: 60px;
  border-radius: 10px;
  
  @media (max-width: 1024px) {
    padding: 40px;
    gap: 30px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 30px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  
  &.animated {
    animation: ${slideIn} 0.8s ease-out forwards;
  }
`;

const ServiceImage = styled.div`
  overflow: hidden;
  border-radius: 8px;
  opacity: 0;
  
  &.animated {
    animation: ${slideIn} 0.8s ease-out 0.3s forwards;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ServiceTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #000;
  font-family: 'Scope One';
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const ServiceDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
  font-family: 'Scope One';
  
  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 15px;
  }
`;

const ServiceButton = styled.button`
  background: #000;
  color: white;
  padding: 15px 30px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  font-family: 'Poppins';
  
  &:hover {
    background: #333;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedSections, setAnimatedSections] = useState({});

  const sectionRefs = {
    inspiredSection: useRef(null),
    productGrid: useRef(null),
    offerSection: useRef(null),
    salesGrid: useRef(null),
    giftsSection: useRef(null),
    mariahSection: useRef(null),
    blogSection: useRef(null),
    storesSection: useRef(null),
    servicesSection: useRef(null),
    saleBanner: useRef(null)
  };

  const heroSlides = [
    {
      id: 1,
      image: "https://plus.unsplash.com/premium_photo-1681276170683-706111cf496e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1559560864-854edd2b01e1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1644073978087-b3da7c145e40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      image: "https://plus.unsplash.com/premium_photo-1671209877071-f62883d7897a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1644073982874-d8f5e77fea94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await categoryAPI.getAllCategories();
        setCategories(categoriesResponse.data.data || []);

        const subcategoriesResponse = await subcategoryAPI.getAllSubCategories();
        setSubcategories(subcategoriesResponse.data.data || []);

        const featuredResponse = await productAPI.getFeaturedProducts();
        setFeaturedProducts(featuredResponse.data.data.products || []);

        const productsResponse = await productAPI.getAllProducts({ limit: 8 });
        setProducts(productsResponse.data.data.products || []);

        const blogsResponse = await blogAPI.getAllBlogs({ 
          limit: 3,
          status: 'published',
          sort: '-createdAt'
        });
        setBlogs(blogsResponse.data.data.posts || []);

        const storesResponse = await storeAPI.getAllStores();
        setStores(storesResponse.data.data.stores?.filter(store => store.isActive).slice(0, 3) || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error loading page content. Please refresh and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setAnimatedSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.id = key;
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [loading]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };

  const inspiredCategories = subcategories
    .filter(sub => sub.isActive)
    .slice(0, 8)
    .map(sub => sub.name);

  const giftCategories = [
    { title: "FOR HIM", link: "/product-details?category=him" },
    { title: "FOR HER", link: "/product-details?category=her" },
    { title: "GIFTS UNDER $250", link: "/product-details?maxPrice=250" },
    { title: "GIFT GUIDE", link: "/product-details" }
  ];

  const getStoreDirections = (store) => {
    if (store.location && store.location.coordinates) {
      const lat = store.location.coordinates[1];
      const lng = store.location.coordinates[0];
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
    } else {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${store.address}, ${store.city}, ${store.state} ${store.zipCode}`)}`);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingAnimation />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <HeroContainer>
        <CarouselContainer>
          <CarouselTrack
            width={heroSlides.length * 100}
            translate={currentSlide * (100 / heroSlides.length)}
          >
            {heroSlides.map((slide, index) => (
              <Slide key={slide.id} totalSlides={heroSlides.length}>
                <HeroImage src={slide.image} />
              </Slide>
            ))}
          </CarouselTrack>

          <CarouselButton className="prev" onClick={goToPreviousSlide}>
            <ChevronLeft size={24} />
          </CarouselButton>
          
          <CarouselButton className="next" onClick={goToNextSlide}>
            <ChevronRight size={24} />
          </CarouselButton>

          <CarouselNavigation>
            {heroSlides.map((_, index) => (
              <NavDot 
                key={index} 
                active={currentSlide === index} 
                onClick={() => goToSlide(index)}
              />
            ))}
          </CarouselNavigation>
        </CarouselContainer>
      </HeroContainer>

      <SaleOfferBanner ref={sectionRefs.saleBanner} className={animatedSections.saleBanner ? 'animated' : ''}>
        LIMITED TIME OFFER: <span>UP TO 60% OFF</span> ON ALL JEWELRY ITEMS
      </SaleOfferBanner>

      <InspiredSection ref={sectionRefs.inspiredSection}>
        <SectionTitle className={animatedSections.inspiredSection ? 'animated' : ''}>
          Categories Inspired By You
        </SectionTitle>
        <CategoryTags className={animatedSections.inspiredSection ? 'animated' : ''}>
          {inspiredCategories.map((category, index) => (
            <CategoryTag 
              key={index}
              onClick={() => navigate(`/product-details?subcategory=${subcategories[index]._id}`)}
            >
              {category}
            </CategoryTag>
          ))}
        </CategoryTags>
      </InspiredSection>

      <ProductGrid ref={sectionRefs.productGrid} className={animatedSections.productGrid ? 'animated' : ''}>
        {featuredProducts.slice(0, 4).map((product, index) => (
          <ProductCard key={product._id || index} onClick={() => navigate(`/products/${product.slug}`)}>
            <DiscountBanner>
              <DiscountText>40% OFF*</DiscountText>
              <DiscountDescription>
                {product.brand || '10K & 14K Gold Jewelry & Chains'}
              </DiscountDescription>
              <ShopLink href={`/products/${product.slug}`}>
                SHOP NOW
              </ShopLink>
            </DiscountBanner>
            <ProductImage>
              <img src={product.images?.[0]?.url || heroSlides[index % heroSlides.length].image} />
            </ProductImage>
          </ProductCard>
        ))}
      </ProductGrid>
      
      <OfferSection ref={sectionRefs.offerSection} className={animatedSections.offerSection ? 'animated' : ''}>
        <OfferContent>
          <h1>Special Offers</h1>
          <h2>Limited Collection</h2>
        </OfferContent>
        <CategoryGrid className={animatedSections.offerSection ? 'animated' : ''}>
          {categories.slice(0, 4).map((category, index) => (
            <CategoryButton 
              key={category._id || index}
              onClick={() => navigate(`/product-details?category=${category.slug || category._id}`)}
            >
              {category.name || `Category ${index + 1}`}
            </CategoryButton>
          ))}
        </CategoryGrid>
      </OfferSection>

      <SalesGrid ref={sectionRefs.salesGrid} className={animatedSections.salesGrid ? 'animated' : ''}>
        <SalesCard className={animatedSections.salesGrid ? 'animated' : ''} style={{ animationDelay: '0.2s' }}>
          <img src={heroSlides[0].image} />
          <SalesContent>
            <PriceText>
              NOW $2,499<sup>99t</sup>
            </PriceText>
            <SaveText>SAVE $2,500</SaveText>
            <SaleTitle>Special Collection</SaleTitle>
            <ShopButton onClick={() => navigate('/product-details')}>SHOP NOW</ShopButton>
          </SalesContent>
        </SalesCard>
        
        <SalesCard className={animatedSections.salesGrid ? 'animated' : ''} style={{ animationDelay: '0.4s' }}>
          <img src={heroSlides[1].image} />
          <SalesContent>
            <PriceText>
              NOW $2,499<sup>99t</sup>
            </PriceText>
            <PresetText>PRE SET</PresetText>
            <SaveText>SAVE $2,500</SaveText>
            <SaleTitle>Stocking Stuffers</SaleTitle>
            <ShopButton onClick={() => navigate('/product-details')}>SHOP NOW</ShopButton>
          </SalesContent>
        </SalesCard>
      </SalesGrid>

      <GiftsSection ref={sectionRefs.giftsSection} className={animatedSections.giftsSection ? 'animated' : ''}>
        <GiftsTitle className={animatedSections.giftsSection ? 'animated' : ''}>Gifts For Everyone On Your List</GiftsTitle>
        <GiftsGrid className={animatedSections.giftsSection ? 'animated' : ''}>
          {giftCategories.map((category, index) => (
            <GiftButton
              key={index}
              onClick={() => navigate(category.link)}
            >
              {category.title}
            </GiftButton>
          ))}
        </GiftsGrid>
      </GiftsSection>

      <ServicesBannerSection ref={sectionRefs.servicesSection} className={animatedSections.servicesSection ? 'animated' : ''}>
        <ServicesBanner>
          <ServiceContent className={animatedSections.servicesSection ? 'animated' : ''}>
            <ServiceTitle>Jewelry Services & Repair</ServiceTitle>
            <ServiceDescription>
              Trust our expert craftsmen with your precious pieces. We offer professional cleaning, 
              polishing, repairs, and custom modifications to keep your jewelry looking its best.
            </ServiceDescription>
            <ServiceButton onClick={() => navigate('/repair-and-maintances')}>
              EXPLORE SERVICES
            </ServiceButton>
          </ServiceContent>
          <ServiceImage className={animatedSections.servicesSection ? 'animated' : ''}>
            <img 
              src={heroSlides[2].image}
            />
          </ServiceImage>
        </ServicesBanner>
      </ServicesBannerSection>

      <MariahSection ref={sectionRefs.mariahSection} className={animatedSections.mariahSection ? 'animated' : ''}>
        <ImageContainer className={animatedSections.mariahSection ? 'animated' : ''}>
          <img src={heroSlides[3].image} />
        </ImageContainer>
        
        <ContentContainer className={animatedSections.mariahSection ? 'animated' : ''}>
          <Title>
            Premium Holiday<br />
            Gift Picks
          </Title>
          <Subtitle>
            Unwrap handpicked holiday favorites at JSK.
          </Subtitle>
          <OrderButton onClick={() => navigate('/product-details')}>Order Now</OrderButton>
        </ContentContainer>
      </MariahSection>

      <BlogSection ref={sectionRefs.blogSection} className={animatedSections.blogSection ? 'animated' : ''}>
        <GiftsTitle className={animatedSections.blogSection ? 'animated' : ''}>Latest From Our Blog</GiftsTitle>
        <BlogGrid className={animatedSections.blogSection ? 'animated' : ''}>
          {blogs.map((blog, index) => (
            <BlogCard key={blog._id}>
              <BlogImageContainer>
                <BlogImage 
                  src={blog.featuredImage?.[0] || heroSlides[index % heroSlides.length].image}
                />
              </BlogImageContainer>
              <BlogContent>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogExcerpt>
                  {blog.summary && blog.summary.length > 120 
                    ? `${blog.summary.substring(0, 120)}...` 
                    : blog.summary || "Discover the latest trends and tips in the world of jewelry."}
                </BlogExcerpt>
                <ReadMoreLink to={`/blog/${blog.slug}`}>
                  Read More <ArrowRight size={16} style={{ marginLeft: 5 }} />
                </ReadMoreLink>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </BlogSection>

      <StoresSection ref={sectionRefs.storesSection} className={animatedSections.storesSection ? 'animated' : ''}>
        <GiftsTitle className={animatedSections.storesSection ? 'animated' : ''}>Find Our Stores</GiftsTitle>
        <StoresGrid className={animatedSections.storesSection ? 'animated' : ''}>
          {stores.map((store) => (
            <StoreCard key={store._id}>
              <StoreName>{store.name}</StoreName>
              <StoreAddress>
                {`${store.address}, ${store.city}, ${store.state} ${store.zipCode}`}
              </StoreAddress>
              <StorePhone>{store.phone}</StorePhone>
              <DirectionsButton onClick={() => getStoreDirections(store)}>
                <Diamond size={16} /> Get Directions
              </DirectionsButton>
            </StoreCard>
          ))}
        </StoresGrid>
      </StoresSection>

    
    </Container>
  );
};

export default Home;