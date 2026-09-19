import { Product } from "./product";
import { Pagination } from "./products-response";
import { Variant } from "./variant";


export interface OrdersResponse {
  success: boolean;
  data: {
    orders: Order[];
    pagination: Pagination;
  };
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  user: User;
  payment: Payment;
  items: OrderItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  createdAt: string;

  product: Product;
  variant: Variant;
}



export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: number;
  stripeSessionId?: string | null;
}



export type PaymentStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

