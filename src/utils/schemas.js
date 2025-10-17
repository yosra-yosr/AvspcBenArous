// src/utils/schema.js

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "name": "جمعية متطوعي ومساعدي الحماية المدنية بن عروس",
  "alternateName": "AVSPC Benarous",
  "url": "https://inscription-avspcbenarous.netlify.app/",
  "description": "جمعية لتسجيل وتدريب متطوعي الحماية المدنية في بن عروس",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "بن عروس",
    "addressLocality": "بن عروس",
    "addressRegion": "ولاية بن عروس",
    "addressCountry": "TN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+216 56 202 702",
    "contactType": "التسجيل والنتائج",
    "availableLanguage": ["ar", "Arabic"],
    "areaServed": "TN"
  },
  "sameAs": [
    "https://www.facebook.com/AVSPCBNAROUS"
  ],
  "founder": {
    "@type": "Organization",
    "name": "الحماية المدنية التونسية"
  }
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "جمعية متطوعي الحماية المدنية بن عروس - التسجيل في التطوع",
  "alternateName": "AVSPC Benarous",
  "url": "https://inscription-avspcbenarous.netlify.app/",
  "description": "منصة التسجيل في التطوع بجمعية الحماية المدنية بن عروس",
  "inLanguage": "ar",
  "publisher": {
    "@type": "Organization",
    "name": "جمعية متطوعي الحماية المدنية بن عروس"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://inscription-avspcbenarous.netlify.app/results?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

export const getEventSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "دورة تسجيل متطوعي الحماية المدنية",
  "description": "دورة تسجيل المتطوعين في جمعية الحماية المدنية بن عروس - دورة 2025",
  "startDate": "2025-11-01",
  "endDate": "2025-11-30",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "inLanguage": "ar",
  "location": {
    "@type": "Place",
    "name": "الإدارة الجهوية للحماية المدنية بئر القصعة",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "بن عروس",
      "addressLocality": "بن عروس",
      "addressRegion": "ولاية بن عروس",
      "addressCountry": "TN"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "جمعية متطوعون في خدمة الحماية المدنية ببن عروس",
    "url": "https://inscription-avspcbenarous.netlify.app/"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "TND",
    "availability": "https://schema.org/InStock",
    "url": "https://inscription-avspcbenarous.netlify.app/register"
  }
});

export const getRegisterActionSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "التسجيل في التطوع",
  "url": "https://inscription-avspcbenarous.netlify.app/register",
  "description": "استمارة التسجيل في التطوع بجمعية متطوعون في خدمة الحماية المدنية بن عروس",
  "inLanguage": "ar",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://inscription-avspcbenarous.netlify.app/"
  },
  "potentialAction": {
    "@type": "RegisterAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://inscription-avspcbenarous.netlify.app/register",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": {
      "@type": "Thing",
      "name": "تأكيد التسجيل في التطوع"
    }
  }
});

export const getContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "اتصل بنا",
  "url": "https://inscription-avspcbenarous.netlify.app/contact",
  "description": "اتصل بنا لأي استفسار حول التسجيل في التطوع",
  "inLanguage": "ar",
  "mainEntity": {
    "@type": "Organization",
    "name": "جمعية متطوعون في خدمة الحماية المدنية ببن عروس",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+216 56 202 702",
      "contactType": "خدمة العملاء",
      "availableLanguage": ["ar", "Arabic"],
      "areaServed": "TN"
    }
  }
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

// Schema pour la page d'accueil
export const getHomePageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "الصفحة الرئيسية - جمعية متطوعي الحماية المدنية",
  "url": "https://inscription-avspcbenarous.netlify.app/",
  "description": "بوابة متطوع - جمعية متطوعون في خدمة الحماية المدنية بن عروس - التسجيل في دورة التطوع",
  "inLanguage": "ar",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://inscription-avspcbenarous.netlify.app/"
  }
});

// Schema pour la page des résultats
export const getResultsPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "النتائج - دورة التطوع بالحماية المدنية",
  "url": "https://inscription-avspcbenarous.netlify.app/results",
  "description": "نتائج دورة تسجيل متطوعي الحماية المدنية",
  "inLanguage": "ar",
  "isPartOf": {
    "@type": "WebSite",
    "url": "https://inscription-avspcbenarous.netlify.app/"
  }
});

// Schema pour la page de galerie
export const getGalleryPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "معرض الصور - جمعية الحماية المدنية",
  "url": "https://inscription-avspcbenarous.netlify.app/gallery",
  "description": "معرض صور أنشطة وفعاليات جمعية متطوعي الحماية المدنية بن عروس",
  "inLanguage": "ar"
});

// Schema pour la page des objectifs
export const getGoalsPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "أهدافنا - جمعية الحماية المدنية",
  "url": "https://inscription-avspcbenarous.netlify.app/goals",
  "description": "أهداف ورؤية جمعية متطوعي الحماية المدنية بن عروس",
  "inLanguage": "ar"
});

// FAQ Schema
export const getFAQSchema = (faqItems) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
});