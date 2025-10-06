const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updatePetHairPrice() {
  console.log('Updating Pet Hair Removal price...\n');

  // Update price from $40 to $50
  const { error } = await supabase
    .from('add_ons')
    .update({ price: 50 })
    .eq('name', 'Pet Hair Removal');

  if (error) {
    console.error('Error updating price:', error);
    return;
  }

  console.log('✓ Pet Hair Removal price updated to $50\n');

  // Show all add-ons
  const { data: addOns } = await supabase
    .from('add_ons')
    .select('name, price')
    .order('name');

  console.log('Current add-ons:');
  addOns?.forEach((addon, i) => {
    console.log(`${i + 1}. ${addon.name} - $${addon.price}`);
  });
}

updatePetHairPrice().catch(console.error);
