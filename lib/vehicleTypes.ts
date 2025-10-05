export const vehicleTypes = [
  { value: 'sedan', label: 'Sedan', category: 'Standard Cars', description: '4-door sedan' },
  { value: 'coupe', label: 'Coupe', category: 'Standard Cars', description: '2-door coupe' },
  { value: 'hatchback', label: 'Hatchback', category: 'Standard Cars', description: 'Compact hatchback' },
  { value: 'wagon', label: 'Wagon/Estate', category: 'Standard Cars', description: 'Station wagon' },
  { value: 'convertible', label: 'Convertible', category: 'Specialty', description: 'Drop-top convertible' },
  { value: 'sports_car', label: 'Sports Car', category: 'Specialty', description: 'Performance sports car' },
  { value: 'suv_small', label: 'Small SUV', category: 'SUVs & Crossovers', description: 'Compact SUV (RAV4, CR-V)' },
  { value: 'suv_mid', label: 'Mid-Size SUV', category: 'SUVs & Crossovers', description: 'Mid-size SUV (Highlander, Pilot)' },
  { value: 'suv_large', label: 'Large SUV', category: 'SUVs & Crossovers', description: 'Full-size SUV (Tahoe, Expedition)' },
  { value: 'crossover', label: 'Crossover', category: 'SUVs & Crossovers', description: 'Crossover utility vehicle' },
  { value: 'minivan', label: 'Minivan', category: 'Vans & Family', description: 'Family minivan' },
  { value: 'van_passenger', label: 'Passenger Van', category: 'Vans & Family', description: 'Large passenger van' },
  { value: 'van_cargo', label: 'Cargo Van', category: 'Commercial', description: 'Work/cargo van' },
  { value: 'pickup_compact', label: 'Compact Pickup', category: 'Trucks', description: 'Small pickup truck (Tacoma, Colorado)' },
  { value: 'pickup_full', label: 'Full-Size Pickup', category: 'Trucks', description: 'Full-size pickup (F-150, Silverado)' },
  { value: 'luxury_sedan', label: 'Luxury Sedan', category: 'Luxury', description: 'Premium sedan (BMW, Mercedes)' },
  { value: 'luxury_suv', label: 'Luxury SUV', category: 'Luxury', description: 'Luxury SUV (Range Rover, Escalade)' },
  { value: 'exotic', label: 'Exotic/Supercar', category: 'Luxury', description: 'High-end exotic vehicles' },
];

export const vehicleCategories = [
  'Standard Cars',
  'Specialty',
  'SUVs & Crossovers',
  'Vans & Family',
  'Trucks',
  'Commercial',
  'Luxury',
];

export function getVehicleTypesByCategory(category: string) {
  return vehicleTypes.filter(v => v.category === category);
}
