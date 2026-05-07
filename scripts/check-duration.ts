/**
 * Script to check tour package durations
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

async function checkDurations() {
  console.log('🔍 Checking tour package durations...\n');

  const tours = await sql`SELECT slug, name, duration_hours FROM tour_packages ORDER BY slug`;
  
  tours.forEach((tour: any) => {
    const status = tour.slug === 'snorkeling-manta' && tour.duration_hours === 2 ? '✅' : 
                   tour.slug === 'snorkeling-manta' && tour.duration_hours !== 2 ? '❌' : '✅';
    console.log(`${status} ${tour.name}: ${tour.duration_hours} hours`);
  });
}

checkDurations()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
