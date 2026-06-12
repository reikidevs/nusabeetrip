'use client';

import { usePathname } from 'next/navigation';
import { Layout } from '@/components';

/**
 * Decides whether a route gets the public site chrome (Header + Footer).
 *
 * Admin routes (/admin/*) render bare — they supply their own chrome via
 * AdminShell, so the public navbar/footer must not appear there. Every other
 * route is wrapped in the standard public Layout.
 */
export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isAdmin) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
}
