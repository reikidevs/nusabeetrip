import { NextRequest, NextResponse } from 'next/server';
import { trackPageView } from '@/lib/db/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * First-party, cookieless page-view tracking.
 *
 * The client sends a tiny beacon on navigation. We store the path, a coarse
 * referrer, and user-agent so the admin analytics page can show which pages
 * get traffic — without Google Analytics or any third-party cookie.
 *
 * Bots and admin paths are filtered out. Failures are swallowed so tracking
 * never affects the user experience.
 */

const BOT_RE = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|preview/i;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body.path === 'string' ? body.path.slice(0, 255) : '';

    if (!path || path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ ok: true });
    }

    const ua = request.headers.get('user-agent') || '';
    if (BOT_RE.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    const referrer =
      typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : null;
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      null;

    // Fire and forget — do not block the response on the DB write.
    trackPageView({
      pagePath: path,
      userAgent: ua.slice(0, 500),
      referrer,
      ipAddress,
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
