import React from 'react';
import '../styles/index.css';
import logo from '../utils/TheTalk.png';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4 mb-8">
          <img src={logo} alt="Weather Logo" className="h-14 w-14" />
          <h2 className="text-4xl font-bold" style={{fontFamily:"cursive", color:"#7091E6"}}>The Talk </h2>
        </div>
        <button id="login-button"><Link to="/login">Sign In</Link></button>
      </div>
  
    );
};

export default Home;