import { config } from 'dotenv';
config({ path: '.env.local' });

import { 
  getTourPackages, 
  getRentalServices, 
  getTourPackageBySlug,
  getRentalServiceBySlug,
  createContactInquiry,
  getSeoDataByPath,
  trackPageView
} from './queries';

async function runIntegrationTests() {
  try {
    console.log('🧪 Running database integration tests...\n');

    // Test 1: Get all tour packages
    console.log('1️⃣ Testing getTourPackages()');
    const tours = await getTourPackages();
    console.log(`   ✅ Retrieved ${tours.length} tour packages`);
    console.log(`   📋 Tours: ${tours.map(t => t.name).join(', ')}\n`);

    // Test 2: Get specific tour by slug
    console.log('2️⃣ Testing getTourPackageBySlug()');
    const westTrip = await getTourPackageBySlug('west-trip');
    if (westTrip) {
      console.log(`   ✅ Found tour: ${westTrip.name} - ${westTrip.priceIdr.toLocaleString()} IDR`);
    } else {
      console.log('   ❌ Tour not found');
    }
    console.log();

    // Test 3: Get all rental services
    console.log('3️⃣ Testing getRentalServices()');
    const rentals = await getRentalServices();
    console.log(`   ✅ Retrieved ${rentals.length} rental services`);
    console.log(`   🚗 Rentals: ${rentals.map(r => `${r.model} (${r.vehicleType})`).join(', ')}\n`);

    // Test 4: Get specific rental by slug
    console.log('4️⃣ Testing getRentalServiceBySlug()');
    const nmax = await getRentalServiceBySlug('nmax-motorcycle');
    if (nmax) {
      console.log(`   ✅ Found rental: ${nmax.model} - ${nmax.pricePerDayIdr.toLocaleString()} IDR/day`);
    } else {
      console.log('   ❌ Rental not found');
    }
    console.log();

    // Test 5: Create contact inquiry
    console.log('5️⃣ Testing createContactInquiry()');
    const testInquiry = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      message: 'This is a test inquiry for database integration testing',
      tourInterest: 'West Trip',
      rentalInterest: null
    };
    
    const inquiry = await createContactInquiry(testInquiry);
    console.log(`   ✅ Created inquiry with ID: ${inquiry.id}`);
    console.log(`   📧 Email: ${inquiry.email}, Status: ${inquiry.status}\n`);

    // Test 6: Get SEO data
    console.log('6️⃣ Testing getSeoDataByPath()');
    const homeSeo = await getSeoDataByPath('/');
    if (homeSeo) {
      console.log(`   ✅ Found SEO data for homepage`);
      console.log(`   📄 Title: ${homeSeo.title}`);
      console.log(`   📝 Description: ${homeSeo.description?.substring(0, 80)}...`);
    } else {
      console.log('   ❌ SEO data not found');
    }
    console.log();

    // Test 7: Track page view
    console.log('7️⃣ Testing trackPageView()');
    const pageView = await trackPageView({
      pagePath: '/test',
      userAgent: 'Test User Agent',
      referrer: 'https://google.com',
      ipAddress: '127.0.0.1'
    });
    console.log(`   ✅ Tracked page view with ID: ${pageView.id}`);
    console.log(`   📊 Page: ${pageView.pagePath}, IP: ${pageView.ipAddress}\n`);

    console.log('🎉 All integration tests passed successfully!');
    
    return {
      success: true,
      results: {
        tourPackages: tours.length,
        rentalServices: rentals.length,
        contactInquiry: inquiry.id,
        seoData: !!homeSeo,
        pageView: pageView.id
      }
    };

  } catch (error) {
    console.error('❌ Integration test failed:', error);
    return { success: false, error };
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runIntegrationTests()
    .then((result) => {
      if (result.success) {
        console.log('\n✅ Integration tests completed successfully');
        console.log('📊 Test Results:', result.results);
        process.exit(0);
      } else {
        console.log('\n❌ Integration tests failed');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Integration tests crashed:', error);
      process.exit(1);
    });
}