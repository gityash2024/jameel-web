import React, { useState } from 'react';
import styled from 'styled-components';
import daimond_logo from "../assets/daimond_logo.svg";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SearchText = styled.p`
  color: #666;
`;

const Link = styled.a`
  color: #000;
  text-decoration: underline;
  cursor: pointer;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.primary ? `
    background: black;
    color: white;
    &:hover {
      background: #333;
    }
  ` : `
    background: white;
    color: black;
    border: 1px solid #ddd;
    &:hover {
      background: #f5f5f5;
    }
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
`;

const Navigation = styled.nav`
  margin-bottom: 2rem;
`;

const NavLink = styled.a`
  color: #666;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const FavoritesRemove = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleRemoveClick = (itemId) => {
    setItemToRemove(itemId);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    // Here you would implement the actual removal logic
    console.log(`Removing item ${itemToRemove}`);
    setShowModal(false);
    setItemToRemove(null);
  };

  const handleCancelRemove = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  return (
    <Container>
      <Navigation>
        <NavLink href="/">Home</NavLink>
        {" / "}
        <NavLink href="/custom-jewelry">Custom Jewelry</NavLink>
      </Navigation>

      <Header>
        <Title>My Account</Title>
        <SubHeader>
          <img src={daimond_logo} alt="Diamond Logo" />
          <SearchText>
            506 results too many?{" "}
            <Link>Describe what you're looking for?</Link>
          </SearchText>
        </SubHeader>
      </Header>

      {/* Example button to trigger modal */}
      <Button onClick={() => handleRemoveClick(1)}>
        Remove from Favorites
      </Button>

      {showModal && (
        <>
          <Overlay onClick={handleCancelRemove} />
          <Modal>
            <CloseButton onClick={handleCancelRemove}>×</CloseButton>
            <ModalTitle>
              Are you sure you want to remove this item from Favorites?
            </ModalTitle>
            <ButtonGroup>
              <Button primary onClick={handleConfirmRemove}>
                Yes
              </Button>
              <Button onClick={handleCancelRemove}>
                No
              </Button>
            </ButtonGroup>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default FavoritesRemove;