// src/components/SignupPage.jsx

import '../styles/index.css'; // Import the global CSS styles
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import { FcGoogle } from 'react-icons/fc'; // Importing Google icon
import logo from '../utils/TheTalk.png'; // Importing logo image
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <div id="signup-container" className="min-h-screen flex flex-col justify-center items-center">
      <div id="signup-box">
        <div id="signup-logo">

          <Link to="/">
          <img src={logo} alt="Logo" id="signup-logo-image" />
          </Link>
        </div>
        <h1 id="signup-title">Sign Up</h1>
        <form id="signup-form">
          <div>
            <label htmlFor="username" id="signup-label">Username</label>
            <input
              type="text"
              id="signup-username"
              placeholder="Your Username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" id="signup-label">Email</label>
            <input
              type="email"
              id="signup-email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" id="signup-label">Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="signup-password"
              placeholder="••••••••"
              required
            />
            <span id="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="relative">
            <label htmlFor="confirm-password" id="signup-label">Confirm Password</label>
            <input
              type={confirmPasswordVisible ? 'text' : 'password'}
              id="signup-confirm-password"
              placeholder="••••••••"
              required
            />
            <span id="confirm-password-toggle" onClick={toggleConfirmPasswordVisibility}>
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" id="signup-button">Sign Up</button>
        </form>
        <div id="signup-google">
          <button id="google-button">
            <FcGoogle className="w-6 h-6 mr-2" />
            Sign Up with Google
          </button>
        </div>
        <div id="signup-login">
          <p>Already have an account? <Link to="/login" id="signup-login-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
