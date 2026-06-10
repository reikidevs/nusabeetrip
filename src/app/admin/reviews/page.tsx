import { Suspense } from 'react';
import ReviewsManager from './ReviewsManager';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function AdminReviewsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Approve, reply, or remove guest reviews. Approved reviews appear on the
          homepage and update the star rating Google shows in search results.
        </p>
      </header>
      <Suspense fallback={<div className="h-40 bg-white rounded-2xl border border-gray-100 animate-pulse" />}>
        <ReviewsManager />
      </Suspense>
    </div>
  );
}
