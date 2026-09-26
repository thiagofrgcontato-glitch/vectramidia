/**
 * VECTRA MEDIA — JAVASCRIPT v3 (INTENSE BLUE AGENCY THEME)
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmartHeader();
  initScrollReveal();
  initTypewriter();
  initAnimatedCounters();
  initPersistentCardHover();
  initServicesCarouselDots();
  initWhatsAppLinks();
  initMobileMenu();
  loadTestimonialsData();
  initVideoModal();
  initCookieBanner();
  initPrivacyModal();
});

/* SMART HEADER */
function initSmartHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          header.classList.add('header--hidden');
        } else {
          header.classList.remove('header--hidden');
        }
        if (currentScrollY > 10) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* SCROLL REVEAL */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* TYPEWRITER ROTATIVO NO HERO */
function initTypewriter() {
  const target = document.getElementById('typewriterTarget');
  if (!target) return;

  const phrases = [
    'clientes de verdade',
    'vendas todos os dias',
    'leads qualificados',
    'autoridade de marca',
    'resultado mensurável',
    'crescimento real',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const TYPING_SPEED = 70;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER_WORD = 2000;

  function tick() {
    const currentPhrase = phrases[phraseIndex];
    if (isPaused) return;

    if (!isDeleting) {
      target.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
          tick();
        }, PAUSE_AFTER_WORD);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      target.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          tick();
        }, 300);
        return;
      }
      setTimeout(tick, DELETING_SPEED);
    }
  }

  setTimeout(tick, 800);
}

/* CONTADOR ANIMADO */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 1600;
        const start = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);
          el.textContent = prefix + current;

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* HOVER PERSISTENTE */
function initPersistentCardHover() {
  const cards = document.querySelectorAll('.testimonial-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cards.forEach(c => c.classList.remove('card--active'));
      card.classList.add('card--active');
    });
  });
  if (cards.length > 0) cards[0].classList.add('card--active');
}

/* CARROSSEL DOTS */
function initServicesCarouselDots() {
  const wrapper = document.getElementById('servicesCarousel');
  const grid = document.getElementById('servicesGrid');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!wrapper || !grid || !dots.length) return;

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index') || '0', 10);
      const cards = grid.querySelectorAll('.service-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    });
  });
}

/* WHATSAPP LINKS */
function initWhatsAppLinks() {
  const cfg = window.VECTRA_CONFIG || {
    whatsappNumber: '5511999999999',
    whatsappMessages: {
      default: 'Olá! Vim pelo site e quero saber mais sobre os serviços da Vectra Media.',
      hero: 'Olá! Vim pelo site e quero acelerar meu negócio com a Vectra Media.',
      header: 'Olá! Vim pelo site e gostaria de conversar com um especialista.',
      floating: 'Olá! Gostaria de falar com a equipe da Vectra Media.',
      footer: 'Olá! Quero saber como a Vectra pode transformar meu marketing em vendas.',
      services: {
        trafego: 'Olá! Vim pelo site e quero saber mais sobre Tráfego Pago.',
        social: 'Olá! Vim pelo site e quero saber mais sobre Gestão de Redes Sociais.',
        video: 'Olá! Vim pelo site e quero saber mais sobre Produção de Conteúdo e Vídeo.',
        branding: 'Olá! Vim pelo site e quero saber mais sobre Identidade Visual.',
        sites: 'Olá! Vim pelo site e quero saber mais sobre Criação de Sites.',
        consultoria: 'Olá! Vim pelo site e quero saber mais sobre Consultoria Estratégica.',
      }
    }
  };

  const number = cfg.whatsappNumber.replace(/\D/g, '');

  document.querySelectorAll('[data-wa]').forEach(btn => {
    const context = btn.getAttribute('data-wa');
    let message = cfg.whatsappMessages.default;

    if (context in cfg.whatsappMessages) {
      const val = cfg.whatsappMessages[context];
      if (typeof val === 'string') message = val;
    } else if (context.startsWith('service-')) {
      const key = context.replace('service-', '');
      if (cfg.whatsappMessages.services && cfg.whatsappMessages.services[key]) {
        message = cfg.whatsappMessages.services[key];
      } else {
        const title = btn.getAttribute('data-service-title') || '';
        message = `Olá! Vim pelo site e quero saber sobre ${title}.`;
      }
    }

    btn.setAttribute('href', `https://wa.me/${number}?text=${encodeURIComponent(message)}`);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');

    btn.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { event_label: `WhatsApp - ${context}`, value: 1 });
      }
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', { content_name: `WhatsApp (${context})` });
      }
    });
  });
}

/* MOBILE MENU */
function initMobileMenu() {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    menu.classList.toggle('active');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}

