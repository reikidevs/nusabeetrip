import { eq, desc } from 'drizzle-orm';
import { db } from './config';
import { 
  tourPackages, 
  rentalServices, 
  contactInquiries, 
  seoData,
  pageViews,
  type NewContactInquiry,
  type NewPageView,
  type NewSeoData
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