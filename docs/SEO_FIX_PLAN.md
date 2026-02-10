# SEO Fix Plan – Critical & Important Checklist

This document is a step-by-step map to fix the critical and important SEO items. Each section lists the target file(s), current behaviour, target behaviour, and concrete steps.

---

## Overview

| Priority   | # | Item                          | Primary file(s) |
|-----------|---|-------------------------------|------------------|
| Critical  | 1 | Per-page canonical URLs       | Each page under `[locale]` |
| Critical  | 2 | Unique title/description     | Same pages + locale layout |
| Critical  | 3 | Sitemap                       | `src/app/sitemap.ts` (new) |
| Critical  | 4 | robots.txt                    | `src/app/robots.ts` (new) |
| Important | 5 | Hero image alt                | `src/components/home/Hero.tsx` |
| Important | 6 | Twitter card type             | `src/app/layout.tsx`, `[locale]/layout.tsx` |
| Important | 7 | Blog post metadata + schema   | `src/app/[locale]/blog/[slug]/page.tsx` |
| Important | 8 | Server-set html lang          | Root + locale layout (optional) |

---

## Critical 1: Per-page canonical URLs

**Problem:** In `src/app/[locale]/layout.tsx`, `alternates.canonical` is set to `/${locale}` for all pages. So `/en/pricing`, `/en/blog`, `/en/blog/slug` all get canonical `/en`.

**Target:** Each URL must have its own canonical:

- Home: `/{locale}`
- Pricing: `/{locale}/pricing`
- About: `/{locale}/about`
- Blog list: `/{locale}/blog`
- Blog post: `/{locale}/blog/{slug}`
- Terms: `/{locale}/terms`
- Privacy: `/{locale}/privacy`
- Refund: `/{locale}/refund`

**Approach:**

1. **Locale layout**  
   - In `src/app/[locale]/layout.tsx`, remove `alternates.canonical` from `generateMetadata` (or set it only when we know the segment is the homepage — Next.js doesn’t give the full path in layout).  
   - Better: **do not set canonical in the locale layout.** Set it only in each page’s metadata so the canonical is the full path.

2. **Homepage**  
   - In `src/app/[locale]/page.tsx`, add `export const metadata` (or `generateMetadata`) with:
     - `alternates: { canonical: `/${locale}` }`
   - (And title/description for Critical 2.)

3. **Other pages**  
   - In each of the following, add metadata (or `generateMetadata`) with `alternates.canonical` set to the full path of that page:
     - `src/app/[locale]/pricing/page.tsx` → `/${locale}/pricing`
     - `src/app/[locale]/about/page.tsx` → `/${locale}/about`
     - `src/app/[locale]/blog/page.tsx` → `/${locale}/blog`
     - `src/app/[locale]/blog/[slug]/page.tsx` → `/${locale}/blog/${slug}`
     - `src/app/[locale]/terms/page.tsx` → `/${locale}/terms`
     - `src/app/[locale]/privacy/page.tsx` → `/${locale}/privacy`
     - `src/app/[locale]/refund/page.tsx` → `/${locale}/refund`

**Note:** If a page uses `generateMetadata`, return `alternates: { canonical: '...' }` from it. Metadata from the page is merged with the layout; the page’s canonical will override the layout’s.

---

## Critical 2: Unique title and description per page

**Problem:** Only the locale layout sets title and description, so every page under that locale shows the same title (e.g. "Hungary IPTV | Best IPTV in Hungary") and the same description.

**Target:** Every important page has its own title and description, e.g.:

- Home: existing (can stay as in layout).
- Pricing: e.g. "Pricing | Hungary IPTV" + pricing-focused description.
- About: e.g. "About Us | Hungary IPTV" + about description.
- Blog: e.g. "Blog | Hungary IPTV" + blog list description.
- Blog post: "{Post title} | Hungary IPTV" + post excerpt.
- Terms: "Terms of Service | Hungary IPTV" + short description.
- Privacy: "Privacy Policy | Hungary IPTV" + short description.
- Refund: "Refund Policy | Hungary IPTV" + short description.

**Approach:**

1. **Locale layout**  
   - Keep `generateMetadata` in `src/app/[locale]/layout.tsx` for **default** title/description and for `openGraph`, `twitter`, `alternates.languages`.  
   - Use these defaults only for the homepage (or when a child page doesn’t override). Child pages will override by exporting their own metadata.

2. **Homepage**  
   - In `src/app/[locale]/page.tsx`, add metadata (or `generateMetadata`) with:
     - `title`: use existing titles from layout (or move them here for homepage only).
     - `description`: use existing descriptions.
   - This keeps the current home title/description explicit on the home page.

3. **Pricing**  
   - In `src/app/[locale]/pricing/page.tsx`, add `generateMetadata`.  
   - Use `getMessages(locale)` to get pricing title/subtitle (or add i18n keys for meta description).  
   - Return: `title: pricing.title + ' | Hungary IPTV'` (or from i18n), `description`: pricing subtitle or a new key like `pricing.metaDescription`.

4. **About**  
   - In `src/app/[locale]/about/page.tsx`, add `generateMetadata`.  
   - Use about title and a short description (e.g. from about.story.content snippet or new i18n key `about.metaDescription`).

5. **Blog list**  
   - In `src/app/[locale]/blog/page.tsx`, add `generateMetadata`.  
   - Return title: e.g. `blog.title + ' | Hungary IPTV'`, description: `blog.subtitle`.

6. **Blog post**  
   - In `src/app/[locale]/blog/[slug]/page.tsx`, add `generateMetadata`.  
   - Await `params`, get `getPost(slug, locale)`. If no post, return `{}`.  
   - Return: `title: post.title + ' | Hungary IPTV'`, `description: post.excerpt`, and canonical `/${locale}/blog/${slug}`.

7. **Terms, Privacy, Refund**  
   - In each of `terms/page.tsx`, `privacy/page.tsx`, `refund/page.tsx`, add `generateMetadata`.  
   - Use existing i18n (e.g. `terms.title`, `privacy.title`, `refund.title`) and a short meta description (add keys like `terms.metaDescription` in `en.json` and `hu.json` if needed).

**i18n:** Add meta description keys where missing, e.g. under `pricing`, `about`, `blog`, `terms`, `privacy`, `refund` in `src/i18n/messages/en.json` and `hu.json`.

---

## Critical 3: Sitemap

**Problem:** There is no sitemap. Crawlers have no explicit list of URLs.

**Target:** A sitemap at `https://hungaryiptv.net/sitemap.xml` that includes all important URLs with optional `lastModified`, `changeFrequency`, and `priority`.

**Approach:**

1. **Create `src/app/sitemap.ts`** (Next.js 13+ App Router convention).  
   - Export a default function that returns an array of objects with at least:
     - `url`: full URL (e.g. `https://hungaryiptv.net/en`)
     - Optionally: `lastModified` (Date or ISO string), `changeFrequency`, `priority`.

2. **URLs to include:**
   - Base: `https://hungaryiptv.net` (or omit if you redirect root to a locale).
   - For each locale `en`, `hu`:
     - `/{locale}`
     - `/{locale}/pricing`
     - `/{locale}/about`
     - `/{locale}/blog`
     - `/{locale}/terms`
     - `/{locale}/privacy`
     - `/{locale}/refund`
   - For each blog post: get slugs from `getAllPostParams()` (or equivalent from `src/lib/blog.ts`), then for each `{ locale, slug }`: `/{locale}/blog/{slug}`.

3. **Implementation details:**
   - Use `metadataBase` or a constant `siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hungaryiptv.net'`.
   - For blog posts, call `getAllPostParams()` and map to `{ url: `${siteUrl}/${locale}/blog/${slug}`, lastModified: new Date() }` (or derive lastModified from file stats in the blog lib if you prefer).
   - Return type: `MetadataRoute.Sitemap` (array of `{ url: string, lastModified?: string | Date, changeFrequency?: ..., priority?: number }`).

4. **Verification:** After deployment, open `https://hungaryiptv.net/sitemap.xml` and confirm all expected URLs are present.

---

## Critical 4: robots.txt

**Problem:** There is no `robots.txt`. Crawlers don’t get an explicit allow rule or sitemap reference.

**Target:** A `robots.txt` that allows crawling and points to the sitemap.

**Approach:**

1. **Create `src/app/robots.ts`** (Next.js 13+ App Router convention).  
   - Export a default function that returns a `MetadataRoute.Robots` object, e.g.:
     - `rules: { userAgent: '*', allow: '/' }` (or more restrictive if needed).
     - `sitemap: 'https://hungaryiptv.net/sitemap.xml'` (or `${siteUrl}/sitemap.xml` using the same `siteUrl` as in the sitemap).

2. **Verification:** After deployment, open `https://hungaryiptv.net/robots.txt` and confirm it shows the allow rule and the sitemap URL.

---

## Important 5: Hero image alt

**Problem:** In `src/components/home/Hero.tsx`, the hero image has `alt=""`. Empty alt is fine for purely decorative images, but the hero is meaningful for the page; a short descriptive alt helps accessibility and SEO.

**Target:** A concise, descriptive alt that includes the main value proposition (e.g. Hungary IPTV, streaming, 50,000+ channels).

**Approach:**

1. **Option A (static):**  
   - In `Hero.tsx`, set `alt="Hungary IPTV - Stream 50,000+ channels in FHD, 4K and 8K"` (or similar).

2. **Option B (i18n):**  
   - Add a key in `en.json` and `hu.json` under `home.hero`, e.g. `heroImageAlt`.  
   - Pass it into `Hero` and use it as `alt={heroImageAlt}`.

Choose one and apply it in `src/components/home/Hero.tsx` (and optionally in the homepage and i18n files).

---

## Important 6: Twitter card type

**Problem:** `twitter.card` is set to `'summary'`. With a clear brand image, `summary_large_image` usually looks better and can improve click-through.

**Target:** Use `card: 'summary_large_image'` and keep the same image as Open Graph (logo or hero).

**Approach:**

1. In **`src/app/layout.tsx`**, in the `metadata` object, set:
   - `twitter: { ..., card: 'summary_large_image' }`.

2. In **`src/app/[locale]/layout.tsx`**, in the object returned by `generateMetadata`, set:
   - `twitter: { ..., card: 'summary_large_image' }`.

3. Ensure `openGraph.images` (and thus Twitter’s fallback to OG image) is set so the large image is the logo (or a dedicated social image). You already have `/images/logo/logo.webp` in the locale layout; root layout can mirror that if needed.

---

## Important 7: Blog post metadata and Article schema

**Problem:**  
- Blog post pages don’t set their own title/description/OG, so they inherit the locale homepage metadata.  
- There is no Article/BlogPosting JSON-LD for individual posts, which can help rich results and clarity for search engines.

**Target:**  
- Each blog post page has: unique title (`{post.title} | Hungary IPTV`), description (e.g. `post.excerpt`), canonical `/{locale}/blog/{slug}`, and Open Graph/Twitter with the same.  
- Each blog post page outputs a JSON-LD script with type `Article` or `BlogPosting` including headline, description, datePublished, publisher (and optionally author, image, dateModified).

**Approach:**

1. **Metadata in `src/app/[locale]/blog/[slug]/page.tsx`:**
   - Add `generateMetadata({ params })`.
   - Await `params` to get `locale` and `slug`.
   - If locale not in locales, return `{}`.
   - Call `getPost(slug, locale)`. If no post, return `{}`.
   - Return:
     - `title: post.title + ' | Hungary IPTV'`
     - `description: post.excerpt`
     - `openGraph: { title, description, url: `${siteUrl}/${locale}/blog/${slug}`, type: 'article', ... }`
     - `twitter: { card: 'summary_large_image', title, description }`
     - `alternates: { canonical: `/${locale}/blog/${slug}` }`

2. **Article JSON-LD in the same file:**
   - In the page component, after fetching `post`, build an object for Article/BlogPosting, e.g.:
     - `@context: 'https://schema.org'`
     - `@type: 'Article'` or `'BlogPosting'`
     - `headline: post.title`
     - `description: post.excerpt`
     - `datePublished: post.date`
     - `dateModified: post.date` (or a separate field if you add it later)
     - `publisher: { @type: 'Organization', name: 'Hungary IPTV', logo: { @type: 'ImageObject', url: `${siteUrl}/images/logo/logo.webp` } }`
     - `url: `${siteUrl}/${locale}/blog/${slug}``
   - Sanitize: `JSON.stringify(jsonLd).replace(/</g, '\\u003c')`.
   - Render: `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitized }} />` in the same page (e.g. at the top of the article or in a fragment).

---

## Important 8: Server-set html lang (optional)

**Problem:** Root layout has `<html lang="en">`. The locale is set client-side in `LocaleLangSetter`, so crawlers and no-JS users always see `lang="en"`.

**Target:** The initial HTML has the correct `lang` for the current locale (e.g. `en` or `hu`) when the URL is `/{locale}/...`.

**Approach (high level):**

