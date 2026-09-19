export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
  productId: string;
  vendorId: string;
  createdAt: string;
  updatedAt: string;

  product: HeroBannerProduct;
  vendor: HeroBannerVendor;
}

export interface HeroBannerProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  isActive: boolean;
  salePercentage: number | null;
  saleStartDate: string | null;
  saleEndDate: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
  isPublished: boolean;
}

export interface HeroBannerVendor {
  id: string;
  name: string;
  email: string;
}



export interface GetHeroBannersResponse {
  success: boolean;
  data: HeroBanner[];
}