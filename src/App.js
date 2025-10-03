import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import GoalsPage from './pages/GoalsPage';
import GalleryPage from './pages/GalleryPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import LocationPage from './pages/LocationPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <MainLayout isMobile={isMobile}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </HelmetProvider>
  );
};

export default App;