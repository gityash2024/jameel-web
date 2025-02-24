import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import Loader from '../components/common/Loader';

const SavedAddress = () => {
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    type: 'home',
    isDefault: false,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    deliveryInstructions: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await userAPI.getAddresses();
      console.log('Fetched addresses:', response);
      setAddresses(response.data?.data?.addresses || []);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address1) newErrors.address1 = 'Address line 1 is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setFormData({
      type: 'home',
      isDefault: false,
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
      email: '',
      deliveryInstructions: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = async (address) => {
    setSelectedAddress(address);
    setFormData({
      type: address.type || 'home',
      isDefault: address.isDefault || false,
      firstName: address.firstName || '',
      lastName: address.lastName || '',
      address1: address.address1 || '',
      address2: address.address2 || '',
      city: address.city || '',
      state: address.state || '',
      postalCode: address.postalCode || '',
      country: address.country || '',
      phone: address.phone || '',
      email: address.email || '',
      deliveryInstructions: address.deliveryInstructions || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (selectedAddress) {
        await userAPI.updateAddress(selectedAddress._id, formData);
        toast.success('Address updated successfully');
      } else {
        await userAPI.addAddress(formData);
        toast.success('Address added successfully');
      }
      setIsModalOpen(false);
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await userAPI.deleteAddress(id);
      toast.success('Address removed successfully');
      fetchAddresses();
    } catch (error) {
      console.error('Error removing address:', error);
    }
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-2xl font-bold mb-6">
            {selectedAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Address Type</label><br/>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-40 rounded border border-gray-300 p-2"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleInputChange}
                  className="rounded border-gray-300"
                />
                <label style={{float:"left"}} htmlFor="isDefault" className="text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
              </div>

              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Address Line 1*</label>
              <input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded border ${errors.address1 ? 'border-red-500' : 'border-gray-300'} p-2`}
                placeholder="Street address"
              />
              {errors.address1 && <p className="mt-1 text-sm text-red-500">{errors.address1}</p>}
            </div>

            <div>
              <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Address Line 2</label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded border border-gray-300 p-2"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">City*</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.city ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter city"
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
              </div>

              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">State*</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.state ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter state"
                />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Postal Code*</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter postal code"
                />
                {errors.postalCode && <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>}
              </div>

              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Country*</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.country ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter country"
                />
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2`}
                  placeholder="Enter email (optional)"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label style={{float:"left"}} className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
              <textarea
                name="deliveryInstructions"
                value={formData.deliveryInstructions}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded border border-gray-300 p-2"
                placeholder="Special instructions for delivery (optional)"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-black text-white rounded hover:bg-gray-900"
              >
                {selectedAddress ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-48 h-48 mx-auto mb-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <h3 className="text-xl font-semibold mb-2">No Addresses Found</h3>
        <p className="text-gray-600 mb-6">Add your first address to get started</p>
        <button
          onClick={handleAddAddress}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900"
        >
          Add Your First Address
        </button>
        {renderModal()}
      </div>
    );
  }

  return (
    <>
      <div>
        <button
          onClick={handleAddAddress}
          className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
        >
          Add Address
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address._id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-semibold text-lg">
                    {address.firstName} {address.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address
                  </div>
                </div>
                {address.isDefault && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
              
              <div className="text-gray-600 mb-2">
                {address.address1}
                {address.address2 && <span>, {address.address2}</span>}
              </div>
              <div className="text-gray-600 mb-4">
                {address.city}, {address.state} {address.postalCode}
                <br />
                {address.country}
              </div>
              
              <div className="text-gray-600 mb-2">Phone: {address.phone}</div>
              {address.email && (
                <div className="text-gray-600 mb-2">Email: {address.email}</div>
              )}
              {address.deliveryInstructions && (
                <div className="text-gray-600 mb-4 text-sm">
                  <span className="font-medium">Delivery Instructions:</span>
                  <br />
                  {address.deliveryInstructions}
                </div>
              )}
              
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemove(address._id)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {renderModal()}
    </>
  );
};

export default SavedAddress;