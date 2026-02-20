import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthNavbar from '../components/AuthNavbar';
import AuthFooter from '../components/AuthFooter';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';

const Subscription = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        phone: '',
    });
    const [billFile, setBillFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handlePhoneChange = (e) => {
        setFormData({ ...formData, phone: e.target.value });
        setError('');
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        setError('');
        if (file.type.startsWith('image/')) {
            setBillFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setError('الرجاء تحميل ملف صورة صحيح (JPG, PNG).');
        }
    };

    // Drag and Drop handlers
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Phone number validation
        if (formData.phone.length !== 11) {
            setError('يجب أن يتكون رقم الهاتف من 11 رقم بالضبط');
            return;
        }

        if (!formData.phone || !billFile) {
            setError('الرجاء إدخال رقم الهاتف وصورة الإيصال.');
            return;
        }

        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('phone', formData.phone);
        data.append('bill', billFile);

        try {
            const response = await api.post('/api/v1/subscription', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setSuccess(true);
                // Reset form optionally or redirect
                // navigate('/'); // Or keep them on a success screen
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
                <AuthNavbar />
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-xl p-12 text-center max-w-lg w-full border border-gray-100">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4">تم الاشتراك بنجاح!</h2>
                        <p className="text-gray-500 mb-8">تم استلام طلبك وصورة التحويل وسيتم تأكيد اشتراكك قريباً.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-[#00A8E8] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#0088BB] transition-colors"
                        >
                            العودة للرئيسية
                        </button>
                    </div>
                </main>
                <AuthFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
            <AuthNavbar />

            <main className="flex-grow flex items-start justify-center p-4 py-8 sm:py-12">
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 relative">
                        {/* Decorative Background for Card */}
                        <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-[#00A8E8] to-[#33BFEF]"></div>

                        <div className="p-6 sm:p-12">
                            {/* Header */}
                            <div className="text-center mb-10">
                                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">اشترك في السحب الآن</h1>
                                <p className="text-gray-500 text-lg">ادخل الرقم الذي حولت منه علي محفظة فودافون كاش</p>
                                <p className="text-gray-500 text-lg">رقم التحويل هو 01030593289</p>
                            </div>

                            {error && (
                                <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl text-center font-bold border border-red-100">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

                                    {/* Right Side: Inputs */}
                                    <div className="order-2 lg:order-1 space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="tex-xl font-bold text-gray-700">بيانات المشترك</h3>

                                            {/* Phone Input */}
                                            <div>
                                                <label className="block text-gray-600 font-bold mb-2 text-sm">رقم الهاتف (11 رقم)</label>
                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={handlePhoneChange}
                                                        maxLength={11}
                                                        placeholder="أدخل 11 رقم (مثال: 010XXXXXXXX)"
                                                        required
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-12 text-gray-800 focus:outline-none focus:border-[#00A8E8] focus:bg-white transition-all font-medium text-lg"
                                                    />
                                                    <div className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 hidden lg:block">
                                            <div className="flex items-start gap-3">
                                                <svg className="w-6 h-6 text-[#00A8E8] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-sm text-blue-800 leading-relaxed font-medium">
                                                    تأكد من أن صورة التحويل واضحة وتحتوي على رقم المرجع وتاريخ العملية لضمان قبول طلبك بسرعة.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Left Side: Upload */}
                                    <div className="order-1 lg:order-2">
                                        <div className="mb-2 flex justify-between items-center">
                                            <label className="block text-gray-600 font-bold text-sm">رفع صورة تأكيد الدفع</label>
                                            {billFile && (
                                                <button
                                                    type="button"
                                                    onClick={() => { setBillFile(null); setPreviewUrl(null); }}
                                                    className="text-red-500 text-xs font-bold hover:underline"
                                                >
                                                    حذف الصورة
                                                </button>
                                            )}
                                        </div>

                                        <div
                                            className={`relative border-2 border-dashed rounded-[2rem] h-64 sm:h-80 flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden ${dragActive
                                                ? 'border-[#00A8E8] bg-blue-50 scale-[1.02]'
                                                : billFile
                                                    ? 'border-[#00A8E8] bg-white'
                                                    : 'border-blue-200 bg-[#f0f9ff] hover:bg-blue-50 hover:border-blue-400'
                                                }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />

                                            {previewUrl ? (
                                                <div className="absolute inset-0 w-full h-full p-2">
                                                    <img
                                                        src={previewUrl}
                                                        alt="Receipt Preview"
                                                        className="w-full h-full object-contain rounded-[1.5rem]"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[1.5rem]">
                                                        <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">تغيير الصورة</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center p-6 transition-transform duration-300 group-hover:scale-110">
                                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6 text-[#00A8E8]">
                                                        <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">اسحب الصورة هنا</h3>
                                                    <p className="text-gray-500 text-sm mb-6 max-w-[200px] mx-auto">أو اضغط لتصفح الملفات من جهازك</p>
                                                    <span className="bg-[#00A8E8] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-blue-200">
                                                        اختيار ملف
                                                    </span>
                                                    <p className="text-xs text-gray-400 mt-4">(JPG, PNG بحد أقصى 5 ميجابايت)</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="mt-12">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full bg-[#00A8E8] hover:bg-[#0088BB] text-white font-black text-xl py-5 rounded-2xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-[1.01] flex items-center justify-center gap-3 active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <span>جاري الإرسال...</span>
                                        ) : (
                                            <>
                                                <svg className="w-8 h-8 rounded-full bg-white text-[#00A8E8] p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>تأكيد الاشتراك في السحب</span>
                                            </>
                                        )}
                                    </button>

                                    <div className="text-center mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs font-medium">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                        </svg>
                                        <span>بياناتك محمية ومشفرة بالكامل طبقاً لمعايير الخصوصية</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <AuthFooter />
        </div>
    );
};

export default Subscription;
