import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc2626' : '#d1d5db'};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? '#dc2626' : '#d1d5db'};
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #000;
  }
`;

const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 0.875rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  
  ${props => props.primary ? `
    background: black;
    color: white;
    border: none;
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

const AddAddress = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    addressType: 'home'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.address) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    if (!formData.state) {
      newErrors.state = 'State is required';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.zipCode) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      navigate('/saved-address');
    }
  };

  const handleCancel = () => {
    navigate('/saved-address');
  };

  return (
    <Container>
      <Title>Add New Address</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="fullName">Full Name*</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            placeholder="Enter your full name"
          />
          {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phoneNumber">Phone Number*</Label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={errors.phoneNumber}
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address">Address*</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={errors.address}
            placeholder="Enter your street address"
          />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city">City*</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            error={errors.city}
            placeholder="Enter your city"
          />
          {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="state">State*</Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            error={errors.state}
            placeholder="Enter your state"
          />
          {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="country">Country*</Label>
          <Input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            error={errors.country}
            placeholder="Enter your country"
          />
          {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="zipCode">ZIP Code*</Label>
          <Input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            error={errors.zipCode}
            placeholder="Enter your ZIP code"
          />
          {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="addressType">Address Type</Label>
          <Select
            id="addressType"
            name="addressType"
            value={formData.addressType}
            onChange={handleInputChange}
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" primary>
            Save Address
          </Button>
        </ButtonGroup>
      </Form>

    </Container>
  );
};

export default AddAddress;