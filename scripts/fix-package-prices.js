const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

// Updated pricing structure matching services page
const packagePricing = {
  'Standard Interior': {
    sedan: 100,
    suv_mid: 130,
    suv_large: 130,
    pickup_full: 130,
    coupe: 100,
    hatchback: 100,
    wagon: 110,
    convertible: 120,
    sports_car: 120,
    crossover: 130,
    minivan: 130,
    luxury_sedan: 130,
    luxury_suv: 140,
  },
  'Standard Exterior': {
    sedan: 100,
    suv_mid: 130,
    suv_large: 130,
    pickup_full: 130,
    coupe: 100,
    hatchback: 100,
    wagon: 110,
    convertible: 120,
    sports_car: 120,
    crossover: 130,
    minivan: 130,
    luxury_sedan: 130,
    luxury_suv: 140,
  },
  'Standard Combined': {
    sedan: 180,
    suv_mid: 230,
    suv_large: 230,
    pickup_full: 230,
    coupe: 180,
    hatchback: 180,
    wagon: 200,
    convertible: 220,
    sports_car: 220,
    crossover: 230,
    minivan: 230,
    luxury_sedan: 230,
    luxury_suv: 250,
  },
  'Premium Interior': {
    sedan: 200,
    suv_mid: 260,
    suv_large: 260,
    pickup_full: 260,
    coupe: 200,
    hatchback: 200,
    wagon: 220,
    convertible: 240,
    sports_car: 240,
    crossover: 260,
    minivan: 260,
    luxury_sedan: 260,
    luxury_suv: 280,
  },
  'Premium Exterior': {
    sedan: 200,
    suv_mid: 260,
    suv_large: 260,
    pickup_full: 260,
    coupe: 200,
    hatchback: 200,
    wagon: 220,
    convertible: 240,
    sports_car: 240,
    crossover: 260,
    minivan: 260,
    luxury_sedan: 260,
    luxury_suv: 280,
  },
  'Premium Combined': {
    sedan: 360,
    suv_mid: 460,
    suv_large: 460,
    pickup_full: 460,
    coupe: 360,
    hatchback: 360,
    wagon: 400,
    convertible: 440,
    sports_car: 440,
    crossover: 460,
    minivan: 460,
    luxury_sedan: 460,
    luxury_suv: 500,
  },
};

async function fixPackagePrices() {
  console.log('Fixing package prices with vehicle_type_prices structure...\n');

  for (const [packageName, prices] of Object.entries(packagePricing)) {
    console.log(`Updating ${packageName}...`);

    const { error } = await supabase
      .from('packages')
      .update({
        vehicle_type_prices: prices
      })
      .eq('name', packageName);

    if (error) {
      console.error(`  ❌ Error: ${error.message}`);
    } else {
      console.log(`  ✅ Updated - Sedan: $${prices.sedan}, SUV: $${prices.suv_mid}`);
    }
  }

  // Verify the updates
  console.log('\n=== VERIFICATION ===\n');
  const { data: packages } = await supabase
    .from('packages')
    .select('name, vehicle_type_prices')
    .order('name');

  if (packages) {
    packages.forEach((pkg) => {
      console.log(`${pkg.name}:`);
      console.log(`  Sedan: $${pkg.vehicle_type_prices?.sedan}`);
      console.log(`  SUV (Mid): $${pkg.vehicle_type_prices?.suv_mid}`);
      console.log(`  Pickup: $${pkg.vehicle_type_prices?.pickup_full}`);
      console.log('');
    });
  }

  console.log('✅ All package prices fixed successfully!');
}

fixPackagePrices().catch(console.error);
