/**
 * Script to setup production database
 * This will create tables and seed initial data
 */
import { neon } from '@neondatabase/serverless';

// PRODUCTION DATABASE URL
const PRODUCTION_DATABASE_URL = "postgresql://neondb_owner:npg_zRG1ZgIOyf9h@ep-withered-block-aoo48799-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(PRODUCTION_DATABASE_URL);

async function setupDatabase() {
  console.log('🚀 Setting up PRODUCTION database...\n');

  try {
    // 1. Create tour_packages table
    console.log('📦 Creating tour_packages table...');
    await sql`
      CREATE TABLE IF NOT EXISTS tour_packages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        price_idr INTEGER NOT NULL,
        duration_hours INTEGER NOT NULL,
        includes_snorkeling BOOLEAN DEFAULT false,
        features JSONB DEFAULT '[]'::jsonb,
        image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ tour_packages table created\n');

    // 2. Create rental_services table
    console.log('🚗 Creating rental_services table...');
    await sql`
      CREATE TABLE IF NOT EXISTS rental_services (
        id SERIAL PRIMARY KEY,
        vehicle_type TEXT NOT NULL,
        model TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        price_per_day_idr INTEGER,
        price_per_hour_idr INTEGER,
        features JSONB DEFAULT '[]'::jsonb,
        image_url TEXT,
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ rental_services table created\n');

    // 3. Create seo_data table
    console.log('🔍 Creating seo_data table...');
    await sql`
      CREATE TABLE IF NOT EXISTS seo_data (
        id SERIAL PRIMARY KEY,
        page_path TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        keywords TEXT[],
        canonical_url TEXT,
        structured_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ seo_data table created\n');

    // 4. Insert tour packages
    console.log('📦 Inserting tour packages...');
    
    const tours = [
      {
        name: 'West Trip',
        slug: 'west-trip',
        description: 'Explore the western attractions of Nusa Penida including the famous Kelingking Beach',
        price_idr: 390000,
        duration_hours: 8,
        includes_snorkeling: false,
        features: JSON.stringify(['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay', 'Professional Guide', 'Transportation', 'Tax Island & Parking Ticket in Any Spot']),
        image_url: '/images/West%20Trip/West%20trip%20%20kelingking%20beach.jpeg',
        is_active: true,
      },
      {
        name: 'East Trip',
        slug: 'east-trip',
        description: 'Discover the eastern wonders of Nusa Penida with breathtaking viewpoints',
        price_idr: 430000,
        duration_hours: 8,
        includes_snorkeling: false,
        features: JSON.stringify(['Diamond Beach', 'Atuh Beach', 'Tree House', 'View Thousand Island', 'Professional Guide', 'Transportation', 'Tax Island & Parking Ticket in Any Spot']),
        image_url: '/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg',
        is_active: true,
      },
      {
        name: 'West Trip + Snorkeling',
        slug: 'west-trip-snorkeling',
        description: 'West trip combined with amazing Manta snorkeling experience',
        price_idr: 550000,
        duration_hours: 10,
        includes_snorkeling: true,
        features: JSON.stringify(['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Manta Snorkeling', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation', 'Tax Island & Parking Ticket in Any Spot']),
        image_url: '/images/West%20Trip/West%20Trip%20Kelingking%20Manta%20Snorkeling.png',
        is_active: true,
      },
      {
        name: 'East Trip + Snorkeling',
        slug: 'east-trip-snorkeling',
        description: 'East trip with snorkeling adventure at the best spots',
        price_idr: 550000,
        duration_hours: 10,
        includes_snorkeling: true,
        features: JSON.stringify(['Diamond Beach', 'Atuh Beach', 'Tree House', 'View Thousand Island', 'Snorkeling at Best Spots', 'Snorkeling Equipment', 'Underwater Guide', 'Professional Guide', 'Transportation', 'Tax Island & Parking Ticket in Any Spot']),
        image_url: '/images/East%20Trip/East%20Trip%20Diamond%20Beach%20Snorkeling.png',
        is_active: true,
      },
      {
        name: 'Mix Trip (West & East)',
        slug: 'mix-trip',
        description: 'Combined west and east attractions tour for the complete Nusa Penida experience',
        price_idr: 500000,
        duration_hours: 8,
        includes_snorkeling: false,
        features: JSON.stringify(['Kelingking Beach', 'Broken Beach', 'Angel Billabong', 'Diamond Beach', 'Atuh Beach', 'Full Island Experience', 'Professional Guide', 'Transportation', 'Tax Island & Parking Ticket in Any Spot']),
        image_url: '/images/Mix%20Trip%20Diamond%20Kelingking.png',
        is_active: true,
      },
      {
        name: "Snorkeling with Manta Ray's",
        slug: 'snorkeling-manta',
        description: 'Swim alongside majestic Manta Rays and explore 4 incredible snorkeling spots',
        price_idr: 200000,
        duration_hours: 2,
        includes_snorkeling: true,
        features: JSON.stringify(['Manta Bay', 'Crystal Bay', 'Gamat Bay', 'Wall Point', 'Snorkeling Equipment', 'Professional Guide', 'Transportation', 'Tax Island & Parking Ticket in Any Spot']),
        image_url: '/images/Snorkeling%20%2B%20Manta%20Rays/snorkeling%201.jpeg',
        is_active: true,
      },
    ];

    for (const tour of tours) {
      await sql`
        INSERT INTO tour_packages (name, slug, description, price_idr, duration_hours, includes_snorkeling, features, image_url, is_active)
        VALUES (${tour.name}, ${tour.slug}, ${tour.description}, ${tour.price_idr}, ${tour.duration_hours}, ${tour.includes_snorkeling}, ${tour.features}::jsonb, ${tour.image_url}, ${tour.is_active})
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price_idr = EXCLUDED.price_idr,
          duration_hours = EXCLUDED.duration_hours,
          includes_snorkeling = EXCLUDED.includes_snorkeling,
          features = EXCLUDED.features,
          image_url = EXCLUDED.image_url,
          is_active = EXCLUDED.is_active,
          updated_at = CURRENT_TIMESTAMP
      `;
      console.log(`  ✅ ${tour.name}`);
    }
    console.log('');

    // 5. Insert rental services
    console.log('🚗 Inserting rental services...');
    
    const rentals = [
      {
        vehicle_type: 'motorcycle',
        model: 'N-Max',
        slug: 'nmax-motorcycle',
        price_per_day_idr: 125000,
        price_per_hour_idr: null,
        features: JSON.stringify(['Automatic Transmission', 'Comfortable Seat', 'Storage Space', 'Helmet Included', 'Full Tank', 'Insurance Covered']),
        image_url: '/images/Vehicle%20Rentals/Yamaha%20N-Max.webp',
        is_available: true,
      },
      {
        vehicle_type: 'motorcycle',
        model: 'Vario',
        slug: 'vario-motorcycle',
        price_per_day_idr: 100000,
        price_per_hour_idr: null,
        features: JSON.stringify(['Automatic Transmission', 'Fuel Efficient', 'Easy Handling', 'Helmet Included', 'Full Tank', 'Insurance Covered']),
        image_url: '/images/Vehicle%20Rentals/Honda%20Vario.png',
        is_available: true,
      },
      {
        vehicle_type: 'motorcycle',
        model: 'Scoopy',
        slug: 'scoopy-motorcycle',
        price_per_day_idr: 100000,
        price_per_hour_idr: null,
        features: JSON.stringify(['Automatic Transmission', 'Lightweight', 'Perfect for Beginners', 'Helmet Included', 'Full Tank', 'Insurance Covered']),
        image_url: '/images/Vehicle%20Rentals/Honda%20Scoopy.webp',
        is_available: true,
      },
      {
        vehicle_type: 'car',
        model: 'Car Rental',
        slug: 'car-rental',
        price_per_day_idr: 500000,
        price_per_hour_idr: 125000,
        features: JSON.stringify(['Air Conditioning', 'Driver Included', 'Comfortable for 4-6 People', 'Full Tank', 'Insurance Covered', 'Local Driver Knowledge']),
        image_url: '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg',
        is_available: true,
      },
    ];

    for (const rental of rentals) {
      await sql`
        INSERT INTO rental_services (vehicle_type, model, slug, price_per_day_idr, price_per_hour_idr, features, image_url, is_available)
        VALUES (${rental.vehicle_type}, ${rental.model}, ${rental.slug}, ${rental.price_per_day_idr}, ${rental.price_per_hour_idr}, ${rental.features}::jsonb, ${rental.image_url}, ${rental.is_available})
        ON CONFLICT (slug) DO UPDATE SET
          vehicle_type = EXCLUDED.vehicle_type,
          model = EXCLUDED.model,
          price_per_day_idr = EXCLUDED.price_per_day_idr,
          price_per_hour_idr = EXCLUDED.price_per_hour_idr,
          features = EXCLUDED.features,
          image_url = EXCLUDED.image_url,
          is_available = EXCLUDED.is_available,
          updated_at = CURRENT_TIMESTAMP
      `;
      console.log(`  ✅ ${rental.model}`);
    }
    console.log('');

    console.log('🎉 PRODUCTION database setup complete!\n');
    console.log('✅ Tables created:');
    console.log('   - tour_packages (6 packages)');
    console.log('   - rental_services (4 vehicles)');
    console.log('   - seo_data');
    console.log('');
    console.log('🚀 Ready for deployment!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  }
}

setupDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Setup failed:', err);
    process.exit(1);
  });
