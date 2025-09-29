import React from 'react';
import { Card, Statistic, Typography } from 'antd';

const { Text } = Typography;

const StatCard = ({ value, suffix, title }) => {
  return (
    <Card
      hoverable
      style={{
        textAlign: 'center',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease'
      }}
      styles={{
        body: { padding: '40px 20px' }
      }}
    >
      <Statistic
        value={value}
        suffix={suffix}
        valueStyle={{
          background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '3rem',
          fontWeight: 700
        }}
      />
      <Text style={{ fontSize: '1.1rem', color: '#4a5568', fontWeight: 500 }}>
        {title}
      </Text>
    </Card>
  );
};

export default StatCard;