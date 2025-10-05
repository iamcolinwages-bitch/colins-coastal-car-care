'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Calendar, Clock, MapPin, DollarSign, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SchedulePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const quoteId = searchParams.get('quote');

  const [quote, setQuote] = useState<any>(null);
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
    } else {
      const [hours] = bookingData.time.split(':').map(Number);
      if (hours < 7 || hours >= 19) {
        newErrors.time = 'Please select a time between 7:00 AM and 7:00 PM';
        isValid = false;
      }
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
      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_id: quote.customer_id,
          quote_id: quote.id,
          booking_date: bookingData.date,
          booking_time: bookingData.time,
          location: quote.city,
          services: quote.selected_packages,
          total_price: quote.approved_price,
          vehicle_condition: quote.vehicle_condition,
          status: 'pending',
          notes: bookingData.notes,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

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

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 19; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      const displayTime = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      slots.push({ value: time, label: displayTime });

      if (hour < 18) {
        const halfTime = `${hour.toString().padStart(2, '0')}:30`;
        const halfDisplayTime = `${hour > 12 ? hour - 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`;
        slots.push({ value: halfTime, label: halfDisplayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

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
        <div className="min-h-screen pt-20 pb-16 bg-black">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-gray-900 border border-red-800 rounded-xl p-8 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Quote</h2>
              <p className="text-gray-400 mb-6">{error}</p>
              <a
                href="/quote"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors"
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
        <div className="min-h-screen pt-20 pb-16 bg-black">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-gray-900 border border-green-800 rounded-xl p-8 text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-xl text-gray-300 mb-2">
                Thank you, {quote.first_name}!
              </p>
              <p className="text-gray-400 mb-8">
                We've received your booking request. You'll receive a confirmation email shortly.
              </p>
              <div className="bg-black border border-gray-800 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                    <div className="text-white font-semibold">
                      {new Date(bookingData.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-gray-300">
                      {timeSlots.find(t => t.value === bookingData.time)?.label}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total</div>
                    <div className="text-2xl font-bold text-primary">
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

      <div className="min-h-screen pt-20 pb-16 bg-black">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-4">
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Schedule Appointment</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Choose Your Date & Time
            </h1>
            <p className="text-xl text-white/90">
              Select when you'd like your detailing service
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Quote Summary */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Your Quote Summary</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Total Price</div>
                  <div className="text-2xl font-bold text-primary">${quote.approved_price}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Location</div>
                  <div className="text-white font-semibold">{quote.city}</div>
                  <div className="text-sm text-gray-500">{quote.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Vehicle</div>
                  <div className="text-white font-semibold">
                    {quote.vehicle_year} {quote.vehicle_make} {quote.vehicle_model}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {quote.vehicle_type?.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800">
              <div className="text-sm text-gray-400 mb-3">Selected Services</div>
              <div className="flex flex-wrap gap-2">
                {quote.selected_packages?.map((pkg: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm"
                  >
                    {pkg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Schedule Your Appointment</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Date Selection */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Select Date <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
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
                    className={`w-full bg-black border ${
                      errors.date ? 'border-red-500' : 'border-gray-800'
                    } text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-primary`}
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Book up to 30 days in advance. Closed Sundays.
                </p>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Select Time <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  <select
                    required
                    value={bookingData.time}
                    onChange={(e) => {
                      setBookingData({ ...bookingData, time: e.target.value });
                      setErrors({ ...errors, time: '' });
                    }}
                    className={`w-full bg-black border ${
                      errors.time ? 'border-red-500' : 'border-gray-800'
                    } text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-primary`}
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
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.time}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Mon-Sat: 7:00 AM - 7:00 PM
                </p>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mb-8">
              <label className="block text-white font-semibold mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                rows={4}
                placeholder="Any special instructions or requests?"
                className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {error && (
              <div className="mb-6 bg-red-900/20 border border-red-800 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Go Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-opacity flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Confirming Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Confirm Booking
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
