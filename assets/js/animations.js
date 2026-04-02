/* ============================================
   SHARMA'S GLOBAL EXPORT EXCHANGE
   Animations — animations.js
   (Particle canvas + Intersection Observer reveals)
   ============================================ */

/* =========================================
   PARTICLE CANVAS
   ========================================= */
function initParticleCanvas(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.8 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.gold = Math.random() > 0.65; // 35% gold, rest white
  }

  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
  };

  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.gold
      ? `rgba(201, 168, 76, ${this.alpha})`
      : `rgba(248, 246, 241, ${this.alpha * 0.5})`;
    ctx.fill();
  };

  function initParticles() {
    const count = Math.floor((W * H) / 10000);
    particles = [];
    for (let i = 0; i < Math.min(count, 120); i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201, 168, 76, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(draw);
  }

  resize();
  initParticles();
  draw();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  // Pause when not visible (performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      draw();
    }
  });
}

/* =========================================
   INTERSECTION OBSERVER — SCROLL REVEALS
   ========================================= */
function initScrollReveals() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  revealEls.forEach(el => observer.observe(el));
}

/* =========================================
   TESTIMONIAL CAROUSEL
   ========================================= */
function initCarousel(carouselId) {
  const wrap = document.getElementById(carouselId);
  if (!wrap) return;

  const track = wrap.querySelector('.carousel__track');
  const slides = wrap.querySelectorAll('.carousel__slide');
  const dots = wrap.querySelectorAll('.carousel__dot');
  const btnPrev = wrap.querySelector('.carousel__btn--prev');
  const btnNext = wrap.querySelector('.carousel__btn--next');

  let current = 0;
  let autoTimer;

  function go(idx) {
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => go(current + 1), 5000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  if (btnPrev) btnPrev.addEventListener('click', () => { stopAuto(); go(current - 1); startAuto(); });
  if (btnNext) btnNext.addEventListener('click', () => { stopAuto(); go(current + 1); startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); go(i); startAuto(); }));

  go(0);
  startAuto();
}

/* =========================================
   ACCORDION
   ========================================= */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));

      // Open clicked if was closed
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* =========================================
   CHATBOT
   ========================================= */
const CHATBOT_QA = [
  { q: ['minimum order', 'moq', 'min order'], a: "Our minimum order quantity varies by product. Please submit an RFQ for a specific quote tailored to your needs." },
  { q: ['paypal', 'pay pal', 'payment method'], a: "Yes, PayPal is accepted! We make payment easy and secure for international buyers." },
  { q: ['currency', 'currencies', 'usd', 'inr'], a: "We accept payments in both USD (US Dollars) and INR (Indian Rupees)." },
  { q: ['shipping time', 'delivery time', 'how long'], a: "Shipping typically takes 15–30 days depending on destination and shipping method." },
  { q: ['sample', 'trial order'], a: "Yes! Contact us via WhatsApp or submit an RFQ to request samples before placing a bulk order." },
  { q: ['documentation', 'documents', 'export doc'], a: "Yes, we handle all standard export documents including commercial invoice, packing list, and Bill of Lading." },
  { q: ['countries', 'where do you ship', 'which countries', 'destination'], a: "We ship globally! Submit an RFQ with your destination country and we'll provide a shipping quote." },
  { q: ['confidential', 'nda', 'privacy', 'inquiry'], a: "Absolutely. All inquiries are handled under strict confidentiality. We can also sign an NDA upon request." },
  { q: ['quote', 'price', 'pricing', 'how do i get'], a: "Use our RFQ page or contact us directly on WhatsApp at +91-9810818274 for a quick response." },
  { q: ['registered', 'iec', 'gst', 'india', 'legit', 'legitimate'], a: "Yes! Sharma's Global Export Exchange is a registered Indian export firm with IEC and GST compliance." },
  { q: ['hello', 'hi', 'hey', 'greetings'], a: "Hello! 👋 I'm the SGE trade assistant. How can I help you today? You can ask about shipping, payments, products, or documentation." },
];

function findAnswer(input) {
  const text = input.toLowerCase().trim();
  for (const item of CHATBOT_QA) {
    if (item.q.some(keyword => text.includes(keyword))) {
      return item.a;
    }
  }
  return null;
}

function initChatbot() {
  const trigger = document.getElementById('chatbot-trigger');
  const widget = document.getElementById('chatbot-widget');
  const closeBtn = document.getElementById('chatbot-close');
  const messages = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');
  const suggBtns = document.querySelectorAll('.chat-suggestion');

  if (!trigger || !widget) return;

  function addMsg(text, type) {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${type}`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function addBotMsg(text) {
    setTimeout(() => { addMsg(text, 'bot'); }, 400);
  }

  function handleInput(val) {
    if (!val.trim()) return;
    addMsg(val, 'user');
    input.value = '';
    const ans = findAnswer(val);
    if (ans) {
      addBotMsg(ans);
    } else {
      addBotMsg("I'm not sure about that one! For a quick answer, WhatsApp us at +91-9810818274 — our team responds promptly. 💬");
    }
  }

  trigger.addEventListener('click', () => {
    widget.classList.toggle('open');
    if (widget.classList.contains('open') && messages.children.length === 0) {
      addMsg("Hello! 👋 I'm the SGE trade assistant. Ask me about shipping, payments, products, or documentation.", 'bot');
    }
  });

  closeBtn?.addEventListener('click', () => widget.classList.remove('open'));

  sendBtn?.addEventListener('click', () => handleInput(input.value));
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(input.value); });

  suggBtns.forEach(btn => {
    btn.addEventListener('click', () => handleInput(btn.textContent));
  });
}

window.ANIMATIONS = { initParticleCanvas, initScrollReveals, initCarousel, initAccordions, initChatbot };
