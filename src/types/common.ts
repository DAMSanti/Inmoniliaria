// ================================================
// Common Types - Vacacional Rental Platform
// ================================================

// Localization
export type Locale = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'pl' | 'ru' | 'sv';

export type MultiLanguageText = Partial<Record<Locale, string>>;
export type MultiLanguageArray = Partial<Record<Locale, string[]>>;

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Search & Filter types
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PropertySearchParams extends SearchParams {
  city?: string;
  country?: string;
  type?: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  amenities?: string[];
  checkIn?: string;
  checkOut?: string;
  instantBooking?: boolean;
}

// Enums (matching Prisma schema)
export type UserRole = 'USER' | 'AGENT' | 'ADMIN' | 'SUPER_ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

export type PropertyType = 
  | 'APARTMENT' 
  | 'HOUSE' 
  | 'VILLA' 
  | 'PENTHOUSE' 
  | 'STUDIO' 
  | 'DUPLEX' 
  | 'LOFT' 
  | 'BUNGALOW' 
  | 'COTTAGE' 
  | 'CHALET' 
  | 'FARMHOUSE' 
  | 'CASTLE';

export type PropertyStatus = 
  | 'DRAFT' 
  | 'PENDING_REVIEW' 
  | 'ACTIVE' 
  | 'INACTIVE' 
  | 'RENTED' 
  | 'SOLD' 
  | 'ARCHIVED';

export type RentalType = 'VACATION' | 'LONG_TERM' | 'BOTH';

export type BookingStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'CANCELLED' 
  | 'COMPLETED' 
  | 'NO_SHOW' 
  | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'REFUNDED' | 'FAILED';

export type InquiryStatus = 'NEW' | 'READ' | 'REPLIED' | 'CLOSED' | 'SPAM';
export type InquiryType = 'GENERAL' | 'BOOKING' | 'VISIT' | 'VALUATION' | 'OTHER';

export type ValuationStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
