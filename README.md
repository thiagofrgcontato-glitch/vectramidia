# Vectra Media — Landing Page de Alta Conversão

> Landing page institucional e focada em conversão para a agência **Vectra Media**, desenvolvida estritamente de acordo com as especificações do briefing oficial.

![Preview Vectra Media](./assets/images/logo.jpg)

---

## 🎯 Objetivo do Projeto
- **Objetivo central:** Levar o visitante a iniciar uma conversa direta no **WhatsApp da agência**.
- **Público-alvo:** Empresários e gestores de negócios locais que buscam marketing digital com ROI comprovado.
- **Identidade da Agência:** Vectra Media (@vectramidia).

---

## 🎨 Identidade Visual & Diretrizes
- **Azul Nobre (`#0B2A5B`):** Títulos de destaque, faixas de seção e rodapé.
- **Azul Royal (`#1E4FD8`):** Cores de ação secundária, links, ícones e efeito hover.
- **Azul Claro (`#E8EEFB`):** Fundo de cards e seções alternadas.
- **Preto Profundo (`#0A0A0A`):** Fundo da seção Hero e seção de vídeos.
- **Grafite (`#1C1C1E`) & Cinza Médio (`#6B7280`):** Textos principais e legendas.
- **Branco (`#FFFFFF`):** Fundo principal e textos sobre fundos escuros.
- **Verde WhatsApp (`#25D366`):** Exclusivo para todos os botões de ação do WhatsApp (com animação de pulso no botão flutuante).
- **Tipografia:** Montserrat / Poppins (Títulos e Botões) + Inter (Corpo de texto).

---

## 📐 Estrutura da Página (7 Seções)
1. **Cabeçalho Fixo (Header):** Logo oficial, navegação âncora suave, botão "Fale conosco" e menu hambúrguer responsivo para celular.
2. **Hero (Topo):** Título forte focado em faturamento, subtítulo de impacto, botão grande de WhatsApp e selo de prova social.
3. **Sobre a Agência:** Posicionamento de mercado, abrangência nacional e 3 blocos de números de autoridade.
4. **Como Podemos Ajudar (Serviços):** 6 cards com ícones modernos e botões com mensagens contextuais customizadas para cada serviço.
5. **Depoimentos em Vídeo:** Depoimento destaque + grade em formato vertical 9:16 (Reels/Shorts) com carregamento lazy-load (não atrasa o carregamento da página).
6. **Depoimentos Escritos:** Avaliações com fotos, empresa, 5 estrelas e comentário. **Carregamento desacoplado via `data/testimonials.json`** para fácil atualização sem tocar no HTML!
7. **Chamada Final & Rodapé:** Fechamento de alta conversão, botão grande de WhatsApp, contatos oficiais, Instagram (@vectramidia), LGPD e direitos autorais.

---

## ⚙️ Como Configurar o WhatsApp e Rastreamento
Abra o arquivo [`assets/js/config.js`](./assets/js/config.js) e edite:
```javascript
const VECTRA_CONFIG = {
  // Substitua pelo número comercial da agência com DDD:
  whatsappNumber: "5511999999999",

  // Adicione suas tags quando criar as contas de anúncio:
  analytics: {
    googleAnalyticsId: "G-XXXXXXXXXX",
    metaPixelId: "123456789012345"
  }
};
```
Todos os botões do site e o botão flutuante atualizarão automaticamente!

---

## 🚀 Como Fazer Deploy na Vercel
1. Conecte sua conta do GitHub à [Vercel](https://vercel.com).
2. Clique em **"Add New Project"** e importe o repositório `thiagofrgcontato-glitch/vectramidia`.
3. Como o projeto é estático e ultra-otimizado com `vercel.json` incluso, basta clicar em **Deploy**.
4. O site estará no ar em segundos com HTTPS automático, CDN global e nota máxima no PageSpeed!

---

## 📋 Checklist de Entrega
- [x] Layout conferido nas cores, fontes e especificações do briefing.
- [x] Todos os botões de WhatsApp com mensagens pré-formatadas.
- [x] Vídeos carregando sob demanda (lazy-load) para manter PageSpeed 90+.
- [x] Depoimentos editáveis em arquivo JSON (`data/testimonials.json`).
- [x] Pronto para integração de Meta Pixel e Google Analytics 4.
- [x] Banner de conformidade com a LGPD e modal de Política de Privacidade.
- [x] Responsividade mobile-first testada em resoluções de smartphone, tablet e desktop.
