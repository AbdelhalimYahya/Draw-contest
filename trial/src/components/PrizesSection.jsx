import React from 'react';
import slide1 from '../assets/header/1.jpg';
import slide2 from '../assets/header/2.jpg';
import slide3 from '../assets/header/3.jpg';

const PrizesSection = () => {
    const prizes = [
        {
            id: 1,
            title: 'أجهزة كهربائية ذكية',
            description: 'طقم متكامل يضم ثلاجة ذكية، فرن بلت-إن، وغسالة أطباق من فئة A+++',
            image: slide1 // Using slide1 as placeholder for appliances
        },
        {
            id: 2,
            title: 'تصميمات خشبية فاخرة',
            description: 'خزائن مطبخ مصنعة من أجود أنواع الأخشاب المقاومة للحرارة والرطوبة',
            image: slide2 // Using slide2 as placeholder for wood designs
        },
        {
            id: 3,
            title: 'إضاءة وتجهيزات مودرن',
            description: 'نظام إضاءة LED مخفي وتجهيزات صحية بتصاميم إيطالية فريدة',
            image: slide3 // Using slide3 as placeholder for lighting
        }
    ];

    return (
        <section className="py-16 sm:py-20 bg-gray-50 font-sans" dir="rtl">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
                        جوائز المسابقة الكبرى
                    </h2>
                    <p className="text-lg text-gray-600">
                        نقدم لك الأفضل لمنزلك العصري
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {prizes.map((prize) => (
                        <div
                            key={prize.id}
                            className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="relative h-48 sm:h-56 mb-6 overflow-hidden rounded-[1.5rem]">
                                <img
                                    src={prize.image}
                                    alt={prize.title}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="text-center px-2 pb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {prize.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {prize.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PrizesSection;
