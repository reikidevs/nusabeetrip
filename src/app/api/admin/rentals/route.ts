import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import { getRentalServices, updateRentalService } from '@/lib/db/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function guard(): NextResponse | null {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = guard();
  if (denied) return denied;
  try {
    const rentals = await getRentalServices();
    return NextResponse.json(
      { success: true, rentals },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json({ error: 'Failed to load rentals' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const denied = guard();
  if (denied) return denied;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const slug = body.slug as string;
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (typeof body.pricePerDayIdr === 'number' && body.pricePerDayIdr >= 0) {
    update.pricePerDayIdr = Math.round(body.pricePerDayIdr);
  }
  if (body.pricePerHourIdr === null) {
    update.pricePerHourIdr = null;
  } else if (typeof body.pricePerHourIdr === 'number' && body.pricePerHourIdr >= 0) {
    update.pricePerHourIdr = Math.round(body.pricePerHourIdr);
  }
  if (typeof body.isAvailable === 'boolean') update.isAvailable = body.isAvailable;
  if (Array.isArray(body.features)) {
    update.features = body.features.map((f: unknown) => String(f).trim()).filter(Boolean);
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  try {
    const updated = await updateRentalService(slug, update);
    if (!updated) {
      return NextResponse.json({ error: 'Rental not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, rental: updated });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
