import React from 'react';
import { Button, Typography } from 'antd';
import { UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HeroSection = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(26, 32, 44, 0.2) 0%, rgba(13, 17, 23, 0.9) 100%), url("assets/images/avspc_team.jpg") center/cover',
        backgroundAttachment: 'fixed',
        color: 'white',
        padding: '120px 40px 80px',
        textAlign: 'center',
        marginTop: '70px'
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Title
          level={1}
          style={{
            color: 'white',
            fontSize: 'clamp(1.9rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          مرحباً بكم في جمعية متطوعون في خدمة الحماية المدنية ببن عروس
        </Title>
        
        <Paragraph
          style={{
            color: 'white',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            opacity: 0.95,
            marginBottom: '40px',
            lineHeight: 1.8
          }}
        >
          نحن جمعية تطوعية تهدف إلى دعم ومساعدة الحماية المدنية في خدمة المجتمع
          <br />
          انضم إلينا لتكون جزءاً من فريق يحدث فرقاً حقيقياً في المجتمع
        </Paragraph>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            href="https://forms.office.com/r/0c9EtvtE4r"
            target="_blank"
            style={{
              background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
              border: 'none',
              height: 'auto',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            انضم كمتطوع
          </Button>
          <Button
            size="large"
            icon={<InfoCircleOutlined />}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)',
              height: 'auto',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            تعرف على أهدافنا
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;