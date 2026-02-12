import type { Metadata } from 'next';
import { Bebas_Neue, Source_Sans_3 } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://streamatlas.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'StreamAtlas | Best IPTV Service Provider USA, Canada and Europe – Premium IPTV Worldwide',
    template: '%s | StreamAtlas',
  },
  description: 'Stream 50,000+ channels in FHD, 4K and 8K. Strong servers, no freeze. Best IPTV for USA, Canada and Europe—premium quality worldwide.',
  keywords: ['StreamAtlas', 'IPTV', 'streaming', 'live TV', '50,000+ channels', 'FHD 4K 8K', 'premium IPTV', 'IPTV USA', 'IPTV Canada', 'IPTV Europe'],
  openGraph: {
    type: 'website',
    siteName: 'StreamAtlas',
    images: [{ url: '/images/logo/logo.webp', width: 512, height: 512, alt: 'StreamAtlas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreamAtlas | Best IPTV Service Provider USA, Canada and Europe – Premium IPTV Worldwide',
    description: 'Stream 50,000+ channels in FHD, 4K and 8K. Strong servers, no freeze. Premium IPTV worldwide.',
  },
  icons: {
    icon: '/favicon.ico',
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
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
