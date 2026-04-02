/* ============================================
   SHARMA'S GLOBAL EXPORT EXCHANGE
   Main JS — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     NAVBAR — Scroll + Hamburger
     ========================================= */
  const navbar  = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');
  const mobileLinks = mobileMenu?.querySelectorAll('a');

  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileLinks?.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }


  /* =========================================
     INIT ALL MODULES
     ========================================= */
  if (window.ANIMATIONS) {
    ANIMATIONS.initParticleCanvas('hero-canvas');
    ANIMATIONS.initScrollReveals();
    ANIMATIONS.initCarousel('testimonial-carousel');
    ANIMATIONS.initAccordions();
    ANIMATIONS.initChatbot();
  }


  if (window.WHATSAPP) {
    WHATSAPP.init();
  }

  /* =========================================
     LAZY LOADING IMAGES
     ========================================= */
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '0px 0px 200px 0px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  /* =========================================
     SMOOTH SCROLL for anchor links
     ========================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =========================================
     NETLIFY FORM STATUS
     ========================================= */
  document.querySelectorAll('form[data-netlify]').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn?.innerHTML;

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Sending…</span>';
        submitBtn.disabled = true;
      }

      try {
        const data = new FormData(form);
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
        });

        if (res.ok) {
          showToast('✅ Sent! We will be in touch shortly.', 'success');
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        showToast('⚠️ Something went wrong. Please WhatsApp us directly.', 'error');
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }
    });
  });

  /* =========================================
     TOAST NOTIFICATION
     ========================================= */
  function showToast(msg, type = 'info') {
    const existing = document.querySelector('.sge-toast');
    existing?.remove();

    const toast = document.createElement('div');
    toast.className = 'sge-toast';
    toast.textContent = msg;
    toast.style.cssText = `
      position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(20px);
      background: ${type === 'success' ? 'rgba(74,222,128,0.15)' : 'rgba(248,113,113,0.15)'};
      border: 1px solid ${type === 'success' ? 'rgba(74,222,128,0.4)' : 'rgba(248,113,113,0.4)'};
      color: #fff; padding: 0.85rem 2rem; border-radius: 50px; font-size: 0.875rem;
      backdrop-filter: blur(16px); z-index: 9999; font-family: Inter,sans-serif;
      transition: all 0.4s ease; opacity: 0; white-space: nowrap;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  /* =========================================
     LAZY LOADING IMAGES
     ========================================= */
  const lazyImgs = document.querySelectorAll('img[data-src]');
  if (lazyImgs.length) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImgs.forEach(img => imgObserver.observe(img));
  }
});
