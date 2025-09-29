import React, { useState, useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import GoalsPage from './pages/GoalsPage';
import GalleryPage from './pages/GalleryPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import LocationPage from './pages/LocationPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'goals':
        return <GoalsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'results':
        return <ResultsPage />;
      case 'location':
        return <LocationPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <MainLayout 
      currentPage={currentPage} 
      onNavigate={setCurrentPage}
      isMobile={isMobile}
    >
      {renderPage()}
    </MainLayout>
  );
};

export default App;