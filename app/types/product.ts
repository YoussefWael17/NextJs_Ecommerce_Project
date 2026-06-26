import { Category } from "./category";
import { ProductImage } from "./product-images";
import { Variant } from "./variant";
import { Vendor } from "./vendor";

export interface Product {
  id: string;

  title: string;
  slug: string;
  description: string;
  thumbnail: string;

  isActive: boolean;
  isSale: boolean;

  price: number;

  categoryId: string;
  category: Category;

  vendorId: string;
  vendor: Vendor;

  variants?: Variant[];
  images: ProductImage[];

  createdAt: string;
  updatedAt: string;

  totalReviews: number;
  avgRating: number;

  salePercentage?: number,
  saleStartDate?: string,
  saleEndDate?: string,
}

export interface ProductUI {
  id: string;
  title: string;
  thumbnail: string;

  category: Category;

  price: number;
  // discount?: number;
  // isOffered?: boolean;

  variants?: Variant[];

  // isAdded?: boolean;

  totalReviews: number;
  avgRating: number;

  salePercentage?: number;
  saleStartDate?: string;
  saleEndDate?: string;
}


export interface ProductCardUI {
  id: string;
  title: string;
  thumbnail: string;

  category: {
    id: string;
    name: string;
  };

  price: number; 

  variants?: Variant[];
  variant?: Variant;

  salePercentage?: number;
  saleEndDate?: string;

  totalReviews: number;
  avgRating: number;
}