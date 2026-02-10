import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getAllPostParams } from '@/lib/blog';
import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';

export function generateStaticParams() {
  return getAllPostParams();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const [post, messages] = await Promise.all([
    getPost(slug, locale as Locale),
    getMessages(locale as Locale),
  ]);
  if (!post) notFound();
  const backLabel = (messages as { blog: { backToBlog: string } }).blog.backToBlog;

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <Link
        href={`/${locale}/blog`}
        className="mb-4 inline-block text-sm font-medium text-primary hover:underline"
      >
        ← {backLabel}
      </Link>
      <time className="mt-4 block text-sm text-muted" dateTime={post.date}>
        {post.date}
      </time>
      <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
      <div
        className="prose prose-invert mt-8 max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-muted prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
