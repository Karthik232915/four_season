export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  material: string;
  threadCount?: number;
  retailPrice: number;
  wholesalePrice: number;
  bulkPricingTiers?: BulkPricingTier[];
  moq?: number;
  featured: boolean;
  status: 'active' | 'inactive';
  rating: number;
  reviewCount: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  images: string[];
}

export interface ProductSize {
  size: string;
  dimensions: string;
  stock: number;
}

export interface BulkPricingTier {
  minQuantity: number;
  pricePerUnit: number;
}

export interface CartItem {
  product: Product;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  image: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface StatusUpdate {
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  timestamp: string;
  note?: string;
}

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet' | 'bank-transfer' | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerId: string;
  customerName: string;
  customerType: 'individual' | 'business';
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  shipping: {
    method: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
  };
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  statusHistory: StatusUpdate[];
  notes?: string;
  gstNumber?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'individual' | 'business';
  customerType: 'individual' | 'business';  // Added for backwards compatibility
  companyName?: string;
  gstNumber?: string;
  addresses?: Address[];
  orders?: Order[];
  wishlist?: string[];
  createdAt: string;
  status?: 'active' | 'blocked';
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  validFrom: Date;
  validTo: Date;
  usageLimit: number;
  usedCount: number;
  customerType?: 'individual' | 'business' | 'all';
  status: 'active' | 'inactive';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'super-admin' | 'admin' | 'manager';
}

export interface DashboardStats {
  todayRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  lowStockItems: number;
  totalCustomers: number;
  monthlyRevenue: number;
}
