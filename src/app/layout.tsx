import type { Metadata } from 'next';
import { Bebas_Neue, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  variable: '--font-heading',
  subsets: ['latin'],
});

const sourceSans = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hungaryiptv.net';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hungary IPTV | Best IPTV in Hungary',
    template: '%s | Hungary IPTV',
  },
  description: 'Stream 50,000+ channels in FHD, 4K and 8K. Best IPTV service in Hungary. No freeze, free guidance.',
  keywords: ['Hungary IPTV', 'IPTV Hungary', 'IPTV', 'streaming', 'live TV', '50,000+ channels', 'FHD 4K 8K'],
  openGraph: {
    type: 'website',
    siteName: 'Hungary IPTV',
    images: [{ url: '/images/logo/logo.webp', width: 512, height: 512, alt: 'huIPTV' }],
  },
  twitter: {
    card: 'summary',
    title: 'Hungary IPTV | Best IPTV in Hungary',
    description: 'Stream 50,000+ channels in FHD, 4K and 8K. Best IPTV in Hungary.',
  },
  icons: {
    icon: '/images/logo/logo.webp',
    apple: '/images/logo/logo.webp',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${sourceSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
