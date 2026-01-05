// Check database connection and setup
import { neon } from '@neondatabase/serverless';

async function checkAndSetup() {
  console.log('🔍 Checking database connection...');
  
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('');
    console.error('❌ DATABASE_URL is not set!');
    console.error('');
    console.error('Please add your Neon database URL to .env.local:');
    console.error('');
    console.error('  DATABASE_URL=postgresql://user:pass@host/db');
    console.error('');
    console.error('Get your connection string from: https://console.neon.tech');
    console.error('');
    process.exit(1);
  }

  try {
    const sql = neon(databaseUrl);
    
    // Test connection
    console.log('🔌 Testing connection...');
    await sql`SELECT 1`;
    console.log('✅ Database connection successful!');
    console.log('');
    
    // Check if analytics tables exist
    console.log('🔍 Checking for existing analytics tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('analytics_events', 'page_views', 'conversion_funnel')
    `;
    
    if (tables.length === 3) {
      console.log('✅ All analytics tables already exist!');
      console.log('');
      console.log('📊 Tables found:');
      tables.forEach(t => console.log('   ✓', t.table_name));
      console.log('');
      console.log('🎉 Your analytics dashboard is ready!');
      console.log('   Visit: http://localhost:3000/admin');
      console.log('');
      return;
    }
    
    console.log(`📝 Found ${tables.length}/3 tables. Creating missing tables...`);
    console.log('');
    
    // Create analytics_events table
    if (!tables.find(t => t.table_name === 'analytics_events')) {
      console.log('📊 Creating analytics_events table...');
      await sql`
        CREATE TABLE analytics_events (
          id SERIAL PRIMARY KEY,
          event_name VARCHAR(100) NOT NULL,
          event_category VARCHAR(50),
          event_label VARCHAR(200),
          user_id VARCHAR(100),
          session_id VARCHAR(100),
          page_path VARCHAR(500),
          referrer VARCHAR(500),
          device_type VARCHAR(50),
          browser VARCHAR(50),
          country VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          metadata JSONB
        )
      `;
      console.log('   ✅ Created analytics_events');
    }

    // Create page_views table
    if (!tables.find(t => t.table_name === 'page_views')) {
      console.log('📄 Creating page_views table...');
      await sql`
        CREATE TABLE page_views (
          id SERIAL PRIMARY KEY,
          page_path VARCHAR(500) NOT NULL,
          session_id VARCHAR(100),
          user_id VARCHAR(100),
          referrer VARCHAR(500),
          device_type VARCHAR(50),
          duration_seconds INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('   ✅ Created page_views');
    }

    // Create conversion_funnel table
    if (!tables.find(t => t.table_name === 'conversion_funnel')) {
      console.log('🔄 Creating conversion_funnel table...');
      await sql`
        CREATE TABLE conversion_funnel (
          id SERIAL PRIMARY KEY,
          session_id VARCHAR(100) NOT NULL,
          step VARCHAR(50) NOT NULL,
          step_order INTEGER NOT NULL,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      console.log('   ✅ Created conversion_funnel');
    }

    // Create indexes
    console.log('');
    console.log('🔍 Creating indexes for better performance...');
    try {
      await sql`CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events(event_name)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_events_created_at ON analytics_events(created_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_funnel_session ON conversion_funnel(session_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_funnel_step ON conversion_funnel(step)`;
      console.log('   ✅ Indexes created');
    } catch (e) {
      console.log('   ⚠️  Some indexes may already exist (this is OK)');
    }

    // Check users table
    console.log('');
    console.log('👥 Checking users table...');
    const usersTable = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      )
    `;
    
    if (usersTable[0].exists) {
      console.log('   ✅ Users table exists');
      try {
        await sql`
          DO $$ 
          BEGIN
            IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'users' AND column_name = 'is_admin'
            ) THEN
              ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;
            END IF;
          END $$
        `;
        console.log('   ✅ Added is_admin column');
      } catch (e) {
        console.log('   ℹ️  is_admin column may already exist');
      }
    } else {
      console.log('   ℹ️  Users table not found (optional)');
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('🎉 Analytics setup completed successfully!');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('📈 Your analytics dashboard is ready at:');
    console.log('   👉 http://localhost:3000/admin');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Run: npm run dev');
    console.log('   2. Visit: http://localhost:3000/admin');
    console.log('   3. Start tracking events automatically!');
    console.log('');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error:', error.message);
    console.error('');
    
    if (error.message.includes('getaddrinfo')) {
      console.error('🔌 Network connection issue. Please check:');
      console.error('   - Your internet connection');
      console.error('   - DATABASE_URL is correct');
      console.error('   - Database is accessible');
    } else if (error.message.includes('password') || error.message.includes('authentication')) {
      console.error('🔐 Authentication issue. Please check:');
      console.error('   - DATABASE_URL credentials are correct');
      console.error('   - User has proper permissions');
    } else {
      console.error('💡 Troubleshooting tips:');
      console.error('   - Verify DATABASE_URL in .env.local');
      console.error('   - Check database permissions');
      console.error('   - Ensure tables don\'t have conflicts');
    }
    console.error('');
    process.exit(1);
  }
}

checkAndSetup();
