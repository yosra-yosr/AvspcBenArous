import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
// import StatsSection from '../components/home/StatsSection';
// Nouveaux composants à créer :
import TestimonialsSection from '../components/home/TestimonialsSection'; // Témoignages
import CallToActionSection from '../components/home/CallToActionSection'; // CTA Final

import SchemaOrg from '../components/common/SchemaOrg';
import { getOrganizationSchema, getWebsiteSchema, getEventSchema } from '../utils/schemas';

const HomePage = () => {
  return (
    // Utiliser un fragment ou une div englobante sans style pour le contenu principal
    <>
      {/* 1. Optimisation du SEO (déjà bien fait) */}
      <SchemaOrg schema={getOrganizationSchema()} />
      <SchemaOrg schema={getWebsiteSchema()} />
      <SchemaOrg schema={getEventSchema()} />
      
      <main> 
        {/* 2. Héro Section (Le plus important : bien optimisé et mis en valeur) */}
        <HeroSection />
        
        {/* 3. Stats Section (Déplacé plus haut pour un impact immédiat après le Hero) */}
        {/* <StatsSection /> */}
        
        {/* 4. Features Section (Présentation des activités) */}
        <FeaturesSection />
        
        {/* 5. Témoignages (Preuve Sociale pour renforcer la crédibilité) */}
        <TestimonialsSection /> 
        
        {/* 6. Appel à l'Action Final (Ne jamais laisser l'utilisateur sans prochaine étape) */}
        <CallToActionSection />
      </main>
      
      {/* Ignorer tout espace vide : Le balisage HTML de React est naturellement compact. 
      L'optimisation des marges et du padding doit se faire dans les composants individuels. */}
    </>
  );
};

export default HomePage;