/* CARREGAR DEPOIMENTOS */
async function loadTestimonialsData() {
  let data = null;
  try {
    const res = await fetch('./data/testimonials.json');
    if (res.ok) data = await res.json();
  } catch (_) {}

  if (data) {
    if (data.videoTestimonials) renderVideos(data.videoTestimonials);
    if (data.writtenTestimonials) renderWrittenTestimonials(data.writtenTestimonials);
  }
  initPersistentCardHover();
}

function renderVideos(videos) {
  if (!videos || !videos.length) return;

  const featured = videos.find(v => v.featured) || videos[0];
  const others = videos.filter(v => v !== featured);

  const featuredEl = document.getElementById('featuredVideoHolder');
  if (featuredEl && featured) {
    featuredEl.innerHTML = `
      <div class="featured-video-card" data-reveal>
        <div class="featured-video-thumb" data-video-url="${featured.videoUrl}" role="button" aria-label="Assistir depoimento de ${featured.clientName}">
          <img src="${featured.thumbnail}" alt="Depoimento de ${featured.clientName}" loading="lazy" width="400" height="711">
          <div class="play-overlay-btn" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="featured-video-info">
          <span class="featured-badge">⭐ Caso de Sucesso no Instagram</span>
          <p class="featured-quote">"${featured.quote}"</p>
          <div class="client-author-name">${featured.clientName}</div>
          <div class="client-author-comp">${featured.company} · ${featured.segment}</div>
          <div style="margin-top:24px;">
            <a href="${featured.videoUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="font-size:0.88rem;">
              Ver no Instagram Reels →
            </a>
          </div>
        </div>
      </div>`;
    setTimeout(initWhatsAppLinks, 100);
  }

  const gridEl = document.getElementById('videoGridHolder');
  if (gridEl && others.length) {
    gridEl.innerHTML = others.map(v => `
      <div class="video-reels-card" data-reveal>
        <div class="video-reels-thumb" data-video-url="${v.videoUrl}" role="button" aria-label="Assistir depoimento de ${v.clientName}">
          <img src="${v.thumbnail}" alt="${v.clientName}" loading="lazy" width="300" height="533">
          <span class="video-duration-pill">${v.duration}</span>
          <div class="play-overlay-btn" style="width:52px;height:52px;" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="video-reels-caption">
          <div class="video-client-title">${v.clientName}</div>
          <div class="video-client-desc">${v.company} · ${v.segment}</div>
        </div>
      </div>`).join('');
  }
}

function renderWrittenTestimonials(testimonials) {
  const container = document.getElementById('writtenTestimonialsGrid');
  if (!container || !testimonials) return;

  container.innerHTML = testimonials.map((item, i) => `
    <article class="testimonial-card" data-reveal data-reveal-delay="${(i % 3) + 1}">
      <div>
        <div class="stars-row" aria-label="5 estrelas">${'★'.repeat(item.rating || 5)}</div>
        <p class="testimonial-text">"${item.text}"</p>
      </div>
      <div class="client-profile">
        <img class="client-avatar" src="${item.avatar}" alt="${item.name}" loading="lazy" width="48" height="48">
        <div>
          <div class="client-name">${item.name}</div>
          <div class="client-company">${item.company} · ${item.segment}</div>
        </div>
      </div>
    </article>`).join('');
}

/* VIDEO MODAL COM SUPORTE A INSTAGRAM REELS & YOUTUBE */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  const frameHolder = document.getElementById('videoFrameHolder');
  if (!modal || !frameHolder) return;

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-video-url]');
    if (!trigger) return;
    const url = trigger.getAttribute('data-video-url');
    if (!url) return;

    if (url.includes('instagram.com')) {
      // Abre o Reel diretamente no Instagram se for link do IG
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    const autoUrl = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    frameHolder.innerHTML = `<iframe src="${autoUrl}" title="Depoimento" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add('open');
  });

  const close = () => { modal.classList.remove('open'); frameHolder.innerHTML = ''; };
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
}

/* LGPD COOKIE BANNER */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const btn = document.getElementById('acceptCookiesBtn');
  if (!banner || !btn) return;

  if (!localStorage.getItem('vectra_cookie_consent')) {
    setTimeout(() => banner.classList.remove('hidden'), 1200);
  }

  btn.addEventListener('click', () => {
    localStorage.setItem('vectra_cookie_consent', 'true');
    banner.classList.add('hidden');
  });
}

/* PRIVACY MODAL */
function initPrivacyModal() {
  const modal = document.getElementById('privacyModal');
  const closeBtn = document.getElementById('privacyModalClose');
  if (!modal) return;

  document.querySelectorAll('[data-open-privacy]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); modal.classList.add('open'); });
  });

  const close = () => modal.classList.remove('open');
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
}
