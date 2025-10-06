'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, Car, MapPin, Phone, Mail, DollarSign, CheckCircle, XCircle, ArrowLeft, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_auth');
    if (!isAuthed) {
      router.push('/admin');
      return;
    }
    fetchBookings();
  }, [router, filter]);

  async function fetchBookings() {
    setLoading(true);
    let query = supabase
      .from('bookings')
      .select(`
        *,
        customers (
          first_name,
          last_name,
          email,
          phone,
          vehicle_make,
          vehicle_model,
          vehicle_type
        )
      `)
      .order('booking_date', { ascending: true });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    if (data) setBookings(data);
    setLoading(false);
  }

  async function updateStatus(id: string, status: BookingStatus) {
    await supabase.from('bookings').update({ status }).eq('id', id);
    fetchBookings();
  }

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'completed':
        return 'text-white bg-white/10 border-white/30';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">Booking Management</h1>
              <p className="text-sm text-gray-400">View and manage customer bookings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-4 mb-6 flex-wrap">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No {filter !== 'all' ? filter : ''} bookings
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${booking.total_price}
                    </div>
                  </div>
                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(booking.id, 'completed')}
                      className="bg-white hover:bg-gray-100 text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark Complete
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer
                    </h3>
                    <div className="space-y-2">
                      <div className="text-white font-semibold">
                        {booking.customers?.first_name} {booking.customers?.last_name}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {booking.customers?.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {booking.customers?.phone}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Appointment
                    </h3>
                    <div className="space-y-2">
                      <div className="text-white font-semibold">
                        {formatDate(booking.booking_date)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-gray-500" />
                        {formatTime(booking.booking_time)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {booking.location}
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      Vehicle
                    </h3>
                    <div className="space-y-2">
                      <div className="text-white font-semibold">
                        {booking.customers?.vehicle_make} {booking.customers?.vehicle_model}
                      </div>
                      <div className="text-gray-300 capitalize">
                        {booking.customers?.vehicle_type?.replace(/_/g, ' ')}
                      </div>
                      <div className="text-gray-300 capitalize">
                        Condition: {booking.vehicle_condition?.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {booking.services?.map((service: string, idx: number) => (
                      <div
                        key={idx}
                        className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {booking.notes && (
                  <div className="mt-4 p-4 bg-black border border-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Notes:</div>
                    <div className="text-gray-300">{booking.notes}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
