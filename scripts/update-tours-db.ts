/**
 * One-time script to update tour packages in the Neon database.
 * Run with: npx tsx scripts/update-tours-db.ts
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

async function updateTours() {
  console.log('🔄 Updating tour packages in database...\n');

  // 1. East Trip: Diamond Beach first, View Thousand Island
  await sql`
    UPDATE tour_packages SET
      features = '["Diamond Beach","Atuh Beach","Tree House","View Thousand Island","Professional Guide","Transportation","Entrance Fees"]'::jsonb,
      image_url = '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg'
    WHERE slug = 'east-trip'
  `;
  console.log('✅ east-trip: Diamond Beach #1, View Thousand Island');

  // 2. West Trip + Snorkeling: Manta Snorkeling
  await sql`
    UPDATE tour_packages SET
      features = '["Kelingking Beach","Angel Billabong","Broken Beach","Manta Snorkeling","Snorkeling Equipment","Underwater Guide","Professional Guide","Transportation","Entrance Fees"]'::jsonb,
      description = 'West trip combined with amazing Manta snorkeling experience',
      image_url = '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png'
    WHERE slug = 'west-trip-snorkeling'
  `;
  console.log('✅ west-trip-snorkeling: Crystal Bay → Manta Snorkeling');

  // 3. East Trip + Snorkeling: Diamond Beach first, View Thousand Island
  await sql`
    UPDATE tour_packages SET
      features = '["Diamond Beach","Atuh Beach","Tree House","View Thousand Island","Snorkeling at Best Spots","Snorkeling Equipment","Underwater Guide","Professional Guide","Transportation","Entrance Fees"]'::jsonb,
      image_url = '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png'
    WHERE slug = 'east-trip-snorkeling'
  `;
  console.log('✅ east-trip-snorkeling: Diamond Beach #1, View Thousand Island');

  // 4. Mix Trip: 8 hours, specific spots, Atuh Beach added
  await sql`
    UPDATE tour_packages SET
      duration_hours = 8,
      features = '["Kelingking Beach","Broken Beach","Angel Billabong","Diamond Beach","Atuh Beach","Full Island Experience","Professional Guide","Transportation","Entrance Fees"]'::jsonb,
      image_url = '/images/Mix%20Trip%20Diamond%20Kelingking.png'
    WHERE slug = 'mix-trip'
  `;
  console.log('✅ mix-trip: 8 hours, Atuh Beach added');

  // 5. West Trip: update image to Kelingking Beach
  await sql`
    UPDATE tour_packages SET
      image_url = '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg'
    WHERE slug = 'west-trip'
  `;
  console.log('✅ west-trip: Kelingking Beach image');

  console.log('\n🎉 All tour packages updated successfully!');
}

updateTours()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
