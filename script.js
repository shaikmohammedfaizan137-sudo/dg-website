/**
 * DG CONSULTANCY — AWARD-WINNING LUXURY MOTION ENGINE
 * Features: Custom Cursor Tracker, Interactive Service Directory, Parallax Vector SVG, and Scroll Observers
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. CUSTOM MINIMAL CURSOR TRACKER (DESKTOP)
  // --------------------------------------------------------------------------
  const cursor = document.getElementById('custom-cursor');
  
  if (cursor && window.innerWidth > 1024) {
    document.body.classList.add('cursor-active');

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const hoverElements = document.querySelectorAll('a, button, .service-nav-item, .impact-moment');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        if (el.classList.contains('btn-primary')) {
          cursor.classList.add('cursor-cta');
          cursor.textContent = 'OPEN';
        } else if (el.classList.contains('insight-card') || el.classList.contains('featured-article-card')) {
          cursor.textContent = 'READ';
        } else {
          cursor.textContent = 'VIEW';
        }
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover', 'cursor-cta');
        cursor.textContent = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. HEADER SCROLL OBSERVER & MOBILE MENU
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');

  const handleHeaderScroll = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  if (mobileNavToggle && mobileNavPanel) {
    mobileNavToggle.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.contains('open');
      if (isOpen) {
        mobileNavPanel.classList.remove('open');
        mobileNavToggle.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileNavPanel.classList.add('open');
        mobileNavToggle.classList.add('open');
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    const mobileLinks = mobileNavPanel.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavPanel.classList.remove('open');
        mobileNavToggle.classList.remove('open');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. HERO MOUSE PARALLAX INTERACTION
  // --------------------------------------------------------------------------
  const heroVisual = document.querySelector('.hero-visual-svg');
  if (heroVisual && window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      heroVisual.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });
  }

  // --------------------------------------------------------------------------
  // 4. INTERACTIVE SERVICE DIRECTORY ENGINE
  // --------------------------------------------------------------------------
  const serviceData = {
    accounting: {
      title: "Accounting",
      headline: "KNOW WHERE THE BUSINESS STANDS.",
      copy: "Accurate financial records give you a clearer picture of performance, position, and the decisions ahead. Our accounting framework ensures compliance, structure, and actionable financial visibility.",
      items: [
        "Bookkeeping & Ledger Maintenance",
        "Financial Statements Preparation",
        "Management Accounts & Variance Analysis",
        "Financial Reporting & Cash Flow Statements"
      ],
      ctaText: "DISCUSS ACCOUNTING →",
      ctaHref: "services/accounting.html",
      image: "assets/images/service-accounting.jpg"
    },
    auditing: {
      title: "Auditing",
      headline: "CONFIDENCE IN THE NUMBERS.",
      copy: "Professional audit support designed to provide greater confidence in financial information and strengthen internal control across your operational ecosystem.",
      items: [
        "Financial Statement Statutory Audits",
        "Internal Audit & Control Evaluation",
        "Risk Assessment & Mitigation Frameworks",
        "Regulatory & Corporate Governance Compliance"
      ],
      ctaText: "DISCUSS AUDITING →",
      ctaHref: "services/auditing.html",
      image: "assets/images/service-auditing.jpg"
    },
    taxation: {
      title: "Taxation",
      headline: "STAY AHEAD OF OBLIGATIONS.",
      copy: "Practical tax support that helps businesses understand their responsibilities, prepare accurately, and avoid unnecessary surprises or penalties.",
      items: [
        "Corporate & Individual Tax Return Filing",
        "VAT Registration, Filings & Reconciliations",
        "Strategic Tax Planning & Advisory",
        "GRA Representation & Audit Defense"
      ],
      ctaText: "DISCUSS TAXATION →",
      ctaHref: "services/taxation.html",
      image: "assets/images/service-taxation.jpg"
    },
    payroll: {
      title: "Payroll",
      headline: "ONE LESS THING TO WORRY ABOUT.",
      copy: "Reliable payroll administration that keeps an essential part of your business running accurately, confidentially, and consistently every single cycle.",
      items: [
        "Monthly & Fortnightly Payroll Processing",
        "NIS & PAYE Tax Statutory Calculation",
        "Confidential Employee Pay Slip Generation",
        "Annual Payroll Returns & Summary Statements"
      ],
      ctaText: "DISCUSS PAYROLL →",
      ctaHref: "services/payroll.html",
      image: "assets/images/service-payroll.jpg"
    },
    consulting: {
      title: "Consulting",
      headline: "WHEN NUMBERS NEED A STRATEGY.",
      copy: "Financial and business guidance when an important strategic decision requires more than a spreadsheet. We bridge financial intelligence with enterprise strategy.",
      items: [
        "Business Incorporation & Entity Setup in Guyana",
        "Financial Modeling & Feasibility Planning",
        "Investment Advisory & Capital Structuring",
        "Regulatory & Commercial Compliance Advisory"
      ],
      ctaText: "DISCUSS CONSULTING →",
      ctaHref: "services/consulting.html",
      image: "assets/images/service-consulting.jpg"
    }
  };

  const navItems = document.querySelectorAll('.service-nav-item');
  const panelHeadline = document.getElementById('service-panel-headline');
  const panelCopy = document.getElementById('service-panel-copy');
  const panelList = document.getElementById('service-panel-list');
  const panelCta = document.getElementById('service-panel-cta');
  const panelImg = document.getElementById('service-panel-img');
  const displayPanel = document.getElementById('service-display-panel');

  if (navItems.length > 0 && displayPanel) {
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const serviceKey = item.getAttribute('data-service');
        const data = serviceData[serviceKey];
        if (!data) return;

        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        displayPanel.style.opacity = '0.35';

        setTimeout(() => {
          if (panelHeadline) panelHeadline.textContent = data.headline;
          if (panelCopy) panelCopy.textContent = data.copy;
          if (panelList) {
            panelList.innerHTML = data.items.map(i => `<div class="service-included-item">${i}</div>`).join('');
          }
          if (panelCta) {
            panelCta.textContent = data.ctaText;
            panelCta.setAttribute('href', data.ctaHref);
          }
          if (panelImg) {
            panelImg.src = data.image;
            panelImg.alt = `DG Consultancy ${data.title} Service`;
          }
          displayPanel.style.opacity = '1';
        }, 140);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. SIGNATURE DG SYSTEM TRANSFORMATION OBSERVER
  // --------------------------------------------------------------------------
  const signatureVis = document.getElementById('signature-visualization');
  const signatureSection = document.getElementById('signature-section');

  if (signatureSection && signatureVis) {
    const signatureObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          signatureVis.classList.add('aligned');
        } else {
          signatureVis.classList.remove('aligned');
        }
      });
    }, { threshold: 0.3 });

    signatureObserver.observe(signatureSection);
  }

  // --------------------------------------------------------------------------
  // 6. GENERAL SCROLL REVEAL OBSERVER
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // --------------------------------------------------------------------------
  // 7. CONTACT FORM HANDLING
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'START THE CONVERSATION →';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'PROCESSING ENQUIRY...';
      }

      setTimeout(() => {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.innerHTML = `
            <div style="padding: 1.25rem; background-color: #EEF7EE; border-left: 4px solid #2E7D32; color: #1B5E20; font-size: 0.9rem; font-weight: 700;">
              Thank you. Your consultation request has been received. Our team will respond within 24 hours.
            </div>
          `;
        }
        
        contactForm.reset();
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 900);
    });
  }
});
