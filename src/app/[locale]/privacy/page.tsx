import type { Metadata } from 'next';
import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';

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
  const privacy = messages.privacy as { title: string; metaDescription: string };
  return {
    title: `${privacy.title} | StreamAtlas`,
    description: privacy.metaDescription,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const { privacy } = messages;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="mb-8 font-heading text-3xl font-bold text-foreground md:text-4xl">
        {privacy.title}
      </h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-muted whitespace-pre-wrap">{privacy.content}</p>
      </div>
    </div>
  );
}
