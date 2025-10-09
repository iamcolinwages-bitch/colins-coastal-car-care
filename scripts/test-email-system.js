const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MjY0NjEsImV4cCI6MjA3NTIwMjQ2MX0.Ibxc5MAhTh5qKgxv1hT4YTkcLsRB56aFjaaVTSHLgLo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testEmailSystem() {
  console.log('🧪 TESTING EMAIL CONFIRMATION SYSTEM\\n');
  console.log('=' .repeat(60));

  try {
    // STEP 1: Create a test customer
    console.log('\\n📝 Step 1: Creating test customer...');
    const customerData = {
      first_name: 'Email',
      last_name: 'Test',
      email: 'emailtest@example.com', // You can change this to your real email
      phone: '555-TEST',
      address: '456 Test Ave',
      city: 'Naples'
    };

    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single();

    if (customerError) {
      console.log('❌ Failed to create customer:', customerError.message);
      return;
    }

    console.log('✅ Customer created:', customer.id);

    // STEP 2: Create a test quote
    console.log('\\n📝 Step 2: Creating test quote...');
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
      vehicle_make: 'Toyota',
      vehicle_model: 'Camry',
      vehicle_year: 2022,
      selected_packages: ['Premium Wash', 'Interior Detail'],
      selected_addons: ['Engine Bay Cleaning'],
      calculated_total: 150.00,
      status: 'approved',
      approved_price: 150.00
    };

    const { data: quote, error: quoteError } = await supabase
      .from('custom_quotes')
      .insert(quoteData)
      .select()
      .single();

    if (quoteError) {
      console.log('❌ Failed to create quote:', quoteError.message);
      return;
    }

    console.log('✅ Quote created:', quote.id);

    // STEP 3: Create a test booking
    console.log('\\n📝 Step 3: Creating test booking...');
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
      vehicle_make: 'Toyota',
      vehicle_model: 'Camry',
      vehicle_year: 2022,
      selected_addons: ['Engine Bay Cleaning'],
      scheduled_date: '2025-10-26',
      scheduled_time: '10:00:00',
      total_price: 150.00,
      status: 'scheduled',
      notes: 'This is a test booking to verify email system'
    };

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (bookingError) {
      console.log('❌ Failed to create booking:', bookingError.message);
      return;
    }

    console.log('✅ Booking created:', booking.id);

    // STEP 4: Test email sending via API
    console.log('\\n📧 Step 4: Sending confirmation emails...');
    console.log('\\nNOTE: This will only work if you have:');
    console.log('  1. Added RESEND_API_KEY to your .env.local file');
    console.log('  2. Configured a verified domain in Resend');
    console.log('  3. Set ADMIN_EMAIL in your .env.local file\\n');

    const emailPayload = {
      customerName: `${customerData.first_name} ${customerData.last_name}`,
      customerEmail: customerData.email,
      customerPhone: customerData.phone,
      vehicleInfo: `${bookingData.vehicle_year} ${bookingData.vehicle_make} ${bookingData.vehicle_model}`,
      scheduledDate: bookingData.scheduled_date,
      scheduledTime: bookingData.scheduled_time,
      totalPrice: bookingData.total_price,
      address: bookingData.address,
      city: bookingData.city,
      selectedAddons: bookingData.selected_addons,
      notes: bookingData.notes,
      bookingId: booking.id,
    };

    const response = await fetch('http://localhost:3000/api/send-booking-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Email API call successful!');
      console.log('Response:', JSON.stringify(result, null, 2));
      console.log('\\n📬 Check your inbox for the confirmation email!');
    } else {
      console.log('❌ Email API call failed');
      console.log('Error:', result.error);
      console.log('\nThis is expected if you haven\'t configured Resend yet.');
    }

    console.log('\\n' + '='.repeat(60));
    console.log('✅ Test completed successfully!');
    console.log('Booking ID:', booking.id);
    console.log('='.repeat(60));

  } catch (error) {
    console.log('\\n❌ UNEXPECTED ERROR:');
    console.log(error);
  }
}

testEmailSystem().catch(console.error);
