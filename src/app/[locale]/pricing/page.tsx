import type { Metadata } from 'next';
import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import { PricingCard } from '@/components/home/PricingCard';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const messages = await getMessages(locale as Locale);
  const title = `${messages.pricing.title} | Hungary IPTV`;
  const description =
    (messages.pricing as { metaDescription?: string }).metaDescription ?? messages.pricing.subtitle;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/pricing` },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const { pricing } = messages;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          {pricing.title}
        </h1>
        <p className="mt-4 text-muted">{pricing.subtitle}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pricing.plans.map((plan: { id: string; name: string; price: string; period: string; features: string[]; popular?: boolean }) => (
          <PricingCard
            key={plan.id}
            name={plan.name}
            price={plan.price}
            period={plan.period}
            features={plan.features}
            popular={plan.popular}
            popularLabel={pricing.popular}
            ctaText={pricing.cta}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
