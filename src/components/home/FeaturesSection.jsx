import React, { useState } from 'react';
import { Row, Col, Typography, Card, Modal, List } from 'antd';
import { 
  StarOutlined, 
  SafetyOutlined, 
  TeamOutlined,
  BookOutlined,
  FireOutlined,
  HeartOutlined,
  RocketOutlined,
  TrophyOutlined,
  CoffeeOutlined,
  UsergroupAddOutlined,
  CompassOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ACCENT_COLOR = '#ff6b35';

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const features = [
    {
      id: 1,
      icon: <BookOutlined style={{ fontSize: '2.5rem', color: ACCENT_COLOR }} />,
      title: 'التدريب والتكوين',
      description: 'برامج تدريبية متخصصة لإعداد متطوعين مؤهلين في مجالات الحماية المدنية',
      details: [
        {
          title: 'التكوين الأساسي',
          icon: <StarOutlined />,
          items: ['النظام العسكري', 'القواعد الأساسية', 'الانضباط والالتزام']
        },
        {
          title: 'التكوين في ميدان الإطفاء',
          icon: <FireOutlined />,
          items: ['حصص نظرية', 'ورشات تطبيقية', 'استخدام معدات الإطفاء']
        },
        {
          title: 'التكوين في ميدان الإسعافات الأولية',
          icon: <HeartOutlined />,
          items: ['حصص نظرية', 'ورشات تطبيقية', 'التدريب على الإنعاش القلبي الرئوي']
        },
        {
          title: 'التكوين في ميدان الإنقاذ',
          icon: <RocketOutlined />,
          items: ['حصص نظرية', 'ورشات تطبيقية', 'تقنيات الإنقاذ البري']
        },
        {
          title: 'تكوين مختص',
          icon: <TrophyOutlined />,
          items: [
            'مضخات عالية المنسوب',
            'النجدة بطرقات',
            'الانقاذ البحري',
            'الدعم والتثبيت',
            'حرائق الغابات درجة أولى، درجة ثانية',
            'الإسعافات الأولية ضمن مجموعة درجة أولى، درجة ثانية'
          ]
        }
      ]
    },
    {
      id: 2,
      icon: <SafetyOutlined style={{ fontSize: '2.5rem', color: ACCENT_COLOR }} />,
      title: 'الأنشطة اليومية',
      description: 'مشاركة فاعلة في أنشطة الحماية المدنية والخدمة المجتمعية',
      details: [
        {
          title: 'الحراسات الوقائية',
          icon: <SafetyOutlined />,
          items: ['حراسة الفعاليات العامة', 'حراسة المناسبات', 'المراقبة الأمنية']
        },
        {
          title: 'حصص توعوية',
          icon: <BookOutlined />,
          items: ['توعية المدارس', 'توعية الجامعات', 'حملات تحسيسية مجتمعية']
        },
        {
          title: 'عمليات بيضاء',
          icon: <HeartOutlined />,
          items: ['عمليات إسعافية']
        },
        {
          title: 'المشاركة في التدخلات',
          icon: <FireOutlined />,
          items: ['دعم عمليات الإطفاء', 'المساعدة في الإنقاذ', 'التدخل في حالات الطوارئ']
        }
      ]
    },
    {
      id: 3,
      icon: <TeamOutlined style={{ fontSize: '2.5rem', color: ACCENT_COLOR }} />,
      title: 'أنشطة ترفيهية وثقافية',
      description: 'أنشطة لتعزيز الروح الجماعية والترفيه عن المتطوعين',
      details: [
        {
          title: 'التخييم (Camping)',
          icon: <CompassOutlined />,
          items: ['رحلات تخييم جماعية', 'أنشطة برية', 'تعايش مع الطبيعة']
        },
        {
          title: 'بناء الفريق (Team Building)',
          icon: <UsergroupAddOutlined />,
          items: ['أنشطة تعاونية', 'تمارين بناء الثقة', 'ألعاب جماعية']
        },
        {
          title: 'أنشطة رياضية',
          icon: <TrophyOutlined />,
          items: ['مسابقات رياضية', 'ماراثونات', 'تدريبات بدنية']
        },
        {
          title: 'أنشطة ثقافية',
          icon: <CoffeeOutlined />,
          items: ['ورشات ثقافية', 'مناقشات', 'تبادل معرفي']
        },
        {
          title: 'رحلات وزيارات',
          icon: <CompassOutlined />,
          items: ['زيارات ميدانية', 'رحلات استكشافية']
        }
      ]
    }
  ];

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setActiveFeature(null);
  };

  return (
    <>
      <div 
        style={{ 
          padding: '60px 16px 40px',
          maxWidth: '1200px', 
          margin: '0 auto',
          background: '#f8f9fa' 
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title 
            level={2} 
            style={{ 
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
              marginBottom: '12px',
              color: '#1a202c'
            }}
          >
            ما نقدمه
          </Title>
          <Paragraph 
            style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
              color: '#4a5568',
              padding: '0 8px'
            }}
          >
            مجالات عملنا الأساسية التي تميز جمعيتنا
          </Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          {features.map((feature) => (
            <Col xs={24} sm={12} md={8} key={feature.id}>
              <Card
                hoverable
                onClick={() => handleFeatureClick(feature)}
                style={{
                  height: '100%',
                  borderRadius: '10px',
                  border: `2px solid ${ACCENT_COLOR}20`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '16px 12px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
                styles={{
                  body: { padding: 0 }
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  {React.cloneElement(feature.icon, {
                    style: { fontSize: 'clamp(2rem, 6vw, 2.5rem)' }
                  })}
                </div>
                
                <Title level={3} style={{ 
                  marginBottom: '12px',
                  color: ACCENT_COLOR,
                  fontSize: 'clamp(1.4rem, 4vw, 1.8rem)'
                }}>
                  {feature.title}
                </Title>
                
                <Paragraph style={{ 
                  color: '#666',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                  lineHeight: '1.5',
                  marginBottom: '16px'
                }}>
                  {feature.description}
                </Paragraph>
                
                <div style={{
                  padding: '8px',
                  backgroundColor: `${ACCENT_COLOR}10`,
                  borderRadius: '6px',
                  border: `1px solid ${ACCENT_COLOR}20`
                }}>
                  <Text style={{ 
                    color: ACCENT_COLOR,
                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                    fontWeight: '500'
                  }}>
                    انقر لعرض التفاصيل →
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Modal مع تصميم متجاوب */}
      <Modal
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {activeFeature && React.cloneElement(activeFeature.icon, {
              style: { fontSize: 'clamp(1.5rem, 4vw, 2rem)' }
            })}
            <Title 
              level={3} 
              style={{ 
                margin: 0, 
                color: ACCENT_COLOR,
                fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)'
              }}
            >
              {activeFeature?.title}
            </Title>
          </div>
        }
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width="90%"
        centered
        style={{
          maxWidth: '800px',
          margin: '16px auto'
        }}
        styles={{
          body: { 
            padding: 'clamp(12px, 3vw, 20px)',
            maxHeight: '70vh',
            overflowY: 'auto'
          },
          header: {
            padding: 'clamp(12px, 3vw, 20px)'
          }
        }}
      >
        {activeFeature && (
          <>
            <Paragraph style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', 
              color: '#555',
              marginBottom: 'clamp(20px, 4vw, 30px)',
              lineHeight: '1.6'
            }}>
              {activeFeature.description}
            </Paragraph>
            
            <List
              grid={{
                gutter: 12,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 2
              }}
              dataSource={activeFeature.details}
              renderItem={(detail) => (
                <List.Item>
                  <Card
                    style={{
                      border: `1px solid ${ACCENT_COLOR}30`,
                      borderRadius: '8px',
                      backgroundColor: `${ACCENT_COLOR}08`,
                      height: '100%'
                    }}
                    styles={{
                      body: { padding: 'clamp(12px, 2vw, 16px)' }
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginBottom: 'clamp(10px, 2vw, 15px)',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        color: ACCENT_COLOR,
                        fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                        flexShrink: 0
                      }}>
                        {detail.icon}
                      </div>
                      <Text strong style={{ 
                        fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                        wordBreak: 'break-word'
                      }}>
                        {detail.title}
                      </Text>
                    </div>
                    
                    <List
                      size="small"
                      dataSource={detail.items}
                      renderItem={(item) => (
                        <List.Item style={{ 
                          padding: 'clamp(6px, 1vw, 8px) 0',
                          border: 'none'
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            gap: 'clamp(6px, 1vw, 8px)'
                          }}>
                            <div style={{
                              width: 'clamp(5px, 1vw, 6px)',
                              height: 'clamp(5px, 1vw, 6px)',
                              borderRadius: '50%',
                              backgroundColor: ACCENT_COLOR,
                              marginTop: 'clamp(6px, 1vw, 8px)',
                              flexShrink: 0
                            }} />
                            <Text style={{ 
                              color: '#666',
                              fontSize: 'clamp(0.85rem, 2vw, 0.9rem)',
                              lineHeight: '1.5',
                              wordBreak: 'break-word'
                            }}>
                              {item}
                            </Text>
                          </div>
                        </List.Item>
                      )}
                    />
                  </Card>
                </List.Item>
              )}
            />
            
            {/* زر الإغلاق للهواتف المحمولة */}
            <div style={{
              display: 'none',
              '@media (max-width: 768px)': {
                display: 'block',
                marginTop: '20px',
                textAlign: 'center'
              }
            }}>
              <button
                onClick={handleCloseModal}
                style={{
                  backgroundColor: ACCENT_COLOR,
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                إغلاق
              </button>
            </div>
          </>
        )}
      </Modal>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .ant-modal-content {
            margin: 8px;
          }
          .ant-modal-body {
            padding-bottom: 80px;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturesSection;