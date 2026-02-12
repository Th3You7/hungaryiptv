import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPost, getAllPostParams } from '@/lib/blog';
import { getMessages } from '@/i18n/getMessages';
import { locales, type Locale } from '@/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://streamatlas.com';

export function generateStaticParams() {
  return getAllPostParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const post = await getPost(slug, locale as Locale);
  if (!post) return {};
  const url = `${siteUrl}/${locale}/blog/${slug}`;
  const title = `${post.title} | StreamAtlas`;
  return {
    title,
    description: post.excerpt,
    openGraph: {
      url,
      type: 'article',
      title,
      description: post.excerpt,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.excerpt,
    },
    alternates: { canonical: `/${locale}/blog/${slug}` },
  };
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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    publisher: {
      '@type': 'Organization',
      name: 'StreamAtlas',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/logo.webp` },
    },
    url: `${siteUrl}/${locale}/blog/${slug}`,
  };
  const jsonLdString = JSON.stringify(articleJsonLd).replace(/</g, '\\u003c');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
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
    </>
  );
}
