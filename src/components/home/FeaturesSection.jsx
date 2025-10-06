import React from 'react';
import { Row, Col, Typography } from 'antd';
import { StarOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';
// Assurez-vous que FeatureCard supporte l'application de style à l'icône/carte
import FeatureCard from '../common/FeatureCard'; 

const { Title, Paragraph } = Typography;
// Définition de la couleur d'accent (similaire au CTA du Hero)
const ACCENT_COLOR = 'white'; 

const FeaturesSection = () => {
  const features = [
    {
      // Style de l'icône mis à jour avec la couleur d'accent
      icon: <StarOutlined style={{ fontSize: '2.5rem', color: ACCENT_COLOR }} />, 
      title: 'التدريب والتكوين',
      description: 'برامج تدريبية متخصصة في مجالات الإسعافات الأولية، الإطفاء، والإنقاذ لإعداد متطوعين مؤهلين'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '2.5rem', color: ACCENT_COLOR }} />,
      title: 'التدخل السريع',
      description: 'فرق مدربة للتدخل السريع في حالات الطوارئ ومساعدة الحماية المدنية في مهامها'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '2.5rem', color: ACCENT_COLOR }} />,
      title: 'خدمة المجتمع',
      description: 'أنشطة تطوعية متنوعة تهدف إلى خدمة المجتمع ونشر ثقافة التطوع بين الشباب'
    }
  ];

  return (
    <div 
      style={{ 
        padding: '80px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        // Ajout d'un fond très subtil pour la distinction (optionnel)
        background: '#f8f9fa' 
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Title 
          level={2} 
          style={{ 
            fontSize: '2.5rem', 
            marginBottom: '15px',
            color: '#1a202c' // Titre sombre pour contraste avec le fond clair
          }}
        >
          ما نقدمه
        </Title>
        <Paragraph 
          style={{ 
            fontSize: '1.2rem', 
            // Couleur grise plus foncée pour une meilleure lisibilité
            color: '#4a5568' 
          }}
        >
          خدمات ومهام متنوعة في خدمة المجتمع والحماية المدنية
        </Paragraph>
      </div>

      <Row gutter={[30, 30]}>
        {features.map((feature, index) => (
          <Col xs={24} md={8} key={index}>
            {/* Assurez-vous que FeatureCard utilise les couleurs d'accent pour la bordure ou l'ombre */}
            <FeatureCard {...feature} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturesSection;