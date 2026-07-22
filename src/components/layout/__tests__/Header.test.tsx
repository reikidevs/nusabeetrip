import React from 'react';
import { render, screen, fireEvent } from '@/test/test-utils';
import '@testing-library/jest-dom';
import Header from '../Header';

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

describe('Header Component', () => {
  it('renders the NusaBeeTrip logo', () => {
    render(<Header />);
    
    const logo = screen.getByAltText('NusaBeeTrip');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/NusaBeeTrip-Logo-final.png');
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    expect(screen.getAllByRole('link', { name: 'Home' })).not.toHaveLength(0);
    expect(screen.getAllByRole('link', { name: 'Tours' })).not.toHaveLength(0);
    expect(screen.getAllByRole('link', { name: 'Rentals' })).not.toHaveLength(0);
    expect(screen.getAllByRole('link', { name: 'About' })).not.toHaveLength(0);
    expect(screen.getAllByRole('link', { name: 'Contact' })).not.toHaveLength(0);
  });

  it('displays contact information in top bar', () => {
    render(<Header />);
    
    expect(screen.getByText('+62 896-3128-1234')).toBeInTheDocument();
    expect(screen.getByText('sidiqdwiatmoko@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('@sidiq_1312')).toBeInTheDocument();
  });

  it('renders direct WhatsApp booking links', () => {
    render(<Header />);

    const whatsappLinks = screen.getAllByRole('link', { name: 'Book Now' });
    expect(whatsappLinks).not.toHaveLength(0);
    whatsappLinks.forEach((link) => {
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining('https://wa.me/6289631281234'),
      );
    });
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />);
    
    const mobileMenuButton = screen.getByRole('button', { name: 'Open menu' });
    fireEvent.click(mobileMenuButton);

    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
    expect(mobileMenuButton).toHaveAccessibleName('Close menu');
  });

  it('renders a telephone link', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: '+62 896-3128-1234' })).toHaveAttribute(
      'href',
      'tel:+6289631281234',
    );
  });

  it('renders an email link', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'sidiqdwiatmoko@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:sidiqdwiatmoko@gmail.com',
    );
  });

  it('is responsive and shows mobile menu button on small screens', () => {
    render(<Header />);
    
    const mobileMenuButton = screen.getByRole('button', { name: 'Open menu' });
    expect(mobileMenuButton).toBeInTheDocument();
    expect(mobileMenuButton.parentElement).toHaveClass('lg:hidden');
  });
});
