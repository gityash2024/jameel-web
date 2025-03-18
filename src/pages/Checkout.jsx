import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const Checkout = () => {
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }
        
        try {
            const response = await api.post('/coupons/validate', {
                code: couponCode,
                amount: totalAmount
            });
            
            if (response.data && response.data.status === 'success') {
                const { discount } = response.data.data;
                setCouponDiscount(discount);
                setCouponApplied(true);
                setCouponError('');
                toast.success('Coupon applied successfully!');
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            setCouponError(error.response?.data?.message || 'Invalid coupon code');
            setCouponApplied(false);
            setCouponDiscount(0);
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode('');
        setCouponApplied(false);
        setCouponDiscount(0);
        setCouponError('');
    };

    const orderTotal = totalAmount + shippingCost - couponDiscount;

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      </div>
    );
  };
  
  export default Checkout;