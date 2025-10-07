-- Add missing fields to custom_quotes table
ALTER TABLE custom_quotes
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS zip_code TEXT,
ADD COLUMN IF NOT EXISTS vehicle_condition TEXT CHECK (vehicle_condition IN ('excellent', 'good', 'fair', 'poor'));

-- Update bookings table to remove package_id (not used) and ensure all fields are correct
-- The bookings table already has the correct schema, just ensuring consistency
