// src/components/common/RequiredDocuments.jsx
import { Card, List, Typography, Tag, Space } from 'antd';
import { 
  FileTextOutlined, 
  IdcardOutlined, 
  HomeOutlined,
  SafetyCertificateOutlined,
  CameraOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const RequiredDocuments = ({ educationLevel, style }) => {
  // Documents de base requis pour tous
  const baseDocuments = [
    {
      icon: <IdcardOutlined style={{ color: '#1890ff' }} />,
      title: 'نسخة من بطاقة التعريف الوطنية',
      description: 'نسخة واضحة من الوجهين',
      required: true
    },
    {
      icon: <FileTextOutlined style={{ color: '#52c41a' }} />,
      title: 'شهادة إقامة',
      description: 'صادرة من البلدية (لا تتجاوز 3 أشهر)',
      required: true
    },
    {
      icon: <CameraOutlined style={{ color: '#faad14' }} />,
      title: 'صورتان شخصيتان',
      description: 'بخلفية بيضاء أو زرقاء',
      required: true
    },
    {
      icon: <HomeOutlined style={{ color: '#13c2c2' }} />,
      title: 'وثيقة عدلية',
      description: 'إيصال B3 (لا يتجاوز 3 أشهر)',
      required: true
    }
  ];

  // Documents selon le niveau d'éducation
  const getEducationDocuments = () => {
    const educationDocs = {
      'primary': {
        icon: <SafetyCertificateOutlined style={{ color: '#722ed1' }} />,
        title: 'شهادة حضور ومستوى',
        description: 'من المدرسة الابتدائية',
        required: true
      },
      'secondary': {
        icon: <SafetyCertificateOutlined style={{ color: '#722ed1' }} />,
        title: 'شهادة حضور وبطاقة الأعداد',
        description: 'من المدرسة الإعدادية',
        required: true
      },
      'highschool': {
        icon: <SafetyCertificateOutlined style={{ color: '#722ed1' }} />,
        title: 'شهادة حضور وبطاقة الأعداد',
        description: 'من المدرسة الثانوية',
        required: true
      },
      'bachelor': {
        icon: <SafetyCertificateOutlined style={{ color: '#722ed1' }} />,
        title: 'نسخة من شهادة البكالوريا',
        description: 'شهادة البكالوريا مصادق عليها',
        required: true
      },
      'university': {
        icon: <SafetyCertificateOutlined style={{ color: '#722ed1' }} />,
        title: 'نسخة من الشهادة الجامعية',
        description: 'شهادة التعليم العالي مصادق عليها',
        required: true
      }
    };

    return educationLevel ? [educationDocs[educationLevel]] : [];
  };

  const allDocuments = [...baseDocuments, ...getEducationDocuments()];

  return (
    <Card
      title={
        <Space>
          <FileTextOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
          <Title level={4} style={{ margin: 0 }}>
            الوثائق المطلوبة للإيداع في المكتب
          </Title>
        </Space>
      }
      style={{ 
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        ...style
      }}
    >
      <Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        يرجى تحضير الوثائق التالية وإحضارها إلى مكتب الجمعية خلال <Text strong style={{ color: '#f5222d' }}>7 أيام</Text>
      </Text>

      <List
        dataSource={allDocuments}
        renderItem={(item) => (
          <List.Item
            style={{
              padding: '16px',
              marginBottom: '12px',
              background: '#fafafa',
              borderRadius: '8px',
              border: '1px solid #f0f0f0'
            }}
          >
            <List.Item.Meta
              avatar={
                <div style={{ 
                  fontSize: '24px', 
                  display: 'flex', 
                  alignItems: 'center',
                  padding: '8px'
                }}>
                  {item.icon}
                </div>
              }
              title={
                <Space>
                  <Text strong>{item.title}</Text>
                  {item.required && (
                    <Tag color="red" style={{ fontSize: '10px' }}>
                      إجباري
                    </Tag>
                  )}
                </Space>
              }
              description={
                <Text type="secondary">{item.description}</Text>
              }
            />
          </List.Item>
        )}
      />

      <Card 
        type="inner" 
        style={{ 
          marginTop: 20, 
          background: '#e6f7ff',
          border: '1px solid #91d5ff'
        }}
      >
        <Space direction="vertical" size={8}>
          <Text strong style={{ color: '#0050b3' }}>
            📍 معلومات الاتصال بالمكتب:
          </Text>
          <Text>
            📞 الهاتف: 71 234 567
          </Text>
          <Text>
            ⏰ أوقات العمل: من الاثنين إلى الجمعة (9:00 - 17:00)
          </Text>
          <Text>
            📍 العنوان: مقر الجمعية، بن عروس
          </Text>
        </Space>
      </Card>
    </Card>
  );
};

export default RequiredDocuments;