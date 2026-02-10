// Replace with your actual WhatsApp number (country code + number, no + or spaces)
export const WHATSAPP_NUMBER = '212621893256';

export function getWhatsAppUrl(planName: string, locale: string): string {
  const text = locale === 'hu'
    ? `Szia! Szeretnék vásárolni: ${planName} csomag.`
    : `Hi! I would like to buy the ${planName} plan.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppContactUrl(locale: string): string {
  const text = locale === 'hu'
    ? 'Szia! Szeretnék kapcsolatba lépni veletek.'
    : 'Hi! I would like to contact you.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
