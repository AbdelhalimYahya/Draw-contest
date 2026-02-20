import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const AuthNavbar = () => {
    return (
        <nav className="py-6 bg-white border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <Link to="/" className="inline-block">
                    <img
                        src={logo}
                        alt="Om Elnour Logo"
                        className="h-29 sm:h-40 w-auto object-contain mx-auto"
                    />
                </Link>
            </div>
        </nav>
    );
};

export default AuthNavbar;
