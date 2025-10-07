const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixReviews() {
  console.log('Starting review fixes...\n');

  // 1. Get current reviews
  console.log('1. Checking current reviews...');
  const { data: currentReviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  console.log(`Current reviews: ${currentReviews?.length || 0}`);
  currentReviews?.forEach((r, i) => {
    console.log(`${i + 1}. ${r.customer_name} - ${r.rating}⭐`);
  });

  // 2. Delete all current reviews
  console.log('\n2. Deleting all current reviews...');
  const { error: deleteError } = await supabase
    .from('reviews')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('Error deleting reviews:', deleteError);
    return;
  }
  console.log('✓ All reviews deleted\n');

  // 3. Insert 6 new reviews with unique names, all 5 stars
  console.log('3. Adding 6 new reviews with unique names...');
  const newReviews = [
    {
      customer_name: 'Marcus Holloway',
      email: 'mholloway@example.com',
      rating: 5,
      review_text: 'Absolutely incredible work! Colin transformed my Mercedes-Benz E-Class from top to bottom. The paint correction brought back the original showroom shine, and the interior smells brand new. Best detailing experience I\'ve ever had in Southwest Florida!',
      service_type: '2021 Mercedes-Benz E-Class - Premium Combined',
      status: 'approved'
    },
    {
      customer_name: 'Destiny Rivera',
      email: 'drivera@example.com',
      rating: 5,
      review_text: 'Colin is a true professional! My BMW X5 was in rough shape after my kids\' sports season, but he made it look absolutely pristine. The attention to detail is unmatched. He even removed stains I thought were permanent. Highly recommend to everyone in Naples!',
      service_type: '2020 BMW X5 - Premium Interior',
      status: 'approved'
    },
    {
      customer_name: 'Jasper Chen',
      email: 'jchen@example.com',
      rating: 5,
      review_text: 'Outstanding service from start to finish! My Porsche 911 looks better than the day I bought it. Colin\'s attention to detail and professionalism is top-tier. Worth every single penny. Will definitely be a regular customer!',
      service_type: '2023 Porsche 911 - Premium Exterior',
      status: 'approved'
    },
    {
      customer_name: 'Sienna Brooks',
      email: 'sbrooks@example.com',
      rating: 5,
      review_text: 'I am so impressed with Colin\'s work! My Honda Accord had dog hair everywhere and mysterious stains from my toddler. Colin worked his magic and it looks like a brand new car. He\'s patient, thorough, and clearly passionate about what he does. Thank you!',
      service_type: '2019 Honda Accord - Standard Combined + Pet Hair',
      status: 'approved'
    },
    {
      customer_name: 'Dashawn Williams',
      email: 'dwilliams@example.com',
      rating: 5,
      review_text: 'Best mobile detailing in Marco Island, hands down! My Ford F-150 work truck was filthy from construction sites, and Colin got it looking showroom-ready. His pricing is fair, communication is excellent, and results speak for themselves. Already booked my next appointment!',
      service_type: '2020 Ford F-150 - Standard Combined',
      status: 'approved'
    },
    {
      customer_name: 'Autumn Fitzgerald',
      email: 'afitzgerald@example.com',
      rating: 5,
      review_text: 'Colin exceeded all my expectations! My Tesla Model 3 needed a deep clean and he delivered perfection. The paint looks incredible with the new coating, and the white interior is spotless. His mobile service is so convenient - he came right to my office. Absolutely fantastic experience!',
      service_type: '2022 Tesla Model 3 - Premium Combined',
      status: 'approved'
    }
  ];

  const { error: insertError } = await supabase
    .from('reviews')
    .insert(newReviews);

  if (insertError) {
    console.error('Error inserting reviews:', insertError);
    return;
  }
  console.log('✓ 6 new reviews added\n');

  // 4. Show final results
  console.log('4. Final review list:');
  const { data: finalReviews } = await supabase
    .from('reviews')
    .select('customer_name, rating, service_type')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  finalReviews?.forEach((review, index) => {
    console.log(`${index + 1}. ${review.customer_name} - ${review.rating}⭐ - ${review.service_type}`);
  });

  console.log(`\nTotal: ${finalReviews?.length || 0} reviews`);
  console.log('All reviews are now 5-star with unique names!');
}

fixReviews().catch(console.error);
