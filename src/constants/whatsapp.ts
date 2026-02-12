// Replace with your actual WhatsApp number (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = '212621893256';

const buyMessages: Record<string, (plan: string) => string> = {
  en: (plan) => `Hi! I would like to buy the ${plan} plan.`,
  hu: (plan) => `Szia! Szeretnék vásárolni: ${plan} csomag.`,
  no: (plan) => `Hei! Jeg vil gjerne kjøpe ${plan}-abonnementet.`,
  de: (plan) => `Hallo! Ich möchte den ${plan}-Tarif kaufen.`,
  sv: (plan) => `Hej! Jag vill gärna köpa ${plan}-abonnemanget.`,
  da: (plan) => `Hej! Jeg vil gerne købe ${plan}-abonnementet.`,
};

const contactMessages: Record<string, string> = {
  en: 'Hi! I would like to contact you.',
  hu: 'Szia! Szeretnék kapcsolatba lépni veletek.',
  no: 'Hei! Jeg vil gjerne ta kontakt.',
  de: 'Hallo! Ich möchte Sie kontaktieren.',
  sv: 'Hej! Jag vill gärna kontakta er.',
  da: 'Hej! Jeg vil gerne kontakte jer.',
};

export function getWhatsAppUrl(planName: string, locale: string): string {
  const text = buyMessages[locale]?.(planName) ?? buyMessages.en(planName);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppContactUrl(locale: string): string {
  const text = contactMessages[locale] ?? contactMessages.en;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
