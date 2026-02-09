import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const { terms } = messages;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="mb-8 font-heading text-3xl font-bold text-foreground md:text-4xl">
        {terms.title}
      </h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-muted whitespace-pre-wrap">{terms.content}</p>
      </div>
    </div>
  );
}
