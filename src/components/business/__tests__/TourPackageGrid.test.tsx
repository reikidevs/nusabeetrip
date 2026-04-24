import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TourPackageGrid from '../TourPackageGrid';
import { TourPackage } from '@/types';

// Mock the child components
jest.mock('../TourPackageCard', () => {
  return function MockTourPackageCard({ tourPackage }: any) {
    return (
      <div data-testid={`tour-card-${tourPackage.id}`}>
        <h3>{tourPackage.name}</h3>
        <p>{tourPackage.price} {tourPackage.currency}</p>
      </div>
    );
  };
});

const mockTourPackages: TourPackage[] = [
  {
    id: '1',
    name: 'West Trip',
    slug: 'west-trip',
    description: 'Explore western Nusa Penida',
    price: 390000,
    currency: 'IDR',
    duration: 8,
    includesSnorkeling: false,
    features: ['Kelingking Beach', 'Angel Billabong'],
    image: '/images/west-trip.jpg',
    isActive: true
  },
  {
    id: '2',
    name: 'East Trip',
    slug: 'east-trip',
    description: 'Discover eastern Nusa Penida',
    price: 430000,
    currency: 'IDR',
    duration: 8,
    includesSnorkeling: false,
    features: ['Atuh Beach', 'Diamond Beach'],
    image: '/images/east-trip.jpg',
    isActive: true
  }
];

describe('TourPackageGrid', () => {
  it('renders tour packages correctly', () => {
    render(<TourPackageGrid tourPackages={mockTourPackages} />);
    
    expect(screen.getByText('Our Tour Packages')).toBeInTheDocument();
    expect(screen.getByTestId('tour-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('tour-card-2')).toBeInTheDocument();
  });

  it('shows empty state when no packages available', () => {
    render(<TourPackageGrid tourPackages={[]} />);
    
    expect(screen.getByText('No tour packages available at the moment.')).toBeInTheDocument();
  });

  it('respects maxItems prop', () => {
    render(<TourPackageGrid tourPackages={mockTourPackages} maxItems={1} />);
    
    expect(screen.getByTestId('tour-card-1')).toBeInTheDocument();
    expect(screen.queryByTestId('tour-card-2')).not.toBeInTheDocument();
  });

  it('hides title when showTitle is false', () => {
    render(<TourPackageGrid tourPackages={mockTourPackages} showTitle={false} />);
    
    expect(screen.queryByText('Our Tour Packages')).not.toBeInTheDocument();
  });

  it('uses custom title when provided', () => {
    render(
      <TourPackageGrid 
        tourPackages={mockTourPackages} 
        title="Featured Tours" 
      />
    );
    
    expect(screen.getByText('Featured Tours')).toBeInTheDocument();
  });

  it('filters out inactive packages', () => {
    const packagesWithInactive = [
      ...mockTourPackages,
      {
        id: '3',
        name: 'Inactive Trip',
        slug: 'inactive-trip',
        description: 'This should not show',
        price: 500000,
        currency: 'IDR',
        duration: 6,
        includesSnorkeling: false,
        features: ['Hidden Beach'],
        image: '/images/inactive.jpg',
        isActive: false
      }
    ];

    render(<TourPackageGrid tourPackages={packagesWithInactive} />);
    
    expect(screen.getByTestId('tour-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('tour-card-2')).toBeInTheDocument();
    expect(screen.queryByTestId('tour-card-3')).not.toBeInTheDocument();
  });
});