import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import { toast } from 'react-hot-toast';

const MyAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneCode: '+1'
  });

  useEffect(() => {
    const userDataStr = localStorage.getItem('jammelUser');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      setFormData({
        firstName: userData.data.user.firstName || '',
        lastName: userData.data.user.lastName || '',
        email: userData.data.user.email || '',
        phone: userData.data.user.phone || '',
        phoneCode: '+1'
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.updateProfile(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded bg-gray-50"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded bg-gray-50"
              placeholder="Enter Last Name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded bg-gray-50"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="flex gap-2">
              <select
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleInputChange}
                className="mt-1 px-4 py-2 border border-gray-300 rounded bg-gray-50"
              >
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
              </select>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 flex-1 px-4 py-2 border border-gray-300 rounded bg-gray-50"
                placeholder="000000"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2 bg-black text-white rounded font-medium hover:bg-gray-900"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default MyAccount;