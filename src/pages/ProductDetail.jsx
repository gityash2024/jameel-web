import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SocialShare from './SocialShare';

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
import { productAPI, userAPI, cartAPI } from "../services/api";
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
  grid-template-columns: 90px 1fr 480px;
  gap: 40px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 80px 1fr 400px;
    gap: 30px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 70px 1fr 350px;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const ThumbColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProductDetails = styled.div`
  padding-left: 20px;
  
  @media (max-width: 768px) {
    padding-left: 0;
    order: 2;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .item-number {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #666;
    font-size: 14px;
  }

  .new-tag {
    background: #f5f2ee;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 12px;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 15px;
    
    .item-number {
      font-size: 12px;
      gap: 8px;
    }
    
    .new-tag {
      padding: 3px 8px;
      font-size: 10px;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 24px;
  line-height: 1.2;
  
  @media (max-width: 992px) {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const BrandInfo = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  color: #666;
  
  a {
    color: #000;
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  
  .stars {
    display: flex;
    color: #f9a826;
  }
  
  .count {
    color: #666;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
    
    .count {
      font-size: 13px;
    }
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
    gap: 6px;
    
    .count {
      font-size: 12px;
    }
    
    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;

  .current {
    font-size: 32px;
    font-weight: bold;
  }

  .original {
    font-size: 32px;
    color: #666;
    text-decoration: line-through;
  }

  .discount {
    background: #e8f4f0;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    gap: 10px;
    
    .current, .original {
      font-size: 24px;
    }
    
    .discount {
      font-size: 12px;
      padding: 3px 10px;
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 14px;
    gap: 8px;
    
    .current, .original {
      font-size: 20px;
    }
    
    .discount {
      font-size: 11px;
      padding: 2px 8px;
    }
  }
`;

const InStockInfo = styled.div`
  font-size: 14px;
  color: #2e7d32;
  font-weight: 500;
  margin-bottom: 16px;
  
  &.low-stock {
    color: #ed6c02;
  }
  
  &.out-of-stock {
    color: #d32f2f;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 14px;
  }
  
  @media (max-width: 480px) {
    font-size: 12px;
    margin-bottom: 12px;
  }
`;

const SizeSelector = styled.div`
  margin: 30px 0;
  
  @media (max-width: 768px) {
    margin: 24px 0;
  }
  
  @media (max-width: 480px) {
    margin: 20px 0;
  }
`;

const SizeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .guide {
    color: #000;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 12px;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    margin-bottom: 10px;
    font-size: 12px;
  }
`;

const SizeGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const SizeButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1px solid ${props => props.selected ? '#000' : '#e0e0e0'};
  background: ${props => props.selected ? '#000' : '#fff'};
  color: ${props => props.selected ? '#fff' : '#000'};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
  
  @media (max-width: 576px) {
    width: 40px;
    height: 40px;
    font-size: 13px;
  }
  
  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }
`;

const AddToCartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    margin-top: 24px;
  }
  
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
`;

const AddToCartButton = styled.button`
  background: #000;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #333;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    font-size: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 14px;
    gap: 6px;
  }
