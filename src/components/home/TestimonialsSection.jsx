import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
// import { QuoteUpOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const ACCENT_COLOR = '#ff6b35'; 

// Composant de carte de témoignage pour réutilisation
const TestimonialCard = ({ quote, name, role }) => (
  <Card
    bordered={false}
    style={{
      textAlign: 'center',
      padding: '20px',
      height: '100%',
      borderRadius: '10px',
      // Ombre légère pour effet de flottement
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)', 
      background: 'white',
      borderTop: `4px solid ${ACCENT_COLOR}`, // Petite touche de couleur d'accent
    }}
  >
    {/* <QuoteUpOutlined style={{ fontSize: '2rem', color: ACCENT_COLOR, marginBottom: '15px' }} /> */}
    <Paragraph style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#4a5568', lineHeight: 1.6 }}>
      "{quote}"
    </Paragraph>
    <div style={{ marginTop: '20px' }}>
      <Paragraph strong style={{ margin: 0, color: '#1a202c' }}>
        {name}
      </Paragraph>
      <small style={{ color: ACCENT_COLOR }}>
        {role}
      </small>
    </div>
  </Card>
);

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: 'لقد اكتسبت مهارات لم أكن أتخيلها في الإسعافات الأولية. الشعور بأنك قادر على المساعدة في الأزمات لا يُضاهى.',
      name: 'فلان فولاني',
      role: 'متطوع منذ سنتين'
    },
    {
      quote: 'العمل مع فريق الحماية المدنية يمنحني إحساساً عميقاً بالمسؤولية المجتمعية والانتماء. بيئة داعمة ومحفزة.',
      name: 'فاطمة الزهراء',
      role: 'متطوعة ومسعفة'
    },
    {
      quote: 'منقذ الغد ليس مجرد شعار، بل هو هدف نعيشه كل يوم. التدريب كان احترافياً للغاية وأعدني لكل السيناريوهات.',
      name: 'فلان بن فلان',
      role: 'قائد فريق إنقاذ'
    }
  ];

  return (
    <div 
      style={{ 
        padding: '80px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        // Fond légèrement grisé pour séparer visuellement des autres sections
        background: '#f8f9fa' 
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Title 
          level={2} 
          style={{ 
            fontSize: '2.5rem', 
            marginBottom: '15px',
            color: '#1a202c'
          }}
        >
          آراء متطوعينا
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', color: '#4a5568' }}>
          اسمع من الذين يعيشون التجربة
        </Paragraph>
      </div>

      <Row gutter={[30, 30]}>
        {testimonials.map((testimonial, index) => (
          <Col xs={24} md={8} key={index}>
            <TestimonialCard {...testimonial} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TestimonialsSection;