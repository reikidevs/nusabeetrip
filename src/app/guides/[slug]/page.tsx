import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, guideHowToJsonLd } from '@/lib/seo';
import { absoluteUrl, SITE } from '@/lib/site-config';
import {
  getGuideBySlug,
  getAllGuides,
  getGuidesBySlugs,
  getGuideArticleBody,
  getGuideWordCount,
} from '@/lib/guides';
import GuideContent from './GuideContent';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const g = getGuideBySlug(params.slug);
  if (!g) {
    return buildMetadata({
      title: 'Guide not found',
      description: 'Browse our other Nusa Penida travel guides.',
      path: `/guides/${params.slug}`,
      index: false,
    });
  }
  return buildMetadata({
    title: g.title,
    description: g.excerpt,
    path: `/guides/${g.slug}`,
    keywords: g.keywords,
    image: g.heroImage,
    imageAlt: `${g.title} — Nusa Penida travel guide`,
    ogType: 'article',
    datePublished: g.datePublished,
    dateModified: g.dateModified,
  });
}

export default function GuideDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const g = getGuideBySlug(params.slug);
  if (!g) notFound();

  const related = getGuidesBySlugs(g.relatedGuideSlugs);

  return (
    <>
      <JsonLd
        id={`ld-breadcrumbs-${g.slug}`}
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Guides', path: '/guides' },
          { name: g.title, path: `/guides/${g.slug}` },
        ])}
      />
      <JsonLd
        id={`ld-article-${g.slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: g.title,
          description: g.excerpt,
          image: absoluteUrl(g.heroImage),
          author: {
            '@type': 'Organization',
            '@id': `${SITE.url}#organization`,
            name: SITE.name,
            url: SITE.url,
          },
          publisher: {
            '@type': 'Organization',
            '@id': `${SITE.url}#organization`,
            name: SITE.name,
            logo: {
              '@type': 'ImageObject',
              url: absoluteUrl(SITE.ogImage),
            },
          },
          datePublished: g.datePublished,
          dateModified: g.dateModified,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': absoluteUrl(`/guides/${g.slug}`),
          },
          articleSection: g.category,
          keywords: g.keywords.join(', '),
          wordCount: getGuideWordCount(g),
          timeRequired: `PT${g.readingMinutes}M`,
          articleBody: getGuideArticleBody(g),
          about: {
            '@type': 'TouristDestination',
            name: 'Nusa Penida',
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Bali',
              addressCountry: 'ID',
            },
          },
          inLanguage: ['en', 'id'],
          isAccessibleForFree: true,
        }}
      />

      {g.faq && g.faq.length > 0 && (
        <JsonLd id={`ld-faq-${g.slug}`} data={faqJsonLd(g.faq)} />
      )}

      {g.howTo && g.howTo.steps.length > 0 && (
        <JsonLd
          id={`ld-howto-${g.slug}`}
          data={guideHowToJsonLd({
            name: g.howTo.name,
            description: g.howTo.description,
            totalTime: g.howTo.totalTime,
            steps: g.howTo.steps,
          })}
        />
      )}

      <GuideContent guide={g} relatedGuides={related} />
    </>
  );
}
