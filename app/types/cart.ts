export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
}

export interface Size {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  sku: string;
  price: number;
  discountPrice: number;
  stock: number;
  product: Product;
  color: Color;
  size: Size;
}

export interface CartItem {
  id: string;
  cartId: string;
  variantId: string;
  quantity: number;
  createdAt: string;
  variant: Variant;
}