import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const GalleryPage = () => {
  return (
    <div style={{ padding: '100px 20px 80px', maxWidth: '900px', margin: '0 auto' }}>
      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          textAlign: 'center'
        }}
        styles={{
          body: { padding: '60px 40px' }
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📷</div>
        <Title level={2} style={{ color: '#ff6b35' }}>معرض الصور والفيديو</Title>
        <Paragraph style={{ fontSize: '1.1rem', color: '#4a5568', marginTop: '20px' }}>
          محتوى هذه الصفحة قيد التطوير
        </Paragraph>
      </Card>
    </div>
  );
};

export default GalleryPage;