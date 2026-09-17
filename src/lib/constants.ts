/**
 * Ponto único de configuração dos contatos do site.
 *
 * [A PREENCHER] Pendente: horários de atendimento (src/components/Contact.tsx),
 * a seção de formação (src/components/Formation.tsx) e a logo definitiva
 * (hoje uma assinatura tipográfica provisória em src/assets).
 */

// (31) 99170-8364 — formato internacional, apenas dígitos.
export const WHATSAPP_NUMBER = "5531991708364";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const WHATSAPP = {
  default: whatsappLink("Olá, Adriana! Vim pelo site e gostaria de agendar uma sessão."),
  agendar: whatsappLink("Olá, Adriana! Vim pelo site e gostaria de agendar uma sessão."),
  hero: whatsappLink("Olá, Adriana! Vim pelo site e gostaria de agendar uma sessão."),
  consultoria: whatsappLink(
    "Olá, Adriana! Vim pelo site e gostaria de falar sobre consultoria em saúde mental.",
  ),
};

// Pin oficial do consultório (Lindéia — Belo Horizonte, MG).
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/Bzkq5BqvQPtaah1A8";

// Formulário de avaliação do Google (Place ID derivado do pin acima).
export const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJb5VpmG-_pgAR1xaJL2-TCms";

export const INSTAGRAM_URL = "https://www.instagram.com/adrianaazevedo.psi/";

export const CRP = "CRP 04/37702";

export const ADDRESS = {
  street: "R. das Perpétuas, 1028",
  neighborhood: "Lindéia",
  city: "Belo Horizonte",
  region: "MG",
  postalCode: "30690-270",
};

export const ADDRESS_LINE = `${ADDRESS.street} — ${ADDRESS.neighborhood} · CEP ${ADDRESS.postalCode}`;
