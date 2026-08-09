import React from 'react';
import { render, screen } from '@/test/test-utils';
import '@testing-library/jest-dom';
import Footer from '../Footer';

// Mock Next.js components
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/image', () => {
  const MockImage = ({ src, alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('Footer Component', () => {
  it('renders business information', () => {
    render(<Footer />);

    expect(screen.getByAltText('NusaBeeTrip')).toBeInTheDocument();
    expect(
      screen.getByRole('link', {
        name: 'Desa Banjarnyuh, Ped, Nusa Penida, Bali 80771',
      }),
    ).toHaveAttribute('href', 'https://maps.app.goo.gl/AT6nfQVX19KM9ryZ6');
    expect(screen.getByText(/Local-owned tour & rental business/)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    
    expect(screen.getByText('+62 896-3128-1234')).toBeInTheDocument();
    expect(screen.getByText('sidiqdwiatmoko@gmail.com')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Tours' })).toHaveAttribute('href', '/tours');
    expect(screen.getByRole('link', { name: 'Rentals' })).toHaveAttribute('href', '/rentals');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('renders services list', () => {
    render(<Footer />);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'West Trip' })).toHaveAttribute('href', '/tours/west-trip');
    expect(screen.getByRole('link', { name: 'East Trip' })).toHaveAttribute('href', '/tours/east-trip');
    expect(screen.getByRole('link', { name: 'Mix Trip (West & East)' })).toHaveAttribute('href', '/tours/mix-trip');
    expect(screen.getByRole('link', { name: 'Snorkeling' })).toHaveAttribute('href', '/tours/snorkeling-manta');
    expect(screen.getByRole('link', { name: 'Motorcycle Rental' })).toHaveAttribute('href', '/rentals');
    expect(screen.getByRole('link', { name: 'Car with Driver' })).toHaveAttribute('href', '/rentals/car-rental');
  });

  it('renders call-to-action section', () => {
    render(<Footer />);
    
    expect(screen.getByText('Ready to Explore Nusa Penida?')).toBeInTheDocument();
    expect(screen.getByText(/Book your tour or rental today/)).toBeInTheDocument();
  });

  it('renders a direct WhatsApp booking link', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Chat on WhatsApp' })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/6289631281234'),
    );
  });

  it('renders a telephone link', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: '+62 896-3128-1234' })).toHaveAttribute(
      'href',
      'tel:+6289631281234',
    );
  });

  it('renders an email link', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'sidiqdwiatmoko@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:sidiqdwiatmoko@gmail.com',
    );
  });

  it('displays copyright information', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} NusaBeeTrip. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ubud to Nusa Penida' })).toHaveAttribute(
      'href',
      '/guides/nusa-penida-day-trip-from-ubud',
    );
  });

  it('renders logo with correct attributes', () => {
    render(<Footer />);
    
    const logo = screen.getByAltText('NusaBeeTrip');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/NusaBeeTrip-Logo-final.png');
  });
});
