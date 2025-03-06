import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, Phone, Mail, MessageSquare, HelpCircle, Clock } from 'lucide-react';
import { supportAPI } from "../services/api";
import { HeaderContext } from '../components/layout/Header';
import daimond_logo from "../assets/daimond_logo.svg";
import jewelryservices from "../assets/jewelryservices.svg";
import justatyourservice_1 from "../assets/justatyourservice_1.svg";
import justatyourservice_2 from "../assets/justatyourservice_2.svg";
import justatyourservice_3 from "../assets/justatyourservice_3.svg";
import justatyourservice_4 from "../assets/justatyourservice_4.svg";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 42px;
    margin-bottom: 20px;
    font-weight: 600;
    color: #222;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  a {
    color: #6366F1;
    text-decoration: underline;
    font-weight: 500;
    
    &:hover {
      color: #4F46E5;
    }
  }
`;

const HeroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    max-height: 450px;
  }
  
  .content {
    padding: 40px;
    
    h2 {
      font-size: 36px;
      margin-bottom: 20px;
      color: #111827;
      font-weight: 600;
    }
    
    p {
      color: #4B5563;
      line-height: 1.6;
      font-size: 18px;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
    .content {
      padding: 30px 20px;
    }
  }
`;

const Section = styled.div`
  margin-bottom: 80px;
  
  h2 {
    font-size: 32px;
    text-align: center;
    margin-bottom: 40px;
    color: #111827;
    font-weight: 600;
  }
`;

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 30px;
  
  h3 {
    font-size: 22px;
    margin-bottom: 24px;
    color: #111827;
    font-weight: 600;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    
    label {
      font-weight: 500;
      color: #374151;
    }
    
    input, textarea {
      padding: 12px;
      border: 1px solid #E5E7EB;
      border-radius: 6px;
      font-size: 16px;
      
      &:focus {
        outline: none;
        border-color: #6366F1;
      }
    }
    
    textarea {
      min-height: 150px;
      resize: vertical;
    }
  }
  
  button {
    padding: 14px;
    background: #6366F1;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.2s ease;
    
    &:hover {
      background: #4F46E5;
    }
    
    &:disabled {
      background: #9CA3AF;
      cursor: not-allowed;
    }
  }
`;

const ContactOptions = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 30px;
  
  h3 {
    font-size: 22px;
    margin-bottom: 24px;
    color: #111827;
    font-weight: 600;
  }
  
  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    border-radius: 8px;
    transition: background 0.2s ease;
    cursor: pointer;
    
    &:hover {
      background: #F9FAFB;
    }
    
    .icon {
      width: 44px;
      height: 44px;
      background: #F3F4F6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      
      svg {
        color: #6366F1;
        width: 22px;
        height: 22px;
      }
    }
    
    .details {
      h4 {
        font-size: 18px;
        margin-bottom: 6px;
        color: #111827;
        font-weight: 600;
      }
      
      p {
        color: #6B7280;
        margin-bottom: 8px;
        line-height: 1.5;
      }
      
      a {
        color: #6366F1;
        font-weight: 500;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        
        svg {
          margin-left: 6px;
          transition: transform 0.2s ease;
        }
        
        &:hover {
          text-decoration: underline;
          
          svg {
            transform: translateX(3px);
          }
        }
      }
    }
  }
`;

const RewardsSection = styled.div`
  text-align: center;
  margin: 60px 0;
  
  h2 {
    font-size: 36px;
    margin-bottom: 40px;
    color: #111827;
    font-weight: 600;
  }
`;

const RewardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RewardCard = styled.div`
  background: #F9FAFB;
  padding: 30px 24px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  }
  
  img {
    margin-bottom: 20px;
    height: 60px;
    width: auto;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 15px;
    color: #111827;
    font-weight: 600;
  }
  
  p {
    color: #6B7280;
    margin-bottom: 20px;
    font-size: 15px;
    line-height: 1.6;
  }
  
  a {
    color: #6366F1;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    display: inline-flex;
    align-items: center;
    letter-spacing: 0.5px;
    
    &:hover {
      color: #4F46E5;
      text-decoration: underline;
    }
  }
`;

const HelpCenter = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  let isLoggedIn =false;

  const token = localStorage.getItem('token');
  const userDataStr = localStorage.getItem('jammelUser');
  if (token && userDataStr) {
    isLoggedIn=true;
  }
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login?redirect=/help-center');
      return;
    }
    
    if (!subject || !message) {
      setSubmitError('Please fill in all fields');
      return;
    }
    
    setSubmitting(true);
    setSubmitError('');
    
    try {
      await supportAPI.createSupportTicket({
        subject,
        message
      });
      
      setSubmitSuccess(true);
      setSubject('');
      setMessage('');
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  const rewardsData = [
    { icon: justatyourservice_1, title: "VAULT REWARDS" },
    { icon: justatyourservice_2, title: "VAULT REWARDS" },
    { icon: justatyourservice_3, title: "VAULT REWARDS" },
    { icon: justatyourservice_4, title: "VAULT REWARDS" }
  ];
  
  return (
    <Container>
      <Header>
        <h1>Help Center</h1>
        <SearchBox>
          <img src={daimond_logo} alt="Diamond" />
          <span>Need assistance? Our Jewelry Assistant can help!</span>
          <a href="#">Describe what you're looking for?</a>
        </SearchBox>
      </Header>

      <HeroSection>
        <img src={jewelryservices} alt="Help Center" />
        <div className="content">
          <h2>Customer Help Center</h2>
          <p>Need help with something? You're in the right place! Our dedicated support team is ready to assist you with any questions or concerns about your jewelry purchase or service.</p>
        </div>
      </HeroSection>
      
      <Section>
        <h2>Contact Support</h2>
        <SupportGrid>
          <FormSection>
            <h3>Send us a message</h3>
            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="How can we help you?"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your question or issue in detail"
                  required
                />
              </div>
              
              {submitError && (
                <div style={{ color: '#DC2626', fontSize: '14px' }}>{submitError}</div>
              )}
              
              {submitSuccess && (
                <div style={{ color: '#10B981', fontSize: '14px' }}>
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              )}
              
              <button type="submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {!isLoggedIn && (
                <div style={{ textAlign: 'center', fontSize: '14px', color: '#6B7280', marginTop: '10px' }}>
                  You'll need to <a href="/login" style={{ color: '#6366F1', fontWeight: '500' }}>sign in</a> to send a message
                </div>
              )}
            </Form>
          </FormSection>
          
          <ContactOptions>
            <h3>Other ways to reach us</h3>
            <div className="contact-methods">
              <div className="contact-item">
                <div className="icon">
                  <Phone />
                </div>
                <div className="details">
                  <h4>Call Us</h4>
                  <p>Speak directly with our customer support team</p>
                  <a href="tel:+18001234567">1-800-123-4567 <ChevronRight size={16} /></a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">
                  <Mail />
                </div>
                <div className="details">
                  <h4>Email Us</h4>
                  <p>Send us an email and we'll respond within 24 hours</p>
                  <a href="mailto:support@jsk.com">support@jsk.com <ChevronRight size={16} /></a>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="icon">
                  <Clock />
                </div>
                <div className="details">
                  <h4>Support Hours</h4>
                  <p>Monday - Friday: 9am - 8pm EST<br />Saturday: 10am - 6pm EST<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
          </ContactOptions>
        </SupportGrid>
      </Section>

   
    </Container>
  );
};

export default HelpCenter;