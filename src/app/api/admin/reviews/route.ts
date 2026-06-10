import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import {
  getAllReviews,
  moderateReview,
  respondToReview,
  setReviewFeatured,
  deleteReview,
} from '@/lib/db/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function guard(): NextResponse | null {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
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
