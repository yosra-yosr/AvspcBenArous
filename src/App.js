import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import GoalsPage from './pages/GoalsPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import LocationPage from './pages/LocationPage';
import RegisterPage from './pages/RegisterPage';
import ResultDetailsPage from './pages/ResultDetailsPage';
import { initGA, logPageView } from './utils/analytics';

// Composant interne pour encapsuler la logique de suivi de l'emplacement (Location Listener)
// Il doit être un enfant de <Router> pour pouvoir utiliser useLocation().
const LocationListener = () => {
  const location = useLocation();

  useEffect(() => {
    // Logger chaque changement de page
    logPageView();
  }, [location]);

  // Ce composant ne fait que gérer les effets secondaires, il ne rend rien.
  return null;
};

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // La déclaration et l'utilisation de useLocation() ont été déplacées
  // dans le composant LocationListener ci-dessus.

  useEffect(() => {
    // Initialiser GA au montage du composant
    initGA();
  }, []);

  // Le useEffect pour logPageView a été déplacé dans LocationListener.

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <Router>
        {/*
          Injecter le LocationListener ici. Il est maintenant un enfant de <Router>
          et peut appeler useLocation() sans erreur.
        */}
        <LocationListener />

        <MainLayout isMobile={isMobile}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/goals" element={<GoalsPage />} />
            {/* <Route path="/gallery" element={<GalleryPage />} /> */}
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/result-details" element={<ResultDetailsPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </MainLayout>
      </Router>
  );
};

export default App;