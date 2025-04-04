import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SocialShare from './SocialShare';
import ReviewForm from '../components/review/ReviewForm';
import ReviewList from '../components/review/ReviewList';

import styled from "styled-components";
import {
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Diamond,
  Truck,
  Store,
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingBag
} from "lucide-react";
import { productAPI, userAPI, cartAPI, shippingAPI } from "../services/api";
import { toast } from "react-hot-toast";
import { HeaderContext } from "../components/layout/Header";
import RelatedProducts from "../components/product/RelatedProducts";

const defaultContextValues = {
  wishlistItems: [],
  setWishlistItems: () => {},
  cartItems: [],
  setCartItems: () => {},
  isLoggedIn: false
};

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  
  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`;

const Breadcrumb = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  color: #666;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 10px;
    margin-bottom: 12px;
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 992px) {
    grid-template-columns: 70px 1fr 1fr;
    gap: 15px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ThumbColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: min-content;
  max-height: 600px;
  overflow-y: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductDetails = styled.div`
  width: 100%;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0;
    margin-top: 20px;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  
  .item-number {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
    
    .new-tag {
      margin-left: 10px;
      background-color: #E5F6FD;
      color: #0092D2;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }
  }
  
  .share-icon-wrapper {
    margin-right: 10px;
  }
  
  @media (max-width: 768px) {
    .share-icon-wrapper {
      margin-right: 15px;
    }
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 10px;
  line-height: 1.2;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const BrandInfo = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
  
  a {
    color: #555;
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  .stars {
    display: flex;
    align-items: center;
    color: #F5A623;
    margin-right: 8px;
  }
  
  .count {
    font-size: 14px;
    color: #666;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  
  .current {
    font-size: 24px;
    font-weight: 700;
    color: #000;
  }
  
  .original {
    font-size: 18px;
    color: #666;
    text-decoration: line-through;
  }
  
  .discount {
    font-size: 16px;
    font-weight: 500;
    color: #e53e3e;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #FFF5F5;
  }
`;

const InStockInfo = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-block;
  background-color: #F7FAFC;
  color: #4A5568;
  
  &.out-of-stock {
    background-color: #FED7D7;
    color: #C53030;
  }
  
  &.low-stock {
    background-color: #FEEBC8;
    color: #C05621;
  }
`;

const HighlightsList = styled.div`
  margin-bottom: 24px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  
  h4 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 12px;
    color: #333;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 6px;
      font-size: 14px;
      color: #4A5568;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const SizeSelector = styled.div`
  margin-bottom: 24px;
`;

const SizeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  span {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  
  .guide {
    font-size: 14px;
    color: #3182CE;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SizeButton = styled.button`
  min-width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => props.selected ? '#000' : '#ddd'};
  background-color: ${props => props.selected ? '#000' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#333'};
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #000;
  }
`;

const QuantitySelector = styled.div`
  margin-bottom: 24px;
  
  label {
    display: block;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
    color: #333;
  }
  
  .control {
    display: flex;
    max-width: 120px;
    height: 44px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    
    button {
      width: 40px;
      background-color: #f5f5f5;
      border: none;
      color: #333;
      font-size: 18px;
      cursor: pointer;
      
      &:disabled {
        color: #ccc;
        cursor: not-allowed;
      }
      
      &:hover:not(:disabled) {
        background-color: #e0e0e0;
      }
    }
    
    input {
      flex: 1;
      border: none;
      text-align: center;
      font-size: 16px;
      color: #333;
      width: 40px;
      -moz-appearance: textfield;
      
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  
  @media (max-width: 768px) {
    margin: 0 auto 24px;
    
    .control {
      margin: 0 auto;
    }
  }
`;

const AddToCartSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover:not(:disabled) {
    background-color: #333;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const CustomDesignButton = styled.button`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0 16px;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const WishlistButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? '#FFF5F5' : '#fff'};
  color: ${props => props.active ? '#E53E3E' : '#333'};
  border: 1px solid ${props => props.active ? '#FED7D7' : '#ddd'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.active ? '#E53E3E' : '#000'};
  }
  
  @media (max-width: 576px) {
    width: 48px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const AssistanceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 24px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  
  svg {
    color: #4A5568;
    flex-shrink: 0;
  }
  
  div {
    div:first-child {
      font-weight: 500;
      margin-bottom: 4px;
      color: #333;
    }
    
    a {
      color: #3182CE;
      text-decoration: none;
      font-size: 14px;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    
    div {
      text-align: center;
    }
  }
`;

const DeliveryInfo = styled.div`
  border-top: 1px solid #eee;
  padding-top: 24px;
  
  > div {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 16px;
    
    svg {
      color: #4A5568;
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    div {
      div:first-child {
        font-weight: 500;
        margin-bottom: 4px;
        color: #333;
      }
      
      div:last-child {
        color: #666;
        font-size: 14px;
      }
    }
  }
  
  > a {
    display: inline-block;
    margin-top: 8px;
    color: #3182CE;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    > div {
      flex-direction: column;
      align-items: center;
      text-align: center;
      
      svg {
        margin-bottom: 10px;
      }
      
      div {
        text-align: center;
        width: 100%;
      }
    }
    
    > a {
      display: block;
      text-align: center;
    }
    
    form {
      margin: 0 auto;
      max-width: 200px;
      display: flex;
      justify-content: center;
    }
  }
`;

const ThumbImage = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid ${props => props.active ? '#000' : 'transparent'};
  padding: 2px;
  cursor: pointer;
  opacity: ${props => props.active ? 1 : 0.6};
  transition: all 0.2s;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &:hover {
    opacity: 1;
  }
  
  @media (max-width: 992px) {
    width: 70px;
    height: 70px;
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .image-wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    cursor: zoom-in;
    
    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
      transition: transform 0.2s;
    }
  }
  
  .zoom-text {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.8);
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    color: #555;
    display: none; /* Hidden by default, shown on desktop */
  }
  
  @media (min-width: 769px) {
    .zoom-text {
      display: block;
    }
  }
  
  @media (max-width: 768px) {
    border: none;
    width: 100vw;
    margin-left: -20px; /* Compensate for parent padding */
    max-width: 100vw;
    
    .swipe-area {
      width: 100%;
      overflow: hidden;
      position: relative;
      touch-action: pan-y;
    }
    
    .swipe-wrapper {
      display: flex;
      transition: transform 0.3s ease-out;
      min-height: 300px;
    }
    
    .swipe-slide {
      flex: 0 0 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      
      img {
        width: 100%;
        max-height: 60vh;
        object-fit: contain;
      }
    }
    
    @media (max-width: 480px) {
      margin-left: -10px; /* Adjust for smaller screen parent padding */
    }
  }
`;

const ZoomedImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 250%;
  background-repeat: no-repeat;
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: none;
  transition: opacity 0.2s;
`;

const CarouselDotsContainer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 100%;
    padding: 0 20px; /* Add padding to avoid clipping */
  }
`;

const CarouselDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#000' : '#ccc'};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? '#000' : '#999'};
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &.prev {
    left: 10px;
  }
  
  &.next {
    right: 10px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 576px) {
    width: 32px;
    height: 32px;
  }
`;

const AccordionSection = styled.div`
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    margin-bottom: 40px;
  }
  
  @media (max-width: 768px) {
    &:last-child {
      margin-bottom: 30px;
    }
  }
  
  @media (max-width: 480px) {
    &:last-child {
      margin-bottom: 20px;
    }
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  font-weight: 500;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  @media (max-width: 768px) {
    padding: 16px 0;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 14px 0;
    font-size: 14px;
  }
`;

const AccordionContent = styled.div`
  padding-bottom: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  p {
    line-height: 1.6;
    color: #666;
    font-size: 14px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
      color: #666;
      font-size: 14px;
    }
  }
  
  @media (max-width: 768px) {
    padding-bottom: 16px;
    
    p, ul li {
      font-size: 13px;
    }
    
    ul {
      padding-left: 16px;
      
      li {
        margin-bottom: 6px;
      }
    }
  }
  
  @media (max-width: 480px) {
    padding-bottom: 12px;
    
    p, ul li {
      font-size: 12px;
      line-height: 1.4;
    }
    
    ul {
      padding-left: 15px;
      
      li {
        margin-bottom: 5px;
      }
    }
  }
`;

const SpecificationList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  div {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    
    &:nth-child(odd) {
      background-color: ${props => props.alternate ? '#f8f9fa' : 'transparent'};
    }
    
    span:first-child {
      font-weight: 500;
      color: #555;
    }
    
    span:last-child {
      text-align: right;
      color: #333;
    }
  }
  
  @media (max-width: 768px) {
    gap: 10px;
    
    div {
      font-size: 13px;
    }
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    div {
      font-size: 12px;
    }
  }
`;

const SpecTable = styled.div`
  width: 100%;
  
  .spec-group {
    margin-bottom: 20px;
  }
  
  .spec-header {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .spec-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
    }
    
    .spec-label {
      font-weight: 500;
      color: #555;
    }
    
    .spec-value {
      text-align: right;
      color: #333;
    }
  }
`;

const RelatedCategoriesSection = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  
  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  
  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .category-button {
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 0;
    background: #fff;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: #999;
    }
  }
`;

const RatingsBreakdown = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  margin-bottom: 20px;
  
  .ratings-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .rating-stars {
    font-size: 24px;
    display: flex;
    align-items: center;
  }
  
  .rating-number {
    font-size: 20px;
    font-weight: 500;
  }
  
  .rating-count {
    color: #666;
  }
  
  .rating-metrics {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .metric {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .metric-label {
      min-width: 80px;
      font-weight: 500;
    }
    
    .metric-bar {
      flex: 1;
      height: 10px;
      background-color: #ddd;
      position: relative;
      
      .metric-fill {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: #333;
      }
    }
    
    .metric-value {
      min-width: 30px;
      text-align: right;
      font-weight: 500;
    }
  }
`;

const TwoColumnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ColumnSection = styled.div`
  margin-bottom: 20px;
`;

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems, cartItems, setCartItems, isLoggedIn } = useContext(HeaderContext) || defaultContextValues;
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(false);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState("overview");
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const [shippingMethods, setShippingMethods] = useState([]);
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [loadingShippingInfo, setLoadingShippingInfo] = useState(false);
  const [userZipCode, setUserZipCode] = useState('');
  
  const imageWrapperRef = useRef(null);
  const zoomedImageRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const reviewListRef = useRef(null);
  
  // Add new state and refs for mobile swiping
  const swipeRef = useRef(null);
  const startXRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeTranslate, setSwipeTranslate] = useState(0);
  
  // Add state for window width tracking
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('jammelUser');
    setLocalIsLoggedIn(!!(token && userDataStr));
  }, []);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let response;
        if (slug.match(/^[0-9a-fA-F]{24}$/)) {
          response = await productAPI.getProduct(slug);
        } else {
          response = await productAPI.getProductBySlug(slug);
        }
        
        if (response.data.data.product) {
          setProduct(response.data.data.product);
          
          if (response.data.data.product.attributes) {
            const sizeAttribute = response.data.data.product.attributes.find(
              attr => attr.name.toLowerCase() === 'size' || attr.name.toLowerCase() === 'ring size'
            );
            
            if (sizeAttribute && sizeAttribute.value) {
              const sizes = typeof sizeAttribute.value === 'string' 
                ? sizeAttribute.value.split(',').map(s => s.trim())
                : [sizeAttribute.value];
              
              if (sizes.length > 0) {
                setSelectedSize(sizes[0]);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
        navigate('/product-details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug, navigate]);
  
  useEffect(() => {
    if (product && wishlistItems && wishlistItems.length > 0) {
      setIsInWishlist(wishlistItems.includes(product._id));
    } else {
      setIsInWishlist(false);
    }
    
    if (product && (!wishlistItems || wishlistItems.length === 0) && (isLoggedIn || localIsLoggedIn)) {
      const fetchWishlist = async () => {
        try {
          const response = await userAPI.getWishlist();
          if (response.data.data && response.data.data.wishlist) {
            const wishlistProductIds = response.data.data.wishlist.map(item => 
              item.product._id || item.product
            );
            
            if (setWishlistItems) {
              setWishlistItems(wishlistProductIds);
            }
            
            setIsInWishlist(wishlistProductIds.includes(product._id));
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        }
      };
      
      fetchWishlist();
    }
  }, [product, wishlistItems, isLoggedIn, localIsLoggedIn, setWishlistItems]);
  
  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await shippingAPI.getShippingMethods();
        if (response?.data?.data) {
          setShippingMethods(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching shipping methods:', error);
      }
    };
    
    fetchShippingMethods();
    
    const savedAddress = localStorage.getItem('userAddress');
    if (savedAddress) {
      try {
        const addressData = JSON.parse(savedAddress);
        if (addressData.postalCode) {
          setUserZipCode(addressData.postalCode);
          fetchDeliveryEstimate(addressData.postalCode);
        }
      } catch (e) {
        console.error('Error parsing saved address:', e);
      }
    }
  }, []);
  
  const fetchDeliveryEstimate = async (postalCode) => {
    if (!postalCode) return;
    
    setLoadingShippingInfo(true);
    try {
      const response = await shippingAPI.getDeliveryEstimate(postalCode);
      if (response?.data?.data) {
        setDeliveryEstimate(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching delivery estimate:', error);
    } finally {
      setLoadingShippingInfo(false);
    }
  };
  
  const handleZipCodeSubmit = (e) => {
    e.preventDefault();
    if (userZipCode && userZipCode.length >= 5) {
      fetchDeliveryEstimate(userZipCode);
      
      try {
        const savedAddress = localStorage.getItem('userAddress');
        const addressData = savedAddress ? JSON.parse(savedAddress) : {};
        addressData.postalCode = userZipCode;
        localStorage.setItem('userAddress', JSON.stringify(addressData));
      } catch (e) {
        console.error('Error saving address to localStorage:', e);
      }
    }
  };
  
  const handlePrevImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    
    setCurrentImage((prev) => {
      const newIndex = (prev - 1 + product.images.length) % product.images.length;
      return newIndex;
    });
  };

  const handleNextImage = () => {
    if (!product || !product.images || product.images.length === 0) return;
    
    setCurrentImage((prev) => {
      const newIndex = (prev + 1) % product.images.length;
      return newIndex;
    });
  };
  
  const handleAddToCart = async () => {
    if (!isLoggedIn && !localIsLoggedIn) {
      toast.error('Please login to add items to your cart');
      navigate('/login', { state: { from: `/products/${slug}` } });
      return;
    }
    
    if (!selectedSize && product?.attributes?.some(attr => 
      attr.name.toLowerCase() === 'size' || attr.name.toLowerCase() === 'ring size'
    )) {
      toast.error('Please select a size');
      return;
    }
    
    try {
      const cartData = {
        productId: product._id,
        quantity,
        ...(selectedSize && { attributes: [{ name: 'Size', value: selectedSize }] })
      };
      
      await cartAPI.addToCart(cartData);
      
      if (setCartItems) {
        setCartItems(prev => [...prev, { 
          product: product, 
          quantity,
          attributes: selectedSize ? [{ name: 'Size', value: selectedSize }] : []
        }]);
      }
      
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast.success('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };
  
  const handleWishlistToggle = async () => {
    if (!isLoggedIn && !localIsLoggedIn) {
      toast.error('Please login to add items to your wishlist');
      navigate('/login', { state: { from: `/products/${slug}` } });
      return;
    }
    
    try {
      if (isInWishlist) {
        await userAPI.removeFromWishlist(product._id);
        setIsInWishlist(false);
        
        if (setWishlistItems) {
          setWishlistItems(prev => prev.filter(id => id !== product._id));
        }
        
        toast.success('Removed from wishlist');
      } else {
        await userAPI.addToWishlist(product._id);
        setIsInWishlist(true);
        
        if (setWishlistItems) {
          setWishlistItems(prev => [...prev, product._id]);
        }
        
        toast.success('Added to wishlist');
      }
      
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= (product?.stockQuantity || 10)) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < (product?.stockQuantity || 10)) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const getSizeOptions = () => {
    if (!product || !product.attributes) return [];
    
    const sizeAttribute = product.attributes.find(
      attr => attr.name.toLowerCase() === 'size' || attr.name.toLowerCase() === 'ring size'
    );
    
    if (!sizeAttribute) return [];
    
    if (typeof sizeAttribute.value === 'string') {
      return sizeAttribute.value.split(',').map(s => s.trim());
    }
    
    return [sizeAttribute.value];
  };
  
  const handleImageMouseMove = (e) => {
    if (!imageWrapperRef.current || !zoomedImageRef.current) return;
    
    const { left, top, width, height } = imageWrapperRef.current.getBoundingClientRect();
    
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    if (product?.images?.length > 0) {
      const bgPosX = x * 100;
      const bgPosY = y * 100;
      
      zoomedImageRef.current.style.backgroundImage = `url(${product.images[currentImage].url})`;
      zoomedImageRef.current.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
      zoomedImageRef.current.style.backgroundSize = '200%';
      setIsZoomed(true);
    }
  };
  
  const handleImageMouseLeave = () => {
    setIsZoomed(false);
  };
  
  const handleTouchStart = (e) => {
    if (!product || !product.images || product.images.length <= 1) return;
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging || !startXRef.current) return;
    const touchX = e.touches[0].clientX;
    const diff = touchX - startXRef.current;
    const containerWidth = swipeRef.current?.getBoundingClientRect().width || 0;
    // Limit drag to about 40% of container width in either direction
    const limitedDiff = Math.max(Math.min(diff, containerWidth * 0.4), -containerWidth * 0.4);
    setSwipeTranslate(limitedDiff);
  };
  
  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const containerWidth = swipeRef.current?.getBoundingClientRect().width || 0;
    const threshold = containerWidth * 0.2; // 20% threshold to trigger image change
    
    if (swipeTranslate > threshold) {
      handlePrevImage();
    } else if (swipeTranslate < -threshold) {
      handleNextImage();
    }
    
    setIsDragging(false);
    setSwipeTranslate(0);
    startXRef.current = null;
  };
  
  // Add new useEffect for window resize handling
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Split images into main and preview for mobile
  const getMobileImagePreviews = () => {
    if (!product?.images || product.images.length <= 1) return [];
    
    // Return at most 3 preview images
    return product.images.slice(0, Math.min(4, product.images.length));
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>Loading product details...</div>
          <div 
            style={{ 
              display: 'inline-block', 
              width: '50px', 
              height: '50px', 
              border: '5px solid #f3f3f3', 
              borderTop: '5px solid #000', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }} 
          />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </PageContainer>
    );
  }
  
  if (!product) {
    return (
      <PageContainer>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <div style={{ fontSize: '24px', marginBottom: '20px' }}>Product not found</div>
          <button 
            onClick={() => navigate('/product-details')} 
            style={{ 
              padding: '10px 20px', 
              background: '#000', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            Go to Products
          </button>
        </div>
      </PageContainer>
    );
  }
  
  const sizes = getSizeOptions();
  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
  const discountPercentage = hasDiscount 
    ? Math.round((1 - product.salePrice / product.regularPrice) * 100) 
    : 0;
  
  const currentPrice = hasDiscount ? product.salePrice : product.regularPrice;
  const isLowStock = product.stockQuantity <= product.lowStockThreshold;
  const isOutOfStock = product.stockQuantity <= 0 || product.stockStatus === 'out_of_stock';

  return (
    <PageContainer>
      <Breadcrumb>
        <Link to="/">Home</Link> / 
        {product.category && <Link to={`/product-details?category=${product.category.slug}`}> {product.category.name}</Link>} / 
        {product.subcategory && <Link to={`/product-details?category=${product.category.slug}&subcategory=${product.subcategory._id}`}> {product.subcategory.name}</Link>} / 
        <span>{product.name}</span>
      </Breadcrumb>

      <ProductLayout>
        <ThumbColumn>
          {product.images && product.images.map((image, index) => (
            <ThumbImage
              key={index}
              active={currentImage === index}
              onClick={() => setCurrentImage(index)}
            >
              <img src={image.url} alt={`${product.name} view ${index + 1}`} />
            </ThumbImage>
          ))}
        </ThumbColumn>

        <MainImageContainer>
          <NavigationButton className="prev" onClick={handlePrevImage}>
            <ChevronLeft size={20} />
          </NavigationButton>

          {/* Desktop view */}
          <div 
            className="image-wrapper desktop-only"
            ref={imageWrapperRef}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
            style={{ display: windowWidth > 768 ? 'flex' : 'none' }}
          >
            {product.images && product.images.length > 0 && (
              <img src={product.images[currentImage].url} alt={product.name} />
            )}
            <ZoomedImage 
              ref={zoomedImageRef} 
              visible={isZoomed}
            />
          </div>
          
          {/* Mobile view with swipe functionality */}
          <div 
            className="swipe-area"
            ref={swipeRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ display: windowWidth <= 768 ? 'block' : 'none' }}
          >
            <div 
              className="swipe-wrapper" 
              style={{ 
                transform: `translateX(${swipeTranslate}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-out'
              }}
            >
              {product.images && product.images.length > 0 && (
                <div className="swipe-slide">
                  <img src={product.images[currentImage].url} alt={product.name} />
                </div>
              )}
            </div>
          </div>

          <NavigationButton className="next" onClick={handleNextImage}>
            <ChevronRight size={20} />
          </NavigationButton>
          
          <div className="zoom-text">Hover over image to zoom</div>
        </MainImageContainer>
        
        {/* Carousel dots below the image */}
        <CarouselDotsContainer>
          {product.images && product.images.map((_, index) => (
            <CarouselDot
              key={index}
              active={currentImage === index}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </CarouselDotsContainer>

        <ProductDetails>
          <ProductHeader>
            <div className="item-number">
              <span>Item #: {product.sku}</span>
              {product.isNewArrival && <span className="new-tag">New</span>}
            </div>
            <div className="share-icon-wrapper">
              <SocialShare productName={product.name} productId={product._id} />
            </div>
          </ProductHeader>

          <Title>{product.name}</Title>
          
          <BrandInfo>
            By <Link to={`/product-details?brand=${encodeURIComponent(product.brand)}`}>{product.brand}</Link>
          </BrandInfo>
          
          <RatingContainer>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.floor(product.averageRating) ? 'currentColor' : 'none'} 
                />
              ))}
            </div>
            <span className="count">
              {product.numberOfReviews} {product.numberOfReviews === 1 ? 'review' : 'reviews'}
            </span>
          </RatingContainer>

          <PriceContainer>
            <span className="current">${currentPrice.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="original">${product.regularPrice.toFixed(2)}</span>
                <span className="discount">{discountPercentage}% off</span>
              </>
            )}
          </PriceContainer>
          
          {isOutOfStock ? (
            <InStockInfo className="out-of-stock">Currently Out of Stock</InStockInfo>
          ) : isLowStock ? (
            <InStockInfo className="low-stock">Only {product.stockQuantity} left in stock - order soon</InStockInfo>
          ) : (
            <InStockInfo>In Stock</InStockInfo>
          )}
          
          <HighlightsList>
            <h4>Product Highlights</h4>
            <ul>
              {product.specifications?.length > 0 ? (
                product.specifications.slice(0, 3).map((spec, index) => (
                  <li key={index}>{spec.name}: {spec.value}</li>
                ))
              ) : (
                <>
                  <li>Brand: {product.brand}</li>
                  {product.materials?.length > 0 && (
                    <li>Materials: {product.materials.join(', ')}</li>
                  )}
                  {sizes.length > 0 && (
                    <li>Available Sizes: {sizes.join(', ')}</li>
                  )}
                </>
              )}
            </ul>
          </HighlightsList>

          {sizes.length > 0 && (
            <SizeSelector>
              <SizeHeader>
                <span>Select Your Size:</span>
                <Link to="#" className="guide">
                  Size Guide
                </Link>
              </SizeHeader>
              <SizeGrid>
                {sizes.map((size) => (
                  <SizeButton
                    key={size}
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
              </SizeGrid>
            </SizeSelector>
          )}
          
          <QuantitySelector>
            <label>Quantity:</label>
            <div className="control">
              <button onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
              <input 
                type="number" 
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stockQuantity || 10}
              />
              <button onClick={incrementQuantity} disabled={quantity >= (product.stockQuantity || 10)}>+</button>
            </div>
          </QuantitySelector>

          <AddToCartSection>
            <AddToCartButton onClick={handleAddToCart} disabled={isOutOfStock}>
              <ShoppingBag size={18} />
              {isOutOfStock ? 'OUT OF STOCK' : 'ADD TO BAG'}
            </AddToCartButton>
            <CustomDesignButton onClick={() => navigate('/make-with-jsk')}>
              <Diamond size={18} />
              CUSTOM DESIGN
            </CustomDesignButton>
            <WishlistButton 
              active={isInWishlist}
              onClick={handleWishlistToggle}
            >
              <Heart size={20} fill={isInWishlist ? "#ED4956" : "none"} />
            </WishlistButton>
          </AddToCartSection>

          <AssistanceSection>
            <Diamond size={24} />
            <div>
              <div>Still Deciding? Let Me Help You Find the Right Piece!</div>
              <Link to="/make-with-jsk">Describe what you're looking for?</Link>
            </div>
          </AssistanceSection>

          <DeliveryInfo>
            <div>
              <Truck size={24} />
              <div>
                {loadingShippingInfo ? (
                  <>
                    <div>Calculating delivery estimate...</div>
                    <div>Please wait</div>
                  </>
                ) : deliveryEstimate ? (
                  <>
                    <div>Estimated Delivery: {new Date(deliveryEstimate.estimatedDeliveryDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                    <div>Free shipping with FedEx {deliveryEstimate.serviceType || 'Standard'}</div>
                  </>
                ) : (
                  <>
                    <div>Enter your ZIP code for delivery estimate</div>
                    <form onSubmit={handleZipCodeSubmit} style={{ display: 'flex', marginTop: '8px' }}>
                      <input 
                        type="text" 
                        value={userZipCode}
                        onChange={(e) => setUserZipCode(e.target.value)}
                        placeholder="ZIP Code"
                        style={{ 
                          width: '100px', 
                          padding: '6px 8px', 
                          border: '1px solid #ddd',
                          borderTopLeftRadius: '4px',
                          borderBottomLeftRadius: '4px',
                          fontSize: '13px'
                        }}
                      />
                      <button 
                        type="submit"
                        style={{
                          background: '#000',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 10px',
                          borderTopRightRadius: '4px',
                          borderBottomRightRadius: '4px',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}
                      >
                        Go
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div>
              <Store size={24} />
              <div>
                <div>Looking to pickup this item?</div>
                <div>See your options.</div>
              </div>
            </div>

            <Link to="/find-your-store">
              Choose a Store.
            </Link>
          </DeliveryInfo>
        </ProductDetails>
      </ProductLayout>
      
      <div style={{ maxWidth: '1200px', margin: '40px auto 0' }}>
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "overview" ? "" : "overview")}
          >
            Overview
            {openSection === "overview" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "overview"}>
            <p>{product.description}</p>
            {product.specifications && product.specifications.length > 0 && (
              <SpecificationList alternate>
                {product.specifications.map((spec, index) => (
                  <div key={index}>
                    <span>{spec.name}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </SpecificationList>
            )}
          </AccordionContent>
        </AccordionSection>
        
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "details" ? "" : "details")}
          >
            Details
            {openSection === "details" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "details"}>
            <div>
              <p>{product.shortDescription}</p>
              <TwoColumnContainer>
                <ColumnSection>
                  <SpecTable>
                    <div className="spec-group">
                      <div className="spec-header">Stone(s)</div>
                      {product.stone && (
                        <div className="spec-row">
                          <div className="spec-label">Stone:</div>
                          <div className="spec-value">{product.stone}</div>
                        </div>
                      )}
                      {product.totalWeight && (
                        <div className="spec-row">
                          <div className="spec-label">Total Weight (CT. T.W.):</div>
                          <div className="spec-value">{product.totalWeight}</div>
                        </div>
                      )}
                      {product.stoneType && (
                        <div className="spec-row">
                          <div className="spec-label">Stone Type:</div>
                          <div className="spec-value">{product.stoneType}</div>
                        </div>
                      )}
                      {product.color && (
                        <div className="spec-row">
                          <div className="spec-label">Color:</div>
                          <div className="spec-value">{product.color}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="spec-group">
                      <div className="spec-header">Metal(s)</div>
                      {product.metalType && (
                        <div className="spec-row">
                          <div className="spec-label">Metal Type:</div>
                          <div className="spec-value">{product.metalType}</div>
                        </div>
                      )}
                      {product.metalColor && (
                        <div className="spec-row">
                          <div className="spec-label">Metal Color:</div>
                          <div className="spec-value">{product.metalColor}</div>
                        </div>
                      )}
                    </div>
                  </SpecTable>
                </ColumnSection>
                
                <ColumnSection>
                  <SpecTable>
                    <div className="spec-group">
                      <div className="spec-header">Ring Design</div>
                      {product.ringStyle && (
                        <div className="spec-row">
                          <div className="spec-label">Ring Style:</div>
                          <div className="spec-value">{product.ringStyle}</div>
                        </div>
                      )}
                      {product.standardRingSize && (
                        <div className="spec-row">
                          <div className="spec-label">Standard Ring Size:</div>
                          <div className="spec-value">{product.standardRingSize}</div>
                        </div>
                      )}
                      {product.height && (
                        <div className="spec-row">
                          <div className="spec-label">Height:</div>
                          <div className="spec-value">{product.height}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="spec-group">
                      <div className="spec-header">Product Attributes</div>
                      {product.clarity && (
                        <div className="spec-row">
                          <div className="spec-label">Clarity:</div>
                          <div className="spec-value">{product.clarity}</div>
                        </div>
                      )}
                      {product.stoneShape && (
                        <div className="spec-row">
                          <div className="spec-label">Stone Shape:</div>
                          <div className="spec-value">{product.stoneShape}</div>
                        </div>
                      )}
                      {product.goldKarat && (
                        <div className="spec-row">
                          <div className="spec-label">Gold Karat:</div>
                          <div className="spec-value">{product.goldKarat}</div>
                        </div>
                      )}
                      {product.stoneClass && (
                        <div className="spec-row">
                          <div className="spec-label">Stone Class:</div>
                          <div className="spec-value">{product.stoneClass}</div>
                        </div>
                      )}
                    </div>
                  </SpecTable>
                </ColumnSection>
              </TwoColumnContainer>
            </div>
          </AccordionContent>
        </AccordionSection>
        
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "shipping" ? "" : "shipping")}
          >
            Shipping & Returns
            {openSection === "shipping" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "shipping"}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Shipping</h4>
              <p>Ship to you, to your store, or to a UPS Access Point near you. Free shipping offer may be modified or terminated at any time without notice. <a href="#" style={{ color: '#333', textDecoration: 'underline' }}>Learn More</a></p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Returns & Exchanges</h4>
              <p>Your online purchase may be returned to any of our stores or returned by mail to our distribution center.</p>
              <p>You can return your item for up to 30 days after purchase or exchange it within 60 days. Watches may be returned or exchanged within 30 days. Exchanges must be done at a store.</p>
              <p>Watches that haven't been special ordered and accessories can be returned if they're unworn or unaltered, and must be accompanied by the original packaging, instructions and warranty information within 30 days of purchase. Again, exchanges can only be done at a store.</p>
              <p>You can't return or exchange custom-designed merchandise, class rings, special-ordered watches or PANDORA merchandise.</p>
            </div>
          </AccordionContent>
        </AccordionSection>
        
        <AccordionSection>
          <AccordionHeader 
            onClick={() => setOpenSection(openSection === "reviews" ? "" : "reviews")}
          >
            Reviews
            {openSection === "reviews" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "reviews"}>
            <div>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '18px', marginBottom: '10px' }}>{product.numberOfReviews} customers reviewed this product</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={24} 
                      fill={i < Math.floor(product.averageRating) ? '#F5A623' : 'none'} 
                      color="#F5A623"
                    />
                  ))}
                </div>
                <div style={{ fontSize: '18px', fontWeight: '500' }}>{product.averageRating?.toFixed(2) || 0} stars out of 5</div>
              </div>
              
              <RatingsBreakdown>
                <div className="ratings-summary">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div className="metric">
                      <div className="metric-label">Quality</div>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{ width: '100%' }}></div>
                      </div>
                      <div className="metric-value">5.0</div>
                    </div>
                    <div className="metric">
                      <div className="metric-label">Value</div>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{ width: '98%' }}></div>
                      </div>
                      <div className="metric-value">4.9</div>
                    </div>
                    <div className="metric">
                      <div className="metric-label">Appearance</div>
                      <div className="metric-bar">
                        <div className="metric-fill" style={{ width: '96%' }}></div>
                      </div>
                      <div className="metric-value">4.8</div>
                    </div>
                  </div>
                </div>
              </RatingsBreakdown>
            </div>
            
            {!isLoggedIn && !localIsLoggedIn ? (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <p style={{ marginBottom: '15px' }}>Please login to write a review</p>
                <button
                  style={{
                    background: '#000',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate('/login', { state: { from: `/products/${slug}` } })}
                >
                  Login
                </button>
              </div>
            ) : (
              <div>
                <button
                  style={{
                    display: 'block',
                    width: 'fit-content',
                    margin: '0 auto 20px',
                    padding: '10px 20px',
                    background: '#fff',
                    border: '1px solid #333',
                    borderRadius: '0',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    // Display review form logic here
                    // We'll keep the existing implementation
                  }}
                >
                  Write a Review
                </button>
                <ReviewForm 
                  productId={product._id} 
                  onReviewSubmitted={() => {
                    if (reviewListRef.current) {
                      reviewListRef.current.fetchReviews(true);
                    }
                  }} 
                />
              </div>
            )}
            
            <ReviewList 
              productId={product._id}
              isLoggedIn={isLoggedIn}
              localIsLoggedIn={localIsLoggedIn}
              ref={reviewListRef}
            />
          </AccordionContent>
        </AccordionSection>
        
        <RelatedCategoriesSection>
          <h3>Related Categories</h3>
          <div className="categories">
            <button className="category-button">Halo Engagement Rings</button>
            <button className="category-button">Now and Forever Engagement</button>
            <button className="category-button">Princess-Cut Engagement Rings</button>
            <button className="category-button">Womens Rings</button>
            <button className="category-button">Engagement Rings</button>
            <button className="category-button">Diamond Rings</button>
            <button className="category-button">Womens Collections</button>
            <button className="category-button">Now and Forever Collections</button>
          </div>
        </RelatedCategoriesSection>
      </div>
    </PageContainer>
  );
};

export default ProductDetail;