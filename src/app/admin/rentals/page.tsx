import RentalsManager from './RentalsManager';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function AdminRentalsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rentals</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Edit rental prices and availability. Updates flow to the live site and
          the Product schema for each vehicle.
        </p>
      </header>
      <RentalsManager />
    </div>
  );
}
