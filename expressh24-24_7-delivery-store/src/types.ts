export type PaymentMethod = 'wave' | 'orange_money' | 'card' | 'cod';
export type DeliveryType = 'express' | 'standard';
export type OrderStatus = 'received' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  badge?: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: number;
  categoryName: string;
  price: number; // In FCFA
  image: string;
  description: string;
  stock: number;
  isAvailable: boolean;
  isFeatured?: boolean;
  unit?: string;
  badge?: string;
  tags?: string[];
  requiresAgeVerification?: boolean; // For 18+ items like Alcool / Fumeurs
  ageRestriction?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  district: string;
  instructions?: string;
  email?: string;
}

export interface Order {
  id: string; // e.g. EXH-98421
  trackingNumber: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  deliveryType: DeliveryType;
  status: OrderStatus;
  createdAt: string; // ISO string
  estimatedDeliveryTime: string; // e.g. "15-20 min"
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  currentLat?: number;
  currentLng?: number;
}

export interface DeliveryDriver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  plateNumber: string;
  status: 'available' | 'delivering' | 'offline';
  currentLat: number;
  currentLng: number;
  completedOrdersCount: number;
  rating: number;
  photo: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number; // In FCFA
  minAmount?: number;
  isActive: boolean;
  expiresAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: { id: string; label: string; address: string; district: string }[];
  favorites: string[]; // Product IDs
  createdAt: string;
}

export interface ReviewChecklistNote {
  category: string;
  item: string;
  status: 'verified' | 'flagged';
  note: string;
}
