import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card
      hoverable
      style={{
        textAlign: 'center',
        height: '100%',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease'
      }}
      styles={{
        body: { padding: '30px' }
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          margin: '0 auto 25px',
          background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
          color: 'white',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)'
        }}
      >
        {icon}
      </div>
      <Title level={3} style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
        {title}
      </Title>
      <Paragraph style={{ color: '#4a5568', lineHeight: 1.7 }}>
        {description}
      </Paragraph>
    </Card>
  );
};

export default FeatureCard;