import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const StatsCard = ({ title, value, icon: Icon, trend, className, color = 'blue' }) => {
    // Map color prop to specific classes if needed, or stick to tailwind utility classes passed via className

    return (
        <div className={twMerge("bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40 transition-transform hover:scale-[1.02]", className)}>
            <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color === 'blue' ? 'bg-blue-50 text-[#00A8E8]' : color === 'green' ? 'bg-green-50 text-green-500' : color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                {/* {trend && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )} */}
            </div>

            <div className="mt-4">
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-black text-gray-900">{value?.toLocaleString() || '0'}</h3>
            </div>
        </div>
    );
};

export default StatsCard;
