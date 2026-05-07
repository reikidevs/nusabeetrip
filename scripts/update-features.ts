/**
 * Script to update tour package features
 * Replace "Tax Island" and "Parking Ticket" with "Tax Island & Parking Ticket in Any Spot"
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

async function updateFeatures() {
  console.log('🔄 Updating tour package features...\n');

  try {
    // Get all tour packages
    const tours = await sql`SELECT id, slug, name, features FROM tour_packages`;
    
    for (const tour of tours) {
      let features = tour.features as string[];
      
      // Remove "Tax Island" and "Parking Ticket"
      features = features.filter(f => f !== 'Tax Island' && f !== 'Parking Ticket');
      
      // Add "Tax Island & Parking Ticket in Any Spot"
      if (!features.includes('Tax Island & Parking Ticket in Any Spot')) {
        features.push('Tax Island & Parking Ticket in Any Spot');
      }
      
      // Ensure "Professional Guide" exists
      if (!features.includes('Professional Guide')) {
        features.push('Professional Guide');
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
    console.error('❌ Error updating features:', error);
    throw error;
  }
}

updateFeatures()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
