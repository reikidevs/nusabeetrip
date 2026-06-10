import 'server-only';
import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Lightweight single-admin auth.
 *
 * - No external auth provider; one shared password set via ADMIN_PASSWORD.
 * - On login we issue a signed, HTTP-only cookie (HMAC over an expiry stamp).
 * - The cookie cannot be forged without ADMIN_SESSION_SECRET, and it expires.
 *
 * This is intentionally minimal — it fits a one-person admin panel without the
 * weight of NextAuth. For multi-user needs, swap this out later.
 */

const COOKIE_NAME = 'nbt_admin';
const SESSION_DAYS = 7;
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000;

function getSecret(): string {
  // Fall back to the admin password as the signing key if a dedicated secret
  // is not set, so the panel still works with a single env var.
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'insecure-dev-secret-change-me'
  );
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

/** Build a signed token of the form "<expiryMs>.<signature>". */
function createToken(): string {
  const expiry = String(Date.now() + SESSION_MS);
  return `${expiry}.${sign(expiry)}`;
}

/** Validate a token's signature and expiry. */
function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expiry, signature] = token.split('.');
  if (!expiry || !signature) return false;

  const expected = sign(expiry);
  // Constant-time compare to avoid timing attacks.
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  if (!timingSafeEqual(a, b)) return false;

  return Date.now() < Number(expiry);
}

/** Compare a submitted password against ADMIN_PASSWORD in constant time. */
export function checkPassword(submitted: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error('ADMIN_PASSWORD is not set');
  }
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Issue the session cookie after a successful login. */
export function createSession(): void {
  cookies().set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

/** Clear the session cookie (logout). */
export function destroySession(): void {
  cookies().delete(COOKIE_NAME);
}

/** Read the current request's cookie and tell us if the admin is logged in. */
export function isAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  return verifyToken(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

/** Used by middleware (edge) — verify a raw token string. */
export function verifyTokenEdge(token: string | undefined, secret: string): boolean {
  // Edge runtime version is in middleware.ts (uses Web Crypto). This export
  // documents the token shape; actual edge verification lives in middleware.
  return verifyToken(token);
}
