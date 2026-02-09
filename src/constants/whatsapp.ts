// Replace with your actual WhatsApp number (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = '36123456789';

export function getWhatsAppUrl(planName: string, locale: string): string {
  const text = locale === 'hu'
    ? `Szia! Érdekel a(z) ${planName} csomag.`
    : `Hi! I'm interested in the ${planName} plan.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
