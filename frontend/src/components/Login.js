// src/components/LoginPage.jsx

import '../styles/index.css'; // Import the global CSS styles
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import logo from '../utils/TheTalk.png'; // Importing logo image
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:1604/user/login', {
        email: data.email,
        password: data.password,
      });

      // Log the response for debugging
      console.log('Login response:', response);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the token in local storage

        toast.success('Login successful!', {
          onClose: () => {
            navigate('/'); // Navigate to home page on successful login
          },
        });
      }
    } catch (error) {
      console.error('Login error:', error);

      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div id="login-container" className="min-h-screen flex flex-col justify-center items-center">
      <div id="login-box">
        <ToastContainer /> {/* Toast container to display toasts */}
        <div id="login-logo">
          <Link to="/">
            <img src={logo} alt="Logo" id="login-logo-image" />
          </Link>
        </div>
        <h1 id="login-title">Sign In</h1>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" id="login-label">Email</label>
            <input
              type="email"
              id="login-email"
              placeholder="you@example.com"
              {...register('email')}
              className={`form-input ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <label htmlFor="password" id="login-label">Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="login-password"
              placeholder="••••••••"
              {...register('password')}
              className={`form-input ${errors.password ? 'border-red-500' : ''}`}
            />
            <span id="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div id="login-links">
            <Link to="/forgot-password" className="items-center" id="login-forgot-password">Forgot password?</Link>
          </div>
          <button type="submit" id="login-button">Sign In</button>
        </form>
        <div id="login-signup">
          <p>New user? <Link to="/signup" id="login-signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
