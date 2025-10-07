const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function applyFix() {
  console.log('Applying schema fixes to custom_quotes table...\n');

  // Check current structure
  console.log('Checking current table structure...');
  const { data: testQuote } = await supabase
    .from('custom_quotes')
    .select('*')
    .limit(1);

  if (testQuote && testQuote.length > 0) {
    const currentColumns = Object.keys(testQuote[0]);
    console.log('Current columns:', currentColumns.join(', '));

    const missingColumns = [];
    if (!currentColumns.includes('address')) missingColumns.push('address');
    if (!currentColumns.includes('city')) missingColumns.push('city');
    if (!currentColumns.includes('zip_code')) missingColumns.push('zip_code');
    if (!currentColumns.includes('vehicle_condition')) missingColumns.push('vehicle_condition');

    if (missingColumns.length > 0) {
      console.log('\n⚠️  Missing columns:', missingColumns.join(', '));
      console.log('\nPlease run this SQL in Supabase SQL Editor:');
      console.log('---');
      console.log(`
ALTER TABLE custom_quotes
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS zip_code TEXT,
ADD COLUMN IF NOT EXISTS vehicle_condition TEXT CHECK (vehicle_condition IN ('excellent', 'good', 'fair', 'poor'));
      `);
      console.log('---\n');
    } else {
      console.log('\n✅ All required columns exist!');
    }
  } else {
    console.log('\n⚠️  No quotes found to check structure');
  }
}

applyFix().catch(console.error);
