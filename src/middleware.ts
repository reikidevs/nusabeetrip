import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Protects all /admin routes (except the login page) behind the session cookie.
 *
 * Runs on the edge, so it uses Web Crypto (subtle) for HMAC verification rather
 * than Node's crypto module. The token shape matches src/lib/admin/auth.ts:
 *   "<expiryMs>.<hex-hmac-sha256(expiryMs)>"
 */

const COOKIE_NAME = 'nbt_admin';

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    'insecure-dev-secret-change-me'
  );
}

async function hmacHex(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [expiry, signature] = token.split('.');
  if (!expiry || !signature) return false;

  const expected = await hmacHex(expiry, getSecret());
  if (signature.length !== expected.length) return false;

  // Constant-time-ish compare.
  let diff = 0;
  for (let i = 0; i < signature.length; i++) {
    diff |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (diff !== 0) return false;

  return Date.now() < Number(expiry);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /admin/* — the login page itself stays public.
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const ok = await verifyToken(token);

  if (!ok) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
