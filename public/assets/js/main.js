// assets/js/main.js - JavaScript principal pour les composants

class SiteComponents {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  init() {
    this.loadComponents();
    this.setupNavbarEffects();
    this.setupMobileMenu();
    this.preloadImages();
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename.includes('objectives') || filename.includes('index1')) return 'objectives';
    if (filename.includes('gallery') || filename.includes('index3')) return 'gallery';
    if (filename.includes('contact') || filename.includes('index4')) return 'contact';
    return 'home';
  }

  loadComponents() {
    this.createNavbar();
    this.createFooter();
  }

  createNavbar() {
    const navbarHTML = `
      <!-- Bootstrap Navbar -->
      <nav class="navbar navbar-expand-lg" id="navbar">
        <div class="container-fluid px-3">
          <!-- Brand/Logo -->
          <a class="navbar-brand" href="${this.getBasePath()}index.html">
            <img src="${this.getBasePath()}/assets/images/tunisiaFlag.png" alt="Tunisia Flag" />
            <img src="${this.getBasePath()}/assets/images/شعار.png" alt="شعار الجمعية" class="logoAVSPC"/>
            <p class="d-none d-xl-block">جمعية متطوعون في خدمة الحماية المدنية بن عروس</p>
          </a>

          <!-- Mobile Register Button -->
          <div class="d-lg-none d-flex align-items-center gap-2 order-2">
            <a href="https://forms.office.com/r/0c9EtvtE4r" target="_blank" class="btn-primary-custom">
              <i class="fas fa-user-plus"></i>
              <span class="d-none d-sm-inline">التسجيل</span>
            </a>
          </div>

          <!-- Mobile Menu Toggler -->
          <button class="navbar-toggler order-3 order-lg-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Desktop Navigation -->
          <div class="collapse navbar-collapse order-lg-2">
            <ul class="navbar-nav mx-auto">
              ${this.generateNavItems('mobile')}
          </ul>
          
          <!-- Action Buttons -->
          <div class="offcanvas-actions">
            <a href="${this.getBasePath()}pages/results.html" class="btn-secondary-custom">
              <i class="fas fa-sign-in-alt"></i>
              <span>تسجيل الدخول</span>
            </a>
            <a href="https://forms.office.com/r/0c9EtvtE4r" target="_blank" class="btn-primary-custom">
              <i class="fas fa-user-plus"></i>
              <span>التسجيل في تطوع</span>
            </a>
          </div>
        </div>
      </div>
    `;

    // Insert navbar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    document.body.classList.add('has-modern-navbar');
  }

  generateNavItems(type = 'desktop') {
    const navItems = [
      {
        href: 'index.html',
        icon: 'fas fa-home',
        text: 'الرئيسية',
        id: 'home'
      },
      {
        href: 'pages/objectives.html',
        icon: 'fas fa-bullseye',
        text: 'أهداف الجمعية',
        id: 'objectives'
      },
      {
        href: 'pages/gallery.html',
        icon: 'fas fa-image',
        text: 'معرض الصور',
        id: 'gallery'
      },
      {
        href: 'https://maps.app.goo.gl/PqiA7zasEwRNsPk87',
        icon: 'fas fa-map-marker-alt',
        text: 'خريطة الموقع',
        id: 'map',
        external: true
      },
      {
        href: 'pages/contact.html',
        icon: 'fas fa-phone',
        text: 'اتصل بنا',
        id: 'contact'
      }
    ];

    const basePath = this.getBasePath();
    
    return navItems.map(item => {
      const href = item.external ? item.href : basePath + item.href;
      const activeClass = this.currentPage === item.id ? ' active' : '';
      const target = item.external ? ' target="_blank"' : '';
      const ariaCurrent = activeClass ? ' aria-current="page"' : '';
      
      return `
        <li class="nav-item">
          <a class="nav-link${activeClass}" href="${href}"${target}${ariaCurrent}>
            <i class="${item.icon}"></i>
            <span>${item.text}</span>
          </a>
        </li>
      `;
    }).join('');
  }

  getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      return '../';
    }
    return './';
  }

  createFooter() {
    const footerHTML = `
      <!-- Footer -->
      <footer class="footer">
        <div class="container-fluid">
          <div class="footer-links">
            <a href="https://www.facebook.com/AVSPCBNAROUS" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook-f me-2"></i>
              صفحتنا على فيسبوك
            </a>
            <a href="mailto:avspcbenarous2023@gmail.com">
              <i class="fas fa-envelope me-2"></i>
              البريد الإلكتروني
            </a>
            <a href="tel:+21656202702">
              <i class="fas fa-phone me-2"></i>
              اتصل بنا
            </a>
          </div>
          <p>حقوق الطبع والنشر © ${new Date().getFullYear()} جمعية متطوعون في خدمة الحماية المدنية بن عروس</p>
        </div>
      </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  setupNavbarEffects() {
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  setupMobileMenu() {
    // Close offcanvas when clicking on nav links
    document.addEventListener('click', (e) => {
      if (e.target.closest('.navbar-nav .nav-link')) {
        const offcanvasElement = document.getElementById('offcanvasNavbar');
        if (offcanvasElement && window.bootstrap) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
          if (offcanvas) {
            offcanvas.hide();
          }
        }
      }
    });

    // Legacy menu toggle support
    window.toggleMenu = () => {
      const menu = document.getElementById("sideMenu");
      if (menu) {
        menu.classList.toggle("active");
      }
    };
  }

  preloadImages() {
    const images = [
      'شعار.png',
      'tunisiaFlag.png',
      'images (1).png'
    ];

    const basePath = this.getBasePath() + 'assets/images/';
    
    images.forEach(src => {
      const img = new Image();
      img.src = basePath + src;
    });
  }

  // Utility methods for pages
  static showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  static animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    });

    document.querySelectorAll('.card, .grid > *').forEach(el => {
      observer.observe(el);
    });
  }

  static initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = {
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
      };

      // Validation
      if (!data.email || !data.phone || !data.message) {
        SiteComponents.showNotification('يرجى ملء جميع الحقول المطلوبة', 'warning');
        return;
      }

      // Phone validation
      const phonePattern = /^[0-9]{8,15}$/;
      if (!phonePattern.test(data.phone.replace(/\s+/g, ''))) {
        SiteComponents.showNotification('يرجى إدخال رقم هاتف صالح', 'error');
        return;
      }

      // Simulate form submission
      SiteComponents.showNotification('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.', 'success');
      form.reset();
    });
  }

  static initGallery() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    // Create popup for image viewing
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'popup';
    popup.innerHTML = `
      <span class="close-btn" onclick="closePopup()">×</span>
      <img id="popup-img" src="" alt="صورة مكبرة">
    `;
    document.body.appendChild(popup);

    // Add click handlers to images
    gallery.querySelectorAll('.image-card img').forEach(img => {
      img.addEventListener('click', () => {
        popup.style.display = 'flex';
        document.getElementById('popup-img').src = img.src;
      });
    });

    // Close popup function
    window.closePopup = () => {
      popup.style.display = 'none';
    };

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        window.closePopup();
      }
    });
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SiteComponents();
  
  // Initialize page-specific features
  SiteComponents.animateOnScroll();
  SiteComponents.initContactForm();
  SiteComponents.initGallery();
});

// Export for use in other scripts
window.SiteComponents = SiteComponents;generateNavItems()