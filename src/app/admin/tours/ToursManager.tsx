'use client';

import { useState, useEffect, useCallback } from 'react';

interface Tour {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  priceIdr: number;
  durationHours: number | null;
  isActive: boolean | null;
  features: unknown;
}

export default function ToursManager() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedSlug, setSavedSlug] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/tours', { cache: 'no-store' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTours(data.tours || []);
    } catch {
      setError('Could not load tours.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-40 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tours.map((t) => (
        <TourCard
          key={t.id}
          tour={t}
          onSaved={() => {
            setSavedSlug(t.slug);
            setTimeout(() => setSavedSlug(''), 2500);
            load();
          }}
          justSaved={savedSlug === t.slug}
        />
      ))}
    </div>
  );
}

function TourCard({
  tour,
  onSaved,
  justSaved,
}: {
  tour: Tour;
  onSaved: () => void;
  justSaved: boolean;
}) {
  const [price, setPrice] = useState(tour.priceIdr);
  const [duration, setDuration] = useState(tour.durationHours || 8);
  const [description, setDescription] = useState(tour.description || '');
  const [isActive, setIsActive] = useState(tour.isActive ?? true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const dirty =
    price !== tour.priceIdr ||
    duration !== (tour.durationHours || 8) ||
    description !== (tour.description || '') ||
    isActive !== (tour.isActive ?? true);

  const save = async () => {
    setSaving(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/tours', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: tour.slug,
          priceIdr: price,
          durationHours: duration,
          description,
          isActive,
        }),
      });
      if (!res.ok) throw new Error();
      onSaved();
    } catch {
      setErr('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">{tour.name}</h3>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Active</span>
          <button
            type="button"
            onClick={() => setIsActive((v) => !v)}
            className={`relative w-10 h-6 rounded-full transition-colors ${
              isActive ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                isActive ? 'translate-x-4' : ''
              }`}
            />
          </button>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Price (IDR)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Duration (hours)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-500 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none resize-y"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={!dirty || saving}
          className="text-sm font-semibold bg-brand-blue-800 hover:bg-brand-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        {justSaved && <span className="text-sm text-green-600 font-medium">Saved ✓</span>}
        {err && <span className="text-sm text-red-600">{err}</span>}
        {dirty && !justSaved && (
          <span className="text-xs text-amber-600">Unsaved changes</span>
        )}
      </div>
    </div>
  );
}
