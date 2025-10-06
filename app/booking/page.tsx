import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Calendar, Phone, Mail } from 'lucide-react';

export default function BookingPage() {
  return (
    <>
      <Navigation />

      <div className="min-h-screen pt-20 pb-16">
        {/* Header - Modern Design */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
              Booking Your Detail
              <br />
              Made Easy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              Get started with a custom quote to ensure the perfect service for your vehicle
            </p>
          </div>
        </section>

        {/* Booking Options */}
        <section className="relative py-32 md:py-40 mesh-bg">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Quote First Option */}
              <div className="group modern-card p-10 hover:scale-105 ring-2 ring-primary shadow-2xl shadow-primary/20">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 glass-strong rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Calendar className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Get a Custom Quote</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                  Select your services, get an instant estimate, and submit for approval. Once
                  approved, you'll receive a booking link to schedule your appointment.
                </p>
                <ul className="space-y-4 mb-10 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-base">Build your custom package</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-base">See instant pricing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-base">Book your appointment</span>
                  </li>
                </ul>
                <Link
                  href="/quote"
                  className="block w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white text-center py-5 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 text-lg"
                >
                  Start Custom Quote
                </Link>
              </div>

              {/* Call/Email Option */}
              <div className="group modern-card p-10 hover:scale-105">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-secondary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-20 h-20 glass-strong rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Phone className="w-10 h-10 text-secondary" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Call or Email</h3>
                <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                  Prefer to speak with us directly? Give us a call or send an email and we'll
                  help you schedule your service right away.
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Call us</div>
                      <a
                        href="tel:4696183423"
                        className="text-white hover:text-secondary transition-colors font-bold text-lg"
                      >
                        (469) 618-3423
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email us</div>
                      <a
                        href="mailto:iamcolinwages@gmail.com"
                        className="text-white hover:text-secondary transition-colors font-bold text-base break-all"
                      >
                        iamcolinwages@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Hours</div>
                      <div className="text-white font-bold text-base">Mon-Sat, 7 AM - 7:30 PM</div>
                    </div>
                  </div>
                </div>

                <a
                  href="tel:4696183423"
                  className="block w-full bg-gradient-to-r from-secondary to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white text-center py-5 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl hover:shadow-secondary/30 text-lg"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative py-32 md:py-40 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">How It Works</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">Simple steps to get your car looking pristine</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-red-700 text-white rounded-2xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                    1
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Request Quote</h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Fill out the quote form with your service preferences
                </p>
              </div>
              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-red-700 text-white rounded-2xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                    2
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Get Approval</h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  We review and approve your custom quote
                </p>
              </div>
              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-red-700 text-white rounded-2xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                    3
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Schedule</h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Choose your preferred date and time
                </p>
              </div>
              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary to-red-700 text-white rounded-2xl flex items-center justify-center font-bold text-2xl md:text-3xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                    4
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">We Come to You</h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Enjoy professional mobile detailing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-32 md:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
              Request your custom quote today and experience the C4 difference
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-3 bg-white text-primary px-12 py-5 rounded-2xl text-lg font-bold transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
            >
              Get Your Quote
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
