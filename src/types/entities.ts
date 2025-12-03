// ================================================
// Entity Types - Vacacional Rental Platform
// ================================================

import type {
  Locale,
  MultiLanguageText,
  MultiLanguageArray,
  UserRole,
  UserStatus,
  PropertyType,
  PropertyStatus,
  RentalType,
  BookingStatus,
  PaymentStatus,
  InquiryStatus,
  InquiryType,
  ValuationStatus,
} from './common';

// ================================================
// User & Authentication
// ================================================

export interface User {
  id: string;
  email: string;
  emailVerified: Date | null;
  firstName: string;
  lastName: string;
  phone: string | null;
  avatar: string | null;
  role: UserRole;
  status: UserStatus;
  preferredLanguage: Locale;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}

export interface UserProfile extends User {
  fullName: string;
  initials: string;
  agentProfile?: AgentProfile;
  favoritesCount: number;
  bookingsCount: number;
}

export interface AgentProfile {
  id: string;
  userId: string;
  licenseNumber: string | null;
  biography: MultiLanguageText | null;
  specializations: string[];
  languages: string[];
  yearsExperience: number | null;
  linkedinUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  whatsappNumber: string | null;
  totalSales: number;
  totalRentals: number;
  averageRating: number;
  totalReviews: number;
  isAvailable: boolean;
  workingHours: Record<string, { start: string; end: string }> | null;
  user?: User;
}

// ================================================
// Property
// ================================================

export interface Property {
  id: string;
  title: MultiLanguageText;
  description: MultiLanguageText;
  slug: string;
  type: PropertyType;
  status: PropertyStatus;
  rentalType: RentalType;
  
  // Location
  address: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  country: string;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
  neighborhood: string | null;
  
  // Details
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  plotSize: number | null;
  floors: number;
  yearBuilt: number | null;
  lastRenovation: number | null;
  
  // Pricing
  pricePerNight: number | null;
  pricePerWeek: number | null;
  pricePerMonth: number | null;
  securityDeposit: number | null;
  cleaningFee: number | null;
  currency: string;
  
  // Availability
  minNights: number;
  maxNights: number;
  maxGuests: number;
  instantBooking: boolean;
  
  // Features
  amenities: string[];
  highlights: MultiLanguageArray | null;
  rules: MultiLanguageText | null;
  
  // Media
  images: PropertyImage[];
  virtualTourUrl: string | null;
  videoUrl: string | null;
  
  // SEO
  metaTitle: MultiLanguageText | null;
  metaDescription: MultiLanguageText | null;
  
  // Relations
  agentId: string | null;
  agent?: User;
  
  // Stats
  viewCount: number;
  inquiryCount: number;
  bookingCount: number;
  averageRating: number;
  totalReviews: number;
  
  // Flags
  isVerified: boolean;
  isFeatured: boolean;
  featuredUntil: Date | null;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  thumbnailUrl: string | null;
  alt: MultiLanguageText | null;
  caption: MultiLanguageText | null;
  order: number;
  isPrimary: boolean;
  width: number | null;
  height: number | null;
}

export interface PropertyAvailability {
  id: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  isAvailable: boolean;
  note: string | null;
}

export interface SeasonalPricing {
  id: string;
  propertyId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  pricePerNight: number;
  pricePerWeek: number | null;
  minNights: number | null;
}

// ================================================
// Booking
// ================================================

export interface Booking {
  id: string;
  bookingNumber: string;
  propertyId: string;
  userId: string;
  
  // Dates
  checkIn: Date;
  checkOut: Date;
  nights: number;
  
  // Guests
  adults: number;
  children: number;
  infants: number;
  pets: number;
  
  // Pricing
  pricePerNight: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  discount: number;
  total: number;
  currency: string;
  
  // Status
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  
  // Additional Info
  guestMessage: string | null;
  hostNotes: string | null;
  specialRequests: string | null;
  
  // Cancellation
  cancelledAt: Date | null;
  cancellationReason: string | null;
  refundAmount: number | null;
  
  // Relations
  property?: Property;
  user?: User;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  confirmedAt: Date | null;
}

// ================================================
// Review
// ================================================

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  bookingId: string | null;
  
  // Ratings
  overallRating: number;
  cleanlinessRating: number | null;
  locationRating: number | null;
  valueRating: number | null;
  communicationRating: number | null;
  checkInRating: number | null;
  
  // Content
  title: string | null;
  comment: string;
  
  // Response
  hostResponse: string | null;
  respondedAt: Date | null;
  
  // Status
  isVerified: boolean;
  isVisible: boolean;
  
  // Relations
  property?: Property;
  user?: User;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ================================================
// Inquiry
// ================================================

export interface Inquiry {
  id: string;
  userId: string | null;
  propertyId: string | null;
  
  // Guest info
  guestName: string | null;
  guestEmail: string;
  guestPhone: string | null;
  
  // Content
  type: InquiryType;
  subject: string | null;
  message: string;
  
  // Preferred dates
  preferredDate: Date | null;
  alternateDate: Date | null;
  
  // Status
  status: InquiryStatus;
  
  // Response
  response: string | null;
  respondedAt: Date | null;
  respondedBy: string | null;
  
  // Tracking
  source: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  
  // Relations
  user?: User;
  property?: Property;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ================================================
// Property Valuation
// ================================================

export interface PropertyValuation {
  id: string;
  propertyId: string | null;
  
  // Contact
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  
  // Property details
  propertyType: PropertyType;
  address: string;
  city: string;
  postalCode: string | null;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  yearBuilt: number | null;
  condition: string | null;
  hasGarden: boolean;
  hasPool: boolean;
  hasParking: boolean;
  additionalInfo: string | null;
  
  // Valuation
  status: ValuationStatus;
  estimatedValue: number | null;
  estimatedRent: number | null;
  valuationNotes: string | null;
  valuatedBy: string | null;
  valuatedAt: Date | null;
  
  // Documents
  documents: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ================================================
// Favorites & Saved Searches
// ================================================

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  property?: Property;
  createdAt: Date;
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  filters: Record<string, unknown>;
  emailAlerts: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
  createdAt: Date;
  updatedAt: Date;
  lastNotifiedAt: Date | null;
}

// ================================================
// Notifications
// ================================================

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
}
