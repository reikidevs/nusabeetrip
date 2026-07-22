import { Metadata } from 'next';
import { headers } from 'next/headers';
import { JsonLd } from '@/components/seo';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { absoluteUrl, localeFromPath, localizedPath } from '@/lib/site-config';
import { getSouvenirs } from '@/lib/souvenirs';
import SouvenirsPageContent from './SouvenirsPageContent';

export const metadata: Metadata = buildMetadata({
  title: 'Nusa Penida Souvenirs — Authentic Local Gifts & Apparel',
  description:
    'Take home a piece of Nusa Penida — t-shirts, caps, keychains, tote bags, postcards, and handmade bracelets from local artisans. Order via WhatsApp.',
  path: '/souvenirs',
  keywords: [
    'nusa penida souvenir',
    'oleh-oleh nusa penida',
    'nusa penida t-shirt',
    'kelingking beach souvenir',
    'bali handmade gifts',
  ],
  image: '/images/Souvenir%20Nusa%20Penida/WhatsApp%20Image%202026-04-24%20at%2018.36.41.jpeg',
  imageAlt: 'Authentic Nusa Penida Souvenirs',
});

export default function SouvenirsPage() {
  const locale = localeFromPath(headers().get('x-pathname') || '/');
  const isIndonesian = locale === 'id';
  const pagePath = localizedPath('/souvenirs', locale);
  const availableSouvenirs = getSouvenirs(locale).filter((item) => item.isAvailable);

  return (
    <>
      <JsonLd
        id="ld-breadcrumbs-souvenirs"
        data={breadcrumbJsonLd([
          { name: isIndonesian ? 'Beranda' : 'Home', path: localizedPath('/', locale) },
          { name: isIndonesian ? 'Oleh-oleh' : 'Souvenirs', path: pagePath },
        ])}
      />
      <JsonLd
        id="ld-souvenir-products"
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: isIndonesian ? 'Oleh-oleh Khas Nusa Penida' : 'Authentic Nusa Penida Souvenirs',
          url: absoluteUrl(pagePath),
          numberOfItems: availableSouvenirs.length,
          itemListElement: availableSouvenirs.map((item, index) => {
            const itemUrl = `${absoluteUrl(pagePath)}#${item.slug}`;

            if (isIndonesian) {
              // The Indonesian UI shows a live IDR conversion while the
              // canonical catalogue price is stored in USD. Avoid publishing
              // an Offer whose price/currency could differ from visible copy.
              return {
                '@type': 'ListItem',
                position: index + 1,
                name: item.name,
                description: item.description,
                image: absoluteUrl(item.image),
                url: itemUrl,
              };
            }

            return {
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                '@id': itemUrl,
                name: item.name,
                description: item.description,
                image: absoluteUrl(item.image),
                category: item.category,
                brand: { '@type': 'Brand', name: 'NusaBeeTrip' },
                offers: {
                  '@type': 'Offer',
                  url: itemUrl,
                  price: item.price,
                  priceCurrency: item.currency,
                  availability: 'https://schema.org/InStock',
                },
              },
            };
          }),
        }}
      />
      <SouvenirsPageContent />
    </>
  );
}
