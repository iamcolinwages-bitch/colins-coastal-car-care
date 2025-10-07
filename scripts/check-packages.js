const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPackages() {
  console.log('Checking packages table...\n');

  // Check current packages
  const { data: packages, error } = await supabase
    .from('packages')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching packages:', error);
    return;
  }

  console.log(`Found ${packages?.length || 0} packages:\n`);

  if (packages && packages.length > 0) {
    packages.forEach((pkg, i) => {
      console.log(`${i + 1}. ${pkg.name}`);
      console.log(`   ID: ${pkg.id}`);
      console.log(`   Sedan Price: $${pkg.sedan_price}`);
      console.log(`   SUV/Truck Price: $${pkg.suv_truck_price}`);
      console.log(`   Active: ${pkg.active}`);
      console.log('');
    });
  } else {
    console.log('⚠️  No packages found in database!');
    console.log('The packages table might be empty or not exist.');
  }
}

checkPackages().catch(console.error);
