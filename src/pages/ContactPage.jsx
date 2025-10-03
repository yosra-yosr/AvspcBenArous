import React, { useState } from 'react';
import { Card, Typography, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ContactPage = () => {
  const [name, setName] = useState('');

  

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
          {/* <div>
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
          </div> */}
          </div>
          </Card></div>);}
          export default ContactPage;
