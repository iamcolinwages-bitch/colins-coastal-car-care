'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-3xl font-bold">
              <span className="text-primary">C</span>
              <span className="text-white">4</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg">Colin's Coastal</div>
              <div className="text-gray-400 text-sm -mt-1">Car Care</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-300 hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/quote" className="text-gray-300 hover:text-primary transition-colors">
              Get a Quote
            </Link>
            <Link href="/booking" className="text-gray-300 hover:text-primary transition-colors">
              Book Now
            </Link>
            <Link href="/reviews" className="text-gray-300 hover:text-primary transition-colors">
              Reviews
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
              Contact
            </Link>
            <a
              href="tel:4696183423"
              className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>(469) 618-3423</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/services"
              className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/quote"
              className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote
            </Link>
            <Link
              href="/booking"
              className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
            <Link
              href="/reviews"
              className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-primary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <a
              href="tel:4696183423"
              className="block px-4 py-3 bg-primary hover:bg-primary-dark text-white text-center rounded-lg font-semibold transition-colors"
            >
              Call (469) 618-3423
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
