// src/components/LoginPage.jsx

import '../styles/index.css'; // Import the global CSS styles
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import { FcGoogle } from 'react-icons/fc'; // Importing Google icon
import logo from '../utils/TheTalk.png'; // Importing logo image
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div id="login-container" className="min-h-screen flex flex-col justify-center items-center">
      <div id="login-box">
        <div id="login-logo">
            <Link to="/">
          <img src={logo} alt="Logo" id="login-logo-image" />
          </Link>
        </div>
        <h1 id="login-title">Sign In</h1>
        <form id="login-form">
          <div>
            <label htmlFor="email" id="login-label">Email</label>
            <input
              type="email"
              id="login-email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" id="login-label">Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="login-password"
              placeholder="••••••••"
              required
            />
            <span id="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div id="login-links">
            <Link to="/forgot-password" className="items-center" id="login-forgot-password">Forgot password?</Link>
          </div>
          <button type="submit" id="login-button">Sign In</button>
        </form>
        <div id="login-google">
          <button id="google-button">
            <FcGoogle className="w-6 h-6 mr-2" />
            Sign In with Google
          </button>
        </div>
        <div id="login-signup">
          <p>New user? <Link to="/signup" id="login-signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
