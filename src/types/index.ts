// Core business types for NusaBeeTrip

export interface TourPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // in hours
  includesSnorkeling: boolean;
  features: string[];
  image: string;
  isActive: boolean;
}

export interface RentalService {
  id: string;
  vehicleType: 'motorcycle' | 'car';
  model: string;
  slug: string;
  pricePerDay: number;
  pricePerHour?: number;
  currency: string;
  features: string[];
  image: string;
  isAvailable: boolean;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
}

export interface BusinessInfo {
  name: string;
  location: string;
  description: string;
  contactInfo: ContactInfo;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  tourInterest?: string;
  rentalInterest?: string;
  serviceType?: 'tour' | 'rental' | 'general';
}

export interface WhatsAppBookingParams {
  phoneNumber: string;
  serviceType: 'tour' | 'rental';
  serviceName: string;
  price: number;
  currency: string;
}

// SEO related types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: OpenGraphData;
  structuredData?: StructuredData;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  siteName: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: Address;
  geo?: GeoCoordinates;
  priceRange?: string;
  image?: string[];
}

export interface Address {
  '@type': string;
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  '@type': string;
  latitude: number;
  longitude: number;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactSubmissionResponse extends APIResponse {
  data?: {
    id: string;
    status: string;
  };
}

// Component prop types
export interface TourPackageCardProps {
  tourPackage: TourPackage;
  onBookingClick?: (packageName: string, price: number) => void;
  className?: string;
}

export interface RentalServiceCardProps {
  rentalService: RentalService;
  onBookingClick?: (vehicleModel: string, price: number) => void;
  className?: string;
}

export interface WhatsAppBookingButtonProps {
  phoneNumber: string;
  serviceType: 'tour' | 'rental';
  serviceName: string;
  price: number;
  currency: string;
  className?: string;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  loading?: boolean;
  className?: string;
}

// Layout component types
export interface LayoutProps {
  children: React.ReactNode;
  metadata?: SEOData;
}

export interface HeaderProps {
  logo?: string;
  navigation: NavigationItem[];
  contactInfo: ContactInfo;
}

export interface FooterProps {
  businessInfo: BusinessInfo;
  socialLinks: SocialLink[];
  quickLinks: NavigationItem[];
}

// Database types (for future use)
export interface DatabaseTourPackage extends Omit<TourPackage, 'features'> {
  features: string; // JSON string in database
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseRentalService extends Omit<RentalService, 'features'> {
  features: string; // JSON string in database
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  tourInterest?: string;
  rentalInterest?: string;
  status: 'new' | 'contacted' | 'booked' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

export interface BookingClickEvent extends AnalyticsEvent {
  serviceType: 'tour' | 'rental';
  serviceName: string;
  price: number;
  method: 'whatsapp' | 'contact_form';
}