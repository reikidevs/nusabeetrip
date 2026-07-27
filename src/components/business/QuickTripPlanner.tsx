'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import type { Language } from '@/lib/translations';
import { generateWhatsAppContactURL } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

export type TripIntent =
  | 'urgentDriver'
  | 'famousHighlights'
  | 'twoDays'
  | 'snorkelLand'
  | 'transfer'
  | 'driverOnly';

type DateMode = '' | 'today' | 'tomorrow' | 'custom';
type FormErrors = Partial<Record<'intent' | 'date' | 'guests' | 'pickup', string>>;

export type TripBriefData = {
  intent: string;
  date: string;
  guests: number;
  pickup: string;
  returnTime?: string;
  notes?: string;
};

type QuickTripPlannerProps = {
  selectedIntent?: TripIntent | null;
  onIntentChange?: (intent: TripIntent) => void;
};

const INTENT_ORDER: TripIntent[] = [
  'urgentDriver', 'famousHighlights', 'twoDays',
  'snorkelLand', 'transfer', 'driverOnly',
];

export function buildTripPlannerMessage(data: TripBriefData, language: Language): string {
  const until = data.returnTime?.trim();
  const notes = data.notes?.trim();
  if (language === 'id') {
    return `Halo Sidiq, saya ingin dibantu menyusun perjalanan di Nusa Penida.\n\nKebutuhan: ${data.intent}\nTanggal: ${data.date}\nJumlah tamu: ${data.guests}\nLokasi jemput: ${data.pickup.trim()}\nBatas waktu / fast boat pulang: ${until || 'Belum diisi'}\nCatatan: ${notes || 'Tidak ada'}\n\nMohon konfirmasi ketersediaan, rute yang paling realistis, apa saja yang termasuk, dan total harga pastinya. Terima kasih.`;
  }
  return `Hi Sidiq, I'd like help planning a Nusa Penida trip.\n\nNeed: ${data.intent}\nDate: ${data.date}\nGuests: ${data.guests}\nPickup: ${data.pickup.trim()}\nAvailable until / return boat: ${until || 'Not provided'}\nNotes: ${notes || 'None'}\n\nPlease confirm availability, the most practical route, what is included, and the exact total price. Thank you.`;
}

function formatCustomDate(value: string, language: Language): string {
  if (!value) return '';
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Intl.DateTimeFormat(language === 'id' ? 'id-ID' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).format(new Date(year, month - 1, day, 12));
}

function IntentIcon({ intent }: { intent: TripIntent }) {
  const paths: Record<TripIntent, string> = {
    urgentDriver: 'M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z',
    famousHighlights: 'M9 20l-5-2V5l5 2m0 13l6-3m-6 3V7m6 10l5 2V7l-5-3m0 13V4L9 7',
    twoDays: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    snorkelLand: 'M4 15s1-1 2-1 2 1 4 1 3-1 4-1 2 1 4 1m-14-4s1-1 2-1 2 1 4 1 3-1 4-1 2 1 4 1M12 3v4',
    transfer: 'M8 17l4 4 4-4m-4 4V3m7 4l-4-4-4 4',
    driverOnly: 'M6 17H5a2 2 0 01-2-2v-3l2-5h14l2 5v3a2 2 0 01-2 2h-1M7 17v2m10-2v2M6 12h12',
  };
  return <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.8} d={paths[intent]} /></svg>;
}

