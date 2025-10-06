export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "name": "Association des Volontaires de service de la Protection Civile - Benarous",
  "alternateName": "AVSPC Benarous",
  "url": "https://inscription-avspcbenarous.netlify.app/",
  "description": "Association pour le recrutement et la formation des volontaires de la Protection Civile en Tunisie",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Benarous",
    "addressRegion": "Ben Arous",
    "addressCountry": "TN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+216 56 202 702",
    "contactType": "Inscription et Résultat",
    "availableLanguage": ["Arabic"]
  },
  "sameAs": [
    "https://www.facebook.com/AVSPCBNAROUS"
  ]
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AVSPC Benarous - Inscription Volontaires Protection Civile",
  "url": "https://inscription-avspcbenarous.netlify.app/",
  "description": "Plateforme d'inscription au concours de volontaire de la Protection Civile",
  "publisher": {
    "@type": "Organization",
    "name": "AVSPC Benarous"
  }
});

export const getEventSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Concours de Recrutement - Volontaires Protection Civile",
  "description": "Concours de recrutement des volontaires de la Protection Civile - Session 2025",
  "startDate": "2025-11-01",
  "endDate": "2025-11-30",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Centre de Formation Protection Civile",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Benarous",
      "addressRegion": "Ben Arous",
      "addressCountry": "TN"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "AVSPC Benarous",
    "url": "https://inscription-avspcbenarous.netlify.app/"
  }
});

export const getRegisterActionSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Inscription au Concours",
  "url": "https://inscription-avspcbenarous.netlify.app/register",
  "description": "Formulaire d'inscription au concours de volontaire de la Protection Civile",
  "potentialAction": {
    "@type": "RegisterAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://inscription-avspcbenarous.netlify.app/register"
    }
  }
});

export const getContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Nous Contacter",
  "url": "https://inscription-avspcbenarous.netlify.app/contact",
  "description": "Contactez-nous pour toute question concernant le concours de volontaire"
});

export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});