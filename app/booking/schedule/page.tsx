'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, MapPin, DollarSign, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

function ScheduleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get('quote');

  const [quote, setQuote] = useState<any>(null);
  const [packageNames, setPackageNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    notes: '',
  });

  const [errors, setErrors] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    if (quoteId) {
      fetchQuote();
    } else {
      setError('No quote ID provided');
      setLoading(false);
    }
  }, [quoteId]);

  async function fetchQuote() {
    try {
      const { data, error } = await supabase
        .from('custom_quotes')
        .select('*')
        .eq('id', quoteId)
        .single();

      if (error) throw error;

      if (data.status !== 'approved') {
        setError('This quote has not been approved yet.');
        setLoading(false);
        return;
      }

      setQuote(data);

      // Fetch package names if there are selected packages
      if (data.selected_packages && data.selected_packages.length > 0) {
        const { data: packagesData, error: packagesError } = await supabase
          .from('packages')
          .select('id, name')
          .in('id', data.selected_packages);

        if (!packagesError && packagesData) {
          setPackageNames(packagesData.map((pkg: any) => pkg.name));
        }
      }
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to load quote details.');
    } finally {
      setLoading(false);
    }
  }

  const validateForm = () => {
    const newErrors = { date: '', time: '' };
    let isValid = true;

    if (!bookingData.date) {
      newErrors.date = 'Please select a date';
      isValid = false;
    } else {
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
        isValid = false;
      }

      // Check if Sunday
      if (selectedDate.getDay() === 0) {
        newErrors.date = 'We are closed on Sundays';
        isValid = false;
      }
    }

    if (!bookingData.time) {
      newErrors.time = 'Please select a time';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setError('');

    try {
      // Create booking with all required fields from schema
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_id: quote.customer_id,
          quote_id: quote.id,
          first_name: quote.first_name,
          last_name: quote.last_name,
          email: quote.email,
          phone: quote.phone,
          address: quote.address || '',
          city: quote.city || '',
          vehicle_type: quote.vehicle_type,
          vehicle_make: quote.vehicle_make,
          vehicle_model: quote.vehicle_model,
          vehicle_year: quote.vehicle_year,
          selected_addons: quote.selected_addons || [],
          scheduled_date: bookingData.date,
          scheduled_time: bookingData.time,
          total_price: quote.approved_price || quote.calculated_total,
          status: 'scheduled',
          notes: bookingData.notes,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Send confirmation emails
      try {
        const emailResponse = await fetch('/api/send-booking-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: `${quote.first_name} ${quote.last_name}`,
            customerEmail: quote.email,
            customerPhone: quote.phone,
            vehicleInfo: `${quote.vehicle_year} ${quote.vehicle_make} ${quote.vehicle_model}`,
            scheduledDate: bookingData.date,
            scheduledTime: bookingData.time,
            totalPrice: quote.approved_price || quote.calculated_total,
            address: quote.address || '',
            city: quote.city || '',
            selectedAddons: quote.selected_addons || [],
            notes: bookingData.notes,
            bookingId: booking.id,
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send confirmation emails');
        }
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
        // Don't fail the booking if email fails
      }

      setSuccess(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('Failed to create booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Available time slots (limited to 2 details per day)
  const timeSlots = [
    { value: '07:00', label: '7:00 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
  ];

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-20 pb-16 bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-gray-400">Loading your quote...</p>
          </div>
        </div>
      </>
    );
  }

  if (error && !quote) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-20 pb-16 mesh-bg flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 py-32">
            <div className="modern-card p-10 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl opacity-60"></div>
                <div className="relative w-20 h-20 glass-strong rounded-2xl flex items-center justify-center mx-auto">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unable to Load Quote</h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">{error}</p>
              <a
                href="/quote"
                className="inline-block bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white px-12 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
              >
                Request New Quote
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-20 pb-16 mesh-bg flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-12 py-32">
            <div className="modern-card p-10 text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl opacity-60"></div>
                <div className="relative w-24 h-24 glass-strong rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle className="w-14 h-14 text-green-500" />
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-2xl text-white mb-3">
                Thank you, {quote.first_name}!
              </p>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                We've received your booking request. You'll receive a confirmation email shortly.
              </p>
              <div className="glass-strong border border-white/10 rounded-2xl p-8 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Date & Time</div>
                    <div className="text-white font-bold text-lg">
                      {new Date(bookingData.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-gray-300 text-base mt-1">
                      {timeSlots.find(t => t.value === bookingData.time)?.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Total</div>
                    <div className="text-4xl font-bold text-primary">
                      ${quote.approved_price}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500">Redirecting to homepage...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />

      <div className="min-h-screen pt-20 pb-16">
        {/* Header - Modern Design */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
              Choose Your Date & Time
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
              Select when you'd like your detailing service
            </p>
          </div>
        </section>

        <div className="relative mesh-bg py-32 md:py-40">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Quote Summary */}
            <div className="modern-card p-8 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Your Quote Summary</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-xl blur-lg opacity-60"></div>
                    <div className="relative w-14 h-14 glass-strong rounded-xl flex items-center justify-center">
                      <DollarSign className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Total Price</div>
                    <div className="text-3xl font-bold text-primary">${quote.approved_price}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-xl blur-lg opacity-60"></div>
                    <div className="relative w-14 h-14 glass-strong rounded-xl flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Location</div>
                    <div className="text-white font-semibold text-lg">{quote.city}</div>
                    <div className="text-sm text-gray-500">{quote.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/30 rounded-xl blur-lg opacity-60"></div>
                    <div className="relative w-14 h-14 glass-strong rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-green-500" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-2">Vehicle</div>
                    <div className="text-white font-semibold text-lg">
                      {quote.vehicle_year} {quote.vehicle_make} {quote.vehicle_model}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {quote.vehicle_type?.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="text-base text-gray-400 mb-4 font-semibold">Selected Services</div>
                <div className="flex flex-wrap gap-3">
                  {packageNames.length > 0 ? (
                    packageNames.map((pkgName: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-4 py-2 glass-strong border border-primary/30 text-primary rounded-xl text-sm font-medium"
                      >
                        {pkgName}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">No packages selected</span>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="modern-card p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Schedule Your Appointment</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Date Selection */}
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Select Date <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={minDate}
                      max={maxDateStr}
                      value={bookingData.date}
                      onChange={(e) => {
                        setBookingData({ ...bookingData, date: e.target.value });
                        setErrors({ ...errors, date: '' });
                      }}
                      className={`w-full min-h-[50px] glass border ${
                        errors.date ? 'border-red-500' : 'border-gray-700'
                      } text-white pl-14 pr-5 py-4 rounded-xl focus:outline-none focus:border-primary text-base`}
                    />
                  </div>
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.date}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mt-3">
                    Book up to 30 days in advance. Closed Sundays.
                  </p>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Select Time <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    <select
                      required
                      value={bookingData.time}
                      onChange={(e) => {
                        setBookingData({ ...bookingData, time: e.target.value });
                        setErrors({ ...errors, time: '' });
                      }}
                      className={`w-full min-h-[50px] glass border ${
                        errors.time ? 'border-red-500' : 'border-gray-700'
                      } text-white pl-14 pr-5 py-4 rounded-xl focus:outline-none focus:border-primary text-base`}
                    >
                      <option value="">Choose a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.time}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mt-3">
                    Available slots: 7-9 AM, 11 AM-1 PM (Closed Sundays)
                  </p>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-3 text-lg">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  rows={5}
                  placeholder="Any special instructions or requests?"
                  className="w-full glass border border-gray-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary resize-none text-base leading-relaxed"
                />
              </div>

              {error && (
                <div className="mb-8 glass-strong border border-red-500/30 rounded-xl p-5 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-base">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 min-h-[56px] glass border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 min-h-[56px] bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Confirming Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Confirm Booking
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    }>
      <ScheduleContent />
    </Suspense>
  );
}
