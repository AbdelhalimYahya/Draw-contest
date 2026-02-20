import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-[--shadow-sm] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between items-center h-20">
                    {/* Logo - Left Side */}
                    <div className="shrink-0 flex items-center">
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>
                            <img
                                src={logo}
                                alt="Om Elnour Logo"
                                className="h-39 sm:h-50 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
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
                                سجل الان
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="h-8 w-8"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5 duration-200 overflow-hidden">
                    <div className="px-6 py-6 space-y-4 flex flex-col items-center text-center">
                        <a
                            href="#about"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-gray-50 py-3 rounded-lg font-bold text-lg transition-colors border-b border-gray-50 last:border-0"
                        >
                            عن المسابقة
                        </a>
                        <a
                            href="#prizes"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-gray-50 py-3 rounded-lg font-bold text-lg transition-colors"
                        >
                            الجوائز
                        </a>

                        {user ? (
                            <div className="w-full pt-4 border-t border-gray-100 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex w-full items-center justify-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-blue-500 font-medium">{user.phone}</p>
                                    </div>
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                        {user.name.charAt(0)}
                                    </div>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-red-500 bg-red-50 hover:bg-red-100 py-3 rounded-xl font-bold transition-colors"
                                >
                                    تسجيل الخروج
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/signup"
                                onClick={() => setIsMenuOpen(false)}
                                className="block w-full bg-[var(--color-primary)] text-white font-bold text-lg px-8 py-3 rounded-xl shadow-md active:scale-95 transition-all mt-4"
                            >
                                سجل الان
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
