import Link from 'next/link';
import type { Locale } from '@/i18n/config';

interface MiniFooterProps {
  locale: Locale;
  messages: { footer: { terms: string; refund: string; privacy: string; copyright?: string } };
}

export function MiniFooter({ locale, messages }: MiniFooterProps) {
  const { terms, refund, privacy, copyright } = messages.footer;
  return (
    <footer className="border-t border-surface-elevated bg-background px-4 py-6 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8" aria-label="Legal">
          <Link
            href={`/${locale}/terms`}
            className="min-h-[44px] min-w-[44px] flex items-center text-sm text-muted transition-colors hover:text-primary hover:text-foreground md:min-w-0"
          >
            {terms}
          </Link>
          <Link
            href={`/${locale}/refund`}
            className="min-h-[44px] min-w-[44px] flex items-center text-sm text-muted transition-colors hover:text-primary hover:text-foreground md:min-w-0"
          >
            {refund}
          </Link>
          <Link
            href={`/${locale}/privacy`}
            className="min-h-[44px] min-w-[44px] flex items-center text-sm text-muted transition-colors hover:text-primary hover:text-foreground md:min-w-0"
          >
            {privacy}
          </Link>
        </nav>
        {copyright && (
          <p className="text-center text-sm text-dim md:text-left">{copyright}</p>
        )}
      </div>
    </footer>
  );
}
