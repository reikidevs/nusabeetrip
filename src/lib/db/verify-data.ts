import { config } from 'dotenv';
config({ path: '.env.local' });

import { getTourPackages, getRentalServices } from './queries';

async function verifyData() {
  try {
    console.log('🔍 Verifying seeded data...');
    
    // Check tour packages
    const tours = await getTourPackages();
    console.log(`📦 Found ${tours.length} tour packages:`);
    tours.forEach(tour => {
      console.log(`  - ${tour.name}: ${tour.priceIdr.toLocaleString()} IDR`);
    });
    
    // Check rental services
    const rentals = await getRentalServices();
    console.log(`🚗 Found ${rentals.length} rental services:`);
    rentals.forEach(rental => {
      console.log(`  - ${rental.model} (${rental.vehicleType}): ${rental.pricePerDayIdr.toLocaleString()} IDR/day`);
    });
    
    console.log('✅ Data verification completed successfully!');
  } catch (error) {
    console.error('❌ Error verifying data:', error);
    throw error;
  }
}

// Run verification if this file is executed directly
if (require.main === module) {
  verifyData()
    .then(() => {
      console.log('Data verification completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Data verification failed:', error);
      process.exit(1);
    });
}