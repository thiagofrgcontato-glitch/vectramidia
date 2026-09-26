/**
 * VECTRA MEDIA — JAVASCRIPT v2 APRIMORADO
 *
 * Novos recursos incorporados das referências:
 * 1. Smart Header — some ao rolar pra baixo, volta ao subir (Grupo Permaneo)
 * 2. Scroll Reveal — animação fade-in-up disparada por IntersectionObserver (agenciamumu)
 * 3. Typewriter Rotativo — título do hero com palavras trocadas dinamicamente (agenciamumu)
 * 4. Contador Animado — números sobem de 0 ao valor quando entram na viewport (Grupo Permaneo)
 * 5. Hover Persistente — cartões de depoimento mantêm estado ativo até próximo hover (Grupo Permaneo)
 * 6. Carrossel de serviços com dots indicadores (agenciamumu)
 * 7. WhatsApp tracking, Modal de vídeo, LGPD — mantidos da v1
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

/* ================================================================
   1. SMART HEADER
   Some ao rolar pra baixo, reaparece ao rolar pra cima.
   Inspirado no comportamento do Grupo Permaneo.
   ================================================================ */
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
          // Rolando para baixo → esconde header
          header.classList.add('header--hidden');
        } else {
          // Rolando para cima → mostra header
          header.classList.remove('header--hidden');
        }

        // Sombra quando sair do topo
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

  // Reexibir ao passar o mouse nos 100px superiores (UX extra)
  document.addEventListener('mousemove', (e) => {
    if (e.clientY <= 100) {
      header.classList.remove('header--hidden');
    }
  });
}

/* ================================================================
   2. SCROLL REVEAL (IntersectionObserver)
   Qualquer elemento com [data-reveal] aparece ao entrar na viewport.
   Inspirado nas animações fade-in-up da agenciamumu.com.
   ================================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ================================================================
   3. TYPEWRITER ROTATIVO NO HERO
   Troca palavras com efeito de digitação.
   Inspirado no hero da agenciamumu.com.
   ================================================================ */
function initTypewriter() {
  const target = document.getElementById('typewriterTarget');
  if (!target) return;

  const phrases = [
    'clientes de verdade',
    'vendas todo dia',
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
  const DELETING_SPEED = 38;
  const PAUSE_AFTER_WORD = 2200;
  const PAUSE_BEFORE_TYPE = 300;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Escrevendo
      target.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        // Terminou de escrever — pausa antes de deletar
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
      // Deletando
      target.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Terminou de deletar — troca frase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          tick();
        }, PAUSE_BEFORE_TYPE);
        return;
      }

      setTimeout(tick, DELETING_SPEED);
    }
  }

  // Inicia após pequeno delay
  setTimeout(tick, 1000);
}

/* ================================================================
   4. CONTADOR ANIMADO
   Os números sobem de 0 ao valor alvo quando entram na viewport.
   Inspirado nas métricas do Grupo Permaneo.
   ================================================================ */
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
          // Easing ease-out
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

/* ================================================================
   5. HOVER PERSISTENTE NOS CARDS DE DEPOIMENTO
   O card ativo mantém destaque até outro card receber hover.
   Inspirado no comportamento dos creators da Grupo Permaneo.
   ================================================================ */
function initPersistentCardHover() {
  const cards = document.querySelectorAll('.testimonial-card');

  function setActive(activeCard) {
    cards.forEach(c => c.classList.remove('card--active'));
    activeCard.classList.add('card--active');
  }

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => setActive(card));
  });

  // Ativa o primeiro card por padrão
  if (cards.length > 0) {
    cards[0].classList.add('card--active');
  }
}

/* ================================================================
   6. CARROSSEL DE SERVIÇOS — DOTS INDICADORES
   Funciona em mobile com scroll snap; dots indicam a posição.
   Inspirado no carrossel da agenciamumu.com.
   ================================================================ */
function initServicesCarouselDots() {
  const wrapper = document.getElementById('servicesCarousel');
  const grid = document.getElementById('servicesGrid');
  const dots = document.querySelectorAll('.carousel-dot');

  if (!wrapper || !grid || !dots.length) return;

  // Navegação via dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index') || '0', 10);
      const cards = grid.querySelectorAll('.service-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }
    });
  });

  // Atualiza dot ativo durante scroll
  let scrollTimeout;
  wrapper.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const cards = grid.querySelectorAll('.service-card');
      const wrapperLeft = wrapper.getBoundingClientRect().left;
      let closestIndex = 0;
      let minDist = Infinity;

      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - wrapperLeft);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = i;
        }
      });

      dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
    }, 60);
  }, { passive: true });
}

/* ================================================================
   7. LINKS DE WHATSAPP + RASTREAMENTO
   ================================================================ */
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

/* ================================================================
   8. MENU MOBILE HAMBÚRGUER
   ================================================================ */
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

/* ================================================================
   9. CARREGAMENTO DE DEPOIMENTOS (JSON)
   ================================================================ */
