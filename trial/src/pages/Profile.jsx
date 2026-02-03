import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthNavbar from '../components/AuthNavbar';
import AuthFooter from '../components/AuthFooter';
import api from '../lib/axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user: authUser, logout } = useAuth();
    const navigate = useNavigate();

    // We store API-specific data (like subscription details) separately
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Combine context user with fetched API data
    const profile = { ...authUser, ...apiData };

    useEffect(() => {
        if (authUser) {
            fetchProfile();
        }
    }, [authUser]);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/api/v1/auth/profile');
            console.log('Profile API Response:', response.data);

            const data = response.data;
            // Handle different possible structures to find subscription info
            // Sometimes it might be directly in data, or nested in user/data property
            const userData = data.user || data.data || data;
            const subscriptionData = data.subscription || userData?.subscription;

            setApiData({
                ...userData, // Update user details if any new ones came from API
                subscription: subscriptionData
            });
        } catch (err) {
            console.error('Profile Fetch Error:', err);
            // Don't show error immediately if we have authUser, just log it
            // Only set error if we really need to alert the user
            if (!authUser) setError('فشل في تحميل بيانات الملف الشخصي');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleEditSubscription = () => {
        navigate('/subscription');
    };

    // If loading and no authUser, show spinner (initial load)
    // If loading but we have authUser, we can show the page with a small loader indication or just the stale data
    if (loading && !authUser) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans" dir="rtl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A8E8]"></div>
            </div>
        );
    }

    if (!authUser) {
        // Should not happen if protected route, but safety check
        return null;
    }

    // Colors for statuses
    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'accepted': return 'مقبول';
            case 'rejected': return 'مرفوض';
            default: return 'قيد المراجعة';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
            <AuthNavbar />

            <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
                <div className="max-w-3xl mx-auto space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-black text-gray-900">الملف الشخصي</h1>
                        <button
                            onClick={handleLogout}
                            className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-bold hover:bg-red-100 transition-colors"
                        >
                            تسجيل الخروج
                        </button>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* User Info Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-3xl">
                                {profile?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{profile?.name}</h2>
                                <p className="text-gray-500 font-medium mt-1">{profile?.phone}</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">حالة الاشتراك</h3>

                            {loading ? (
                                <div className="text-gray-500 text-sm">جاري تحميل الاشتراك...</div>
                            ) : profile?.subscription ? (
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(profile.subscription.status)}`}>
                                                {getStatusText(profile.subscription.status)}
                                            </span>
                                        </div>
                                        <div className="text-gray-400 text-sm font-medium">
                                            رقم الاشتراك: #{profile.subscription.id?.slice(0, 8) || 'N/A'}
                                        </div>
                                    </div>

                                    {profile.subscription.status === 'rejected' && (
                                        <div className="mt-6 animate-fadeIn">
                                            <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
                                                <p className="font-bold text-red-800 mb-1">سبب الرفض:</p>
                                                <p className="text-red-600">{profile.subscription.rejectionMessage || 'غير محدد'}</p>
                                            </div>

                                            <button
                                                onClick={handleEditSubscription}
                                                className="w-full sm:w-auto bg-[#00A8E8] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0088BB] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                            >
                                                تعديل الاشتراك
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 font-medium mb-4">لم تقم بالاشتراك في السحب بعد</p>
                                    <button
                                        onClick={() => navigate('/subscription')}
                                        className="bg-[#00A8E8] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0088BB] transition-colors shadow-lg"
                                    >
                                        اشترك الآن
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <AuthFooter />
        </div>
    );
};

export default Profile;
