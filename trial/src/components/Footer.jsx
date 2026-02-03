import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 font-sans pt-16 pb-8" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-12">

                    {/* Brand Column (Right visually in RTL) */}
                    <div className="flex flex-col items-start">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">
                            أم النور
                        </h2>
                        <p className="text-gray-500 leading-relaxed text-base mb-8 max-w-sm">
                            نسعى دائماً لإدخال السعادة على قلوب عملائنا من خلال تقديم أفضل الجوائز وأجود الخدمات المنزلية.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#00A8E8] transition-transform hover:scale-110 cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                            </div>
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#00A8E8] transition-transform hover:scale-110 cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17 10.43V2H7v8.43l5 2.52 5-2.52zM12 15c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Column (Center visually in RTL) */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                            روابط سريعة
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="/" className="text-blue-400 hover:text-blue-600 transition-colors font-medium">الرئيسية</a>
                            </li>
                            <li>
                                <a href="/faq" className="text-blue-400 hover:text-blue-600 transition-colors font-medium">الأسئلة الشائعة</a>
                            </li>
                            <li>
                                <a href="/terms" className="text-blue-400 hover:text-blue-600 transition-colors font-medium">الشروط والأحكام</a>
                            </li>
                            <li>
                                <a href="/privacy" className="text-blue-400 hover:text-blue-600 transition-colors font-medium">سياسة الخصوصية</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column (Left visually in RTL) */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-sans">
                            تواصل معنا
                        </h3>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-3">
                                <span className="text-blue-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <a href="mailto:info@omelnour.com" className="text-blue-400 hover:text-blue-600 transition-colors font-medium dir-ltr">info@omelnour.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-blue-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </span>
                                <span className="text-blue-400 font-medium">19000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-blue-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <span className="text-blue-400 font-medium">القاهرة، مصر</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-50 text-center">
                    <p className="text-blue-400 font-medium text-sm">
                        جميع الحقوق محفوظة © ٢٠٢٤ أم النور
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
