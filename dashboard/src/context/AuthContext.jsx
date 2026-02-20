import React, { createContext, useContext, useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import api from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (phone) => {
        try {
            const response = await api.post('/api/v1/auth/login', { phone });
            const { user: userData, token } = response.data;

            if (userData.role !== 'admin') {
                toast.error('غير مسموح لك بالدخول إلى لوحة التحكم');
                return false;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            toast.success('تم تسجيل الدخول بنجاح');
            return true;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'فشل تسجيل الدخول');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        toast.success('تم تسجيل الخروج');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            <Toaster position="top-center" reverseOrder={false} />
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
