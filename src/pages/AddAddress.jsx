import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import Loader from '../components/common/Loader';

const AddAddress = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (id) {
      fetchAddress();
    }
  }, [id]);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAddresses();
      const address = response.data.data.find(addr => addr._id === id);
      if (address) {
        setFormData({
          fullName: address.fullName || '',
          phoneNumber: address.phoneNumber || '',
          address: address.address || '',
          city: address.city || '',
          state: address.state || '',
          country: address.country || '',
          zipCode: address.zipCode || '',
          addressType: address.addressType || 'home'
        });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      toast.error('Failed to load address details');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.country) newErrors.country = 'Country is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (id) {
        await userAPI.updateAddress(id, formData);
        toast.success('Address updated successfully');
      } else {
        await userAPI.addAddress(formData);
        toast.success('Address added successfully');
      }
      navigate('/saved-address');
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add New Address</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`mt-1 block w-full rounded border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number*</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className={`mt-1 block w-full rounded border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter your street address"
            className={`mt-1 block w-full rounded border ${errors.address ? 'border-red-500' : 'border-gray-300'} p-2`}
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">City*</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter your city"
              className={`mt-1 block w-full rounded border ${errors.city ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">State*</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter your state"
              className={`mt-1 block w-full rounded border ${errors.state ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">Country*</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Enter your country"
              className={`mt-1 block w-full rounded border ${errors.country ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">ZIP Code*</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              placeholder="Enter ZIP code"
              className={`mt-1 block w-full rounded border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} p-2`}
            />
            {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Address Type</label>
          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded border border-gray-300 p-2"
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/saved-address')}
            className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-black text-white rounded hover:bg-gray-900"
          >
            {id ? 'Update Address' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;