import { Product } from "./cart";

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  image?: string
  products?: Product[]
}