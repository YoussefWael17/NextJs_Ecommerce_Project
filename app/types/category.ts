import { Product } from "./cart";

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  createdAt?: string;
  icon?: string
  products?: Product[]
}

export interface UpdateCategoryFormValues {
  name: string;
  image: File | null;
}