import { useState } from 'react';
import { Card, Typography } from 'antd';
import { 
  MedicineBoxOutlined,
  FireOutlined,
  SafetyOutlined,
  TeamOutlined,
  SmileOutlined
} from '@ant-design/icons';
import SEOHead from '../components/common/SEOHead';

const { Title, Text } = Typography;

const GoalsPage = () => {
  const [expandedGoal, setExpandedGoal] = useState(null);

  const goals = [
    {
      id: 1,
      text: 'دعم تكوين المتطوعين في ميادين الإسعاف والإطفاء والإنقاذ.',
      icon: <MedicineBoxOutlined />,
      color: '#ff6b35',
      activities: []
    },
    {
      id: 2,
      text: 'معاضدة مجهود الحماية المدنية والتدخل السريع والناجع.',
      icon: <SafetyOutlined />,
      color: '#e74c3c',
      activities: []
    },
    {
      id: 3,
      text: 'التعريف بأنشطة وبرامج الحماية المدنية.',
      icon: <FireOutlined />,
      color: '#3498db',
      activities: []
    },
    {
      id: 4,
      text: 'نشر ثقافة التطوع للعموم.',
      icon: <TeamOutlined />,
      color: '#9b59b6',
      activities: []
    },
    {
      id: 5,
      text: 'تنشئة الطفولة وفق المبادئ الأساسية للصحة والسلامة والوقاية.',
      icon: <SmileOutlined />,
      color: '#10b981',
      activities: []
    }
  ];

  const toggleGoal = (goalId) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
  };

  return (
    <>
      {/* SEO pour la page des objectifs */}
      <SEOHead
        title="أهداف الجمعية | جمعية متطوعي الحماية المدنية بن عروس"
        description="تعرف على أهداف جمعية متطوعي الحماية المدنية بن عروس: دعم التكوين في الإسعاف والإطفاء والإنقاذ، نشر ثقافة التطوع، تنشئة الأطفال على السلامة"
        keywords="أهداف الجمعية, تكوين متطوعين, إسعاف, إطفاء, إنقاذ, تطوع, الحماية المدنية"
        image="https://inscription-avspcbenarous.netlify.app/assets/images/شعار.png"
        url="https://inscription-avspcbenarous.netlify.app/goals"
      />

      <div style={{ 
        padding: '100px 20px 80px', 
        maxWidth: '900px', 
        margin: '0 auto',
        backgroundColor: '#fafafa',
        minHeight: '100vh'
      }}>
        <Title level={2} style={{ 
          textAlign: 'center', 
          color: '#ff6b35', 
          marginBottom: '50px',
          fontSize: '2.2rem'
        }}>
          أهداف الجمعية
        </Title>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {goals.map((goal, index) => (
            <Card
              key={index}
              onClick={() => toggleGoal(goal.id)}
              style={{
                borderRadius: '8px',
                border: `2px solid ${expandedGoal === goal.id ? goal.color : '#e0e0e0'}`,
                cursor: 'pointer',
                backgroundColor: 'white',
                overflow: 'hidden'
              }}
              styles={{
                body: { padding: '0' }
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '20px',
                gap: '15px'
              }}>
                <div style={{
                  fontSize: '28px',
                  color: goal.color,
                  width: '50px',
                  textAlign: 'center'
                }}>
                  {goal.icon}
                </div>
                <Text style={{ 
                  fontSize: '1.1rem', 
                  flex: 1,
                  fontWeight: expandedGoal === goal.id ? '600' : '400'
                }}>
                  {goal.text}
                </Text>
                <div style={{
                  fontSize: '1.5rem',
                  color: goal.color,
                  transform: expandedGoal === goal.id ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s'
                }}>
                  ‹
                </div>
              </div>

              {expandedGoal === goal.id && (
                <div style={{
                  padding: '20px',
                  borderTop: `1px solid ${goal.color}20`,
                  marginTop: '10px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    backgroundColor: '#f9f9f9',
                    padding: '30px 20px',
                    borderRadius: '8px',
                    border: `2px dashed ${goal.color}40`
                  }}>
                    <Text style={{
                      fontSize: '1rem',
                      color: '#666',
                      display: 'block',
                      marginBottom: '10px'
                    }}>
                      ⏳ هذا القسم قيد التطوير
                    </Text>
                    <Text style={{
                      fontSize: '0.9rem',
                      color: '#888',
                      display: 'block'
                    }}>
                      سيتم إضافة الأنشطة والبرامج المتعلقة بهذا الهدف قريبًا
                    </Text>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card style={{
          marginTop: '30px',
          backgroundColor: '#fff3e0',
          border: '1px solid #ffb74d',
          borderRadius: '8px'
        }}>
          <Text style={{ textAlign: 'center', display: 'block', color: '#555' }}>
            ℹ️ انقر على أي هدف لعرض التفاصيل (قيد التطوير)
          </Text>
        </Card>
      </div>
    </>
  );
};

export default GoalsPage;