export default function QuickTripPlanner({ selectedIntent, onIntentChange }: QuickTripPlannerProps) {
  const { t, language } = useLanguage();
  const copy = t.homepage.planner;
  const [internalIntent, setInternalIntent] = useState<TripIntent | null>(null);
  const [dateMode, setDateMode] = useState<DateMode>('');
  const [customDate, setCustomDate] = useState('');
  const [guests, setGuests] = useState<number | ''>(2);
  const [pickup, setPickup] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showIntentChoices, setShowIntentChoices] = useState(!selectedIntent);

  const activeIntent = selectedIntent === undefined ? internalIntent : selectedIntent;
  const intents = useMemo(
    () => INTENT_ORDER.map((value, index) => ({ value, number: index + 1, ...copy.intents[value] })),
    [copy.intents],
  );
  const dateLabel = useMemo(() => {
    if (dateMode === 'today') return copy.today;
    if (dateMode === 'tomorrow') return copy.tomorrow;
    if (dateMode === 'custom') return formatCustomDate(customDate, language) || copy.notChosen;
    return copy.notChosen;
  }, [copy.notChosen, copy.today, copy.tomorrow, customDate, dateMode, language]);

  useEffect(() => {
    if (selectedIntent) setShowIntentChoices(false);
  }, [selectedIntent]);

  const clearError = (field: keyof FormErrors) => {
    setErrors((current) => {
      if (!(field in current)) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const selectIntent = (intent: TripIntent, scroll = false) => {
    if (selectedIntent === undefined) setInternalIntent(intent);
    onIntentChange?.(intent);
    setShowIntentChoices(false);
    clearError('intent');
    if (scroll) {
      const moveToDate = () => {
        const dateField = document.getElementById('planner-date');
        if (typeof dateField?.scrollIntoView === 'function') dateField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        dateField?.querySelector<HTMLInputElement>('input[name=trip-date-mode]')?.focus({ preventScroll: true });
      };
      if (typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(moveToDate);
      else moveToDate();
    }
  };

  const changeIntent = () => {
    setShowIntentChoices(true);
    const focusFirstChoice = () => {
      const mobileChoice = document.getElementById('trip-intent-mobile') as HTMLSelectElement | null;
      const desktopChoice = document.querySelector<HTMLInputElement>('input[name=trip-intent]');
      const useDesktopChoice = typeof window.matchMedia === 'function'
        && window.matchMedia('(min-width: 640px)').matches;
      (useDesktopChoice ? desktopChoice : mobileChoice)?.focus();
    };
    if (typeof window.requestAnimationFrame === 'function') window.requestAnimationFrame(focusFirstChoice);
    else focusFirstChoice();
  };

  const validate = () => {
    const next: FormErrors = {};
    if (!activeIntent) next.intent = copy.errors.intent;
    if (!dateMode || (dateMode === 'custom' && !customDate)) next.date = copy.errors.date;
    if (guests === '' || guests < 1) next.guests = copy.errors.guests;
    if (!pickup.trim()) next.pickup = copy.errors.pickup;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || !activeIntent) return;
    const message = buildTripPlannerMessage({
      intent: copy.intents[activeIntent].label,
      date: dateLabel,
      guests: Number(guests),
      pickup,
      returnTime,
      notes,
    }, language);
    trackWhatsAppClick('homepage_trip_planner');
    window.open(generateWhatsAppContactURL(message, language), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className='relative bg-[#f7fafc] pb-16 pt-10 sm:pb-24 sm:pt-16' aria-labelledby='quick-needs-title'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent' />
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <header className='mx-auto max-w-3xl text-center'>
          <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-700'>{copy.shortcutsEyebrow}</p>
          <h2 id='quick-needs-title' className='mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-4xl'>{copy.shortcutsTitle}</h2>
          <p className='mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base'>{copy.shortcutsDescription}</p>
        </header>

        <div className='mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-2.5 sm:mt-9 sm:grid-cols-3 sm:gap-3' aria-label={copy.shortcutsTitle}>
          {intents.map((intent) => {
            const active = activeIntent === intent.value;
            return (
              <button key={intent.value} type='button' onClick={() => selectIntent(intent.value, true)} aria-pressed={active}
                className={`group flex min-h-[82px] items-center gap-3 rounded-xl border px-3 py-3 text-left transition sm:min-h-[92px] sm:px-4 ${active ? 'border-brand-blue-700 bg-brand-blue-800 text-white shadow-lg' : 'border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-brand-teal-400 hover:shadow-md'}`}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-white/15' : 'bg-brand-teal-50 text-brand-teal-700'}`}><IntentIcon intent={intent.value} /></span>
                <span className='text-[13px] font-semibold leading-5 sm:text-sm'>{intent.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <div id='trip-planner' className='scroll-mt-24 pt-12 sm:pt-16'>
          <header className='mb-7 max-w-2xl sm:mb-10'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-700'>{copy.sectionEyebrow}</p>
            <h2 className='mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl'>{copy.title}</h2>
            <p className='mt-4 text-sm leading-6 text-slate-600 sm:text-base'>{copy.description}</p>
          </header>
          <form onSubmit={handleSubmit} noValidate className='grid items-start gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(330px,0.65fr)] lg:gap-7'>
            <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_65px_-48px_rgba(15,23,42,0.55)] sm:p-7 lg:p-8'>
              {Object.keys(errors).length > 0 && (
                <div role='alert' className='mb-6 flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-900'>
                  <svg className='mt-0.5 h-5 w-5 shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01M5 19h14L12 4 5 19z' /></svg>
                  {copy.errorSummary}
                </div>
              )}

              {activeIntent && !showIntentChoices ? (
                <div className='rounded-xl border border-brand-blue-200 bg-brand-blue-50 p-4' aria-label={copy.selectedNeed}>
                  <div className='flex items-start gap-3'>
                    <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-blue-800 text-white'><IntentIcon intent={activeIntent} /></span>
                    <div className='min-w-0 flex-1'>
                      <p className='text-[10px] font-bold uppercase tracking-[0.14em] text-brand-blue-700'>{copy.selectedNeed}</p>
                      <p className='mt-1 text-sm font-bold leading-5 text-slate-950'>{copy.intents[activeIntent].label}</p>
                      <p className='mt-1 text-xs leading-5 text-slate-600'>{copy.intents[activeIntent].description}</p>
                    </div>
                    <button type='button' onClick={changeIntent} className='shrink-0 rounded-lg border border-brand-blue-200 bg-white px-3 py-2 text-xs font-bold text-brand-blue-800 transition hover:border-brand-blue-500 hover:bg-brand-blue-100'>
                      {copy.changeNeed}
                    </button>
                  </div>
                </div>
              ) : (
                <fieldset aria-describedby='intent-hint intent-error'>
                  <legend className='text-base font-bold text-slate-950'>{copy.intentLegend}<span className='ml-2 text-[10px] uppercase tracking-wider text-orange-700'>{copy.required}</span></legend>
                  <p id='intent-hint' className='mt-1 text-xs leading-5 text-slate-500'>{copy.intentHint}</p>
                  <label htmlFor='trip-intent-mobile' className='mt-3 block sm:hidden'>
                    <span className='sr-only'>{copy.intentLegend}</span>
                    <select
                      id='trip-intent-mobile'
                      value={activeIntent || ''}
                      onChange={(event) => selectIntent(event.target.value as TripIntent)}
                      className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 focus:border-brand-teal-600 focus:ring-4 focus:ring-brand-teal-100'
                      aria-invalid={Boolean(errors.intent)}
                    >
                      <option value='' disabled>{copy.notChosen}</option>
                      {intents.map((intent) => (
                        <option key={intent.value} value={intent.value}>{intent.label}</option>
                      ))}
                    </select>
                  </label>
                  <div className='mt-3 hidden gap-2 sm:grid sm:grid-cols-2'>
                    {intents.map((intent) => {
                      const active = activeIntent === intent.value;
                      return (
                        <label key={intent.value} className={`relative flex cursor-pointer gap-3 rounded-xl border p-3.5 transition focus-within:ring-2 focus-within:ring-brand-teal-500 focus-within:ring-offset-2 ${active ? 'border-brand-blue-600 bg-brand-blue-50 ring-1 ring-brand-blue-600' : 'border-slate-200 hover:border-brand-teal-400 hover:bg-slate-50'}`}>
                          <input type='radio' name='trip-intent' value={intent.value} checked={active} onChange={() => selectIntent(intent.value)} className='sr-only' data-planner-intent={intent.value} />
                          <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-brand-blue-800 text-white' : 'bg-slate-100 text-slate-600'}`}><IntentIcon intent={intent.value} /></span>
                          <span>
                            <span className='block text-sm font-semibold leading-5 text-slate-900'>{intent.label}</span>
                            <span className='mt-1 block text-xs leading-4 text-slate-500'>{intent.description}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.intent && <p id='intent-error' className='mt-2 text-sm font-medium text-red-700'>{errors.intent}</p>}
                </fieldset>
              )}

              <div className='my-7 h-px bg-slate-200' />
              <fieldset id='planner-date' aria-describedby='date-error' className='scroll-mt-28'>
                <legend className='text-base font-bold text-slate-950'>{copy.dateLegend}<span className='ml-2 text-[10px] uppercase tracking-wider text-orange-700'>{copy.required}</span></legend>
                <div className='mt-3 grid grid-cols-3 gap-2'>
                  {(['today', 'tomorrow', 'custom'] as const).map((mode) => {
                    const labels = { today: copy.today, tomorrow: copy.tomorrow, custom: copy.chooseDate };
                    return (
                      <label key={mode} className={`cursor-pointer rounded-xl border px-2 py-3 text-center text-xs font-semibold transition focus-within:ring-2 focus-within:ring-brand-teal-500 focus-within:ring-offset-2 sm:text-sm ${dateMode === mode ? 'border-brand-blue-600 bg-brand-blue-800 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-teal-400'}`}>
                        <input type='radio' name='trip-date-mode' value={mode} checked={dateMode === mode} onChange={() => { setDateMode(mode); clearError('date'); }} className='sr-only' />
                        {labels[mode]}
                      </label>
                    );
                  })}
                </div>
                {dateMode === 'custom' && (
                  <div className='mt-3'>
                    <label htmlFor='trip-date' className='mb-1.5 block text-sm font-semibold text-slate-800'>{copy.dateInputLabel}</label>
                    <input id='trip-date' type='date' value={customDate} onChange={(event) => { setCustomDate(event.target.value); clearError('date'); }} className='w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-teal-600 focus:ring-4 focus:ring-brand-teal-100' aria-invalid={Boolean(errors.date)} />
                  </div>
                )}
                {errors.date && <p id='date-error' className='mt-2 text-sm font-medium text-red-700'>{errors.date}</p>}
              </fieldset>

              <div className='mt-6 grid gap-5 sm:grid-cols-2'>
                <label htmlFor='trip-guests'>
                  <span className='block text-sm font-bold text-slate-900'>{copy.guestsLabel}<span className='ml-2 text-[10px] uppercase tracking-wider text-orange-700'>{copy.required}</span></span>
                  <input id='trip-guests' type='number' min='1' max='20' value={guests} onChange={(event) => { setGuests(event.target.value === '' ? '' : Number(event.target.value)); clearError('guests'); }} className='mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-brand-teal-600 focus:ring-4 focus:ring-brand-teal-100' aria-invalid={Boolean(errors.guests)} aria-describedby='guests-hint guests-error' />
                  <span id='guests-hint' className='mt-1.5 block text-xs text-slate-500'>{copy.guestsHint}</span>
                  {errors.guests && <span id='guests-error' className='mt-1.5 block text-sm font-medium text-red-700'>{errors.guests}</span>}
                </label>
                <label htmlFor='trip-pickup'>
                  <span className='block text-sm font-bold text-slate-900'>{copy.pickupLabel}<span className='ml-2 text-[10px] uppercase tracking-wider text-orange-700'>{copy.required}</span></span>
                  <input id='trip-pickup' type='text' value={pickup} onChange={(event) => { setPickup(event.target.value); clearError('pickup'); }} placeholder={copy.pickupPlaceholder} className='mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base placeholder:text-slate-400 focus:border-brand-teal-600 focus:ring-4 focus:ring-brand-teal-100' aria-invalid={Boolean(errors.pickup)} aria-describedby='pickup-error' />
                  {errors.pickup && <span id='pickup-error' className='mt-1.5 block text-sm font-medium text-red-700'>{errors.pickup}</span>}
                </label>
              </div>

              <label htmlFor='trip-return' className='mt-5 block'>
                <span className='block text-sm font-bold text-slate-900'>{copy.returnLabel}<span className='ml-2 text-[10px] uppercase tracking-wider text-slate-400'>{copy.optional}</span></span>
                <input id='trip-return' type='text' value={returnTime} onChange={(event) => setReturnTime(event.target.value)} placeholder={copy.returnPlaceholder} className='mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base placeholder:text-slate-400 focus:border-brand-teal-600 focus:ring-4 focus:ring-brand-teal-100' />
              </label>
              <label htmlFor='trip-notes' className='mt-5 block'>
                <span className='block text-sm font-bold text-slate-900'>{copy.notesLabel}<span className='ml-2 text-[10px] uppercase tracking-wider text-slate-400'>{copy.optional}</span></span>
                <textarea id='trip-notes' rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder={copy.notesPlaceholder} className='mt-2 w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-base leading-6 placeholder:text-slate-400 focus:border-brand-teal-600 focus:ring-4 focus:ring-brand-teal-100' />
              </label>
            </div>
            <aside className='overflow-hidden rounded-2xl bg-brand-blue-950 text-white shadow-[0_24px_65px_-35px_rgba(15,23,42,0.75)] lg:sticky lg:top-28' aria-live='polite'>
              <header className='border-b border-white/10 bg-white/[0.04] px-5 py-5 sm:px-6'>
                <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-brand-teal-300'>{copy.summaryEyebrow}</p>
                <h3 className='mt-2 text-xl font-bold'>{copy.summaryTitle}</h3>
                <p className='mt-1 text-xs leading-5 text-blue-100/75'>{copy.summaryHint}</p>
              </header>
              <dl className='divide-y divide-white/10 px-5 sm:px-6'>
                {[
                  [copy.summaryNeed, activeIntent ? copy.intents[activeIntent].label : copy.notChosen],
                  [copy.summaryDate, dateLabel],
                  [copy.summaryGuests, `${guests || 0} ${copy.guestUnit}`],
                  [copy.summaryPickup, pickup.trim() || copy.notProvided],
                  [copy.summaryReturn, returnTime.trim() || copy.notProvided],
                  [copy.summaryNotes, notes.trim() || copy.none],
                ].map(([term, value]) => (
                  <div key={term} className='grid grid-cols-[92px_1fr] gap-3 py-3.5'>
                    <dt className='text-xs font-medium text-blue-100/65'>{term}</dt>
                    <dd className='break-words text-sm font-medium leading-5'>{value}</dd>
                  </div>
                ))}
              </dl>
              <div className='p-5 sm:p-6'>
                <button type='submit' className='flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-whatsapp-dark focus-visible:ring-4 focus-visible:ring-green-300/50'>
                  <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.4-4 8-9 8a10 10 0 01-4.3-.9L3 20l1.4-3.7A7.2 7.2 0 013 12c0-4.4 4-8 9-8s9 3.6 9 8z' /></svg>
                  {copy.sendCta}
                </button>
                <p className='mt-3 text-center text-[11px] leading-5 text-blue-100/65'>{copy.sendHint}</p>
              </div>
            </aside>
          </form>
        </div>
      </div>
    </section>
  );
}