- The root layout in Next.js owns `<html>`. The `[locale]` segment is a child, so the root layout doesn’t have access to the resolved `locale` in the default setup.
- **Option A:** Use middleware to set a cookie or header with the locale from the first segment, then read that in the root layout and pass it into `<html lang={...}>`. Root layout would need to be able to read the request (e.g. via headers or cookies) and render `<html lang={resolvedLocale}>`.
- **Option B:** Move the `<html>` (and optionally `<body>`) into a shared layout that sits inside the `[locale]` segment so it receives the locale. This can require restructuring so that the single `<html>` is still in one place (e.g. a layout that wraps `[locale]` and gets locale from params or from a child).
- **Option C:** Keep current behaviour and document that the default `lang` is `en` and that Hungarian is applied client-side; accept that some crawlers may see only `en` for the initial response.

If you implement Option A or B, the plan is: (1) determine where `locale` is available on the server for the request; (2) pass it into the component that renders `<html>`; (3) set `lang={locale}` (or map `en`/`hu` to `en`/`hu` for the attribute). No code changes are specified here; this is a design choice.

---

## Suggested order of implementation

1. **Critical 4: robots.ts** – Quick win, no dependencies.  
2. **Critical 3: sitemap.ts** – Depends on knowing all routes (including blog slugs); can use `getAllPostParams()`.  
3. **Critical 1 & 2 together, per page:**  
   - **Locale layout:** Remove canonical from layout (or leave it only for the default “home” if you keep homepage metadata in layout).  
   - **Homepage:** Add metadata (or generateMetadata) with canonical and title/description.  
   - **Pricing, About, Blog list:** Add generateMetadata with title, description, canonical.  
   - **Terms, Privacy, Refund:** Add generateMetadata and i18n keys if needed.  
   - **Blog post:** Add generateMetadata + Article JSON-LD.  
4. **Important 5: Hero alt** – Single file change.  
5. **Important 6: Twitter card** – Two layout files.  
6. **Important 7:** Done with blog post metadata and schema above.  
7. **Important 8:** Optional; implement only if you want server-set `lang`.

---

## File change summary

| File | Action |
|------|--------|
| `src/app/robots.ts` | Create: allow `/`, sitemap URL. |
| `src/app/sitemap.ts` | Create: list all URLs (home, pricing, about, blog, terms, privacy, refund, each blog post). |
| `src/app/[locale]/layout.tsx` | Remove canonical from generateMetadata; optionally keep default title/description for home. Set twitter.card to `summary_large_image`. |
| `src/app/[locale]/page.tsx` | Add metadata or generateMetadata: title, description, canonical `/${locale}`. |
| `src/app/[locale]/pricing/page.tsx` | Add generateMetadata: title, description, canonical `/${locale}/pricing`. |
| `src/app/[locale]/about/page.tsx` | Add generateMetadata: title, description, canonical `/${locale}/about`. |
| `src/app/[locale]/blog/page.tsx` | Add generateMetadata: title, description, canonical `/${locale}/blog`. |
| `src/app/[locale]/blog/[slug]/page.tsx` | Add generateMetadata (title, description, canonical, OG, Twitter); add Article JSON-LD script. |
| `src/app/[locale]/terms/page.tsx` | Add generateMetadata: title, description, canonical `/${locale}/terms`. |
| `src/app/[locale]/privacy/page.tsx` | Add generateMetadata: title, description, canonical `/${locale}/privacy`. |
| `src/app/[locale]/refund/page.tsx` | Add generateMetadata: title, description, canonical `/${locale}/refund`. |
| `src/app/layout.tsx` | Set `twitter.card` to `summary_large_image`. |
| `src/components/home/Hero.tsx` | Set descriptive `alt` on hero image (static or via prop/i18n). |
| `src/i18n/messages/en.json` | Add meta description keys if used (e.g. pricing, about, terms, privacy, refund). |
| `src/i18n/messages/hu.json` | Same keys as en.json. |

---

## Verification checklist

After implementing:

- [ ] Each main URL has a unique title and description in the HTML `<title>` and `<meta name="description">`.
- [ ] Each main URL has `<link rel="canonical" href="https://hungaryiptv.net/...">` with the correct full path.
- [ ] `https://hungaryiptv.net/robots.txt` returns allow and sitemap.
- [ ] `https://hungaryiptv.net/sitemap.xml` lists all intended URLs.
- [ ] Hero image has a non-empty, descriptive `alt`.
- [ ] Twitter card meta uses `summary_large_image` and an image URL.
- [ ] Blog post pages have Article JSON-LD and unique meta.
- [ ] (Optional) Initial `<html lang="...">` matches the locale for `/{locale}/...` when server-set lang is implemented.

You can use Google Search Console (URL inspection, sitemaps) and a rich results test (e.g. Google’s) to validate structured data and indexing.
