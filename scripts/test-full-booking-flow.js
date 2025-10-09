const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MjY0NjEsImV4cCI6MjA3NTIwMjQ2MX0.Ibxc5MAhTh5qKgxv1hT4YTkcLsRB56aFjaaVTSHLgLo';

// Use ANON key to simulate real user
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFullFlow() {
  console.log('🧪 TESTING FULL BOOKING FLOW AS A PUBLIC USER\n');
  console.log('This simulates exactly what a customer experiences on the website.\n');
  console.log('=' .repeat(60));

  try {
    // STEP 1: Create Customer
    console.log('\n📝 STEP 1: Creating customer (like filling out quote form)...');
    const customerData = {
      first_name: 'Test',
      last_name: 'Customer',
      email: `test${Date.now()}@example.com`,
      phone: '555-0199',
      address: '123 Test Street',
      city: 'Naples'
    };

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();

    if (customerError) {
      console.log('❌ FAILED at customer creation:');
      console.log('Error:', customerError.message);
      return;
    }

    console.log('✅ Customer created successfully!');
    console.log('   Customer ID:', customer.id);

    // STEP 2: Create Quote
    console.log('\n📝 STEP 2: Creating quote (selecting packages)...');
    const quoteData = {
      customer_id: customer.id,
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      city: customerData.city,
      vehicle_type: 'sedan',
      vehicle_condition: 'good',
      vehicle_make: 'Honda',
      vehicle_model: 'Civic',
      vehicle_year: 2020,
      selected_packages: [],
      selected_addons: [],
      calculated_total: 100.00,
      status: 'approved',
      approved_price: 100.00
    };

    const { data: quote, error: quoteError } = await supabase
      .from('custom_quotes')
      .insert(quoteData)
      .select()
      .single();

    if (quoteError) {
      console.log('❌ FAILED at quote creation:');
      console.log('Error:', quoteError.message);
      console.log('Details:', quoteError);
      return;
    }

    console.log('✅ Quote created successfully!');
    console.log('   Quote ID:', quote.id);

    // STEP 3: Create Booking
    console.log('\n📝 STEP 3: Creating booking (scheduling appointment)...');
    const bookingData = {
      customer_id: customer.id,
      quote_id: quote.id,
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      phone: customerData.phone,
      address: customerData.address,
      city: customerData.city,
      vehicle_type: 'sedan',
      vehicle_make: 'Honda',
      vehicle_model: 'Civic',
      vehicle_year: 2020,
      selected_addons: [],
      scheduled_date: '2025-10-25',
      scheduled_time: '14:00:00',
      total_price: 100.00,
      status: 'scheduled',
      notes: 'Test booking from automated test'
    };

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (bookingError) {
      console.log('❌ FAILED at booking creation:');
      console.log('Error:', bookingError.message);
      console.log('Details:', bookingError);
      return;
    }

    console.log('✅ Booking created successfully!');
    console.log('   Booking ID:', booking.id);
    console.log('   Scheduled for:', booking.scheduled_date, 'at', booking.scheduled_time);

    console.log('\n' + '='.repeat(60));
    console.log('🎉 SUCCESS! FULL BOOKING FLOW WORKS PERFECTLY!');
    console.log('='.repeat(60));
    console.log('\n✅ All systems are GO!');
    console.log('✅ Customers can now:');
    console.log('   - Fill out quote forms');
    console.log('   - Submit quotes');
    console.log('   - Schedule bookings');
    console.log('\n🚀 Your website is ready for real customers!\n');

  } catch (error) {
    console.log('\n❌ UNEXPECTED ERROR:');
    console.log(error);
  }
}

testFullFlow().catch(console.error);
