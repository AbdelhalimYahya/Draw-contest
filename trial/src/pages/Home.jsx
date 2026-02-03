import React from 'react';
import Navbar from '../components/NavBar';
import HeroSlider from '../components/HeroSlider';
import PrizesSection from '../components/PrizesSection';
import EntryConditions from '../components/EntryConditions';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
            <Navbar />
            <HeroSlider />
            <PrizesSection />
            <EntryConditions />
            <Footer />
        </div>
    );
};

export default Home;
