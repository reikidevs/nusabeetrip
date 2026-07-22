import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

let mockLanguage: 'en' | 'id' = 'en';

jest.mock('@/lib/LanguageContext', () => ({
  useLanguage: () => {
    const { translations } = jest.requireActual('@/lib/translations');
    return {
      language: mockLanguage,
      setLanguage: jest.fn(),
      t: translations[mockLanguage],
    };
  },
}));

jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/image', () => {
  const MockImage = ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('Footer destination SEO links', () => {
  afterEach(() => {
    mockLanguage = 'en';
  });

  it('links popular destinations to their English detail routes', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Atuh Beach' })).toHaveAttribute(
      'href',
      '/destinations/atuh-beach',
    );
    expect(screen.getByRole('link', { name: 'Diamond Beach' })).toHaveAttribute(
      'href',
      '/destinations/diamond-beach',
    );
  });

  it('adds the locale prefix on Indonesian pages', () => {
    mockLanguage = 'id';
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Atuh Beach' })).toHaveAttribute(
      'href',
      '/id/destinations/atuh-beach',
    );
    expect(screen.getByRole('link', { name: 'Ubud ke Nusa Penida' })).toHaveAttribute(
      'href',
      '/id/guides/nusa-penida-day-trip-from-ubud',
    );
  });

  it('links the high-opportunity English guides directly', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Ubud to Nusa Penida' })).toHaveAttribute(
      'href',
      '/guides/nusa-penida-day-trip-from-ubud',
    );
    expect(screen.getByRole('link', { name: 'Scooter Rental Guide' })).toHaveAttribute(
      'href',
      '/guides/renting-a-scooter-in-nusa-penida',
    );
    expect(screen.getByRole('link', { name: 'West Trip' })).toHaveAttribute(
      'href',
      '/tours/west-trip',
    );
  });
});
