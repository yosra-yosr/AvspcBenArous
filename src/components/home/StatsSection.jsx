import React from 'react';
import { Row, Col, Typography } from 'antd';
import StatCard from '../common/StatCard';

const { Title, Paragraph } = Typography;
const ACCENT_COLOR = '#ff6b35'; 

const StatsSection = () => {
  const stats = [
    // Le StatCard devrait utiliser ACCENT_COLOR pour la valeur
    { value: 200, suffix: '+', title: 'متطوع نشط' },
    { value: 50, suffix: '+', title: 'عملية إنقاذ' },
    { value: 100, suffix: '+', title: 'دورة تدريبية' },
    { value: 5, suffix: '', title: 'سنوات خبرة' }
  ];

  return (
    <div 
      style={{ 
        padding: '80px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        // Utilisation d'un fond blanc pour séparer visuellement de la section Features
        background: 'white' 
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Title 
          level={2} 
          style={{ 
            fontSize: '2.5rem', 
            marginBottom: '15px',
            // Option : Mettre le titre en couleur d'accent pour varier
            color: ACCENT_COLOR 
          }}
        >
          أرقامنا تتحدث
        </Title>
        <Paragraph 
          style={{ 
            fontSize: '1.2rem', 
            color: '#4a5568' 
          }}
        >
          إنجازات وأرقام تعكس تأثيرنا الإيجابي في المجتمع
        </Paragraph>
      </div>

      <Row gutter={[30, 30]} justify="center">
        {stats.map((stat, index) => (
          <Col xs={12} sm={12} md={6} key={index}>
            {/* Ici, vous devrez vous assurer que le composant StatCard.jsx utilise la couleur 
              d'accent (ACCENT_COLOR) pour le texte de 'value' pour l'harmonisation.
            */}
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default StatsSection;