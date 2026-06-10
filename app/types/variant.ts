export interface Size {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode?: string;
}

export interface Variant {
  id: string;
  sku: string;
  price: number;
  discountPrice: number;
  stock: number;

  productId: string;

  sizeId: string;
  colorId: string;

  createdAt: string;

  size?: Size;
  color?: Color;
}

