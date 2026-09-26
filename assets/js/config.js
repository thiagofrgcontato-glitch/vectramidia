/**
 * CONFIGURAÇÃO GERAL - VECTRA MEDIA
 * Edite aqui as informações principais da agência sem mexer na estrutura do código.
 */

const VECTRA_CONFIG = {
  // Informações da Empresa
  companyName: "Vectra Media",
  slogan: "Marketing que traz clientes de verdade para o seu negócio",
  instagram: "@vectramidia",
  instagramUrl: "https://www.instagram.com/vectramidia",
  email: "contato@vectramedia.com.br",
  cnpj: "00.000.000/0001-00", // Substitua pelo CNPJ oficial
  location: "Atendimento online para todo o Brasil",

  // WhatsApp Centralizado (com 55 + DDD + Número apenas dígitos)
  // Altere o número abaixo para o WhatsApp comercial da agência:
  whatsappNumber: "5511999999999",

  // Mensagens padrão para cada ponto de conversão
  whatsappMessages: {
    default: "Olá! Vim pelo site e quero saber mais sobre os serviços da Vectra Media.",
    hero: "Olá! Vim pelo site e quero acelerar o crescimento do meu negócio com a Vectra Media.",
    header: "Olá! Vim pelo site e gostaria de conversar com um especialista da Vectra Media.",
    floating: "Olá! Vim pelo site e gostaria de tirar uma dúvida sobre marketing digital.",
    footer: "Olá! Quero dar o próximo passo e transformar meu marketing em vendas reais.",
    services: {
      trafego: "Olá! Vim pelo site e quero saber mais sobre Tráfego Pago (Meta Ads e Google Ads).",
      social: "Olá! Vim pelo site e quero saber mais sobre Gestão de Redes Sociais.",
      video: "Olá! Vim pelo site e quero saber mais sobre Produção de Conteúdo e Vídeo.",
      branding: "Olá! Vim pelo site e quero saber mais sobre Identidade Visual e Branding.",
      sites: "Olá! Vim pelo site e quero saber mais sobre Criação de Sites de Alta Conversão.",
      consultoria: "Olá! Vim pelo site e quero saber mais sobre Consultoria Estratégica."
    }
  },

  // IDs de Rastreamento (Substitua quando tiver as contas criadas)
  analytics: {
    googleAnalyticsId: "", // Ex: "G-XXXXXXXXXX"
    metaPixelId: ""        // Ex: "123456789012345"
  }
};

/**
 * Função utilitária para gerar link direto do WhatsApp
 */
function getWhatsAppUrl(customMessage) {
  const number = VECTRA_CONFIG.whatsappNumber.replace(/\D/g, "");
  const message = customMessage || VECTRA_CONFIG.whatsappMessages.default;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Exportar globalmente
window.VECTRA_CONFIG = VECTRA_CONFIG;
window.getWhatsAppUrl = getWhatsAppUrl;
