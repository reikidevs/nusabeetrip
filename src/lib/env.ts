/**
 * Environment variables configuration and validation
 */

// Database configuration
export const DATABASE_URL = process.env.DATABASE_URL;
export const DIRECT_URL = process.env.DIRECT_URL;

// Email service configuration
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@nusabeetrip.com';
export const TO_EMAIL = process.env.TO_EMAIL || 'sidiqdwiatmoko@gmail.com';

// Next.js configuration
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// Analytics configuration
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;
export const GOOGLE_SEARCH_CONSOLE_ID = process.env.GOOGLE_SEARCH_CONSOLE_ID;

// Business configuration
export const BUSINESS_PHONE = process.env.BUSINESS_PHONE || '+62 896-3128-1234';
export const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'sidiqdwiatmoko@gmail.com';
export const BUSINESS_INSTAGRAM = process.env.BUSINESS_INSTAGRAM || 'sidiq_1312';
export const BUSINESS_NAME = process.env.BUSINESS_NAME || 'NusaBeeTrip';
export const BUSINESS_LOCATION = process.env.BUSINESS_LOCATION || 'Nusa Penida, Bali';

/**
 * Validates that required environment variables are set
 */
export function validateEnv() {
  const requiredEnvVars = {
    DATABASE_URL,
    RESEND_API_KEY,
    NEXTAUTH_SECRET,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

/**
 * Gets the base URL for the application
 */
export function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://nusabeetrip.com';
  }
  return NEXTAUTH_URL;
}