const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testBookingInsert() {
  console.log('Testing booking insert with sample data...\n');

  // First get a real quote to test with
  const { data: quotes } = await supabase
    .from('custom_quotes')
    .select('*')
    .eq('status', 'approved')
    .limit(1);

  if (!quotes || quotes.length === 0) {
    console.log('❌ No approved quotes found to test with');
    console.log('Creating a test quote first...\n');

    // Create test customer
    const { data: customer } = await supabase
      .from('customers')
      .insert({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        phone: '555-0100',
        address: '123 Test St',
        city: 'Naples'
      })
      .select()
      .single();

    console.log('✅ Test customer created:', customer.id);

    // Create test quote
    const { data: quote, error: quoteError } = await supabase
      .from('custom_quotes')
      .insert({
        customer_id: customer.id,
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        phone: '555-0100',
        address: '123 Test St',
        city: 'Naples',
        vehicle_type: 'sedan',
        vehicle_condition: 'good',
        vehicle_make: 'Toyota',
        vehicle_model: 'Camry',
        vehicle_year: 2020,
        selected_packages: [],
        selected_addons: [],
        calculated_total: 100.00,
        status: 'approved',
        approved_price: 100.00
      })
      .select()
      .single();

    if (quoteError) {
      console.log('❌ Error creating test quote:', quoteError);
      return;
    }

    console.log('✅ Test quote created:', quote.id);
    quotes[0] = quote;
  }

  const quote = quotes[0];
  console.log('Using quote:', quote.id);
  console.log('Quote data:', JSON.stringify(quote, null, 2));
  console.log('\n---\n');

  // Now try to create a booking
  const testBooking = {
    customer_id: quote.customer_id,
    quote_id: quote.id,
    first_name: quote.first_name,
    last_name: quote.last_name,
    email: quote.email,
    phone: quote.phone,
    address: quote.address || '123 Default St',
    city: quote.city || 'Naples',
    vehicle_type: quote.vehicle_type,
    vehicle_make: quote.vehicle_make,
    vehicle_model: quote.vehicle_model,
    vehicle_year: quote.vehicle_year,
    selected_addons: quote.selected_addons || [],
    scheduled_date: '2025-10-20',
    scheduled_time: '10:00:00',
    total_price: quote.approved_price || quote.calculated_total,
    status: 'scheduled',
    notes: 'Test booking'
  };

  console.log('Attempting to insert booking with data:');
  console.log(JSON.stringify(testBooking, null, 2));
  console.log('\n---\n');

  const { data: booking, error } = await supabase
    .from('bookings')
    .insert(testBooking)
    .select()
    .single();

  if (error) {
    console.log('❌ BOOKING INSERT FAILED:');
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    console.log('Error details:', error.details);
    console.log('Error hint:', error.hint);
  } else {
    console.log('✅ BOOKING CREATED SUCCESSFULLY!');
    console.log('Booking ID:', booking.id);
    console.log('Booking data:', JSON.stringify(booking, null, 2));
  }
}

testBookingInsert().catch(console.error);
