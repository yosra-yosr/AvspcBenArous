import { useState } from 'react';
import { Card, Typography, Tag } from 'antd';
import { 
  MedicineBoxOutlined,
  FireOutlined,
  SafetyOutlined,
  TeamOutlined,
  SmileOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const GoalsPage = () => {
  const [expandedGoal, setExpandedGoal] = useState(null);

  const goals = [
    {
      id: 1,
      text: 'دعم و تكوين المتطوعين في ميادين الإسعاف والإطفاء والإنقاذ.',
      icon: <MedicineBoxOutlined />,
      color: '#ff6b35',
      activities: [
        'تكوين أساسي في الإسعافات الأولية',
        'دورات في الإنعاش القلبي الرئوي (CPR)',
        'تقنيات إطفاء الحرائق',
        'استخدام معدات الإطفاء الحديثة',
        'تدريبات على الإنقاذ البري والبحري',
        'تقنيات التسلق والإنزال',
        'إدارة حرائق الغابات'
      ]
    },
    {
      id: 2,
      text: 'معاضدة مجهود الحماية المدنية والتدخل السريع والناجع.',
      icon: <SafetyOutlined />,
      color: '#e74c3c',
      activities: [
        'التدخل في حالات الطوارئ',
        'إسعاف الحوادث والمصابين',
        'المشاركة في عمليات الإنقاذ',
        'دعم فرق الحماية المدنية',
        'الحراسة والوقاية في الفعاليات',
        'التنسيق مع الوحدات المختصة',
        'التدخل السريع في الكوارث'
      ]
    },
    {
      id: 3,
      text: 'التعريف بأنشطة وبرامج الحماية المدنية.',
      icon: <FireOutlined />,
      color: '#3498db',
      activities: [
        'تنظيم أيام مفتوحة',
        'زيارات ميدانية لمراكز الحماية المدنية',
        'عرض معدات التدخل والإنقاذ',
        'تقديم عروض توضيحية',
        'نشر محتوى توعوي على وسائل التواصل',
        'مشاركة قصص النجاح والتدخلات',
        'التعريف بدور المتطوعين'
      ]
    },
    {
      id: 4,
      text: 'نشر ثقافة التطوع للعموم وبخاصة لدى الشباب والطلبة.',
      icon: <TeamOutlined />,
      color: '#9b59b6',
      activities: [
        'حملات توعية في المدارس والجامعات',
        'ورشات عمل حول أهمية التطوع',
        'برامج تدريبية للشباب',
        'أنشطة تحفيزية للطلبة',
        'شهادات تقدير للمتطوعين',
        'تنظيم مسابقات وفعاليات',
        'بناء شبكة من المتطوعين النشطين'
      ]
    },
    {
      id: 5,
      text: 'تنشئة الطفولة وفق المبادئ الأساسية للصحة والسلامة والوقاية.',
      icon: <SmileOutlined />,
      color: '#10b981',
      activities: [
        'برامج تعليمية مبسطة للأطفال',
        'أنشطة ترفيهية تربوية',
        'تعليم قواعد السلامة الأساسية',
        'التدريب على الوقاية من المخاطر',
        'ورشات حول الصحة الوقائية',
        'ألعاب تفاعلية حول السلامة',
        'زيارات تعليمية ميدانية'
      ]
    }
  ];

  const toggleGoal = (goalId) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
  };

  return (
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
                padding: '0 20px 20px 20px',
                borderTop: `1px solid ${goal.color}20`,
                marginTop: '10px',
                paddingTop: '20px'
              }}>
                <Text strong style={{ 
                  display: 'block', 
                  marginBottom: '15px',
                  color: goal.color,
                  fontSize: '1rem'
                }}>
                  الأنشطة والبرامج:
                </Text>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px'
                }}>
                  {goal.activities.map((activity, idx) => (
                    <Tag
                      key={idx}
                      style={{
                        padding: '8px 12px',
                        fontSize: '0.9rem',
                        border: `1px solid ${goal.color}40`,
                        backgroundColor: `${goal.color}10`,
                        color: '#333',
                        borderRadius: '4px',
                        margin: 0
                      }}
                    >
                      • {activity}
                    </Tag>
                  ))}
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
          ℹ️ انقر على أي هدف لعرض الأنشطة المرتبطة به
        </Text>
      </Card>
    </div>
  );
};

export default GoalsPage;