const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addNewAddOns() {
  console.log('Adding new add-ons...\n');

  // 1. Check existing add-ons
  console.log('1. Checking current add-ons...');
  const { data: currentAddOns } = await supabase
    .from('add_ons')
    .select('*')
    .order('name');

  console.log(`Current add-ons: ${currentAddOns?.length || 0}`);
  currentAddOns?.forEach((addon, i) => {
    console.log(`${i + 1}. ${addon.name} - $${addon.price}`);
  });

  // 2. Check if Clay Bar Treatment already exists
  const clayBarExists = currentAddOns?.some(a => a.name === 'Clay Bar Treatment');
  const waterSpotExists = currentAddOns?.some(a => a.name === 'Water Spot Removal');

  const newAddOns = [];

  if (!clayBarExists) {
    newAddOns.push({
      name: 'Clay Bar Treatment',
      description: 'Remove contaminants and restore smooth paint finish',
      price: 35,
      active: true
    });
  }

  if (!waterSpotExists) {
    newAddOns.push({
      name: 'Water Spot Removal',
      description: 'Professional removal of hard water spots and mineral deposits',
      price: 35,
      active: true
    });
  }

  if (newAddOns.length === 0) {
    console.log('\n✓ All add-ons already exist!');
    return;
  }

  // 3. Insert new add-ons
  console.log(`\n2. Adding ${newAddOns.length} new add-on(s)...`);
  const { error: insertError } = await supabase
    .from('add_ons')
    .insert(newAddOns);

  if (insertError) {
    console.error('Error inserting add-ons:', insertError);
    return;
  }
  console.log(`✓ ${newAddOns.length} new add-on(s) added\n`);

  // 4. Show final results
  console.log('3. Final add-ons list:');
  const { data: finalAddOns } = await supabase
    .from('add_ons')
    .select('name, price, active')
    .order('name');

  finalAddOns?.forEach((addon, index) => {
    console.log(`${index + 1}. ${addon.name} - $${addon.price} ${addon.active ? '(Active)' : '(Inactive)'}`);
  });

  console.log(`\nTotal: ${finalAddOns?.length || 0} add-ons`);
}

addNewAddOns().catch(console.error);
