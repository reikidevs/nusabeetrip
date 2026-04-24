import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Header Component', () => {
  beforeEach(() => {
    mockWindowOpen.mockClear();
  });

  it('renders the NusaBeeTrip logo', () => {
    render(<Header />);
    
    const logo = screen.getByAltText('NusaBeeTrip - Best Travel Nusa Penida');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/NusaBeeTrip-Logo.png');
  });

  it('renders navigation links', () => {
    render(<Header />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tours')).toBeInTheDocument();
    expect(screen.getByText('Rentals')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('displays contact information in top bar', () => {
    render(<Header />);
    
    expect(screen.getByText('+62 896-3128-1234')).toBeInTheDocument();
    expect(screen.getByText('sidiqdwiatmoko@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('@sidiq_1312')).toBeInTheDocument();
  });

  it('opens WhatsApp when WhatsApp button is clicked', () => {
    render(<Header />);
    
    const whatsappButtons = screen.getAllByText('WhatsApp');
    fireEvent.click(whatsappButtons[0]);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/6289631281234'),
      '_blank'
    );
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />);
    
    const mobileMenuButton = screen.getByTestId('mobile-menu-button');
    fireEvent.click(mobileMenuButton);
    
    // Check if mobile navigation appears
    const mobileNavLinks = screen.getAllByText('Home');
    expect(mobileNavLinks.length).toBeGreaterThan(1); // Desktop + Mobile
  });

  it('handles phone click correctly', () => {
    // Mock window.open for tel: links
    const mockOpen = jest.fn();
    Object.defineProperty(window, 'open', { value: mockOpen });
    
    render(<Header />);
    
    const phoneButton = screen.getByText('+62 896-3128-1234');
    fireEvent.click(phoneButton);
    
    expect(mockOpen).toHaveBeenCalledWith('tel:+62 896-3128-1234', '_self');
  });

  it('handles email click correctly', () => {
    const mockOpen = jest.fn();
    Object.defineProperty(window, 'open', { value: mockOpen });
    
    render(<Header />);
    
    const emailButton = screen.getByText('sidiqdwiatmoko@gmail.com');
    fireEvent.click(emailButton);
    
    expect(mockOpen).toHaveBeenCalledWith('mailto:sidiqdwiatmoko@gmail.com', '_self');
  });

  it('is responsive and shows mobile menu button on small screens', () => {
    render(<Header />);
    
    const mobileMenuButton = screen.getByTestId('mobile-menu-button');
    expect(mobileMenuButton).toBeInTheDocument();
    expect(mobileMenuButton).toHaveClass('md:hidden');
  });
});