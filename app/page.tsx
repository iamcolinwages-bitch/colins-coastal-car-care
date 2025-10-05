import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import { MapPin, Star, Clock, Shield, Sparkles, Car } from 'lucide-react';
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

      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxRTkwRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi0yLjY4NiA2LTZjMC0zLjMxNC0yLjY4Ni02LTYtNnMtNiAyLjY4Ni02IDZ2Nnoiic/+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <div className="mb-6 md:mb-8 inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="text-gray-300">Southwest Florida's Premier Mobile Detailing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="text-white">Pristine Cars,</span>
            <br />
            <span className="text-primary">Delivered to You</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto px-4">
            Professional mobile detailing that brings showroom shine to your driveway.
            Serving Naples, Marco Island, Bonita Springs, and Estero.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4 max-w-2xl mx-auto">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-3 md:px-10 md:py-5 rounded-lg text-base md:text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
            >
              Book Now
            </Link>
            <Link
              href="/quote"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 md:px-10 md:py-5 rounded-lg text-base md:text-lg font-semibold transition-all backdrop-blur-sm"
            >
              Get a Free Quote
            </Link>
          </div>

          <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-1 md:gap-2 text-sm md:text-base text-gray-400">
            <div className="flex gap-1">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="ml-2">5.0 from our satisfied customers</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Service Areas Section - Features Style Menu */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
              Serving Southwest Florida
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Premium mobile detailing services across Collier and Lee counties
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceAreas.map((area) => (
              <div
                key={area.name}
                className="group bg-black border border-gray-800 hover:border-primary rounded-xl p-8 transition-all hover:transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{area.name}</h3>
                  <p className="text-gray-400">{area.description}</p>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Not sure if we service your area?</p>
            <Link
              href="/contact"
              className="inline-flex items-center text-primary hover:text-primary-dark font-semibold"
            >
              Contact us to find out
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose C4?
            </h2>
            <p className="text-xl text-gray-400">
              Professional service, exceptional results
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready for a Pristine Ride?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your mobile detailing service today and experience the C4 difference
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 px-10 py-5 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            >
              Schedule Service
            </Link>
            <a
              href="tel:4696183423"
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-5 rounded-lg text-lg font-semibold transition-all"
            >
              Call (469) 618-3423
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Image
                  src="/logo.png"
                  alt="Colin's Coastal Car Care"
                  width={200}
                  height={50}
                  className="h-14 w-auto"
                />
              </div>
              <p className="text-gray-400">
                Southwest Florida's premier mobile car detailing service.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
                <li><Link href="/quote" className="text-gray-400 hover:text-primary transition-colors">Get a Quote</Link></li>
                <li><Link href="/booking" className="text-gray-400 hover:text-primary transition-colors">Book Now</Link></li>
                <li><Link href="/reviews" className="text-gray-400 hover:text-primary transition-colors">Reviews</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: (469) 618-3423</li>
                <li>Email: iamColinwages@gmail.com</li>
                <li>Hours: Mon-Sat, 7 AM - 7:30 PM</li>
              </ul>
            </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Colin's Coastal Car Care. All rights reserved.</p>
            <Link href="/admin" className="text-gray-600 hover:text-gray-500 text-xs mt-2 inline-block">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
