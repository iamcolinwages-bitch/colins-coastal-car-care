-- Add vehicle type pricing to packages
ALTER TABLE packages DROP COLUMN IF EXISTS sedan_price;
ALTER TABLE packages DROP COLUMN IF EXISTS suv_truck_price;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS vehicle_type_prices JSONB DEFAULT '{
  "sedan": 100,
  "coupe": 100,
  "hatchback": 100,
  "wagon": 110,
  "convertible": 120,
  "suv_small": 130,
  "suv_mid": 140,
  "suv_large": 150,
  "crossover": 130,
  "minivan": 140,
  "pickup_compact": 130,
  "pickup_full": 150,
  "sports_car": 120,
  "luxury_sedan": 130,
  "luxury_suv": 160,
  "exotic": 200,
  "van_cargo": 150,
  "van_passenger": 150
}';

-- Update existing packages with vehicle type prices
UPDATE packages SET vehicle_type_prices = jsonb_build_object(
  'sedan', 100,
  'coupe', 100,
  'hatchback', 100,
  'wagon', 110,
  'convertible', 120,
  'suv_small', 130,
  'suv_mid', 140,
  'suv_large', 150,
  'crossover', 130,
  'minivan', 140,
  'pickup_compact', 130,
  'pickup_full', 150,
  'sports_car', 120,
  'luxury_sedan', 130,
  'luxury_suv', 160,
  'exotic', 200,
  'van_cargo', 150,
  'van_passenger', 150
) WHERE name = 'Standard Interior';

UPDATE packages SET vehicle_type_prices = jsonb_build_object(
  'sedan', 100,
  'coupe', 100,
  'hatchback', 100,
  'wagon', 110,
  'convertible', 120,
  'suv_small', 130,
  'suv_mid', 140,
  'suv_large', 150,
  'crossover', 130,
  'minivan', 140,
  'pickup_compact', 130,
  'pickup_full', 150,
  'sports_car', 120,
  'luxury_sedan', 130,
  'luxury_suv', 160,
  'exotic', 200,
  'van_cargo', 150,
  'van_passenger', 150
) WHERE name = 'Standard Exterior';

UPDATE packages SET vehicle_type_prices = jsonb_build_object(
  'sedan', 180,
  'coupe', 180,
  'hatchback', 180,
  'wagon', 200,
  'convertible', 220,
  'suv_small', 230,
  'suv_mid', 250,
  'suv_large', 270,
  'crossover', 230,
  'minivan', 250,
  'pickup_compact', 230,
  'pickup_full', 270,
  'sports_car', 220,
  'luxury_sedan', 240,
  'luxury_suv', 290,
  'exotic', 380,
  'van_cargo', 270,
  'van_passenger', 270
) WHERE name = 'Standard Combined';

UPDATE packages SET vehicle_type_prices = jsonb_build_object(
  'sedan', 200,
  'coupe', 200,
  'hatchback', 200,
  'wagon', 220,
  'convertible', 240,
  'suv_small', 260,
  'suv_mid', 280,
  'suv_large', 300,
  'crossover', 260,
  'minivan', 280,
  'pickup_compact', 260,
  'pickup_full', 300,
  'sports_car', 240,
  'luxury_sedan', 270,
  'luxury_suv', 320,
  'exotic', 400,
  'van_cargo', 300,
  'van_passenger', 300
) WHERE name = 'Premium Interior';

UPDATE packages SET vehicle_type_prices = jsonb_build_object(
  'sedan', 200,
  'coupe', 200,
  'hatchback', 200,
  'wagon', 220,
  'convertible', 240,
  'suv_small', 260,
  'suv_mid', 280,
  'suv_large', 300,
  'crossover', 260,
  'minivan', 280,
  'pickup_compact', 260,
  'pickup_full', 300,
  'sports_car', 240,
  'luxury_sedan', 270,
  'luxury_suv', 320,
  'exotic', 400,
  'van_cargo', 300,
  'van_passenger', 300
) WHERE name = 'Premium Exterior';

UPDATE packages SET vehicle_type_prices = jsonb_build_object(
  'sedan', 360,
  'coupe', 360,
  'hatchback', 360,
  'wagon', 400,
  'convertible', 440,
  'suv_small', 460,
  'suv_mid', 500,
  'suv_large', 540,
  'crossover', 460,
  'minivan', 500,
  'pickup_compact', 460,
  'pickup_full', 540,
  'sports_car', 440,
  'luxury_sedan', 490,
  'luxury_suv', 580,
  'exotic', 760,
  'van_cargo', 540,
  'van_passenger', 540
) WHERE name = 'Premium Combined';
