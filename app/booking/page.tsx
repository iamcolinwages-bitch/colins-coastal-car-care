import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Calendar, Phone, Mail } from 'lucide-react';

export default function BookingPage() {
  return (
    <>
      <Navigation />

      <div className="min-h-screen pt-20 pb-16">
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Book Your Service</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Schedule Your Detailing
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get started with a custom quote to ensure the perfect service for your vehicle
            </p>
          </div>
        </section>

        {/* Booking Options */}
        <section className="py-16 bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Quote First Option */}
              <div className="bg-gray-900 border border-primary rounded-xl p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Get a Custom Quote</h3>
                <p className="text-gray-400 mb-6">
                  Select your services, get an instant estimate, and submit for approval. Once
                  approved, you'll receive a booking link to schedule your appointment.
                </p>
                <ul className="space-y-2 mb-8 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Build your custom package
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    See instant pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Get admin approval
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Book your appointment
                  </li>
                </ul>
                <Link
                  href="/quote"
                  className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-4 rounded-lg font-semibold transition-colors"
                >
                  Start Custom Quote
                </Link>
              </div>

              {/* Call/Email Option */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Call or Email</h3>
                <p className="text-gray-400 mb-6">
                  Prefer to speak with us directly? Give us a call or send an email and we'll
                  help you schedule your service right away.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm text-gray-500">Call us</div>
                      <a
                        href="tel:4696183423"
                        className="text-white hover:text-secondary transition-colors font-semibold"
                      >
                        (469) 618-3423
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm text-gray-500">Email us</div>
                      <a
                        href="mailto:iamColinwages@gmail.com"
                        className="text-white hover:text-secondary transition-colors font-semibold break-all"
                      >
                        iamColinwages@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm text-gray-500">Hours</div>
                      <div className="text-white font-semibold">Mon-Sat, 7 AM - 7:30 PM</div>
                    </div>
                  </div>
                </div>

                <a
                  href="tel:4696183423"
                  className="block w-full bg-secondary hover:bg-secondary-dark text-white text-center py-4 rounded-lg font-semibold transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="text-white font-semibold mb-2">Request Quote</h3>
                <p className="text-gray-400 text-sm">
                  Fill out the quote form with your service preferences
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="text-white font-semibold mb-2">Get Approval</h3>
                <p className="text-gray-400 text-sm">
                  We review and approve your custom quote
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="text-white font-semibold mb-2">Schedule</h3>
                <p className="text-gray-400 text-sm">
                  Choose your preferred date and time
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  4
                </div>
                <h3 className="text-white font-semibold mb-2">We Come to You</h3>
                <p className="text-gray-400 text-sm">
                  Enjoy professional mobile detailing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Request your custom quote today and experience the C4 difference
            </p>
            <Link
              href="/quote"
              className="inline-block bg-gradient-to-r from-primary to-primary-dark text-white px-12 py-4 rounded-lg text-lg font-semibold transition-transform hover:scale-105"
            >
              Get Your Quote
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
