export type BreadCategory = 
  | 'all'
  | 'shiopan'
  | 'sourdough'
  | 'croissant'
  | 'loaf'
  | 'dessert';

export interface BreadItem {
  id: string;
  nameKo: string;
  nameEn: string;
  category: Exclude<BreadCategory, 'all'>;
  price: number;
  originalPrice?: number;
  description: string;
  details: string;
  ingredients: string[];
  bakeTime: string; // e.g. '08:30 출하'
  status: 'available' | 'low_stock' | 'sold_out';
  remainingCount: number;
  maxPerOrder: number;
  image: string;
  sliceable: boolean;
  pairingNote: string;
  reheatTip: string;
  tags: string[];
}

export interface CartItem {
  bread: BreadItem;
  quantity: number;
  sliceOption: 'none' | 'thin' | 'medium' | 'thick';
}

export interface Reservation {
  id: string; // e.g. 'MK-261108-042'
  items: CartItem[];
  totalPrice: number;
  ecoDiscount: number; // e.g. 500 won
  finalPrice: number;
  pickupDate: string; // '오늘 (2026.11.08)' or '내일'
  pickupTime: string; // '14:30'
  customerName: string;
  customerPhone: string;
  ecoPackaging: boolean;
  notes: string;
  paymentMethod: 'onsite' | 'transfer';
  status: 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';
  createdAt: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'finished' | 'in_oven' | 'scheduled';
  breadIds: string[];
}
