'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Calculator, Check, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Package {
  id: string;
  name: string;
  sedan_price: number;
  suv_truck_price: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

const conditionOptions = [
  { value: 'clean', label: 'Clean', multiplier: 1.0, description: 'Well maintained, minimal cleaning needed' },
  { value: 'moderate', label: 'Moderate', multiplier: 1.15, description: 'Some dirt and grime, standard cleaning' },
  { value: 'dirty', label: 'Dirty', multiplier: 1.35, description: 'Heavily soiled, deep cleaning required' },
  { value: 'needs_love', label: 'Needs Love', multiplier: 1.6, description: 'Extensively dirty, full restoration needed' },
];

export default function QuotePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [packages, setPackages] = useState<Package[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [conditionMultipliers, setConditionMultipliers] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [vehicleType, setVehicleType] = useState<'sedan' | 'suv_truck'>('sedan');
  const [vehicleCondition, setVehicleCondition] = useState<string>('clean');
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
  });

  // Fetch packages, add-ons, and multipliers
  useEffect(() => {
    async function fetchData() {
      try {
        const [packagesRes, addOnsRes, multipliersRes] = await Promise.all([
          supabase.from('packages').select('*').eq('active', true),
          supabase.from('add_ons').select('*').eq('active', true),
          supabase.from('admin_settings').select('value').eq('key', 'condition_multipliers').single(),
        ]);

        if (packagesRes.data) setPackages(packagesRes.data);
        if (addOnsRes.data) setAddOns(addOnsRes.data);
        if (multipliersRes.data) setConditionMultipliers(multipliersRes.data.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate total with condition multiplier
  const calculateTotal = () => {
    let baseTotal = 0;

    // Add package prices
    selectedPackages.forEach((pkgId) => {
      const pkg = packages.find((p) => p.id === pkgId);
      if (pkg) {
        baseTotal += vehicleType === 'sedan' ? pkg.sedan_price : pkg.suv_truck_price;
      }
    });

    // Add add-on prices
    selectedAddOns.forEach((addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId);
      if (addOn) {
        baseTotal += addOn.price;
      }
    });

    // Apply condition multiplier
    const multiplier = conditionMultipliers?.[vehicleCondition] || 1.0;
    return Math.round(baseTotal * multiplier);
  };

  const handleBooking = async () => {
    setSubmitting(true);
    try {
      const total = calculateTotal();

      // Insert customer
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          city: customerInfo.city,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      // Create quote record (for tracking, not for approval)
      const { data: quote, error: quoteError } = await supabase.from('custom_quotes').insert({
        customer_id: customer.id,
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        vehicle_type: vehicleType,
        vehicle_condition: vehicleCondition,
        vehicle_make: customerInfo.vehicleMake,
        vehicle_model: customerInfo.vehicleModel,
        vehicle_year: customerInfo.vehicleYear ? parseInt(customerInfo.vehicleYear) : null,
        selected_packages: selectedPackages,
        selected_addons: selectedAddOns,
        calculated_total: total,
        status: 'approved', // Auto-approve
        approved_price: total,
      }).select().single();

      if (quoteError) throw quoteError;

      // Redirect to booking with quote ID
      router.push(`/booking/schedule?quote=${quote.id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to process request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen pt-20 pb-16 bg-black">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-4">
              <Calculator className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Instant Quote</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get Your Instant Quote
            </h1>
            <p className="text-xl text-white/90">
              Build your perfect package and book immediately
            </p>
          </div>
        </section>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num ? 'bg-primary text-white' : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {num}
                </div>
                {num < 4 && (
                  <div className={`w-12 h-1 mx-2 ${step > num ? 'bg-primary' : 'bg-gray-800'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-4 text-sm text-gray-400">
            <span className={step === 1 ? 'text-primary' : ''}>Services</span>
            <span className={step === 2 ? 'text-primary' : ''}>Vehicle</span>
            <span className={step === 3 ? 'text-primary' : ''}>Condition</span>
            <span className={step === 4 ? 'text-primary' : ''}>Details</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Step 1: Select Services */}
            {step === 1 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Select Your Services</h2>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Packages</h3>
                  <div className="space-y-3">
                    {packages.map((pkg) => (
                      <label
                        key={pkg.id}
                        className="flex items-center gap-4 bg-black border border-gray-800 hover:border-primary rounded-lg p-4 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPackages.includes(pkg.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPackages([...selectedPackages, pkg.id]);
                            } else {
                              setSelectedPackages(selectedPackages.filter((id) => id !== pkg.id));
                            }
                          }}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="flex-1">
                          <div className="text-white font-semibold">{pkg.name}</div>
                          <div className="text-sm text-gray-400">
                            Sedan: ${pkg.sedan_price} | SUV/Truck: ${pkg.suv_truck_price}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Add-ons</h3>
                  <div className="space-y-3">
                    {addOns.map((addOn) => (
                      <label
                        key={addOn.id}
                        className="flex items-center gap-4 bg-black border border-gray-800 hover:border-primary rounded-lg p-4 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAddOns([...selectedAddOns, addOn.id]);
                            } else {
                              setSelectedAddOns(selectedAddOns.filter((id) => id !== addOn.id));
                            }
                          }}
                          className="w-5 h-5 text-primary"
                        />
                        <div className="flex-1">
                          <div className="text-white font-semibold">{addOn.name}</div>
                        </div>
                        <div className="text-primary font-semibold">${addOn.price}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-800">
                  <button
                    onClick={() => setStep(2)}
                    disabled={selectedPackages.length === 0}
                    className="bg-primary hover:bg-primary-dark disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Next: Vehicle Type
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Type */}
            {step === 2 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Vehicle Type</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setVehicleType('sedan')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      vehicleType === 'sedan'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-white font-semibold mb-1">Sedan</div>
                    <div className="text-sm text-gray-400">Cars, Coupes, Sedans</div>
                  </button>
                  <button
                    onClick={() => setVehicleType('suv_truck')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      vehicleType === 'suv_truck'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="text-white font-semibold mb-1">SUV/Truck</div>
                    <div className="text-sm text-gray-400">SUVs, Trucks, Vans</div>
                  </button>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-800">
                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Next: Vehicle Condition
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Vehicle Condition */}
            {step === 3 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Vehicle Condition</h2>
                <p className="text-gray-400 mb-6">Select the current condition of your vehicle</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {conditionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setVehicleCondition(option.value)}
                      className={`p-6 rounded-lg border-2 text-left transition-all ${
                        vehicleCondition === option.value
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-semibold text-lg">{option.label}</div>
                        {option.multiplier > 1 && (
                          <span className="text-primary text-sm">+{((option.multiplier - 1) * 100).toFixed(0)}%</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{option.description}</div>
                    </button>
                  ))}
                </div>

                <div className="bg-black border border-primary/30 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400">Estimated Total</div>
                    <div className="text-3xl font-bold text-primary">${calculateTotal()}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-800">
                  <button
                    onClick={() => setStep(2)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Next: Your Info
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Customer Info */}
            {step === 4 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Your Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Service Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      City <span className="text-primary">*</span>
                    </label>
                    <select
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="">Select City</option>
                      <option value="Naples">Naples</option>
                      <option value="Marco Island">Marco Island</option>
                      <option value="Bonita Springs">Bonita Springs</option>
                      <option value="Estero">Estero</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Make</label>
                    <input
                      type="text"
                      value={customerInfo.vehicleMake}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, vehicleMake: e.target.value })}
                      placeholder="e.g. Toyota"
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Model</label>
                    <input
                      type="text"
                      value={customerInfo.vehicleModel}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, vehicleModel: e.target.value })}
                      placeholder="e.g. Camry"
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Year</label>
                    <input
                      type="text"
                      value={customerInfo.vehicleYear}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, vehicleYear: e.target.value })}
                      placeholder="e.g. 2020"
                      className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="bg-black border border-primary/30 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-gray-400">Your Total</div>
                    <div className="text-4xl font-bold text-primary">${calculateTotal()}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Including {conditionOptions.find(o => o.value === vehicleCondition)?.label} condition adjustment
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-800">
                  <button
                    onClick={() => setStep(3)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={
                      submitting ||
                      !customerInfo.firstName ||
                      !customerInfo.lastName ||
                      !customerInfo.email ||
                      !customerInfo.phone ||
                      !customerInfo.address ||
                      !customerInfo.city
                    }
                    className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-opacity flex items-center gap-2"
                  >
                    {submitting ? 'Processing...' : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Continue to Schedule
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
