import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = ({ children, currentPage, onNavigate, isMobile }) => {
  return (
    <Layout style={{ minHeight: '100vh', direction: 'rtl' }}>
      <Header 
        current={currentPage} 
        onNavigate={onNavigate} 
        isMobile={isMobile} 
      />
      
      <Content style={{ 
        background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)' 
      }}>
        {children}
      </Content>

      <Footer />
    </Layout>
  );
};

export default MainLayout;