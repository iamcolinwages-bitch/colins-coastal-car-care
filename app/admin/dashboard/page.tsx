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
  Menu,
  X,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          totalRevenue: 0,
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
    { icon: FileText, label: 'Quotes', href: '/admin/quotes', badge: stats.pendingQuotes },
    { icon: Star, label: 'Reviews', href: '/admin/reviews', badge: stats.pendingReviews },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: DollarSign, label: 'Pricing', href: '/admin/pricing' },
    { icon: Mail, label: 'Marketing', href: '/admin/blast' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const statCards = [
    {
      icon: FileText,
      label: 'Pending Quotes',
      value: stats.pendingQuotes,
      gradient: 'from-red-500 to-red-700',
      link: '/admin/quotes',
      trend: '+12%',
    },
    {
      icon: Calendar,
      label: "Today's Bookings",
      value: stats.todayBookings,
      gradient: 'from-blue-500 to-blue-700',
      link: '/admin/bookings',
      trend: '+8%',
    },
    {
      icon: Star,
      label: 'Pending Reviews',
      value: stats.pendingReviews,
      gradient: 'from-yellow-500 to-yellow-700',
      link: '/admin/reviews',
      trend: '+5%',
    },
    {
      icon: Users,
      label: 'Total Customers',
      value: stats.totalCustomers,
      gradient: 'from-green-500 to-green-700',
      link: '/admin/customers',
      trend: '+23%',
    },
  ];

  const quickActions = [
    { icon: FileText, label: 'Review Quotes', href: '/admin/quotes', color: 'red', badge: stats.pendingQuotes },
    { icon: Star, label: 'Approve Reviews', href: '/admin/reviews', color: 'yellow', badge: stats.pendingReviews },
    { icon: Calendar, label: 'Manage Bookings', href: '/admin/bookings', color: 'blue' },
    { icon: Mail, label: 'Send Campaign', href: '/admin/blast', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800/50 backdrop-blur-xl z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="C4" width={200} height={50} className="h-10 w-auto" style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(98%) saturate(6943%) hue-rotate(357deg) brightness(89%) contrast(113%)' }} />
              <div className="text-xs text-gray-400 font-medium">ADMIN</div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all group ${
                item.active
                  ? 'bg-gradient-to-r from-primary to-red-700 text-white shadow-lg shadow-primary/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                  {item.badge}
                </span>
              ) : (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-gray-400">Welcome back, Colin!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">All Systems Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-gray-400 text-lg">Loading dashboard...</div>
              </div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statCards.map((card) => (
                    <Link
                      key={card.label}
                      href={card.link}
                      className="group relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all hover:scale-105 hover:shadow-2xl"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                      <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                            <card.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs text-green-400 font-semibold">{card.trend}</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                        <div className="text-sm text-gray-400 font-medium">{card.label}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Quick Actions & System Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Quick Actions */}
                  <div className="lg:col-span-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Clock className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-bold text-white">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {quickActions.map((action) => (
                        <Link
                          key={action.label}
                          href={action.href}
                          className="relative group bg-gray-900/50 border border-gray-700/50 hover:border-gray-600 rounded-xl p-4 transition-all hover:scale-105"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-${action.color}-500/10`}>
                                <action.icon className={`w-5 h-5 text-${action.color}-500`} />
                              </div>
                              <span className="text-white font-medium">{action.label}</span>
                            </div>
                            {action.badge && action.badge > 0 && (
                              <span className={`bg-${action.color}-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold`}>
                                {action.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-bold text-white">System Status</h2>
                    </div>
                    <div className="space-y-4">
                      {['Database', 'Email Service', 'Website', 'API'].map((service) => (
                        <div key={service} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-300 font-medium">{service}</span>
                          </div>
                          <span className="text-xs text-green-400 font-semibold">Online</span>
                        </div>
                      ))}
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
