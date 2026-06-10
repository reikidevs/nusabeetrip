import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import {
  getAllReviews,
  moderateReview,
  respondToReview,
  setReviewFeatured,
  deleteReview,
  createReview,
} from '@/lib/db/queries';
import type { NewReview } from '@/lib/db/schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function guard(): NextResponse | null {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

/**
 * POST — manually add a review (e.g. one a guest sent over WhatsApp).
 * Admin-entered reviews are approved + verified immediately.
 */
export async function POST(request: NextRequest) {
  const denied = guard();
  if (denied) return denied;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const errors: string[] = [];
  if (!body.authorName || typeof body.authorName !== 'string') {
    errors.push('Name is required');
  }
  const rating = Math.round(Number(body.rating));
  if (!rating || rating < 1 || rating > 5) {
    errors.push('Rating must be 1–5');
  }
  if (!body.body || typeof body.body !== 'string' || body.body.trim().length < 10) {
    errors.push('Review text must be at least 10 characters');
  }
  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const review: NewReview = {
    authorName: String(body.authorName).trim(),
    authorCountry: body.authorCountry ? String(body.authorCountry).trim() : null,
    authorCountryCode: body.authorCountryCode
      ? String(body.authorCountryCode).toUpperCase().slice(0, 2)
      : null,
    rating,
    title: body.title ? String(body.title).trim() : null,
    body: String(body.body).trim(),
    language: body.language === 'id' ? 'id' : 'en',
    tourName: body.tourName ? String(body.tourName).trim() : null,
    serviceType:
      body.tourName && String(body.tourName).toLowerCase().includes('rental')
        ? 'rental'
        : 'tour',
    source: body.source || 'whatsapp',
    status: 'approved',
    isVerified: true,
    isFeatured: Boolean(body.isFeatured),
    moderatedAt: new Date(),
    moderatedBy: 'admin',
  };

  try {
    const created = await createReview(review);
    return NextResponse.json({ success: true, review: created }, { status: 201 });
  } catch (error) {
    console.error('[admin/reviews] create failed:', error);
    return NextResponse.json({ error: 'Could not save review' }, { status: 500 });
  }
}

/** GET — list all reviews for the moderation table. */
export async function GET() {
  const denied = guard();
  if (denied) return denied;

  try {
    const reviews = await getAllReviews(300);
    return NextResponse.json(
      { success: true, reviews },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('[admin/reviews] list failed:', error);
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
  }
}

/**
 * PATCH — perform a moderation action on a review.
 * Body: { id: number, action: 'approve'|'reject'|'spam'|'feature'|'unfeature'|'reply', reply?: string }
 */
export async function PATCH(request: NextRequest) {
  const denied = guard();
  if (denied) return denied;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const id = Number(body.id);
  const action = body.action as string;
  if (!id || !action) {
    return NextResponse.json({ error: 'Missing id or action' }, { status: 400 });
  }

  try {
    switch (action) {
      case 'approve':
        await moderateReview(id, 'approved', 'admin');
        break;
      case 'reject':
        await moderateReview(id, 'rejected', 'admin', body.reason);
        break;
      case 'spam':
        await moderateReview(id, 'spam', 'admin');
        break;
      case 'feature':
        await setReviewFeatured(id, true);
        break;
      case 'unfeature':
        await setReviewFeatured(id, false);
        break;
      case 'reply':
        if (!body.reply || typeof body.reply !== 'string') {
          return NextResponse.json({ error: 'Reply text required' }, { status: 400 });
        }
        await respondToReview(id, body.reply.trim());
        break;
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[admin/reviews] action failed:', error);
    return NextResponse.json({ error: 'Action failed' }, { status: 500 });
  }
}

/** DELETE — remove a review permanently. Body: { id: number } */
export async function DELETE(request: NextRequest) {
  const denied = guard();
  if (denied) return denied;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const id = Number(body.id);
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    await deleteReview(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[admin/reviews] delete failed:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
