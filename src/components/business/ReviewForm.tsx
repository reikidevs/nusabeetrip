'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultTour?: string;
}

const TOUR_OPTIONS = [
  'West Trip',
  'East Trip',
  'Mix Trip (West & East)',
  'West Trip + Snorkeling',
  'East Trip + Snorkeling',
  "Snorkeling with Manta Ray's",
  'Yamaha N-Max Rental',
  'Honda Vario Rental',
  'Honda Scoopy Rental',
  'Car with Driver',
  'Other',
];

const COUNTRY_OPTIONS = [
  { name: 'Indonesia', code: 'ID' },
  { name: 'Australia', code: 'AU' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'Germany', code: 'DE' },
  { name: 'France', code: 'FR' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Japan', code: 'JP' },
  { name: 'South Korea', code: 'KR' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'China', code: 'CN' },
  { name: 'India', code: 'IN' },
  { name: 'Other', code: 'XX' },
];

/**
 * Google-style review submission form (modal).
 * Submits to /api/reviews endpoint with moderation.
 */
export default function ReviewForm({ isOpen, onClose, onSuccess, defaultTour }: ReviewFormProps) {
  const { language } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorCountry, setAuthorCountry] = useState('');
  const [authorCountryCode, setAuthorCountryCode] = useState('');
  const [tour, setTour] = useState(defaultTour || '');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const labels = {
    en: {
      title: 'Write a Review',
      subtitle: 'Share your experience with NusaBeeTrip',
      ratingLabel: 'Your rating',
      ratingHint: 'Tap a star to rate',
      ratingValues: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
      nameLabel: 'Your name',
      namePlaceholder: 'e.g. John D.',
      emailLabel: 'Email (optional)',
      emailPlaceholder: 'name@example.com',
      emailHint: 'Not shown publicly. Only for verification.',
      countryLabel: 'Country',
      countryPlaceholder: 'Select country',
      tourLabel: 'Tour or service taken',
      tourPlaceholder: 'Select package',
      titleLabel: 'Review title (optional)',
      titlePlaceholder: 'Sum up your experience',
      bodyLabel: 'Your review',
      bodyPlaceholder: 'Tell us about your experience. What did you love? Any suggestions? (min. 20 characters)',
      bodyHint: 'characters',
      submit: 'Post review',
      submitting: 'Posting...',
      cancel: 'Cancel',
      successTitle: 'Thank you!',
      successMessage: 'Your review has been submitted and will appear after moderation. We appreciate your feedback!',
      done: 'Done',
      errorRequired: 'Please fill in all required fields',
      errorMinChars: 'Review must be at least 20 characters',
      errorRating: 'Please select a rating',
      privacyNote: 'By submitting, you agree your review may be shown publicly on this website.',
    },
    id: {
      title: 'Tulis Ulasan',
      subtitle: 'Bagikan pengalamanmu bersama NusaBeeTrip',
      ratingLabel: 'Rating Anda',
      ratingHint: 'Ketuk bintang untuk memberi rating',
      ratingValues: ['Buruk', 'Cukup', 'Baik', 'Sangat Baik', 'Luar Biasa'],
      nameLabel: 'Nama Anda',
      namePlaceholder: 'mis. Budi S.',
      emailLabel: 'Email (opsional)',
      emailPlaceholder: 'nama@contoh.com',
      emailHint: 'Tidak ditampilkan publik. Hanya untuk verifikasi.',
      countryLabel: 'Negara',
      countryPlaceholder: 'Pilih negara',
      tourLabel: 'Paket atau layanan yang diambil',
      tourPlaceholder: 'Pilih paket',
      titleLabel: 'Judul ulasan (opsional)',
      titlePlaceholder: 'Ringkasan pengalaman Anda',
      bodyLabel: 'Ulasan Anda',
      bodyPlaceholder: 'Ceritakan pengalaman Anda. Apa yang Anda sukai? Saran? (min. 20 karakter)',
      bodyHint: 'karakter',
      submit: 'Kirim ulasan',
      submitting: 'Mengirim...',
      cancel: 'Batal',
      successTitle: 'Terima kasih!',
      successMessage: 'Ulasan Anda telah dikirim dan akan tampil setelah dimoderasi. Terima kasih atas masukan Anda!',
      done: 'Selesai',
      errorRequired: 'Mohon lengkapi semua field yang wajib diisi',
      errorMinChars: 'Ulasan minimal 20 karakter',
      errorRating: 'Mohon pilih rating',
      privacyNote: 'Dengan mengirim, Anda setuju ulasan dapat ditampilkan publik di website ini.',
    },
  };
  const L = labels[language];

  // Reset form when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSuccess(false);
        setError('');
      }, 300);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError(L.errorRating);
      return;
    }
    if (!authorName.trim() || !body.trim()) {
      setError(L.errorRequired);
      return;
    }
    if (body.trim().length < 20) {
      setError(L.errorMinChars);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim() || undefined,
          authorCountry: authorCountry || undefined,
          authorCountryCode: authorCountryCode || undefined,
          rating,
          title: title.trim() || undefined,
          body: body.trim(),
          language,
          tourName: tour || undefined,
          serviceType: tour.toLowerCase().includes('rental') ? 'rental' : 'tour',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.errors?.join(', ') || data.error || 'Submission failed');
      }

      setSuccess(true);
      // Reset form
      setRating(0);
      setAuthorName('');
      setAuthorEmail('');
      setAuthorCountry('');
      setAuthorCountryCode('');
      setTour('');
      setTitle('');
      setBody('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-form-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl my-8 max-h-[calc(100vh-4rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            {/* Brand-style icon */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue-700 to-brand-teal-600 flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>
              <h2 id="review-form-title" className="text-lg font-bold text-gray-900">
                {L.title}
              </h2>
              <p className="text-xs text-gray-500">{L.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{L.successTitle}</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{L.successMessage}</p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-blue-800 hover:bg-brand-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              {L.done}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Star rating — Google style */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {L.ratingLabel}
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 hover:scale-110 transition-transform"
                      aria-label={`Rate ${star} stars`}
                    >
                      <svg
                        className={`w-9 h-9 ${filled ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  );
                })}
                <span className="ml-3 text-sm font-semibold text-gray-700">
                  {(hoverRating || rating) > 0 ? L.ratingValues[(hoverRating || rating) - 1] : L.ratingHint}
                </span>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="authorName" className="block text-sm font-medium text-gray-900 mb-1.5">
                {L.nameLabel} <span className="text-red-500">*</span>
              </label>
              <input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder={L.namePlaceholder}
                maxLength={100}
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition text-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-900 mb-1.5">
                {L.emailLabel}
              </label>
              <input
                id="authorEmail"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder={L.emailPlaceholder}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">{L.emailHint}</p>
            </div>

            {/* Country */}
            <div>
              <label htmlFor="authorCountry" className="block text-sm font-medium text-gray-900 mb-1.5">
                {L.countryLabel}
              </label>
              <select
                id="authorCountry"
                value={authorCountryCode}
                onChange={(e) => {
                  const code = e.target.value;
                  setAuthorCountryCode(code);
                  const country = COUNTRY_OPTIONS.find((c) => c.code === code);
                  setAuthorCountry(country?.name || '');
                }}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition text-gray-900 bg-white"
              >
                <option value="">{L.countryPlaceholder}</option>
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tour */}
            <div>
              <label htmlFor="tour" className="block text-sm font-medium text-gray-900 mb-1.5">
                {L.tourLabel}
              </label>
              <select
                id="tour"
                value={tour}
                onChange={(e) => setTour(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition text-gray-900 bg-white"
              >
                <option value="">{L.tourPlaceholder}</option>
                {TOUR_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-1.5">
                {L.titleLabel}
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={L.titlePlaceholder}
                maxLength={150}
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition text-gray-900"
              />
            </div>

            {/* Body */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-900 mb-1.5">
                {L.bodyLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={L.bodyPlaceholder}
                rows={5}
                maxLength={2000}
                required
                className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none transition text-gray-900 resize-y"
              />
              <p className="text-xs text-gray-500 mt-1 text-right">
                {body.length} / 2000 {L.bodyHint}
              </p>
            </div>

            {/* Privacy note */}
            <p className="text-xs text-gray-500 leading-relaxed">{L.privacyNote}</p>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2 sticky bottom-0 bg-white pb-1">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {L.cancel}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-5 py-2.5 bg-brand-blue-800 hover:bg-brand-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {L.submitting}
                  </>
                ) : (
                  L.submit
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
