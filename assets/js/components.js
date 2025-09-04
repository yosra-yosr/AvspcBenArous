// components.js - Système de composants réutilisables
class WebComponents {
  constructor() {
    this.currentPage = this.detectCurrentPage();
    this.basePath = this.calculateBasePath();
    this.init();
  }

  init() {
    this.injectCSS();
    this.createNavbar();
    this.createFooter();
    this.setupEventListeners();
  }

  detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop().toLowerCase();
    
    // Map filenames to page identifiers
    const pageMap = {
      'index.html': 'home',
      'index1.html': 'objectives',
      'objectives.html': 'objectives',
      'index3.html': 'gallery', 
      'gallery.html': 'gallery',
      'index4.html': 'contact',
      'contact.html': 'contact',
      'localMap.html': 'localMap',
      'results.html': 'results',
      'résultats.html': 'results'
    };

    return pageMap[filename] || 'home';
  }

  calculateBasePath() {
    const path = window.location.pathname;
    // If in subdirectory (pages/), go up one level
    return path.includes('/pages/') ? '../' : './';
  }

  injectCSS() {
    const css = `
      <style>
        /* Navbar Styles */
        .modern-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e2e8f0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
          transition: all 0.3s ease;
          direction: rtl;
        }

        .modern-navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #1a202c;
        }

        .navbar-brand img {
          height: 35px;
          border-radius: 4px;
        }

        .navbar-brand .logo-main {
          height: 45px !important;
        }

        .navbar-brand-text {
          font-weight: 700;
          font-size: 14px;
          color: #ff6b35;
          display: contents;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #1a202c;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: #ff6b35;
          color: white;
          text-decoration: none;
        }

        .nav-link.active {
          background: #ff6b35;
          color: white;
        }

        .nav-link i {
          font-size: 16px;
        }

        .navbar-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-primary-custom {
          background: linear-gradient(135deg, #ff6b35, #ff8c42);
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          font-size: 14px;
          box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-primary-custom:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
          color: white;
          text-decoration: none;
        }

        .btn-secondary-custom {
          background: transparent;
          color: #1a202c;
          padding: 8px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-weight: 500;
          text-decoration: none;
          font-size: 14px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-secondary-custom:hover {
          background: #1a202c;
          color: white;
          text-decoration: none;
        }

        /* Mobile Menu */
        .mobile-menu-toggle {
          display: none;
          background: none;
          border: 1px solid #e2e8f0;
          color: #1a202c;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 16px;
        }

        .mobile-menu-toggle:hover {
          background: #e2e8f0;
        }

        .mobile-menu {
          position: fixed;
          top: 70px;
          right: -100%;
          width: 280px;
          height: calc(100vh - 70px);
          background: white;
          border-left: 1px solid #e2e8f0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          transition: right 0.3s ease;
          z-index: 999;
          overflow-y: auto;
          direction: rtl;
        }

        .mobile-menu.active {
          right: 0;
        }

        .mobile-nav {
          padding: 20px 0;
        }

        .mobile-nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          color: #1a202c;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .mobile-nav a:hover,
        .mobile-nav a.active {
          background: #ff6b35;
          color: white;
        }

        .mobile-actions {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px solid #e2e8f0;
        }

        .mobile-overlay {
          position: fixed;
          top: 70px;
          left: 0;
          width: 100%;
          height: calc(100vh - 70px);
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        /* Footer Styles */
        .modern-footer {
          background: #1a202c;
          color: white;
          padding: 40px 20px;
          text-align: center;
          margin-top: 60px;
          direction: rtl;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: #ff8c42;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-links a:hover {
          color: #ffcc00;
          text-decoration: none;
        }

        .footer-text {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        /* Body adjustment for fixed navbar */
        body.has-navbar {
          padding-top: 70px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .navbar-brand-text {
            display: none ;
          }
        }

        @media (max-width: 768px) {
          .modern-navbar {
            height: 60px;
            padding: 0 16px;
          }

          .navbar-nav,
          .navbar-actions .btn-secondary-custom {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .mobile-menu {
            top: 60px;
            height: calc(100vh - 60px);
            width: 100%;
          }

          .mobile-overlay {
            top: 60px;
            height: calc(100vh - 60px);
          }

          body.has-navbar {
            padding-top: 60px;
          }

          .footer-links {
            flex-direction: column;
            gap: 15px;
          }
        }

        @media (max-width: 480px) {
          .navbar-brand img {
            height: 30px;
          }

          .navbar-brand .logo-main {
            height: 35px !important;
          }
        }
      </style>
    `;

    document.head.insertAdjacentHTML('beforeend', css);
  }

  createNavbar() {
    const navItems = this.getNavigationItems();
    
    const navbarHTML = `
      <!-- Modern Navbar -->
      <nav class="modern-navbar" id="navbar">
        <!-- Brand -->
        <a class="navbar-brand" href="index.html">
          <img src="${this.basePath}assets/images/tunisiaFlag.png" alt="Tunisia Flag" />
          <img src="${this.basePath}assets/images/شعار.png" alt="شعار الجمعية" class="logo-main"/>
          <span class="navbar-brand-text">جمعية متطوعون في خدمة الحماية المدنية بن عروس</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="navbar-nav">
          ${navItems.map(item => this.createNavItem(item)).join('')}
        </ul>

        <!-- Actions -->
        <div class="navbar-actions">
          <a href="${this.basePath}pages/results.html" class="btn-secondary-custom">
            <i class="fas fa-sign-in-alt"></i>
            <span>تسجيل الدخول</span>
          </a>
          <a href="${this.basePath}pages/register.html" class="btn-primary-custom">
            <i class="fas fa-user-plus"></i>
            <span>التسجيل في تطوع</span>
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
          <i class="fas fa-bars"></i>
        </button>
      </nav>

      <!-- Mobile Overlay -->
      <div class="mobile-overlay" id="mobileOverlay" onclick="toggleMobileMenu()"></div>

      <!-- Mobile Menu -->
      <nav class="mobile-menu" id="mobileMenu">
        <div class="mobile-nav">
          <ul>
            ${navItems.map(item => this.createMobileNavItem(item)).join('')}
          </ul>
        </div>
        
        <div class="mobile-actions">
          <a href="${this.basePath}pages/results.html" class="btn-secondary-custom">
            <i class="fas fa-sign-in-alt"></i>
            <span>تسجيل الدخول</span>
          </a>
          <a href="${this.basePath}pages/register.html">
            <i class="fas fa-user-plus"></i>
            <span>التسجيل في تطوع</span>
          </a>
        </div>
      </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.classList.add('has-navbar');
  }

  createFooter() {
    const footerHTML = `
      <!-- Modern Footer -->
      <footer class="modern-footer">
        <div class="footer-links">
          <a href="https://www.facebook.com/AVSPCBNAROUS" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook-f"></i>
            صفحتنا على فيسبوك
          </a>
          <a href="mailto:avspcbenarous2023@gmail.com">
            <i class="fas fa-envelope"></i>
            البريد الإلكتروني
          </a>
          <a href="tel:+21656202702">
            <i class="fas fa-phone"></i>
            اتصل بنا
          </a>
          <a href="https://maps.app.goo.gl/PqiA7zasEwRNsPk87" target="_blank">
            <i class="fas fa-map-marker-alt"></i>
            خريطة الموقع
          </a>
        </div>
        <p class="footer-text">
          حقوق الطبع والنشر © ${new Date().getFullYear()} جمعية متطوعون في خدمة الحماية المدنية بن عروس
        </p>
      </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  getNavigationItems() {
    return [
      {
        id: 'home',
        href: 'index.html',
        icon: 'fas fa-home',
        text: 'الرئيسية'
      },
      {
        id: 'objectives',
        href: 'pages/objectives.html',
        icon: 'fas fa-bullseye',
        text: 'أهداف الجمعية'
      },
      {
        id: 'gallery',
        href: 'pages/gallery.html',
        icon: 'fas fa-image',
        text: 'معرض الصور'
      },
       {
        id: 'LocalMap',
        href: 'pages/localMap.html',
        icon: 'fas fa-map-marker-alt',
        text: 'خريطة الموقع'
      },
      {
        id: 'contact',
        href: 'pages/contact.html',
        icon: 'fas fa-phone',
        text: 'اتصل بنا'
      }
    ];
  }

  createNavItem(item) {
    const isActive = this.currentPage === item.id;
    const href = item.external ? item.href : this.basePath + item.href;
    
    return `
      <li>
        <a class="nav-link ${isActive ? 'active' : ''}" 
           href="${href}"
           ${item.external ? 'target="_blank"' : ''}
           ${isActive ? 'aria-current="page"' : ''}>
          <i class="${item.icon}"></i>
          <span>${item.text}</span>
        </a>
      </li>
    `;
  }

  createMobileNavItem(item) {
    const isActive = this.currentPage === item.id;
    const href = item.external ? item.href : this.basePath + item.href;
    
    return `
      <li>
        <a class="${isActive ? 'active' : ''}" 
           href="${href}"
           ${item.external ? 'target="_blank"' : ''}
           onclick="toggleMobileMenu()">
          <i class="${item.icon}"></i>
          <span>${item.text}</span>
        </a>
      </li>
    `;
  }

  setupEventListeners() {
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });

    // Mobile menu toggle function
    window.toggleMobileMenu = () => {
      const menu = document.getElementById('mobileMenu');
      const overlay = document.getElementById('mobileOverlay');
      const isActive = menu.classList.contains('active');
      
      menu.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = isActive ? 'auto' : 'hidden';
    };

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const menu = document.getElementById('mobileMenu');
        if (menu.classList.contains('active')) {
          window.toggleMobileMenu();
        }
      }
    });

    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Static utility methods
  static showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      padding: 15px;
      border-radius: 8px;
      color: white;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  static preloadImages(images, basePath = './') {
    images.forEach(src => {
      const img = new Image();
      img.src = basePath + src;
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new WebComponents();
  
  // Preload common images
  WebComponents.preloadImages([
    'assets/images/شعار.png',
    'assets/images/tunisiaFlag.png',
    'assets/images/images (1).png'
  ]);
});

// Export for use in other scripts
window.WebComponents = WebComponents;