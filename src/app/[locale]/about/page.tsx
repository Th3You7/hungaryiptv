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
  const title = `${messages.about.title} | StreamAtlas`;
  const description =
    (messages.about as { metaDescription?: string }).metaDescription ?? messages.about.story.content;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const { about } = messages;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="mb-12 font-heading text-3xl font-bold text-foreground md:text-4xl">
        {about.title}
      </h1>
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
          {about.story.title}
        </h2>
        <p className="text-muted">{about.story.content}</p>
      </section>
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
          {about.mission.title}
        </h2>
        <p className="text-muted">{about.mission.content}</p>
      </section>
      <section>
        <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">
          {about.values.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {about.values.items.map((item: { title: string; description: string }) => (
            <div
              key={item.title}
              className="rounded-2xl border border-surface-elevated bg-surface p-6"
            >
              <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
