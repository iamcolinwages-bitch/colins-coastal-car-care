'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DollarSign, Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminPricingPage() {
  const router = useRouter();
  const [packages, setPackages] = useState<any[]>([]);
  const [addOns, setAddOns] = useState<any[]>([]);
  const [conditionMultipliers, setConditionMultipliers] = useState<any>({
    clean: 1.0,
    moderate: 1.15,
    dirty: 1.35,
    needs_love: 1.6,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_auth');
    if (!isAuthed) {
      router.push('/admin');
      return;
    }

    fetchData();
  }, [router]);

  async function fetchData() {
    try {
      const [packagesRes, addOnsRes, multipliersRes] = await Promise.all([
        supabase.from('packages').select('*').order('created_at'),
        supabase.from('add_ons').select('*').order('created_at'),
        supabase
          .from('admin_settings')
          .select('value')
          .eq('key', 'condition_multipliers')
          .single(),
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

  const updatePackagePrice = (id: string, field: string, value: number) => {
    setPackages(packages.map((pkg) => (pkg.id === id ? { ...pkg, [field]: value } : pkg)));
  };

  const updateAddOnPrice = (id: string, value: number) => {
    setAddOns(addOns.map((addon) => (addon.id === id ? { ...addon, price: value } : addon)));
  };

  const updateMultiplier = (key: string, value: number) => {
    setConditionMultipliers({ ...conditionMultipliers, [key]: value });
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Update packages
      for (const pkg of packages) {
        await supabase
          .from('packages')
          .update({
            sedan_price: pkg.sedan_price,
            suv_truck_price: pkg.suv_truck_price,
          })
          .eq('id', pkg.id);
      }

      // Update add-ons
      for (const addon of addOns) {
        await supabase.from('add_ons').update({ price: addon.price }).eq('id', addon.id);
      }

      // Update multipliers
      await supabase
        .from('admin_settings')
        .update({ value: conditionMultipliers })
        .eq('key', 'condition_multipliers');

      alert('Pricing updated successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Pricing Management</h1>
              <p className="text-sm text-gray-400">Update package prices and condition multipliers</p>
            </div>
          </div>
          <button
            onClick={saveChanges}
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Condition Multipliers */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Vehicle Condition Multipliers
              </h2>
              <p className="text-gray-400 mb-6">
                Adjust pricing based on vehicle condition. Base price is multiplied by these values.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-black border border-gray-800 rounded-lg p-4">
                  <label className="block text-white font-semibold mb-2">Clean</label>
                  <input
                    type="number"
                    step="0.05"
                    value={conditionMultipliers.clean}
                    onChange={(e) => updateMultiplier('clean', parseFloat(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {conditionMultipliers.clean === 1
                      ? 'Base price'
                      : `${((conditionMultipliers.clean - 1) * 100).toFixed(0)}% adjustment`}
                  </p>
                </div>

                <div className="bg-black border border-gray-800 rounded-lg p-4">
                  <label className="block text-white font-semibold mb-2">Moderate</label>
                  <input
                    type="number"
                    step="0.05"
                    value={conditionMultipliers.moderate}
                    onChange={(e) => updateMultiplier('moderate', parseFloat(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    +{((conditionMultipliers.moderate - 1) * 100).toFixed(0)}% markup
                  </p>
                </div>

                <div className="bg-black border border-gray-800 rounded-lg p-4">
                  <label className="block text-white font-semibold mb-2">Dirty</label>
                  <input
                    type="number"
                    step="0.05"
                    value={conditionMultipliers.dirty}
                    onChange={(e) => updateMultiplier('dirty', parseFloat(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    +{((conditionMultipliers.dirty - 1) * 100).toFixed(0)}% markup
                  </p>
                </div>

                <div className="bg-black border border-gray-800 rounded-lg p-4">
                  <label className="block text-white font-semibold mb-2">Needs Love</label>
                  <input
                    type="number"
                    step="0.05"
                    value={conditionMultipliers.needs_love}
                    onChange={(e) => updateMultiplier('needs_love', parseFloat(e.target.value))}
                    className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    +{((conditionMultipliers.needs_love - 1) * 100).toFixed(0)}% markup
                  </p>
                </div>
              </div>
            </div>

            {/* Package Pricing */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Package Pricing</h2>
              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-black border border-gray-800 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                  >
                    <div>
                      <div className="text-white font-semibold">{pkg.name}</div>
                      <div className="text-sm text-gray-400">{pkg.description}</div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Sedan Price</label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">$</span>
                        <input
                          type="number"
                          value={pkg.sedan_price}
                          onChange={(e) =>
                            updatePackagePrice(pkg.id, 'sedan_price', parseFloat(e.target.value))
                          }
                          className="flex-1 bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">SUV/Truck Price</label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">$</span>
                        <input
                          type="number"
                          value={pkg.suv_truck_price}
                          onChange={(e) =>
                            updatePackagePrice(pkg.id, 'suv_truck_price', parseFloat(e.target.value))
                          }
                          className="flex-1 bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-on Pricing */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Add-on Pricing</h2>
              <div className="space-y-4">
                {addOns.map((addon) => (
                  <div
                    key={addon.id}
                    className="bg-black border border-gray-800 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="text-white font-semibold">{addon.name}</div>
                      <div className="text-sm text-gray-400">{addon.description}</div>
                    </div>
                    <div className="w-32">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">$</span>
                        <input
                          type="number"
                          value={addon.price}
                          onChange={(e) => updateAddOnPrice(addon.id, parseFloat(e.target.value))}
                          className="flex-1 bg-gray-900 border border-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Calculation */}
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Example Calculation</h3>
              <div className="text-gray-300">
                <div className="mb-2">Standard Interior (Sedan): ${packages[0]?.sedan_price || 100}</div>
                <div className="mb-2">
                  If vehicle is "Dirty" ({conditionMultipliers.dirty}x multiplier):
                </div>
                <div className="text-2xl font-bold text-primary">
                  ${Math.round((packages[0]?.sedan_price || 100) * conditionMultipliers.dirty)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
