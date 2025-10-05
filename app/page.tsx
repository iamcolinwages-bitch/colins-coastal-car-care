import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { MapPin, Star, Clock, Shield, Sparkles, Car, ArrowRight, Zap, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colin\'s Coastal Car Care | Premium Mobile Detailing in Naples, FL',
  description: 'Professional mobile car detailing serving Naples, Marco Island, Bonita Springs, and Estero. Premium interior and exterior detailing packages. Book online today!',
  keywords: 'car detailing Naples FL, mobile car detailing, auto detailing Marco Island, car wash Bonita Springs, detailing Estero, ceramic coating Naples, premium car care Southwest Florida',
  openGraph: {
    title: 'Colin\'s Coastal Car Care - Mobile Detailing Naples FL',
    description: 'Premium mobile car detailing serving Southwest Florida. Professional service, exceptional results.',
    url: 'https://colinscoastalcarcare.com',
    siteName: 'Colin\'s Coastal Car Care',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colin\'s Coastal Car Care',
    description: 'Premium mobile car detailing in Naples, FL',
  },
};

const serviceAreas = [
  {
    name: 'Naples',
    description: 'Premium mobile detailing services throughout Naples and surrounding neighborhoods',
    icon: MapPin,
  },
  {
    name: 'Marco Island',
    description: 'Professional car care for Marco Island residents and visitors',
    icon: MapPin,
  },
  {
    name: 'Bonita Springs',
    description: 'Expert detailing services in Bonita Springs and nearby areas',
    icon: MapPin,
  },
  {
    name: 'Estero',
    description: 'Top-quality mobile car detailing for Estero community',
    icon: MapPin,
  },
];

const features = [
  {
    icon: Car,
    title: 'Mobile Service',
    description: 'We come to you - home, office, or anywhere in Southwest Florida',
  },
  {
    icon: Star,
    title: '5-Star Quality',
    description: 'Premium products and attention to every detail',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Monday-Saturday, 7 AM - 7:30 PM. Book up to a month ahead',
  },
  {
    icon: Shield,
    title: 'Professional Service',
    description: 'Trained, insured, and dedicated to excellence',
  },
];

export default function Home() {
  return (
    <>
      <Navigation />

      {/* Hero Section - COMPLETELY REDESIGNED */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>

        {/* Mesh overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxRTkwRkYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi0yLjY4NiA2LTZjMC0zLjMxNC0yLjY4Ni02LTYtNnMtNiAyLjY4Ni02IDZ2Nnoiic8L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center space-x-2 glass-strong px-6 py-3 rounded-full border border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm md:text-base font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Southwest Florida's Premier Mobile Detailing
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white drop-shadow-2xl mb-2">Pristine Cars,</span>
            <span className="block gradient-text-primary drop-shadow-2xl">Delivered to You</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Professional mobile detailing that brings{' '}
            <span className="text-white font-medium">showroom shine</span> to your driveway.
            <br className="hidden md:block" />
            Serving Naples, Marco Island, Bonita Springs, and Estero.
          </p>

          {/* CTA Buttons - Redesigned */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 max-w-2xl mx-auto mb-12">
            <Link
              href="/booking"
              className="group relative w-full sm:w-auto bg-gradient-to-r from-primary via-red-600 to-red-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/quote"
              className="group relative w-full sm:w-auto glass-strong text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl border border-white/20 hover:border-white/40"
            >
              <span className="flex items-center justify-center gap-2">
                Get a Free Quote
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-base md:text-lg">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
              ))}
            </div>
            <span className="text-white font-semibold">5.0</span>
            <span className="text-gray-400">from our satisfied customers</span>
          </div>
        </div>

        {/* Scroll Indicator - Modern Design */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2 glass">
            <div className="w-1.5 h-3 bg-gradient-to-b from-white to-transparent rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Service Areas Section - COMPLETELY REDESIGNED */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-gray-300">Service Areas</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Serving Southwest Florida
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Premium mobile detailing services across Collier and Lee counties
            </p>
          </div>

          {/* Service Areas Grid - Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {serviceAreas.map((area, index) => (
              <div
                key={area.name}
                className="group modern-card p-8 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-16 h-16 glass-strong rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{area.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">Not sure if we service your area?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-primary hover:text-red-400 font-semibold text-lg group"
            >
              Contact us to find out
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - COMPLETELY REDESIGNED */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-black"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-gray-300">Why Choose Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Why Choose C4?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Professional service, exceptional results
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-red-900/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-full h-full glass-strong rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - COMPLETELY REDESIGNED */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Ready for a Pristine Ride?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto">
            Book your mobile detailing service today and experience the C4 difference
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              href="/booking"
              className="group w-full sm:w-auto glass-strong text-white px-12 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl border border-white/30 hover:border-white/50"
            >
              <span className="flex items-center justify-center gap-2">
                Schedule Service
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <a
              href="tel:4696183423"
              className="group w-full sm:w-auto bg-white text-primary px-12 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
            >
              <span className="flex items-center justify-center gap-2">
                Call (469) 618-3423
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer - COMPLETELY REDESIGNED */}
      <footer className="relative bg-black border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-black"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="space-y-4">
              <Image
                src="/logo.png"
                alt="Colin's Coastal Car Care"
                width={200}
                height={50}
                className="h-14 w-auto drop-shadow-2xl"
              />
              <p className="text-gray-400 leading-relaxed">
                Southwest Florida's premier mobile car detailing service. Excellence in every detail.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { href: '/services', label: 'Services' },
                  { href: '/quote', label: 'Get a Quote' },
                  { href: '/booking', label: 'Book Now' },
                  { href: '/reviews', label: 'Reviews' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Contact</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:4696183423" className="hover:text-white transition-colors">
                    (469) 618-3423
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">@</span>
                  <a href="mailto:iamColinwages@gmail.com" className="hover:text-white transition-colors break-all">
                    iamColinwages@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Mon-Sat, 7 AM - 7:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; 2025 Colin's Coastal Car Care. All rights reserved.
            </p>
            <Link href="/admin" className="text-gray-600 hover:text-gray-500 text-xs transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
