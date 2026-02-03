import React, { useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Eye, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

const RecentSubsTable = ({ subscribers = [] }) => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'accepted': return 'مقبول';
            case 'pending': return 'قيد المراجعة';
            case 'rejected': return 'مرفوض';
            // case null: return 'غير مشترك';
            default: return status;
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 flex-1">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-gray-900">آخر المشتركين المسجلين</h3>
                <button 
                    onClick={() => navigate('/users')}
                    className="text-[#00A8E8] font-bold text-sm hover:underline"
                >
                    عرض الكل
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-right" dir="rtl">
                    <thead>
                        <tr className="border-b border-gray-50 text-gray-400 text-xs font-bold bg-transparent">
                            <th className="py-4 px-4 text-right rounded-r-xl">المشترك</th>
                            <th className="py-4 px-4 text-right">تاريخ التسجيل</th>
                            <th className="py-4 px-4 text-center rounded-l-xl">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {subscribers.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-sm uppercase">
                                            {sub.user?.name?.charAt(0) || sub.name?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 leading-tight">
                                                {sub.user?.name || sub.name || 'مستخدم غير معروف'}
                                            </p>
                                            <p className="text-xs text-gray-400 font-medium">
                                                {sub.user?.email || sub.email || sub.phone}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm font-bold text-gray-600">
                                    {sub.createdAt ? format(new Date(sub.createdAt), 'dd MMMM yyyy', { locale: ar }) : '-'}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(sub.status)}`}>
                                        {getStatusText(sub.status)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {subscribers.length === 0 && (
                            <tr>
                                <td colSpan={3} className="text-center py-8 text-gray-400 font-medium">لا يوجد مشتركين حالياً</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Image Modal using Portal */}
            {selectedImage && selectedImage !== '#' && selectedImage.trim() !== '' && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn" onClick={() => setSelectedImage(null)}>
                    <div className="bg-white rounded-2xl p-2 max-w-2xl w-full relative shadow-2xl transform transition-transform scale-100" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-md z-10 transition-colors"
                        >
                            <X size={20} className="text-gray-800" />
                        </button>
                        <img 
                            src={selectedImage.startsWith('http') ? selectedImage : `http://localhost:5000${selectedImage}`} 
                            alt="Subscription Bill" 
                            className="w-full h-auto max-h-[80vh] object-contain rounded-xl" 
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default RecentSubsTable;
