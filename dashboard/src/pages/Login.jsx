import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ phone: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phone.length !== 11) {
            setError('يجب أن يتكون رقم الهاتف من 11 رقم بالضبط');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const success = await login(formData.phone);
            if (success) {
                navigate('/');
            } else {
                setError('بيانات الدخول غير صحيحة أو ليس لديك صلاحية مسؤول');
            }
        } catch (err) {
            setError('حدث خطأ أثناء تسجيل الدخول');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans" dir="rtl">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">تسجيل دخول المسؤول</h1>
                    <p className="text-gray-500">لوحة تحكم سحب أم النور</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2 text-sm">رقم الهاتف (11 رقم)</label>
                        <input
                            type="tel"
                            required
                            maxLength={11}
                            placeholder="01XXXXXXXXX"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500 transition-colors font-medium text-lg"
                            value={formData.phone}
                            onChange={(e) => {
                                setFormData({ ...formData, phone: e.target.value });
                                setError('');
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00A8E8] hover:bg-[#0088BB] text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    >
                        {loading && <Loader2 className="animate-spin w-5 h-5" />}
                        <span>دخول المسؤول</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
