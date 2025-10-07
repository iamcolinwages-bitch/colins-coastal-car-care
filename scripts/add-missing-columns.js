const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

async function addColumns() {
  console.log('Adding missing columns to custom_quotes table...\n');

  // We'll use fetch to hit the Supabase REST API directly with the service key
  const queries = [
    "ALTER TABLE custom_quotes ADD COLUMN IF NOT EXISTS address TEXT",
    "ALTER TABLE custom_quotes ADD COLUMN IF NOT EXISTS city TEXT",
    "ALTER TABLE custom_quotes ADD COLUMN IF NOT EXISTS zip_code TEXT"
  ];

  for (const query of queries) {
    console.log(`Running: ${query}`);

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`
        },
        body: JSON.stringify({ query })
      });

      if (response.ok) {
        console.log('  ✅ Success\n');
      } else {
        const error = await response.text();
        console.log(`  ⚠️  ${error}\n`);
      }
    } catch (error) {
      console.log(`  ⚠️  ${error.message}\n`);
    }
  }

  console.log('\n📋 Manual SQL (if above failed):');
  console.log('Copy and paste this into Supabase SQL Editor:\n');
  console.log('ALTER TABLE custom_quotes');
  console.log('ADD COLUMN IF NOT EXISTS address TEXT,');
  console.log('ADD COLUMN IF NOT EXISTS city TEXT,');
  console.log('ADD COLUMN IF NOT EXISTS zip_code TEXT;');
}

addColumns().catch(console.error);
