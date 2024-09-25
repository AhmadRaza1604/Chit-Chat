// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [verificationPurpose, setVerificationPurpose] = useState('');

  

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log('Token is expired. Logging out...');
          // Token is expired, perform logout actions
          toast.info('You have been logged out. Please log in again.', {
          });
          handleLogout();
        } else {
          console.log('User is logged in:', decodedToken.name, decodedToken.userEmail,"Id::::", decodedToken.userId);
          setUserName(decodedToken.name);
          setUserId(decodedToken.userId);
          setUserEmail(decodedToken.userEmail);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error.message);
        console.log('Token is invalid. Logging out...');
        // Token is invalid, perform logout actions
        handleLogout();
      }
    } else {
      console.log('User is not logged in.');
      setIsLoggedIn(false);
    }
  },[]);

  const handleLogout = () => {
    // Perform logout actions (clear token, reset state, redirect, etc.)
    localStorage.removeItem('token');
    setUserName('');
    setUserId('');
    setUserEmail('');
    setIsLoggedIn(false);
    setVerificationPurpose(''); // Reset verification purpose on logout
  };

  const contextValue = {
    isLoggedIn,
    userName,
    userEmail,
    userId,
    verificationPurpose, // Include verificationPurpose in the context
    setVerificationPurpose, // Provide a function to set verificationPurpose
    login: (name, email, userId) => {
      setIsLoggedIn(true);
      setUserName(name);
      setUserEmail(email);
      setUserId(userId);
      console.log('User Email set:', email,userId); // Add this line
    },
    logout: handleLogout,
    setAnEmail:(email)=>{
      setUserEmail(email);
    },
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
