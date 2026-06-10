import { getAnalyticsSummary, type AnalyticsSummary } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EMPTY: AnalyticsSummary = {
  totalViews: 0,
  viewsLast7: 0,
  viewsLast30: 0,
  topPages: [],
  topReferrers: [],
  dailySeries: [],
};

export default async function AdminAnalyticsPage() {
  let data = EMPTY;
  let dbError = false;
  try {
    data = await getAnalyticsSummary();
  } catch {
    dbError = true;
  }

  const maxDaily = Math.max(1, ...data.dailySeries.map((d) => d.views));
  const maxPage = Math.max(1, ...data.topPages.map((p) => p.views));

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1 text-sm">
          First-party, cookieless traffic. Shows which pages your SEO work is
          actually bringing visitors to. Bots and admin pages are excluded.
        </p>
      </header>

      {dbError && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
          Could not reach the database. Refresh to try again.
        </div>
      )}

      {data.totalViews === 0 && !dbError && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl px-4 py-3 text-sm">
          No traffic recorded yet. Page views start collecting once this build is
          live in production and visitors browse the site.
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Last 7 days
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.viewsLast7}</div>
          <div className="text-xs text-gray-400 mt-1">page views</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Last 30 days
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.viewsLast30}</div>
          <div className="text-xs text-gray-400 mt-1">page views</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            All time
          </div>
          <div className="text-3xl font-bold text-gray-900">{data.totalViews}</div>
          <div className="text-xs text-gray-400 mt-1">page views</div>
        </div>
      </div>

      {/* Daily chart */}
      <section className="bg-white rounded-2xl border border-gray-100 p-5 mb-8">
        <h2 className="font-bold text-gray-900 mb-4">Daily views — last 30 days</h2>
        <div className="flex items-end gap-1 h-40">
          {data.dailySeries.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center justify-end group relative">
              <div
                className="w-full bg-brand-blue-200 group-hover:bg-brand-blue-500 rounded-t transition-colors"
                style={{ height: `${(d.views / maxDaily) * 100}%`, minHeight: d.views > 0 ? '4px' : '0' }}
              />
              <div className="absolute -top-7 hidden group-hover:block bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap">
                {d.views} · {d.date.slice(5)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-2">
          <span>{data.dailySeries[0]?.date.slice(5)}</span>
          <span>{data.dailySeries[data.dailySeries.length - 1]?.date.slice(5)}</span>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Top pages</h2>
          {data.topPages.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No data yet.</p>
          ) : (
            <ul className="space-y-2.5">
              {data.topPages.map((p) => (
                <li key={p.path}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700 truncate font-medium">{p.path}</span>
                    <span className="text-gray-400 flex-shrink-0 ml-2">{p.views}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-teal-500 rounded-full"
                      style={{ width: `${(p.views / maxPage) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Referrers */}
        <section className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 mb-4">Where visitors come from</h2>
          {data.topReferrers.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {data.topReferrers.map((r) => (
                <li key={r.referrer} className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 truncate">{r.referrer}</span>
                  <span className="font-semibold text-gray-900 flex-shrink-0 ml-2">{r.views}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
            For keyword-level data (what people searched), use Google Search
            Console — this only tracks referring sites.
          </p>
        </section>
      </div>
    </div>
  );
}
