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


export interface UpdateVariantPayload {
    id: string;
    data: {
        stock?: number;
        price?: number;
        size?: string;
        color?: string;
    };
}


export interface EditedVariant {
    sizeId: string;
    colorId: string;
    stock: number | string;
    price: number | string;
}
