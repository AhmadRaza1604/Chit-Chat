import React, { useState } from 'react';
import './styles/index.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./components/Home";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
const App = () => {

  return (
    <div>
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={5000} />
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>

    </div>

  );
};

export default App;
