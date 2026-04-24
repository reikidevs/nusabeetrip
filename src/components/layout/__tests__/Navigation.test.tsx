import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../Navigation';

// Mock Next.js usePathname hook
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

const mockNavigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Tours', href: '/tours', description: 'View our tour packages' },
  { name: 'Rentals', href: '/rentals' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

describe('Navigation Component', () => {
  it('renders navigation items', () => {
    render(<Navigation items={mockNavigationItems} />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tours')).toBeInTheDocument();
    expect(screen.getByText('Rentals')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('applies horizontal orientation by default', () => {
    const { container } = render(<Navigation items={mockNavigationItems} />);
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('flex', 'items-center', 'space-x-8');
  });

  it('applies vertical orientation when specified', () => {
    const { container } = render(
      <Navigation items={mockNavigationItems} orientation="vertical" />
    );
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('flex', 'flex-col', 'space-y-4');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Navigation items={mockNavigationItems} className="custom-nav" />
    );
    
    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('custom-nav');
  });

  it('shows active state for current page', () => {
    // Mock usePathname to return '/'
    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue('/');
    
    render(<Navigation items={mockNavigationItems} />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-brand-blue-800', 'border-b-2', 'border-brand-blue-800');
  });

  it('shows hover state for non-active items', () => {
    // Mock usePathname to return '/tours'
    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue('/tours');
    
    render(<Navigation items={mockNavigationItems} />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-gray-700', 'hover:text-brand-blue-800');
    expect(homeLink).not.toHaveClass('border-b-2');
  });

  it('disables active state when showActiveState is false', () => {
    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue('/');
    
    render(<Navigation items={mockNavigationItems} showActiveState={false} />);
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).not.toHaveClass('border-b-2');
    expect(homeLink).toHaveClass('text-gray-700', 'hover:text-brand-blue-800');
  });

  it('calls onItemClick when item is clicked', () => {
    const mockOnItemClick = jest.fn();
    
    render(
      <Navigation items={mockNavigationItems} onItemClick={mockOnItemClick} />
    );
    
    const toursLink = screen.getByText('Tours');
    fireEvent.click(toursLink);
    
    expect(mockOnItemClick).toHaveBeenCalledWith({
      name: 'Tours',
      href: '/tours',
      description: 'View our tour packages'
    });
  });

  it('sets title attribute when description is provided', () => {
    render(<Navigation items={mockNavigationItems} />);
    
    const toursLink = screen.getByText('Tours');
    expect(toursLink).toHaveAttribute('title', 'View our tour packages');
  });

  it('handles active state for nested paths correctly', () => {
    const usePathname = require('next/navigation').usePathname;
    usePathname.mockReturnValue('/tours/west-trip');
    
    render(<Navigation items={mockNavigationItems} />);
    
    const toursLink = screen.getByText('Tours');
    expect(toursLink).toHaveClass('text-brand-blue-800', 'border-b-2', 'border-brand-blue-800');
    
    const homeLink = screen.getByText('Home');
    expect(homeLink).not.toHaveClass('border-b-2');
  });

  it('renders with desktop navigation test id', () => {
    render(<Navigation items={mockNavigationItems} />);
    
    expect(screen.getByTestId('desktop-navigation')).toBeInTheDocument();
  });
});