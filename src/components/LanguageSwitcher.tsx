'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = segments[0];
  const pathWithoutLocale = segments.slice(1).join('/');

  return (
    <nav aria-label="Language" className="flex gap-2">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`}
          aria-current={currentLocale === locale ? 'page' : undefined}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded px-3 py-2 text-sm font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-primary text-white'
              : 'text-muted hover:text-foreground'
          }`}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </nav>
  );
}
