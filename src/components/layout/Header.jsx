import { useState, useEffect } from 'react';
import { Menu, Button, Drawer, Typography } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  EyeOutlined,
  PhoneOutlined,
  UserAddOutlined,
  MenuOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const Header = ({ isMobile }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Détermine la page actuelle basée sur l'URL
  const getCurrentKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.substring(1); // Enlève le "/" au début
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'الرئيسية' },
    { key: 'goals', icon: <InfoCircleOutlined />, label: 'أهداف الجمعية' },
    { key: 'gallery', icon: <PictureOutlined />, label: 'معرض الصور' },
    { key: 'location', icon: <EnvironmentOutlined />, label: 'الموقع' },
    { key: 'contact', icon: <PhoneOutlined />, label: 'اتصل بنا' },
  ];

  const handleMenuClick = (e) => {
    const path = e.key === 'home' ? '/' : `/${e.key}`;
    navigate(path);
    setDrawerVisible(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: scrolled ? '0 4px 12px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: isMobile ? '60px' : '70px',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Logo Section */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        flex: isMobile ? 1 : 'initial',
        justifyContent: isMobile ? 'center' : 'flex-start'
      }}>
        <img 
          src="/assets/images/شعار.png" 
          alt="شعار" 
          style={{ height: isMobile ? '40px' : '60px', borderRadius: '20%' }}
        />
        <img 
          src="/assets/images/images (1).png" 
          alt="علم" 
          style={{ height: isMobile ? '25px' : '30px', borderRadius: '20%' }}
        />
        <Text style={{ 
          fontSize: isMobile ? '18px' : '20px',
          fontWeight: isMobile ? 600 : 500,
          fontFamily: isMobile ? 'Cairo, Tajawal, Arial, sans-serif' : 'inherit',
          whiteSpace: isMobile ? 'normal' : 'nowrap',
          lineHeight: isMobile ? '1.3' : 'normal',
          maxWidth: isMobile ? '160px' : 'none',
          color: 'orangered'
        }}>
          جمعية متطوعون في خدمة الحماية المدنية ببن عروس
        </Text>
      </div>

      {/* Desktop Menu */}
      {!isMobile && (
        <Menu
          mode="horizontal"
          selectedKeys={[getCurrentKey()]}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            fontSize: '14px',
            fontWeight: 500
          }}
          items={menuItems}
        />
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {!isMobile ? (
          <>
            <Link to="/results">
              <Button type="default" icon={<EyeOutlined />}>
               الإطلاع على النتائج
              </Button>
            </Link>
            <Link to="/register">
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                  border: 'none',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)'
                }}
              >
                انضم كمتطوع
              </Button>
            </Link>
          </>
        ) : (
          <Button
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{ border: '1px solid #e2e8f0' }}
          />
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[getCurrentKey()]}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
          items={menuItems}
        />
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid #e2e8f0', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px' 
        }}>
          <Link to="/results"  onClick={handleMenuClick}>
            <Button block type="default" icon={<EyeOutlined />}>
              الإطلاع على النتائج
            </Button>
          </Link>
          <Link to="/register"  onClick={handleMenuClick}>
            <Button block type="primary" icon={<UserAddOutlined />}>
              انضم كمتطوع
            </Button>
          </Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;