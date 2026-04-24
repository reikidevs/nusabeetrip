import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhatsAppBookingButton from '../WhatsAppBookingButton';
import * as whatsappUtils from '@/lib/whatsapp';
import * as analytics from '@/lib/analytics';

// Mock the utility functions
jest.mock('@/lib/whatsapp', () => ({
  generateWhatsAppURL: jest.fn(),
  validateWhatsAppParams: jest.fn(),
}));

jest.mock('@/lib/analytics', () => ({
  trackBookingClick: jest.fn(),
}));

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

describe('WhatsAppBookingButton', () => {
  const defaultProps = {
    phoneNumber: '+62 896-3128-1234',
    serviceType: 'tour' as const,
    serviceName: 'West Trip',
    price: 390000,
    currency: 'IDR',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (whatsappUtils.validateWhatsAppParams as jest.Mock).mockReturnValue(true);
    (whatsappUtils.generateWhatsAppURL as jest.Mock).mockReturnValue('https://wa.me/6289631281234?text=test');
  });

  it('renders correctly with default props', () => {
    render(<WhatsAppBookingButton {...defaultProps} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Book via WhatsApp')).toBeInTheDocument();
    expect(screen.getByLabelText('Book West Trip via WhatsApp')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(<WhatsAppBookingButton {...defaultProps} className={customClass} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });

  it('handles different sizes correctly', () => {
    const { rerender } = render(<WhatsAppBookingButton {...defaultProps} size="sm" />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('py-2', 'px-4', 'text-sm');

    rerender(<WhatsAppBookingButton {...defaultProps} size="lg" />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('py-4', 'px-8', 'text-lg');
  });

  it('is disabled when disabled prop is true', () => {
    render(<WhatsAppBookingButton {...defaultProps} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:bg-gray-400', 'disabled:cursor-not-allowed');
  });

  it('calls onClick handler when provided', () => {
    const mockOnClick = jest.fn();
    render(<WhatsAppBookingButton {...defaultProps} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('validates parameters before opening WhatsApp', () => {
    render(<WhatsAppBookingButton {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(whatsappUtils.validateWhatsAppParams).toHaveBeenCalledWith({
      phoneNumber: defaultProps.phoneNumber,
      serviceType: defaultProps.serviceType,
      serviceName: defaultProps.serviceName,
      price: defaultProps.price,
      currency: defaultProps.currency,
    });
  });

  it('does not open WhatsApp if validation fails', () => {
    (whatsappUtils.validateWhatsAppParams as jest.Mock).mockReturnValue(false);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(<WhatsAppBookingButton {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(consoleSpy).toHaveBeenCalledWith('Invalid WhatsApp booking parameters:', expect.any(Object));
    expect(mockWindowOpen).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('tracks analytics when button is clicked', () => {
    render(<WhatsAppBookingButton {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(analytics.trackBookingClick).toHaveBeenCalledWith({
      serviceType: defaultProps.serviceType,
      serviceName: defaultProps.serviceName,
      price: defaultProps.price,
      method: 'whatsapp',
    });
  });

  it('opens WhatsApp with correct URL', () => {
    const mockURL = 'https://wa.me/6289631281234?text=encoded-message';
    (whatsappUtils.generateWhatsAppURL as jest.Mock).mockReturnValue(mockURL);
    
    render(<WhatsAppBookingButton {...defaultProps} />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(whatsappUtils.generateWhatsAppURL).toHaveBeenCalledWith({
      phoneNumber: defaultProps.phoneNumber,
      serviceType: defaultProps.serviceType,
      serviceName: defaultProps.serviceName,
      price: defaultProps.price,
      currency: defaultProps.currency,
    });
    expect(mockWindowOpen).toHaveBeenCalledWith(mockURL, '_blank', 'noopener,noreferrer');
  });

  it('handles rental service type correctly', () => {
    const rentalProps = {
      ...defaultProps,
      serviceType: 'rental' as const,
      serviceName: 'N-Max Motorcycle',
      price: 125000,
    };
    
    render(<WhatsAppBookingButton {...rentalProps} />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(analytics.trackBookingClick).toHaveBeenCalledWith({
      serviceType: 'rental',
      serviceName: 'N-Max Motorcycle',
      price: 125000,
      method: 'whatsapp',
    });
  });

  it('has proper accessibility attributes', () => {
    render(<WhatsAppBookingButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('aria-label', 'Book West Trip via WhatsApp');
    
    const icon = button.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not call handlers when disabled', () => {
    const mockOnClick = jest.fn();
    render(<WhatsAppBookingButton {...defaultProps} disabled={true} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(mockOnClick).not.toHaveBeenCalled();
    expect(analytics.trackBookingClick).not.toHaveBeenCalled();
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });
});