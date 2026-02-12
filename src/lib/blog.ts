import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { locales, type Locale } from '@/i18n/config';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPostMeta {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  date: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

function getFileNames(): { slug: string; locale: Locale }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR);
  const result: { slug: string; locale: Locale }[] = [];
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    for (const locale of locales) {
      const suffix = `.${locale}.md`;
      if (file.endsWith(suffix)) {
        const slug = file.slice(0, -suffix.length);
        result.push({ slug, locale });
        break;
      }
    }
  }
  return result;
}

export function getAllPostParams(): { locale: string; slug: string }[] {
  return getFileNames().map(({ slug, locale }) => ({ locale, slug }));
}

export function getPostSlugsForLocale(locale: Locale): string[] {
  return getFileNames()
    .filter((p) => p.locale === locale)
    .map((p) => p.slug);
}

export async function getPostsForLocale(locale: Locale): Promise<BlogPostMeta[]> {
  const pairs = getFileNames().filter((p) => p.locale === locale);
  const posts: BlogPostMeta[] = [];
  for (const { slug } of pairs) {
    const filePath = path.join(BLOG_DIR, `${slug}.${locale}.md`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    posts.push({
      slug,
      locale,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? '',
      date: data.date ?? '',
    });
  }
  posts.sort((a, b) => (b.date < a.date ? -1 : 1));
  return posts;
}

export async function getPost(slug: string, locale: Locale): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.${locale}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  const contentHtml = processed.toString();
  return {
    slug,
    locale,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? '',
    date: data.date ?? '',
    contentHtml,
  };
}
