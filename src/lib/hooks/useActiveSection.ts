'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Watch the homepage and report the id of the section currently anchored
 * under the sticky header. Used to highlight scroll-anchored nav links
 * (e.g. /#testimonials) when the user actually reaches that section.
 *
 * Returns null on every other page or when no tracked section is in view.
 *
 * @param sectionIds DOM ids to track, in any order.
 * @param onlyOnPath Only run on this pathname (default: '/').
 */
export function useActiveSection(
  sectionIds: string[],
  onlyOnPath: string = '/',
): string | null {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== onlyOnPath) {
      setActiveId(null);
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Trigger zone: just below the sticky header. A section is "active"
    // while its top lives inside this slim band near the top of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          // Pick the one whose top is closest to the trigger band's top.
          const next = intersecting.reduce((best, current) =>
            current.boundingClientRect.top > best.boundingClientRect.top ? best : current,
          );
          setActiveId(next.target.id);
        } else {
          // No tracked section in the trigger band — clear so the fallback
          // (e.g. Home) takes over.
          setActiveId(null);
        }
      },
      {
        // Top margin matches header height so the section "activates"
        // right when its title slides under the header.
        // Bottom margin keeps the band thin so we do not light up the link
        // until the user has actually scrolled into the section.
        rootMargin: '-96px 0px -60% 0px',
        threshold: [0, 0.01, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, onlyOnPath, sectionIds.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}
