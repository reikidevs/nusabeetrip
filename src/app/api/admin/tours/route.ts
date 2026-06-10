import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import { getTourPackages, updateTourPackage } from '@/lib/db/queries';

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
    const tours = await getTourPackages();
    return NextResponse.json(
      { success: true, tours },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return NextResponse.json({ error: 'Failed to load tours' }, { status: 500 });
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
  if (typeof body.priceIdr === 'number' && body.priceIdr >= 0) update.priceIdr = Math.round(body.priceIdr);
  if (typeof body.durationHours === 'number' && body.durationHours > 0) update.durationHours = Math.round(body.durationHours);
  if (typeof body.description === 'string') update.description = body.description.trim();
  if (typeof body.isActive === 'boolean') update.isActive = body.isActive;
  if (Array.isArray(body.features)) {
    update.features = body.features.map((f: unknown) => String(f).trim()).filter(Boolean);
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  try {
    const updated = await updateTourPackage(slug, update);
    if (!updated) {
      return NextResponse.json({ error: 'Tour not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, tour: updated });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
