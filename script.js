/* ============================================================
   ZOMATO LANDING PAGE CLONE — JavaScript
   Interactive features, animations & micro-interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. NAVBAR SCROLL EFFECT
  // ============================================================
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleNavbarScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ============================================================
  // 2. MOBILE HAMBURGER MENU
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', toggleMobileMenu);

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  // ============================================================
  // 3. FLOATING PARTICLES (Hero Section)
  // ============================================================
  const particlesContainer = document.getElementById('heroParticles');

  const createParticles = () => {
    const particleCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero__particle');

      const size = Math.random() * 4 + 2;
      const posX = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 15;
      const opacity = Math.random() * 0.3 + 0.05;

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${posX}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
      `;

      particlesContainer.appendChild(particle);
    }
  };

  createParticles();

  // ============================================================
  // 4. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ============================================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================================
  // 5. ANIMATED COUNTERS (App Banner Stats)
  // ============================================================
  const statNumbers = document.querySelectorAll('.app-stat__number[data-count]');

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M+';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString() + '+';
  };

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(easedProgress * target);

      el.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = formatNumber(target);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => counterObserver.observe(el));

  // ============================================================
  // 6. SEARCH BAR — Placeholder Rotation
  // ============================================================
  const searchInput = document.getElementById('searchInput');
  const placeholders = [
    'Search for restaurant, cuisine or a dish',
    'Try "Biryani"',
    'Try "Pizza"',
    'Try "Saoji Chicken"',
    'Try "Tarri Poha"',
    'Try "Coffee"',
    'Try "Chinese"',
    'Try "Ice Cream"'
  ];

  let placeholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  const typeEffect = () => {
    const current = placeholders[placeholderIndex];

    if (!isDeleting) {
      searchInput.setAttribute('placeholder', current.substring(0, charIndex + 1));
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      searchInput.setAttribute('placeholder', current.substring(0, charIndex - 1));
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
      }
    }

    const speed = isDeleting ? 30 : 60;
    typingTimeout = setTimeout(typeEffect, speed);
  };

  // Start the typing effect after a brief delay
  setTimeout(typeEffect, 2000);

  // Pause typing when input is focused
  searchInput.addEventListener('focus', () => {
    clearTimeout(typingTimeout);
    searchInput.setAttribute('placeholder', 'Search for restaurant, cuisine or a dish');
  });

  searchInput.addEventListener('blur', () => {
    if (searchInput.value === '') {
      placeholderIndex = 0;
      charIndex = 0;
      isDeleting = false;
      setTimeout(typeEffect, 1000);
    }
  });

  // ============================================================
  // 7. SMOOTH SCROLL FOR SCROLL INDICATOR
  // ============================================================
  const scrollIndicator = document.querySelector('.hero__scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    scrollIndicator.style.cursor = 'pointer';
  }

  // ============================================================
  // 8. PARALLAX EFFECT ON HERO BACKGROUND
  // ============================================================
  const heroBg = document.querySelector('.hero__bg');

  const handleParallax = () => {
    if (window.innerWidth > 768) {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      if (heroBg) {
        heroBg.style.transform = `translateY(${rate}px) scale(1.05)`;
      }
    }
  };

  window.addEventListener('scroll', handleParallax, { passive: true });

  // ============================================================
  // 9. SERVICE CARDS — Tilt Effect on Hover
  // ============================================================
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // ============================================================
  // 10. POPULAR TAGS — Click Feedback
  // ============================================================
  const popularTags = document.querySelectorAll('.hero__popular-tag');

  popularTags.forEach(tag => {
    tag.addEventListener('click', () => {
      searchInput.value = tag.textContent;
      searchInput.focus();

      // Brief visual feedback
      tag.style.transform = 'translateY(-2px) scale(0.95)';
      setTimeout(() => {
        tag.style.transform = '';
      }, 200);
    });
  });

  // ============================================================
  // 11. ACCORDION TAGS — Click to Search
  // ============================================================
  const accordionTags = document.querySelectorAll('.accordion__tag');

  accordionTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Smooth scroll to hero search
      const heroSection = document.getElementById('hero');
      heroSection.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        searchInput.value = tag.textContent;
        searchInput.focus();
      }, 600);
    });
  });

});

// ============================================================
// ACCORDION TOGGLE (Global function for onclick attribute)
// ============================================================
function toggleAccordion(id) {
  const item = document.getElementById(id);
  const isActive = item.classList.contains('active');

  // Close all accordion items
  document.querySelectorAll('.accordion-item').forEach(el => {
    el.classList.remove('active');
  });

  // Toggle clicked item
  if (!isActive) {
    item.classList.add('active');
  }
}
