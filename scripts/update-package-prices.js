const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

// Pricing from services page
const packagePrices = {
  'Standard Interior': { sedan: 100, suv_truck: 130 },
  'Standard Exterior': { sedan: 100, suv_truck: 130 },
  'Standard Combined': { sedan: 180, suv_truck: 230 },
  'Premium Interior': { sedan: 200, suv_truck: 260 },
  'Premium Exterior': { sedan: 200, suv_truck: 260 },
  'Premium Combined': { sedan: 360, suv_truck: 460 },
};

async function updatePackagePrices() {
  console.log('Updating package prices...\n');

  for (const [packageName, prices] of Object.entries(packagePrices)) {
    console.log(`Updating ${packageName}...`);

    const { error } = await supabase
      .from('packages')
      .update({
        sedan_price: prices.sedan,
        suv_truck_price: prices.suv_truck
      })
      .eq('name', packageName);

    if (error) {
      console.error(`  ❌ Error: ${error.message}`);
    } else {
      console.log(`  ✅ Sedan: $${prices.sedan}, SUV/Truck: $${prices.suv_truck}`);
    }
  }

  // Verify the updates
  console.log('\n=== VERIFICATION ===\n');
  const { data: packages } = await supabase
    .from('packages')
    .select('*')
    .order('name');

  if (packages) {
    packages.forEach((pkg) => {
      console.log(`${pkg.name}:`);
      console.log(`  Sedan: $${pkg.sedan_price}`);
      console.log(`  SUV/Truck: $${pkg.suv_truck_price}`);
      console.log('');
    });
  }

  console.log('✅ All package prices updated successfully!');
}

updatePackagePrices().catch(console.error);
