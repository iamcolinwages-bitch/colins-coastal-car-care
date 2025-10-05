'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Settings, ArrowLeft, Save, AlertCircle, CheckCircle, Loader2, Phone, Mail, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [settings, setSettings] = useState({
    businessName: "Colin's Coastal Car Care",
    phone: '(469) 618-3423',
    email: 'iamColinwages@gmail.com',
    hoursOpen: '7:00 AM',
    hoursClose: '7:30 PM',
    closedDays: 'Sunday',
    serviceAreas: 'Naples, Marco Island, Bonita Springs, Estero',
    bookingAdvanceDays: 30,
    minBookingNoticeDays: 1,
  });

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_auth');
    if (!isAuthed) {
      router.push('/admin');
      return;
    }
    setLoading(false);
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      // In a real implementation, save to database
      // For now, simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Business Settings</h1>
              <p className="text-sm text-gray-400">Manage your business configuration</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {success && (
          <div className="mb-6 bg-green-900/20 border border-green-800 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-green-400">Settings saved successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Business Information */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Business Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Operating Hours
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Opening Time
                  </label>
                  <input
                    type="text"
                    value={settings.hoursOpen}
                    onChange={(e) => setSettings({ ...settings, hoursOpen: e.target.value })}
                    placeholder="e.g. 7:00 AM"
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Closing Time
                  </label>
                  <input
                    type="text"
                    value={settings.hoursClose}
                    onChange={(e) => setSettings({ ...settings, hoursClose: e.target.value })}
                    placeholder="e.g. 7:30 PM"
                    className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Closed Days
                </label>
                <input
                  type="text"
                  value={settings.closedDays}
                  onChange={(e) => setSettings({ ...settings, closedDays: e.target.value })}
                  placeholder="e.g. Sunday"
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter days separated by commas (e.g., Sunday, Saturday)
                </p>
              </div>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Service Areas</h2>

            <div>
              <label className="block text-white font-semibold mb-2">
                Service Coverage
              </label>
              <textarea
                value={settings.serviceAreas}
                onChange={(e) => setSettings({ ...settings, serviceAreas: e.target.value })}
                rows={3}
                placeholder="Enter cities/areas separated by commas"
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                These areas will be displayed on the website
              </p>
            </div>
          </div>

          {/* Booking Settings */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Booking Configuration</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Advance Booking (Days)
                </label>
                <input
                  type="number"
                  value={settings.bookingAdvanceDays}
                  onChange={(e) => setSettings({ ...settings, bookingAdvanceDays: parseInt(e.target.value) })}
                  min="1"
                  max="90"
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                />
                <p className="text-sm text-gray-500 mt-2">
                  How far in advance customers can book
                </p>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Minimum Notice (Days)
                </label>
                <input
                  type="number"
                  value={settings.minBookingNoticeDays}
                  onChange={(e) => setSettings({ ...settings, minBookingNoticeDays: parseInt(e.target.value) })}
                  min="0"
                  max="7"
                  className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Minimum days notice required for booking
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <Link
              href="/admin/dashboard"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-semibold transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-semibold transition-opacity flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
