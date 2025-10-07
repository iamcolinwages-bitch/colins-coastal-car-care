'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface PortfolioImage {
  id: string;
  url: string;
  alt_text: string;
  filename: string;
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchPortfolioImages() {
      const { data, error } = await supabase
        .from('media')
        .select('id, url, alt_text, filename')
        .eq('category', 'portfolio')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching portfolio images:', error);
      } else {
        setPortfolioItems(data || []);
      }
      setLoading(false);
    }

    fetchPortfolioImages();
  }, []);

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
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              Witness the transformation. From tired to inspired - see the results that speak for themselves.
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <div className="relative py-20 bg-black">
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4">Loading portfolio...</p>
              </div>
            ) : portfolioItems.length === 0 ? (
              <div className="text-center py-20">
                <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No portfolio images yet</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon to see our latest work!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative overflow-hidden rounded-xl border-2 border-primary/20 hover:border-primary/60 transition-all duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-black overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.alt_text || item.filename}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-red-700/20 to-red-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
