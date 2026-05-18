import { ImageResponse } from 'next/og';
import { getDestinationBySlug } from '@/lib/destinations';
import { SITE } from '@/lib/site-config';

export const runtime = 'nodejs';
export const alt = 'Destination — NusaBeeTrip';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function DestinationOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const dest = getDestinationBySlug(params.slug);

  if (!dest) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1e3a8a',
            color: 'white',
            fontSize: 72,
            fontWeight: 800,
          }}
        >
          {SITE.name}
        </div>
      ),
      { ...size },
    );
  }

  const heroAbs = dest.heroImage.startsWith('http')
    ? dest.heroImage
    : `${SITE.url}${dest.heroImage}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroAbs}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.25) 40%, rgba(15, 23, 42, 0.85) 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px 80px',
            color: 'white',
            width: '100%',
          }}
        >
          {/* Top */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                }}
              >
                🐝
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{SITE.name}</div>
                <div style={{ fontSize: 16, opacity: 0.7 }}>Travel Guide</div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '10px 20px',
                borderRadius: 999,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              {dest.region} Nusa Penida
            </div>
          </div>

          {/* Bottom block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                fontSize: 100,
                fontWeight: 800,
                letterSpacing: -3,
                lineHeight: 0.95,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {dest.name}
            </div>
            <div
              style={{
                fontSize: 26,
                opacity: 0.95,
                maxWidth: 950,
                lineHeight: 1.35,
              }}
            >
              {dest.description.en}
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 20,
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '12px 24px',
                borderRadius: 999,
                alignSelf: 'flex-start',
              }}
            >
              nusabeetrip.com/destinations/{dest.slug}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
