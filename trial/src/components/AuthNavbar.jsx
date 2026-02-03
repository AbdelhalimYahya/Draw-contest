import React from 'react';
import { Link } from 'react-router-dom';

const AuthNavbar = () => {
    return (
        <nav className="py-6 bg-white border-b border-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <Link to="/" className="inline-block">
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2 justify-center">
                        أم النور
                        <div className="w-2 h-2 bg-blue-100 rounded-full animate-pulse"></div>
                    </h1>
                </Link>
            </div>
        </nav>
    );
};

export default AuthNavbar;
