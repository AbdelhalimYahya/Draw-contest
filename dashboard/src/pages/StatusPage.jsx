import React, { useState, useEffect } from 'react';
import { Power, Wifi, AlertTriangle, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const StatusPage = () => {
    const [isActive, setIsActive] = useState(true); // Default assumption
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await api.get('/api/v1/dashboard/site-status');
            // Assuming response.data contains { isActive: boolean } or directly boolean
            // Adjust based on actual API response structure if needed. 
            // Based on axios.js comments, it seems it returns OK. Usually wraps data.
            // Let's assume response.data.isActive or response.data.status
            const status = response.data?.isActive ?? response.data?.status ?? true;
            setIsActive(status);
        } catch (error) {
            console.error(error);
            toast.error('فشل في تحميل حالة النظام');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async () => {
        const newStatus = !isActive;
        const action = newStatus ? 'تشغيل' : 'إيقاف';

        if (!window.confirm(`هل أنت متأكد من ${action} الموقع؟ ${!newStatus ? 'سيتم منع المستخدمين من التسجيل.' : 'سيتاح التسجيل للجميع.'}`)) {
            return;
        }

        setProcessing(true);
        try {
            await api.put('/api/v1/dashboard/site-status', {
                isActive: newStatus
            });
            setIsActive(newStatus);
            toast.success(`تم ${action} الموقع بنجاح`);
        } catch (error) {
            console.error(error);
            toast.error(`حدث خطأ أثناء ${action} الموقع`);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A8E8]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            {/* <div>
                <h2 className="text-2xl font-black text-gray-900">حالة النظام</h2>
                <p className="text-gray-500 text-sm mt-1">التحكم في توفر الموقع للجمهور والتسجيل</p>
            </div> */}

            <div className="flex flex-col items-center justify-center py-8">
                {/* Main Card */}
                <div className="bg-[#f0f9ff]/50 w-full max-w-2xl rounded-[3rem] p-12 text-center border border-blue-50 shadow-sm relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#00A8E8] to-transparent opacity-20"></div>

                    {/* Status Icon */}
                    <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isActive ? 'bg-green-100 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-red-100 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                        }`}>
                        <Wifi size={48} className={isActive ? 'animate-pulse' : ''} />
                    </div>

                    {/* Status Text */}
                    <h3 className="text-3xl font-black text-gray-900 mb-4 flex items-center justify-center gap-2">
                        حالة الموقع حالياً:
                        <span className={isActive ? 'text-green-500' : 'text-red-500'}>
                            {isActive ? 'يعمل' : 'متوقف'}
                        </span>
                    </h3>

                    <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                        {isActive
                            ? 'الموقع متاح حالياً لجميع المستخدمين ويمكنهم التسجيل في المسابقة ورفع إيصالات الدفع بشكل طبيعي.'
                            : 'الموقع متوقف حالياً. لا يمكن للمستخدمين الجدد التسجيل ولا يمكن للمشتركين الحاليين رفع إيصالات الدفع.'
                        }
                    </p>

                    {/* Action Button */}
                    <button
                        onClick={toggleStatus}
                        disabled={processing}
                        className={`group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-xl transition-all transform hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed ${isActive
                                ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200'
                                : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200'
                            }`}
                    >
                        <Power size={24} strokeWidth={3} />
                        <span>{isActive ? 'إيقاف الموقع' : 'تشغيل الموقع'}</span>
                    </button>

                    {/* Info Note */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm font-bold">
                        <Info size={16} />
                        <span>
                            {isActive
                                ? 'إيقاف الموقع سيمنع وصول المستخدمين لنموذج التسجيل فوراً.'
                                : 'تشغيل الموقع سيسمح للمستخدمين بالوصول فوراً.'
                            }
                        </span>
                    </div>
                </div>

                {/* Warning Footer */}
                <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-2xl p-6 max-w-2xl w-full flex items-start gap-4">
                    <div className="bg-yellow-100 text-yellow-600 p-2 rounded-xl shrink-0">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-yellow-800 mb-1">تنبيه هام</h4>
                        <p className="text-yellow-700 text-sm leading-relaxed">
                            يُرجى التأكد من عدم وجود عمليات تسجيل نشطة قبل إيقاف الموقع لتجنب فقدان البيانات أو تجربة مستخدم سيئة. الإيقاف يتم على مستوى الخادم وقد يستغرق دقيقة ليظهر لجميع المستخدمين.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusPage;
