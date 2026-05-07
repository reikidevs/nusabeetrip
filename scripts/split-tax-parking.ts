/**
 * Script to split "Tax Island & Parking Ticket in Any Spot" into 2 separate items
 */
import { neon } from '@neondatabase/serverless';

const PRODUCTION_DATABASE_URL = "postgresql://neondb_owner:npg_zRG1ZgIOyf9h@ep-withered-block-aoo48799-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(PRODUCTION_DATABASE_URL);

async function splitFeatures() {
  console.log('🔄 Splitting Tax Island & Parking Ticket into 2 separate items...\n');

  try {
    const tours = await sql`SELECT id, name, slug, features FROM tour_packages`;
    
    for (const tour of tours) {
      let features = tour.features as string[];
      
      // Remove combined item
      features = features.filter(f => f !== 'Tax Island & Parking Ticket in Any Spot');
      
      // Add separate items if not already present
      if (!features.includes('Tax Island')) {
        features.push('Tax Island');
      }
      if (!features.includes('Parking Ticket in Any Spot')) {
        features.push('Parking Ticket in Any Spot');
      }
      
      // Update database
      await sql`
        UPDATE tour_packages 
        SET features = ${JSON.stringify(features)}::jsonb
        WHERE id = ${tour.id}
      `;
      
      console.log(`✅ ${tour.name}`);
      console.log(`   Features: ${features.join(', ')}`);
      console.log('');
    }
    
    console.log('🎉 All tour packages updated successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

splitFeatures()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
