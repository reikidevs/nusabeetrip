import { NextResponse } from 'next/server';
import { absoluteUrl } from '@/lib/site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES, SOUVENIRS } from '@/lib/constants';
import { DESTINATIONS } from '@/lib/destinations';
import { getAllGuides } from '@/lib/guides';

/**
 * Image sitemap (Google Image search).
 *
 * Format follows the official Google image sitemap extension:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 *
 * Each <url> entry can contain multiple <image:image> children. The page URL
 * gives Google context; the image URLs feed Google Image search.
 */

export const revalidate = 3600; // refresh hourly

interface ImageEntry {
  loc: string;
  caption?: string;
  title?: string;
}

interface UrlEntry {
  pageUrl: string;
  images: ImageEntry[];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildEntries(): UrlEntry[] {
  const entries: UrlEntry[] = [];

  // Homepage hero + featured destinations gallery
  entries.push({
    pageUrl: absoluteUrl('/'),
    images: [
      {
        loc: absoluteUrl('/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg'),
        caption: 'Kelingking Beach Nusa Penida',
        title: 'Kelingking Beach',
      },
      {
        loc: absoluteUrl('/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg'),
        caption: 'Diamond Beach Nusa Penida',
        title: 'Diamond Beach',
      },
      {
        loc: absoluteUrl('/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg'),
        caption: 'Snorkeling with Manta Rays',
        title: 'Manta Snorkeling',
      },
      {
        loc: absoluteUrl('/images/West%20Trip/West%20Trip%20Broken%20Beach%202.jpeg'),
        caption: 'Broken Beach Nusa Penida',
        title: 'Broken Beach',
      },
    ],
  });

  // Tour listing + per-tour images
  entries.push({
    pageUrl: absoluteUrl('/tours'),
    images: TOUR_PACKAGES.filter((p) => p.isActive && p.image).map((p) => ({
      loc: absoluteUrl(p.image as string),
      caption: `${p.name} — ${p.duration}-hour Nusa Penida tour`,
      title: p.name,
    })),
  });

  TOUR_PACKAGES.filter((p) => p.isActive && p.image).forEach((p) => {
    entries.push({
      pageUrl: absoluteUrl(`/tours/${p.slug}`),
      images: [
        {
          loc: absoluteUrl(p.image as string),
          caption: p.description,
          title: p.name,
        },
      ],
    });
  });

  // Rental listing + per-rental images
  entries.push({
    pageUrl: absoluteUrl('/rentals'),
    images: RENTAL_SERVICES.filter((r) => r.isAvailable && r.image).map((r) => ({
      loc: absoluteUrl(r.image as string),
      caption: `${r.model} ${r.vehicleType} rental Nusa Penida`,
      title: r.model,
    })),
  });

  RENTAL_SERVICES.filter((r) => r.isAvailable && r.image).forEach((r) => {
    entries.push({
      pageUrl: absoluteUrl(`/rentals/${r.slug}`),
      images: [
        {
          loc: absoluteUrl(r.image as string),
          caption: `Rent the ${r.model} in Nusa Penida`,
          title: r.model,
        },
      ],
    });
  });

  // Destination pages — multiple images each
  DESTINATIONS.forEach((d) => {
    const seen = new Set<string>();
    const allImages = [d.heroImage, ...d.images]
      .filter((img) => {
        if (seen.has(img)) return false;
        seen.add(img);
        return true;
      })
      .map((img, idx) => ({
        loc: absoluteUrl(img),
        caption: idx === 0 ? d.description.en : `${d.name} Nusa Penida — photo ${idx + 1}`,
        title: d.name,
      }));

    entries.push({
      pageUrl: absoluteUrl(`/destinations/${d.slug}`),
      images: allImages,
    });
  });

  // Souvenirs listing
  entries.push({
    pageUrl: absoluteUrl('/souvenirs'),
    images: SOUVENIRS.filter((s) => s.isAvailable && s.image)
      .slice(0, 9)
      .map((s) => ({
        loc: absoluteUrl(s.image as string),
        caption: `${s.name} — Nusa Penida souvenir`,
        title: s.name,
      })),
  });

  // Travel guides
  getAllGuides().forEach((g) => {
    entries.push({
      pageUrl: absoluteUrl(`/guides/${g.slug}`),
      images: [
        {
          loc: absoluteUrl(g.heroImage),
          caption: g.excerpt,
          title: g.title,
        },
      ],
    });
  });

  return entries;
}

export async function GET(): Promise<NextResponse> {
  const entries = buildEntries();

  const xmlBody = entries
    .map((entry) => {
      const imageBlocks = entry.images
        .map((img) => {
          const captionTag = img.caption
            ? `<image:caption>${escapeXml(img.caption)}</image:caption>`
            : '';
          const titleTag = img.title
            ? `<image:title>${escapeXml(img.title)}</image:title>`
            : '';
          return `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      ${captionTag}
      ${titleTag}
    </image:image>`;
        })
        .join('\n');

      return `  <url>
    <loc>${escapeXml(entry.pageUrl)}</loc>
${imageBlocks}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlBody}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
}
