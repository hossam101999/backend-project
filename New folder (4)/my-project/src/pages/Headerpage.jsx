import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Headerpage({ isLoggedIn, handleLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [message, setMessage] = useState('');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (loggedIn && token) {
            setMessage('You are logged in.');
        } else {
            setMessage('Please log in.');
        }
    }, [isLoggedIn]);

    const handleLogoutClick = () => {
        handleLogout();
        setMessage('You have been logged out.');
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl">My Blog</h1>
                <div className="flex items-center space-x-4 lg:space-x-6">
                    <nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} lg:space-x-4`}>
                        <Link to="/" className="text-white mx-2">Home</Link>
                        {message && (
                            <span className="text-green-400 mx-2">{message}</span>
                        )}
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="text-white mx-2">Login</Link>
                                <Link to="/register" className="text-white mx-2">Register</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/profile" className="text-white mx-2">Profile</Link>
                                <Link to="/add-post" className="text-white mx-2">Add Post</Link>
                                <button onClick={handleLogoutClick} className="text-white mx-2">Logout</button>
                            </>
                        )}
                    </nav>
                    <button 
                        className="lg:hidden text-white focus:outline-none" 
                        onClick={toggleMenu}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    {isLoggedIn && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Avatar"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-700 rounded-box z-10 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="flex justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a href="#">Settings</a></li>
                                <li><button onClick={handleLogoutClick}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}