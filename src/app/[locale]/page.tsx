import type { Metadata } from 'next';
import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import { Hero } from '@/components/home/Hero';
import { ServiceCard } from '@/components/home/ServiceCard';
import { Carousel } from '@/components/Carousel';
import { ChannelCard } from '@/components/home/ChannelCard';
import { SportEventCard } from '@/components/home/SportEventCard';
import { SeriesCard } from '@/components/home/SeriesCard';
import { PricingCard } from '@/components/home/PricingCard';
import Image from 'next/image';
import { FAQ } from '@/components/home/FAQ';
import { TestimonialCard } from '@/components/home/TestimonialCard';

const titles: Record<Locale, string> = {
  en: 'StreamAtlas | Best IPTV Service Provider USA, Canada and Europe – Premium IPTV Worldwide',
  hu: 'StreamAtlas | Legjobb IPTV szolgáltató USA, Kanada és Európa – Prémium IPTV világszerte',
  no: 'StreamAtlas | Beste IPTV USA, Canada og Europa – Premium IPTV verdensvide',
  de: 'StreamAtlas | Bester IPTV-Anbieter USA, Kanada und Europa – Premium IPTV weltweit',
  sv: 'StreamAtlas | Bästa IPTV USA, Kanada och Europa – Premium IPTV världen över',
  da: 'StreamAtlas | Bedste IPTV USA, Canada og Europa – Premium IPTV verdensvide',
};

const descriptions: Record<Locale, string> = {
  en: 'Stream 50,000+ channels in FHD, 4K and 8K. Strong servers, no freeze. Best IPTV for USA, Canada and Europe—premium quality worldwide.',
  hu: 'Streamelj 50 000+ csatornát FHD, 4K és 8K-ban. Erős szerverek, nincs fagyás. Legjobb IPTV USA, Kanada és Európa számára—prémium minőség világszerte.',
  no: 'Stream over 50 000 kanaler i FHD, 4K og 8K. Sterke servere, ingen frysing. Beste IPTV for USA, Canada og Europa—premium kvalitet verdensvide.',
  de: 'Streamen Sie 50.000+ Kanäle in FHD, 4K und 8K. Starke Server, kein Ruckler. Bester IPTV für USA, Kanada und Europa—Premium-Qualität weltweit.',
  sv: 'Streama 50 000+ kanaler i FHD, 4K och 8K. Starka servrar, ingen frysning. Bästa IPTV för USA, Kanada och Europa—premiumkvalitet världen över.',
  da: 'Stream over 50.000 kanaler i FHD, 4K og 8K. Stærke servere, ingen fryser. Bedste IPTV til USA, Canada og Europa—premium kvalitet verdensvide.',
};

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
  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],
    alternates: { canonical: `/${locale}` },
  };
}


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const { hero, services, channels, sports, series, pricing, devices, dvr, faq, testimonials } =
    messages.home;

  return (
    <>
      <Hero
        title={hero.title}
        description={hero.description}
        cta={hero.cta}
        ctaTrial={hero.ctaTrial}
        locale={locale}
      />
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <section className="py-12 md:py-16">
          <h2 className={`font-heading text-2xl font-bold text-foreground md:text-3xl ${services.subtitle ? 'mb-2' : 'mb-8'}`}>
            {services.title}
          </h2>
          {services.subtitle && (
            <p className="mb-8 text-muted">{services.subtitle}</p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.items.map((item: { title: string; description: string }) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <Carousel title={channels.title} subtitle={channels.subtitle}>
          {channels.items.map((item: { name: string; image?: string }) => (
            <ChannelCard key={item.name} name={item.name} image={item.image} />
          ))}
        </Carousel>

        <Carousel title={sports.title} subtitle={sports.subtitle}>
          {sports.items.map((item: { name: string; image?: string }) => (
            <SportEventCard key={item.name} name={item.name} image={item.image} />
          ))}
        </Carousel>

        <Carousel title={series.title} subtitle={series.subtitle}>
          {series.items.map((item: { name: string; image: string }) => (
            <SeriesCard key={item.name} name={item.name} image={item.image} />
          ))}
        </Carousel>

        <section id="pricing" className="scroll-mt-20 py-12 md:py-16">
          <h2 className={`font-heading text-2xl font-bold text-foreground md:text-3xl ${pricing.subtitle ? 'mb-2' : 'mb-8'}`}>
            {pricing.title}
          </h2>
          {pricing.subtitle && (
            <p className="mb-8 text-muted">{pricing.subtitle}</p>
          )}
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
        </section>

        <section className="py-12 md:py-16">
          <h2 className="mb-4 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {devices.title}
          </h2>
          <p className="mb-8 text-muted">{devices.subtitle}</p>
          <div className="overflow-hidden rounded-2xl border border-surface-elevated bg-surface">
            <Image
              src="/images/devices/devices.webp"
              alt="Stream on all devices"
              width={1200}
              height={600}
              className="w-full object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </section>

        <section className="py-12 md:py-16">
          <h2 className={`font-heading text-2xl font-bold text-foreground md:text-3xl ${dvr.subtitle ? 'mb-2' : 'mb-8'}`}>
            {dvr.title}
          </h2>
          {dvr.subtitle && (
            <p className="mb-8 text-muted">{dvr.subtitle}</p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(dvr.items as { title: string; description: string }[]).map((item) => (
              <ServiceCard
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
          {dvr.closing && (
            <p className="mt-8 text-muted">{dvr.closing}</p>
          )}
        </section>

        <FAQ title={faq.title} subtitle={faq.subtitle} items={faq.items} />

        <section className="py-12 md:py-16">
          <h2 className={`font-heading text-2xl font-bold text-foreground md:text-3xl ${testimonials.subtitle ? 'mb-2' : 'mb-8'}`}>
            {testimonials.title}
          </h2>
          {testimonials.subtitle && (
            <p className="mb-8 text-muted">{testimonials.subtitle}</p>
          )}
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {testimonials.items.map((item: { quote: string; name: string }, index: number) => (
              <TestimonialCard
                key={index}
                quote={item.quote}
                name={item.name}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
