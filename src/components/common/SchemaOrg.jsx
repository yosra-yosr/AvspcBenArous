import { useEffect } from 'react';

const SchemaOrg = ({ schema, id = 'schema-org' }) => {
  useEffect(() => {
    // Créer l'élément script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(schema);
    
    // L'ajouter au head
    document.head.appendChild(script);
    
    // Nettoyer quand le composant se démonte
    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [schema, id]);

  return null; // Ce composant ne rend rien visuellement
};

export default SchemaOrg;