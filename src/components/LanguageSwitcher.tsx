'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = (segments[0] && locales.includes(segments[0] as Locale))
    ? (segments[0] as Locale)
    : 'en';
  const pathWithoutLocale = segments.slice(1).join('/');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[44px] items-center justify-center rounded px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface hover:text-foreground"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        {localeNames[currentLocale]}
        <svg
          className={`ml-1 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded border border-surface-elevated bg-background py-1 shadow-lg"
        >
          {locales.map((locale) => (
            <li key={locale} role="option" aria-selected={currentLocale === locale}>
              <Link
                href={`/${locale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors hover:bg-surface ${
                  currentLocale === locale ? 'bg-primary/10 font-medium text-primary' : 'text-foreground'
                }`}
              >
                {localeNames[locale]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
