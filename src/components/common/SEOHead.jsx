import { useEffect } from 'react';

const SEOHead = ({
 title = "جمعية متطوعي الحماية المدنية بن عروس | التسجيل في التطوع 2025",
  description = "انضم إلى جمعية متطوعي ومساعدي الحماية المدنية بن عروس. سجل الآن في دورة التطوع 2025 للتدريب على الإسعاف والإطفاء والإنقاذ",
  keywords = "الحماية المدنية, تطوع, بن عروس, تونس, إسعاف, إطفاء, إنقاذ, AVSPC, متطوعين",
  image = "https://inscription-avspcbenarous.netlify.app/assets/images/شعار.png",
  url = "https://inscription-avspcbenarous.netlify.app/",
}) => {
  
  useEffect(() => {
    // Mettre à jour le titre
    document.title = title;

    // Fonction pour mettre à jour ou créer une balise meta
    const setMetaTag = (property, content, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Mettre à jour le link canonical
    const setCanonical = (href) => {
      let element = document.querySelector('link[rel="canonical"]');
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    // Meta tags standards
    setMetaTag('description', description, false);
    setMetaTag('keywords', keywords, false);

    // Open Graph
    setMetaTag('og:title', title);
    setMetaTag('og:description', description);
    setMetaTag('og:image', image);
    setMetaTag('og:url', url);
    setMetaTag('og:type', 'website');

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image', false);
    setMetaTag('twitter:title', title, false);
    setMetaTag('twitter:description', description, false);
    setMetaTag('twitter:image', image, false);

    // Canonical URL
    setCanonical(url);

  }, [title, description, keywords, image, url]);

  return null; // Ce composant ne rend rien visuellement
};

export default SEOHead;