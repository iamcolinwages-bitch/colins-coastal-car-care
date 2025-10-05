'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Star,
  DollarSign,
  Users,
  Mail,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    pendingQuotes: 0,
    pendingReviews: 0,
    todayBookings: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth
    const isAuthed = sessionStorage.getItem('admin_auth');
    if (!isAuthed) {
      router.push('/admin');
      return;
    }

    // Fetch stats
    async function fetchStats() {
      try {
        const [quotes, reviews, bookings, customers] = await Promise.all([
          supabase.from('custom_quotes').select('*', { count: 'exact' }).eq('status', 'pending'),
          supabase.from('reviews').select('*', { count: 'exact' }).eq('status', 'pending'),
          supabase
            .from('bookings')
            .select('*')
            .eq('scheduled_date', new Date().toISOString().split('T')[0]),
          supabase.from('customers').select('*', { count: 'exact' }),
        ]);

        setStats({
          pendingQuotes: quotes.count || 0,
          pendingReviews: reviews.count || 0,
          todayBookings: bookings.data?.length || 0,
          totalRevenue: 0, // Calculate from completed bookings
          totalCustomers: customers.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
    { icon: Calendar, label: 'Bookings', href: '/admin/bookings' },
    { icon: FileText, label: 'Quote Requests', href: '/admin/quotes', badge: stats.pendingQuotes },
    { icon: Star, label: 'Reviews', href: '/admin/reviews', badge: stats.pendingReviews },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: DollarSign, label: 'Pricing', href: '/admin/pricing' },
    { icon: Mail, label: 'Email/SMS Blasts', href: '/admin/blast' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const statCards = [
    {
      icon: FileText,
      label: 'Pending Quotes',
      value: stats.pendingQuotes,
      color: 'primary',
      link: '/admin/quotes',
    },
    {
      icon: Star,
      label: 'Pending Reviews',
      value: stats.pendingReviews,
      color: 'secondary',
      link: '/admin/reviews',
    },
    {
      icon: Calendar,
      label: 'Today\'s Bookings',
      value: stats.todayBookings,
      color: 'primary',
      link: '/admin/bookings',
    },
    {
      icon: Users,
      label: 'Total Customers',
      value: stats.totalCustomers,
      color: 'secondary',
      link: '/admin/customers',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="C4 Logo"
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div>
              <div className="text-white font-bold">Admin Portal</div>
              <div className="text-gray-400 text-sm">Colin's Coastal Car Care</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen hidden lg:block">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="text-gray-400">Loading...</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {statCards.map((card) => (
                    <Link
                      key={card.label}
                      href={card.link}
                      className="bg-gray-900 border border-gray-800 hover:border-primary rounded-xl p-6 transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            card.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'
                          }`}
                        >
                          <card.icon
                            className={`w-6 h-6 ${
                              card.color === 'primary' ? 'text-primary' : 'text-secondary'
                            }`}
                          />
                        </div>
                        {card.value > 0 && (
                          <span className="text-xs text-gray-500 group-hover:text-primary transition-colors">
                            View →
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                      <div className="text-sm text-gray-400">{card.label}</div>
                    </Link>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Quick Actions
                    </h2>
                    <div className="space-y-3">
                      <Link
                        href="/admin/quotes"
                        className="flex items-center justify-between bg-black border border-gray-800 hover:border-primary rounded-lg p-4 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="text-white">Review Quote Requests</span>
                        </div>
                        {stats.pendingQuotes > 0 && (
                          <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                            {stats.pendingQuotes}
                          </span>
                        )}
                      </Link>

                      <Link
                        href="/admin/reviews"
                        className="flex items-center justify-between bg-black border border-gray-800 hover:border-primary rounded-lg p-4 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-secondary" />
                          <span className="text-white">Approve Reviews</span>
                        </div>
                        {stats.pendingReviews > 0 && (
                          <span className="bg-secondary text-white text-sm px-3 py-1 rounded-full">
                            {stats.pendingReviews}
                          </span>
                        )}
                      </Link>

                      <Link
                        href="/admin/bookings"
                        className="flex items-center justify-between bg-black border border-gray-800 hover:border-primary rounded-lg p-4 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-white">Manage Bookings</span>
                        </div>
                      </Link>

                      <Link
                        href="/admin/blast"
                        className="flex items-center justify-between bg-black border border-gray-800 hover:border-primary rounded-lg p-4 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-secondary" />
                          <span className="text-white">Send Email/SMS Blast</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      System Status
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Database</span>
                        </div>
                        <span className="text-green-500 text-sm">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Email Service</span>
                        </div>
                        <span className="text-green-500 text-sm">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span>Website</span>
                        </div>
                        <span className="text-green-500 text-sm">Running</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
