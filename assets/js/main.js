/**
 * VECTRA MEDIA — JAVASCRIPT v7 (INSTANT 1-CLICK AUTOPLAY VIDEO PLAYER)
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
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
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
        }, 2000);
        return;
      }
      setTimeout(tick, 70);
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
      setTimeout(tick, 40);
    }
  }

  setTimeout(tick, 600);
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
        const duration = 1500;
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
    { threshold: 0.3 }
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

/* MODAL DE VÍDEO — PLAY AUTOMÁTICO EM 1 CLIQUE SEM SEGUNDO CLIQUE */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  const frameHolder = document.getElementById('videoFrameHolder');
  const modalIgLink = document.getElementById('modalIgLink');
  if (!modal || !frameHolder) return;

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-video-url], [data-mp4-url]');
    if (!trigger) return;
    const igUrl = trigger.getAttribute('data-video-url') || 'https://www.instagram.com/vectramidia';
    const mp4Url = trigger.getAttribute('data-mp4-url');

    if (modalIgLink) {
      modalIgLink.setAttribute('href', igUrl);
    }

    if (mp4Url) {
      // Injeta o player HTML5 com autoplay e reprodução imediata
      frameHolder.innerHTML = `
        <video id="modalActiveVideo" controls autoplay playsinline style="width:100%; height:100%; max-height:600px; object-fit:contain; background:#000; border-radius:12px;">
          <source src="${mp4Url}" type="video/mp4">
          Seu navegador não suporta reprodução direta.
        </video>
      `;
      modal.classList.add('open');

      const activeVideo = document.getElementById('modalActiveVideo');
      if (activeVideo) {
        // Dispara o play imediatamente na mesma pilha de clique do usuário
        const playPromise = activeVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Se o navegador exigir áudio mudo no primeiro frame
            activeVideo.muted = true;
            activeVideo.play();
          });
        }
      }
    } else if (igUrl.includes('instagram.com')) {
      const matches = igUrl.match(/(?:reel|reels|p)\/([A-Za-z0-9_-]+)/);
      const code = matches && matches[1] ? matches[1] : '';
      const embedSrc = `https://www.instagram.com/p/${code}/embed/`;

      frameHolder.innerHTML = `<iframe src="${embedSrc}" title="Instagram Reel Player" width="100%" height="600" frameborder="0" scrolling="no" allowtransparency="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      modal.classList.add('open');
    }
  });

  const close = () => {
    modal.classList.remove('open');
    frameHolder.innerHTML = '';
  };
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
}

/* LGPD */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const btn = document.getElementById('acceptCookiesBtn');
  if (!banner || !btn) return;

  if (!localStorage.getItem('vectra_cookie_consent')) {
    setTimeout(() => banner.classList.remove('hidden'), 1000);
  }

  btn.addEventListener('click', () => {
    localStorage.setItem('vectra_cookie_consent', 'true');
    banner.classList.add('hidden');
  });
}

/* PRIVACY */
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
