import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const DrawTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            let year = now.getFullYear();
            let targetDate = new Date(year, 2, 1); // March 1st

            if (now > targetDate) {
                targetDate.setFullYear(year + 1);
            }

            const difference = targetDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-blue-50/50 rounded-2xl p-4 sm:p-6 border border-blue-100/50 flex flex-col items-center justify-center text-center shadow-sm w-full">
            <h4 className="text-[#00A8E8] font-bold mb-3 sm:mb-4 text-xs sm:text-sm flex items-center gap-1.5 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm">
                <Clock size={14} className="shrink-0" />
                <span>وقت السحب القادم</span>
                <span className="text-gray-300 text-[10px] sm:text-xs px-1">|</span>
                <span className="text-blue-400 text-[10px] sm:text-xs whitespace-nowrap">01 مارس</span>
            </h4>

            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 font-mono tracking-wider leading-none mb-1.5 sm:mb-2" dir="ltr">
                <div className="bg-white min-w-8 sm:min-w-10 md:min-w-12 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-sm text-center">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <span className="text-gray-300 mx-0.5 text-xl sm:text-2xl">:</span>
                <div className="bg-white min-w-8 sm:min-w-10 md:min-w-12 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-sm text-center">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <span className="text-gray-300 mx-0.5 text-xl sm:text-2xl">:</span>
                <div className="bg-white min-w-8 sm:min-w-10 md:min-w-12 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-sm text-center">{String(timeLeft.hours).padStart(2, '0')}</div>
                <span className="text-gray-300 mx-0.5 text-xl sm:text-2xl">:</span>
                <div className="bg-white min-w-8 sm:min-w-10 md:min-w-12 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-sm text-center">{String(timeLeft.days).padStart(2, '0')}</div>
            </div>

            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3">
                <div className="text-center">
                    <div className="text-gray-500 text-[9px] sm:text-[10px] font-medium">أيام</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-500 text-[9px] sm:text-[10px] font-medium">ساعات</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-500 text-[9px] sm:text-[10px] font-medium">دقائق</div>
                </div>
                <div className="text-center">
                    <div className="text-gray-500 text-[9px] sm:text-[10px] font-medium">ثواني</div>
                </div>
            </div>
        </div>
    );
};

export default DrawTimer;
