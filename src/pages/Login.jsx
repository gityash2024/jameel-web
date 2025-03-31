import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { login, googleAuth } from '../features/auth/authSlice';
import Loader from '../components/common/Loader';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
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
    
    const resultAction = await dispatch(login(formData));
    if (resultAction.meta && resultAction.meta.requestStatus === 'fulfilled') {
      toast.success('Login successful!');
      // Navigation is handled by the useEffect hook above
    }
  };
  
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const resultAction = await dispatch(googleAuth({
          credential: tokenResponse.access_token
        }));
        
        if (resultAction.meta && resultAction.meta.requestStatus === 'fulfilled') {
          toast.success('Google login successful!');
          // Navigation is handled by the useEffect hook above
        }
      } catch (err) {
        console.error('Google login error:', err);
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      toast.error('Failed to login with Google');
    }
  });
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <Link to="/" className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mt-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 p-3 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-50`}
            placeholder="Enter Email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 p-3 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded bg-gray-50`}
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          <Link to="/forgot-password" className="text-sm text-right block mt-2 text-gray-600">
            Forgot your password?
          </Link>
        </div>

        <button type="submit" className="w-full bg-black text-white p-3 rounded">
          Sign In
        </button>

        <button 
          type="button" 
          onClick={() => googleLoginHandler()}
          className="w-full border border-gray-300 p-3 rounded flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-black">
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;