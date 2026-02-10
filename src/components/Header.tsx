'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  locale: Locale;
  messages: { nav: { home: string; pricing: string; about: string; blog: string; startTrial: string } };
}

const navLinks = [
  { href: '', labelKey: 'home' as const },
  { href: 'pricing', labelKey: 'pricing' as const },
  { href: 'about', labelKey: 'about' as const },
  { href: 'blog', labelKey: 'blog' as const },
];

export function Header({ locale, messages }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-elevated bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href={`/${locale}`}
          className="font-heading text-3xl font-bold tracking-tight text-primary transition-colors hover:text-[#f40612] md:text-4xl"
        >
          huIPTV
        </Link>

        <nav
          className={`absolute left-0 right-0 top-full md:static ${
            mobileMenuOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <ul className="flex flex-col gap-0 border-t border-surface-elevated bg-background md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent">
            {navLinks.map(({ href, labelKey }) => (
              <li key={href || 'home'}>
                <Link
                  href={`/${locale}${href ? `/${href}` : ''}`}
                  className="block min-h-[44px] px-4 py-3 text-muted transition-colors hover:bg-surface hover:text-foreground md:min-h-0 md:rounded md:px-0 md:py-0 md:hover:bg-transparent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {messages.nav[labelKey]}
                </Link>
              </li>
            ))}
            <li className="md:hidden">
              <Link
                href={`/${locale}#pricing`}
                className="block min-h-[44px] px-4 py-3 font-medium text-primary transition-colors hover:bg-surface md:min-h-0 md:py-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {messages.nav.startTrial}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}#pricing`}
            className="hidden min-h-[44px] items-center justify-center rounded bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#f40612] md:flex"
          >
            {messages.nav.startTrial}
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="h-6 w-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
