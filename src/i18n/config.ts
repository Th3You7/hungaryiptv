export const locales = ['en', 'hu', 'no', 'de', 'sv', 'da'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hu: 'Magyar',
  no: 'Norsk',
  de: 'Deutsch',
  sv: 'Svenska',
  da: 'Dansk',
};
