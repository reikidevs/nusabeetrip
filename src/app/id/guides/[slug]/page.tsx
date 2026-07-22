import type { Metadata } from 'next';
import GuideDetailPage from '../../../guides/[slug]/page';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const guide = getGuideBySlug(params.slug, 'id');
  if (!guide) {
    return buildMetadata({
      title: 'Panduan tidak ditemukan',
      description: 'Lihat panduan wisata Nusa Penida lainnya.',
      path: `/id/guides/${params.slug}`,
      index: false,
    });
  }

  return buildMetadata({
    title: guide.title,
    description: guide.excerpt,
    path: `/id/guides/${guide.slug}`,
    keywords: guide.keywords,
    image: guide.heroImage,
    imageAlt: `${guide.title} - Panduan wisata Nusa Penida`,
    ogType: 'article',
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
  });
}

export default GuideDetailPage;
