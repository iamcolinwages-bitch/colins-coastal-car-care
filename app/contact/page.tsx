'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Phone, Mail, Clock, MapPin, Send, AlertCircle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Simulate submission - in production, send email via Resend
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              Have questions? We're here to help! Reach out to us anytime.
            </p>
          </div>
        </section>

        <div className="relative py-32 md:py-40 mesh-bg">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Get in Touch</h2>

              <div className="space-y-8">
                <div className="group modern-card p-6 md:p-8 hover:scale-105">
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-14 h-14 md:w-16 md:h-16 glass-strong rounded-2xl flex items-center justify-center">
                        <Phone className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 text-lg md:text-xl">Phone</h3>
                      <a
                        href="tel:4696183423"
                        className="text-gray-300 hover:text-primary transition-colors text-lg md:text-xl font-semibold"
                      >
                        (469) 618-3423
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group modern-card p-6 md:p-8 hover:scale-105">
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-14 h-14 md:w-16 md:h-16 glass-strong rounded-2xl flex items-center justify-center">
                        <Mail className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-bold mb-2 text-lg md:text-xl">Email</h3>
                      <a
                        href="mailto:iamcolinwages@gmail.com"
                        className="text-gray-300 hover:text-primary transition-colors text-base md:text-lg font-semibold break-all"
                      >
                        iamcolinwages@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="group modern-card p-6 md:p-8 hover:scale-105">
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-14 h-14 md:w-16 md:h-16 glass-strong rounded-2xl flex items-center justify-center">
                        <Clock className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 text-lg md:text-xl">Hours</h3>
                      <div className="text-gray-300 text-base md:text-lg space-y-1">
                        <div className="font-semibold">Monday - Saturday</div>
                        <div>7:00 AM - 7:30 PM</div>
                        <div className="mt-2 text-sm text-gray-500">Sunday: Closed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group modern-card p-6 md:p-8 hover:scale-105">
                  <div className="flex items-start gap-5">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-14 h-14 md:w-16 md:h-16 glass-strong rounded-2xl flex items-center justify-center">
                        <MapPin className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 text-lg md:text-xl">Service Areas</h3>
                      <div className="text-gray-300 text-base md:text-lg space-y-1">
                        <div>Naples</div>
                        <div>Marco Island</div>
                        <div>Bonita Springs</div>
                        <div>Estero</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 modern-card p-8 ring-2 ring-white shadow-2xl shadow-white/20">
                <h3 className="text-white font-bold mb-6 text-xl md:text-2xl">Prefer to Book Directly?</h3>
                <div className="space-y-4">
                  <a
                    href="/booking"
                    className="block w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white text-center py-4 md:py-5 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl text-lg"
                  >
                    Schedule Service
                  </a>
                  <a
                    href="/quote"
                    className="block w-full glass-strong hover:bg-white/10 border border-white/20 hover:border-white/40 text-white text-center py-4 md:py-5 rounded-xl font-bold transition-all hover:scale-105 hover:shadow-xl text-lg"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="modern-card p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Send us a Message</h2>

                {submitted ? (
                  <div className="glass-strong border border-primary/30 rounded-2xl p-10 text-center shadow-xl shadow-primary/10">
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
                      <div className="relative w-20 h-20 glass-strong rounded-2xl flex items-center justify-center">
                        <Send className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-gray-300 mb-8 text-lg">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-primary hover:text-red-400 font-bold text-lg transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label className="block text-white font-bold mb-3 text-base">
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full glass border ${
                          errors.name ? 'border-red-500' : 'border-white/10'
                        } text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-white font-bold mb-3 text-base">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full glass border ${
                          errors.email ? 'border-red-500' : 'border-white/10'
                        } text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-white font-bold mb-3 text-base">
                        Phone <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full glass border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-base min-h-[50px]`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="mb-8">
                      <label className="block text-white font-bold mb-3 text-base">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        rows={6}
                        className={`w-full glass border ${
                          errors.message ? 'border-red-500' : 'border-white/10'
                        } text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all text-base`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white py-5 rounded-xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
