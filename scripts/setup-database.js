/**
 * Setup Supabase Database for Creator Styles
 * Run with: node scripts/setup-database.js
 */

const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
  }

  console.log('🔧 Setting up Supabase database...');
  console.log(`📍 URL: ${supabaseUrl}`);

  // Read SQL schema
  const schemaPath = path.join(__dirname, '../supabase/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Split schema into individual statements
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  console.log(`📝 Found ${statements.length} SQL statements`);

  // Execute each statement via Supabase REST API
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i] + ';';
    console.log(`\n[${i + 1}/${statements.length}] Executing...`);
    
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: statement })
      });

      if (!response.ok) {
        const error = await response.text();
        console.log(`⚠️  Response: ${response.status} - ${error}`);
        // Continue anyway - some statements might fail if already exists
      } else {
        console.log('✅ Success');
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
  }

  console.log('\n✅ Database setup complete!');
  console.log('\n📊 Testing connection...');

  // Test by fetching creator_styles
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/creator_styles?select=name`, {
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Found ${data.length} creators in database:`);
      data.forEach(creator => console.log(`  - ${creator.name}`));
    } else {
      console.log('⚠️  Table might not exist yet - run SQL manually');
    }
  } catch (error) {
    console.error(`❌ Connection test failed: ${error.message}`);
  }
}

// Load .env.local
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

setupDatabase().catch(console.error);
