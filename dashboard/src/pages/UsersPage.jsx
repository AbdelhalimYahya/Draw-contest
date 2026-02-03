import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

// Modal Component for Add/Edit User
const UserModal = ({ isOpen, onClose, mode, user, onSave }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && mode === 'edit') {
            setFormData({ name: user.name || '', phone: user.phone || '', password: '' });
        } else {
            setFormData({ name: '', phone: '', password: '' });
        }
    }, [user, mode, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl relative">
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                    {mode === 'add' ? 'إضافة مستخدم جديد' : 'تعديل بيانات المستخدم'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">الاسم</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00A8E8]"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">رقم الهاتف</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00A8E8]"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            {mode === 'edit' ? 'كلمة المرور (اتركها فارغة للإبقاء على الحالية)' : 'كلمة المرور'}
                        </label>
                        <input
                            type="password"
                            required={mode === 'add'}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00A8E8]"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-[#00A8E8] text-white font-bold py-3 rounded-xl hover:bg-[#0088BB] transition-colors"
                        >
                            {loading ? 'جاري الحفظ...' : 'حفظ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // all, subscribed, pending, not-subscribed

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentUser, setCurrentUser] = useState(null);

    // Password Visibility State (mapped by user id)
    // const [visiblePasswords, setVisiblePasswords] = useState({});

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/v1/dashboard/users', {
                params: {
                    page,
                    limit: 10,
                    q: search
                }
            });

            // Fixed parsing based on user provided JSON structure
            const responseData = response.data;
            const fetchedUsers = responseData.items || responseData.users || responseData.data || [];

            setUsers(fetchedUsers);
            setTotalPages(responseData.pages || 1);
            setTotalUsers(responseData.total || fetchedUsers.length);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("فشل في تحميل بيانات المستخدمين");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchUsers();
        }, 500);
        return () => clearTimeout(debounce);
    }, [page, search]);

    const handleSaveUser = async (data) => {
        if (modalMode === 'add') {
            // Use signup endpoint as creating a new user logic
            await api.post('/api/v1/auth/signup', data);
            toast.success('تم إضافة المستخدم بنجاح');
        } else {
            // Update user
            // Use _id if available
            const userId = currentUser._id || currentUser.id;
            await api.put(`/api/v1/dashboard/users/${userId}`, data);
            toast.success('تم تحديث بيانات المستخدم');
        }
        fetchUsers();
    };

    const handleDeleteUser = async (user) => {
        const userId = user._id || user.id;
        if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
            try {
                // Use the new auth route without middleware
                await api.delete(`/api/v1/auth/user/${userId}`);
                toast.success('تم حذف المستخدم');
                fetchUsers();
            } catch (error) {
                console.error(error);
                toast.error('لم يتم حذف المستخدم');
            }
        }
    };

    // const togglePasswordVisibility = (id) => {
    //     setVisiblePasswords(prev => ({
    //         ...prev,
    //         [id]: !prev[id]
    //     }));
    // };

    const getStatusBadge = (user) => {
        // Priority: explicit subscription status if available
        const subStatus = (user.subscription && typeof user.subscription === 'object') ? user.subscription.status : undefined;

        if (subStatus === 'accepted') {
            return <span className="px-3 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold">مشترك</span>;
        }

        if (subStatus === 'pending') {
            return <span className="px-3 py-1 rounded-lg bg-yellow-100 text-yellow-700 text-xs font-bold">قيد المراجعة</span>;
        }

        if (subStatus === 'rejected') {
            return <span className="px-3 py-1 rounded-lg bg-red-100 text-red-600 text-xs font-bold">مرفوض</span>;
        }

        // Fallback: boolean flag
        if (user.isSubscribed) {
            return <span className="px-3 py-1 rounded-lg bg-green-100 text-green-600 text-xs font-bold">مشترك</span>;
        }

        return <span className="px-3 py-1 rounded-lg bg-gray-100 text-gray-500 text-xs font-bold">ليس مشترك</span>;
    };

    // Filter users on client side if API doesn't support status filter (robustness)
    const filteredUsers = statusFilter === 'all'
        ? users
        : users.filter(u => {
            if (statusFilter === 'not-subscribed') return !u.isSubscribed;
            if (statusFilter === 'accepted') return u.isSubscribed;
            // For pending/other filters, we reset or ignore since we simplified the view
            return true;
        });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* <div>
                    <h2 className="text-2xl font-black text-gray-900">إدارة المستخدمين</h2>
                    <p className="text-gray-500 text-sm mt-1">عرض وإدارة جميع المستخدمين المسجلين في المنصة</p>
                </div> */}
                <button
                    onClick={() => { setModalMode('add'); setCurrentUser(null); setIsModalOpen(true); }}
                    className="bg-[#00A8E8] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#0088BB] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    <span>إضافة مستخدم</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="البحث بالاسم أو رقم الهاتف..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-12 pl-4 focus:outline-none focus:border-[#00A8E8] transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex w-full md:w-auto gap-2">
                    <select
                        className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 font-bold text-gray-600 focus:outline-none focus:border-[#00A8E8] cursor-pointer"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">كل الحالات</option>
                        <option value="accepted">مشترك</option>
                        <option value="not-subscribed">ليس مشترك</option>
                    </select>

                    <button className="bg-gray-50 border border-gray-100 text-gray-600 px-4 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                        <Filter size={16} />
                        <span className="hidden sm:inline">تصفية</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead>
                            <tr className="bg-white border-b border-gray-50 text-gray-400 text-xs font-bold">
                                <th className="py-6 px-6 text-right">الاسم</th>
                                <th className="py-6 px-6 text-right">رقم الهاتف</th>
                                <th className="py-6 px-6 text-center">الحالة</th>
                                <th className="py-6 px-6 text-center">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <tr key={user._id || user.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-[#00A8E8] flex items-center justify-center font-bold text-sm">
                                                {user.name?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-400">القاهرة، مصر</p> {/* Static location as placeholder */}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 font-bold text-gray-700" dir="ltr">
                                        <span className="w-full text-right inline-block">{user.phone}</span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        {getStatusBadge(user)}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => { setModalMode('edit'); setCurrentUser(user); setIsModalOpen(true); }}
                                                className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-[#00A8E8] hover:text-white transition-colors"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">
                                        لا يوجد مستخدمين لعرضهم
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-500">
                        عرض {users.length} من أصل {totalUsers} مستخدم
                    </p>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>

                        {/* Simple Page Indicator */}
                        <div className="flex gap-1">
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                const p = i + 1; // Simplistic pagination logic for demo
                                return (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${page === p ? 'bg-[#00A8E8] text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        {p}
                                    </button>
                                )
                            })}
                        </div>

                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                user={currentUser}
                onSave={handleSaveUser}
            />
        </div>
    );
};

export default UsersPage;
