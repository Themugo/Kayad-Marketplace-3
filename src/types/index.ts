export type UserRole = 'buyer' | 'seller' | 'dealer' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  companyName?: string;
  isVerified: boolean;
  createdAt: string;
  rating?: number;
  reviewsCount?: number;
}

export type VehicleCondition = 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';
export type TransmissionType = 'Automatic' | 'Manual' | 'Dual-Clutch' | 'CVT' | 'Direct Drive' | '10-Speed Automatic' | '8-Speed Automatic';
export type FuelType = 'Gasoline' | 'Diesel' | 'Hybrid' | 'Plug-in Hybrid' | 'Electric';
export type BodyStyle = 'Sedan' | 'SUV' | 'Coupe' | 'Truck' | 'Convertible' | 'Hatchback' | 'Wagon';
export type ListingType = 'fixed' | 'auction' | 'both';

export interface VehicleInspection {
  inspectedAt: string;
  inspectorName: string;
  score: number; // 0-100
  passedPoints: number;
  totalPoints: number;
  engineHealth: 'Excellent' | 'Good' | 'Attention Needed';
  bodyCondition: 'Flawless' | 'Minor Scratches' | 'Repaired';
  interiorHealth: 'Clean' | 'Minor Wear';
  reportPdfUrl?: string;
}

export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  price: number;
  reservePrice?: number;
  currentBid?: number;
  buyNowPrice?: number;
  mileage: number;
  location: string;
  bodyStyle: BodyStyle;
  transmission: TransmissionType;
  fuelType: FuelType;
  engine: string;
  horsepower: number;
  exteriorColor: string;
  interiorColor: string;
  condition: VehicleCondition;
  listingType: ListingType;
  images: string[];
  description: string;
  features: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
  sellerRating: number;
  isDealerCertified: boolean;
  dealerId?: string;
  auctionEndsAt?: string;
  bidsCount?: number;
  viewsCount: number;
  savedCount: number;
  inspection?: VehicleInspection;
  status: 'active' | 'sold' | 'pending' | 'draft';
  createdAt: string;
}

export interface Bid {
  id: string;
  vehicleId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  placedAt: string;
  isAutoBid?: boolean;
}

export type EscrowStatus = 
  | 'initiated'
  | 'buyer_funded'
  | 'inspection_pending'
  | 'inspection_approved'
  | 'delivery_in_transit'
  | 'buyer_accepted'
  | 'disputed'
  | 'completed'
  | 'refunded';

export interface EscrowMilestone {
  step: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  timestamp?: string;
}

export interface EscrowContract {
  id: string;
  vehicleId: string;
  vehicleTitle: string;
  vehicleImage: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  agreedPrice: number;
  escrowFee: number;
  status: EscrowStatus;
  milestones: EscrowMilestone[];
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  inspectionReportApproved?: boolean;
  disputeReason?: string;
}

export interface DealerProfile {
  id: string;
  name: string;
  logo: string;
  bannerImage: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  reviewsCount: number;
  verifiedSince: string;
  activeListingsCount: number;
  totalSales: number;
  bio: string;
  operatingHours: string;
  badge: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'bid' | 'outbid' | 'auction_won' | 'escrow' | 'message' | 'system';
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  vehicleId?: string;
  text: string;
  sentAt: string;
  offerAmount?: number;
}

export interface FilterState {
  searchQuery: string;
  makes: string[];
  bodyStyles: BodyStyle[];
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  maxMileage: number;
  transmission: string[];
  fuelType: string[];
  listingType: 'all' | 'auction' | 'fixed';
  certifiedOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'year_desc' | 'mileage_asc' | 'ending_soon';
}

export interface Advert {
  id: string;
  title: string;
  subtitle: string;
  badgeTag: string;
  ctaText: string;
  ctaPage: 'gallery' | 'auctions' | 'ghost_check' | 'escrow' | 'dashboard' | 'support';
  theme: 'cyan_navy' | 'emerald_escrow' | 'gold_luxury' | 'sunset_red';
  placement: 'homepage' | 'auctions' | 'search_feed';
  imageUrl?: string;
  isActive: boolean;
  clicksCount: number;
  createdAt: string;
}

