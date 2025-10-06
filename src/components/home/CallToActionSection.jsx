import React from 'react';
import { Button, Typography } from 'antd';
import { UserAddOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const ACCENT_COLOR = '#ff6b35'; 

const CallToActionSection = () => {
  return (
    <div
      style={{
        // Fond sombre pour le contraste et l'impact
        background: '#1a202c', 
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Title
          level={2}
          style={{
            color: 'white',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '15px',
          }}
        >
          خطوتك الأولى نحو إنقاذ الأرواح
        </Title>
        <Paragraph
          style={{
            fontSize: '1.2rem',
            color: '#a0aec0',
            marginBottom: '30px',
          }}
        >
          انضم إلينا اليوم وكن جزءاً من فريقنا في بن عروس.
        </Paragraph>

        <Link to="/register">
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            style={{
              // Utilisation du dégradé vif pour l'harmonisation avec le Hero CTA
              background: `linear-gradient(45deg, ${ACCENT_COLOR}, #ff8c42)`,
              border: 'none',
              height: 'auto',
              padding: '18px 40px',
              fontSize: '18px',
              fontWeight: 700,
              borderRadius: '8px',
              boxShadow: '0 8px 20px rgba(255, 76, 26, 0.6)', // Ombre très visible
              transition: 'all 0.3s ease',
            }}
          >
            سجل الآن وابدأ رحلتك
            <ArrowRightOutlined style={{ marginRight: '10px' }} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CallToActionSection;