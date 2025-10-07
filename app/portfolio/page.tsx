'use client';

import Navigation from '@/components/Navigation';
import { Image as ImageIcon } from 'lucide-react';

export default function PortfolioPage() {
  // Placeholder images - will be replaced with actual photos
  const portfolioItems = [
    { id: 1, title: 'Interior Detailing - Before & After', category: 'Interior' },
    { id: 2, title: 'Exterior Wash & Wax', category: 'Exterior' },
    { id: 3, title: 'Premium Detail Package', category: 'Combined' },
    { id: 4, title: 'Engine Bay Cleaning', category: 'Add-on' },
    { id: 5, title: 'Paint Correction Results', category: 'Exterior' },
    { id: 6, title: 'Leather Seat Restoration', category: 'Interior' },
    { id: 7, title: 'Ceramic Coating Application', category: 'Exterior' },
    { id: 8, title: 'Pet Hair Removal', category: 'Add-on' },
    { id: 9, title: 'Complete Interior Transformation', category: 'Interior' },
    { id: 10, title: 'SUV Full Detail', category: 'Combined' },
    { id: 11, title: 'Headlight Restoration', category: 'Exterior' },
    { id: 12, title: 'Clay Bar Treatment Results', category: 'Add-on' },
  ];

  return (
    <>
      <Navigation />

      <div className="min-h-screen pt-20 pb-16 bg-black">
        {/* Header */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              See the transformations we've achieved for our customers
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <div className="relative py-20 mesh-bg">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="group modern-card overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-red-700/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                      <ImageIcon className="w-20 h-20 text-gray-700 group-hover:text-gray-600 transition-colors" />
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">
                      Professional detailing results
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Message */}
            <div className="mt-16 modern-card p-8 text-center max-w-2xl mx-auto">
              <ImageIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-white font-bold text-2xl mb-3">Coming Soon</h3>
              <p className="text-gray-400 text-lg">
                We're building our portfolio gallery. Check back soon to see amazing before & after transformations from our detailing work!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
