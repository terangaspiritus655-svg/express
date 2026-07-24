export type AvailabilityStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'manager'
  | 'customer_service'
  | 'warehouse'
  | 'driver'
  | 'customer';

export interface Product {
  id: string;
  sku: string;
  barcode: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: number | null; // in FCFA (null when "Prix à préciser")
  oldPrice?: number;
  currency: 'XOF';
  status: 'ACTIVE' | 'INACTIVE' | 'ADMIN_VALIDATION_REQUIRED';
  needsValidation?: boolean;
  brand?: string;
  image: string;
  description: string;
  stock: number;
  unit: string;
  isPopular?: boolean;
  isNew?: boolean;
  featured?: boolean;
  badge?: string;
  keywords?: string[] | string;
  availability: AvailabilityStatus;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  image: string;
  itemCount: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'received' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
export type PaymentMethod = 'wave' | 'orange_money' | 'card' | 'cash';
export type DeliveryType = 'express' | 'standard';

export interface Order {
  id: string; // e.g., EXH-2026-8912
  createdAt: string;
  updatedAt?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerId?: string;
  address: string;
  neighborhood: string;
  instructions?: string;
  deliveryType: DeliveryType;
  deliveryFee: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'paid_on_delivery' | 'failed' | 'refunded';
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  driverId?: string;
  estimatedMinutes: number;
  trackingStep: number; // 1 to 4
  deletedAt?: string | null;
}

export interface Driver {
  id: string;
  userId?: string;
  name: string;
  phone: string;
  avatar: string;
  vehicle: string; // e.g. "Scooter Yamasaki 125cc"
  licensePlate: string;
  status: 'available' | 'delivering' | 'offline';
  rating: number;
  totalDeliveries: number;
  currentOrderId?: string;
  currentLocation?: { lat: number; lng: number; quartier: string };
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface Coupon {
  id?: string;
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  active: boolean;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  discountPercent?: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  savedAddresses: string[];
  favorites: string[]; // product IDs
  createdAt?: string;
  updatedAt?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  categoryProvided: string;
  createdAt?: string;
}

export interface Purchase {
  id: string;
  supplierId: string;
  supplierName: string;
  totalAmount: number;
  status: 'pending' | 'received' | 'cancelled';
  itemsCount: number;
  purchaseDate: string;
  createdAt?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  type: 'in' | 'out' | 'adjustment' | 'return';
  reason: string;
  createdBy: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt?: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'order_status' | 'promo' | 'system' | 'driver_update';
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId?: string;
  userName?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: string;
  createdAt: string;
}

export interface CompanySetting {
  id: string;
  key: string;
  value: string;
  description?: string;
  updatedAt?: string;
}

export interface NeighborhoodInfo {
  name: string;
  zone: string;
  expressTimeMin: number;
  standardFee: number;
  expressFee: number;
}
