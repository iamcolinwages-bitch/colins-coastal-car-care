-- Colin's Coastal Car Care Database Schema

-- Packages table
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('interior', 'exterior', 'combined')),
  tier TEXT NOT NULL CHECK (tier IN ('standard', 'premium')),
  description TEXT NOT NULL,
  services JSONB NOT NULL,
  sedan_price DECIMAL(10, 2) NOT NULL,
  suv_truck_price DECIMAL(10, 2) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add-ons table
CREATE TABLE add_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Custom quotes table
CREATE TABLE custom_quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('sedan', 'suv_truck')),
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  selected_packages JSONB NOT NULL,
  selected_addons JSONB NOT NULL,
  calculated_total DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  approved_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  quote_id UUID REFERENCES custom_quotes(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('sedan', 'suv_truck')),
  vehicle_make TEXT,
  vehicle_model TEXT,
  vehicle_year INTEGER,
  package_id UUID REFERENCES packages(id),
  selected_addons JSONB,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  booking_id UUID REFERENCES bookings(id),
  customer_name TEXT NOT NULL,
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  service_type TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Availability table (for blocking off dates/times)
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin settings table
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email/SMS templates table
CREATE TABLE email_sms_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'sms', 'both')),
  subject TEXT,
  body TEXT NOT NULL,
  graphics JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Email/SMS campaign history table
CREATE TABLE campaign_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES email_sms_templates(id),
  campaign_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'sms', 'both')),
  recipient_count INTEGER NOT NULL,
  recipients JSONB NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('scheduled', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default business settings
INSERT INTO admin_settings (key, value) VALUES
  ('business_hours', '{"monday": {"start": "07:00", "end": "19:30"}, "tuesday": {"start": "07:00", "end": "19:30"}, "wednesday": {"start": "07:00", "end": "19:30"}, "thursday": {"start": "07:00", "end": "19:30"}, "friday": {"start": "07:00", "end": "19:30"}, "saturday": {"start": "07:00", "end": "19:30"}, "sunday": null}'),
  ('service_areas', '["Estero", "Bonita Springs", "Naples", "Marco Island"]'),
  ('contact_info', '{"phone": "(469) 618-3423", "email": "iamColinwages@gmail.com"}'),
  ('booking_buffer_minutes', '30');

-- Insert initial packages
INSERT INTO packages (name, type, tier, description, services, sedan_price, suv_truck_price) VALUES
  ('Standard Interior', 'interior', 'standard', 'Complete interior cleaning and refresh',
   '["Vacuum all interior surfaces", "Wipe down all interior surfaces", "Clean interior and exterior glass", "Vacuum door jams"]',
   100.00, 130.00),

  ('Standard Exterior', 'exterior', 'standard', 'Thorough exterior hand wash and shine',
   '["Hand wash", "Wheels washed and cleaned", "Exterior glass cleaning", "Interior glass mirrors", "Tire shine applied"]',
   100.00, 130.00),

  ('Standard Combined', 'combined', 'standard', 'Complete standard interior and exterior package',
   '["All Standard Interior services", "All Standard Exterior services"]',
   180.00, 230.00),

  ('Premium Interior', 'interior', 'premium', 'Deep interior detailing with premium products',
   '["All Standard Interior services", "Deep cleaning", "Leather treatment", "Stain removal", "Odor elimination"]',
   200.00, 260.00),

  ('Premium Exterior', 'exterior', 'premium', 'Premium exterior detail with wax and protection',
   '["All Standard Exterior services", "Clay bar treatment", "Premium wax application", "Wheel detailing", "Engine bay wipe down"]',
   200.00, 260.00),

  ('Premium Combined', 'combined', 'premium', 'Complete premium interior and exterior package',
   '["All Premium Interior services", "All Premium Exterior services"]',
   360.00, 460.00);

-- Insert initial add-ons
INSERT INTO add_ons (name, description, price) VALUES
  ('Engine Bay Cleaning', 'Professional engine bay cleaning and dressing', 50.00),
  ('Pet Hair Removal', 'Thorough pet hair removal from all surfaces', 40.00);

-- Insert 5 seed reviews
INSERT INTO reviews (customer_name, email, rating, review_text, service_type, status) VALUES
  ('Sarah Mitchell', 'sarah.m@example.com', 5, 'Colin did an amazing job on my BMW! The interior looks brand new and he was super professional. Highly recommend for anyone in the Naples area!', 'Premium Interior', 'approved'),
  ('Mike Rodriguez', 'mike.r@example.com', 5, 'Best mobile detailing service I''ve used in Southwest Florida. My truck was filthy from the beach and Colin made it look showroom ready. Worth every penny!', 'Standard Combined', 'approved'),
  ('Jennifer Chen', 'jen.chen@example.com', 5, 'Very impressed with the attention to detail. Colin showed up right on time to my place in Bonita Springs and spent hours making sure everything was perfect. The car looks incredible!', 'Premium Combined', 'approved'),
  ('David Thompson', 'dthompson@example.com', 4, 'Great service! My SUV hadn''t been detailed in over a year and Colin brought it back to life. Very professional and reasonably priced for the quality of work.', 'Standard Exterior', 'approved'),
  ('Amanda Foster', 'afoster@example.com', 5, 'Colin is now my go-to for car detailing! He removed all the dog hair from my Jeep (which I thought was impossible) and it smells fresh again. Booking again next month!', 'Standard Interior + Pet Hair Removal', 'approved');

-- Create indexes for better query performance
CREATE INDEX idx_bookings_scheduled_date ON bookings(scheduled_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_custom_quotes_status ON custom_quotes(status);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_availability_date ON availability(date);
