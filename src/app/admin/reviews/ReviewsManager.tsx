'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

interface AdminReview {
  id: number;
  authorName: string;
  authorCountry: string | null;
  authorCountryCode: string | null;
  rating: number;
  title: string | null;
  body: string;
  language: string | null;
  tourName: string | null;
  status: string;
  source: string | null;
  isFeatured: boolean | null;
  isVerified: boolean | null;
  ownerResponse: string | null;
  createdAt: string;
}

type Filter = 'all' | 'pending' | 'approved' | 'rejected' | 'spam';

const STATUS_STYLES: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  rejected: 'bg-gray-100 text-gray-500',
  spam: 'bg-red-100 text-red-600',
};

export default function ReviewsManager() {
  const params = useSearchParams();
  const initialFilter = (params.get('status') as Filter) || 'all';

  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [replyingId, setReplyingId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/reviews', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setError('Could not load reviews. Check your connection and refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (id: number, action: string, extra?: Record<string, unknown>) => {
    setBusyId(id);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, ...extra }),
      });
      if (!res.ok) throw new Error('Action failed');
      await load();
    } catch {
      setError('Action failed. Please try again.');
    } finally {
      setBusyId(null);
      setReplyingId(null);
      setReplyText('');
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this review permanently? This cannot be undone.')) return;
    setBusyId(id);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      await load();
    } catch {
      setError('Delete failed. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
    spam: reviews.filter((r) => r.status === 'spam').length,
  };

  const filtered =
    filter === 'all' ? reviews : reviews.filter((r) => r.status === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'approved', label: 'Approved' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'spam', label: 'Spam' },
  ];

  return (
    <div>
      {/* Toolbar: filter tabs + add button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                filter === t.key
                  ? 'bg-brand-blue-800 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 ${filter === t.key ? 'text-white/70' : 'text-gray-400'}`}>
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add review
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse h-32" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          No reviews in this category.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <article
              key={r.id}
              className="bg-white rounded-2xl border border-gray-100 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-blue-100 text-brand-blue-800 flex items-center justify-center font-semibold flex-shrink-0">
                    {r.authorName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900">{r.authorName}</span>
                      {r.isFeatured && (
                        <span className="text-[10px] font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                          Pinned
                        </span>
                      )}
                      {r.isVerified && (
                        <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {r.authorCountry || 'Unknown'} · {r.source || 'website'} ·{' '}
                      {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
                    STATUS_STYLES[r.status] || 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-2 text-amber-400 text-sm">
                {'★'.repeat(r.rating)}
                <span className="text-gray-200">{'★'.repeat(5 - r.rating)}</span>
                {r.tourName && (
                  <span className="ml-2 text-xs text-gray-400 font-normal">
                    · {r.tourName}
                  </span>
                )}
              </div>

              {r.title && (
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{r.title}</h3>
              )}
              <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>

              {r.ownerResponse && (
                <div className="mt-3 bg-gray-50 rounded-lg p-3 border-l-2 border-brand-blue-700">
                  <div className="text-[11px] font-semibold text-gray-700 mb-1">
                    Your reply
                  </div>
                  <p className="text-xs text-gray-600">{r.ownerResponse}</p>
                </div>
              )}

              {/* Reply input */}
              {replyingId === r.id && (
                <div className="mt-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={2}
                    placeholder="Write a public reply…"
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => act(r.id, 'reply', { reply: replyText })}
                      disabled={!replyText.trim() || busyId === r.id}
                      className="text-xs font-semibold bg-brand-blue-800 text-white px-3 py-1.5 rounded-lg disabled:opacity-50"
                    >
                      Save reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingId(null);
                        setReplyText('');
                      }}
                      className="text-xs font-semibold text-gray-500 px-3 py-1.5"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Action bar */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                {r.status !== 'approved' && (
                  <button
                    onClick={() => act(r.id, 'approve')}
                    disabled={busyId === r.id}
                    className="text-xs font-semibold bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg disabled:opacity-50"
                  >
                    Approve
                  </button>
                )}
                {r.status !== 'rejected' && (
                  <button
                    onClick={() => act(r.id, 'reject')}
                    disabled={busyId === r.id}
                    className="text-xs font-semibold bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg disabled:opacity-50"
                  >
                    Reject
                  </button>
                )}
                {r.status === 'approved' && (
                  <button
                    onClick={() => act(r.id, r.isFeatured ? 'unfeature' : 'feature')}
                    disabled={busyId === r.id}
                    className="text-xs font-semibold bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg disabled:opacity-50"
                  >
                    {r.isFeatured ? 'Unpin' : 'Pin to top'}
                  </button>
                )}
                <button
                  onClick={() => {
                    setReplyingId(r.id);
                    setReplyText(r.ownerResponse || '');
                  }}
                  className="text-xs font-semibold bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg"
                >
                  {r.ownerResponse ? 'Edit reply' : 'Reply'}
                </button>
                {r.status !== 'spam' && (
                  <button
                    onClick={() => act(r.id, 'spam')}
                    disabled={busyId === r.id}
                    className="text-xs font-semibold text-gray-400 hover:text-red-500 px-2 py-1.5"
                  >
                    Mark spam
                  </button>
                )}
                <button
                  onClick={() => remove(r.id)}
                  disabled={busyId === r.id}
                  className="text-xs font-semibold text-gray-400 hover:text-red-600 px-2 py-1.5 ml-auto"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {showAdd && (
        <AddReviewModal
          onClose={() => setShowAdd(false)}
          onSaved={() => {
            setShowAdd(false);
            load();
          }}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/*  Add review modal — for testimonials received via WhatsApp           */
/* ─────────────────────────────────────────────────────────────────── */

const COUNTRIES = [
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
  { name: 'Other', code: 'XX' },
];

const TOURS = [
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
];

function AddReviewModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [country, setCountry] = useState('');
  const [tour, setTour] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const submit = async () => {
    setErr('');
    if (!name.trim() || body.trim().length < 10) {
      setErr('Name and a review of at least 10 characters are required.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: name,
          authorCountry: country || undefined,
          authorCountryCode: countryCode || undefined,
          rating,
          title: title || undefined,
          body,
          language,
          tourName: tour || undefined,
          source: 'whatsapp',
          isFeatured: featured,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.errors?.join(', ') || data.error || 'Save failed');
      }
      onSaved();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg my-8 max-h-[calc(100vh-4rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-gray-900">Add a review</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            Use this to add testimonials guests sent you over WhatsApp. They are
            published and verified immediately, and count toward the star rating
            shown in Google.
          </p>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className={`w-9 h-9 text-2xl ${s <= rating ? 'text-amber-400' : 'text-gray-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah M."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
              <select
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  setCountry(COUNTRIES.find((c) => c.code === e.target.value)?.name || '');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
              >
                <option value="">Select…</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Tour / service</label>
              <select
                value={tour}
                onChange={(e) => setTour(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
              >
                <option value="">Select…</option>
                {TOURS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'id')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
              >
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title (optional)</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short summary"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Review *</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              placeholder="Paste the guest's words here…"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none resize-y"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded border-gray-300"
            />
            Pin to top of reviews
          </label>

          {err && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              {err}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={saving}
              className="flex-1 bg-brand-blue-800 hover:bg-brand-blue-700 text-white text-sm font-semibold py-2 rounded-lg disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Publish review'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
