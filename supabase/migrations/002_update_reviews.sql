-- Remove David Thompson's review
DELETE FROM reviews WHERE customer_name = 'David Thompson';

-- Add 3 new reviews with mixed ratings (2 four-star, rest five-star)
-- This brings total to 6 reviews: 4 five-star, 2 four-star
INSERT INTO reviews (customer_name, email, rating, review_text, service_type, status) VALUES
  ('Robert Martinez', 'rmartinez@example.com', 5, 'Outstanding service from start to finish! Colin detailed my 2021 Mercedes-Benz E-Class and it looks absolutely stunning. The paint correction and ceramic coating were flawless. Definitely worth the investment!', '2021 Mercedes-Benz E-Class - Premium Combined', 'approved'),
  ('Lisa Anderson', 'landerson@example.com', 4, 'Very good detailing service. Colin was professional and thorough with my Honda Accord. The interior cleaning was excellent, though I wish the exterior had a bit more shine. Still a solid job overall and I''d use him again.', '2019 Honda Accord - Standard Combined', 'approved'),
  ('Kevin Park', 'kpark@example.com', 4, 'Good work on my Ford F-150. The truck bed cleaning was impressive and the interior looks much better. Colin was friendly and showed up on time. A couple minor spots were missed but nothing major. Fair pricing for the service.', '2020 Ford F-150 - Standard Interior + Exterior', 'approved');
