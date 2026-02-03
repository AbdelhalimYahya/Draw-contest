import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(formData.phone, formData.password);
        if (success) {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans" dir="rtl">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">تسجيل الدخول</h1>
                    <p className="text-gray-500">لوحة تحكم سحب أم النور</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-sm">رقم الهاتف</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-sm">كلمة المرور</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 transition-colors"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00A8E8] hover:bg-[#0088BB] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="animate-spin w-5 h-5" />}
                        <span>دخول</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
