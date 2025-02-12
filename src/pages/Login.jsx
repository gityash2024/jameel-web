import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <AuthLayout>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex gap-4">
        <button className="flex-1 bg-black text-white py-2 rounded">Sign In</button>
        <button className="flex-1 border border-gray-300 py-2 rounded">Sign Up</button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            required
            className="mt-1 p-3 w-full border border-gray-300 rounded bg-gray-50"
            placeholder="Enter Email"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded bg-gray-50"
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
          <Link to="/forgot-password" className="text-sm text-right block mt-2 text-gray-600">
            Forgot your password?
          </Link>
        </div>

        <button type="submit" className="w-full bg-black text-white p-3 rounded">
          Sign In
        </button>

        <button type="button" className="w-full border border-gray-300 p-3 rounded flex items-center justify-center gap-2">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/signup" className="font-semibold text-black">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

  
  export default Login;