/**
 * VECTRA MEDIA - JAVASCRIPT PRINCIPAL
 * - Integração WhatsApp com rastreamento (GA4 & Meta Pixel)
 * - Carregamento dinâmico de depoimentos (JSON)
 * - Modal Lazy-Load para Vídeos (PageSpeed 90+)
 * - Menu responsivo mobile
 * - Banner LGPD
 */

document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppLinks();
  initMobileMenu();
  loadTestimonialsData();
  initVideoModal();
  initCookieBanner();
  initPrivacyModal();
});

/**
 * 1. INTEGRAÇÃO WHATSAPP & EVENTOS DE RASTREAMENTO
 */
function initWhatsAppLinks() {
  const cfg = window.VECTRA_CONFIG || {
    whatsappNumber: "5511999999999",
    whatsappMessages: {
      default: "Olá! Vim pelo site e quero saber mais sobre os serviços da Vectra Media.",
      hero: "Olá! Vim pelo site e quero falar com a Vectra no WhatsApp.",
      header: "Olá! Vim pelo site e gostaria de tirar dúvidas sobre marketing digital.",
      floating: "Olá! Gostaria de falar com a equipe da Vectra Media.",
      footer: "Olá! Gostaria de saber como a Vectra Media pode ajudar meu negócio a crescer."
    }
  };

  const cleanNumber = cfg.whatsappNumber.replace(/\D/g, "");

  // Mapear elementos com atributos específicos
  const waButtons = document.querySelectorAll('[data-wa]');
  waButtons.forEach(btn => {
    const context = btn.getAttribute('data-wa');
    let message = cfg.whatsappMessages.default;

    if (context === 'hero' && cfg.whatsappMessages.hero) {
      message = cfg.whatsappMessages.hero;
    } else if (context === 'header' && cfg.whatsappMessages.header) {
      message = cfg.whatsappMessages.header;
    } else if (context === 'floating' && cfg.whatsappMessages.floating) {
      message = cfg.whatsappMessages.floating;
    } else if (context === 'footer' && cfg.whatsappMessages.footer) {
      message = cfg.whatsappMessages.footer;
    } else if (context.startsWith('service-')) {
      const serviceKey = context.replace('service-', '');
      if (cfg.whatsappMessages.services && cfg.whatsappMessages.services[serviceKey]) {
        message = cfg.whatsappMessages.services[serviceKey];
      } else {
        const serviceTitle = btn.getAttribute('data-service-title') || 'seus serviços';
        message = `Olá! Vim pelo site e tenho interesse no serviço de ${serviceTitle}.`;
      }
    }

    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');

    // Listener para disparo de eventos no GA4 e Meta Pixel
    btn.addEventListener('click', () => {
      trackConversion(context, message);
    });
  });
}

function trackConversion(context, message) {
  // Google Analytics 4 Event
  if (typeof gtag === 'function') {
    gtag('event', 'generate_lead', {
      event_category: 'engagement',
      event_label: `WhatsApp - ${context}`,
      value: 1.0
    });
  }

  // Meta Pixel Event (Contact)
  if (typeof fbq === 'function') {
    fbq('track', 'Contact', {
      content_name: `WhatsApp Lead (${context})`
    });
  }

  console.log(`[Tracking] Conversão WhatsApp registrada: ${context}`);
}

/**
 * 2. MENU MOBILE HAMBÚRGUER
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Fechar ao clicar em qualquer link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/**
 * 3. CARREGAMENTO DE DEPOIMENTOS E ESTATÍSTICAS (JSON)
 */
