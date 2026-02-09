import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/getMessages';
import { Header } from '@/components/Header';
import { MiniFooter } from '@/components/MiniFooter';
import { LocaleLangSetter } from '@/components/LocaleLangSetter';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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

  return (
    <>
      <LocaleLangSetter locale={locale} />
      <Header locale={locale as Locale} messages={messages} />
      <main>{children}</main>
      <MiniFooter locale={locale as Locale} messages={messages} />
    </>
  );
}
