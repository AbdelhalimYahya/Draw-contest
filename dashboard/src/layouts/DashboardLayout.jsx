import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, UserCheck, Activity, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarLink = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm mb-2 ${isActive
                ? 'bg-[#00A8E8] text-white shadow-lg'
                : 'text-gray-500 hover:bg-gray-50 hover:text-[#00A8E8]'
            }`
        }
    >
        <Icon size={20} />
        <span>{label}</span>
    </NavLink>
);

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F3F6F9] font-sans flex text-right" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 bg-white h-screen fixed right-0 top-0 border-l border-gray-100 flex flex-col z-50">
                <div className="p-8 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#00A8E8] font-black text-xl">
                        أ
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">أم النور</h1>
                </div>

                <nav className="flex-1 px-4 py-6">
                    <div className="mb-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider">القائمة الرئيسية</div>
                    <SidebarLink to="/" icon={LayoutGrid} label="الصفحة الرئيسية" />
                    <SidebarLink to="/users" icon={Users} label="المستخدمين" />
                    <SidebarLink to="/subscribers" icon={UserCheck} label="المشتركين" />
                    <SidebarLink to="/status" icon={Activity} label="الحالة" />
                </nav>

                <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 bg-[#00A8E8] rounded-full flex items-center justify-center text-white font-bold">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{user?.name || 'المدير العام'}</p>
                            <p className="text-xs text-gray-500">{user?.email || 'admin@omelnour.com'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors text-sm font-bold"
                    >
                        <LogOut size={16} />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 mr-64 p-8 transition-all duration-300">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-gray-800">نظرة عامة على النظام</h2>
                        <p className="text-gray-500 text-sm mt-1">مرحباً بك مجدداً في لوحة إدارة سحب أم النور</p>
                    </div>
                </header>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
