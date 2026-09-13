/**
 * DG CONSULTANCY — FINANCIAL BRAND INTERACTION ENGINE
 * Features: Custom Cursor, Interactive Service Directory, Business Stages Engine, 
 * Regional Map Switcher, and Scroll Observers
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

    const hoverElements = document.querySelectorAll('a, button, .service-tab-item, .stage-tab, .why-card-v3, .pipeline-step-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        if (el.classList.contains('btn-rect-primary')) {
          cursor.textContent = 'OPEN';
        } else if (el.classList.contains('featured-insight-card-v3') || el.classList.contains('side-insight-card-v3')) {
          cursor.textContent = 'READ';
        } else {
          cursor.textContent = 'VIEW';
        }
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursor.textContent = '';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 2. HEADER SCROLL OBSERVER & MOBILE MENU DRAWER
  // --------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');

  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
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
  // 3. INTERACTIVE SERVICE DIRECTORY ENGINE (5 CORE SERVICES)
  // --------------------------------------------------------------------------
  const serviceData = {
    accounting: {
      tag: "CORE PRACTICE 01",
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
      tag: "CORE PRACTICE 02",
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
      tag: "CORE PRACTICE 03",
      title: "Taxation",
      headline: "STAY AHEAD OF OBLIGATIONS.",
      copy: "Practical tax support that helps businesses understand their responsibilities, prepare accurately, and avoid unnecessary surprises or penalties with GRA.",
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
      tag: "CORE PRACTICE 04",
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
      tag: "CORE PRACTICE 05",
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

  const serviceTabs = document.querySelectorAll('.service-tab-item');
  const panelTag = document.getElementById('service-panel-tag');
  const panelHeadline = document.getElementById('service-panel-headline');
  const panelCopy = document.getElementById('service-panel-copy');
  const panelList = document.getElementById('service-panel-list');
  const panelCta = document.getElementById('service-panel-cta');
  const panelImg = document.getElementById('service-panel-img');
  const displayPanel = document.getElementById('service-display-panel');

  if (serviceTabs.length > 0 && displayPanel) {
    serviceTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-service');
        const data = serviceData[key];
        if (!data) return;

        serviceTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        displayPanel.style.opacity = '0.35';

        setTimeout(() => {
          if (panelTag) panelTag.textContent = data.tag;
          if (panelHeadline) panelHeadline.textContent = data.headline;
          if (panelCopy) panelCopy.textContent = data.copy;
          if (panelList) {
            panelList.innerHTML = data.items.map(i => `<div class="service-list-item">${i}</div>`).join('');
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
  // 4. BUSINESS STAGES SWITCHER (STARTING, GROWING, ESTABLISHED, CHANGING)
  // --------------------------------------------------------------------------
  const stageData = {
    starting: {
      tag: "BUSINESS STAGE 01",
      headline: "BUILD THE FINANCIAL FOUNDATION CORRECTLY.",
      copy: "Early decisions set the trajectory for long-term commercial growth. We help new enterprises establish structured chart of accounts, tax registrations, NIS setup, and clear compliance procedures right from inception.",
      highlights: [
        "&bull; Business Incorporation & Regulatory Filings in Guyana",
        "&bull; GRA Tax & NIS Employer Registration",
        "&bull; Accounting System Setup & Chart of Accounts"
      ],
      image: "assets/images/approach-precision.jpg"
    },
    growing: {
      tag: "BUSINESS STAGE 02",
      headline: "KEEP PACE WITH INCREASING COMPLEXITY.",
      copy: "As revenue and headcount expand, informal bookkeeping breaks down. We introduce monthly management accounts, cash flow forecasting, inventory controls, and payroll automation.",
      highlights: [
        "&bull; Monthly Management Accounting & Cash Flow Radar",
        "&bull; Automated Confidential Payroll Administration",
        "&bull; Working Capital Optimization & Cost Analysis"
      ],
      image: "assets/images/hero-executive-guyana.jpg"
    },
    established: {
      tag: "BUSINESS STAGE 03",
      headline: "IMPROVE REPORTING, CONTROLS & VISIBILITY.",
      copy: "For mature enterprises requiring rigorous governance and statutory audit readiness. We refine internal control frameworks, conduct independent audits, and ensure total compliance.",
      highlights: [
        "&bull; Statutory Audits & Financial Statement Assurance",
        "&bull; Internal Control & Risk Mitigation Reviews",
        "&bull; Tax Compliance Planning & Advisory"
      ],
      image: "assets/images/about-hands.jpg"
    },
    changing: {
      tag: "BUSINESS STAGE 04",
      headline: "NAVIGATE RESTRUCTURING & EXPANSION.",
      copy: "When embarking on acquisitions, joint ventures, or major capital investments. We provide financial modeling, valuation analysis, entity structuring, and commercial advice.",
      highlights: [
        "&bull; Financial Modeling & Feasibility Planning",
        "&bull; Commercial Joint Venture Advisory in Guyana",
        "&bull; Corporate Restructuring & Tax Strategy"
      ],
      image: "assets/images/service-consulting.jpg"
    }
  };

  const stageTabs = document.querySelectorAll('.stage-tab');
  const stageTag = document.getElementById('stage-card-tag');
  const stageHeadline = document.getElementById('stage-card-headline');
  const stageCopy = document.getElementById('stage-card-copy');
  const stageHighlights = document.getElementById('stage-card-highlights');
  const stageImg = document.getElementById('stage-card-img');
  const stageCard = document.getElementById('stage-display-card');

  if (stageTabs.length > 0 && stageCard) {
    stageTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-stage');
        const data = stageData[key];
        if (!data) return;

        stageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        stageCard.style.opacity = '0.35';

        setTimeout(() => {
          if (stageTag) stageTag.textContent = data.tag;
          if (stageHeadline) stageHeadline.textContent = data.headline;
          if (stageCopy) stageCopy.textContent = data.copy;
          if (stageHighlights) {
            stageHighlights.innerHTML = data.highlights.map(h => `<div class="highlight-item">${h}</div>`).join('');
          }
          if (stageImg) stageImg.src = data.image;
          stageCard.style.opacity = '1';
        }, 140);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. REGIONAL MAP VS GOOGLE STREET MAP SWITCHER
  // --------------------------------------------------------------------------
  const btnSvgMap = document.getElementById('btn-svg-map');
  const btnGmap = document.getElementById('btn-gmap');
  const svgMapPanel = document.getElementById('guyana-svg-container');
  const gmapPanel = document.getElementById('guyana-gmap-container');

  if (btnSvgMap && btnGmap && svgMapPanel && gmapPanel) {
    btnSvgMap.addEventListener('click', () => {
      btnSvgMap.classList.add('active');
      btnGmap.classList.remove('active');
      svgMapPanel.style.display = 'block';
      gmapPanel.style.display = 'none';
    });

    btnGmap.addEventListener('click', () => {
      btnGmap.classList.add('active');
      btnSvgMap.classList.remove('active');
      gmapPanel.style.display = 'block';
      svgMapPanel.style.display = 'none';
    });
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
  // 8. HEADER SCROLL PROGRESS BAR
  // --------------------------------------------------------------------------
  const scrollProgress = document.getElementById('header-scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = `${scrolled}%`;
    }, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 9. HERO AMBIENT PARTICLE GRID CANVAS
  // --------------------------------------------------------------------------
  const heroCanvas = document.getElementById('hero-particle-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
    let height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
      height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
    });

    const particles = [];
    const particleCount = Math.min(65, Math.floor(width / 20));

    for (let i = 0; i < particleCount; i++) {
      const randColor = Math.random();
      let color, glowColor;
      if (randColor > 0.6) {
        color = 'rgba(7, 143, 200, 0.68)';
        glowColor = 'rgba(7, 143, 200, 0.25)';
      } else if (randColor > 0.3) {
        color = 'rgba(247, 148, 50, 0.72)';
        glowColor = 'rgba(247, 148, 50, 0.3)';
      } else {
        color = 'rgba(56, 189, 248, 0.68)';
        glowColor = 'rgba(56, 189, 248, 0.25)';
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2.2 + 1.8,
        color: color,
        glowColor: glowColor
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Node Glow Ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        // Core Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (0.32 - (dist / 140) * 0.32);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(7, 143, 200, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // --------------------------------------------------------------------------
  // 10. SPOTLIGHT CURSOR GLOW CARD TRACKER
  // --------------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll('.spotlight-card, .why-card-v3, .principle-card, .pipeline-step-card, .featured-insight-card-v3, .side-insight-card-v3');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --------------------------------------------------------------------------
  // 11. NUMBER COUNTER ROLL-UPS
  // --------------------------------------------------------------------------
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = parseInt(target.getAttribute('data-counter'), 10);
          if (isNaN(endValue)) return;
          
          const prefix = target.textContent.includes('+') ? '+' : '';
          const suffix = target.textContent.includes('%') ? '%' : '';
          let startValue = 0;
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * endValue);
            
            target.textContent = `${prefix}${currentValue}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(counter => counterObserver.observe(counter));
  }
});
