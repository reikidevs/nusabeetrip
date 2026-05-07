/**
 * Script to verify production database
 */
import { neon } from '@neondatabase/serverless';

const PRODUCTION_DATABASE_URL = "postgresql://neondb_owner:npg_zRG1ZgIOyf9h@ep-withered-block-aoo48799-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(PRODUCTION_DATABASE_URL);

async function verifyDatabase() {
  console.log('🔍 Verifying PRODUCTION database...\n');

  try {
    // Check tour packages
    const tours = await sql`SELECT name, slug, duration_hours, features FROM tour_packages ORDER BY name`;
    
    console.log('📦 Tour Packages:\n');
    for (const tour of tours) {
      const features = tour.features as string[];
      const hasCombined = features.includes('Tax Island & Parking Ticket in Any Spot');
      const hasGuide = features.includes('Professional Guide');
      
      console.log(`${tour.name}`);
      console.log(`  Duration: ${tour.duration_hours} hours ${tour.slug === 'snorkeling-manta' && tour.duration_hours === 2 ? '✅' : tour.slug === 'snorkeling-manta' ? '❌ SHOULD BE 2' : ''}`);
      console.log(`  Tax Island & Parking Ticket: ${hasCombined ? '✅' : '❌'}`);
      console.log(`  Professional Guide: ${hasGuide ? '✅' : '❌'}`);
      console.log('');
    }
    
    // Check rental services
    const rentals = await sql`SELECT model, price_per_day_idr FROM rental_services ORDER BY model`;
    
    console.log('🚗 Rental Services:\n');
    for (const rental of rentals) {
      console.log(`  ✅ ${rental.model} - ${rental.price_per_day_idr.toLocaleString()} IDR/day`);
    }
    console.log('');
    
    console.log('🎉 Verification complete!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

verifyDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