`;

const WishlistButton = styled.button`
  width: 50px;
  background: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.active ? '#ED4956' : '#666'};

  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 768px) {
    width: 45px;
  }
  
  @media (max-width: 576px) {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const AssistanceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 30px 0;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;

  a {
    color: #000;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    margin: 24px 0;
    padding: 16px 0;
    gap: 10px;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 14px 0;
    font-size: 13px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
  
  @media (max-width: 480px) {
    margin: 20px 0;
    padding: 12px 0;
    font-size: 12px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const ThumbImage = styled.div`
  border: 1px solid ${props => props.active ? '#000' : '#e0e0e0'};
  padding: 8px;
  cursor: pointer;
  height: 90px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
  background: white;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 992px) {
    height: 70px;
    width: 70px;
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  margin: 0 40px;
  
  @media (max-width: 992px) {
    margin: 0 30px;
  }
  
  @media (max-width: 768px) {
    margin: 0;
    order: 1;
  }

  .image-wrapper {
    border: 1px solid #e0e0e0;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    background: white;
    overflow: hidden;
    position: relative;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }
    
    @media (max-width: 992px) {
      min-height: 500px;
      padding: 30px;
    }
    
    @media (max-width: 768px) {
      min-height: 350px;
      padding: 20px;
    }
    
    @media (max-width: 576px) {
      min-height: 300px;
      padding: 15px;
    }
    
    @media (max-width: 480px) {
      min-height: 250px;
      padding: 10px;
    }
  }

  .zoom-text {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 12px;
    
    @media (max-width: 768px) {
      font-size: 12px;
      margin-top: 8px;
    }
    
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const ZoomedImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  opacity: ${props => props.visible ? 1 : 0};
  pointer-events: none;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileThumbsContainer = styled.div`
  display: none;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 8px;
  margin-top: 16px;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
  
  @media (max-width: 480px) {
    gap: 6px;
    margin-top: 12px;
  }
`;

const MobileThumb = styled.div`
  border: 1px solid ${props => props.active ? '#000' : '#e0e0e0'};
  padding: 4px;
  cursor: pointer;
  flex: 0 0 auto;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    padding: 3px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: border-color 0.2s ease;

  &.prev {
    left: -20px;
  }
  &.next {
    right: -20px;
  }

  &:hover {
    border-color: #000;
  }
  
  @media (max-width: 992px) {
    width: 36px;
    height: 36px;
  }
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    
    &.prev {
      left: 5px;
    }
    &.next {
      right: 5px;
    }
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 480px) {
    width: 25px;
    height: 25px;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  label {
    font-size: 14px;
    margin-right: 12px;
    font-weight: 500;
  }
  
  .control {
    display: flex;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    
    button {
      width: 36px;
      height: 36px;
      background: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: #f5f5f5;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    input {
      width: 50px;
      height: 36px;
      border: none;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
      text-align: center;
      font-size: 14px;
      
      &:focus {
        outline: none;
      }
    }
  }
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
    
    label {
      font-size: 13px;
      margin-right: 10px;
    }
    
    .control {
      button {
        width: 32px;
        height: 32px;
      }
      
      input {
        width: 40px;
        height: 32px;
        font-size: 13px;
      }
    }
  }
  
  @media (max-width: 480px) {
    margin-bottom: 14px;
    flex-wrap: wrap;
    
    label {
      font-size: 12px;
      margin-right: 8px;
      margin-bottom: 5px;
    }
    
    .control {
      button {
        width: 30px;
        height: 30px;
      }
      
      input {
        width: 35px;
        height: 30px;
        font-size: 12px;
      }
    }
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

const DeliveryInfo = styled.div`
  margin-top: 30px;
  
  > div {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    
    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      div:first-child {
        font-weight: 500;
      }
      
      div:last-child {
        color: #666;
        font-size: 14px;
      }
    }
  }
  
  a {
    color: #000;
    text-decoration: underline;
    display: inline-block;
    margin-top: 12px;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    margin-top: 24px;
    
    > div {
      gap: 10px;
      margin-bottom: 14px;
      
      div {
        gap: 2px;
      }
      
      div div:last-child {
        font-size: 13px;
      }
    }
    
    a {
      margin-top: 10px;
      font-size: 13px;
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
    
    > div {
      gap: 8px;
      margin-bottom: 12px;
      
      svg {
        width: 18px;
        height: 18px;
      }
      
      div div:first-child {
        font-size: 12px;
      }
      
      div div:last-child {
        font-size: 11px;
      }
    }
    
    a {
      margin-top: 8px;
      font-size: 12px;
    }
  }
`;

const SpecificationList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  div {
    font-size: 14px;
    
    span:first-child {
      font-weight: 500;
      margin-right: 8px;
    }
    
    span:last-child {
      color: #666;
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

const HighlightsList = styled.div`
  margin: 20px 0;
  
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
      color: #333;
    }
  }
  
  @media (max-width: 768px) {
    margin: 16px 0;
    
    h4 {
      font-size: 15px;
      margin-bottom: 10px;
    }
    
    ul {
      padding-left: 16px;
      
      li {
        margin-bottom: 6px;
        font-size: 13px;
      }
    }
  }
  
  @media (max-width: 480px) {
    margin: 14px 0;
    
    h4 {
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    ul {
      padding-left: 14px;
      
      li {
        margin-bottom: 5px;
        font-size: 12px;
      }
    }
  }
`;

const FinancingInfo = styled.div`
  background: #f9f9f9;
  padding: 16px;
  border-radius: 4px;
  margin: 16px 0;
  
  h4 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }
  
  a {
    color: #000;
    text-decoration: underline;
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    padding: 14px;
    margin: 14px 0;
    
    h4 {
      font-size: 15px;
      margin-bottom: 6px;
    }
    
    p {
      font-size: 13px;
      margin-bottom: 6px;
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    margin: 12px 0;
    
    h4 {
      font-size: 14px;
      margin-bottom: 5px;
    }
    
    p {
      font-size: 12px;
      margin-bottom: 5px;
    }
    
    a {
      font-size: 12px;
    }
  }
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
  
  const imageWrapperRef = useRef(null);
  const zoomedImageRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  
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
      
      // Dispatch custom event to trigger cart update in header
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
      
      // Dispatch custom event to trigger wishlist update in header
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

          <div 
            className="image-wrapper" 
            ref={imageWrapperRef}
            onMouseMove={handleImageMouseMove}
            onMouseLeave={handleImageMouseLeave}
          >
            {product.images && product.images.length > 0 && (
              <img src={product.images[currentImage].url} alt={product.name} />
            )}
            <ZoomedImage 
              ref={zoomedImageRef} 
              visible={isZoomed}
            />
          </div>

          <NavigationButton className="next" onClick={handleNextImage}>
            <ChevronRight size={20} />
          </NavigationButton>
          
          <div className="zoom-text">Hover over image to zoom</div>
          
          <MobileThumbsContainer>
            {product.images && product.images.map((image, index) => (
              <MobileThumb
                key={index}
                active={currentImage === index}
                onClick={() => setCurrentImage(index)}
              >
                <img src={image.url} alt={`${product.name} view ${index + 1}`} />
              </MobileThumb>
            ))}
          </MobileThumbsContainer>
        </MainImageContainer>

        <ProductDetails>
        <ProductHeader>
  <div className="item-number">
    <span>Item #: {product.sku}</span>
    {product.isNewArrival && <span className="new-tag">New</span>}
  </div>
  <SocialShare productName={product.name} productId={product._id} />
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
          
          <FinancingInfo>
            <h4>Financing Options Available</h4>
            <p>Pay over time with special financing offers</p>
            <Link to="#">View Other Financing Options</Link>
          </FinancingInfo>
          
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
              <Link to="#">Describe what you're looking for?</Link>
            </div>
          </AssistanceSection>

          <DeliveryInfo>
            <div>
              <Truck size={24} />
              <div>
                <div>Delivery by Friday, November 22</div>
                <div>Order within 9 hours 10 mins</div>
              </div>
            </div>

            <div>
              <Store size={24} />
              <div>
                <div>Looking to pickup this item?</div>
                <div>See your options.</div>
              </div>
            </div>

            <Link to="#">
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
              <SpecificationList>
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
            onClick={() => setOpenSection(openSection === "shipping" ? "" : "shipping")}
          >
            Shipping & Returns
            {openSection === "shipping" ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </AccordionHeader>
          <AccordionContent isOpen={openSection === "shipping"}>
            <p>We want you to be completely satisfied with your purchase. If you're not happy with your item, you may return it within 30 days of delivery for a full refund of the merchandise value.</p>
            <ul>
              <li>Items must be in their original condition with all original packaging.</li>
              <li>Shipping charges are not refundable.</li>
              <li>Custom orders cannot be returned or exchanged.</li>
              <li>Please allow 5-7 business days for returns to be processed.</li>
            </ul>
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
              <ul>
                {product.materials && product.materials.map((material, index) => (
                  <li key={index}>Material: {material}</li>
                ))}
                {product.dimensions && product.dimensions.length && (
                  <li>
                    Dimensions: {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} {product.dimensions.unit}
                  </li>
                )}
                {product.weight && product.weight.value && (
                  <li>
                    Weight: {product.weight.value} {product.weight.unit}
                  </li>
                )}
              </ul>
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
            <p>No reviews yet. Be the first to leave a review!</p>
            <button
              style={{
                background: '#000',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                marginTop: '16px',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (!isLoggedIn && !localIsLoggedIn) {
                  toast.error('Please login to write a review');
                  navigate('/login', { state: { from: `/products/${slug}` } });
                  return;
                }
                toast.success('Review feature is coming soon!');
              }}
            >
              Write a Review
            </button>
          </AccordionContent>
        </AccordionSection>
      </div>
    </PageContainer>
  );
};

export default ProductDetail;