import Link from 'next/link';
import { getWhatsAppUrl } from '@/constants/whatsapp';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  popularLabel?: string;
  ctaText: string;
  locale: string;
}

export function PricingCard({
  name,
  price,
  period,
  features,
  popular,
  popularLabel = 'Popular',
  ctaText,
  locale,
}: PricingCardProps) {
  const whatsappUrl = getWhatsAppUrl(name, locale);

  return (
    <article
      className={`relative flex flex-col rounded-2xl border bg-surface p-6 transition-colors hover:border-primary/50 ${
        popular ? 'border-primary' : 'border-surface-elevated'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
          {popularLabel}
        </span>
      )}
      <h3 className="font-heading text-xl font-bold text-foreground">{name}</h3>
      <div className="my-4 flex items-baseline gap-1">
        <span className="font-heading text-3xl font-bold text-foreground">{price}</span>
        <span className="text-muted">{period}</span>
      </div>
      <ul className="mb-6 flex-1 space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted">
            <svg className="h-4 w-4 shrink-0 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-4 py-3 font-medium text-white transition-colors hover:bg-[#f40612]"
      >
        {ctaText}
      </Link>
    </article>
  );
}
