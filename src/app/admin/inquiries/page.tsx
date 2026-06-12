import { getContactInquiries } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function AdminInquiriesPage() {
  let inquiries: Awaited<ReturnType<typeof getContactInquiries>> = [];
  let dbError = false;
  try {
    inquiries = await getContactInquiries(100);
  } catch {
    dbError = true;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Inquiries</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Booking requests and contact-form messages. When the booking form goes
          live, every submission lands here with the guest&apos;s details.
        </p>
      </header>

      {dbError && (
        <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
          Could not reach the database. Refresh to try again.
        </div>
      )}

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="font-semibold text-gray-900 mb-1">No inquiries yet</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Right now bookings come in through WhatsApp. Once we add the on-site
            booking form, requests will appear here so you can track every lead.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <article
              key={inq.id}
              className="bg-white rounded-2xl border border-gray-100 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="font-semibold text-gray-900">{inq.name}</div>
                  <div className="text-xs text-gray-400">
                    {inq.email}
                    {inq.phone ? ` · ${inq.phone}` : ''}
                  </div>
                </div>
                <span className="text-[11px] font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full flex-shrink-0">
                  {inq.status || 'new'}
                </span>
              </div>
              {(inq.tourInterest || inq.rentalInterest) && (
                <div className="text-xs text-brand-teal-700 font-medium mb-2">
                  Interested in: {inq.tourInterest || inq.rentalInterest}
                </div>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">{inq.message}</p>
              <div className="text-xs text-gray-400 mt-3">
                {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : ''}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
