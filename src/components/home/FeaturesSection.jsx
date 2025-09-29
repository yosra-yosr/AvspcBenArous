import React from 'react';
import { Row, Col, Typography } from 'antd';
import { StarOutlined, SafetyOutlined, TeamOutlined } from '@ant-design/icons';
import FeatureCard from '../common/FeatureCard';

const { Title, Paragraph } = Typography;

const FeaturesSection = () => {
  const features = [
    {
      icon: <StarOutlined style={{ fontSize: '2rem' }} />,
      title: 'التدريب والتكوين',
      description: 'برامج تدريبية متخصصة في مجالات الإسعافات الأولية، الإطفاء، والإنقاذ لإعداد متطوعين مؤهلين'
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '2rem' }} />,
      title: 'التدخل السريع',
      description: 'فرق مدربة للتدخل السريع في حالات الطوارئ ومساعدة الحماية المدنية في مهامها'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '2rem' }} />,
      title: 'خدمة المجتمع',
      description: 'أنشطة تطوعية متنوعة تهدف إلى خدمة المجتمع ونشر ثقافة التطوع بين الشباب'
    }
  ];

  return (
    <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Title level={2} style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
          ما نقدمه
        </Title>
        <Paragraph style={{ fontSize: '1.2rem', color: '#4a5568' }}>
          خدمات ومهام متنوعة في خدمة المجتمع والحماية المدنية
        </Paragraph>
      </div>

      <Row gutter={[30, 30]}>
        {features.map((feature, index) => (
          <Col xs={24} md={8} key={index}>
            <FeatureCard {...feature} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturesSection;