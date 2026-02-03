import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthNavbar from '../components/AuthNavbar';
import AuthFooter from '../components/AuthFooter';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/api/v1/auth/signup', formData);
            if (response.status === 201) {
                const { token, user } = response.data;
                login(user, token);
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
            <AuthNavbar />

            <main className="flex-grow flex items-center justify-center p-4 py-12">
                <div className="w-full max-w-lg">
                    {/* Main Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 sm:p-12">
                            {/* Header */}
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-black text-gray-900 mb-4">إنشاء حساب جديد</h2>
                                <p className="text-[#00A8E8] font-bold text-lg mb-2">سجل الآن وكن الرابح القادم بمطبخ أحلامك</p>
                                <p className="text-gray-400 text-sm font-medium">خطوة واحدة تفصلك عن الجائزة الكبرى</p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-bold border border-red-100">
                                    {error}
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-3 pr-2 text-sm">الاسم</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="أدخل اسمك الكامل"
                                            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-12 text-gray-600 focus:outline-none focus:border-[#00A8E8] transition-all text-sm font-medium shadow-sm"
                                        />
                                        <div className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-3 pr-2 text-sm">رقم الهاتف</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="01XXXXXXXXX"
                                            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-12 text-gray-600 focus:outline-none focus:border-[#00A8E8] transition-all text-sm font-medium shadow-sm"
                                        />
                                        <div className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-gray-700 font-bold mb-3 pr-2 text-sm">كلمة السر</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="........"
                                            className="w-full bg-white border border-gray-100 rounded-2xl py-4 px-12 text-gray-600 focus:outline-none focus:border-[#00A8E8] transition-all text-sm font-medium shadow-sm"
                                        />
                                        <div className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full bg-[#00A8E8] hover:bg-[#0088BB] text-white font-black py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-3 active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <span>جاري التسجيل...</span>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                            <span>تسجيل الاشتراك</span>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Terms */}
                            <p className="text-gray-400 text-[10px] sm:text-xs text-center mt-6 font-medium leading-relaxed">
                                بالتسجيل، أنت توافق على <a href="#" className="underline hover:text-gray-600 transition-colors">الشروط والأحكام</a> و <a href="#" className="underline hover:text-gray-600 transition-colors">سياسة الخصوصية</a>
                            </p>
                        </div>

                        {/* Login Footer */}
                        <div className="bg-[#f8fcff] py-6 text-center border-t border-gray-50">
                            <p className="text-gray-500 text-sm font-bold">
                                لديك حساب بالفعل؟ <Link to="/login" className="text-[#00A8E8] hover:underline transition-all">سجل دخولك من هنا</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <AuthFooter />
        </div>
    );
};

export default Signup;
