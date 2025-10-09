-- Remove the vehicle_condition constraint that's blocking quotes
ALTER TABLE custom_quotes DROP CONSTRAINT IF EXISTS custom_quotes_vehicle_condition_check;

-- Make vehicle_condition accept any value
ALTER TABLE custom_quotes ALTER COLUMN vehicle_condition DROP NOT NULL;
