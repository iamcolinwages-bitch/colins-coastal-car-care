const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

async function fixDatabase() {
  console.log('🔧 FIXING DATABASE AUTOMATICALLY...\n');

  // Read the SQL file
  const sql = fs.readFileSync('./supabase/migrations/005_fix_rls_policies.sql', 'utf8');

  console.log('📝 SQL to execute:');
  console.log('---');
  console.log(sql);
  console.log('---\n');

  // Try to execute via HTTP request to Supabase Management API
  console.log('Attempting to execute SQL...\n');

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ query: sql })
    });

    const result = await response.text();
    console.log('Response:', result);

    if (response.ok) {
      console.log('\n✅ SUCCESS! Database has been fixed!');
      console.log('You can now test the booking and quote forms.');
    } else {
      console.log('\n⚠️  API method did not work.');
      console.log('Running alternative approach using individual queries...\n');
      await runQueriesIndividually();
    }
  } catch (error) {
    console.log('\n⚠️  Error:', error.message);
    console.log('Trying alternative approach...\n');
    await runQueriesIndividually();
  }
}

async function runQueriesIndividually() {
  console.log('Using Supabase client with service key to apply changes...\n');

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // Since we can't run DDL directly, let's at least verify what's needed
  console.log('Checking current database state...\n');

  // Check if columns exist
  const { data: quote } = await supabase
    .from('custom_quotes')
    .select('*')
    .limit(1);

  if (quote && quote.length > 0) {
    const columns = Object.keys(quote[0]);
    console.log('✓ Custom_quotes columns:', columns.join(', '));

    const missing = [];
    if (!columns.includes('address')) missing.push('address');
    if (!columns.includes('city')) missing.push('city');
    if (!columns.includes('zip_code')) missing.push('zip_code');

    if (missing.length > 0) {
      console.log('\n⚠️  MISSING COLUMNS:', missing.join(', '));
    } else {
      console.log('\n✅ All required columns exist!');
    }
  }

  console.log('\n📋 MANUAL STEP REQUIRED:');
  console.log('Since I cannot execute DDL commands programmatically,');
  console.log('please run the SQL in SCHEMA_FIX_INSTRUCTIONS.md manually.\n');
  console.log('Direct link: https://supabase.com/dashboard/project/rvyzohkszljarrnyeanp/sql\n');
}

fixDatabase().catch(console.error);
