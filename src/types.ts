import type { MenuItem } from './data/restaurantData';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface CustomerOrderDetails {
  customerName: string;
  phone: string;
  orderType: 'dine-in' | 'takeaway' | 'delivery';
  addressOrTable: string;
  specialInstructions: string;
}
