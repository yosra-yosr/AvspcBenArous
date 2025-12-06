// src/utils/analytics.js
import ReactGA from 'react-ga4';

// Remplacez par votre véritable ID de mesure depuis Google Analytics
const MEASUREMENT_ID = 'G-96GTSEBTT0'; // Remplacez par votre ID GA4

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100,
    },
    gtagOptions: {
      send_page_view: false, // On gère manuellement les page views
    },
  });
  
  console.log('✅ Google Analytics initialisé avec l\'ID:', MEASUREMENT_ID);
};

export const logPageView = () => {
  const page = window.location.pathname + window.location.search;
  ReactGA.send({ 
    hitType: 'pageview', 
    page: page
  });
  console.log('📄 Page view:', page);
};

export const logEvent = (category, action, label, value) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
    value: value
  });
  
  console.log('Événement tracké:', { category, action, label, value });
};

// Événements spécifiques pour votre application
export const trackDocumentsCTA = () => {
  logEvent(
    'User Interaction',
    'Click CTA Documents',
    'Alert Documents Button - Success Screen',
    1
  );
};

export const trackDownloadPDF = (userId) => {
  logEvent(
    'Document',
    'Download PDF',
    `Registration Form - ID: ${userId}`,
    1
  );
};

export const trackPhoneCall = () => {
  logEvent(
    'Contact',
    'Click Call Office',
    'Phone Button - Success Screen',
    1
  );
};

export const trackReturnHome = () => {
  logEvent(
    'Navigation',
    'Return to Home',
    'Success Screen',
    1
  );
};

export const trackFormSubmission = (formData) => {
  logEvent(
    'Registration',
    'Form Submitted',
    `User ID: ${formData?.idNumber || 'N/A'}`,
    1
  );
};

export const trackFormStep = (stepNumber, stepName) => {
  logEvent(
    'Registration',
    'Form Step Completed',
    `Step ${stepNumber}: ${stepName}`,
    stepNumber
  );
};

export const trackDownloadFicheInstructions = () => {
  if (window.gtag) {
    window.gtag('event', 'download_fiche_instructions', {
      event_category: 'engagement',
      event_label: 'fiche_instructions_download'
    });
  }
  // Log pour le développement
  console.log('Fiche instructions téléchargée');
};