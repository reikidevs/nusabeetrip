'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export interface BreadcrumbItem {
  /** Default (English) label */
  label: string;
  /** Optional Indonesian label override */
  labelId?: string;
  /** Route path. Use the same path for the current page; the last item becomes
   *  the active page automatically. */
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  /** Container variant. `bar` adds a subtle band background, `inline` strips it. */
  variant?: 'bar' | 'inline';
  className?: string;
}

const HOME_LABEL = { en: 'Home', id: 'Beranda' };

/**
 * Visual breadcrumb navigation.
 *
 * - The `Home` step is added automatically — pages only need to pass their own
 *   trail ([{ label: 'Tours', labelId: 'Tur', href: '/tours' }]).
 * - Renders Schema.org BreadcrumbList microdata; pair with the JSON-LD
 *   `breadcrumbJsonLd` helper in `lib/seo.ts` for full SEO coverage.
 * - The `bar` variant gives the breadcrumb its own band so it feels intentional
 *   on top of hero sections and doesn't visually fight the page title.
 */
export default function BreadcrumbNav({
  items,
  variant = 'bar',
  className = '',
}: BreadcrumbNavProps) {
  const { language } = useLanguage();

  // Always start with Home, then the page-provided trail.
  const fullTrail: BreadcrumbItem[] = [
    { label: HOME_LABEL.en, labelId: HOME_LABEL.id, href: '/' },
    ...items,
  ];

  const wrapperClass =
    variant === 'bar'
      ? 'border-b border-gray-100 bg-gradient-to-b from-gray-50/80 to-white'
      : '';

  return (
    <div className={`${wrapperClass} ${className}`}>
      <nav
        aria-label="Breadcrumb"
        className={`container mx-auto px-4 ${variant === 'bar' ? 'py-3 sm:py-3.5' : ''}`}
      >
        <ol
          className="flex items-center gap-1 flex-wrap text-[13px] sm:text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {fullTrail.map((item, idx) => {
            const isLast = idx === fullTrail.length - 1;
            const isFirst = idx === 0;
            const label = language === 'id' && item.labelId ? item.labelId : item.label;

            return (
              <li
                key={`${item.href}-${idx}`}
                className="flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {/* Separator before every item except the first */}
                {!isFirst && (
                  <svg
                    className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mx-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}

                {isLast ? (
                  <span
                    className="font-semibold text-brand-blue-800 px-2 py-1 rounded-md bg-brand-blue-50/60"
                    itemProp="name"
                    aria-current="page"
                  >
                    {label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-gray-600 hover:text-brand-blue-800 hover:bg-gray-100/80 transition-colors"
                    itemProp="item"
                  >
                    {isFirst && (
                      <svg
                        className="w-3.5 h-3.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                    <span itemProp="name">{label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(idx + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
