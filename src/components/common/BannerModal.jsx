import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { X } from 'react-feather';
import { bannerAPI } from '../../services/api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.visible ? '1' : '0'};
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transition: all 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: ${props => props.visible ? 'scale(1)' : 'scale(0.9)'};
  opacity: ${props => props.visible ? '1' : '0'};
  transition: all 0.3s ease-in-out;
`;

const BannerImage = styled.img`
  width: 100%;
  max-height: 90vh;
  object-fit: contain;
  vertical-align: middle;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    background-color: #f8f8f8;
  }
`;

const LinkWrapper = styled.a`
  display: block;
  cursor: ${props => props.hasLink ? 'pointer' : 'default'};
`;

const BannerModal = () => {
  const [banner, setBanner] = useState(null);
  const [visible, setVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await bannerAPI.getActiveBanner();
        if (response.data && response.data.data && response.data.data.banner) {
          setBanner(response.data.data.banner);
          // Show modal after a short delay
          setTimeout(() => {
            setVisible(true);
            // Trigger content animation after overlay is visible
            setTimeout(() => {
              setContentVisible(true);
            }, 100);
          }, 1000);
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };
    
    fetchBanner();
  }, []);
  
  const handleClose = () => {
    setContentVisible(false);
    // Wait for content animation to complete before hiding overlay
    setTimeout(() => {
      setVisible(false);
      // Optional: Set a cookie or localStorage item to remember the banner was closed
      localStorage.setItem('bannerClosed', Date.now().toString());
    }, 300);
  };
  
  if (!banner) return null;
  
  return (
    <ModalOverlay visible={visible} onClick={handleClose}>
      <ModalContent visible={contentVisible} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          <X size={20} />
        </CloseButton>
        <LinkWrapper 
          href={banner.link || '#'} 
          target={banner.link ? "_blank" : ""} 
          rel={banner.link ? "noopener noreferrer" : ""}
          hasLink={!!banner.link}
        >
          <BannerImage 
            src={banner.image?.url} 
            alt={banner.image?.alt || banner.title} 
          />
        </LinkWrapper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default BannerModal; 