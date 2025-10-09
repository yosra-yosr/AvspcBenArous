// src/components/registration/SuccessScreen.jsx
import { Card, Typography, Space, Button, Timeline } from 'antd';
import { 
  CheckCircleOutlined, 
  DownloadOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  PhoneOutlined
} from '@ant-design/icons';
// import { SuccessRegistrationAlert, DocumentsInfoAlert, DeadlineWarningAlert } from '../common/AlertComponents';
import RequiredDocuments from '../common/RequiredDocuments';

const { Title, Text, Paragraph } = Typography;

const SuccessScreen = ({ formData, onDownloadPDF, onReturnHome }) => {
  return (
    <div style={{ 
      maxWidth: 900, 
      margin: '0 auto', 
      padding: '16px', 
      direction: 'rtl',
      minHeight: '100vh'
    }}>
      {/* En-tête de succès */}
      <Card
        style={{
          textAlign: 'center',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: 24
        }}
        bodyStyle={{ padding: '40px 20px' }}
      >
        <CheckCircleOutlined 
          style={{ 
            fontSize: 72, 
            color: '#52c41a', 
            marginBottom: 24,
            display: 'block'
          }} 
        />
        <Title level={2} style={{ marginBottom: 16, color: '#52c41a' }}>
          تم التسجيل بنجاح!
        </Title>
        <Text type="secondary" style={{ fontSize: 16, display: 'block' }}>
          رقم الطلب: <Text strong>#{formData?.idNumber || 'N/A'}</Text>
        </Text>
      </Card>

      {/* Alertes */}
      {/* <SuccessRegistrationAlert style={{ marginBottom: 16 }} />
      <DeadlineWarningAlert days={7} style={{ marginBottom: 16 }} />
      <DocumentsInfoAlert style={{ marginBottom: 24 }} /> */}

      {/* Timeline des étapes suivantes */}
      <Card
        title="الخطوات القادمة"
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: 24
        }}
      >
        <Timeline
          items={[
            {
              color: 'green',
              dot: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
              children: (
                <div>
                  <Text strong>تم التسجيل الإلكتروني</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '13px' }}>
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
                  <Text strong>تنزيل استمارة التسجيل</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    قم بتنزيل وطباعة الاستمارة (إن لم يتم التنزيل تلقائياً)
                  </Text>
                  <br />
                  <Button 
                    type="link" 
                    icon={<DownloadOutlined />}
                    onClick={onDownloadPDF}
                    style={{ padding: '4px 0', marginTop: 8 }}
                  >
                    إعادة تنزيل الاستمارة
                  </Button>
                </div>
              )
            },
            {
              color: 'orange',
              dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
              children: (
                <div>
                  <Text strong>تحضير الوثائق المطلوبة</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    راجع القائمة أدناه وجهز جميع المستندات
                  </Text>
                </div>
              )
            },
            {
              color: 'gray',
              children: (
                <div>
                  <Text strong>إيداع الملف في المكتب</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    توجه إلى مكتب الجمعية خلال 7 أيام مع جميع الوثائق
                  </Text>
                </div>
              )
            },
            {
              color: 'gray',
              children: (
                <div>
                  <Text strong>مراجعة الملف والاتصال بك</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    سيتم التواصل معك لتحديد موعد المقابلة
                  </Text>
                </div>
              )
            }
          ]}
        />
      </Card>

      {/* Liste des documents requis */}
      <RequiredDocuments 
        educationLevel={formData?.educationlevel} 
        style={{ marginBottom: 24 }}
      />

      {/* Informations importantes */}
      <Card
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: 24,
          background: '#fff7e6',
          border: '1px solid #ffd591'
        }}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Title level={5} style={{ margin: 0, color: '#d46b08' }}>
            ملاحظات هامة:
          </Title>
          <Paragraph style={{ margin: 0 }}>
            • يجب إيداع جميع الوثائق خلال <Text strong style={{ color: '#f5222d' }}>7 أيام</Text> من تاريخ التسجيل
          </Paragraph>
          <Paragraph style={{ margin: 0 }}>
            • تأكد من أن جميع النسخ واضحة ومقروءة
          </Paragraph>
          <Paragraph style={{ margin: 0 }}>
            • الوثائق الرسمية يجب أن لا تتجاوز 3 أشهر من تاريخ الإصدار
          </Paragraph>
          <Paragraph style={{ margin: 0 }}>
            • احتفظ بنسخة من استمارة التسجيل معك
          </Paragraph>
        </Space>
      </Card>

      {/* Boutons d'action */}
      <Space 
        style={{ 
          width: '100%', 
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <Button
          type="primary"
          size="large"
          icon={<DownloadOutlined />}
          onClick={onDownloadPDF}
        >
          تنزيل الاستمارة مرة أخرى
        </Button>
        
        <Button
          size="large"
          icon={<PhoneOutlined />}
          href="tel:71234567"
        >
          الاتصال بالمكتب
        </Button>
        
        <Button
          size="large"
          icon={<HomeOutlined />}
          onClick={onReturnHome}
        >
          العودة إلى الصفحة الرئيسية
        </Button>
      </Space>
    </div>
  );
};

export default SuccessScreen;