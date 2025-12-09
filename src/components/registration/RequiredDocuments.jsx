// src/components/registration/RequiredDocuments.jsx
import { Card, Space, Button, List, Alert, Typography } from 'antd';
import { FileTextOutlined, DownloadOutlined } from '@ant-design/icons';
import { trackDownloadFicheInstructions } from '../../utils/analytics';

const { Text } = Typography;

const RequiredDocuments = ({ onDownloadFicheInstructions }) => {
  const handleDownloadFiche = () => {
    trackDownloadFicheInstructions();
    if (onDownloadFicheInstructions) {
      onDownloadFicheInstructions();
    }
  };

  // Liste des documents requis selon l'image
  const requiredDocuments = [
    {
      id: 1,
      text: 'مطلب ترشح باسم المدير الجهوي للحماية المدنية بن عروس. الموضوع : الانخراط في جمعية متطوعوعون في خدمة الحماية المدنية بن عروس)',
      type: 'text'
    },
    {
      id: 2,
      text: 'نسخة من إستمارة التسجيل',
      type: 'text'
    },
    {
      id: 3,
      text: 'بطاقة الإرشادات: تعمير بطاقة الإرشادات باللغة العربية وطباعتها وسحبها ثم إمضائها وإرفاقها وجوباً بملف الترشح',
      type: 'link',
      fileName: 'بطاقة_الإرشادات_التطوع_الحماية_المدنية.pdf'
    },
    {
      id: 4,
      text: 'الانخراط في الجمعية 25 دينار',
      type: 'text'
    },
    {
      id: 5,
      text: '8 صور شخصية',
      type: 'text'
    },
    {
      id: 6,
      text: 'بطاقة عدد 3 لا تتجاوز 3 أشهر من تاريخ استخراجها أو الوصل',
      type: 'text'
    },
    {
      id: 7,
      text: 'شهادة طبية تفيد السلامة الصحية للمترشح',
      type: 'text'
    },
    {
      id: 8,
      text: 'عدد 02 نسخة من الشهادة العلمية أو تكوين مهني إن وجدت',
      type: 'text'
    },
    {
      id: 9,
      text: '8 نسخ من بطاقة التعريف الوطنية',
      type: 'text'
    },
    {
      id: 10,
      text: '3 ظروف مضمون الوصول',
      type: 'text'
    },
    {
      id: 11,
      text: 'ظرف كبير',
      type: 'text'
    }
  ];

  return (
    <div id="required-documents-section">
      <Card
        title={
          <Space>
            <FileTextOutlined style={{ color: '#1890ff' }} />
            <span style={{ fontSize: window.innerWidth < 768 ? 16 : 18 }}>
              الوثائق المطلوبة
            </span>
          </Space>
        }
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '16px',
          border: '2px solid #1890ff'
        }}
        bodyStyle={{ padding: window.innerWidth < 768 ? '12px' : '24px' }}
      >
        <Alert
          message="يرجى تحضير جميع الوثائق التالية"
          type="info"
          showIcon
          style={{ marginBottom: '16px' }}
        />
        
        <List
          dataSource={requiredDocuments}
          renderItem={(item, index) => (
            <List.Item
              style={{
                padding: window.innerWidth < 768 ? '12px 8px' : '16px 12px',
                borderBottom: '1px solid #f0f0f0'
              }}
            >
              <Space align="start" style={{ width: '100%' }}>
                <div
                  style={{
                    minWidth: window.innerWidth < 768 ? '24px' : '32px',
                    height: window.innerWidth < 768 ? '24px' : '32px',
                    borderRadius: '50%',
                    background: '#1890ff',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: window.innerWidth < 768 ? '12px' : '14px',
                    flexShrink: 0
                  }}
                >
                  {item.id}
                </div>
                <div style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: window.innerWidth < 768 ? '13px' : '15px',
                      lineHeight: '1.6'
                    }}
                  >
                    {item.type === 'link' ? (
                      <>
                        <span>{item.text}</span>
                        <br />
                        <Button
                          type="link"
                          icon={<DownloadOutlined />}
                          download={item.fileName}
                          onClick={handleDownloadFiche}
                          style={{
                            padding: '4px 0',
                            marginTop: 4,
                            fontSize: window.innerWidth < 768 ? '12px' : '14px',
                            color: '#1890ff',
                            textDecoration: 'underline'
                          }}
                        >
                          (اضغط هنا لتحميل بطاقة الإرشادات)
                        </Button>
                      </>
                    ) : (
                      item.text
                    )}
                  </Text>
                </div>
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default RequiredDocuments;