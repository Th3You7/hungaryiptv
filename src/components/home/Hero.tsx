import Link from 'next/link';
import Image from 'next/image';
import { placeholders } from '@/constants/placeholders';

interface HeroProps {
  title: string;
  description: string;
  cta: string;
  locale: string;
}

export function Hero({ title, description, cta, locale }: HeroProps) {
  return (
    <section className="relative min-h-[400px] overflow-hidden md:min-h-[500px]">
      <div className="absolute inset-0">
        <Image
          src={placeholders.hero}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized
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
        <Link
          href={`/${locale}#pricing`}
          className="mt-8 flex min-h-[44px] items-center justify-center rounded bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-[#f40612]"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
