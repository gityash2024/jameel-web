import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { userAPI } from "../services/api";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 24px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 16px top 50%;
  background-size: 12px auto;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.2s;
  min-height: 120px;
  resize: vertical;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: #000;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 14px 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ColorSwatch = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const ColorPickerContainer = styled.div`
  position: relative;
  margin-top: 8px;
`;

const PopoverContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  margin-top: 8px;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 8px;
  margin-bottom: 24px;
`;

const DateOption = styled.button`
  padding: 12px;
  border: 1px solid ${props => props.selected ? '#000' : '#ddd'};
  border-radius: 4px;
  background: ${props => props.selected ? '#f5f5f5' : 'white'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #000;
  }
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
  margin-bottom: 24px;
`;

const TimeOption = styled.button`
  padding: 12px;
  border: 1px solid ${props => props.selected ? '#000' : '#ddd'};
  border-radius: 4px;
  background: ${props => props.selected ? '#f5f5f5' : 'white'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #000;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 6px;
`;

const MakeWithJSK = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    productType: "",
    stoneType: "",
    stoneColor: "#ffffff",
    carat: "",
    metalType: "",
    message: "",
    appointmentDate: "",
    appointmentTime: "",
    shoppingFor: "",
    isSpecialOccasion: false
  });
  
  const [showStoneColorPicker, setShowStoneColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Generate dates for next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date,
      formatted: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        weekday: 'short' 
      })
    };
  });
  
  // Available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return value ? '' : 'First name is required';
      case 'lastName':
        return value ? '' : 'Last name is required';
      case 'email':
        return !value ? 'Email is required' : 
               !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : '';
      case 'phone':
        return !value ? 'Phone number is required' : 
               !/^\+?[0-9\s\-()]{7,15}$/.test(value) ? 'Please enter a valid phone number' : '';
      case 'productType':
        return value ? '' : 'Product type is required';
      case 'appointmentDate':
        return value ? '' : 'Please select a preferred date';
      case 'appointmentTime':
        return value ? '' : 'Please select a preferred time';
      default:
        return '';
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };
  
  const handleColorChange = (color, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: color.hex
    }));
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.productType) newErrors.productType = 'Product type is required';
    if (!formData.appointmentDate) newErrors.appointmentDate = 'Please select a preferred date';
    if (!formData.appointmentTime) newErrors.appointmentTime = 'Please select a preferred time';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      // Convert appointment date to ISO format
      const appointmentDateObj = new Date(formData.appointmentDate);
      const isoDate = appointmentDateObj.toISOString();
      
      const appointmentData = {
        ...formData,
        appointmentDate: isoDate
      };
      
      // Send appointment data to API
      await userAPI.bookCustomDesignAppointment(appointmentData);
      
      toast.success('Your custom design request has been submitted successfully!');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        productType: '',
        stoneType: '',
        stoneColor: '#ffffff',
        carat: '',
        metalType: '',
        message: '',
        appointmentDate: '',
        appointmentTime: '',
        shoppingFor: '',
        isSpecialOccasion: false
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <Title>Make with JSK</Title>
      <Subtitle>
        Create your own custom jewelry design with our expert craftsmanship
      </Subtitle>
      
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <SectionTitle>Personal Information</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>First Name *</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your first name"
                required
                error={errors.firstName}
              />
              {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label>Last Name *</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your last name"
                required
                error={errors.lastName}
              />
              {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label>Email *</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                required
                error={errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label>Phone Number *</Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter your phone number"
                required
                error={errors.phone}
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FormGroup>
          </FormGrid>
        </FormContainer>
        
        <FormContainer>
          <SectionTitle>Product Details</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Product Type *</Label>
              <Select
                name="productType"
                value={formData.productType}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              >
                <option value="">Select product type</option>
                <option value="Ring">Ring</option>
                <option value="Necklace">Necklace</option>
                <option value="Bracelet">Bracelet</option>
                <option value="Earrings">Earrings</option>
                <option value="Pendant">Pendant</option>
                <option value="Watch">Watch</option>
                <option value="Other">Other</option>
              </Select>
              {errors.productType && <ErrorMessage>{errors.productType}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label>Stone Type</Label>
              <Select
                name="stoneType"
                value={formData.stoneType}
                onChange={handleInputChange}
              >
                <option value="">Select stone type</option>
                <option value="Diamond">Diamond</option>
                <option value="Ruby">Ruby</option>
                <option value="Emerald">Emerald</option>
                <option value="Sapphire">Sapphire</option>
                <option value="Amethyst">Amethyst</option>
                <option value="Topaz">Topaz</option>
                <option value="Opal">Opal</option>
                <option value="Pearl">Pearl</option>
                <option value="Other">Other</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Stone Color</Label>
              <ColorSwatch 
                style={{ backgroundColor: formData.stoneColor }}
                onClick={() => setShowStoneColorPicker(!showStoneColorPicker)}
              />
              {showStoneColorPicker && (
                <ColorPickerContainer>
                  <PopoverContainer>
                    <div 
                      style={{ 
                        position: 'fixed', 
                        top: '0px', 
                        right: '0px', 
                        bottom: '0px', 
                        left: '0px' 
                      }} 
                      onClick={() => setShowStoneColorPicker(false)}
                    />
                    <ChromePicker 
                      color={formData.stoneColor}
                      onChange={(color) => handleColorChange(color, 'stoneColor')}
                    />
                  </PopoverContainer>
                </ColorPickerContainer>
              )}
            </FormGroup>
            
            <FormGroup>
              <Label>Carat Weight</Label>
              <Input
                type="text"
                name="carat"
                value={formData.carat}
                onChange={handleInputChange}
                placeholder="Enter carat weight"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Metal Type</Label>
              <Select
                name="metalType"
                value={formData.metalType}
                onChange={handleInputChange}
              >
                <option value="">Select metal type</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Platinum">Platinum</option>
                <option value="Palladium">Palladium</option>
                <option value="Titanium">Titanium</option>
                <option value="Stainless Steel">Stainless Steel</option>
              </Select>
            </FormGroup>
          </FormGrid>
          
          <FormGroup>
            <Label>Your Design Ideas and Requirements</Label>
            <TextArea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Describe your custom design idea, including any specific requirements or inspiration..."
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Who are you shopping for?</Label>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="shoppingFor"
                  value="myself"
                  checked={formData.shoppingFor === 'myself'}
                  onChange={handleInputChange}
                  style={{ marginRight: '8px' }}
                />
                Myself
              </label>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="shoppingFor"
                  value="someone"
                  checked={formData.shoppingFor === 'someone'}
                  onChange={handleInputChange}
                  style={{ marginRight: '8px' }}
                />
                Someone Else
              </label>
            </div>
          </FormGroup>
          
          <FormGroup>
            <Label>Is this for a special occasion?</Label>
            <label style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
              <input
                type="checkbox"
                name="isSpecialOccasion"
                checked={formData.isSpecialOccasion}
                onChange={handleInputChange}
                style={{ marginRight: '8px' }}
              />
              Yes, this is for a special occasion
            </label>
          </FormGroup>
        </FormContainer>
        
        <FormContainer>
          <SectionTitle>Appointment</SectionTitle>
          
          <FormGroup>
            <Label>Select a Date *</Label>
            <DateGrid>
              {dates.map((dateObj) => (
                <DateOption
                  key={dateObj.date.toISOString()}
                  type="button"
                  selected={formData.appointmentDate === dateObj.date.toISOString()}
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    appointmentDate: dateObj.date.toISOString()
                  }))}
                >
                  {dateObj.formatted}
                </DateOption>
              ))}
            </DateGrid>
          </FormGroup>
          
          <FormGroup>
            <Label>Select a Time *</Label>
            <TimeGrid>
              {timeSlots.map((time) => (
                <TimeOption
                  key={time}
                  type="button"
                  selected={formData.appointmentTime === time}
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    appointmentTime: time
                  }))}
                >
                  {time}
                </TimeOption>
              ))}
            </TimeGrid>
          </FormGroup>
        </FormContainer>
        
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Book My Custom Design Appointment'}
          </SubmitButton>
        </div>
      </form>
    </Container>
  );
};

export default MakeWithJSK; 