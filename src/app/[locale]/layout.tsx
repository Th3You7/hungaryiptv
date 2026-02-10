import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import { Header } from '@/components/Header';
import { MiniFooter } from '@/components/MiniFooter';
import { LocaleLangSetter } from '@/components/LocaleLangSetter';
import { WhatsAppSticky } from '@/components/WhatsAppSticky';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hungaryiptv.net';

const titles: Record<Locale, string> = {
  en: 'Hungary IPTV | Best IPTV in Hungary',
  hu: 'Hungary IPTV | Legjobb IPTV Magyarországon',
};

const descriptions: Record<Locale, string> = {
  en: 'Stream 50,000+ channels in FHD, 4K and 8K. Best IPTV service in Hungary. No freeze, free guidance.',
  hu: 'Streamelj 50 000+ csatornát FHD, 4K és 8K minőségben. Legjobb IPTV szolgáltatás Magyarországon. Nincs fagyás, ingyenes útmutatás.',
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
  if (!locales.includes(locale as Locale)) {
    return {};
  }
  const base = `${siteUrl}/${locale}`;
  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],
    openGraph: {
      title: titles[locale as Locale],
      description: descriptions[locale as Locale],
      url: base,
      locale: locale === 'hu' ? 'hu_HU' : 'en_US',
      type: 'website',
      images: [{ url: '/images/logo/logo.webp', width: 512, height: 512, alt: 'huIPTV' }],
    },
    twitter: {
      title: titles[locale as Locale],
      description: descriptions[locale as Locale],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        hu: '/hu',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages(locale as Locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Hungary IPTV',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo/logo.webp`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Hungary IPTV',
        url: siteUrl,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: locale === 'hu' ? 'hu' : 'en',
      },
    ],
  };

  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
      <LocaleLangSetter locale={locale} />
      <Header locale={locale as Locale} messages={messages} />
      <main>{children}</main>
      <MiniFooter locale={locale as Locale} messages={messages} />
      <WhatsAppSticky locale={locale as Locale} />
    </>
  );
}
