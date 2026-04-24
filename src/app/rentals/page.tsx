import { Metadata } from 'next';
import { getRentalServices } from '@/lib/db/queries';
import { RentalServiceGrid } from '@/components/business';
import { RentalService } from '@/types';

// Opt out of static generation — this page fetches from DB at runtime
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Vehicle Rentals - Motorcycle & Car Rental | NusaBeeTrip',
  description: 'Rent motorcycles and cars in Nusa Penida. N-Max, Vario, Scoopy motorcycles and car rentals available. Starting from 100,000 IDR per day.',
  keywords: ['nusa penida rental', 'motorcycle rental', 'car rental', 'nmax rental', 'vario rental'],
};

// Transform database rental service to component format
const transformRentalService = (dbService: any): RentalService => ({
  id: dbService.id.toString(),
  vehicleType: dbService.vehicleType,
  model: dbService.model,
  slug: dbService.slug,
  pricePerDay: dbService.pricePerDayIdr,
  pricePerHour: dbService.pricePerHourIdr,
  currency: 'IDR',
  features: Array.isArray(dbService.features) ? dbService.features : [],
  image: dbService.imageUrl || '/images/placeholder-tour.svg',
  isAvailable: dbService.isAvailable
});

export default async function RentalsPage() {
  let rentalServices: RentalService[] = [];
  
  try {
    const dbServices = await getRentalServices();
    rentalServices = dbServices.map(transformRentalService);
  } catch (error) {
    console.error('Failed to fetch rental services:', error);
    // Fallback to static data if database is not available
    rentalServices = [
      {
        id: '1',
        vehicleType: 'motorcycle',
        model: 'N-Max',
        slug: 'nmax-motorcycle',
        pricePerDay: 125000,
        currency: 'IDR',
        features: ['Automatic Transmission', 'Comfortable Seat', 'Storage Space', 'Helmet Included'],
        image: '/images/Vehicle Rentals/Yamaha N-Max.webp',
        isAvailable: true
      },
      {
        id: '2',
        vehicleType: 'motorcycle',
        model: 'Vario',
        slug: 'vario-motorcycle',
        pricePerDay: 100000,
        currency: 'IDR',
        features: ['Automatic Transmission', 'Fuel Efficient', 'Easy Handling', 'Helmet Included'],
        image: '/images/Vehicle Rentals/Honda Vario.webp',
        isAvailable: true
      },
      {
        id: '3',
        vehicleType: 'motorcycle',
        model: 'Scoopy',
        slug: 'scoopy-motorcycle',
        pricePerDay: 100000,
        currency: 'IDR',
        features: ['Automatic Transmission', 'Lightweight', 'Perfect for Beginners', 'Helmet Included'],
        image: '/images/Vehicle Rentals/Honda Scoopy.webp',
        isAvailable: true
      },
      {
        id: '4',
        vehicleType: 'car',
        model: 'Car Rental',
        slug: 'car-rental',
        pricePerDay: 500000,
        pricePerHour: 125000,
        currency: 'IDR',
        features: ['Air Conditioning', 'Driver Included', '4-Hour Duration', 'Comfortable for 4-6 People'],
        image: '/images/Vehicle Rentals/Car with Driver.jpg',
        isAvailable: true
      }
    ];
  }

  const handleBookingClick = (vehicleModel: string, price: number) => {
    // Analytics tracking will be handled by WhatsAppBookingButton
    console.log(`Booking clicked for ${vehicleModel} at ${price} IDR`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-brand-blue-800 to-brand-teal-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Vehicle Rentals in Nusa Penida
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              Explore the island with our reliable motorcycles and cars
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Choose from our fleet of well-maintained vehicles to discover the hidden gems of Nusa Penida. 
              From nimble motorcycles to comfortable cars, we have the perfect ride for your adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Rental Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <RentalServiceGrid
          rentalServices={rentalServices}
          showTitle={false}
        />
      </div>

      {/* Additional Information Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-blue-800 mb-4">
                Why Choose Our Rentals?
              </h2>
              <p className="text-gray-600 text-lg">
                We provide reliable, well-maintained vehicles with comprehensive support for your Nusa Penida adventure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-800 mb-2">Quality Vehicles</h3>
                <p className="text-gray-600">
                  All our vehicles are regularly maintained and inspected for your safety and comfort.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-orange-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Round-the-clock assistance and roadside support for any issues during your rental period.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-brand-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-brand-blue-800 mb-2">Free Delivery</h3>
                <p className="text-gray-600">
                  Complimentary vehicle delivery and pickup anywhere in Nusa Penida for your convenience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}