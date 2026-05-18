import { ImageResponse } from 'next/og';
import { TOUR_PACKAGES } from '@/lib/constants';
import { SITE } from '@/lib/site-config';
import { getTourPackageBySlug } from '@/lib/db/queries';
import { resolveTourImage } from '@/lib/image-resolver';

export const runtime = 'nodejs';
export const alt = 'Tour package — NusaBeeTrip';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadTour(slug: string) {
  // Fall back to static list when the DB is unreachable so OG image generation
  // never breaks a deployment.
  try {
    const db = await getTourPackageBySlug(slug);
    if (db) {
      const features = Array.isArray(db.features) ? (db.features as string[]) : [];
      return {
        name: db.name,
        price: db.priceIdr,
        duration: db.durationHours ?? 8,
        includesSnorkeling: db.includesSnorkeling ?? false,
        image: resolveTourImage({
          name: db.name,
          features,
          description: db.description || '',
          slug: db.slug,
          imageUrl: db.imageUrl,
        }),
      };
    }
  } catch {
    // ignore
  }
  const stat = TOUR_PACKAGES.find((p) => p.slug === slug);
  if (!stat) return null;
  return {
    name: stat.name,
    price: stat.price,
    duration: stat.duration,
    includesSnorkeling: stat.includesSnorkeling,
    image: stat.image,
  };
}

export default async function TourOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const tour = await loadTour(params.slug);
  if (!tour) {
    // Generic fallback
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

  const priceK = `${(tour.price / 1000).toFixed(0)}K IDR`;
  const heroAbs = tour.image.startsWith('http')
    ? tour.image
    : `${SITE.url}${tour.image}`;

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
        {/* Background image with dark overlay */}
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
              'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.5) 50%, rgba(15, 118, 110, 0.85) 100%)',
          }}
        />

        {/* Foreground content */}
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
          {/* Top bar — brand + duration badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
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
                <div style={{ fontSize: 16, opacity: 0.7 }}>Nusa Penida, Bali</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <div
                style={{
                  background: '#fbbf24',
                  color: '#451a03',
                  padding: '12px 22px',
                  borderRadius: 999,
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {tour.duration} HOURS
              </div>
              {tour.includesSnorkeling && (
                <div
                  style={{
                    background: '#06b6d4',
                    color: 'white',
                    padding: '12px 22px',
                    borderRadius: 999,
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  + SNORKELING
                </div>
              )}
            </div>
          </div>

          {/* Middle — name + price */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                letterSpacing: -2,
                lineHeight: 1.0,
                maxWidth: 950,
              }}
            >
              {tour.name}
            </div>
            <div
              style={{
                fontSize: 28,
                opacity: 0.95,
                fontWeight: 600,
              }}
            >
              From <span style={{ color: '#fbbf24' }}>{priceK}</span> per person
              · Hotel pickup included
            </div>
          </div>

          {/* Bottom — URL */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                background: 'rgba(255, 255, 255, 0.18)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '12px 24px',
                borderRadius: 999,
              }}
            >
              Book on WhatsApp · nusabeetrip.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
