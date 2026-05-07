/**
 * Script to check current image URLs in database
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

async function checkImages() {
  console.log('🔍 Checking current image URLs in database...\n');

  // Check tour packages
  const tours = await sql`SELECT slug, name, image_url FROM tour_packages ORDER BY slug`;
  console.log('📦 TOUR PACKAGES:');
  tours.forEach((tour: any) => {
    console.log(`\n${tour.slug}:`);
    console.log(`  Name: ${tour.name}`);
    console.log(`  Image: ${tour.image_url}`);
  });

  // Check rental services
  const rentals = await sql`SELECT slug, model, image_url FROM rental_services ORDER BY slug`;
  console.log('\n\n🚗 RENTAL SERVICES:');
  rentals.forEach((rental: any) => {
    console.log(`\n${rental.slug}:`);
    console.log(`  Model: ${rental.model}`);
    console.log(`  Image: ${rental.image_url}`);
  });
}

checkImages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
