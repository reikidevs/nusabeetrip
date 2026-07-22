import React from 'react';
import { render, screen, fireEvent } from '@/test/test-utils';
import '@testing-library/jest-dom';
import RentalServiceCard from '../RentalServiceCard';
import { RentalService } from '@/types';

// Mock the WhatsAppBookingButton component
jest.mock('../WhatsAppBookingButton', () => {
  return function MockWhatsAppBookingButton({ 
    serviceName, 
    price, 
    onClick 
  }: { 
    serviceName: string; 
    price: number; 
    onClick?: () => void; 
  }) {
    return (
      <button onClick={onClick} data-testid="whatsapp-button">
        Book {serviceName} - {price} IDR
      </button>
    );
  };
});

const mockRentalService: RentalService = {
  id: '1',
  vehicleType: 'motorcycle',
  model: 'N-Max',
  slug: 'nmax-motorcycle',
  pricePerDay: 125000,
  pricePerHour: 15000,
  currency: 'IDR',
  features: ['Automatic Transmission', 'Comfortable Seat', 'Storage Space', 'Helmet Included'],
  image: '/images/nmax.jpg',
  isAvailable: true
};

const mockUnavailableRentalService: RentalService = {
  ...mockRentalService,
  id: '2',
  isAvailable: false
};

describe('RentalServiceCard', () => {
  it('renders rental service information correctly', () => {
    render(<RentalServiceCard rentalService={mockRentalService} />);
    
    expect(screen.getByText('N-Max')).toBeInTheDocument();
    expect(screen.getByText('$8')).toBeInTheDocument();
    expect(screen.getAllByText('USD')).not.toHaveLength(0);
    expect(screen.getByText('per day')).toBeInTheDocument();
    expect(screen.getByText('$1')).toBeInTheDocument();
    expect(screen.getByText(/per hour/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View Details' })).toHaveAttribute(
      'href',
      '/rentals/nmax-motorcycle',
    );
  });

  it('displays all features correctly', () => {
    render(<RentalServiceCard rentalService={mockRentalService} />);
    
    mockRentalService.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('shows vehicle type badge', () => {
    render(<RentalServiceCard rentalService={mockRentalService} />);
    
    expect(screen.getByText('motorcycle')).toHaveClass('capitalize');
  });

  it('renders image with correct alt text', () => {
    render(<RentalServiceCard rentalService={mockRentalService} />);
    
    const image = screen.getByRole('img', { name: 'N-Max rental - Nusa Penida' });
    expect(image).toHaveAttribute('src', '/images/nmax.jpg');
  });

  it('calls onBookingClick when booking button is clicked', () => {
    const mockOnBookingClick = jest.fn();
    render(
      <RentalServiceCard 
        rentalService={mockRentalService} 
        onBookingClick={mockOnBookingClick}
      />
    );
    
    fireEvent.click(screen.getByTestId('whatsapp-button'));
    expect(mockOnBookingClick).toHaveBeenCalledWith('N-Max', 125000);
  });

  it('handles unavailable vehicles correctly', () => {
    render(<RentalServiceCard rentalService={mockUnavailableRentalService} />);
    
    expect(screen.getByText('Not Available')).toBeInTheDocument();
    expect(screen.getByText('Currently unavailable')).toBeInTheDocument();
    
    // Check that the main container has opacity styling
    const container = screen.getByText('N-Max').closest('.bg-white');
    expect(container).toHaveClass('opacity-75');
  });

  it('does not show hourly price when not provided', () => {
    const serviceWithoutHourlyPrice = {
      ...mockRentalService,
      pricePerHour: undefined
    };
    
    render(<RentalServiceCard rentalService={serviceWithoutHourlyPrice} />);
    
    expect(screen.getByText('$8')).toBeInTheDocument();
    expect(screen.queryByText(/per hour/)).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RentalServiceCard 
        rentalService={mockRentalService} 
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('formats vehicle type correctly for cars', () => {
    const carRentalService: RentalService = {
      ...mockRentalService,
      vehicleType: 'car',
      model: 'Toyota Avanza'
    };
    
    render(<RentalServiceCard rentalService={carRentalService} />);
    
    expect(screen.getByText('car')).toHaveClass('capitalize');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Toyota Avanza rental - Nusa Penida');
  });

  it('formats price with Indonesian locale', () => {
    const expensiveService: RentalService = {
      ...mockRentalService,
      pricePerDay: 1500000
    };
    
    render(<RentalServiceCard rentalService={expensiveService} />, { language: 'id' });
    
    expect(screen.getByText('Rp 1.500.000')).toBeInTheDocument();
    expect(screen.getAllByText('IDR')).not.toHaveLength(0);
    expect(screen.getByRole('link', { name: 'Lihat Detail' })).toHaveAttribute(
      'href',
      '/id/rentals/nmax-motorcycle',
    );
  });
});
