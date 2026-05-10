/**
 * Script to verify all tour packages data
 */
import { neon } from '@neondatabase/serverless';

const PRODUCTION_DATABASE_URL = "postgresql://neondb_owner:npg_zRG1ZgIOyf9h@ep-withered-block-aoo48799-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(PRODUCTION_DATABASE_URL);

async function verifyPackages() {
  console.log('🔍 Verifying all tour packages...\n');

  try {
    const tours = await sql`SELECT name, slug, features, image_url, duration_hours FROM tour_packages ORDER BY name`;
    
    for (const tour of tours) {
      const features = tour.features as string[];
      console.log(`📦 ${tour.name} (${tour.duration_hours}h)`);
      console.log(`   Image: ${tour.image_url}`);
      console.log(`   Destinations & Features:`);
      features.forEach((f, i) => {
        console.log(`     ${i + 1}. ${f}`);
      });
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

verifyPackages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
