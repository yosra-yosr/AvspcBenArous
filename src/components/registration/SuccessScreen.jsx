// src/components/registration/SuccessScreen.jsx
import { Card, Typography, Space, Button, Timeline, Alert, List } from 'antd';
import { 
  CheckCircleOutlined, 
  DownloadOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
  FileTextOutlined,
  WarningOutlined
} from '@ant-design/icons';
import ReactGA from 'react-ga4';

const { Title, Text, Paragraph } = Typography;

const SuccessScreen = ({ formData, onDownloadPDF, onReturnHome }) => {
  const scrollToDocuments = () => {
    // Tracker l'événement dans Google Analytics
    ReactGA.event({
      category: 'User Interaction',
      action: 'Click CTA Documents',
      label: 'Alert Documents Button',
      value: 1
    });

    document.getElementById('required-documents-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleDownloadPDF = () => {
    // Tracker le téléchargement du PDF
    ReactGA.event({
      category: 'Document',
      action: 'Download PDF',
      label: `Registration Form - ID: ${formData?.idNumber || 'N/A'}`,
      value: 1
    });
    
    onDownloadPDF();
  };

  const handlePhoneClick = () => {
    // Tracker l'appel téléphonique
    ReactGA.event({
      category: 'Contact',
      action: 'Click Call Office',
      label: 'Phone Button',
      value: 1
    });
  };

  const handleReturnHome = () => {
    // Tracker le retour à l'accueil
    ReactGA.event({
      category: 'Navigation',
      action: 'Return to Home',
      label: 'Success Screen',
      value: 1
    });
    
    onReturnHome();
  };

  // Liste des documents requis selon l'image
  const requiredDocuments = [
    'مطلب ترشح باسم المدير الجهوي للحماية المدنية بن عروس. الموضوع : الانخراط في جمعية متطوعوعون في خدمة الحماية المدنية بن عروس)',
    'الانخروط في جمعية 25 دينار',
    '8 صور شخصية',
    'بطاقة عدد 3 لا يتجاوز تاريخ استخراجها ثلاثة أشهر',
    'شهادة طبية تفيد السلامة الصحية للمترشح',
    'عدد 02 نسخة من الشهادة العلمية أو تكوين مهني إن وجدت',
    '8 نسخ من بطاقة التعريف الوطنية',
    '3 ظروف مضمون الوصول',
    'ظرف كبير'
  ];

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '12px', 
      direction: 'rtl',
      minHeight: '100vh'
    }}>
      {/* En-tête de succès */}
      <Card
        style={{
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '16px'
        }}
        bodyStyle={{ 
          padding: window.innerWidth < 768 ? '24px 12px' : '40px 20px' 
        }}
      >
        <CheckCircleOutlined 
          style={{ 
            fontSize: window.innerWidth < 768 ? 56 : 72, 
            color: '#52c41a', 
            marginBottom: '16px',
            display: 'block'
          }} 
        />
        <Title 
          level={window.innerWidth < 768 ? 3 : 2} 
          style={{ marginBottom: '12px', color: '#52c41a' }}
        >
          تم التسجيل بنجاح!
        </Title>
        <Text type="secondary" style={{ fontSize: window.innerWidth < 768 ? 14 : 16, display: 'block' }}>
          رقم الطلب: <Text strong>#{formData?.idNumber || 'N/A'}</Text>
        </Text>
      </Card>

      {/* Alerte Call-to-Action Documents */}
      <Alert
        message={
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Text strong style={{ fontSize: window.innerWidth < 768 ? 14 : 16, color: '#d46b08' }}>
               خطوة مهمة جداً: تحضير الوثائق المطلوبة
            </Text>
            <Text style={{ fontSize: window.innerWidth < 768 ? 12 : 14 }}>
              يجب عليك إحضار جميع الوثائق المذكورة أدناه إلى حين الإتصال بك
              </Text>
          </Space>
        }
        type="warning"
        showIcon
        icon={<WarningOutlined style={{ fontSize: window.innerWidth < 768 ? 20 : 24 }} />}
        style={{ 
          marginBottom: '16px',
          borderRadius: '12px',
          border: '2px solid #faad14',
          boxShadow: '0 4px 12px rgba(250, 173, 20, 0.2)'
        }}
        action={
          <Button 
            size={window.innerWidth < 768 ? 'middle' : 'large'}
            type="primary" 
            danger
            icon={<FileTextOutlined />}
            onClick={scrollToDocuments}
            style={{ 
              fontWeight: 'bold',
              fontSize: window.innerWidth < 768 ? '14px' : '16px',
              marginTop: window.innerWidth < 768 ? '8px' : '0'
            }}
          >
            {window.innerWidth < 768 ? 'الوثائق' : 'عرض قائمة الوثائق'}
          </Button>
        }
      />

      {/* Timeline des étapes suivantes */}
      <Card
        title={<span style={{ fontSize: window.innerWidth < 768 ? 16 : 18 }}>الخطوات القادمة</span>}
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '16px'
        }}
        bodyStyle={{ padding: window.innerWidth < 768 ? '12px' : '24px' }}
      >
        <Timeline
          items={[
            {
              color: 'green',
              dot: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
              children: (
                <div>
                  <Text strong style={{ fontSize: window.innerWidth < 768 ? 13 : 14 }}>
                    تم التسجيل الإلكتروني
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: window.innerWidth < 768 ? 11 : 13 }}>
                    تم حفظ بياناتك بنجاح في النظام
                  </Text>
                </div>
              )
            },
            {
              color: 'blue',
              dot: <DownloadOutlined style={{ fontSize: '16px' }} />,
              children: (
                <div>
                  <Text strong style={{ fontSize: window.innerWidth < 768 ? 13 : 14 }}>
                    تنزيل استمارة التسجيل
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: window.innerWidth < 768 ? 11 : 13 }}>
                    قم بتنزيل وطباعة الاستمارة
                  </Text>
                  <br />
                  <Button 
                    type="link" 
                    size="small"
                    icon={<DownloadOutlined />}
                    onClick={handleDownloadPDF}
                    style={{ padding: '4px 0', marginTop: 8 }}
                  >
                    إعادة تنزيل
                  </Button>
                </div>
              )
            },
            {
              color: 'orange',
              dot: <FileTextOutlined style={{ fontSize: '16px' }} />,
              children: (
                <div>
                  <Text strong style={{ color: '#fa8c16', fontSize: window.innerWidth < 768 ? 13 : 14 }}>
                    تحضير الوثائق المطلوبة
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: window.innerWidth < 768 ? 11 : 13 }}>
                    راجع القائمة أدناه وجهز جميع المستندات
                  </Text>
                  <br />
                  <Button 
                    type="link" 
                    danger
                    size="small"
                    icon={<FileTextOutlined />}
                    onClick={scrollToDocuments}
                    style={{ padding: '4px 0', marginTop: 8, fontWeight: 'bold' }}
                  >
                    قائمة الوثائق
                  </Button>
                </div>
              )
            },
            {
              color: 'gray',
              dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
              children: (
                <div>
                  <Text strong style={{ fontSize: window.innerWidth < 768 ? 13 : 14 }}>
                    إيداع الملف في المكتب
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: window.innerWidth < 768 ? 11 : 13 }}>
                    توجه إلى مكتب الجمعية مع جميع الوثائق
                  </Text>
                </div>
              )
            },
            {
              color: 'gray',
              children: (
                <div>
                  <Text strong style={{ fontSize: window.innerWidth < 768 ? 13 : 14 }}>
                    مراجعة الملف والاتصال بك
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: window.innerWidth < 768 ? 11 : 13 }}>
                    سيتم التواصل معك لتحديد موعد المقابلة
                  </Text>
                </div>
              )
            }
          ]}
        />
      </Card>

      {/* Liste des documents requis - Section principale */}
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
                    {index + 1}
                  </div>
                  <Text
                    style={{
                      fontSize: window.innerWidth < 768 ? '13px' : '15px',
                      lineHeight: '1.6',
                      flex: 1
                    }}
                  >
                    {item}
                  </Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* Informations importantes */}
      <Card
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '16px',
          background: '#fff7e6',
          border: '1px solid #ffd591'
        }}
        bodyStyle={{ padding: window.innerWidth < 768 ? '12px' : '24px' }}
      >
        <Space direction="vertical" size={window.innerWidth < 768 ? 8 : 12} style={{ width: '100%' }}>
          <Title level={5} style={{ margin: 0, color: '#d46b08', fontSize: window.innerWidth < 768 ? 14 : 16 }}>
            ملاحظات هامة:
          </Title>
          <Paragraph style={{ margin: 0, fontSize: window.innerWidth < 768 ? 13 : 14 }}>
            • يجب إيداع جميع الوثائق  <Text strong style={{ color: '#f5222d' }}> إلى حين الإتصال بك</Text>   
          </Paragraph>
          <Paragraph style={{ margin: 0, fontSize: window.innerWidth < 768 ? 13 : 14 }}>
            • تأكد من أن جميع النسخ واضحة ومقروءة
          </Paragraph>
          <Paragraph style={{ margin: 0, fontSize: window.innerWidth < 768 ? 13 : 14 }}>
            • الوثائق الرسمية يجب أن لا تتجاوز 3 أشهر من تاريخ الإصدار
          </Paragraph>
          <Paragraph style={{ margin: 0, fontSize: window.innerWidth < 768 ? 13 : 14 }}>
            • احتفظ بنسخة من استمارة التسجيل معك
          </Paragraph>
          <Paragraph style={{ margin: 0, fontSize: window.innerWidth < 768 ? 13 : 14 }}>
            • ضرورة إحضار جميع الوثائق المذكورة في القائمة أعلاه
          </Paragraph>
        </Space>
      </Card>

      {/* Boutons d'action - Responsive */}
      <Space 
        direction={window.innerWidth < 768 ? 'vertical' : 'horizontal'}
        style={{ 
          width: '100%', 
          justifyContent: 'center',
          gap: window.innerWidth < 768 ? '8px' : '12px'
        }}
      >
        <Button
          type="primary"
          size={window.innerWidth < 768 ? 'middle' : 'large'}
          icon={<DownloadOutlined />}
          onClick={handleDownloadPDF}
          block={window.innerWidth < 768}
          style={{ fontSize: window.innerWidth < 768 ? 14 : 16 }}
        >
          {window.innerWidth < 768 ? 'تنزيل الاستمارة' : 'تنزيل الاستمارة مرة أخرى'}
        </Button>
        
        <Button
          size={window.innerWidth < 768 ? 'middle' : 'large'}
          icon={<PhoneOutlined />}
          href="tel:71234567"
          onClick={handlePhoneClick}
          block={window.innerWidth < 768}
          style={{ fontSize: window.innerWidth < 768 ? 14 : 16 }}
        >
          الاتصال بالمكتب
        </Button>
        
        <Button
          size={window.innerWidth < 768 ? 'middle' : 'large'}
          icon={<HomeOutlined />}
          onClick={handleReturnHome}
          block={window.innerWidth < 768}
          style={{ fontSize: window.innerWidth < 768 ? 14 : 16 }}
        >
          {window.innerWidth < 768 ? 'الصفحة الرئيسية' : 'العودة إلى الصفحة الرئيسية'}
        </Button>
      </Space>
    </div>
  );
};

export default SuccessScreen;