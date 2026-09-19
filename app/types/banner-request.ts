export type BannerRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface BannerRequestVendor {
  id: string;
  name: string;
  email: string;
}

export interface BannerRequestProduct {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
}

export interface BannerRequest {
  id: string;
  vendorId: string;
  productId: string;

  status: BannerRequestStatus;
  note?: string | null;

  offerPercentage?: number;
  icon?: string;

  createdAt: string;
  updatedAt: string;

  vendor: BannerRequestVendor;
  product: BannerRequestProduct;
}

export interface BannerRequestsResponse {
  success: boolean;
  data: {
    bannerRequests: BannerRequest[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      pending: number;
      approved: number;
      rejected: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean
    };
  };
}

