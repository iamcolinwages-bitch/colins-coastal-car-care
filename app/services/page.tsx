import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Pricing | Colin\'s Coastal Car Care',
  description: 'View our premium car detailing packages: Standard and Premium Interior/Exterior services. Professional mobile detailing in Naples, Marco Island, Bonita Springs, and Estero.',
  keywords: 'car detailing packages, interior detailing, exterior detailing, premium car wash, mobile detailing prices Naples',
};

const packages = [
  {
    id: 'standard-interior',
    name: 'Standard Interior',
    type: 'interior',
    tier: 'standard',
    description: 'Complete interior cleaning and refresh',
    services: [
      'Vacuum all interior surfaces',
      'Wipe down all interior surfaces',
      'Clean interior and exterior glass',
      'Wipe down door jams',
    ],
    sedanPrice: 100,
    suvTruckPrice: 130,
  },
  {
    id: 'standard-exterior',
    name: 'Standard Exterior',
    type: 'exterior',
    tier: 'standard',
    description: 'Thorough exterior hand wash and shine',
    services: [
      'Hand wash',
      'Wheels washed and cleaned',
      'Exterior glass cleaning',
      'Interior glass mirrors',
      'Tire shine applied',
    ],
    sedanPrice: 100,
    suvTruckPrice: 130,
  },
  {
    id: 'standard-combined',
    name: 'Standard Combined',
    type: 'combined',
    tier: 'standard',
    description: 'Complete standard interior and exterior package',
    services: [
      'All Standard Interior services',
      'All Standard Exterior services',
    ],
    sedanPrice: 180,
    suvTruckPrice: 230,
  },
  {
    id: 'premium-interior',
    name: 'Premium Interior',
    type: 'interior',
    tier: 'premium',
    description: 'Deep interior detailing with premium products',
    services: [
      'All Standard Interior services',
      'Deep cleaning',
      'Leather treatment',
      'Stain removal',
      'Odor elimination',
    ],
    sedanPrice: 200,
    suvTruckPrice: 260,
  },
  {
    id: 'premium-exterior',
    name: 'Premium Exterior',
    type: 'exterior',
    tier: 'premium',
    description: 'Premium exterior detail with wax and protection',
    services: [
      'All Standard Exterior services',
      'Premium wax application',
      'Wheel detailing',
      'Engine bay wipe down',
    ],
    sedanPrice: 200,
    suvTruckPrice: 260,
  },
  {
    id: 'premium-combined',
    name: 'Premium Combined',
    type: 'combined',
    tier: 'premium',
    description: 'Complete premium interior and exterior package',
    services: [
      'All Premium Interior services',
      'All Premium Exterior services',
    ],
    sedanPrice: 360,
    suvTruckPrice: 460,
  },
];

const addOns = [
  {
    name: 'Engine Bay Cleaning',
    description: 'Professional engine bay cleaning and dressing',
    price: 50,
  },
  {
    name: 'Pet Hair Removal',
    description: 'Thorough pet hair removal from all surfaces',
    price: 50,
  },
  {
    name: 'Clay Bar Treatment',
    description: 'Remove contaminants and restore smooth paint finish',
    price: 35,
  },
  {
    name: 'Water Spot Removal',
    description: 'Professional removal of hard water spots and mineral deposits',
    price: 35,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />

      <div className="min-h-screen pt-20 pb-16">
        {/* Hero Header - Modern Design */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
              Our Services & Pricing
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              Professional mobile detailing packages designed to keep your vehicle pristine.
              <br className="hidden md:block" />
              All prices shown are starting prices.
            </p>
          </div>
        </section>

        {/* Pricing Legend */}
        <div className="relative border-y border-white/10 py-8 bg-black/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-8 text-sm md:text-base">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
                <span className="text-gray-300 font-medium">Sedan Pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-primary to-red-700 rounded-full shadow-lg shadow-primary/50"></div>
                <span className="text-gray-300 font-medium">SUV/Truck (+$30-$100)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Packages */}
        <section className="relative py-24 mesh-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Standard Packages
              </h2>
              <p className="text-xl text-gray-400 font-light">
                Professional detailing at an affordable price
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.filter(pkg => pkg.tier === 'standard').map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="group modern-card p-8"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{pkg.name}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{pkg.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-white">${pkg.sedanPrice}</span>
                      <span className="text-gray-400">Sedan</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold gradient-text-primary">${pkg.suvTruckPrice}</span>
                      <span className="text-gray-400">SUV/Truck</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.services.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-300 leading-relaxed">{service}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className="block w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white text-center py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Book Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Packages */}
        <section className="relative py-24 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Premium Packages
              </h2>
              <p className="text-xl text-gray-400 font-light">
                Ultimate care and protection for your vehicle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.filter(pkg => pkg.tier === 'premium').map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="group modern-card p-8"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{pkg.name}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{pkg.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-white">${pkg.sedanPrice}</span>
                      <span className="text-gray-400">Sedan</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold gradient-text-primary">${pkg.suvTruckPrice}</span>
                      <span className="text-gray-400">SUV/Truck</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.services.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <div className="mt-1">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-gray-300 leading-relaxed">{service}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className="block w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white text-center py-4 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Book Now
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="relative py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
                Additional Services
              </h2>
              <p className="text-xl text-gray-400 font-light">
                Enhance your detailing package with these add-ons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {addOns.map((addon, index) => (
                <div
                  key={addon.name}
                  className="group modern-card p-8 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{addon.name}</h3>
                      <p className="text-gray-400 leading-relaxed">{addon.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-bold gradient-text-primary">${addon.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4 text-lg">Want a custom package?</p>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-primary hover:text-red-400 font-bold text-xl group"
              >
                Get a Custom Quote
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Ready to Book Your Service?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
              Choose your package and schedule your mobile detailing today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/booking"
                className="group w-full sm:w-auto bg-white text-primary px-12 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
              >
                <span className="flex items-center justify-center gap-2">
                  Book Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/quote"
                className="group w-full sm:w-auto glass-strong text-white px-12 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl border border-white/30 hover:border-white/50"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Custom Quote
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
