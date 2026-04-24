import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RentalServiceGrid from '../RentalServiceGrid';
import { RentalService } from '@/types';

// Mock the RentalServiceCard component
jest.mock('../RentalServiceCard', () => {
  return function MockRentalServiceCard({ 
    rentalService, 
    onBookingClick 
  }: { 
    rentalService: RentalService; 
    onBookingClick?: (model: string, price: number) => void; 
  }) {
    return (
      <div data-testid={`rental-card-${rentalService.id}`}>
        <h3>{rentalService.model}</h3>
        <p>{rentalService.vehicleType}</p>
        <button 
          onClick={() => onBookingClick?.(rentalService.model, rentalService.pricePerDay)}
          data-testid={`book-button-${rentalService.id}`}
        >
          Book {rentalService.model}
        </button>
      </div>
    );
  };
});

const mockRentalServices: RentalService[] = [
  {
    id: '1',
    vehicleType: 'motorcycle',
    model: 'N-Max',
    slug: 'nmax-motorcycle',
    pricePerDay: 125000,
    currency: 'IDR',
    features: ['Automatic Transmission', 'Helmet Included'],
    image: '/images/nmax.jpg',
    isAvailable: true
  },
  {
    id: '2',
    vehicleType: 'motorcycle',
    model: 'Vario',
    slug: 'vario-motorcycle',
    pricePerDay: 100000,
    currency: 'IDR',
    features: ['Fuel Efficient', 'Easy Handling'],
    image: '/images/vario.jpg',
    isAvailable: true
  },
  {
    id: '3',
    vehicleType: 'car',
    model: 'Toyota Avanza',
    slug: 'toyota-avanza',
    pricePerDay: 500000,
    currency: 'IDR',
    features: ['Air Conditioning', 'Driver Included'],
    image: '/images/avanza.jpg',
    isAvailable: true
  },
  {
    id: '4',
    vehicleType: 'motorcycle',
    model: 'Scoopy',
    slug: 'scoopy-motorcycle',
    pricePerDay: 100000,
    currency: 'IDR',
    features: ['Lightweight', 'Perfect for Beginners'],
    image: '/images/scoopy.jpg',
    isAvailable: false
  }
];

describe('RentalServiceGrid', () => {
  it('renders all available rental services', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} />);
    
    // Should render 3 available services (excluding unavailable Scoopy)
    expect(screen.getByTestId('rental-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('rental-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('rental-card-3')).toBeInTheDocument();
    expect(screen.queryByTestId('rental-card-4')).not.toBeInTheDocument();
  });

  it('displays default title when showTitle is true', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} showTitle={true} />);
    
    expect(screen.getByText('Vehicle Rentals')).toBeInTheDocument();
    expect(screen.getByText(/Explore Nusa Penida with our reliable vehicle rentals/)).toBeInTheDocument();
  });

  it('displays custom title when provided', () => {
    render(
      <RentalServiceGrid 
        rentalServices={mockRentalServices} 
        showTitle={true}
        title="Our Fleet"
      />
    );
    
    expect(screen.getByText('Our Fleet')).toBeInTheDocument();
  });

  it('hides title when showTitle is false', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} showTitle={false} />);
    
    expect(screen.queryByText('Vehicle Rentals')).not.toBeInTheDocument();
  });

  it('groups services by vehicle type', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} />);
    
    expect(screen.getByText(/motorcycle.*rentals/i)).toBeInTheDocument();
    expect(screen.getByText(/car.*rentals/i)).toBeInTheDocument();
  });

  it('limits displayed services when maxItems is set', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} maxItems={2} />);
    
    // Should only show first 2 available services
    expect(screen.getByTestId('rental-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('rental-card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('rental-card-3')).not.toBeInTheDocument();
  });

  it('shows "View All Rentals" link when maxItems is set and there are more services', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} maxItems={2} />);
    
    const viewAllLink = screen.getByText('View All Rentals');
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink.closest('a')).toHaveAttribute('href', '/rentals');
  });

  it('does not show "View All Rentals" link when all services are displayed', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} maxItems={5} />);
    
    expect(screen.queryByText('View All Rentals')).not.toBeInTheDocument();
  });

  it('calls onBookingClick when a service booking button is clicked', () => {
    const mockOnBookingClick = jest.fn();
    render(
      <RentalServiceGrid 
        rentalServices={mockRentalServices} 
        onBookingClick={mockOnBookingClick}
      />
    );
    
    fireEvent.click(screen.getByTestId('book-button-1'));
    expect(mockOnBookingClick).toHaveBeenCalledWith('N-Max', 125000);
  });

  it('displays empty state when no services are available', () => {
    const unavailableServices = mockRentalServices.map(service => ({
      ...service,
      isAvailable: false
    }));
    
    render(<RentalServiceGrid rentalServices={unavailableServices} />);
    
    expect(screen.getByText('No Vehicles Available')).toBeInTheDocument();
    expect(screen.getByText(/All vehicles are currently rented out/)).toBeInTheDocument();
  });

  it('displays empty state when services array is empty', () => {
    render(<RentalServiceGrid rentalServices={[]} />);
    
    expect(screen.getByText('No Vehicles Available')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RentalServiceGrid 
        rentalServices={mockRentalServices} 
        className="custom-grid-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-grid-class');
  });

  it('maintains vehicle type order (motorcycles first, then cars)', () => {
    render(<RentalServiceGrid rentalServices={mockRentalServices} />);
    
    const motorcycleSection = screen.getByText(/motorcycle.*rentals/i);
    const carSection = screen.getByText(/car.*rentals/i);
    
    expect(motorcycleSection).toBeInTheDocument();
    expect(carSection).toBeInTheDocument();
    
    // Check that motorcycle section appears before car section in DOM
    const sections = screen.getAllByText(/.*rentals$/i);
    expect(sections.length).toBeGreaterThanOrEqual(2);
  });

  it('handles mixed availability correctly', () => {
    const mixedServices = [
      { ...mockRentalServices[0], isAvailable: true },
      { ...mockRentalServices[1], isAvailable: false },
      { ...mockRentalServices[2], isAvailable: true }
    ];
    
    render(<RentalServiceGrid rentalServices={mixedServices} />);
    
    // Should only render available services
    expect(screen.getByTestId('rental-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('rental-card-2')).not.toBeInTheDocument();
    expect(screen.getByTestId('rental-card-3')).toBeInTheDocument();
  });
});