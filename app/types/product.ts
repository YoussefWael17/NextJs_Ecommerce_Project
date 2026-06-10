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

  categoryId: string;
  category: Category;

  vendorId: string;
  vendor: Vendor;

  variants?: Variant[];
  images: ProductImage[];

  createdAt: string;
  updatedAt: string;
}