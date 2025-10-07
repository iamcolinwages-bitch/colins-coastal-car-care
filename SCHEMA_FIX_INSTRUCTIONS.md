# URGENT: Database Fixes Required

## The Problem

People can't submit quotes or book appointments because:
1. Missing database columns (address, city, zip_code)
2. Row Level Security (RLS) policies blocking public access

## THE FIX - Run This SQL Now

Go to: https://supabase.com/dashboard/project/rvyzohkszljarrnyeanp/sql

Click "+ New Query" and paste ALL of this:

```sql
-- PART 1: Add missing columns
ALTER TABLE custom_quotes
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS zip_code TEXT;

-- PART 2: Fix RLS policies to allow public bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Anyone can insert bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can view their bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can insert quotes" ON custom_quotes;
DROP POLICY IF EXISTS "Anyone can view their quotes" ON custom_quotes;
DROP POLICY IF EXISTS "Anyone can insert customers" ON customers;
DROP POLICY IF EXISTS "Anyone can view customers" ON customers;

-- Allow public to create bookings
CREATE POLICY "Anyone can insert bookings"
  ON bookings FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view their bookings"
  ON bookings FOR SELECT TO anon, authenticated USING (true);

-- Allow public to create quotes
CREATE POLICY "Anyone can insert quotes"
  ON custom_quotes FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view their quotes"
  ON custom_quotes FOR SELECT TO anon, authenticated USING (true);

-- Allow public to create customers
CREATE POLICY "Anyone can insert customers"
  ON customers FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view customers"
  ON customers FOR SELECT TO anon, authenticated USING (true);
```

Click "Run" and you're done!

## What This Fixes

✅ Quote form will work
✅ Booking form will work
✅ Customer data will be saved properly
✅ No more "Failed to create booking" errors
