import { db, sql } from './config';

export async function testDatabaseConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Test basic connection
    const result = await sql`SELECT NOW() as current_time, version() as version`;
    
    if (result && result.length > 0) {
      console.log('✅ Database connection successful!');
      console.log(`📅 Current time: ${result[0].current_time}`);
      console.log(`🗄️  Database version: ${result[0].version}`);
      return true;
    } else {
      console.log('❌ Database connection failed - no result');
      return false;
    }
  } catch (error) {
    console.error('❌ Database connection error:', error);
    return false;
  }
}

export async function checkTablesExist() {
  try {
    console.log('🔍 Checking if tables exist...');
    
    const tablesQuery = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    const tableNames = tablesQuery.map(row => row.table_name);
    
    const expectedTables = [
      'tour_packages',
      'rental_services', 
      'contact_inquiries',
      'seo_data',
      'page_views'
    ];
    
    console.log('📋 Existing tables:', tableNames);
    
    const missingTables = expectedTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length === 0) {
      console.log('✅ All required tables exist!');
      return true;
    } else {
      console.log('⚠️  Missing tables:', missingTables);
      return false;
    }
  } catch (error) {
    console.error('❌ Error checking tables:', error);
    return false;
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const runTests = async () => {
    const connectionOk = await testDatabaseConnection();
    if (connectionOk) {
      await checkTablesExist();
    }
  };
  
  runTests()
    .then(() => {
      console.log('Database tests completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database tests failed:', error);
      process.exit(1);
    });
}