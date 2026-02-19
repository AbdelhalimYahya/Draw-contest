import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';
import api from './lib/axios';

import WinnerAnnouncement from './components/WinnerAnnouncement';

const CompetitionOver = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans" dir="rtl">
      <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-10 max-w-xl w-full mx-4 text-center">
        <h1 className="text-3xl font-black text-gray-900 mb-3">المسابقة انتهت</h1>
        <p className="text-gray-600 font-medium">شكراً لمشاركتكم. تابعونا في المسابقة القادمة.</p>
      </div>
    </div>
  );
};

function App() {
  const [siteActive, setSiteActive] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const fetchSiteStatus = async () => {
      try {
        const res = await api.get('/api/v1/dashboard/public-site-status');
        setSiteActive(Boolean(res.data?.isActive));
        if (res.data?.winner) {
          setWinner(res.data.winner);
        }
      } catch {
        // If the status endpoint fails, don't block the site.
        setSiteActive(true);
      }
    };

    fetchSiteStatus();
  }, []);

  if (siteActive === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans" dir="rtl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A8E8]"></div>
      </div>
    );
  }

  if (!siteActive) {
    if (winner) {
      return <WinnerAnnouncement winner={winner} />;
    }
    return <CompetitionOver />;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
