import { Product } from "./product";

export interface Pagination {
    total: number,
    page: number,
    limit: number,
    totalPages: number,
}

export interface ProductsResponse {
    success: boolean,
    data: {
        products: Product[],
        pagination: Pagination
    }
}