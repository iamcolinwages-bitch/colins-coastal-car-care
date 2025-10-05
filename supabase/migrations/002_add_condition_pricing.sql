-- Add condition pricing multipliers to admin settings
INSERT INTO admin_settings (key, value) VALUES
  ('condition_multipliers', '{
    "clean": 1.0,
    "moderate": 1.15,
    "dirty": 1.35,
    "needs_love": 1.6
  }')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Add condition field to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS vehicle_condition TEXT CHECK (vehicle_condition IN ('clean', 'moderate', 'dirty', 'needs_love'));

-- Add condition field to custom_quotes table  
ALTER TABLE custom_quotes ADD COLUMN IF NOT EXISTS vehicle_condition TEXT CHECK (vehicle_condition IN ('clean', 'moderate', 'dirty', 'needs_love'));
