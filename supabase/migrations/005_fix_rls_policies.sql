-- Fix RLS policies for bookings and custom_quotes to allow public inserts

-- Enable RLS on tables if not already enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can view their bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can insert quotes" ON custom_quotes;
DROP POLICY IF EXISTS "Anyone can view their quotes" ON custom_quotes;
DROP POLICY IF EXISTS "Anyone can insert customers" ON customers;

-- BOOKINGS: Allow anyone to insert (for public booking form)
CREATE POLICY "Anyone can insert bookings"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- BOOKINGS: Allow viewing own bookings (by email)
CREATE POLICY "Anyone can view their bookings"
  ON bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- CUSTOM_QUOTES: Allow anyone to insert (for public quote form)
CREATE POLICY "Anyone can insert quotes"
  ON custom_quotes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- CUSTOM_QUOTES: Allow viewing own quotes
CREATE POLICY "Anyone can view their quotes"
  ON custom_quotes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- CUSTOMERS: Allow anyone to insert (for public forms)
CREATE POLICY "Anyone can insert customers"
  ON customers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- CUSTOMERS: Allow viewing (needed for joins)
CREATE POLICY "Anyone can view customers"
  ON customers
  FOR SELECT
  TO anon, authenticated
  USING (true);
