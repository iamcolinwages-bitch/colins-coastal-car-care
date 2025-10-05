'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="text-2xl md:text-3xl font-bold">
              <span className="text-primary">C</span>
              <span className="text-white">4</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-base md:text-lg">Colin's Coastal</div>
              <div className="text-gray-400 text-xs md:text-sm -mt-1">Car Care</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/services" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Services
            </Link>
            <Link href="/quote" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Get a Quote
            </Link>
            <Link href="/booking" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Book Now
            </Link>
            <Link href="/reviews" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Reviews
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors font-medium">
              Contact
            </Link>
            <a
              href="tel:4696183423"
              className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-semibold transition-colors text-sm lg:text-base"
            >
              <Phone className="w-4 h-4 lg:w-5 lg:h-5" />
              <span>(469) 618-3423</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Backdrop and Menu */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <div className="fixed inset-x-0 top-16 bottom-0 bg-gray-900 border-t border-gray-800 z-50 md:hidden overflow-y-auto">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <Link
                href="/services"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/quote"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
              <Link
                href="/booking"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
              <Link
                href="/reviews"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:4696183423"
                className="flex items-center justify-center space-x-2 mt-4 px-4 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call (469) 618-3423</span>
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
