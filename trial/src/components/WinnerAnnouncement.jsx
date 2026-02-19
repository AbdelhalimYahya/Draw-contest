import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Trophy, Star, Gift, Sparkles } from 'lucide-react';

const DUMMY_NAMES = [
    "محمد أحمد", "سارة علي", "يوسف محمود", "فاطمة حسن",
    "خالد إبراهيم", "نور الهدى", "عبد الله محمد", "مريم سعيد",
    "علي حسن", "هدى محمود", "أحمد كمال", "منى جابر"
];

const WinnerAnnouncement = ({ winner }) => {
    const [currentName, setCurrentName] = useState("جاري السحب...");
    const [isFinished, setIsFinished] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!winner) return;

        let interval;
        let counter = 0;
        const totalDuration = 4000; // 4 seconds total duration
        const steps = 30; // Total swaps
        const stepDuration = totalDuration / steps;

        interval = setInterval(() => {
            counter++;
            const randomName = DUMMY_NAMES[Math.floor(Math.random() * DUMMY_NAMES.length)];
            setCurrentName(randomName);

            if (counter >= steps) {
                clearInterval(interval);
                setCurrentName(winner.name);
                setIsFinished(true);
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, [winner]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#00A8E8] to-[#0077A3] flex items-center justify-center font-sans p-4 relative overflow-hidden" dir="rtl">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-10 left-10 animate-bounce delay-100"><Star size={40} className="text-white" /></div>
                <div className="absolute bottom-20 right-20 animate-pulse delay-300"><Sparkles size={60} className="text-yellow-300" /></div>
                <div className="absolute top-1/2 left-1/4 animate-ping"><Gift size={30} className="text-pink-300" /></div>
            </div>

            {isFinished && <Confetti width={windowSize.width} height={windowSize.height} recycle={true} numberOfPieces={200} />}

            <div className={`bg-white rounded-[3rem] p-10 sm:p-16 max-w-2xl w-full text-center shadow-2xl transform transition-all duration-700 ${isFinished ? 'scale-105' : 'scale-100'}`}>

                {/* Header */}
                <div className="mb-10 relative">
                    <div className="absolute -top-20 sm:-top-24 left-1/2 transform -translate-x-1/2 bg-yellow-400 p-5 sm:p-6 rounded-full border-8 border-white shadow-xl z-10">
                        <Trophy size={56} className="text-white animate-bounce sm:w-16 sm:h-16" strokeWidth={2} />
                    </div>
                    <div className="pt-16 sm:pt-20">
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-400 mb-2">الفائز في السحب هو</h2>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full mt-4"></div>
                    </div>
                </div>

                {/* Name Display */}
                <div className="relative h-32 flex items-center justify-center mb-8 overflow-hidden">
                    <h1 className={`text-4xl sm:text-6xl font-black transition-all duration-300 ${isFinished
                        ? 'text-[#00A8E8] scale-110 drop-shadow-md animate-in zoom-in slide-in-from-bottom-4 duration-500'
                        : 'text-gray-300 blur-sm scale-90'
                        }`}>
                        {currentName}
                    </h1>
                </div>

                {isFinished && (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <p className="text-xl text-gray-500 font-bold mb-8">ألف مبروك! نتمنى لك حظاً سعيداً</p>

                        <div className="inline-block bg-yellow-50 border-2 border-yellow-100 rounded-2xl p-4 px-8 transform -rotate-2">
                            <p className="text-yellow-700 font-black text-lg flex items-center gap-2">
                                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                                جائزة المطبخ تنتظرك!
                                <Star className="text-yellow-500 fill-yellow-500" size={20} />
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WinnerAnnouncement;
