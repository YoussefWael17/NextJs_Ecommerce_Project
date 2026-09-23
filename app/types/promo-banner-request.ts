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

  product?: Product;
  vendor?: {
    id: string;
    name: string | null;
    email: string;
  };
};