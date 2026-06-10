import Link from 'next/link';
import {
  getReviewStatusCounts,
  getReviewStats,
  getContactInquiries,
  getAllReviews,
} from '@/lib/db/queries';
import { TOUR_PACKAGES, RENTAL_SERVICES } from '@/lib/constants';
import { DESTINATIONS } from '@/lib/destinations';
import { getAllGuides } from '@/lib/guides';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function loadData() {
  try {
    const [counts, stats, inquiries, recent] = await Promise.all([
      getReviewStatusCounts(),
      getReviewStats(),
      getContactInquiries(10).catch(() => []),
      getAllReviews(5).catch(() => []),
    ]);
    return { counts, stats, inquiries, recent, ok: true };
  } catch {
    return {
      counts: { pending: 0, approved: 0, rejected: 0, spam: 0, total: 0 },
      stats: { ratingValue: 0, reviewCount: 0 },
      inquiries: [],
      recent: [],
      ok: false,
    };
  }
}

export default async function AdminOverviewPage() {
  const { counts, stats, inquiries, recent, ok } = await loadData();

  const indexablePages =
    7 + // static pages
    TOUR_PACKAGES.filter((t) => t.isActive).length +
    RENTAL_SERVICES.filter((r) => r.isAvailable).length +
    DESTINATIONS.length +
    getAllGuides().length;

  const cards = [
    {
      label: 'Pending reviews',
      value: counts.pending,
      href: '/admin/reviews?status=pending',
      accent: counts.pending > 0 ? 'text-amber-600' : 'text-gray-900',
      sub: counts.pending > 0 ? 'Needs your attention' : 'All caught up',
    },
    {
      label: 'Published reviews',
      value: counts.approved,
      href: '/admin/reviews?status=approved',
      accent: 'text-gray-900',
      sub: `Avg rating ${stats.ratingValue.toFixed(1)} / 5`,
    },
    {
      label: 'New inquiries',
      value: inquiries.length,
      href: '/admin/inquiries',
      accent: 'text-gray-900',
      sub: 'Booking requests',
    },
    {
      label: 'Indexable pages',
      value: indexablePages,
      href: '/admin/seo',
      accent: 'text-gray-900',
      sub: 'Live in sitemap',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Your site at a glance. Reviews you approve here feed straight into the
          star ratings Google shows in search results.
        </p>
      </header>

      {!ok && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
          Could not reach the database. Showing what we can — check your
          connection and refresh.
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-gray-200 transition-all"
          >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              {c.label}
            </div>
            <div className={`text-3xl font-bold ${c.accent}`}>{c.value}</div>
            <div className="text-xs text-gray-400 mt-1">{c.sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent reviews */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Latest reviews</h2>
            <Link href="/admin/reviews" className="text-sm text-brand-blue-700 font-medium hover:underline">
              View all
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">No reviews yet.</p>
          ) : (
            <ul className="space-y-3">
              {recent.map((r) => (
                <li key={r.id} className="flex items-start gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-brand-blue-100 text-brand-blue-800 flex items-center justify-center font-semibold flex-shrink-0">
                    {r.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 truncate">{r.authorName}</span>
                      <span className="text-amber-400 text-xs">{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="text-gray-500 text-xs truncate">{r.title || r.body}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                      r.status === 'approved'
                        ? 'bg-green-100 text-green-700'
                        : r.status === 'pending'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Quick links */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Quick actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/reviews?status=pending" className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="text-sm font-semibold text-gray-900">Moderate reviews</span>
              <span className="text-xs text-gray-500">{counts.pending} pending</span>
            </Link>
            <Link href="/admin/seo" className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="text-sm font-semibold text-gray-900">Check SEO health</span>
              <span className="text-xs text-gray-500">{indexablePages} pages</span>
            </Link>
            <Link href="/admin/tours" className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="text-sm font-semibold text-gray-900">Edit tours</span>
              <span className="text-xs text-gray-500">{TOUR_PACKAGES.length} packages</span>
            </Link>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900">Search Console</span>
              <span className="text-xs text-gray-500">Open in Google ↗</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
