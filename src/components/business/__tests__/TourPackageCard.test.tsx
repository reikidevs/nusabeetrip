import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TourPackageCard from '../TourPackageCard';
import { TourPackage } from '@/types';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock WhatsAppBookingButton
jest.mock('../WhatsAppBookingButton', () => ({
  __esModule: true,
  default: ({ onClick, serviceName }: any) => (
    <button onClick={onClick} data-testid="whatsapp-button">
      Book {serviceName} via WhatsApp
    </button>
  ),
}));

// Mock TourImage
jest.mock('../TourImage', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="tour-image" />
  ),
}));

const mockTourPackage: TourPackage = {
  id: '1',
  name: 'West Trip',
  slug: 'west-trip',
  description: 'Explore the western attractions of Nusa Penida',
  price: 390000,
  currency: 'IDR',
  duration: 8,
  includesSnorkeling: false,
  features: ['Kelingking Beach', 'Angel Billabong', 'Broken Beach', 'Crystal Bay'],
  image: '/images/west-trip.jpg',
  isActive: true
};

const mockTourPackageWithSnorkeling: TourPackage = {
  ...mockTourPackage,
  name: 'West Trip + Snorkeling',
  includesSnorkeling: true,
  price: 550000
};

describe('TourPackageCard', () => {
  it('renders tour package information correctly', () => {
    render(<TourPackageCard tourPackage={mockTourPackage} />);
    
    expect(screen.getByText('West Trip')).toBeInTheDocument();
    expect(screen.getByText('Explore the western attractions of Nusa Penida')).toBeInTheDocument();
    expect(screen.getByText('390.000 IDR')).toBeInTheDocument();
    expect(screen.getByText('per person')).toBeInTheDocument();
    expect(screen.getByText('8 hours')).toBeInTheDocument();
  });

  it('displays all features correctly', () => {
    render(<TourPackageCard tourPackage={mockTourPackage} />);
    
    expect(screen.getByText('Kelingking Beach')).toBeInTheDocument();
    expect(screen.getByText('Angel Billabong')).toBeInTheDocument();
    expect(screen.getByText('Broken Beach')).toBeInTheDocument();
    expect(screen.getByText('Crystal Bay')).toBeInTheDocument();
  });

  it('shows snorkeling badge when package includes snorkeling', () => {
    render(<TourPackageCard tourPackage={mockTourPackageWithSnorkeling} />);
    
    expect(screen.getByText('+ Snorkeling')).toBeInTheDocument();
  });

  it('does not show snorkeling badge when package does not include snorkeling', () => {
    render(<TourPackageCard tourPackage={mockTourPackage} />);
    
    expect(screen.queryByText('+ Snorkeling')).not.toBeInTheDocument();
  });

  it('calls onBookingClick when WhatsApp button is clicked', () => {
    const mockOnBookingClick = jest.fn();
    render(
      <TourPackageCard 
        tourPackage={mockTourPackage} 
        onBookingClick={mockOnBookingClick}
      />
    );
    
    fireEvent.click(screen.getByTestId('whatsapp-button'));
    expect(mockOnBookingClick).toHaveBeenCalledWith('West Trip', 390000);
  });

  it('renders with custom className', () => {
    const { container } = render(
      <TourPackageCard 
        tourPackage={mockTourPackage} 
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('displays tour image with correct alt text', () => {
    render(<TourPackageCard tourPackage={mockTourPackage} />);
    
    const image = screen.getByTestId('tour-image');
    expect(image).toHaveAttribute('alt', 'West Trip - Best Travel Nusa Penida');
    expect(image).toHaveAttribute('src', '/images/west-trip.jpg');
  });

  it('uses placeholder image when no image is provided', () => {
    const packageWithoutImage = { ...mockTourPackage, image: '' };
    render(<TourPackageCard tourPackage={packageWithoutImage} />);
    
    const image = screen.getByTestId('tour-image');
    expect(image).toHaveAttribute('src', '/images/placeholder-tour.svg');
  });
});