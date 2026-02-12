import type { MetadataRoute } from 'next';
import { getAllPostParams } from '@/lib/blog';
import { locales, type Locale } from '@/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://streamatlas.com';

const staticPaths: { path: string; changeFrequency?: 'weekly' | 'monthly' | 'yearly'; priority?: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: 'pricing', changeFrequency: 'weekly', priority: 0.9 },
  { path: 'about', changeFrequency: 'monthly', priority: 0.8 },
  { path: 'blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: 'terms', changeFrequency: 'yearly', priority: 0.4 },
  { path: 'privacy', changeFrequency: 'yearly', priority: 0.4 },
  { path: 'refund', changeFrequency: 'yearly', priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogParams = getAllPostParams();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of [...locales]) {
    for (const { path, changeFrequency, priority } of staticPaths) {
      entries.push({
        url: path ? `${siteUrl}/${locale}/${path}` : `${siteUrl}/${locale}`,
        lastModified: now,
        changeFrequency,
        priority,
      });
    }
  }

  for (const { locale, slug } of blogParams) {
    entries.push({
      url: `${siteUrl}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    });
  }

  return entries;
}
