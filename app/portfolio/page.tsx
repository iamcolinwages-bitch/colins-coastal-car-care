'use client';

import Navigation from '@/components/Navigation';
import { Image as ImageIcon } from 'lucide-react';

export default function PortfolioPage() {
  // Placeholder images - will be replaced with actual photos
  const portfolioItems = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));

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
              Portfolio
            </h1>
          </div>
        </section>

        {/* Portfolio Grid */}
        <div className="relative py-20 bg-black">
          {/* Palm tree background pattern - similar to homepage */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-primary/5"></div>

            {/* Repeating palm tree pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-4 gap-8 h-full">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="flex items-end justify-center">
                    <svg viewBox="0 0 200 400" className="h-64 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Palm trunk */}
                      <path
                        d="M95 400 Q85 350, 92 300 Q88 250, 95 200 Q90 150, 97 100 Q93 50, 100 0"
                        stroke="#B91C1C"
                        strokeWidth="8"
                        fill="none"
                      />
                      {/* Fronds */}
                      <path d="M100 50 Q80 20, 60 10 M100 50 Q95 15, 90 0 M100 50 Q105 15, 110 0 M100 50 Q120 20, 140 10" stroke="#DC2626" strokeWidth="3"/>
                      <path d="M100 50 Q70 35, 40 30 M100 50 Q130 35, 160 30" stroke="#EF4444" strokeWidth="3"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 cursor-pointer"
                >
                  {/* Image Placeholder */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-red-700/20 to-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Icon */}
                    <div className="relative z-10">
                      <ImageIcon className="w-16 h-16 text-primary/30 group-hover:text-primary/50 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
