'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, Car, Calendar, DollarSign, ArrowLeft, Search, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminCustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_auth');
    if (!isAuthed) {
      router.push('/admin');
      return;
    }
    fetchCustomers();
  }, [router]);

  async function fetchCustomers() {
    setLoading(true);
    const { data: customersData } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (customersData) {
      // Get booking and quote counts for each customer
      const customersWithStats = await Promise.all(
        customersData.map(async (customer) => {
          const [bookingsRes, quotesRes] = await Promise.all([
            supabase
              .from('bookings')
              .select('total_price')
              .eq('customer_id', customer.id),
            supabase
              .from('custom_quotes')
              .select('total_price')
              .eq('customer_id', customer.id)
          ]);

          const totalBookings = bookingsRes.data?.length || 0;
          const totalQuotes = quotesRes.data?.length || 0;
          const totalSpent = [...(bookingsRes.data || []), ...(quotesRes.data || [])]
            .reduce((sum, item) => sum + (item.total_price || 0), 0);

          return {
            ...customer,
            totalBookings,
            totalQuotes,
            totalSpent
          };
        })
      );

      setCustomers(customersWithStats);
    }
    setLoading(false);
  }

  async function viewCustomerDetails(customerId: string) {
    const { data: bookings } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_id', customerId)
      .order('booking_date', { ascending: false });

    const { data: quotes } = await supabase
      .from('custom_quotes')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    const customer = customers.find(c => c.id === customerId);
    setSelectedCustomer({
      ...customer,
      bookings: bookings || [],
      quotes: quotes || []
    });
  }

  const filteredCustomers = customers.filter(customer => {
    const search = searchTerm.toLowerCase();
    return (
      customer.first_name?.toLowerCase().includes(search) ||
      customer.last_name?.toLowerCase().includes(search) ||
      customer.email?.toLowerCase().includes(search) ||
      customer.phone?.includes(search)
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
              <h1 className="text-xl font-bold text-white">Customer Database</h1>
              <p className="text-sm text-gray-400">View customer history and details</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 text-white pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : filteredCustomers.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            {searchTerm ? 'No customers found matching your search' : 'No customers yet'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {customer.first_name} {customer.last_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Member since {formatDate(customer.created_at)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  {customer.vehicle_make && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Car className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {customer.vehicle_make} {customer.vehicle_model}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-black border border-gray-800 rounded-lg p-2 text-center">
                    <div className="text-xl font-bold text-white">{customer.totalBookings}</div>
                    <div className="text-xs text-gray-500">Bookings</div>
                  </div>
                  <div className="bg-black border border-gray-800 rounded-lg p-2 text-center">
                    <div className="text-xl font-bold text-white">{customer.totalQuotes}</div>
                    <div className="text-xs text-gray-500">Quotes</div>
                  </div>
                  <div className="bg-black border border-gray-800 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-primary">${customer.totalSpent}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>

                <button
                  onClick={() => viewCustomerDetails(customer.id)}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedCustomer.first_name} {selectedCustomer.last_name}
                </h2>
                <p className="text-gray-400">{selectedCustomer.email}</p>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                <div className="bg-black border border-gray-800 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {selectedCustomer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {selectedCustomer.email}
                  </div>
                  {selectedCustomer.vehicle_make && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Car className="w-4 h-4 text-gray-500" />
                      {selectedCustomer.vehicle_make} {selectedCustomer.vehicle_model}
                      {selectedCustomer.vehicle_type && ` (${selectedCustomer.vehicle_type.replace(/_/g, ' ')})`}
                    </div>
                  )}
                </div>
              </div>

              {/* Bookings History */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Booking History ({selectedCustomer.bookings.length})
                </h3>
                {selectedCustomer.bookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">No bookings yet</div>
                ) : (
                  <div className="space-y-3">
                    {selectedCustomer.bookings.map((booking: any) => (
                      <div key={booking.id} className="bg-black border border-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-semibold">
                            {formatDate(booking.booking_date)} at {booking.booking_time}
                          </div>
                          <div className="text-primary font-bold">${booking.total_price}</div>
                        </div>
                        <div className="text-sm text-gray-400">
                          Status: <span className="capitalize">{booking.status}</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          Location: {booking.location}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quotes History */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Quote History ({selectedCustomer.quotes.length})
                </h3>
                {selectedCustomer.quotes.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">No quotes yet</div>
                ) : (
                  <div className="space-y-3">
                    {selectedCustomer.quotes.map((quote: any) => (
                      <div key={quote.id} className="bg-black border border-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-white font-semibold">
                            {formatDate(quote.created_at)}
                          </div>
                          <div className="text-primary font-bold">${quote.total_price}</div>
                        </div>
                        <div className="text-sm text-gray-400">
                          Status: <span className="capitalize">{quote.status}</span>
                        </div>
                        {quote.notes && (
                          <div className="text-sm text-gray-400 mt-2">
                            Notes: {quote.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
