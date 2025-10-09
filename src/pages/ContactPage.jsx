import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { MailOutlined, PhoneOutlined, FacebookOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const contactCards = [
    {
      icon: <PhoneOutlined />,
      title: 'اتصل بنا',
      description: 'فريقنا متاح للرد على استفساراتكم',
      primary: '56 20 27 02',
      secondary: '90 76 93 62',
      prefix: '+216',
      link: 'tel:+21656202702'
    },
    {
      icon: <MailOutlined />,
      title: 'راسلنا',
      description: 'نرد على جميع الرسائل خلال 24 ساعة',
      primary: 'avspcbenarous2023',
      secondary: '@gmail.com',
      link: 'mailto:avspcbenarous2023@gmail.com'
    },
    {
      icon: <FacebookOutlined />,
      title: 'تابعنا',
      description: 'آخر الأخبار والفعاليات على صفحتنا',
      primary: 'AVSPCBNAROUS',
      secondary: 'على فيسبوك',
      link: 'https://www.facebook.com/AVSPCBNAROUS'
    }
  ];

  const infoSections = [
    {
      icon: <ClockCircleOutlined />,
      title: 'ساعات العمل',
      items: [
        { label: 'الأيام العادية', value: 'الاثنين - الجمعة: 8:00 - 18:00' },
        { label: 'نهاية الأسبوع', value: 'السبت: 9:00 - 14:00' },
        { label: 'خدمة الطوارئ', value: 'متاحة 24/7' }
      ]
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'موقعنا',
      items: [
        { label: 'العنوان', value: 'بن عروس، تونس' },
        { label: 'الرمز البريدي', value: '2013' },
        { label: 'المنطقة', value: 'ولاية بن عروس' }
      ],
      action: {
        text: 'عرض على الخريطة',
        link: 'https://maps.app.goo.gl/PqiA7zasEwRNsPk87'
      }
    }
  ];

  const styles = {
    heroSection: {
      background: 'white',
      padding: 'clamp(100px, 15vw, 140px) 20px clamp(50px, 8vw, 80px)',
      textAlign: 'center',
      borderBottom: '1px solid #f0f0f0'
    },
    heroTitle: {
      fontSize: 'clamp(2rem, 5vw, 3rem)',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '20px',
      letterSpacing: '-0.5px'
    },
    heroDescription: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      color: '#718096',
      lineHeight: '1.8',
      maxWidth: '600px',
      margin: '0 auto'
    },
    cardsSection: {
      padding: 'clamp(40px, 8vw, 80px) 20px',
      maxWidth: '1100px',
      margin: '0 auto'
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
      gap: 'clamp(20px, 3vw, 30px)'
    },
    card: {
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: 'clamp(24px, 4vw, 40px) clamp(20px, 3vw, 30px)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'all 0.3s ease',
      display: 'block'
    },
    cardIcon: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      color: '#ff6b35',
      marginBottom: 'clamp(16px, 3vw, 24px)'
    },
    cardTitle: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '12px'
    },
    cardDescription: {
      fontSize: 'clamp(0.9rem, 2vw, 0.95rem)',
      color: '#718096',
      marginBottom: 'clamp(16px, 3vw, 24px)',
      lineHeight: '1.6'
    },
    cardContact: {
      padding: 'clamp(12px, 2vw, 16px)',
      background: '#f7fafc',
      borderRadius: '12px',
      textAlign: 'center'
    },
    infoSection: {
      padding: 'clamp(40px, 8vw, 80px) 20px',
      background: 'white',
      borderTop: '1px solid #f0f0f0'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
      gap: 'clamp(24px, 4vw, 40px)'
    },
    infoCardBody: {
      padding: 'clamp(24px, 4vw, 40px)'
    },
    infoTitle: {
      fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)',
      fontWeight: '700',
      color: '#1a202c',
      margin: 0
    },
    infoItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      gap: '12px',
      paddingBottom: '20px',
      flexWrap: 'wrap'
    },
    infoLabel: {
      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
      color: '#718096',
      fontWeight: '500',
      minWidth: 'fit-content'
    },
    infoValue: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: '#2d3748',
      fontWeight: '600',
      textAlign: 'left',
      flex: '1',
      minWidth: '50%'
    },
    ctaSection: {
      padding: 'clamp(40px, 8vw, 80px) 20px',
      textAlign: 'center',
      background: '#f7fafc'
    },
    ctaTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: '700',
      color: '#1a202c',
      marginBottom: '16px'
    },
    ctaDescription: {
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
      color: '#718096',
      marginBottom: '32px',
      lineHeight: '1.7'
    },
    ctaButtons: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    button: {
      padding: 'clamp(12px, 2vw, 14px) clamp(24px, 4vw, 32px)',
      borderRadius: '10px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      transition: 'all 0.3s ease',
      display: 'inline-block',
      whiteSpace: 'nowrap'
    }
  };

  return (
    <div style={{
      fontFamily: 'Cairo, sans-serif',
      background: '#fafafa',
      minHeight: '100vh',
      direction: 'rtl'
    }}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease'
        }}>
          <h1 style={styles.heroTitle}>
            تواصل معنا
          </h1>
          <p style={styles.heroDescription}>
            نحن هنا للإجابة على جميع استفساراتك ومساعدتك في الانضمام إلى عائلة المتطوعين
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={styles.cardsSection}>
        <div style={styles.cardsGrid}>
          {contactCards.map((card, index) => (
            <a
              key={index}
              href={card.link}
              target={card.link.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ff6b35';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={styles.cardIcon}>
                {card.icon}
              </div>
              
              <h3 style={styles.cardTitle}>
                {card.title}
              </h3>
              
              <p style={styles.cardDescription}>
                {card.description}
              </p>

              <div style={styles.cardContact}>
                <div style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  fontWeight: '600',
                  color: '#2d3748',
                  direction: card.icon.type === PhoneOutlined ? 'ltr' : 'rtl',
                  wordBreak: 'break-word'
                }}>
                  {card.prefix && <span style={{ opacity: 0.6 }}>{card.prefix} </span>}
                  {card.primary}
                </div>
                {card.secondary && (
                  <div style={{
                    fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                    color: '#718096',
                    marginTop: '4px',
                    direction: card.icon.type === PhoneOutlined ? 'ltr' : 'rtl',
                    wordBreak: 'break-word'
                  }}>
                    {card.icon.type === PhoneOutlined && card.prefix && <span style={{ opacity: 0.6 }}>{card.prefix} </span>}
                    {card.secondary}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Information Section */}
      <section style={styles.infoSection}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 60px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.2rem)',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '12px'
            }}>
              معلومات إضافية
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
              color: '#718096'
            }}>
              كل ما تحتاج معرفته للتواصل معنا
            </p>
          </div>

          <div style={styles.infoGrid}>
            {infoSections.map((section, index) => (
              <Card
                key={index}
                style={{
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'none'
                }}
                styles={{
                  body: styles.infoCardBody
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: 'clamp(24px, 4vw, 32px)',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    fontSize: 'clamp(1.8rem, 3vw, 2rem)',
                    color: '#ff6b35'
                  }}>
                    {section.icon}
                  </div>
                  <h3 style={styles.infoTitle}>
                    {section.title}
                  </h3>
                </div>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px'
                }}>
                  {section.items.map((item, i) => (
                    <div key={i} style={{
                      ...styles.infoItem,
                      borderBottom: i < section.items.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}>
                      <span style={styles.infoLabel}>
                        {item.label}
                      </span>
                      <span style={styles.infoValue}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {section.action && (
                  <a
                    href={section.action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...styles.button,
                      display: 'block',
                      marginTop: 'clamp(24px, 4vw, 32px)',
                      background: '#ff6b35',
                      color: 'white',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#ff5722';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ff6b35';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {section.action.text}
                  </a>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={styles.ctaSection}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h2 style={styles.ctaTitle}>
            جاهزون لمساعدتك
          </h2>
          <p style={styles.ctaDescription}>
            فريقنا متواجد للرد على استفساراتك ومساعدتك في أي وقت
          </p>
          <div style={styles.ctaButtons}>
            <a
              href="tel:+21656202702"
              style={{
                ...styles.button,
                background: '#ff6b35',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#ff5722';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ff6b35';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              اتصل الآن
            </a>
            <a
              href="https://www.facebook.com/AVSPCBNAROUS"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...styles.button,
                background: 'white',
                color: '#2d3748',
                border: '2px solid #e2e8f0'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#ff6b35';
                e.target.style.color = '#ff6b35';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.color = '#2d3748';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              صفحة فيسبوك
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;