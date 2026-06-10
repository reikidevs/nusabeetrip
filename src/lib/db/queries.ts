import { eq, desc, and, sql as drizzleSql } from 'drizzle-orm';
import { db } from './config';
import { 
  tourPackages, 
  rentalServices, 
  contactInquiries, 
  seoData,
  pageViews,
  reviews,
  type NewContactInquiry,
  type NewPageView,
  type NewSeoData,
  type NewReview,
  type Review
} from './schema';

// Tour Package Queries
export const getTourPackages = async () => {
  return await db
    .select()
    .from(tourPackages)
    .where(eq(tourPackages.isActive, true))
    .orderBy(tourPackages.priceIdr);
};

export const getTourPackageBySlug = async (slug: string) => {
  const result = await db
    .select()
    .from(tourPackages)
    .where(eq(tourPackages.slug, slug))
    .limit(1);
  
  return result[0] || null;
};

// Rental Service Queries
export const getRentalServices = async () => {
  return await db
    .select()
    .from(rentalServices)
    .where(eq(rentalServices.isAvailable, true))
    .orderBy(rentalServices.vehicleType, rentalServices.pricePerDayIdr);
};

export const getRentalServiceBySlug = async (slug: string) => {
  const result = await db
    .select()
    .from(rentalServices)
    .where(eq(rentalServices.slug, slug))
    .limit(1);
  
  return result[0] || null;
};

// Contact Inquiry Operations
export const createContactInquiry = async (inquiry: NewContactInquiry) => {
  const result = await db
    .insert(contactInquiries)
    .values(inquiry)
    .returning();
  
  return result[0];
};

export const getContactInquiries = async (limit = 50) => {
  return await db
    .select()
    .from(contactInquiries)
    .orderBy(desc(contactInquiries.createdAt))
    .limit(limit);
};

// SEO Data Operations
export const getSeoDataByPath = async (pagePath: string) => {
  const result = await db
    .select()
    .from(seoData)
    .where(eq(seoData.pagePath, pagePath))
    .limit(1);
  
  return result[0] || null;
};

export const upsertSeoData = async (data: NewSeoData) => {
  const existing = await getSeoDataByPath(data.pagePath);
  
  if (existing) {
    const result = await db
      .update(seoData)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(seoData.pagePath, data.pagePath))
      .returning();
    
    return result[0];
  } else {
    const result = await db
      .insert(seoData)
      .values(data)
      .returning();
    
    return result[0];
  }
};

// Analytics Operations
export const trackPageView = async (pageViewData: NewPageView) => {
  const result = await db
    .insert(pageViews)
    .values(pageViewData)
    .returning();
  
  return result[0];
};

export const getPageViewStats = async (pagePath?: string, days = 30) => {
  const query = db
    .select()
    .from(pageViews)
    .orderBy(desc(pageViews.createdAt));
  
  if (pagePath) {
    query.where(eq(pageViews.pagePath, pagePath));
  }
  
  return await query.limit(1000);
};


/* ─────────────────────────────────────────────────────────────────── */
/*  Reviews / Testimonials Queries                                      */
/* ─────────────────────────────────────────────────────────────────── */

/** Get all approved reviews for public display (homepage, etc.) */
export const getApprovedReviews = async (limit = 50): Promise<Review[]> => {
  return await db
    .select()
    .from(reviews)
    .where(eq(reviews.status, 'approved'))
    .orderBy(desc(reviews.isFeatured), desc(reviews.createdAt))
    .limit(limit);
};

/** Get reviews filtered by language (for UI filter) */
export const getApprovedReviewsByLanguage = async (
  language: 'en' | 'id',
  limit = 50,
): Promise<Review[]> => {
  return await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.status, 'approved'), eq(reviews.language, language)))
    .orderBy(desc(reviews.isFeatured), desc(reviews.createdAt))
    .limit(limit);
};

/** Get reviews for a specific tour/service */
export const getReviewsByTourSlug = async (tourSlug: string): Promise<Review[]> => {
  return await db
    .select()
    .from(reviews)
    .where(and(eq(reviews.status, 'approved'), eq(reviews.tourSlug, tourSlug)))
    .orderBy(desc(reviews.createdAt));
};

/** Submit a new review (defaults to 'pending' status for moderation) */
export const createReview = async (review: NewReview): Promise<Review> => {
  const result = await db
    .insert(reviews)
    .values({
      ...review,
      status: review.status || 'pending',
    })
    .returning();
  return result[0];
};

/** Get pending reviews (admin moderation queue) */
export const getPendingReviews = async (limit = 50): Promise<Review[]> => {
  return await db
    .select()
    .from(reviews)
    .where(eq(reviews.status, 'pending'))
    .orderBy(desc(reviews.createdAt))
    .limit(limit);
};

/** Approve or reject a review (admin action) */
export const moderateReview = async (
  id: number,
  status: 'approved' | 'rejected' | 'spam',
  moderatedBy: string,
  rejectionReason?: string,
): Promise<Review> => {
  const result = await db
    .update(reviews)
    .set({
      status,
      moderatedAt: new Date(),
      moderatedBy,
      rejectionReason,
      updatedAt: new Date(),
    })
    .where(eq(reviews.id, id))
    .returning();
  return result[0];
};

