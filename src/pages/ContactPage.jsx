import React, { useState } from 'react';
import { Card, Typography, Input, Button, message } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !messageText) {
      message.warning('يرجى ملء جميع الحقول');
      return;
    }
    message.success('تم إرسال الرسالة بنجاح!');
    setName('');
    setEmail('');
    setMessageText('');
  };

  return (
    <div style={{ padding: '100px 20px 80px', maxWidth: '700px', margin: '0 auto' }}>
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
          📞 اتصل بنا
        </Title>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
              الاسم الكامل
            </label>
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="أدخل اسمك الكامل"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          </div>
          </Card></div>);}
          export default ContactPage;
