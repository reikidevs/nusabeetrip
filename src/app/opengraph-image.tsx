import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site-config';

/**
 * Default Open Graph image for the homepage and any route that does not
 * override it. Generated on-the-fly using @vercel/og under the hood.
 *
 * 1200×630 is the size both Facebook and Twitter prefer.
 */
export const runtime = 'edge';
export const alt = `${SITE.name} — ${SITE.brandTagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 90px',
          background:
            'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #0f766e 100%)',
          color: 'white',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {/* Top — brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🐝
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -0.5 }}>
              {SITE.name}
            </div>
            <div style={{ fontSize: 18, opacity: 0.7, letterSpacing: 1 }}>
              {SITE.brandTagline.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Nusa Penida Tours, Snorkeling & Vehicle Rentals
          </div>
          <div
            style={{
              fontSize: 26,
              opacity: 0.85,
              maxWidth: 880,
              lineHeight: 1.4,
            }}
          >
            Local-owned tours and rentals from a team that grew up on the island.
          </div>
        </div>

        {/* Bottom — accents */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ display: 'flex', gap: 14 }}>
            {['West Trip', 'East Trip', 'Snorkeling', 'Rentals'].map((tag) => (
              <div
                key={tag}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '10px 20px',
                  borderRadius: 999,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            nusabeetrip.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
