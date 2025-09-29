import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const Footer = () => {
  return (
    <footer
      style={{
        background: '#1a202c',
        color: 'white',
        textAlign: 'center',
        padding: '40px 20px',
        marginTop: '60px'
      }}
    >
      <Text style={{ color: 'white', opacity: 0.9 }}>
        حقوق الطبع والنشر © 2025 جمعية متطوعون في خدمة الحماية المدنية بن عروس
      </Text>
    </footer>
  );
};

export default Footer;