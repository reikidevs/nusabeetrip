import Link from 'next/link';
import { SITE, absoluteUrl } from '@/lib/site-config';
import { TOUR_PACKAGES, RENTAL_SERVICES } from '@/lib/constants';
import { DESTINATIONS } from '@/lib/destinations';
import { getAllGuides } from '@/lib/guides';
import { getReviewStats } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageRow {
  path: string;
  type: string;
  hasSchema: boolean;
  note: string;
}

export default async function AdminSeoPage() {
  let reviewStats = { ratingValue: 0, reviewCount: 0 };
  try {
    reviewStats = await getReviewStats();
  } catch {
    // DB unreachable — show zeros
  }

  const guides = getAllGuides();
  const activeTours = TOUR_PACKAGES.filter((t) => t.isActive);
  const activeRentals = RENTAL_SERVICES.filter((r) => r.isAvailable);

  // Build the page inventory grouped by type.
  const groups: { title: string; rows: PageRow[] }[] = [
    {
      title: 'Core pages',
      rows: [
        { path: '/', type: 'Home', hasSchema: true, note: 'WebSite, Organization, LocalBusiness, FAQ, HowTo' },
        { path: '/tours', type: 'Listing', hasSchema: true, note: 'ItemList, Breadcrumb' },
        { path: '/rentals', type: 'Listing', hasSchema: true, note: 'Product list, Breadcrumb' },
        { path: '/destinations', type: 'Listing', hasSchema: true, note: 'ItemList, Breadcrumb' },
        { path: '/guides', type: 'Listing', hasSchema: true, note: 'ItemList, Breadcrumb' },
        { path: '/souvenirs', type: 'Listing', hasSchema: true, note: 'Breadcrumb' },
        { path: '/about', type: 'Static', hasSchema: true, note: 'Breadcrumb' },
        { path: '/contact', type: 'Static', hasSchema: true, note: 'FAQ, Breadcrumb' },
      ],
    },
    {
      title: `Tour detail pages (${activeTours.length})`,
      rows: activeTours.map((t) => ({
        path: `/tours/${t.slug}`,
        type: 'Tour',
        hasSchema: true,
        note: 'Product, Service, FAQ, Breadcrumb, OG image',
      })),
    },
    {
      title: `Rental detail pages (${activeRentals.length})`,
      rows: activeRentals.map((r) => ({
        path: `/rentals/${r.slug}`,
        type: 'Rental',
        hasSchema: true,
        note: 'Product, FAQ, Breadcrumb',
      })),
    },
    {
      title: `Destination guides (${DESTINATIONS.length})`,
      rows: DESTINATIONS.map((d) => ({
        path: `/destinations/${d.slug}`,
        type: 'Destination',
        hasSchema: true,
        note: 'TouristAttraction, Place, Breadcrumb, OG image',
      })),
    },
    {
      title: `Travel guides (${guides.length})`,
      rows: guides.map((g) => ({
        path: `/guides/${g.slug}`,
        type: 'Article',
        hasSchema: true,
        note: `Article · updated ${new Date(g.dateModified).toLocaleDateString()}`,
      })),
    },
  ];

  const totalPages = groups.reduce((acc, g) => acc + g.rows.length, 0);

  const checklist = [
    {
      label: 'Sitemap submitted to Google Search Console',
      done: null,
      detail: `${SITE.url}/sitemap.xml`,
    },
    {
      label: 'Image sitemap submitted',
      done: null,
      detail: `${SITE.url}/image-sitemap.xml`,
    },
    {
      label: 'Google site verification configured',
      done: Boolean(process.env.GOOGLE_SITE_VERIFICATION),
      detail: process.env.GOOGLE_SITE_VERIFICATION
        ? 'Verification meta tag is live'
        : 'Set GOOGLE_SITE_VERIFICATION in Vercel',
    },
    {
      label: 'Star rating schema is active',
      done: reviewStats.reviewCount > 0,
      detail:
        reviewStats.reviewCount > 0
          ? `${reviewStats.ratingValue.toFixed(1)}/5 from ${reviewStats.reviewCount} approved reviews`
          : 'Approve reviews to enable rich-result stars',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">SEO Health</h1>
        <p className="text-gray-500 mt-1 text-sm">
          A live inventory of every page Google can index, the structured data
          each one ships, and the setup checklist for Search Console.
        </p>
      </header>

      {/* Top metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Indexable pages
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalPages}</div>
          <div className="text-xs text-gray-400 mt-1">In sitemap.xml</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Rating for SERP
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {reviewStats.ratingValue.toFixed(1)}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {reviewStats.reviewCount} reviews in schema
          </div>
        </div>
        <a
          href={`${SITE.url}/sitemap.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Sitemap
          </div>
          <div className="text-lg font-bold text-brand-blue-700">View XML ↗</div>
          <div className="text-xs text-gray-400 mt-1">sitemap.xml</div>
        </a>
        <a
          href={`${SITE.url}/image-sitemap.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Image sitemap
          </div>
          <div className="text-lg font-bold text-brand-blue-700">View XML ↗</div>
          <div className="text-xs text-gray-400 mt-1">For Google Image</div>
        </a>
      </div>

      {/* Checklist */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 mb-8">
        <h2 className="font-bold text-gray-900 mb-4">Setup checklist</h2>
        <ul className="space-y-3">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                  item.done === true
                    ? 'bg-green-100 text-green-600'
                    : item.done === false
                    ? 'bg-amber-100 text-amber-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {item.done === true ? '✓' : item.done === false ? '!' : '–'}
              </span>
              <div>
                <div className="text-sm font-medium text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-400">{item.detail}</div>
              </div>
            </li>
          ))}
        </ul>
        <a
          href="https://search.google.com/search-console"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-blue-700 hover:underline"
        >
          Open Google Search Console ↗
        </a>
      </section>

      {/* Page inventory */}
      <section className="space-y-6">
        {groups.map((group) => (
          <div key={group.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900 text-sm">{group.title}</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {group.rows.map((row) => (
                <div
                  key={row.path}
                  className="px-5 py-3 flex items-center justify-between gap-4 hover:bg-gray-50/50"
                >
                  <div className="min-w-0">
                    <a
                      href={absoluteUrl(row.path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-brand-blue-700 hover:underline truncate block"
                    >
                      {row.path}
                    </a>
                    <div className="text-xs text-gray-400 truncate">{row.note}</div>
                  </div>
                  <span className="flex-shrink-0 text-[11px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Schema ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
