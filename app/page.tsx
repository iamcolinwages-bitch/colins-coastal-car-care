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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Palm tree silhouettes - Realistic coconut palms */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
          {/* Left palm tree */}
          <svg className="absolute bottom-0 left-[5%] h-[65%] w-auto" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk with rings */}
            <ellipse cx="150" cy="480" rx="12" ry="4" fill="#B91C1C" opacity="0.4"/>
            <ellipse cx="150" cy="460" rx="11" ry="3" fill="#B91C1C" opacity="0.4"/>
            <ellipse cx="150" cy="440" rx="10" ry="3" fill="#B91C1C" opacity="0.4"/>
            <path d="M145 500 Q148 400 145 300 Q143 200 146 100 Q148 50 145 10" stroke="#B91C1C" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.5"/>
            {/* Feathery fronds radiating out */}
            <path d="M145 10 Q130 5 100 -5 L95 -8 M120 0 L115 -2 M110 2 L107 0 M105 5 L103 3" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q120 8 85 5 L80 4 M110 7 L105 6 M100 8 L97 7 M92 9 L90 8" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q115 15 75 25 L70 27 M105 18 L100 19 M95 21 L92 22 M87 24 L85 25" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q115 20 80 40 L75 44 M110 25 L105 28 M100 32 L97 34 M92 37 L90 39" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q145 0 145 -15 L145 -20 M145 -3 L145 -5 M145 -8 L145 -10 M145 -13 L145 -15" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q160 5 190 -5 L195 -8 M170 0 L175 -2 M180 2 L183 0 M185 5 L187 3" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q170 8 205 5 L210 4 M180 7 L185 6 M190 8 L193 7 M198 9 L200 8" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q175 15 215 25 L220 27 M185 18 L190 19 M195 21 L198 22 M203 24 L205 25" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
            <path d="M145 10 Q175 20 210 40 L215 44 M180 25 L185 28 M190 32 L193 34 M198 37 L200 39" stroke="#DC2626" strokeWidth="2" opacity="0.6"/>
          </svg>

          {/* Right palm tree */}
          <svg className="absolute bottom-0 right-[8%] h-[60%] w-auto" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="155" cy="485" rx="11" ry="4" fill="#EF4444" opacity="0.3"/>
            <ellipse cx="155" cy="465" rx="10" ry="3" fill="#EF4444" opacity="0.3"/>
            <ellipse cx="155" cy="445" rx="10" ry="3" fill="#EF4444" opacity="0.3"/>
            <path d="M150 500 Q153 400 150 300 Q148 200 151 100 Q153 50 150 15" stroke="#EF4444" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.4"/>
            <path d="M150 15 Q135 10 105 0 L100 -3 M125 5 L120 3 M115 7 L112 5 M110 9 L108 7" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
            <path d="M150 15 Q125 13 90 10 L85 9 M115 12 L110 11 M105 13 L102 12 M97 14 L95 13" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
            <path d="M150 15 Q120 20 80 30 L75 32 M110 23 L105 24 M100 26 L97 27 M92 29 L90 30" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
            <path d="M150 15 Q120 25 85 45 L80 49 M115 30 L110 33 M105 37 L102 39 M97 42 L95 44" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
            <path d="M150 15 Q150 5 150 -10 L150 -15 M150 0 L150 -3 M150 -5 L150 -8 M150 -10 L150 -12" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
            <path d="M150 15 Q165 10 195 0 L200 -3 M175 5 L180 3 M185 7 L188 5 M190 9 L192 7" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
            <path d="M150 15 Q175 13 210 10 L215 9 M185 12 L190 11 M195 13 L198 12 M203 14 L205 13" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
            <path d="M150 15 Q180 20 220 30 L225 32 M190 23 L195 24 M200 26 L203 27 M208 29 L210 30" stroke="#B91C1C" strokeWidth="2" opacity="0.5"/>
          </svg>

          {/* Center palm tree */}
          <svg className="absolute bottom-0 left-[50%] -translate-x-1/2 h-[55%] w-auto" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="490" rx="10" ry="3" fill="#DC2626" opacity="0.3"/>
            <ellipse cx="150" cy="470" rx="9" ry="3" fill="#DC2626" opacity="0.3"/>
            <path d="M147 500 Q150 400 147 300 Q145 200 148 100 Q150 50 147 20" stroke="#DC2626" strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.35"/>
            <path d="M147 20 Q132 15 102 5 L97 3 M122 10 L117 8 M112 12 L109 10 M107 14 L105 12" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
            <path d="M147 20 Q122 18 87 15 L82 14 M112 17 L107 16 M102 18 L99 17 M94 19 L92 18" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
            <path d="M147 20 Q117 25 77 35 L72 37 M107 28 L102 29 M97 31 L94 32 M89 34 L87 35" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
            <path d="M147 20 Q147 10 147 -5 L147 -10 M147 5 L147 2 M147 0 L147 -3 M147 -5 L147 -7" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
            <path d="M147 20 Q162 15 192 5 L197 3 M172 10 L177 8 M182 12 L185 10 M187 14 L189 12" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
            <path d="M147 20 Q172 18 207 15 L212 14 M182 17 L187 16 M192 18 L195 17 M200 19 L202 18" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
            <path d="M147 20 Q177 25 217 35 L222 37 M187 28 L192 29 M197 31 L200 32 M205 34 L207 35" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
            <span className="block text-white drop-shadow-2xl mb-2">We Come to You,</span>
            <span className="block gradient-text-primary drop-shadow-2xl">We Make It New</span>
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
          <div className="flex flex-wrap items-center justify-center gap-3 text-base md:text-lg mb-20">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow-lg" />
              ))}
            </div>
            <span className="text-white font-semibold">5.0</span>
            <span className="text-gray-400">from our satisfied customers</span>
          </div>

          {/* Featured Reviews - Below Social Proof */}
          <div className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="glass-strong p-6 rounded-2xl border border-white/10 hover:scale-105 transition-all">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white text-sm mb-4 line-clamp-3 leading-relaxed">
                "Absolutely phenomenal service! My 2022 Tesla Model 3 looks brand new. Every detail was perfect."
              </p>
              <div className="border-t border-white/10 pt-3">
                <div className="text-white font-semibold text-sm">Sarah M.</div>
                <div className="text-gray-400 text-xs">2022 Tesla Model 3 - Premium Detail</div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="glass-strong p-6 rounded-2xl border border-white/10 hover:scale-105 transition-all">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white text-sm mb-4 line-clamp-3 leading-relaxed">
                "Colin did an amazing job on my BMW X5. The interior detailing was next level. Highly recommend!"
              </p>
              <div className="border-t border-white/10 pt-3">
                <div className="text-white font-semibold text-sm">Michael R.</div>
                <div className="text-gray-400 text-xs">2021 BMW X5 - Interior + Exterior</div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="glass-strong p-6 rounded-2xl border border-white/10 hover:scale-105 transition-all">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-white text-sm mb-4 line-clamp-3 leading-relaxed">
                "Best detailing service I've used in Naples. My Porsche 911 never looked better. Worth every penny!"
              </p>
              <div className="border-t border-white/10 pt-3">
                <div className="text-white font-semibold text-sm">James T.</div>
                <div className="text-gray-400 text-xs">2023 Porsche 911 - Full Detail</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section - COMPLETELY REDESIGNED */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Serving Southwest Florida
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Premium mobile detailing services across Collier and Lee counties
            </p>
          </div>

          {/* Service Areas Grid - Modern Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {serviceAreas.map((area, index) => (
              <div
                key={area.name}
                className="group modern-card p-10 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-6">
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
            <p className="text-gray-400 mb-3">Not sure if we service your area?</p>
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
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-black"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-20 md:mb-28">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Why Choose C4?
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Professional service, exceptional results
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
      <section className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
            Ready for Your New Ride?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-16 font-light max-w-3xl mx-auto leading-relaxed">
            Book your mobile detailing service today and experience the C4 difference
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
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

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 mb-16">
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
                  <a href="mailto:iamcolinwages@gmail.com" className="hover:text-white transition-colors break-all">
                    iamcolinwages@gmail.com
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
