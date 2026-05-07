/**
 * Script to check tour package features
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

async function checkFeatures() {
  console.log('🔍 Checking tour package features...\n');

  const tours = await sql`SELECT slug, name, features FROM tour_packages ORDER BY slug`;
  
  tours.forEach((tour: any) => {
    const features = tour.features as string[];
    const hasTaxIsland = features.includes('Tax Island');
    const hasParkingTicket = features.includes('Parking Ticket');
    const status = hasTaxIsland && hasParkingTicket ? '✅' : '❌';
    
    console.log(`${status} ${tour.name}:`);
    console.log(`   Tax Island: ${hasTaxIsland ? '✅' : '❌'}`);
    console.log(`   Parking Ticket: ${hasParkingTicket ? '✅' : '❌'}`);
    console.log(`   Features: ${features.join(', ')}`);
    console.log('');
  });
}

checkFeatures()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
