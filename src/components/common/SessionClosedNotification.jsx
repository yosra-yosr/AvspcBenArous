// src/components/common/SessionClosedNotification.jsx
import { Card, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SessionClosedNotification = ({ 
  title = "عملية التسجيل غير متاحة حالياً",
  message = "نعتذر، فترة التسجيل مغلقة في الوقت الحالي. سيتم الإعلان عن موعد الفترة القادمة قريباً.",
  showIcon = true 
}) => {
  return (
    <div style={{ 
      maxWidth: 900, 
      margin: '0 auto', 
      padding: '16px', 
      direction: 'rtl', 
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card 
        style={{ 
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          maxWidth: '600px',
          width: '100%'
        }} 
        bodyStyle={{ 
          padding: '48px 32px',
          textAlign: 'center'
        }}
      >
        {showIcon && (
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF5F2 0%, #FFE8E0 100%)',
            marginBottom: '24px'
          }}>
            <ClockCircleOutlined style={{ 
              fontSize: '40px', 
              color: '#ff6b35'
            }} />
          </div>
        )}

        <Title 
          level={3} 
          style={{ 
            color: '#1a1a1a',
            fontWeight: 600,
            marginBottom: '16px',
            fontSize: '24px'
          }}
        >
          {title}
        </Title>

        <Text 
          style={{ 
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.8',
            display: 'block',
            marginBottom: '24px'
          }}
        >
          {message}
        </Text>

        <div style={{
          padding: '16px',
          background: '#F8F9FA',
          borderRadius: '8px',
          marginTop: '32px'
        }}>
          <Text style={{ 
            fontSize: '14px', 
            color: '#888',
            display: 'block'
          }}>
            للاستفسار، يرجى التواصل مع إدارة الجمعية
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SessionClosedNotification;