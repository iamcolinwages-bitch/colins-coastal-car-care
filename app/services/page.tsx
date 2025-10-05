import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Check, Sparkles } from 'lucide-react';
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
      'Vacuum door jams',
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
    popular: true,
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
      'Clay bar treatment',
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
    featured: true,
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
    price: 40,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navigation />

      <div className="min-h-screen pt-20 pb-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Services & Pricing
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Professional mobile detailing packages designed to keep your vehicle pristine.
              All prices shown are starting prices.
            </p>
          </div>
        </section>

        {/* Pricing Note */}
        <div className="bg-gray-900 border-b border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <span>Sedan Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>SUV/Truck Pricing (+$30-$100)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Packages */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Standard Packages
              </h2>
              <p className="text-gray-400">
                Professional detailing at an affordable price
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.filter(pkg => pkg.tier === 'standard').map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-gray-900 border ${
                    pkg.popular ? 'border-secondary' : 'border-gray-800'
                  } rounded-xl p-8 hover:border-primary transition-colors`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">${pkg.sedanPrice}</span>
                      <span className="text-gray-400">Sedan</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">${pkg.suvTruckPrice}</span>
                      <span className="text-gray-400">SUV/Truck</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.services.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{service}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Packages */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Premium Service</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Premium Packages
              </h2>
              <p className="text-gray-400">
                Ultimate care and protection for your vehicle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.filter(pkg => pkg.tier === 'premium').map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-black border ${
                    pkg.featured ? 'border-primary ring-2 ring-primary/20' : 'border-gray-800'
                  } rounded-xl p-8 hover:border-primary transition-all`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Best Value
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-400 mb-6">{pkg.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-white">${pkg.sedanPrice}</span>
                      <span className="text-gray-400">Sedan</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">${pkg.suvTruckPrice}</span>
                      <span className="text-gray-400">SUV/Truck</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.services.map((service) => (
                      <li key={service} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{service}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/booking"
                    className={`block w-full ${
                      pkg.featured
                        ? 'bg-gradient-to-r from-primary to-primary-dark'
                        : 'bg-primary hover:bg-primary-dark'
                    } text-white text-center py-3 rounded-lg font-semibold transition-all`}
                  >
                    Book Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Additional Services
              </h2>
              <p className="text-gray-400">
                Enhance your detailing package with these add-ons
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {addOns.map((addon) => (
                <div
                  key={addon.name}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{addon.name}</h3>
                      <p className="text-gray-400">{addon.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">${addon.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Want a custom package?</p>
              <Link
                href="/quote"
                className="inline-flex items-center text-primary hover:text-primary-dark font-semibold text-lg"
              >
                Get a Custom Quote
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Book Your Service?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Choose your package and schedule your mobile detailing today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 px-10 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                Book Now
              </Link>
              <Link
                href="/quote"
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-lg text-lg font-semibold transition-all"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
