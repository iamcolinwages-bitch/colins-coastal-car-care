'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  ArrowLeft,
  CheckCircle,
  XCircle,
  DollarSign,
  User,
  Car,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Filter,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type QuoteStatus = 'pending' | 'approved' | 'rejected';

interface Quote {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  vehicle_type: string;
  vehicle_condition: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  selected_packages: string[];
  selected_addons: string[];
  calculated_total: number;
  approved_price: number;
  status: QuoteStatus;
  created_at: string;
  city: string;
}

export default function AdminQuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filter, setFilter] = useState<QuoteStatus | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('admin_auth');
    if (!isAuthed) {
      router.push('/admin');
      return;
    }
    fetchQuotes();
  }, [router, filter]);

  async function fetchQuotes() {
    setLoading(true);
    let query = supabase
      .from('custom_quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    if (data) setQuotes(data);
    setLoading(false);
  }

  async function updateQuoteStatus(id: string, status: QuoteStatus, approvedPrice?: number) {
    const updateData: any = { status };
    if (approvedPrice !== undefined) {
      updateData.approved_price = approvedPrice;
    }

    await supabase.from('custom_quotes').update(updateData).eq('id', id);
    fetchQuotes();
  }

  const getStatusColor = (status: QuoteStatus) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/30';
      default:
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
              <h1 className="text-xl font-bold text-white">Quote Management</h1>
              <p className="text-sm text-gray-400">Review and approve customer quotes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-400">Loading quotes...</p>
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No {filter !== 'all' ? filter : ''} quotes found
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                        quote.status
                      )}`}
                    >
                      {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(quote.created_at)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Quote Total</div>
                    <div className="text-3xl font-bold text-primary">
                      ${quote.status === 'approved' ? quote.approved_price : quote.calculated_total}
                    </div>
                  </div>
                </div>

                {/* Customer & Vehicle Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer
                    </h3>
                    <div className="space-y-2">
                      <div className="text-white font-semibold">
                        {quote.first_name} {quote.last_name}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Mail className="w-4 h-4 text-gray-500" />
                        {quote.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Phone className="w-4 h-4 text-gray-500" />
                        {quote.phone}
                      </div>
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        {quote.city}
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
                        {quote.vehicle_year} {quote.vehicle_make} {quote.vehicle_model}
                      </div>
                      <div className="text-gray-300 text-sm capitalize">
                        Type: {quote.vehicle_type?.replace('_', ' ')}
                      </div>
                      <div className="text-gray-300 text-sm capitalize">
                        Condition: {quote.vehicle_condition?.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Pricing
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Calculated:</span>
                        <span className="text-white font-semibold">
                          ${quote.calculated_total}
                        </span>
                      </div>
                      {quote.status === 'approved' && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Approved:</span>
                          <span className="text-green-400 font-semibold">
                            ${quote.approved_price}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6 pb-6 border-b border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">Selected Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {quote.selected_packages?.map((pkg: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary rounded-lg text-sm"
                      >
                        {pkg}
                      </span>
                    ))}
                    {quote.selected_addons?.map((addon: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary/10 border border-secondary/30 text-secondary rounded-lg text-sm"
                      >
                        {addon}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {quote.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex gap-3">
                      <button
                        onClick={() =>
                          updateQuoteStatus(quote.id, 'approved', quote.calculated_total)
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Approve Quote
                      </button>
                      <button
                        onClick={() => {
                          const customPrice = prompt(
                            'Enter custom approved price:',
                            quote.calculated_total.toString()
                          );
                          if (customPrice) {
                            updateQuoteStatus(quote.id, 'approved', parseFloat(customPrice));
                          }
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <DollarSign className="w-5 h-5" />
                        Custom Price
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuoteStatus(quote.id, 'rejected')}
                      className="sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject
                    </button>
                  </div>
                )}

                {quote.status === 'approved' && (
                  <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">
                        Quote approved at ${quote.approved_price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Customer can now schedule their appointment
                    </p>
                  </div>
                )}

                {quote.status === 'rejected' && (
                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-400">
                      <XCircle className="w-5 h-5" />
                      <span className="font-semibold">Quote was rejected</span>
                    </div>
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
