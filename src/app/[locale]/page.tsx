import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';
import { Hero } from '@/components/home/Hero';
import { ServiceCard } from '@/components/home/ServiceCard';
import { Carousel } from '@/components/Carousel';
import { ChannelCard } from '@/components/home/ChannelCard';
import { SportEventCard } from '@/components/home/SportEventCard';
import { PricingCard } from '@/components/home/PricingCard';
import { DeviceCard } from '@/components/home/DeviceCard';
import { FAQ } from '@/components/home/FAQ';
import { TestimonialCard } from '@/components/home/TestimonialCard';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const { hero, services, channels, hboPrime, sports, pricing, devices, faq, testimonials } =
    messages.home;

  return (
    <>
      <Hero
        title={hero.title}
        description={hero.description}
        cta={hero.cta}
        locale={locale}
      />
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <section className="py-12 md:py-16">
          <h2 className="mb-8 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {services.title}
          </h2>
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

        <Carousel title={channels.title}>
          {channels.items.map((item: { name: string }) => (
            <ChannelCard key={item.name} name={item.name} />
          ))}
        </Carousel>

        <Carousel title={hboPrime.title}>
          {hboPrime.items.map((item: { name: string }) => (
            <ChannelCard key={item.name} name={item.name} />
          ))}
        </Carousel>

        <Carousel title={sports.title}>
          {sports.items.map((item: { name: string }) => (
            <SportEventCard key={item.name} name={item.name} />
          ))}
        </Carousel>

        <section id="pricing" className="scroll-mt-20 py-12 md:py-16">
          <h2 className="mb-8 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {pricing.title}
          </h2>
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
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
            {devices.items.map((item: { name: string }) => (
              <DeviceCard key={item.name} name={item.name} />
            ))}
          </div>
        </section>

        <FAQ title={faq.title} items={faq.items} />

        <section className="py-12 md:py-16">
          <h2 className="mb-8 font-heading text-2xl font-bold text-foreground md:text-3xl">
            {testimonials.title}
          </h2>
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
