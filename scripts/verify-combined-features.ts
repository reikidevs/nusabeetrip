/**
 * Script to verify tour packages have the combined feature
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

async function verifyFeatures() {
  console.log('🔍 Verifying combined features in tour packages...\n');

  try {
    const tours = await sql`SELECT id, slug, name, features FROM tour_packages ORDER BY name`;
    
    let allValid = true;
    
    for (const tour of tours) {
      const features = tour.features as string[];
      const hasCombined = features.includes('Tax Island & Parking Ticket in Any Spot');
      const hasProfessionalGuide = features.includes('Professional Guide');
      const hasOldTaxIsland = features.includes('Tax Island');
      const hasOldParkingTicket = features.includes('Parking Ticket');
      
      const isValid = hasCombined && hasProfessionalGuide && !hasOldTaxIsland && !hasOldParkingTicket;
      
      console.log(`${isValid ? '✅' : '❌'} ${tour.name}`);
      console.log(`   Combined Feature: ${hasCombined ? '✅' : '❌'}`);
      console.log(`   Professional Guide: ${hasProfessionalGuide ? '✅' : '❌'}`);
      console.log(`   Old Tax Island removed: ${!hasOldTaxIsland ? '✅' : '❌'}`);
      console.log(`   Old Parking Ticket removed: ${!hasOldParkingTicket ? '✅' : '❌'}`);
      console.log(`   Features: ${features.join(', ')}`);
      console.log('');
      
      if (!isValid) allValid = false;
    }
    
    if (allValid) {
      console.log('🎉 All tour packages have correct combined features!');
    } else {
      console.log('⚠️ Some packages need attention');
    }
    
  } catch (error) {
    console.error('❌ Error verifying features:', error);
    throw error;
  }
}

verifyFeatures()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
