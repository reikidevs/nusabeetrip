'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Sends a cookieless page-view beacon on every route change.
 *
 * Uses navigator.sendBeacon when available so the request does not block
 * navigation or get cancelled on unload. Only runs in production to keep the
 * dev database clean.
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!pathname || pathname.startsWith('/admin')) return;

    const payload = JSON.stringify({
      path: pathname,
      referrer: document.referrer || null,
    });

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Never let tracking break the page.
    }
  }, [pathname]);

  return null;
}
