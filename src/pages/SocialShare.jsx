import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Share2, X, Facebook, Twitter, Linkedin, Mail, Link2, Instagram } from "lucide-react";

const ShareContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ShareButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #000;
  }
`;

const ShareDropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 200px;
  z-index: 100;
  padding: 8px 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const ShareHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 8px;
  
  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: #000;
    }
  }
`;

const ShareOption = styled.a`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  .icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  
  .facebook {
    color: #1877F2;
  }
  
  .twitter {
    color: #1DA1F2;
  }
  
  .linkedin {
    color: #0A66C2;
  }
  
  .instagram {
    color: #E4405F;
  }
  
  .email {
    color: #D44638;
  }
  
  .copy {
    color: #333;
  }
`;

const SocialShare = ({ productName, productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const closeDropdown = () => {
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Get current product URL
  const productUrl = `${window.location.origin}/products/${productId}`;
  
  // Social share URLs
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${productName}`)}&url=${encodeURIComponent(productUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`;
  const instagramShareUrl = `https://www.instagram.com/`;  // Instagram doesn't support direct sharing, but we'll open the page
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(`Check out this ${productName}`)}&body=${encodeURIComponent(`I found this amazing product and thought you might like it: ${productUrl}`)}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <ShareContainer ref={dropdownRef}>
      <ShareButton onClick={toggleDropdown}>
        <Share2 size={20} />
      </ShareButton>
      
      <ShareDropdown isOpen={isOpen}>
        <ShareHeader>
          <h4>Share This Product</h4>
          <button onClick={closeDropdown}>
            <X size={16} />
          </button>
        </ShareHeader>
        
        <ShareOption href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
          <span className="icon facebook">
            <Facebook size={16} />
          </span>
          Facebook
        </ShareOption>
        
        <ShareOption href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
          <span className="icon twitter">
            <Twitter size={16} />
          </span>
          Twitter
        </ShareOption>
        
        <ShareOption href={linkedinShareUrl} target="_blank" rel="noopener noreferrer">
          <span className="icon linkedin">
            <Linkedin size={16} />
          </span>
          LinkedIn
        </ShareOption>
        
        <ShareOption href={instagramShareUrl} target="_blank" rel="noopener noreferrer">
          <span className="icon instagram">
            <Instagram size={16} />
          </span>
          Instagram
        </ShareOption>
        
        <ShareOption href={emailShareUrl}>
          <span className="icon email">
            <Mail size={16} />
          </span>
          Email
        </ShareOption>
        
        <ShareOption href="#" onClick={(e) => { e.preventDefault(); copyToClipboard(); }}>
          <span className="icon copy">
            <Link2 size={16} />
          </span>
          {copied ? "Copied!" : "Copy Link"}
        </ShareOption>
      </ShareDropdown>
    </ShareContainer>
  );
};

export default SocialShare;