async function loadTestimonialsData() {
  const fallbackData = {
    stats: {
      yearsInMarket: "+5",
      yearsLabel: "Anos de mercado gerando resultados",
      clientsCount: "+120",
      clientsLabel: "Negócios locais acelerados",
      statesCount: "+18",
      statesLabel: "Estados atendidos no Brasil"
    },
    videoTestimonials: [
      {
        id: "video-1",
        featured: true,
        clientName: "Dr. Marcelo Ramos",
        company: "Clínica OdontoLife",
        segment: "Odontologia & Saúde",
        duration: "0:58",
        quote: "Em menos de 60 dias com a Vectra Media, nossa agenda lotou e tivemos que abrir novos horários de atendimento.",
        thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: "video-2",
        featured: false,
        clientName: "Carla Vasconcelos",
        company: "Ateliê & Moda Festa",
        segment: "Varejo de Moda",
        duration: "1:15",
        quote: "O WhatsApp não para de tocar com pessoas interessadas nos vestidos certos. O tráfego pago fez toda a diferença.",
        thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: "video-3",
        featured: false,
        clientName: "Renato Silveira",
        company: "Silveira Energia Solar",
        segment: "Serviços & Engenharia",
        duration: "1:02",
        quote: "Paramos de queimar dinheiro em anúncios sem retorno. A Vectra entregou leads qualificados.",
        thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        id: "video-4",
        featured: false,
        clientName: "Dra. Juliana Prado",
        company: "Prado Dermatologia Estética",
        segment: "Saúde & Beleza",
        duration: "0:47",
        quote: "Profissionalismo impecável. A equipe cuida desde os criativos até os anúncios com extrema atenção.",
        thumbnail: "https://images.unsplash.com/photo-1594824813682-14352f2081d6?w=800&auto=format&fit=crop&q=80",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ],
    writtenTestimonials: [
      {
        name: "Eduardo Mendes",
        company: "Mendes Advocacia Empresarial",
        segment: "Direito",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&q=80",
        text: "A Vectra Media entendeu exatamente o tom sério e ético que nosso escritório precisava. Hoje recebemos contatos diários de empresas buscando consultoria preventiva."
      },
      {
        name: "Patrícia Albuquerque",
        company: "Harmonie Centro Estético",
        segment: "Estética Avançada",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&h=160&fit=crop&crop=faces&q=80",
        text: "Antes da Vectra, fazíamos posts sem estratégia nenhuma. Com a gestão completa e os anúncios direcionados, triplicamos o número de procedimentos agendados no mês."
      },
      {
        name: "Rodrigo Fontes",
        company: "Prime Car Auto Center",
        segment: "Serviços Automotivos",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80",
        text: "Eles criaram uma campanha local no Google e no Meta Ads que colocou nossa oficina como referência na cidade. O investimento se pagou na primeira semana."
      },
      {
        name: "Fernanda Guimarães",
        company: "Boutique Le Petit",
        segment: "Moda Infantil",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces&q=80",
        text: "Atendimento rápido, transparência nos relatórios e suporte impecável. A Vectra não é apenas uma agência, é um braço de vendas do nosso negócio."
      },
      {
        name: "Guilherme Siqueira",
        company: "Siqueira & Associados Contabilidade",
        segment: "Contabilidade",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160&h=160&fit=crop&crop=faces&q=80",
        text: "Excelente trabalho de reposicionamento de marca e captação de clientes B2B. A clareza nas reuniões mensais de alinhamento faz toda a diferença."
      },
      {
        name: "Larissa Morais",
        company: "Empório dos Sabores Gourmet",
        segment: "Gastronomia",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&h=160&fit=crop&crop=faces&q=80",
        text: "A qualidade dos vídeos e o tráfego geolocalizado trouxeram uma enxurrada de novos clientes para nossa loja física e delivery. Recomendo de olhos fechados!"
      }
    ]
  };

  let data = fallbackData;
  try {
    const response = await fetch('./data/testimonials.json');
    if (response.ok) {
      data = await response.json();
    }
  } catch (err) {
    console.info("Carregando depoimentos embutidos (modo otimizado offline).");
  }

  // Renderizar Números de Autoridade (Sobre)
  if (data.stats) {
    const statYears = document.getElementById('statYears');
    const statClients = document.getElementById('statClients');
    const statStates = document.getElementById('statStates');
    if (statYears) statYears.textContent = data.stats.yearsInMarket;
    if (statClients) statClients.textContent = data.stats.clientsCount;
    if (statStates) statStates.textContent = data.stats.statesCount;
  }

  // Renderizar Depoimentos em Vídeo
  renderVideos(data.videoTestimonials);

  // Renderizar Depoimentos Escritos
  renderWrittenTestimonials(data.writtenTestimonials);
}

function renderVideos(videos) {
  if (!videos || !videos.length) return;

  const featured = videos.find(v => v.featured) || videos[0];
  const others = videos.filter(v => v !== featured);

  const featuredHolder = document.getElementById('featuredVideoHolder');
  if (featuredHolder && featured) {
    featuredHolder.innerHTML = `
      <div class="featured-video-card">
        <div class="featured-video-thumb" data-video-url="${featured.videoUrl}" role="button" aria-label="Assistir depoimento em vídeo de ${featured.clientName}">
          <img src="${featured.thumbnail}" alt="Depoimento em vídeo de ${featured.clientName}" loading="lazy" width="400" height="711">
          <div class="play-overlay-btn" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="featured-video-info">
          <span class="featured-badge">⭐ Caso de Sucesso em Destaque</span>
          <p class="featured-quote">"${featured.quote}"</p>
          <div class="client-author-name">${featured.clientName}</div>
          <div class="client-author-comp">${featured.company} · ${featured.segment}</div>
        </div>
      </div>
    `;
  }

  const gridHolder = document.getElementById('videoGridHolder');
  if (gridHolder && others.length) {
    gridHolder.innerHTML = others.map(v => `
      <div class="video-reels-card">
        <div class="video-reels-thumb" data-video-url="${v.videoUrl}" role="button" aria-label="Assistir depoimento de ${v.clientName}">
          <img src="${v.thumbnail}" alt="Depoimento de ${v.clientName}" loading="lazy" width="300" height="533">
          <span class="video-duration-pill">${v.duration}</span>
          <div class="play-overlay-btn" style="width: 50px; height: 50px;" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="video-reels-caption">
          <div class="video-client-title">${v.clientName}</div>
          <div class="video-client-desc">${v.company} · ${v.segment}</div>
        </div>
      </div>
    `).join('');
  }
}

function renderWrittenTestimonials(testimonials) {
  const container = document.getElementById('writtenTestimonialsGrid');
  if (!container || !testimonials) return;

  container.innerHTML = testimonials.map(item => `
    <article class="testimonial-card">
      <div>
        <div class="stars-row" aria-label="Avaliação: 5 de 5 estrelas">
          ${'★'.repeat(item.rating || 5)}
        </div>
        <p class="testimonial-text">"${item.text}"</p>
      </div>
      <div class="client-profile">
        <img class="client-avatar" src="${item.avatar}" alt="${item.name}" loading="lazy" width="48" height="48">
        <div>
          <div class="client-name">${item.name}</div>
          <div class="client-company">${item.company} · ${item.segment}</div>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * 4. MODAL LAZY-LOAD PARA VÍDEOS (Zero impacto no PageSpeed inicial)
 */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('videoModalClose');
  const frameHolder = document.getElementById('videoFrameHolder');

  if (!modal || !frameHolder) return;

  // Delegação de evento para os botões de vídeo
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-video-url]');
    if (!trigger) return;

    const url = trigger.getAttribute('data-video-url');
    if (!url) return;

    // Injeta iframe dinamicamente com autoplay
    const autoplayUrl = url.includes('?') ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    frameHolder.innerHTML = `<iframe src="${autoplayUrl}" title="Depoimento em vídeo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add('open');
  });

  const closeModal = () => {
    modal.classList.remove('open');
    frameHolder.innerHTML = ''; // Para o vídeo
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * 5. BANNER LGPD DE COOKIES
 */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('acceptCookiesBtn');

  if (!banner || !acceptBtn) return;

  const hasConsent = localStorage.getItem('vectra_cookie_consent');
  if (!hasConsent) {
    banner.classList.remove('hidden');
  }

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('vectra_cookie_consent', 'true');
    banner.classList.add('hidden');
  });
}

/**
 * 6. MODAL DE POLÍTICA DE PRIVACIDADE
 */
function initPrivacyModal() {
  const modal = document.getElementById('privacyModal');
  const openTriggers = document.querySelectorAll('[data-open-privacy]');
  const closeBtn = document.getElementById('privacyModalClose');

  if (!modal) return;

  openTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
    });
  });

  const close = () => modal.classList.remove('open');
  if (closeBtn) closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}
