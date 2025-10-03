import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatsSection from '../components/home/StatsSection';
import SchemaOrg from '../components/common/SchemaOrg';
import { getOrganizationSchema, getWebsiteSchema, getEventSchema } from '../utils/schemas';
const HomePage = () => {
  return (
    <>
      <SchemaOrg schema={getOrganizationSchema()} />
      <SchemaOrg schema={getWebsiteSchema()} />
      <SchemaOrg schema={getEventSchema()} />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </>
  );
};

export default HomePage;