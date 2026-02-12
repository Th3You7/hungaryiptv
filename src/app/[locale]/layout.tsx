import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import { Header } from '@/components/Header';
import { MiniFooter } from '@/components/MiniFooter';
import { LocaleLangSetter } from '@/components/LocaleLangSetter';
import { WhatsAppSticky } from '@/components/WhatsAppSticky';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://streamatlas.com';

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
      locale: { en: 'en_US', hu: 'hu_HU', no: 'nb_NO', de: 'de_DE', sv: 'sv_SE', da: 'da_DK' }[locale as Locale],
      type: 'website',
      images: [{ url: '/images/logo/logo.webp', width: 512, height: 512, alt: 'StreamAtlas' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as Locale],
      description: descriptions[locale as Locale],
    },
    alternates: {
      languages: {
        en: '/en',
        hu: '/hu',
        no: '/no',
        de: '/de',
        sv: '/sv',
        da: '/da',
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
        name: 'StreamAtlas',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo/logo.webp`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'StreamAtlas',
        url: siteUrl,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: locale === 'no' ? 'nb' : locale,
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
