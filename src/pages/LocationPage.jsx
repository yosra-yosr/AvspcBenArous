import { useState, useEffect } from 'react';
import { LinkOutlined, CompassOutlined, ClockCircleOutlined, PhoneOutlined, CarOutlined } from '@ant-design/icons';
import SchemaOrg from '../components/common/SchemaOrg';
import { getBreadcrumbSchema } from '../utils/schemas';
const LocationPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const actionCards = [
    {
      icon: <LinkOutlined />,
      title: 'فتح في خرائط جوجل',
      description: 'اضغط هنا لفتح الموقع في تطبيق خرائط جوجل للحصول على تفاصيل أكثر دقة',
      link: 'https://maps.app.goo.gl/PqiA7zasEwRNsPk87'
    },
    {
      icon: <CompassOutlined />,
      title: 'الحصول على الاتجاهات',
      description: 'احصل على أفضل مسار للوصول إلى موقعنا من مكانك الحالي',
      link: 'https://www.google.com/maps/dir//36.744444,10.194444'
    }
  ];

  const infoCards = [
    {
      icon: <ClockCircleOutlined />,
      title: 'أوقات العمل',
      description: 'مفتوح يومياً من الساعة 8:00 صباحاً حتى 6:00 مساءً، ومتاحون للطوارئ على مدار الساعة'
    },
    {
      icon: <PhoneOutlined />,
      title: 'للاتصال بنا',
      description: (
        <div style={{ lineHeight: '2' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>هاتف:</strong> <a href="tel:+21671456123" dir="ltr" className="phone-number">+216 56 202 702</a>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>الفاكس:</strong> <a href="tel:+21690769362" dir="ltr" className="phone-number">+216 90 769 362</a>
          </div>
          <div>
            <strong>البريد الإلكتروني:</strong> avspcbenarous2023@gmail.com
          </div>
        </div>
      )
    },
    {
      icon: <CarOutlined />,
      title: 'وسائل المواصلات',
      description: 'يمكن الوصول إلينا بسهولة عبر الحافلات العمومية والمترو، وتتوفر مواقف سيارات مجانية'
    }
  ];

   const breadcrumbs = [
    { name: "Accueil", url: "https://inscription-avspcbenarous.netlify.app" },
    { name: "Localisation", url: "https://inscription-avspcbenarous.netlify.app/location" }
  ];

  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": "Centre AVSPC Bénarous",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Benarous",
      "addressRegion": "Ben Arous",
      "addressCountry": "TN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.7446",
      "longitude": "10.2306"
    }
  };
  return (
    <div style={{
      fontFamily: 'Cairo, sans-serif',
      background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
      minHeight: '100vh',
      direction: 'rtl',
      padding: '20px'
    }}>
      <SchemaOrg schema={locationSchema} id="location-schema" />
      <SchemaOrg schema={getBreadcrumbSchema(breadcrumbs)} id="location-breadcrumb" />
      
      <section style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        margin: '40px auto',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1200px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}>
        {/* Top border gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #ff6b35, #ff8c42)'
        }} />

        {/* Section Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '15px'
          }}>
            موقعنا الجغرافي
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#4a5568',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            نحن متواجدون في قلب المدينة لخدمتكم على أفضل وجه
          </p>
        </div>

        {/* Map Container */}
        <div style={{
          position: 'relative',
          height: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
          marginBottom: '40px'
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.8234567890123!2d10.194444!3d36.744444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzYuNzQ0NDQ0LCAxMC4xOTQ0NDQ!5e0!3m2!1sfr!2stn!4v1234567890123!5m2!1sfr!2stn"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '12px'
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="موقعنا الجغرافي"
          />
        </div>

        {/* Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px',
          marginTop: '40px'
        }}>
          {actionCards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '25px',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                textDecoration: 'none',
                color: 'inherit',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.borderColor = '#ff6b35';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                color: '#ff6b35',
                marginBottom: '20px'
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '15px'
              }}>
                {card.title}
              </h3>
              <p style={{
                color: '#4a5568',
                lineHeight: '1.6',
                fontSize: '0.95rem',
                margin: 0
              }}>
                {card.description}
              </p>
            </a>
          ))}
        </div>

        {/* Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginTop: '50px'
        }}>
          {infoCards.map((card, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '30px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.borderColor = '#ff6b35';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 25px',
                background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                color: 'white',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
              }}>
                {card.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                {card.title}
              </h3>
              <div style={{
                color: '#4a5568',
                lineHeight: '1.7',
                fontSize: '1rem',
                textAlign: 'center'
              }}>
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LocationPage;