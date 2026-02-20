import React, { useState, useEffect } from 'react';
import { Search, Filter, Check, X, FileText, XCircle, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const SubscribersPage = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalPending, setTotalPending] = useState(0);
    const [search, setSearch] = useState('');

    // Image Modal State
    const [selectedImage, setSelectedImage] = useState(null);

    // Rejection Modal State
    const [rejectId, setRejectId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    const fetchPendingSubscribers = async () => {
        setLoading(true);
        try {
            // Using the pending endpoint as per axios.js
            const response = await api.get('/api/v1/subscription/pending', {
                params: {
                    page,
                    limit: 10
                }
            });

            const data = response.data;
            // Handle various possible response structures, prioritizing 'items'
            const subs = data.items || data.subscriptions || data.data || [];

            // Pagination info
            setSubscribers(subs);
            setTotalPages(data.pages || data.pagination?.pages || 1);
            setTotalPending(data.total || data.pagination?.total || subs.length);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
            toast.error("فشل في تحميل طلبات الاشتراك");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingSubscribers();
    }, [page]);

    const handleAccept = async (id) => {
        if (!window.confirm('هل أنت متأكد من قبول هذا الاشتراك؟')) return;

        try {
            await api.put(`/api/v1/subscription/${id}/status`, {
                status: 'accepted'
            });
            toast.success('تم قبول الاشتراك بنجاح');
            fetchPendingSubscribers(); // Refresh list
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء قبول الطلب');
        }
    };

    const handleReject = async () => {
        if (!rejectId || !rejectionReason.trim()) {
            toast.error('الرجاء ذكر سبب الرفض');
            return;
        }

        try {
            await api.put(`/api/v1/subscription/${rejectId}/status`, {
                status: 'rejected',
                rejectionMessage: rejectionReason
            });
            toast.success('تم رفض الاشتراك');
            setRejectId(null);
            setRejectionReason('');
            fetchPendingSubscribers(); // Refresh list
        } catch (error) {
            console.error(error);
            toast.error('حدث خطأ أثناء رفض الطلب');
        }
    };

    // Client-side search if API doesn't support search on pending endpoint
    const filteredSubscribers = subscribers.filter(sub => {
        const name = sub.user?.name || sub.name || '';
        const phone = sub.user?.phone || sub.phone || '';
        return name.includes(search) || phone.includes(search);
    });

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* <div>
                    <h2 className="text-2xl font-black text-gray-900">طلبات الاشتراك المعلقة</h2>
                    <p className="text-gray-500 text-sm mt-1">مراجعة إيصالات الدفع والموافقة على طلبات الاشتراك في المسابقة</p>
                </div> */}

                <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-xl flex items-center gap-2 text-orange-600 font-bold shadow-sm">
                    <span className="text-xl">{totalPending}</span>
                    <span className="text-xs">طلب بانتظار المراجعة</span>
                </div>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="البحث باسم المشترك..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-[#00A8E8] transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex w-full md:w-auto gap-2">
                    <button className="bg-gray-50 border border-gray-100 text-gray-600 px-4 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                        <Calendar size={18} />
                        <span>الأحدث أولاً</span>
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right" dir="rtl">
                        <thead>
                            <tr className="bg-white border-b border-gray-50 text-gray-400 text-xs font-bold">
                                <th className="py-6 px-6 text-right">المشترك</th>
                                <th className="py-6 px-6 text-center">رقم الهاتف</th>
                                <th className="py-6 px-6 text-center">إيصال الدفع</th>
                                <th className="py-6 px-6 text-center">تاريخ الطلب</th>
                                <th className="py-6 px-6 text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredSubscribers.map((sub) => (
                                <tr key={sub._id || sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-black text-lg border border-yellow-100">
                                                {sub.user?.name?.charAt(0) || sub.name?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-base">{sub.user?.name || sub.name || 'مجهول'}</p>
                                                <p className="text-xs text-gray-400">القاهرة، مصر</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center font-bold text-gray-800 dir-ltr font-mono">
                                        {sub.phone}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => setSelectedImage(sub.billImage || sub.billUrl || '#')}
                                            className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-400 hover:bg-orange-100 hover:scale-105 transition-all mx-auto border border-orange-100"
                                            title="عرض الإيصال"
                                        >
                                            <FileText size={24} />
                                        </button>
                                    </td>
                                    <td className="py-4 px-6 text-center text-sm font-bold text-[#00A8E8]">
                                        {sub.createdAt ? formatDistanceToNow(new Date(sub.createdAt), { addSuffix: true, locale: ar }) : '-'}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                onClick={() => handleAccept(sub._id || sub.id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                            >
                                                <Check size={18} strokeWidth={3} />
                                                <span>قبول</span>
                                            </button>
                                            <button
                                                onClick={() => setRejectId(sub._id || sub.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                            >
                                                <X size={18} strokeWidth={3} />
                                                <span>رفض</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredSubscribers.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="5" className="py-16 text-center text-gray-400 font-medium">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                                <Check size={32} />
                                            </div>
                                            <p>لا يوجد طلبات معلقة حالياً</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-white">
                    <p className="text-sm font-bold text-gray-500">
                        عرض {filteredSubscribers.length} من أصل {totalPending} طلب معلق
                    </p>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                        <div className="bg-[#00A8E8] text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-md">
                            {page}
                        </div>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn" onClick={() => setSelectedImage(null)}>
                    <div className="bg-white rounded-[2rem] p-2 max-w-2xl w-full relative shadow-2xl transform transition-transform scale-100" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-gray-900/50 hover:bg-gray-900/80 text-white rounded-full p-2 backdrop-blur-md z-10 transition-colors"
                        >
                            <X size={20} />
                        </button>
                        <div className="rounded-[1.5rem] overflow-hidden bg-gray-100">
                            <img
                                src={selectedImage.startsWith('http') ? selectedImage : `https://api.om-elnour.art${selectedImage}`}
                                alt="Subscription Bill Request"
                                className="w-full h-auto max-h-[80vh] object-contain"
                            />
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Rejection Modal */}
            {rejectId && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl scale-100">
                        <h3 className="text-xl font-black text-gray-900 mb-4 text-center">رفض طلب الاشتراك</h3>
                        <p className="text-gray-500 text-sm mb-6 text-center">الرجاء إدخال سبب الرفض ليتم إرساله للمشترك</p>

                        <textarea
                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:outline-none focus:border-red-500 min-h-[120px] mb-6 text-sm"
                            placeholder="مثال: الصورة غير واضحة، المبلغ غير صحيح..."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setRejectId(null); setRejectionReason(''); }}
                                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={handleReject}
                                className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                            >
                                تأكيد الرفض
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default SubscribersPage;
