import React from 'react';
import { Card, Typography } from 'antd';
import SchemaOrg from '../components/common/SchemaOrg';
import { getBreadcrumbSchema } from '../utils/schemas';
const { Title, Text } = Typography;

const GoalsPage = () => {
  const goals = [
    'دعم تكوين المتطوعين في ميادين الإسعاف والإطفاء والإنقاذ.',
    'معاضدة مجهود الحماية المدنية والتدخل السريع والناجع.',
    'التعريف بأنشطة وبرامج الحماية المدنية.',
    'نشر ثقافة التطوع للعموم وبخاصة لدى الشباب والطلبة.',
    'تنشئة الطفولة وفق المبادئ الأساسية للصحة والسلامة والوقاية.'
  ];
const breadcrumbs = [
    { name: "Accueil", url: "https://inscription-avspcbenarous.netlify.app" },
    { name: "Conditions d'inscription", url: "https://inscription-avspcbenarous.netlify.app/goals" }
  ];
  return (
    <div style={{ padding: '100px 20px 80px', maxWidth: '900px', margin: '0 auto' }}>
      <SchemaOrg schema={getBreadcrumbSchema(breadcrumbs)} id="goals-breadcrumb" />
      <Card
        style={{
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
        }}
        styles={{
          body: { padding: '40px' }
        }}
      >
        <Title level={2} style={{ textAlign: 'center', color: '#ff6b35', marginBottom: '40px' }}>
          🎯 أهداف الجمعية
        </Title>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {goals.map((goal, index) => (
            <div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <span style={{ color: '#10b981', fontSize: '1.5rem', marginTop: '2px' }}>✔️</span>
              <Text style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>{goal}</Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default GoalsPage;