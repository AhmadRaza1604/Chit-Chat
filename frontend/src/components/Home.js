import React from 'react';
import '../styles/index.css';
import logo from '../utils/TheTalk.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="w-full bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Left: Logo and Brand Name */}
                    <div className="flex items-center space-x-4">
                        <img src={logo} alt="TheTalk Logo" className="h-10 w-10 sm:h-12 sm:w-12" />
                        <span className="text-white text-xl sm:text-2xl font-bold" style={{ fontFamily: "cursive" }}>
                            TheTalk
                        </span>
                    </div>
                    {/* Right: Login and Contact Buttons */}
                    <div className="space-x-4">
                        <Link to="/login" className="text-white hover:text-gray-300 font-medium">Login</Link>
                        <Link to="/contact" className="text-white hover:text-gray-300 font-medium">Contact Us</Link>
                    </div>
                </div>
            </nav>

            {/* Main Content Section */}
            <main className="flex-grow py-8 bg-gray-50">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
                        Connect with friends & family on TheTalk
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        TheTalk is your go-to chatting app where you can message, call, and video chat with anyone across the globe. 
                        Join us to make new friends and stay connected with your loved ones.
                    </p>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                        {/* Card 1 */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Instant Messaging</h2>
                            <p className="text-gray-600">
                                Chat in real-time with friends and family using our fast, reliable messaging system.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Video Calls</h2>
                            <p className="text-gray-600">
                                Enjoy high-quality video calls with individuals or groups anywhere in the world.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">Privacy First</h2>
                            <p className="text-gray-600">
                                Your chats and calls are fully encrypted to ensure your privacy and security.
                            </p>
                        </div>
                    </div>

                    {/* Join Button */}
                    <div className="mt-8">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                            <Link to="/signup">Join TheTalk Now</Link>
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full bg-gray-800 text-white py-12">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between">
                    {/* Footer Logo and Summary */}
                    <div className="mb-8 lg:mb-0 lg:w-1/3 text-center lg:text-left">
                        <img src={logo} alt="TheTalk Footer Logo" className="h-16 w-16 mb-4 mx-auto lg:mx-0" />
                        <p className="text-gray-400 max-w-sm mx-auto lg:mx-0">
                            TheTalk is a platform that brings people together. Chat, video call, and stay connected with your friends and family effortlessly.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-col lg:flex-row lg:space-x-16 text-center lg:text-left">
                        <div className="mb-6 lg:mb-0">
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
                                <li><Link to="/contact" className="hover:text-gray-400">Contact Us</Link></li>
                                <li><Link to="/login" className="hover:text-gray-400">Login</Link></li>
                                <li><Link to="/signup" className="hover:text-gray-400">Sign Up</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li><Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-gray-400">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 border-t border-gray-700 pt-4 text-center">
                    <p className="text-gray-500">
                        &copy; {new Date().getFullYear()} TheTalk. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