/** Add owner response to a review */
export const respondToReview = async (
  id: number,
  ownerResponse: string,
): Promise<Review> => {
  const result = await db
    .update(reviews)
    .set({
      ownerResponse,
      ownerRespondedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(reviews.id, id))
    .returning();
  return result[0];
};

/** Pin/unpin a review to top */
export const setReviewFeatured = async (id: number, isFeatured: boolean): Promise<Review> => {
  const result = await db
    .update(reviews)
    .set({ isFeatured, updatedAt: new Date() })
    .where(eq(reviews.id, id))
    .returning();
  return result[0];
};

/** Get aggregate rating stats for SEO schema */
export const getReviewStats = async (): Promise<{
  ratingValue: number;
  reviewCount: number;
  ratingDistribution: Record<number, number>;
}> => {
  const allApproved = await db
    .select()
    .from(reviews)
    .where(eq(reviews.status, 'approved'));

  if (allApproved.length === 0) {
    return { ratingValue: 5, reviewCount: 0, ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
  }

  const sum = allApproved.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / allApproved.length;
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  allApproved.forEach((r) => {
    distribution[r.rating] = (distribution[r.rating] || 0) + 1;
  });

  return {
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: allApproved.length,
    ratingDistribution: distribution,
  };
};

/** Mark review as helpful (increment counter) */
export const incrementReviewHelpful = async (id: number): Promise<Review> => {
  const result = await db
    .update(reviews)
    .set({ helpfulCount: drizzleSql`${reviews.helpfulCount} + 1` })
    .where(eq(reviews.id, id))
    .returning();
  return result[0];
};


/* ─────────────────────────────────────────────────────────────────── */
/*  Admin-only review queries                                           */
/* ─────────────────────────────────────────────────────────────────── */

/** Get every review regardless of status (admin moderation view). */
export const getAllReviews = async (limit = 200): Promise<Review[]> => {
  return await db
    .select()
    .from(reviews)
    .orderBy(desc(reviews.createdAt))
    .limit(limit);
};

/** Permanently delete a review. */
export const deleteReview = async (id: number): Promise<void> => {
  await db.delete(reviews).where(eq(reviews.id, id));
};

/** Counts grouped by status — used by the admin overview cards. */
export const getReviewStatusCounts = async (): Promise<Record<string, number>> => {
  const rows = await db.select().from(reviews);
  const counts: Record<string, number> = {
    pending: 0,
    approved: 0,
    rejected: 0,
    spam: 0,
    total: rows.length,
  };
  rows.forEach((r) => {
    const s = r.status || 'pending';
    counts[s] = (counts[s] || 0) + 1;
  });
  return counts;
};


/* ─────────────────────────────────────────────────────────────────── */
/*  Admin: tour & rental edits                                          */
/* ─────────────────────────────────────────────────────────────────── */

export interface TourUpdateInput {
  priceIdr?: number;
  durationHours?: number;
  description?: string;
  isActive?: boolean;
  features?: string[];
}

/** Update editable fields of a tour package by slug. */
export const updateTourPackage = async (
  slug: string,
  input: TourUpdateInput,
) => {
  const result = await db
    .update(tourPackages)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(tourPackages.slug, slug))
    .returning();
  return result[0] || null;
};

export interface RentalUpdateInput {
  pricePerDayIdr?: number;
  pricePerHourIdr?: number | null;
  isAvailable?: boolean;
  features?: string[];
}

/** Update editable fields of a rental service by slug. */
export const updateRentalService = async (
  slug: string,
  input: RentalUpdateInput,
) => {
  const result = await db
    .update(rentalServices)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(rentalServices.slug, slug))
    .returning();
  return result[0] || null;
};


/* ─────────────────────────────────────────────────────────────────── */
/*  Admin: analytics aggregation                                        */
/* ─────────────────────────────────────────────────────────────────── */

export interface AnalyticsSummary {
  totalViews: number;
  viewsLast7: number;
  viewsLast30: number;
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  dailySeries: { date: string; views: number }[];
}

/** Aggregate page-view analytics for the admin dashboard. */
export const getAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const rows = await db.select().from(pageViews).orderBy(desc(pageViews.createdAt)).limit(20000);

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  const since7 = now - 7 * DAY;
  const since30 = now - 30 * DAY;

  let viewsLast7 = 0;
  let viewsLast30 = 0;
  const pageCounts = new Map<string, number>();
  const refCounts = new Map<string, number>();
  const dailyCounts = new Map<string, number>();

  // Seed the last 30 day buckets so the chart has continuous days.
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now - i * DAY);
    dailyCounts.set(d.toISOString().split('T')[0], 0);
  }

  for (const row of rows) {
    const ts = row.createdAt ? new Date(row.createdAt).getTime() : 0;
    if (ts >= since30) viewsLast30 += 1;
    if (ts >= since7) viewsLast7 += 1;

    const path = row.pagePath || '/';
    pageCounts.set(path, (pageCounts.get(path) || 0) + 1);

    // Normalize referrer to its hostname; treat empty as "Direct".
    let ref = 'Direct';
    if (row.referrer) {
      try {
        ref = new URL(row.referrer).hostname.replace(/^www\./, '') || 'Direct';
      } catch {
        ref = 'Direct';
      }
    }
    refCounts.set(ref, (refCounts.get(ref) || 0) + 1);

    if (ts >= since30) {
      const key = new Date(ts).toISOString().split('T')[0];
      if (dailyCounts.has(key)) dailyCounts.set(key, (dailyCounts.get(key) || 0) + 1);
    }
  }

  const topPages = Array.from(pageCounts.entries())
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 12);

  const topReferrers = Array.from(refCounts.entries())
    .map(([referrer, views]) => ({ referrer, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  const dailySeries = Array.from(dailyCounts.entries()).map(([date, views]) => ({
    date,
    views,
  }));

  return {
    totalViews: rows.length,
    viewsLast7,
    viewsLast30,
    topPages,
    topReferrers,
    dailySeries,
  };
};
