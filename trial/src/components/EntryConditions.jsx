import React from 'react';

const EntryConditions = () => {
    return (
        <section className="py-16 sm:py-24 bg-white font-sans" dir="rtl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Right Column: Trusted Draw Card (Displayed on Left due to RTL but structurally 2nd in DOM usually, but let's stick to visual flow) 
                        Wait, in RTL:
                        col-1 is Right visually if we just write standard flow? No.
                        In standard HTML flow with dir="rtl": First element is Right.
                        The design shows "Entry Conditions" on Right, "Blue Card" on Left.
                        So "Entry Conditions" should be the first element in the grid if using dir="rtl".
                    */}

                    {/* Content Section (Right Side) */}
                    <div className="order-1 lg:order-1">
                        <span className="text-[#0099DD] font-bold text-lg mb-2 block">
                            خطوات بسيطة
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            شروط الدخول في <br /> السحب
                        </h2>
                        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                            حلم المطبخ الجديد يبدأ هنا. اتبع التعليمات التالية لضمان دخول اسمك في السحب القادم.
                        </p>

                        <div className="space-y-6">
                            {/* Step 1 */}
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex items-start gap-5 hover:bg-white hover:shadow-lg transition-all duration-300">
                                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">تسجيل الحساب</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        قم بإنشاء حسابك وتأكيد بياناتك الشخصية عبر رقم الهاتف والبريد الإلكتروني لضمان التواصل معك في حال الفوز.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 flex items-start gap-5 hover:bg-white hover:shadow-lg transition-all duration-300">
                                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mt-1">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">مبلغ التأمين الجدي</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        دفع مبلغ رمزي قدره 10 جنيهات فقط لضمان جدية الاشتراك، يتم استرداد المبلغ بالكامل في حال عدم الفوز.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blue Card (Left Side) */}
                    <div className="order-2 lg:order-2">
                        <div className="bg-[#0e8ed3] text-white rounded-[2.5rem] p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 h-full flex flex-col justify-center items-center">
                            {/* Decorative circles */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-black mb-4">سحب موثوق</h3>
                                <p className="text-blue-50 text-lg leading-relaxed max-w-xs mx-auto">
                                    يتم السحب بشفافية كاملة وتحت إشراف جهات معتمدة لضمان حقوق جميع المشتركين
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EntryConditions;