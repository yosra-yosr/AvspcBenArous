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
      activities: [
        { text: 'تكوين أساسي في الإسعافات الأولية', image: '../assets/images/التكوين الاساسي.jpg' },
        { text: 'دورات في الإنعاش القلبي الرئوي', image: '../assets/images/التكوين أسعاف.jpg' },
        { text: 'تقنيات إطفاء الحرائق', image: '../assets/images/تدخل إطفاء.jpg' },
        { text: 'استخدام معدات الإطفاء الحديثة', image: '../assets/images/494575905_1778209299428996_5228800660909931856_n.jpg' },
        { text: 'تدريبات على الإنقاذ البري والبحري', image: '../assets/images/405568545_857194529531496_2637560838966354133_n.jpg' },
        { text: 'تقنيات التسلق والإنزال', image: '../assets/images/التكوين انقاذ.jpg' },
        { text: 'إدارة حرائق الغابات', image: '../assets/images/IMG-20231221-WA0032.jpg' }
      ]
    },
    {
      id: 2,
      text: 'معاضدة مجهود الحماية المدنية والتدخل السريع والناجع.',
      icon: <SafetyOutlined />,
      color: '#e74c3c',
      activities: [
        { text: 'التدخل في حالات الطوارئ', image: '../assets/images/494687732_671127975917374_6241943171790390108_n.jpg' },
        { text: 'إسعاف الحوادث والمصابين', image: '../assets/images/490993627_2391485394541002_5076663579663900279_n.jpg' },
        { text: 'المشاركة في عمليات الإنقاذ', image: '../assets/images/التكوين انقاذ.jpg' },
        { text: 'دعم فرق الحماية المدنية', image: '../assets/images/440816186_1181588552865927_1568879716795949706_n.jpg' },
        { text: 'الحراسة والوقاية في الفعاليات', image: '../assets/images/حراسة وقاية.jpeg' },
        { text: 'التنسيق مع الوحدات المختصة', image: '../assets/images/440816186_1181588552865927_1568879716795949706_n.jpg' },
        { text: 'التدخل السريع في الكوارث', image: '../assets/images/تدخل إطفاء.jpg' }
      ]
    },
    {
      id: 3,
      text: 'التعريف بأنشطة وبرامج الحماية المدنية.',
      icon: <FireOutlined />,
      color: '#3498db',
      activities: [
        { text: 'تنظيم أيام مفتوحة', image: '../assets/images/تحسيس.jpeg' },
        { text: 'زيارات ميدانية لمراكز الحماية المدنية', image: '../assets/images/وزارة الدخلية.jpg' },
        { text: 'عرض معدات التدخل والإنقاذ', image: '../assets/images/التكوين الاساسي.jpg' },
        { text: 'تقديم عروض توضيحية', image: '../assets/images/تدخل إطفاء.jpg' },
        { text: 'نشر محتوى توعوي على وسائل التواصل', image: '../assets/images/تحسيس.jpeg' },
        { text: 'مشاركة قصص النجاح والتدخلات', image: '../assets/images/FB_IMG_1675327854262.jpg' },
        { text: 'التعريف بدور المتطوعين', image: '../assets/images/التكوين الاساسي.jpg' }
      ]
    },
    {
      id: 4,
      text: 'نشر ثقافة التطوع للعموم وبخاصة لدى الشباب والطلبة.',
      icon: <TeamOutlined />,
      color: '#9b59b6',
      activities: [
        { text: 'حملات توعية في المدارس والجامعات', image: '../assets/images/تحسيس.jpeg' },
        { text: 'ورشات عمل حول أهمية التطوع', image: '../assets/images/التكوين الاساسي.jpg' },
        { text: 'برامج تدريبية للشباب', image: '../assets/images/التكوين أسعاف.jpg' },
        { text: 'أنشطة تحفيزية للطلبة', image: '../assets/images/440816186_1181588552865927_1568879716795949706_n.jpg' },
        { text: 'شهادات تقدير للمتطوعين', image: '../assets/images/تحسيس.jpeg' },
        { text: 'تنظيم مسابقات وفعاليات', image: '../assets/images/حراسة وقاية.jpeg' },
        { text: 'بناء شبكة من المتطوعين النشطين', image: '../assets/images/التكوين الاساسي.jpg' }
      ]
    },
    {
      id: 5,
      text: 'تنشئة الطفولة وفق المبادئ الأساسية للصحة والسلامة والوقاية.',
      icon: <SmileOutlined />,
      color: '#10b981',
      activities: [
        { text: 'برامج تعليمية مبسطة للأطفال', image: '../assets/images/التكوين الأطفاء.jpg' },
        { text: 'أنشطة ترفيهية تربوية', image: '../assets/images/تدخل إطفاء.jpg' },
        { text: 'تعليم قواعد السلامة الأساسية', image: '../assets/images/التكوين الأطفاء.jpg' },
        { text: 'التدريب على الوقاية من المخاطر', image: '../assets/images/تدخل إطفاء.jpg' },
        { text: 'ورشات حول الصحة الوقائية', image: '../assets/images/التكوين الأطفاء.jpg' },
        { text: 'ألعاب تفاعلية حول السلامة', image: '../assets/images/تحسيس.jpeg' },
        { text: 'زيارات تعليمية ميدانية', image: '../assets/images/تدخل إطفاء.jpg' }
      ]
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
        image = "https://inscription-avspcbenarous.netlify.app/assets/images/شعار.png"
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
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '15px'
                  }}>
                    {goal.activities.map((activity, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: `2px solid ${goal.color}40`,
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <img 
                          src={activity.image} 
                          alt={`${activity.text} - جمعية الحماية المدنية بن عروس`}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div style={{
                          padding: '10px',
                          backgroundColor: 'white',
                          borderTop: `3px solid ${goal.color}`
                        }}>
                          <Text style={{
                            fontSize: '0.85rem',
                            color: '#333',
                            display: 'block',
                            lineHeight: '1.4'
                          }}>
                            {activity.text}
                          </Text>
                        </div>
                      </div>
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
    </>
  );
};

export default GoalsPage;