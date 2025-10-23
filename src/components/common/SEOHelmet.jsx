import { Helmet } from 'react-helmet-async';

const SEOHelmet = ({
  title = "جمعية متطوعي الحماية المدنية بن عروس | التسجيل في التطوع 2025",
  description = "انضم إلى جمعية متطوعي ومساعدي الحماية المدنية بن عروس. سجل الآن في دورة التطوع 2025 للتدريب على الإسعاف والإطفاء والإنقاذ",
  keywords = "الحماية المدنية, تطوع, بن عروس, تونس, إسعاف, إطفاء, إنقاذ, AVSPC, متطوعين",
  image = "https://inscription-avspcbenarous.netlify.app/assets/images/شعار.png",
  url = "https://inscription-avspcbenarous.netlify.app/",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Balises de base */}
      <html lang="ar" dir="rtl" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="ar_TN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHelmet;