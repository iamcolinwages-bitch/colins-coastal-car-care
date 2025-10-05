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
        {/* Header */}
        <section className="bg-gradient-to-r from-primary to-primary-dark py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Customer Reviews
            </h1>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex gap-1">{renderStars(5)}</div>
              <span className="text-3xl font-bold text-white">{averageRating}</span>
              <span className="text-white/80">({reviews.length} reviews)</span>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              See what our customers are saying about Colin's Coastal Car Care
            </p>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-gray-400">Loading reviews...</div>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400">No reviews yet. Be the first to leave one!</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-300 mb-4 line-clamp-4">{review.review_text}</p>
                    <div className="border-t border-gray-800 pt-4">
                      <div className="font-semibold text-white">{review.customer_name}</div>
                      {review.service_type && (
                        <div className="text-sm text-gray-400">{review.service_type}</div>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Submit Review Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Leave a Review
              </h2>
              <p className="text-gray-400">
                Share your experience with Colin's Coastal Car Care
              </p>
            </div>

            {submitted ? (
              <div className="bg-black border border-primary rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-400 mb-6">
                  Your review has been submitted and is pending approval. It will appear once
                  approved by our team.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setShowForm(false);
                  }}
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Submit Another Review
                </button>
              </div>
            ) : !showForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                >
                  Write a Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-black border border-gray-800 rounded-xl p-8">
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className={`w-full bg-gray-900 border ${
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

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">
                    Email (optional, won't be displayed)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full bg-gray-900 border ${
                      errors.email ? 'border-red-500' : 'border-gray-800'
                    } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary transition-colors`}
                    placeholder="your.email@example.com (optional)"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">
                    Service Type (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    placeholder="e.g. Premium Interior Detail"
                    className="w-full bg-gray-900 border border-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">
                    Rating <span className="text-primary">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: num })}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            num <= formData.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {formData.rating === 5 && "Excellent!"}
                    {formData.rating === 4 && "Very Good"}
                    {formData.rating === 3 && "Good"}
                    {formData.rating === 2 && "Fair"}
                    {formData.rating === 1 && "Poor"}
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-2">
                    Your Review <span className="text-primary">*</span>
                  </label>
                  <textarea
                    value={formData.reviewText}
                    onChange={(e) => {
                      setFormData({ ...formData, reviewText: e.target.value });
                      if (errors.reviewText) setErrors({ ...errors, reviewText: '' });
                    }}
                    rows={5}
                    className={`w-full bg-gray-900 border ${
                      errors.reviewText ? 'border-red-500' : 'border-gray-800'
                    } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-primary resize-none transition-colors`}
                    placeholder="Tell us about your experience... (minimum 20 characters)"
                  />
                  {errors.reviewText && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.reviewText}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    {formData.reviewText.length} characters
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setErrors({ name: '', email: '', reviewText: '' });
                    }}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
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
      </div>
    </>
  );
}
