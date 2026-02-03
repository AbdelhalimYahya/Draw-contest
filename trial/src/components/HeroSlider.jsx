import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import slide1 from '../assets/header/1.jpg';
import slide2 from '../assets/header/2.jpg';
import slide3 from '../assets/header/3.jpg';
import { useAuth } from '../context/AuthContext';
import api from '../lib/axios';

const HeroSlider = () => {
    const { user } = useAuth();
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const slides = [
        {
            id: 1,
            title: 'مطبخ أحلامك في انتظارك',
            subtitle: 'اشترك الآن في سحب أم النور الكبير وأربح مطبخاً عصرياً متكاملاً بأحدث التقنيات العالمية',
            image: slide1
        },
        {
            id: 2,
            title: 'تصميم عصري وأنيق',
            subtitle: 'مطابخ فاخرة مصممة بأحدث الأساليب العالمية لتناسب ذوقك الرفيع وتلبي احتياجاتك',
            image: slide2
        },
        {
            id: 3,
            title: 'جودة استثنائية',
            subtitle: 'مطابخ بجودة عالمية وتقنيات حديثة تجعل من طبخك تجربة ممتعة ومريحة',
            image: slide3
        }
    ];

    const nextSlide = useCallback(() => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setTimeout(() => setIsAnimating(false), 600);
        }
    }, [isAnimating, slides.length]);

    const goToSlide = (index) => {
        if (!isAnimating && index !== currentSlide) {
            setIsAnimating(true);
            setCurrentSlide(index);
            setTimeout(() => setIsAnimating(false), 600);
        }
    };

    // Autoplay functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [nextSlide]);

    useEffect(() => {
        let cancelled = false;

        const fetchSubscriptionStatus = async () => {
            try {
                if (!user) {
                    setSubscriptionStatus(null);
                    return;
                }

                const response = await api.get('/api/v1/auth/profile');
                const userData = response.data?.user || response.data?.data || response.data;
                const status = userData?.subscription?.status || null;
                if (!cancelled) setSubscriptionStatus(status);
            } catch {
                if (!cancelled) setSubscriptionStatus(null);
            }
        };

        fetchSubscriptionStatus();

        return () => {
            cancelled = true;
        };
    }, [user]);

    return (
        <div className="relative w-full bg-[var(--color-bg-light)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Slider Container */}
                <div className="relative w-full h-[500px] sm:h-[600px] rounded-[3rem] overflow-hidden shadow-[var(--shadow-xl)]">
                    {/* Slides */}
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${index === currentSlide
                                ? 'opacity-100 translate-x-0 scale-100'
                                : index < currentSlide
                                    ? 'opacity-0 translate-x-full scale-95'
                                    : 'opacity-0 -translate-x-full scale-95'
                                }`}
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8">
                                {/* Title */}
                                <h1
                                    className={`text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 sm:mb-6 transition-all duration-700 delay-100 ${index === currentSlide
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                >
                                    {slide.title}
                                </h1>

                                {/* Subtitle */}
                                <p
                                    className={`text-base sm:text-lg lg:text-xl text-white max-w-3xl mb-8 sm:mb-10 leading-relaxed font-bold transition-all duration-700 delay-200 ${index === currentSlide
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                >
                                    {slide.subtitle}
                                </p>

                                {/* Buttons */}
                                <div
                                    className={`flex flex-col sm:flex-row gap-6 transition-all duration-700 delay-300 ${index === currentSlide
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                        }`}
                                >
                                    {/* Primary Button */}
                                    {user ? (
                                        (!user.isSubscribed && subscriptionStatus !== 'pending') ? (
                                        <Link
                                            to="/subscription"
                                            className="bg-[#00A8E8] hover:bg-[#0088BB] text-white font-black px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 min-w-[200px]"
                                        >
                                            <span>ادخل سجل علي السحب</span>
                                            <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                        ) : null
                                    ) : (
                                        <Link
                                            to="/signup"
                                            className="bg-[#00A8E8] hover:bg-[#0088BB] text-white font-black px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 min-w-[200px]"
                                        >
                                            <span>اكتسب معانا</span>
                                            <svg
                                                className="w-6 h-6 transform rotate-180"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                />
                                            </svg>
                                        </Link>
                                    )}

                                    {/* Secondary Button */}
                                    <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-black px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 border-2 border-white/30 hover:border-white/50 min-w-[200px]">
                                        شاهد الجوائز
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Dots */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-500 ease-in-out rounded-full shadow-lg ${index === currentSlide
                                    ? 'w-16 h-4 bg-[#00A8E8]'
                                    : 'w-4 h-4 bg-white/50 hover:bg-white hover:scale-125'
                                    }`}
                                aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Arrow Navigation */}
                    <button
                        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-10 hidden lg:block border border-white/20"
                        aria-label="الشريحة السابقة"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-10 hidden lg:block border border-white/20"
                        aria-label="الشريحة التالية"
                    >
                        <svg className="w-8 h-8 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
