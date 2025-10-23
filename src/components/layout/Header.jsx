import { useState, useEffect } from 'react';
import { Menu, Button, Drawer, Typography, Badge } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  InfoCircleOutlined,
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const navigate = useNavigate();
  const location = useLocation();

  // Détecte les différents breakpoints
  const isSmallMobile = windowWidth < 380;
  const isMediumMobile = windowWidth >= 380 && windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Détermine la page actuelle basée sur l'URL
  const getCurrentKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.substring(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'الرئيسية' },
    { key: 'goals', icon: <InfoCircleOutlined />, label: 'أهداف الجمعية' },
    // { key: 'gallery', icon: <PictureOutlined />, label: 'معرض الصور' },
    { key: 'location', icon: <EnvironmentOutlined />, label: 'الموقع' },
    { key: 'contact', icon: <PhoneOutlined />, label: 'اتصل بنا' },
  ];

  const handleMenuClick = (e) => {
    const path = e.key === 'home' ? '/' : `/${e.key}`;
    navigate(path);
    setDrawerVisible(false);
  };

  const isRegisterPage = location.pathname === '/register';
  const isResultsPage = location.pathname === '/results';

  // Fonctions pour les styles adaptatifs
  const getHeaderHeight = () => {
    if (isSmallMobile) return '60px';
    if (isMediumMobile || isMobile) return '65px';
    return '70px';
  };

  const getLogoPrimarySize = () => {
    if (isSmallMobile) return '35px';
    if (isMediumMobile) return '40px';
    if (isTablet) return '50px';
    return '60px';
  };

  const getLogoSecondarySize = () => {
    if (isSmallMobile) return '22px';
    if (isMediumMobile) return '25px';
    if (isTablet) return '28px';
    return '30px';
  };

  const getLogoTextSize = () => {
    if (isSmallMobile) return '13px';
    if (isMediumMobile) return '17px';
    if (isTablet) return '17px';
    return '20px';
  };

  const getLogoTextMaxWidth = () => {
    if (isSmallMobile) return '140px';
    if (isMediumMobile) return '160px';
    if (isTablet) return '200px';
    return 'none';
  };

  const getMenuFontSize = () => {
    if (isTablet) return '13px';
    return '15px';
  };

  const getButtonSize = () => {
    if (isSmallMobile || isMediumMobile) return 'small';
    if (isTablet) return 'middle';
    return 'middle';
  };

  const getButtonFontSize = () => {
    if (isSmallMobile) return '12px';
    if (isMediumMobile) return '13px';
    return '14px';
  };

  const getPadding = () => {
    if (isSmallMobile) return '0 12px';
    if (isMediumMobile) return '0 16px';
    if (isTablet) return '0 20px';
    return '0 24px';
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
        padding: getPadding(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: getHeaderHeight(),
        transition: 'all 0.3s ease'
      }}
    >
      {/* Logo Section */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isSmallMobile ? '8px' : '12px',
        flex: isMobile || isTablet ? 1 : 'initial',
        justifyContent: isMobile || isTablet ? 'center' : 'flex-start',
        minWidth: 0
      }}>
        <img 
          src="/assets/images/شعار.png" 
          alt="شعار" 
          style={{ 
            height: getLogoPrimarySize(),
            borderRadius: '20%',
            flexShrink: 0
          }}
        />
        <img 
          src="/assets/images/images (1).png" 
          alt="علم" 
          style={{ 
            height: getLogoSecondarySize(),
            borderRadius: '20%',
            flexShrink: 0
          }}
        />
        <Text style={{ 
          fontSize: getLogoTextSize(),
          fontWeight: isSmallMobile ? 700 : 600,
          fontFamily: 'Cairo, Tajawal, Arial, sans-serif',
          whiteSpace: 'normal',
          lineHeight: '1.3',
          maxWidth: getLogoTextMaxWidth(),
          color: 'orangered',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          جمعية متطوعون في خدمة الحماية المدنية ببن عروس
        </Text>
      </div>

      {/* Desktop Menu */}
      {isDesktop && (
        <Menu
          mode="horizontal"
          selectedKeys={[getCurrentKey()]}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            justifyContent: 'center',
            border: 'none',
            background: 'transparent',
            fontSize: getMenuFontSize(),
            fontWeight: 600,
            maxWidth: '700px'
          }}
          items={menuItems}
        />
      )}

      {/* Actions */}
      <div style={{ 
        display: 'flex', 
        gap: isSmallMobile ? '6px' : (isMediumMobile ? '8px' : '12px'),
        alignItems: 'center',
        flexShrink: 0
      }}>
        {isDesktop ? (
          <>
            <Link to="/results">
              <Badge dot={isResultsPage} color="#ff6b35">
                <Button 
                  type="default" 
                  icon={<EyeOutlined />}
                  size={getButtonSize()}
                  style={{
                    border: isResultsPage ? '2px solid #ff6b35' : 'none', 
                    fontWeight: 600,
                    fontSize: getButtonFontSize(),
                    transform: isResultsPage ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  الإطلاع على النتائج
                </Button>
              </Badge>
            </Link>
            <Link to="/register">
              <Badge dot={isRegisterPage} color="#ff6b35">
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  size={getButtonSize()}
                  style={{
                    background: isRegisterPage 
                      ? 'linear-gradient(135deg, #ff8c42, #ffb366)' 
                      : 'linear-gradient(135deg, #ff6b35, #ff8c42)',
                    border: isRegisterPage ? '2px solid #ff6b35' : 'none',
                    fontWeight: 600,
                    fontSize: getButtonFontSize(),
                    boxShadow: isRegisterPage 
                      ? '0 4px 12px rgba(255, 107, 53, 0.5)' 
                      : '0 2px 8px rgba(255, 107, 53, 0.3)',
                    transform: isRegisterPage ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  انضم كمتطوع
                </Button>
              </Badge>
            </Link>
          </>
        ) : (
          <Button
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            size={getButtonSize()}
            style={{ 
              border: '1px solid #e2e8f0',
              fontSize: isSmallMobile ? '16px' : '18px'
            }}
          />
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={Math.min(windowWidth * 0.85, 320)}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[getCurrentKey()]}
          onClick={handleMenuClick}
          style={{
            border: 'none',
            fontSize: isSmallMobile ? '16px' : '17px'
          }}
          items={menuItems.map(item => ({
            ...item,
            style: item.key === getCurrentKey() ? {
              color: '#ff6b35',
              fontWeight: 600,
              paddingLeft: '16px',
              borderLeft: '4px solid #ff6b35',
              background: 'rgba(255, 107, 53, 0.05)'
            } : {
              padding: '0px 16px'
            }
          }))}
        />
        <div style={{
          padding: isSmallMobile ? '16px' : '20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Link to="/results" onClick={() => setDrawerVisible(false)}>
            <Button
              block
              type={isResultsPage ? 'primary' : 'default'}
              icon={<EyeOutlined />}
              size={isSmallMobile ? 'middle' : 'large'}
              style={{
                background: isResultsPage
                  ? 'linear-gradient(135deg, #ff8c42, #ffb366)'
                  : 'white',
                border: '2px solid #ff6b35',
                color: isResultsPage ? 'white' : '#ff6b35',
                fontWeight: 600,
                fontSize: isSmallMobile ? '13px' : '14px',
                height: isSmallMobile ? '40px' : '44px'
              }}
            >
              الإطلاع على النتائج
            </Button>
          </Link>
          <Link to="/register" onClick={() => setDrawerVisible(false)}>
            <Button
              block
              type={isRegisterPage ? 'primary' : 'default'}
              icon={<UserAddOutlined />}
              size={isSmallMobile ? 'middle' : 'large'}
              style={{
                background: isRegisterPage
                  ? 'linear-gradient(135deg, #ff8c42, #ffb366)'
                  : 'white',
                border: '2px solid #ff6b35',
                color: isRegisterPage ? 'white' : '#ff6b35',
                fontWeight: 600,
                fontSize: isSmallMobile ? '13px' : '14px',
                height: isSmallMobile ? '40px' : '44px'
              }}
            >
              انضم كمتطوع
            </Button>
          </Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;