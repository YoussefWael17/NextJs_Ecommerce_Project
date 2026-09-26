export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image: string;
  buttonText: string;
  buttonLink: string;
  startDate: Date;
  endDate: Date;
  backgroundColor: string;
  isActive: boolean;
  productId: string;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
  product: PromoBannerProduct;
}


export interface PromoBannerProduct {
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



export interface GetPrommBannersResponse {
  success: boolean;
  data: PromoBanner[];
}