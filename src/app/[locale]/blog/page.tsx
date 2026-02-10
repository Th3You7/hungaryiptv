import Link from 'next/link';
import { getMessages } from '@/i18n/getMessages';
import { getPostsForLocale } from '@/lib/blog';
import { locales, type Locale } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale as Locale);
  const { blog } = messages;
  const posts = await getPostsForLocale(locale as Locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="mb-4 font-heading text-3xl font-bold text-foreground md:text-4xl">
        {blog.title}
      </h1>
      <p className="mb-12 text-muted">{blog.subtitle}</p>
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="block rounded-lg border border-surface-elevated bg-surface p-6 transition-colors hover:border-primary/50"
          >
            <time className="text-sm text-muted" dateTime={post.date}>
              {post.date}
            </time>
            <h2 className="mt-2 font-heading text-xl font-bold text-foreground">
              {post.title}
            </h2>
            <p className="mt-2 text-muted">{post.excerpt}</p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">
              {blog.readMore} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
