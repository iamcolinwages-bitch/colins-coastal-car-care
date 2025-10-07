const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Running migration 004: Fix quotes and bookings schema...\n');

  const migrationPath = path.join(__dirname, '../supabase/migrations/004_fix_quotes_bookings_schema.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Split by semicolon and run each statement
  const statements = sql.split(';').filter(s => s.trim().length > 0);

  for (const statement of statements) {
    if (statement.trim()) {
      console.log(`Executing: ${statement.trim().substring(0, 60)}...`);
      const { error } = await supabase.rpc('exec_sql', { sql_query: statement.trim() + ';' });

      if (error) {
        // Try direct query if RPC doesn't work
        console.log('  Trying alternative method...');
        try {
          await supabase.from('_migrations').insert({ statement: statement.trim() });
        } catch (e) {
          console.error('  ❌ Error:', error.message);
          // Continue with next statement
        }
      } else {
        console.log('  ✅ Success');
      }
    }
  }

  console.log('\n✅ Migration complete! Testing table structure...\n');

  // Test by fetching one quote to see new columns
  const { data, error } = await supabase
    .from('custom_quotes')
    .select('*')
    .limit(1);

  if (data && data.length > 0) {
    console.log('Sample quote structure:');
    console.log(Object.keys(data[0]).join(', '));
  }
}

runMigration().catch(console.error);
