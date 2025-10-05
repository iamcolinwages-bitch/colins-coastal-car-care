'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-xl'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Colin's Coastal Car Care"
              width={200}
              height={50}
              className="h-12 w-auto md:h-16 drop-shadow-2xl"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <Link
              href="/services"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all font-medium group"
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/quote"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all font-medium group"
            >
              <span className="relative z-10">Get a Quote</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/booking"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all font-medium group"
            >
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/reviews"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all font-medium group"
            >
              <span className="relative z-10">Reviews</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="relative px-4 py-2 text-gray-300 hover:text-white transition-all font-medium group"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <a
              href="tel:4696183423"
              className="relative flex items-center space-x-2 bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white px-5 lg:px-7 py-2.5 lg:py-3 rounded-xl font-semibold transition-all text-sm lg:text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Phone className="w-4 h-4 lg:w-5 lg:h-5 relative z-10" />
              <span className="relative z-10">(469) 618-3423</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative text-white p-2.5 hover:bg-white/10 rounded-xl transition-all hover:scale-110"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Backdrop and Menu */}
      {isOpen && (
        <>
          {/* Backdrop overlay with enhanced blur */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu - Glassmorphic Design */}
          <div className="fixed inset-x-0 top-20 bottom-0 z-50 md:hidden overflow-y-auto">
            <div className="m-4 glass-strong rounded-3xl p-6 space-y-3">
              <Link
                href="/services"
                className="block px-5 py-4 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/quote"
                className="block px-5 py-4 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
              <Link
                href="/booking"
                className="block px-5 py-4 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
              <Link
                href="/reviews"
                className="block px-5 py-4 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="/contact"
                className="block px-5 py-4 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:4696183423"
                className="flex items-center justify-center space-x-2 mt-6 px-6 py-5 bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl font-semibold transition-all shadow-2xl shadow-primary/40 hover:scale-105"
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
