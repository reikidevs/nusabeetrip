'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

interface BreadcrumbItem {
  label: string;
  labelId?: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Visual breadcrumb navigation component.
 * Renders accessible breadcrumbs with proper ARIA attributes.
 * Pair with JSON-LD BreadcrumbList schema in the page for maximum SEO impact.
 */
export default function BreadcrumbNav({ items, className = '' }: BreadcrumbNavProps) {
  const { language } = useLanguage();

  return (
    <nav
      aria-label="Breadcrumb"
      className={`text-sm text-gray-500 ${className}`}
    >
      <ol
        className="flex items-center gap-1.5 flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const label = language === 'id' && item.labelId ? item.labelId : item.label;

          return (
            <li
              key={item.href}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  className="text-brand-blue-800 font-medium"
                  itemProp="name"
                  aria-current="page"
                >
                  {label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="hover:text-brand-blue-700 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{label}</span>
                  </Link>
                  <svg
                    className="w-3.5 h-3.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
              <meta itemProp="position" content={String(idx + 1)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
