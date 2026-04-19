// Digix Link - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Header Scroll Effect
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Fade-in Animation on Scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
  
  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();
      
      // Validation
      let isValid = true;
      let errorMessage = '';
      
      if (!name) {
        isValid = false;
        errorMessage = 'Please enter your name.';
      } else if (!email) {
        isValid = false;
        errorMessage = 'Please enter your email address.';
      } else if (!isValidEmail(email)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      } else if (!message) {
        isValid = false;
        errorMessage = 'Please enter your message.';
      }
      
      if (!isValid) {
        showNotification(errorMessage, 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showNotification('Thank you! We\'ll be in touch soon.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // Email Validation Helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Notification System
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '100px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: '600',
      zIndex: '9999',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      animation: 'slideIn 0.3s ease',
      maxWidth: '400px'
    });
    
    // Set background color based on type
    if (type === 'success') {
      notification.style.background = '#10b981';
    } else if (type === 'error') {
      notification.style.background = '#ef4444';
    } else {
      notification.style.background = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }
  
  // Add notification animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Dropdown Menu Enhancement (for better mobile support)
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');
    
    if (dropdownLink && window.innerWidth < 1024) {
      dropdownLink.addEventListener('click', function(e) {
        e.preventDefault();
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (menu) {
          const isVisible = menu.style.visibility === 'visible';
          
          // Close all other dropdowns
          document.querySelectorAll('.dropdown-menu').forEach(m => {
            m.style.opacity = '0';
            m.style.visibility = 'hidden';
            m.style.transform = 'translateX(-50%) translateY(10px)';
          });
          
          // Toggle current dropdown
          if (!isVisible) {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateX(-50%) translateY(0)';
          }
        }
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (window.innerWidth >= 1024) {
          menu.style.opacity = '';
          menu.style.visibility = '';
          menu.style.transform = '';
        } else {
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
        }
      });
    }
  });
  
  // Counter Animation for Stats
  const statNumbers = document.querySelectorAll('.stat-item h4');
  
  const animateCounter = (element) => {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasX = text.includes('x');
    
    const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let currentValue = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
      currentValue += increment;
      
      if (currentValue >= numericValue) {
        currentValue = numericValue;
        clearInterval(timer);
      }
      
      let displayValue = currentValue;
      if (Number.isInteger(numericValue)) {
        displayValue = Math.round(currentValue);
      } else {
        displayValue = currentValue.toFixed(1);
      }
      
      let suffix = '';
      if (hasPlus) suffix += '+';
      if (hasPercent) suffix += '%';
      if (hasX) suffix += 'x';
      
      element.textContent = displayValue + suffix;
    }, stepTime);
  };
  
  // Observe stat elements
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => statsObserver.observe(stat));
  
  // Active Navigation Link Highlighting
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.style.color = 'var(--primary-blue)';
    }
  });
  
});
