export const locales = ['en', 'hu'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'hu';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hu: 'Magyar',
};
