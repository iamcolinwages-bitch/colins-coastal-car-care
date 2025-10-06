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
        {/* Palm tree silhouettes - Realistic Florida coastal style */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
          {/* Left palm tree - tall */}
          <svg className="absolute bottom-0 left-[5%] h-[70%] w-auto opacity-40" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path d="M95 400 Q98 350 95 300 Q93 250 96 200 Q98 150 95 100 Q93 50 95 20" stroke="#B91C1C" strokeWidth="8" fill="none" strokeLinecap="round"/>
            {/* Fronds */}
            <path d="M95 20 Q60 10 30 5 Q20 3 15 8" stroke="#B91C1C" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q70 15 45 18 Q35 20 32 25" stroke="#B91C1C" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q75 25 55 35 Q48 40 48 47" stroke="#B91C1C" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q130 10 160 5 Q170 3 175 8" stroke="#B91C1C" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q120 15 145 18 Q155 20 158 25" stroke="#B91C1C" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q115 25 135 35 Q142 40 142 47" stroke="#B91C1C" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q95 5 95 0" stroke="#B91C1C" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q85 8 75 3" stroke="#B91C1C" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M95 20 Q105 8 115 3" stroke="#B91C1C" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Right palm tree - medium */}
          <svg className="absolute bottom-0 right-[8%] h-[55%] w-auto opacity-50" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path d="M100 400 Q95 350 98 300 Q101 250 98 200 Q96 150 99 100 Q101 50 98 25" stroke="#DC2626" strokeWidth="7" fill="none" strokeLinecap="round"/>
            {/* Fronds */}
            <path d="M98 25 Q65 18 35 15 Q25 14 20 18" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M98 25 Q72 22 48 28 Q40 30 38 35" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M98 25 Q78 32 60 45 Q55 50 55 57" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M98 25 Q131 18 161 15 Q171 14 176 18" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M98 25 Q124 22 148 28 Q156 30 158 35" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M98 25 Q118 32 136 45 Q141 50 141 57" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M98 25 Q98 12 98 5" stroke="#DC2626" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Center-left palm tree - short */}
          <svg className="absolute bottom-0 left-[35%] h-[45%] w-auto opacity-35" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path d="M105 400 Q108 350 105 300 Q103 270 105 240 Q107 210 105 180" stroke="#B91C1C" strokeWidth="6" fill="none" strokeLinecap="round"/>
            {/* Fronds */}
            <path d="M105 180 Q75 172 45 168 Q35 167 30 171" stroke="#B91C1C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M105 180 Q82 177 58 182 Q50 184 48 189" stroke="#B91C1C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M105 180 Q88 186 70 196 Q65 200 65 206" stroke="#B91C1C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M105 180 Q135 172 165 168 Q175 167 180 171" stroke="#B91C1C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M105 180 Q128 177 152 182 Q160 184 162 189" stroke="#B91C1C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M105 180 Q122 186 140 196 Q145 200 145 206" stroke="#B91C1C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M105 180 Q105 170 105 165" stroke="#B91C1C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Far right palm tree - tall */}
          <svg className="absolute bottom-0 right-[25%] h-[65%] w-auto opacity-30" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path d="M92 400 Q90 350 93 300 Q95 250 92 200 Q90 150 93 100 Q95 50 92 18" stroke="#EF4444" strokeWidth="7" fill="none" strokeLinecap="round"/>
            {/* Fronds */}
            <path d="M92 18 Q62 12 32 10 Q22 9 17 13" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M92 18 Q68 14 44 20 Q36 22 34 27" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M92 18 Q74 24 56 36 Q51 41 51 48" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M92 18 Q122 12 152 10 Q162 9 167 13" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M92 18 Q116 14 140 20 Q148 22 150 27" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M92 18 Q110 24 128 36 Q133 41 133 48" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M92 18 Q92 8 92 2" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </svg>

          {/* Additional small palm on far left */}
          <svg className="absolute bottom-0 left-[25%] h-[40%] w-auto opacity-25" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path d="M98 400 Q96 360 98 320 Q100 290 98 260" stroke="#DC2626" strokeWidth="5" fill="none" strokeLinecap="round"/>
            {/* Fronds */}
            <path d="M98 260 Q70 254 42 252 Q34 252 30 255" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M98 260 Q77 257 56 262 Q50 264 49 268" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M98 260 Q83 266 68 276 Q64 280 64 285" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M98 260 Q126 254 154 252 Q162 252 166 255" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M98 260 Q119 257 140 262 Q146 264 147 268" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M98 260 Q113 266 128 276 Q132 280 132 285" stroke="#DC2626" strokeWidth="3" fill="none" strokeLinecap="round"/>
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
