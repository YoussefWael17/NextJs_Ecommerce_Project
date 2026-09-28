interface VendorAnalyticsStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
}

interface SalesOverview {
  name: string;
  year: number;
  month: number;
  sales: number;
}

interface OrdersStatus {
  name: string;
  value: number;
}

interface CustomersGrowth {
  month: string;
  year: number;
  customers: number;
}

interface RecentActivity {
  id: string;
  type: string;
  title: string;
  createdAt: string;
  metadata?: {
    orderId?: string;
    productId?: string;
    productTitle?: string;
    requestId?: string;
    status?: string;
  };
}

interface VendorAnalyticsResponse {
  success: boolean;
  data: {
    stats: VendorAnalyticsStats;
    salesOverview: SalesOverview[];
    ordersStatus: OrdersStatus[];
    customersGrowth: CustomersGrowth[];
    recentActivity: RecentActivity[];
  };
}