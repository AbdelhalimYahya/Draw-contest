// import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-[--color-bg-main] shadow-[--shadow-sm] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-20">
                    {/* Logo - Left Side */}
                    <div className="shrink-0">
                        <Link to="/">
                            <h1 className="text-3xl font-black text-[--color-text-primary]">
                                أم النور
                            </h1>
                        </Link>
                    </div>

                    {/* Navigation Items - Right Side */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#about"
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 font-semibold text-lg"
                        >
                            عن المسابقة
                        </a>
                        <a
                            href="#prizes"
                            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors duration-300 font-semibold text-lg"
                        >
                            الجوائز
                        </a>
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/profile" className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900 leading-tight">{user.name}</p>
                                        <p className="text-xs text-blue-500 font-medium">{user.phone}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                        {user.name.charAt(0)}
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:text-red-700 font-bold text-sm transition-colors"
                                >
                                    تسجيل الخروج
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/signup"
                                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-lg px-10 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-white/30"
                            >
                                دخول
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button - Keeping simple for now, can expand later */}
                    <div className="md:hidden">
                        <button className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus:outline-none p-2">
                            <svg
                                className="h-7 w-7"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
