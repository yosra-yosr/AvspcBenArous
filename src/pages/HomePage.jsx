import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
// import TestimonialsSection from '../components/home/TestimonialsSection';
import CallToActionSection from '../components/home/CallToActionSection';
import SchemaOrg from '../components/common/SchemaOrg';
import { getOrganizationSchema, getWebsiteSchema, getEventSchema } from '../utils/schemas';
import SEOHead from '../components/common/SEOHead';

const HomePage = () => {
  return (
    <>
      {/* SEO Helmet pour la page d'accueil */}
      <SEOHead
        title="جمعية متطوعي الحماية المدنية بن عروس | التسجيل في التطوع 2025"
        description="انضم إلى جمعية متطوعي ومساعدي الحماية المدنية بن عروس. سجل الآن في دورة التطوع 2025 للتدريب على الإسعاف والإطفاء والإنقاذ. خدمة المجتمع التونسي"
        keywords="الحماية المدنية, تطوع, بن عروس, تونس, إسعاف, إطفاء, إنقاذ, AVSPC, متطوعين, تسجيل"
        image = "https://inscription-avspcbenarous.netlify.app/assets/images/شعار.png"
        url="https://inscription-avspcbenarous.netlify.app/"
      />

      {/* Schema.org pour le SEO */}
      <SchemaOrg schema={getOrganizationSchema()} />
      <SchemaOrg schema={getWebsiteSchema()} />
      <SchemaOrg schema={getEventSchema()} />
      
      <main> 
        <HeroSection />
        <FeaturesSection />
        {/* <TestimonialsSection />  */}
        <CallToActionSection />
      </main>
    </>
  );
};

export default HomePage;