import React, { useState, useEffect } from 'react';
import { Users, UserCheck, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RecentSubsTable from '../components/RecentSubsTable';
import DrawTimer from '../components/DrawTimer';
import api from '../lib/axios';

// Interactive Analysis Widget Component - Moved outside to prevent re-renders
const AnalysisWidget = ({ stats }) => {
    // Calculate active subscriptions percentage
    const activePercentage = stats.subscriptions > 0
        ? Math.round((stats.accepted / stats.subscriptions) * 100)
        : 0;

    // Calculate pending requests percentage
    const pendingPercentage = stats.subscriptions > 0
        ? Math.round((stats.pending / stats.subscriptions) * 100)
        : 0;

    return (
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-6 text-center">تحليل التفاعل</h3>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-[#00A8E8]">نسبة المشتركين المفعلين</span>
                        <span className="text-[#00A8E8]">{activePercentage}%</span>
                    </div>
                    <div className="h-3 bg-blue-50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#00A8E8] rounded-full transition-all duration-500"
                            style={{ width: `${activePercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                        <span className="text-orange-400">طلبات قيد المراجعة</span>
                        <span className="text-orange-400">{pendingPercentage}%</span>
                    </div>
                    <div className="h-3 bg-orange-50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-400 rounded-full transition-all duration-500"
                            style={{ width: `${pendingPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DashboardHome = () => {
    const [stats, setStats] = useState({
        users: 0,
        subscriptions: 0,
        accepted: 0,
        pending: 0,
        rejected: 0
    });
    const [recentSubscribers, setRecentSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch stats
                const statsPromise = api.get('/api/v1/dashboard/stats');

                // Fetch Users to get Recent Subscribers
                const usersPromise = api.get('/api/v1/dashboard/users?limit=50');

                const [statsRes, usersRes] = await Promise.all([statsPromise, usersPromise]);

                // Process Stats
                setStats(statsRes.data || {});

                // Process Recent Subscribers from Users API
                // Adjusting for response format: { items: [], page: 1, ... }
                const usersData = usersRes.data.items || usersRes.data.users || usersRes.data.data || usersRes.data;

                let subs = [];
                if (Array.isArray(usersData)) {
                    subs = usersData
                        .filter(u => u.isSubscribed === true)
                        .map(u => ({
                            id: u.subscription?.id || u._id || u.id,
                            user: u,
                            // Handle status priority: Subscription Object > Boolean Flag
                            status: (typeof u.subscription === 'object' && u.subscription?.status)
                                ? u.subscription.status
                                : (u.isSubscribed ? 'accepted' : 'pending'),
                            // Handle date priority
                            createdAt: u.subscription?.createdAt || u.createdAt,
                            billUrl: u.subscription?.billUrl
                        }))
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 3);
                }
                setRecentSubscribers(subs);

            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A8E8]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatsCard
                    title="عدد المسجلين في الموقع"
                    value={stats.users || 0}
                    icon={Users}
                    color="blue"
                />
                <StatsCard
                    title="إجمالي المشتركين في السحب"
                    value={stats.accepted || 0}
                    icon={UserCheck}
                    color="blue"
                />
                <StatsCard
                    title="المقبولين"
                    value={stats.accepted || 0}
                    icon={CheckCircle}
                    color="green"
                    trend={12}
                />
                <StatsCard
                    title="قيد الانتظار"
                    value={stats.pending || 0}
                    icon={Clock}
                    color="orange"
                />
                <StatsCard
                    title="المرفوضين"
                    value={stats.rejected || 0}
                    icon={XCircle}
                    color="red"
                />
            </div>

            {/* Content Row: Table (Right - 2/3) & Widgets (Left - 1/3) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
                <div className="xl:col-span-2">
                    <RecentSubsTable subscribers={recentSubscribers} />
                </div>

                <div className="xl:col-span-1 space-y-6">
                    <AnalysisWidget stats={stats} />
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex items-center justify-center">
                        <DrawTimer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
