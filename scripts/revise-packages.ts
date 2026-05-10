/**
 * Script to revise tour packages based on user request:
 * 
 * West Trip: 
 *   - "Crystal Bay" → "Crystal Bay Beach"
 *   - Image → Broken Beach
 * 
 * East Trip:
 *   - Image → Tree House
 * 
 * Snorkeling Trip:
 *   - Combine "Gamat Bay" + "Wall Point" → "Gamat Bay / Wall Point"
 * 
 * Mix Trip:
 *   - "Angel Billabong" → "Angel Bilabong"
 * 
 * West Trip + Snorkeling:
 *   - "Angel Billabong" → "Angel Bilabong" (if present)
 * 
 * East Trip + Snorkeling:
 *   - Image → Tree House
 */
import { neon } from '@neondatabase/serverless';

const PRODUCTION_DATABASE_URL = "postgresql://neondb_owner:npg_zRG1ZgIOyf9h@ep-withered-block-aoo48799-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(PRODUCTION_DATABASE_URL);

async function revisePackages() {
  console.log('🔄 Revising tour packages...\n');

  try {
    // 1. West Trip: Crystal Bay → Crystal Bay Beach + Image → Broken Beach
    console.log('📦 Updating West Trip...');
    const westTrip = await sql`SELECT features FROM tour_packages WHERE slug = 'west-trip'`;
    if (westTrip.length > 0) {
      let features = westTrip[0].features as string[];
      features = features.map(f => f === 'Crystal Bay' ? 'Crystal Bay Beach' : f);
      
      await sql`
        UPDATE tour_packages 
        SET features = ${JSON.stringify(features)}::jsonb,
            image_url = '/images/West%20Trip/West%20trip%20BROKEN%20BEACH.jpeg'
        WHERE slug = 'west-trip'
      `;
      console.log('  ✅ Renamed "Crystal Bay" → "Crystal Bay Beach"');
      console.log('  ✅ Updated image → Broken Beach');
      console.log('  Features:', features.join(', '));
    }
    console.log('');

    // 2. East Trip: Image → Tree House
    console.log('📦 Updating East Trip...');
    await sql`
      UPDATE tour_packages 
      SET image_url = '/images/East%20Trip/East%20trip%20TREE%20HOUSE.jpeg'
      WHERE slug = 'east-trip'
    `;
    console.log('  ✅ Updated image → Tree House');
    console.log('');

    // 3. Snorkeling: Combine Gamat Bay + Wall Point
    console.log('📦 Updating Snorkeling with Manta Ray\'s...');
    const snorkeling = await sql`SELECT features FROM tour_packages WHERE slug = 'snorkeling-manta'`;
    if (snorkeling.length > 0) {
      let features = snorkeling[0].features as string[];
      // Remove separate items
      features = features.filter(f => f !== 'Gamat Bay' && f !== 'Wall Point');
      // Add combined item (insert at original position)
      if (!features.includes('Gamat Bay / Wall Point')) {
        // Insert after Crystal Bay (if exists) or at a sensible position
        const crystalBayIndex = features.indexOf('Crystal Bay');
        if (crystalBayIndex !== -1) {
          features.splice(crystalBayIndex + 1, 0, 'Gamat Bay / Wall Point');
        } else {
          features.unshift('Gamat Bay / Wall Point');
        }
      }
      
      await sql`
        UPDATE tour_packages 
        SET features = ${JSON.stringify(features)}::jsonb
        WHERE slug = 'snorkeling-manta'
      `;
      console.log('  ✅ Combined "Gamat Bay" + "Wall Point" → "Gamat Bay / Wall Point"');
      console.log('  Features:', features.join(', '));
    }
    console.log('');

    // 4. Mix Trip: Angel Billabong → Angel Bilabong
    console.log('📦 Updating Mix Trip...');
    const mixTrip = await sql`SELECT features FROM tour_packages WHERE slug = 'mix-trip'`;
    if (mixTrip.length > 0) {
      let features = mixTrip[0].features as string[];
      features = features.map(f => f === 'Angel Billabong' ? 'Angel Bilabong' : f);
      
      await sql`
        UPDATE tour_packages 
        SET features = ${JSON.stringify(features)}::jsonb
        WHERE slug = 'mix-trip'
      `;
      console.log('  ✅ Renamed "Angel Billabong" → "Angel Bilabong"');
      console.log('  Features:', features.join(', '));
    }
    console.log('');

    // 5. West Trip + Snorkeling: Angel Billabong → Angel Bilabong
    console.log('📦 Updating West Trip + Snorkeling...');
    const westTripSnorkeling = await sql`SELECT features FROM tour_packages WHERE slug = 'west-trip-snorkeling'`;
    if (westTripSnorkeling.length > 0) {
      let features = westTripSnorkeling[0].features as string[];
      features = features.map(f => f === 'Angel Billabong' ? 'Angel Bilabong' : f);
      
      await sql`
        UPDATE tour_packages 
        SET features = ${JSON.stringify(features)}::jsonb
        WHERE slug = 'west-trip-snorkeling'
      `;
      console.log('  ✅ Renamed "Angel Billabong" → "Angel Bilabong"');
      console.log('  Features:', features.join(', '));
    }
    console.log('');

    // 6. East Trip + Snorkeling: Image → Tree House
    console.log('📦 Updating East Trip + Snorkeling...');
    await sql`
      UPDATE tour_packages 
      SET image_url = '/images/East%20Trip/East%20trip%20TREE%20HOUSE.jpeg'
      WHERE slug = 'east-trip-snorkeling'
    `;
    console.log('  ✅ Updated image → Tree House');
    console.log('');

    console.log('🎉 All revisions completed successfully!\n');
    
    // Verify all changes
    console.log('🔍 Verification:\n');
    const allTours = await sql`SELECT name, slug, features, image_url FROM tour_packages ORDER BY name`;
    for (const tour of allTours) {
      console.log(`📦 ${tour.name}`);
      console.log(`   Image: ${tour.image_url}`);
      console.log(`   Features: ${(tour.features as string[]).join(', ')}`);
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

revisePackages()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
