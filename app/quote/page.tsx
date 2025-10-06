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
        {/* Header - Modern Design */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
              Get Your Instant Quote
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
              Build your perfect package and book immediately
            </p>
          </div>
        </section>

        {/* Progress Steps */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold text-lg md:text-xl transition-all duration-300 ${
                    step >= num
                      ? 'bg-gradient-to-br from-primary to-red-700 text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {num}
                </div>
                {num < 4 && (
                  <div className={`w-8 md:w-16 h-1 mx-1 md:mx-2 rounded-full transition-all duration-300 ${step > num ? 'bg-primary' : 'bg-gray-800'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 md:gap-12 mt-6 text-sm md:text-base text-gray-400 font-medium">
            <span className={`transition-colors ${step === 1 ? 'text-primary font-bold' : ''}`}>Services</span>
            <span className={`transition-colors ${step === 2 ? 'text-primary font-bold' : ''}`}>Vehicle</span>
            <span className={`transition-colors ${step === 3 ? 'text-primary font-bold' : ''}`}>Condition</span>
            <span className={`transition-colors ${step === 4 ? 'text-primary font-bold' : ''}`}>Details</span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
            {/* Step 1: Select Services */}
            {step === 1 && (
              <div className="modern-card p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Select Your Services</h2>

                <div className="mb-10">
                  <h3 className="text-xl font-bold text-white mb-6">Packages</h3>
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <label
                        key={pkg.id}
                        className="flex items-center gap-4 md:gap-6 glass hover:bg-white/10 hover:border-primary/50 rounded-xl p-5 md:p-6 cursor-pointer transition-all min-h-[60px]"
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
                          className="w-6 h-6 text-primary rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-bold text-base md:text-lg mb-1">{pkg.name}</div>
                          <div className="text-sm md:text-base text-gray-400">
                            Sedan: ${pkg.sedan_price} | SUV/Truck: ${pkg.suv_truck_price}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl font-bold text-white mb-6">Add-ons</h3>
                  <div className="space-y-4">
                    {addOns.map((addOn) => (
                      <label
                        key={addOn.id}
                        className="flex items-center gap-4 md:gap-6 glass hover:bg-white/10 hover:border-primary/50 rounded-xl p-5 md:p-6 cursor-pointer transition-all min-h-[60px]"
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
                          className="w-6 h-6 text-primary rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-bold text-base md:text-lg">{addOn.name}</div>
                        </div>
                        <div className="text-primary font-bold text-lg md:text-xl flex-shrink-0">${addOn.price}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    disabled={selectedPackages.length === 0}
                    className="bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl font-bold transition-all hover:scale-105 text-lg shadow-lg hover:shadow-xl"
                  >
                    Next: Vehicle Type
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Vehicle Type */}
            {step === 2 && (
              <div className="modern-card p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Vehicle Type</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  <button
                    onClick={() => setVehicleType('sedan')}
                    className={`p-8 md:p-10 rounded-2xl border-2 transition-all min-h-[120px] ${
                      vehicleType === 'sedan'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-gray-700 hover:border-gray-600 glass'
                    }`}
                  >
                    <div className="text-white font-bold text-xl md:text-2xl mb-2">Sedan</div>
                    <div className="text-base text-gray-400">Cars, Coupes, Sedans</div>
                  </button>
                  <button
                    onClick={() => setVehicleType('suv_truck')}
                    className={`p-8 md:p-10 rounded-2xl border-2 transition-all min-h-[120px] ${
                      vehicleType === 'suv_truck'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-gray-700 hover:border-gray-600 glass'
                    }`}
                  >
                    <div className="text-white font-bold text-xl md:text-2xl mb-2">SUV/Truck</div>
                    <div className="text-base text-gray-400">SUVs, Trucks, Vans</div>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
                  <button
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-white transition-colors font-semibold text-lg order-2 sm:order-1"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white px-10 py-4 rounded-xl font-bold transition-all hover:scale-105 text-lg shadow-lg hover:shadow-xl order-1 sm:order-2"
                  >
                    Next: Vehicle Condition
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Vehicle Condition */}
            {step === 3 && (
              <div className="modern-card p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Vehicle Condition</h2>
                <p className="text-gray-400 mb-8 text-lg">Select the current condition of your vehicle</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {conditionOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setVehicleCondition(option.value)}
                      className={`p-6 md:p-8 rounded-2xl border-2 text-left transition-all min-h-[120px] ${
                        vehicleCondition === option.value
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                          : 'border-gray-700 hover:border-gray-600 glass'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-white font-bold text-xl md:text-2xl">{option.label}</div>
                        {option.multiplier > 1 && (
                          <span className="text-primary text-base font-bold">+{((option.multiplier - 1) * 100).toFixed(0)}%</span>
                        )}
                      </div>
                      <div className="text-sm md:text-base text-gray-400 leading-relaxed">{option.description}</div>
                    </button>
                  ))}
                </div>

                <div className="glass-strong border border-primary/30 rounded-2xl p-8 mb-10 shadow-xl shadow-primary/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-gray-300 text-lg font-medium">Estimated Total</div>
                    <div className="text-4xl md:text-5xl font-bold gradient-text-primary">${calculateTotal()}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="text-gray-400 hover:text-white transition-colors font-semibold text-lg order-2 sm:order-1"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white px-10 py-4 rounded-xl font-bold transition-all hover:scale-105 text-lg shadow-lg hover:shadow-xl order-1 sm:order-2"
                  >
                    Next: Your Info
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Customer Info */}
            {step === 4 && (
              <div className="modern-card p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Your Information</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">
                      Service Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                      placeholder="123 Main St"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">
                      City <span className="text-primary">*</span>
                    </label>
                    <select
                      required
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                    >
                      <option value="">Select City</option>
                      <option value="Naples">Naples</option>
                      <option value="Marco Island">Marco Island</option>
                      <option value="Bonita Springs">Bonita Springs</option>
                      <option value="Estero">Estero</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">Vehicle Make</label>
                    <input
                      type="text"
                      value={customerInfo.vehicleMake}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, vehicleMake: e.target.value })}
                      placeholder="e.g. Toyota"
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">Vehicle Model</label>
                    <input
                      type="text"
                      value={customerInfo.vehicleModel}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, vehicleModel: e.target.value })}
                      placeholder="e.g. Camry"
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-3 text-base">Vehicle Year</label>
                    <input
                      type="text"
                      value={customerInfo.vehicleYear}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, vehicleYear: e.target.value })}
                      placeholder="e.g. 2020"
                      className="w-full glass border border-white/10 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]"
                    />
                  </div>
                </div>

                <div className="glass-strong border border-primary/30 rounded-2xl p-8 mb-10 shadow-xl shadow-primary/10">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
                    <div className="text-gray-300 text-lg font-medium">Your Total</div>
                    <div className="text-4xl md:text-5xl font-bold gradient-text-primary">${calculateTotal()}</div>
                  </div>
                  <div className="text-sm md:text-base text-gray-500 text-center sm:text-right">
                    Including {conditionOptions.find(o => o.value === vehicleCondition)?.label} condition adjustment
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
                  <button
                    onClick={() => setStep(3)}
                    className="text-gray-400 hover:text-white transition-colors font-semibold text-lg order-2 sm:order-1"
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
                    className="w-full sm:w-auto bg-gradient-to-r from-primary via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white px-10 py-5 rounded-xl font-bold transition-all hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-lg order-1 sm:order-2"
                  >
                    {submitting ? 'Processing...' : (
                      <>
                        <Sparkles className="w-6 h-6" />
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
