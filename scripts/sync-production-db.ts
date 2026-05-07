/**
 * Script to sync production database with correct data
 * Run with: npx tsx scripts/sync-production-db.ts
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function syncProductionData() {
  console.log('🔄 Syncing production database with correct data...\n');

  try {
    // Update Tour Packages
    console.log('📦 Updating tour packages...');
    
    // 1. West Trip
    await sql`
      UPDATE tour_packages SET
        features = '["Kelingking Beach","Angel Billabong","Broken Beach","Crystal Bay","Professional Guide","Transportation","Tax Island","Parking Ticket"]'::jsonb,
        image_url = '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg'
      WHERE slug = 'west-trip'
    `;
    console.log('✅ west-trip updated');

    // 2. East Trip
    await sql`
      UPDATE tour_packages SET
        features = '["Diamond Beach","Atuh Beach","Tree House","View Thousand Island","Professional Guide","Transportation","Tax Island","Parking Ticket"]'::jsonb,
        image_url = '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg'
      WHERE slug = 'east-trip'
    `;
    console.log('✅ east-trip updated');

    // 3. West Trip + Snorkeling
    await sql`
      UPDATE tour_packages SET
        features = '["Kelingking Beach","Angel Billabong","Broken Beach","Manta Snorkeling","Snorkeling Equipment","Underwater Guide","Professional Guide","Transportation","Tax Island","Parking Ticket"]'::jsonb,
        description = 'West trip combined with amazing Manta snorkeling experience',
        image_url = '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png'
      WHERE slug = 'west-trip-snorkeling'
    `;
    console.log('✅ west-trip-snorkeling updated');

    // 4. East Trip + Snorkeling
    await sql`
      UPDATE tour_packages SET
        features = '["Diamond Beach","Atuh Beach","Tree House","View Thousand Island","Snorkeling at Best Spots","Snorkeling Equipment","Underwater Guide","Professional Guide","Transportation","Tax Island","Parking Ticket"]'::jsonb,
        image_url = '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png'
      WHERE slug = 'east-trip-snorkeling'
    `;
    console.log('✅ east-trip-snorkeling updated');

    // 5. Mix Trip
    await sql`
      UPDATE tour_packages SET
        duration_hours = 8,
        features = '["Kelingking Beach","Broken Beach","Angel Billabong","Diamond Beach","Atuh Beach","Full Island Experience","Professional Guide","Transportation","Tax Island","Parking Ticket"]'::jsonb,
        image_url = '/images/Mix%20Trip%20Diamond%20Kelingking.png'
      WHERE slug = 'mix-trip'
    `;
    console.log('✅ mix-trip updated');

    // 6. Snorkeling with Manta Rays - UPDATED: 2 hours duration
    await sql`
      UPDATE tour_packages SET
        duration_hours = 2,
        features = '["Manta Bay","Crystal Bay","Gamat Bay","Wall Point","Snorkeling Equipment","Professional Guide","Transportation","Tax Island","Parking Ticket"]'::jsonb,
        image_url = '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg'
      WHERE slug = 'snorkeling-manta'
    `;
    console.log('✅ snorkeling-manta updated (2 hours duration)');

    // Update Rental Services
    console.log('\n🚗 Updating rental services...');

    // 1. N-Max
    await sql`
      UPDATE rental_services SET
        image_url = '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp'
      WHERE slug = 'nmax-motorcycle'
    `;
    console.log('✅ nmax-motorcycle updated');

    // 2. Vario
    await sql`
      UPDATE rental_services SET
        image_url = '/images/Vehicle%20Rentals/Honda%20Vario.png'
      WHERE slug = 'vario-motorcycle'
    `;
    console.log('✅ vario-motorcycle updated');

    // 3. Scoopy
    await sql`
      UPDATE rental_services SET
        image_url = '/images/Vehicle%20Rentals/Honda%20Scoopy.webp'
      WHERE slug = 'scoopy-motorcycle'
    `;
    console.log('✅ scoopy-motorcycle updated');

    // 4. Car Rental
    await sql`
      UPDATE rental_services SET
        image_url = '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg'
      WHERE slug = 'car-rental'
    `;
    console.log('✅ car-rental updated');

    console.log('\n🎉 Production database synced successfully!');
    console.log('\n📝 Summary:');
    console.log('   - 6 tour packages updated');
    console.log('   - 4 rental services updated');
    console.log('   - All images paths corrected');
    console.log('   - All features updated with Tax Island & Parking Ticket');
    console.log('   - Snorkeling trip duration changed to 2 hours');
    
  } catch (error) {
    console.error('❌ Error syncing database:', error);
    throw error;
  }
}

syncProductionData()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
