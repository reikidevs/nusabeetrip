'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { generateWhatsAppContactURL } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';
import { localizedPath } from '@/lib/site-config';
import HomepageSEO, { HOMEPAGE_FAQ } from '@/components/seo/HomepageSEO';
import QuickTripPlanner, { type TripIntent } from '@/components/business/QuickTripPlanner';

const Testimonials = dynamic(
  () => import('@/components/business').then((mod) => mod.Testimonials),
  {
    ssr: true,
    loading: () => <div className='mx-auto h-40 max-w-7xl animate-pulse bg-slate-50' aria-hidden='true' />,
  },
);

const CHECK_PATH = 'M5 13l4 4L19 7';

export default function Home() {
  const { t, language } = useLanguage();
  const copy = t.homepage;
  const [selectedIntent, setSelectedIntent] = useState<TripIntent | null>(null);
  const localHref = (path: string) => localizedPath(path, language);
  const homepageFaq = HOMEPAGE_FAQ[language];
  const directMessage = language === 'id'
    ? 'Halo Sidiq, saya membutuhkan bantuan untuk merencanakan perjalanan di Nusa Penida. Bisa bantu saya mulai dari detail yang perlu dikirim?'
    : 'Hi Sidiq, I need help planning a Nusa Penida trip. Could you help me start with the details you need?';
  const ideas: Array<{ key: 'oneDay' | 'twoDays' | 'snorkel' | 'driver'; intent: TripIntent; image: string; span: string }> = [
    { key: 'oneDay', intent: 'famousHighlights', image: '/images/West%20Trip/West%20Trip%20Kelingking%20Beach%205.jpeg', span: 'lg:col-span-7' },
    { key: 'twoDays', intent: 'twoDays', image: '/images/East%20Trip/East%20trip%20VIEW%20THOUSAND%20ISLAND.jpeg', span: 'lg:col-span-5' },
    { key: 'snorkel', intent: 'snorkelLand', image: '/images/snorkeling-manta-rays/snorkeling-manta-rays-nusa-penida-3.jpeg', span: 'lg:col-span-5' },
    { key: 'driver', intent: 'driverOnly', image: '/images/Vehicle%20Rentals/Car%20with%20Driver.jpg', span: 'lg:col-span-7' },
  ];

  const handleUsePlan = (intent: TripIntent) => {
    setSelectedIntent(intent);
    requestAnimationFrame(() => document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <>
      <HomepageSEO language={language} />

      <section className='relative overflow-hidden bg-[#f2f7fb]' aria-label={copy.hero.eyebrow}>
        <div className='pointer-events-none absolute -left-36 top-16 h-72 w-72 rounded-full bg-brand-teal-100/60 blur-3xl' aria-hidden='true' />
        <div className='mx-auto grid max-w-7xl items-center gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8 lg:py-20'>
          <div className='relative z-10'>
            <div className='inline-flex items-center gap-2 rounded-lg border border-brand-blue-200 bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-blue-800 shadow-sm sm:text-xs'>
              <span className='h-2 w-2 rounded-full bg-orange-500' aria-hidden='true' />
              {copy.hero.eyebrow}
            </div>
            <h1 className='mt-5 max-w-3xl text-[2.05rem] font-bold leading-[1.12] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-[3.5rem]'>
              {copy.hero.title}
            </h1>
            <p className='mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-lg sm:leading-8'>{copy.hero.subtitle}</p>
            <div className='mt-7 flex flex-col gap-3 min-[430px]:flex-row'>
              <a href='#trip-planner' className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-blue-800 px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_-16px_rgba(30,64,175,0.9)] transition hover:-translate-y-0.5 hover:bg-brand-blue-900'>
                {copy.hero.primaryCta}
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
              </a>
              <a
                href={generateWhatsAppContactURL(directMessage, language)}
                target='_blank'
                rel='noopener noreferrer'
                data-analytics-handled='true'
                data-analytics-context='homepage_hero_direct'
                onClick={() => trackWhatsAppClick('homepage_hero_direct')}
                className='inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-teal-500 hover:text-brand-blue-800'>
                <svg className='h-5 w-5 text-whatsapp-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.4-4 8-9 8a10 10 0 01-4.3-.9L3 20l1.4-3.7A7.2 7.2 0 013 12c0-4.4 4-8 9-8s9 3.6 9 8z' /></svg>
                {copy.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className='relative mx-auto w-full max-w-xl lg:mx-0'>
            <div className='absolute -right-3 -top-3 h-full w-full rounded-[1.4rem] border border-brand-blue-200 bg-white sm:-right-5 sm:-top-5' aria-hidden='true' />
            <div className='relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-slate-200 shadow-[0_28px_60px_-36px_rgba(15,23,42,0.65)]'>
              <Image src='/images/West%20Trip/West%20Trip%20Kelingking%20Beach%204.jpeg' alt={copy.hero.imageAlt} fill priority sizes='(min-width: 1024px) 48vw, 100vw' className='object-cover' />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent' />
              <div className='absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl border border-white/20 bg-slate-950/75 px-4 py-3 text-white backdrop-blur-sm'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-sm font-black'>S</span>
                <p className='text-xs font-medium leading-5 sm:text-sm'>{copy.hero.localNote}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-y border-slate-200/80 bg-white/90'>
          <div className='mx-auto grid max-w-7xl grid-cols-2 gap-px bg-slate-200 px-4 sm:grid-cols-4 sm:px-6 lg:px-8'>
            {Object.values(copy.hero.proof).map((item) => (
              <div key={item} className='flex min-h-[62px] items-center gap-2.5 bg-white px-3 py-3 text-xs font-semibold leading-5 text-slate-700 sm:min-h-[70px] sm:text-sm'>
                <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-teal-50 text-brand-teal-700'><svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.2} d={CHECK_PATH} /></svg></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuickTripPlanner selectedIntent={selectedIntent} onIntentChange={setSelectedIntent} />

      <section className='bg-white py-16 sm:py-24' aria-labelledby='trip-ideas-title'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <header className='max-w-3xl'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-700'>{copy.ideas.eyebrow}</p>
            <h2 id='trip-ideas-title' className='mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl'>{copy.ideas.title}</h2>
            <p className='mt-4 text-sm leading-6 text-slate-600 sm:text-base'>{copy.ideas.description}</p>
          </header>

          <div className='mt-9 grid gap-4 lg:grid-cols-12 lg:gap-5'>
            {ideas.map((item) => {
              const idea = copy.ideas[item.key];
              const wide = item.key === 'oneDay' || item.key === 'driver';
              return (
                <article key={item.key} className={`group overflow-hidden rounded-2xl border border-slate-200 bg-[#fbfcfd] shadow-[0_18px_50px_-44px_rgba(15,23,42,0.7)] ${item.span} ${wide ? 'md:grid md:grid-cols-[0.95fr_1.05fr]' : ''}`}>
                  <div className={`relative overflow-hidden bg-slate-200 ${wide ? 'min-h-[230px]' : 'aspect-[16/10]'}`}>
                    <Image src={item.image} alt={idea.imageAlt} fill sizes={wide ? '(min-width: 1024px) 30vw, 100vw' : '(min-width: 1024px) 40vw, 100vw'} className='object-cover transition duration-700 group-hover:scale-[1.03]' />
                    <span className='absolute left-4 top-4 rounded-lg bg-slate-950/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm'>{idea.tag}</span>
                  </div>
                  <div className='flex flex-col items-start justify-center p-5 sm:p-6'>
                    <h3 className='text-xl font-bold leading-7 text-slate-950'>{idea.title}</h3>
                    <p className='mt-3 text-sm leading-6 text-slate-600'>{idea.description}</p>
                    <button type='button' onClick={() => handleUsePlan(item.intent)} className='mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-blue-800 transition hover:gap-3 hover:text-brand-teal-700'>
                      {copy.ideas.usePlan}
                      <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14m-6-6l6 6-6 6' /></svg>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className='bg-[#0b2746] py-16 text-white sm:py-24' aria-labelledby='route-guide-title'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14'>
            <header>
              <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-300'>{copy.routes.eyebrow}</p>
              <h2 id='route-guide-title' className='mt-3 text-3xl font-bold tracking-tight sm:text-5xl'>{copy.routes.title}</h2>
              <p className='mt-4 text-sm leading-6 text-blue-100/75 sm:text-base'>{copy.routes.description}</p>
              <Link href={localHref('/tours')} className='mt-7 inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10'>
                {copy.routes.browseTours}
                <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14m-6-6l6 6-6 6' /></svg>
              </Link>
            </header>

            <div className='grid gap-3 sm:grid-cols-2'>
              <article className='rounded-2xl border border-white/10 bg-white p-5 text-slate-900 shadow-xl sm:p-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-[11px] font-black uppercase tracking-[0.18em] text-orange-700'>01 / West</span>
                  <span className='h-2.5 w-2.5 rounded-full bg-orange-500' aria-hidden='true' />
                </div>
                <h3 className='mt-4 text-xl font-bold'>{copy.routes.westTitle}</h3>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{copy.routes.westDescription}</p>
                <p className='mt-5 border-l-2 border-orange-400 pl-3 text-sm font-semibold leading-6 text-slate-800'>{copy.routes.westSpots}</p>
              </article>
              <article className='rounded-2xl border border-white/10 bg-white p-5 text-slate-900 shadow-xl sm:p-6'>
                <div className='flex items-center justify-between'>
                  <span className='text-[11px] font-black uppercase tracking-[0.18em] text-brand-teal-700'>02 / East</span>
                  <span className='h-2.5 w-2.5 rounded-full bg-brand-teal-500' aria-hidden='true' />
                </div>
                <h3 className='mt-4 text-xl font-bold'>{copy.routes.eastTitle}</h3>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{copy.routes.eastDescription}</p>
                <p className='mt-5 border-l-2 border-brand-teal-400 pl-3 text-sm font-semibold leading-6 text-slate-800'>{copy.routes.eastSpots}</p>
              </article>
              <article className='rounded-2xl border border-brand-teal-400/30 bg-brand-teal-900/50 p-5 sm:col-span-2 sm:p-6'>
                <div className='grid gap-4 sm:grid-cols-[0.8fr_1.2fr] sm:items-center'>
                  <div>
                    <span className='text-[11px] font-black uppercase tracking-[0.18em] text-brand-teal-300'>03 / Selected highlights</span>
                    <h3 className='mt-3 text-xl font-bold'>{copy.routes.combinedTitle}</h3>
                  </div>
                  <div>
                    <p className='text-sm leading-6 text-white'>{copy.routes.combinedDescription}</p>
                    <p className='mt-2 text-xs leading-5 text-blue-100/70'>{copy.routes.combinedSpots}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-[#eef7f6] py-16 sm:py-24' aria-labelledby='exact-price-title'>
        <div className='mx-auto grid max-w-7xl gap-9 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-8'>
          <header>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-800'>{copy.pricing.eyebrow}</p>
            <h2 id='exact-price-title' className='mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl'>{copy.pricing.title}</h2>
            <p className='mt-4 text-sm leading-6 text-slate-600 sm:text-base'>{copy.pricing.description}</p>
          </header>
          <div>
            <ol className='grid gap-3 sm:grid-cols-2'>
              {Object.values(copy.pricing.factors).map((factor, index) => (
                <li key={factor} className='flex min-h-[76px] items-center gap-4 rounded-xl border border-teal-100 bg-white px-4 py-3 shadow-[0_12px_32px_-28px_rgba(15,23,42,0.65)]'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-teal-50 text-xs font-black text-brand-teal-800'>{String(index + 1).padStart(2, '0')}</span>
                  <span className='text-sm font-semibold leading-5 text-slate-800'>{factor}</span>
                </li>
              ))}
            </ol>
            <div className='mt-4 rounded-2xl border-l-4 border-orange-400 bg-white p-5 shadow-[0_18px_44px_-36px_rgba(15,23,42,0.7)] sm:p-6'>
              <div className='flex gap-4'>
                <svg className='mt-0.5 h-6 w-6 shrink-0 text-orange-600' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.6-4.4A11.9 11.9 0 0112 3a11.9 11.9 0 01-8.6 2.6A12 12 0 003 9c0 5.6 3.8 10.3 9 11.7 5.2-1.4 9-6.1 9-11.7 0-1.2-.1-2.3-.4-3.4z' /></svg>
                <div>
                  <h3 className='text-base font-bold text-slate-950'>{copy.pricing.quoteTitle}</h3>
                  <p className='mt-1.5 text-sm leading-6 text-slate-600'>{copy.pricing.quoteDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-white py-16 sm:py-24' aria-labelledby='process-title'>
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <header className='text-center'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-blue-700'>{copy.process.eyebrow}</p>
            <h2 id='process-title' className='mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl'>{copy.process.title}</h2>
          </header>
          <ol className='relative mt-10 grid gap-4 md:grid-cols-3 md:gap-0'>
            <div className='absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-slate-200 md:block' aria-hidden='true' />
            {Object.values(copy.process.steps).map((step, index) => (
              <li key={step.title} className='relative rounded-xl border border-slate-200 bg-white p-5 md:border-0 md:px-7 md:text-center'>
                <span className='relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border-4 border-white bg-brand-blue-800 text-sm font-black text-white shadow-md md:mx-auto'>{index + 1}</span>
                <h3 className='mt-4 text-lg font-bold text-slate-950'>{step.title}</h3>
                <p className='mt-2 text-sm leading-6 text-slate-600'>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Testimonials />
      <section className='bg-[#f8fafc] py-16 sm:py-24' aria-labelledby='homepage-faq-title' id='faq'>
        <div className='mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-8'>
          <header>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-700'>{copy.faq.eyebrow}</p>
            <h2 id='homepage-faq-title' className='mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl'>{copy.faq.title}</h2>
            <p className='mt-4 text-sm leading-6 text-slate-600 sm:text-base'>{copy.faq.description}</p>
          </header>
          <div className='divide-y divide-slate-200 border-y border-slate-200'>
            {homepageFaq.map((item, index) => (
              <details key={item.question} className='group py-5' open={index === 0 ? true : undefined}>
                <summary className='flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-bold leading-6 text-slate-900'>
                  <span>{item.question}</span>
                  <span className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-brand-blue-700 shadow-sm'>
                    <svg className='h-4 w-4 transition group-open:rotate-180' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' /></svg>
                  </span>
                </summary>
                <p className='mt-3 max-w-3xl pr-9 text-sm leading-6 text-slate-600 sm:text-base'>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className='relative overflow-hidden bg-brand-blue-950 py-16 text-white sm:py-24' aria-labelledby='final-trip-brief-title'>
        <div className='absolute inset-y-0 right-0 hidden w-1/2 lg:block'>
          <Image src='/images/East%20Trip/East%20trip%20DIAMOND%20BEACH.jpeg' alt='' fill sizes='50vw' className='object-cover opacity-45' />
          <div className='absolute inset-0 bg-gradient-to-r from-brand-blue-950 via-brand-blue-950/60 to-transparent' />
        </div>
        <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='max-w-2xl'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-brand-teal-300'>{copy.finalCta.eyebrow}</p>
            <h2 id='final-trip-brief-title' className='mt-3 text-3xl font-bold tracking-tight sm:text-5xl'>{copy.finalCta.title}</h2>
            <p className='mt-4 max-w-xl text-sm leading-6 text-blue-100/80 sm:text-base'>{copy.finalCta.description}</p>
            <a href='#trip-planner' className='mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-blue-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-brand-teal-50'>
              {copy.finalCta.button}
              <svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' aria-hidden='true'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 12h14m-6-6l6 6-6 6' /></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
