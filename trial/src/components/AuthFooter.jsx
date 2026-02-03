import React from 'react';

const AuthFooter = () => {
    return (
        <footer className="py-8 bg-white text-center">
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#00A8E8]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L1 21h22L12 2zm0 3.45l8.15 14.1H3.85L12 5.45zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z" />
                    </svg>
                    <span className="text-xl font-black text-gray-900">أم النور</span>
                </div>
                <p className="text-gray-400 text-xs font-medium">
                    جميع الحقوق محفوظة © ٢٠٢٤ أم النور
                </p>
            </div>
        </footer>
    );
};

export default AuthFooter;