async function loadTestimonialsData() {
  const fallback = {
    stats: { yearsInMarket: '+5', clientsCount: '+120', statesCount: '+18' },
    videoTestimonials: [
      { id: 'v1', featured: true, clientName: 'Dr. Marcelo Ramos', company: 'Clínica OdontoLife', segment: 'Odontologia', duration: '0:58',
        quote: 'Em menos de 60 dias com a Vectra Media, nossa agenda lotou e tivemos que abrir novos horários de atendimento.',
        thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 'v2', featured: false, clientName: 'Carla Vasconcelos', company: 'Ateliê & Moda Festa', segment: 'Varejo de Moda', duration: '1:15',
        quote: 'O WhatsApp não para de tocar. O tráfego pago fez toda a diferença.',
        thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 'v3', featured: false, clientName: 'Renato Silveira', company: 'Silveira Energia Solar', segment: 'Engenharia', duration: '1:02',
        quote: 'Paramos de queimar dinheiro em anúncios sem retorno. A Vectra entregou leads qualificados.',
        thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 'v4', featured: false, clientName: 'Dra. Juliana Prado', company: 'Prado Dermatologia', segment: 'Saúde & Beleza', duration: '0:47',
        quote: 'Profissionalismo impecável. A equipe cuida desde os criativos até a otimização dos anúncios.',
        thumbnail: 'https://images.unsplash.com/photo-1594824813682-14352f2081d6?w=800&auto=format&fit=crop&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ],
    writtenTestimonials: [
      { name: 'Eduardo Mendes', company: 'Mendes Advocacia', segment: 'Direito', rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces',
        text: 'A Vectra entendeu exatamente o tom sério que nosso escritório precisava. Recebemos contatos diários de empresas.' },
      { name: 'Patrícia Albuquerque', company: 'Harmonie Centro Estético', segment: 'Estética', rating: 5,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces',
        text: 'Triplicamos o número de procedimentos agendados no mês com gestão completa e anúncios direcionados.' },
      { name: 'Rodrigo Fontes', company: 'Prime Car Auto Center', segment: 'Automotivo', rating: 5,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces',
        text: 'Criaram uma campanha local que colocou nossa oficina como referência na cidade. Investimento pago na primeira semana.' },
      { name: 'Fernanda Guimarães', company: 'Boutique Le Petit', segment: 'Moda Infantil', rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces',
        text: 'Atendimento rápido, transparência nos relatórios. A Vectra é um braço de vendas do nosso negócio.' },
      { name: 'Guilherme Siqueira', company: 'Siqueira & Associados', segment: 'Contabilidade', rating: 5,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=faces',
        text: 'Excelente reposicionamento de marca e captação B2B. As reuniões mensais de alinhamento fazem toda diferença.' },
      { name: 'Larissa Morais', company: 'Empório dos Sabores', segment: 'Gastronomia', rating: 5,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&h=160&fit=crop&crop=faces',
        text: 'Tráfego geolocalizado e vídeos de qualidade trouxeram novos clientes à loja e ao delivery. Recomendo!' },
    ]
  };

  let data = fallback;
  try {
    const res = await fetch('./data/testimonials.json');
    if (res.ok) data = await res.json();
  } catch (_) { /* usa fallback */ }

  // Atualiza IDs dos contadores (os números virão da animação do JS)
  // Apenas garante que o data-target esteja correto se veio do JSON
  renderVideos(data.videoTestimonials);
  renderWrittenTestimonials(data.writtenTestimonials);

  // Reinicia hover persistente depois de renderizar
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="featured-video-info">
          <span class="featured-badge">⭐ Caso de Sucesso em Destaque</span>
          <p class="featured-quote">"${featured.quote}"</p>
          <div class="client-author-name">${featured.clientName}</div>
          <div class="client-author-comp">${featured.company} · ${featured.segment}</div>
          <div style="margin-top:24px;">
            <a href="#" class="btn btn-whatsapp btn-sm" data-wa="hero" style="font-size:0.88rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              Quero esses resultados
            </a>
          </div>
        </div>
      </div>`;
    // Reinicia WhatsApp links nos elementos renderizados
    setTimeout(initWhatsAppLinks, 100);
  }

  const gridEl = document.getElementById('videoGridHolder');
  if (gridEl && others.length) {
    gridEl.innerHTML = others.map(v => `
      <div class="video-reels-card" data-reveal>
        <div class="video-reels-thumb" data-video-url="${v.videoUrl}" role="button" aria-label="Assistir depoimento de ${v.clientName}">
          <img src="${v.thumbnail}" alt="${v.clientName}" loading="lazy" width="300" height="533">
          <span class="video-duration-pill">${v.duration}</span>
          <div class="play-overlay-btn" style="width:50px;height:50px;" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <div class="video-reels-caption">
          <div class="video-client-title">${v.clientName}</div>
          <div class="video-client-desc">${v.company} · ${v.segment}</div>
        </div>
      </div>`).join('');
    // Revela novos elementos
    document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => {
      setTimeout(() => el.classList.add('is-revealed'), 100);
    });
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

  // Reinicia scroll reveal nos novos elementos
  document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    io.observe(el);
  });
}

/* ================================================================
   10. MODAL LAZY-LOAD DE VÍDEO
   ================================================================ */
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
    const autoUrl = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    frameHolder.innerHTML = `<iframe src="${autoUrl}" title="Depoimento" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add('open');
  });

  const close = () => { modal.classList.remove('open'); frameHolder.innerHTML = ''; };
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
}

/* ================================================================
   11. BANNER LGPD
   ================================================================ */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const btn = document.getElementById('acceptCookiesBtn');
  if (!banner || !btn) return;

  if (!localStorage.getItem('vectra_cookie_consent')) {
    setTimeout(() => banner.classList.remove('hidden'), 1500);
  }

  btn.addEventListener('click', () => {
    localStorage.setItem('vectra_cookie_consent', 'true');
    banner.classList.add('hidden');
  });
}

/* ================================================================
   12. MODAL DE PRIVACIDADE
   ================================================================ */
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
