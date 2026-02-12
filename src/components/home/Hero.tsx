import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  title: string;
  description: string;
  cta: string;
  ctaTrial: string;
  locale: string;
}

export function Hero({ title, description, cta, ctaTrial, locale }: HeroProps) {
  return (
    <section className="relative min-h-[400px] overflow-hidden md:min-h-[500px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.webp"
          alt="StreamAtlas - Best IPTV USA, Canada and Europe. Strong servers, no freeze."
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center md:items-start md:py-32 md:text-left md:px-8">
        <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted md:text-xl">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/${locale}#pricing`}
            className="flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-[#f40612]"
          >
            {ctaTrial}
          </Link>
          <Link
            href={`/${locale}#pricing`}
            className="flex min-h-[44px] items-center justify-center rounded-xl border-2 border-white/80 bg-transparent px-8 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
