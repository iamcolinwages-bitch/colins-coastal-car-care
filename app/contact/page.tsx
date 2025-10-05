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
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Have questions? We're here to help! Reach out to us anytime.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:4696183423"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      (469) 618-3423
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:iamColinwages@gmail.com"
                      className="text-gray-400 hover:text-primary transition-colors break-all"
                    >
                      iamColinwages@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Hours</h3>
                    <div className="text-gray-400">
                      <div>Monday - Saturday</div>
                      <div>7:00 AM - 7:30 PM</div>
                      <div className="mt-2 text-sm">Sunday: Closed</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Service Areas</h3>
                    <div className="text-gray-400">
                      <div>Naples</div>
                      <div>Marco Island</div>
                      <div>Bonita Springs</div>
                      <div>Estero</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-white font-bold mb-4">Prefer to Book Directly?</h3>
                <div className="space-y-3">
                  <a
                    href="/booking"
                    className="block w-full bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    Schedule Service
                  </a>
                  <a
                    href="/quote"
                    className="block w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

                {submitted ? (
                  <div className="bg-black border border-primary rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-6">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-primary hover:text-primary-dark font-semibold"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-white font-semibold mb-2">
                        Name <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        className={`w-full bg-black border ${
                          errors.name ? 'border-red-500' : 'border-gray-800'
                        } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white font-semibold mb-2">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full bg-black border ${
                          errors.email ? 'border-red-500' : 'border-gray-800'
                        } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-white font-semibold mb-2">
                        Phone <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full bg-black border ${
                          errors.phone ? 'border-red-500' : 'border-gray-800'
                        } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors`}
                        placeholder="(123) 456-7890"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-white font-semibold mb-2">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: '' });
                        }}
                        rows={5}
                        className={`w-full bg-black border ${
                          errors.message ? 'border-red-500' : 'border-gray-800'
                        } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary resize-none transition-colors`}
                        placeholder="How can we help you?"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
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
    </>
  );
}
