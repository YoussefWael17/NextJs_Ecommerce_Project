import { Product } from "./product";

export type PromoBannerRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type PromoBannerRequest = {
  id: string;

  vendorId: string;
  productId: string;

  offerPercentage: number;

  startDate: string;
  endDate: string;

  backgroundColor?: string | null;
  note?: string | null;

  status: PromoBannerRequestStatus;

  createdAt: string;
  updatedAt: string;

  product: Product;
  vendor?: {
    id: string;
    name: string | null;
    email: string;
  };
};


export interface PromoBannerRequestsResponse {
  success: boolean;
  data: {
    promoBannerRequests: PromoBannerRequest[];
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

