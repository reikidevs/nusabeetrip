import ToursManager from './ToursManager';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function AdminToursPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tours</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Edit prices, duration, and availability. Changes update the live site
          and the Product schema Google reads — so prices in search stay correct.
        </p>
      </header>
      <ToursManager />
    </div>
  );
}
