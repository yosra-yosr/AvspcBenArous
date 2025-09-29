import React from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children, isMobile }) => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: '#f5f7fa',
      direction:'rtl',
    }}>
      <Header isMobile={isMobile} />
      
      <main style={{ 
        flex: 1,
        paddingTop: isMobile ? '60px' : '70px'
      }}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;