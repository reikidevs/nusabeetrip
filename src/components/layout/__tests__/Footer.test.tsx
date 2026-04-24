import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
    <img src={src} alt={alt} {...props} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
});

describe('Footer Component', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  it('renders business information', () => {
    render(<Footer />);
    
    expect(screen.getByText('NusaBeeTrip')).toBeInTheDocument();
    expect(screen.getByText('Nusa Penida, Bali')).toBeInTheDocument();
    expect(screen.getByText(/Your trusted partner for unforgettable/)).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    
    expect(screen.getByText('+62 896-3128-1234')).toBeInTheDocument();
    expect(screen.getByText('sidiqdwiatmoko@gmail.com')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tour Packages')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Rentals')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders services list', () => {
    render(<Footer />);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('West Trip Tours')).toBeInTheDocument();
    expect(screen.getByText('East Trip Tours')).toBeInTheDocument();
    expect(screen.getByText('Mix Trip Tours')).toBeInTheDocument();
    expect(screen.getByText('Snorkeling Packages')).toBeInTheDocument();
    expect(screen.getByText('Motorcycle Rentals')).toBeInTheDocument();
    expect(screen.getByText('Car Rentals')).toBeInTheDocument();
  });

  it('renders call-to-action section', () => {
    render(<Footer />);
    
    expect(screen.getByText('Ready to Explore Nusa Penida?')).toBeInTheDocument();
    expect(screen.getByText(/Contact us now to book/)).toBeInTheDocument();
  });

  it('opens WhatsApp when WhatsApp button is clicked', () => {
    render(<Footer />);
    
    const whatsappButton = screen.getByText('WhatsApp Us');
    fireEvent.click(whatsappButton);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/6289631281234'),
      '_blank'
    );
  });

  it('handles phone click correctly', () => {
    const mockOpen = jest.fn();
    Object.defineProperty(window, 'open', { value: mockOpen });
    
    render(<Footer />);
    
    const phoneButton = screen.getByText('+62 896-3128-1234');
    fireEvent.click(phoneButton);
    
    expect(mockOpen).toHaveBeenCalledWith('tel:+62 896-3128-1234', '_self');
  });

  it('handles email click correctly', () => {
    const mockOpen = jest.fn();
    Object.defineProperty(window, 'open', { value: mockOpen });
    
    render(<Footer />);
    
    const emailButton = screen.getByText('sidiqdwiatmoko@gmail.com');
    fireEvent.click(emailButton);
    
    expect(mockOpen).toHaveBeenCalledWith('mailto:sidiqdwiatmoko@gmail.com', '_self');
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
    expect(screen.getByText('Best Travel Nusa Penida')).toBeInTheDocument();
  });

  it('renders logo with correct attributes', () => {
    render(<Footer />);
    
    const logo = screen.getByAltText('NusaBeeTrip - Best Travel Nusa Penida');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/NusaBeeTrip-Logo.png');
  });
});