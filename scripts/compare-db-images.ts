/**
 * Script to compare expected vs actual image URLs in production database
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const expectedImages = {
  'west-trip': '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
  'east-trip': '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
  'west-trip-snorkeling': '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png',
  'east-trip-snorkeling': '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png',
  'mix-trip': '/images/Mix%20Trip%20Diamond%20Kelingking.png',
  'snorkeling-manta': '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg',
  'nmax-motorcycle': '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
  'vario-motorcycle': '/images/Vehicle%20Rentals/Honda%20Vario.png',
  'scoopy-motorcycle': '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
  'car-rental': '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
};

async function compareImages() {
  console.log('🔍 Comparing expected vs actual image URLs...\n');

  let allMatch = true;

  // Check tour packages
  console.log('📦 TOUR PACKAGES:');
  const tours = await sql`SELECT slug, name, image_url FROM tour_packages ORDER BY slug`;
  tours.forEach((tour: any) => {
    const expected = expectedImages[tour.slug as keyof typeof expectedImages];
    const actual = tour.image_url;
    const match = expected === actual;
    const status = match ? '✅' : '❌';
    
    console.log(`\n${status} ${tour.slug} (${tour.name})`);
    console.log(`   Expected: ${expected}`);
    console.log(`   Actual:   ${actual}`);
    
    if (!match) allMatch = false;
  });

  // Check rental services
  console.log('\n\n🚗 RENTAL SERVICES:');
  const rentals = await sql`SELECT slug, model, image_url FROM rental_services ORDER BY slug`;
  rentals.forEach((rental: any) => {
    const expected = expectedImages[rental.slug as keyof typeof expectedImages];
    const actual = rental.image_url;
    const match = expected === actual;
    const status = match ? '✅' : '❌';
    
    console.log(`\n${status} ${rental.slug} (${rental.model})`);
    console.log(`   Expected: ${expected}`);
    console.log(`   Actual:   ${actual}`);
    
    if (!match) allMatch = false;
  });

  console.log('\n' + '='.repeat(60));
  if (allMatch) {
    console.log('✅ All images match expected values!');
  } else {
    console.log('❌ Some images do not match! Run sync script again.');
  }
}

compareImages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
