import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_SERVICE_TYPES = new Set(['tour', 'rental', 'souvenir']);
const ALLOWED_METHODS = new Set(['whatsapp', 'contact_form']);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const serviceType = String(body.serviceType || '');
    const method = String(body.method || '');
    const serviceName = String(body.serviceName || '').slice(0, 255);
    const price = Number(body.price || 0);

    if (
      !ALLOWED_SERVICE_TYPES.has(serviceType) ||
      !ALLOWED_METHODS.has(method) ||
      !serviceName ||
      Number.isNaN(price)
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Lightweight endpoint for custom conversion telemetry. Page-view analytics
    // are persisted separately in /api/track; this keeps booking clicks from
    // producing client-side 404 noise until a dedicated events table exists.
    if (process.env.NODE_ENV === 'development') {
      console.log('[analytics/booking-click]', {
        serviceType,
        serviceName,
        price,
        method,
        referrer: body.referrer || null,
      });
    }

    return NextResponse.json(
      { ok: true },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json({ ok: true });
  }
}
