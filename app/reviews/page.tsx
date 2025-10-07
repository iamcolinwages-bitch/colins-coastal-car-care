'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Star, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  service_type: string | null;
  created_at: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    reviewText: '',
    serviceType: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    reviewText: '',
  });

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await supabase
          .from('reviews')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (data) setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const validateEmail = (email: string) => {
    if (!email) return true; // Email is optional
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      reviewText: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.reviewText.trim()) {
      newErrors.reviewText = 'Review text is required';
      isValid = false;
    } else if (formData.reviewText.trim().length < 20) {
      newErrors.reviewText = 'Review must be at least 20 characters';
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

    try {
      const { error } = await supabase.from('reviews').insert({
        customer_name: formData.name,
        email: formData.email,
        rating: formData.rating,
        review_text: formData.reviewText,
        service_type: formData.serviceType || null,
        status: 'pending',
      });

      if (error) throw error;

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        rating: 5,
        reviewText: '',
        serviceType: '',
      });
      setErrors({
        name: '',
        email: '',
        reviewText: '',
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
        }`}
      />
    ));
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

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
              What Our Customers Say
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex gap-1">{renderStars(5)}</div>
              <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{averageRating}</span>
              <span className="text-xl text-white/90">({reviews.length} reviews)</span>
            </div>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
              Real stories from Southwest Florida drivers living their best coastal life
            </p>
          </div>
        </section>

        {/* Submit Review Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-black via-gray-950 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Leave a Review
              </h2>
              <p className="text-xl text-gray-400 font-light">
                Share your experience with Colin's Coastal Car Care
              </p>
            </div>

            {submitted ? (
              <div className="modern-card p-10 text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-60"></div>
                  <div className="relative w-20 h-20 glass-strong rounded-2xl flex items-center justify-center mx-auto">
                    <Star className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  Your review has been submitted and is pending approval. It will appear once
                  approved by our team.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setShowForm(false);
                  }}
                  className="text-primary hover:text-red-600 font-semibold text-lg transition-colors min-h-[48px] px-6"
                >
                  Submit Another Review
                </button>
              </div>
            ) : !showForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 text-white px-12 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="modern-card p-10">
                <div className="mb-8">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full min-h-[50px] glass border ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    } text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors text-base`}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Email (optional, won't be displayed)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full min-h-[50px] glass border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary transition-colors text-base`}
                    placeholder="your.email@example.com (optional)"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Service Type (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    placeholder="e.g. Premium Interior Detail"
                    className="w-full min-h-[50px] glass border border-gray-700 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary text-base"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-white font-semibold mb-4 text-lg">
                    Rating <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: num })}
                        className="min-w-[48px] min-h-[48px] flex items-center justify-center focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-10 h-10 ${
                            num <= formData.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-base text-gray-400 mt-3">
                    {formData.rating === 5 && "Excellent!"}
                    {formData.rating === 4 && "Very Good"}
                    {formData.rating === 3 && "Good"}
                    {formData.rating === 2 && "Fair"}
                    {formData.rating === 1 && "Poor"}
                  </p>
                </div>

                <div className="mb-8">
                  <label className="block text-white font-semibold mb-3 text-lg">
                    Your Review <span className="text-primary">*</span>
                  </label>
                  <textarea
                    value={formData.reviewText}
                    onChange={(e) => {
                      setFormData({ ...formData, reviewText: e.target.value });
                      if (errors.reviewText) setErrors({ ...errors, reviewText: '' });
                    }}
                    rows={6}
                    className={`w-full glass border ${
                      errors.reviewText ? 'border-red-500' : 'border-gray-700'
                    } text-white px-5 py-4 rounded-xl focus:outline-none focus:border-primary resize-none transition-colors text-base leading-relaxed`}
                    placeholder="Tell us about your experience... (minimum 20 characters)"
                  />
                  {errors.reviewText && (
                    <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.reviewText}
                    </p>
                  )}
                  <p className="text-sm text-gray-400 mt-3">
                    {formData.reviewText.length} characters
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setErrors({ name: '', email: '', reviewText: '' });
                    }}
                    className="flex-1 min-h-[56px] glass border border-gray-700 hover:border-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 min-h-[56px] bg-gradient-to-r from-primary to-red-700 hover:from-red-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="relative py-32 md:py-40 mesh-bg">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {loading ? (
              <div className="text-center py-32">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-6" />
                <div className="text-xl text-gray-400">Loading reviews...</div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-32">
                <div className="w-20 h-20 glass-strong rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-primary" />
                </div>
                <div className="text-xl text-gray-400">No reviews yet. Be the first to leave one!</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="group modern-card p-8 hover:scale-105 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-300 mb-6 line-clamp-4 leading-relaxed text-base">{review.review_text}</p>
                    <div className="border-t border-white/10 pt-6">
                      <div className="font-semibold text-white text-lg">{review.customer_name}</div>
                      {review.service_type && (
                        <div className="text-sm text-gray-400 mt-1">{review.service_type}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
