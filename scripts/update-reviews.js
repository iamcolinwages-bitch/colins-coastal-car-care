const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rvyzohkszljarrnyeanp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2eXpvaGtzemxqYXJybnllYW5wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTYyNjQ2MSwiZXhwIjoyMDc1MjAyNDYxfQ.wRVcCI-0BF9u46HA_m5AGg5mujHlmP1nRN3_5H1d8M8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateReviews() {
  console.log('Starting review updates...\n');

  // 1. Delete David Thompson's review
  console.log('1. Deleting David Thompson review...');
  const { error: deleteError } = await supabase
    .from('reviews')
    .delete()
    .eq('customer_name', 'David Thompson');

  if (deleteError) {
    console.error('Error deleting review:', deleteError);
  } else {
    console.log('✓ David Thompson review deleted\n');
  }

  // 2. Check current reviews
  console.log('2. Checking current reviews...');
  const { data: currentReviews } = await supabase
    .from('reviews')
    .select('customer_name, rating')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  console.log('Current reviews:', currentReviews);
  console.log(`Total: ${currentReviews?.length || 0} reviews\n`);

  // 3. Add 3 new reviews (mix of 4 and 5 stars)
  console.log('3. Adding 3 new reviews...');
  const newReviews = [
    {
      customer_name: 'Robert Martinez',
      email: 'rmartinez@example.com',
      rating: 5,
      review_text: 'Outstanding service from start to finish! Colin detailed my 2021 Mercedes-Benz E-Class and it looks absolutely stunning. The paint correction and ceramic coating were flawless. Definitely worth the investment!',
      service_type: '2021 Mercedes-Benz E-Class - Premium Combined',
      status: 'approved'
    },
    {
      customer_name: 'Lisa Anderson',
      email: 'landerson@example.com',
      rating: 4,
      review_text: 'Very good detailing service. Colin was professional and thorough with my Honda Accord. The interior cleaning was excellent, though I wish the exterior had a bit more shine. Still a solid job overall and I\'d use him again.',
      service_type: '2019 Honda Accord - Standard Combined',
      status: 'approved'
    },
    {
      customer_name: 'Kevin Park',
      email: 'kpark@example.com',
      rating: 4,
      review_text: 'Good work on my Ford F-150. The truck bed cleaning was impressive and the interior looks much better. Colin was friendly and showed up on time. A couple minor spots were missed but nothing major. Fair pricing for the service.',
      service_type: '2020 Ford F-150 - Standard Interior + Exterior',
      status: 'approved'
    }
  ];

  const { error: insertError } = await supabase
    .from('reviews')
    .insert(newReviews);

  if (insertError) {
    console.error('Error inserting reviews:', insertError);
  } else {
    console.log('✓ 3 new reviews added\n');
  }

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
  console.log(`5-star: ${finalReviews?.filter(r => r.rating === 5).length || 0}`);
  console.log(`4-star: ${finalReviews?.filter(r => r.rating === 4).length || 0}`);
}

updateReviews().catch(console.error);
