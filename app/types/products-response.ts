import { Product } from "./product";

export interface Pagination {
    total: number,
    page: number,
    limit: number,
    totalPages: number,
    pending: number,
    paid: number,
    shipped: number,
    delivered: number,
    cancelled: number,
    availableProducts: number,
    outOfStockProducts: number,
    totalInventory: number
}

export interface ProductsResponse {
    success: boolean,
    data: {
        products: Product[],
        pagination: Pagination
    }
}