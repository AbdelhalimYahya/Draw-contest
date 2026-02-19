import React, { useState, useEffect } from 'react';
import { Power, Wifi, AlertTriangle, Info, Sparkles, Trophy, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const StatusPage = () => {
    const [isActive, setIsActive] = useState(true);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await api.get('/api/v1/dashboard/site-status');
            const status = response.data?.isActive ?? true;
            setIsActive(status);
            if (response.data?.winner) {
                setWinner(response.data.winner);
            }
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

        if (!window.confirm(`هل أنت متأكد من ${action} الموقع؟ ${!newStatus ? 'سيتم منع المستخدمين من التسجيل.' : 'سيتاح التسجيل للجميع وسيتم إعادة ضبط السحب.'}`)) {
            return;
        }

        setProcessing(true);
        try {
            const response = await api.put('/api/v1/dashboard/site-status', {
                isActive: newStatus
            });
            setIsActive(newStatus);
            // If reactivating, winner is cleared in backend, so clear here too
            if (newStatus) {
                setWinner(null);
            }
            toast.success(`تم ${action} الموقع بنجاح`);
        } catch (error) {
            console.error(error);
            toast.error(`حدث خطأ أثناء ${action} الموقع`);
        } finally {
            setProcessing(false);
        }
    };

    const startRaffle = async () => {
        if (!window.confirm('هل أنت متأكد من بدء السحب واختيار الفائز؟')) {
            return;
        }

        setProcessing(true);
        try {
            const response = await api.post('/api/v1/dashboard/raffle');
            if (response.data?.winner) {
                setWinner(response.data.winner);
                toast.success('تم اختيار الفائز بنجاح!');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'حدث خطأ أثناء السحب');
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
            <div className="flex flex-col items-center justify-center py-8">
                {/* Main Card */}
                <div className="bg-[#f0f9ff]/50 w-full max-w-2xl rounded-[3rem] p-12 text-center border border-blue-50 shadow-sm relative overflow-hidden transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#00A8E8] to-transparent opacity-20"></div>

                    {/* Winner Display Section */}
                    {winner && !isActive ? (
                        <div className="animate-in fade-in zoom-in duration-500 mb-8">
                            <div className="mx-auto w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(234,179,8,0.4)] relative">
                                <Trophy size={64} className="text-yellow-600 animate-bounce" strokeWidth={1.5} />
                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-md">
                                    الفائز!
                                </div>
                            </div>
                            <h3 className="text-4xl font-black text-gray-900 mb-2">{winner.name}</h3>
                            <div className="flex items-center justify-center gap-2 text-xl text-gray-600 font-bold bg-white/50 py-2 px-6 rounded-xl w-fit mx-auto mt-4 border border-blue-50">
                                <Phone size={20} className="text-[#00A8E8]" />
                                <span dir="ltr">{winner.phone}</span>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                    : 'الموقع متوقف حالياً. لا يمكن للمستخدمين الجدد التسجيل.'
                                }
                            </p>
                        </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 items-center justify-center">
                        {/* If inactive and no winner, show Start Raffle Button */}
                        {!isActive && !winner && (
                            <button
                                onClick={startRaffle}
                                disabled={processing}
                                className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-2xl text-white font-bold text-2xl transition-all transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-yellow-400 to-orange-500 shadow-xl shadow-orange-200 w-full sm:w-auto overflow-hidden animate-pulse"
                            >
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12"></div>
                                <Sparkles size={28} strokeWidth={3} className="animate-spin-slow" />
                                <span>بدء السحب الآن!</span>
                            </button>
                        )}

                        {/* Toggle Status Button */}
                        <button
                            onClick={toggleStatus}
                            disabled={processing}
                            className={`group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-white font-bold text-xl transition-all transform hover:-translate-y-1 hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto ${isActive
                                ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200' // Stop Site
                                : winner
                                    ? 'bg-gray-400 hover:bg-gray-500 shadow-lg' // Reset/Restart (via toggle)
                                    : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200' // Start Site (Resume)
                                }`}
                        >
                            <Power size={24} strokeWidth={3} />
                            <span>
                                {isActive ? 'إيقاف الموقع' : 'تشغيل الموقع (إعادة ضبط)'}
                            </span>
                        </button>
                    </div>

                    {/* Info Note */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-sm font-bold">
                        <Info size={16} />
                        <span>
                            {isActive
                                ? 'إيقاف الموقع سيمنع وصول المستخدمين ويتيح لك بدء السحب.'
                                : 'تشغيل الموقع سيفتح التسجيل مرة أخرى ويلغي نتيجة السحب الحالية.'
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
                            يُرجى التأكد من عدم وجود عمليات تسجيل نشطة قبل إيقاف الموقع. عند تشغيل الموقع مرة أخرى، سيتم مسح بيانات الفائز الحالي لبدء جولة جديدة.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusPage;
