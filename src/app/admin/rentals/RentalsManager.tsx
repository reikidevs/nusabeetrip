'use client';

import { useState, useEffect, useCallback } from 'react';

interface Rental {
  id: number;
  slug: string;
  model: string;
  vehicleType: string;
  pricePerDayIdr: number;
  pricePerHourIdr: number | null;
  isAvailable: boolean | null;
}

export default function RentalsManager() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedSlug, setSavedSlug] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/rentals', { cache: 'no-store' });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRentals(data.rentals || []);
    } catch {
      setError('Could not load rentals.');
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
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 h-28 animate-pulse" />
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
      {rentals.map((r) => (
        <RentalCard
          key={r.id}
          rental={r}
          onSaved={() => {
            setSavedSlug(r.slug);
            setTimeout(() => setSavedSlug(''), 2500);
            load();
          }}
          justSaved={savedSlug === r.slug}
        />
      ))}
    </div>
  );
}

function RentalCard({
  rental,
  onSaved,
  justSaved,
}: {
  rental: Rental;
  onSaved: () => void;
  justSaved: boolean;
}) {
  const [perDay, setPerDay] = useState(rental.pricePerDayIdr);
  const [perHour, setPerHour] = useState<number | ''>(
    rental.pricePerHourIdr ?? '',
  );
  const [available, setAvailable] = useState(rental.isAvailable ?? true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const dirty =
    perDay !== rental.pricePerDayIdr ||
    (perHour === '' ? null : Number(perHour)) !== rental.pricePerHourIdr ||
    available !== (rental.isAvailable ?? true);

  const save = async () => {
    setSaving(true);
    setErr('');
    try {
      const res = await fetch('/api/admin/rentals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: rental.slug,
          pricePerDayIdr: perDay,
          pricePerHourIdr: perHour === '' ? null : Number(perHour),
          isAvailable: available,
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
        <div>
          <h3 className="font-bold text-gray-900">{rental.model}</h3>
          <span className="text-xs text-gray-400 capitalize">{rental.vehicleType}</span>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Available</span>
          <button
            type="button"
            onClick={() => setAvailable((v) => !v)}
            className={`relative w-10 h-6 rounded-full transition-colors ${
              available ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                available ? 'translate-x-4' : ''
              }`}
            />
          </button>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Price per day (IDR)
          </label>
          <input
            type="number"
            value={perDay}
            onChange={(e) => setPerDay(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Price per hour (IDR) — optional
          </label>
          <input
            type="number"
            value={perHour}
            placeholder="Leave blank if none"
            onChange={(e) =>
              setPerHour(e.target.value === '' ? '' : Number(e.target.value))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 outline-none"
          />
        </div>
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
