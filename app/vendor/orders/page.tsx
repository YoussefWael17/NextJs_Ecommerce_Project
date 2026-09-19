"use client";

import formatDate from "@/app/admin/utils/formateData";
import OrderPageSkeleton from "@/app/components/skeletonUI/vendor-orders-skeleton";
import { useGetOrdersQuery } from "@/app/redux/services/vendorsApi";
import { faCheckCircle, faClock, faTimesCircle, faTruck } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart, faMagnifyingGlass, faRotateRight, faTriangleExclamation, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VendorOrdersPage() {

    // Search State & Page State 
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Using RTK For Vendor Orders
    const { data, refetch, isLoading, isFetching, isError} = useGetOrdersQuery({page, limit:5, search: debouncedSearch});
    
    // Variables Declarations
    const orders = data?.data?.orders ?? [];
    const pagination = data?.data?.pagination;    
    const totalPages = pagination?.totalPages || 1;
    const totalOrders = pagination?.total ?? 0;
    const pendingOrders = pagination?.pending ?? 0;
    const shippedOrders = pagination?.shipped ?? 0;
    const deliveredOrders = pagination?.delivered ?? 0;
    const cancelledOrders = pagination?.cancelled ?? 0;

    // Show First & Last pages And The Current Page & Its Adjacent Pages
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) =>
      p === 1 ||
      p === totalPages ||
      Math.abs(p - page) <= 1
    );


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);


    if(isLoading){
        return(
            <OrderPageSkeleton />
        )
    }

    if (isError) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-lg">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                    <FontAwesomeIcon
                        icon={faTriangleExclamation}
                        className="text-3xl text-red-500"
                    />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                        Failed to load orders
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        We couldn't retrieve your orders right now.
                        Please check your connection and try again.
                    </p>

                    <button
                        onClick={refetch}
                        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#DB4444] px-5 py-3 font-medium text-white transition hover:bg-[#c83a3a]"
                    >
                        <FontAwesomeIcon icon={faRotateRight} />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="space-y-6 lg:space-y-8">

            {/* Header */}
            <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        
                <div>
                    <h1 className="text-2xl font-bold text-black sm:text-3xl">Orders Management</h1>
                    <p className="mt-2 text-sm text-gray-500">Manage customer orders for your products.</p>
                </div>
 
                <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DB4444] bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition duration-300 hover:bg-white hover:text-[#DB4444] sm:w-fit">
                    Export
                </button>
                
            </div>

            {/* Statistics */}
            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-5">

                {/* Total Orders */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </div>

                    <h3 className="text-2xl font-bold">
                        {totalOrders}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Total Orders
                    </p>
                </div>

                {/* Pending */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
                    <FontAwesomeIcon icon={faClock} />
                    </div>

                    <h3 className="text-2xl font-bold">
                        {pendingOrders}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Pending Orders
                    </p>
                </div>

                {/* Shipped */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <FontAwesomeIcon icon={faTruck} />
                    </div>

                    <h3 className="text-2xl font-bold">
                        {shippedOrders}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Shipped Orders
                    </p>
                </div>

                {/* Delivered */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>

                    <h3 className="text-2xl font-bold">
                        {deliveredOrders}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Delivered Orders
                    </p>
                </div>

                {/* Cancelled */}
                <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </div>

                    <h3 className="text-2xl font-bold">
                        {cancelledOrders}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Cancelled Orders
                    </p>
                </div>

            </div>

            {/* Orders Section */}                
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                
                {/* Orders Section Table Header */}   
                <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                    <div>
                        <h2 className="text-2xl font-semibold">
                            Customer Orders
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Explore orders of your products.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 sm:w-75">
                            <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            className="text-gray-400"
                            />

                            <input
                            type="text"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1); 
                            }}
                            className="w-full bg-transparent text-sm outline-none"
                            />

                            {isFetching && (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#DB4444]" />
                            )}
                        </div>

                    </div>

                </div>
                
                {/* Check Orders > 0) */} 
                { orders.length > 0 ? 

                // {/* Orders Section (Orders > 0) */} 
                <div>

                    {/* Orders Section Data Table Desktop */} 
                    <div className="hidden overflow-x-auto lg:block">
                        <table className="min-w-full border-separate border-spacing-y-3">
                            <thead>
                                <tr className="text-left text-sm text-gray-500">
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Items</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Payment</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                
                            <tbody>
                                {orders.map((order) => (
                                    <tr 
                                        key={order.id} 
                                        className="bg-gray-50 hover:bg-white transition">

                                        <td className="rounded-l-2xl px-4 py-4 font-medium">
                                            #{order.id.split("-")[0]}
                                        </td> 

                                        <td className="px-4 py-4">
                                            {order.user.name}
                                        </td>

                                        <td className="px-4 py-4">
                                            {order.items.length} Items
                                        </td>

                                        <td className="px-4 py-4 font-medium">
                                            ${order.totalAmount}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    order.status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : order.status === "SHIPPED"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : order.status === "DELIVERED"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : order.status === "CANCELLED"
                                                    ? "bg-red-100 text-red-700"
                                                    : ""
                                                }`}
                                                >
                                                {order.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    order?.payment?.status === "PENDING"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : order?.payment?.status === "PROCESSING"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : order?.payment?.status === "SHIPPED"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : order?.payment?.status === "DELIVERED"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                                >
                                                {order?.payment?.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-gray-500">
                                            {formatDate(order.createdAt)}
                                        </td>

                                        <td className="rounded-r-2xl px-4 py-4">

                                            <Link
                                                href={`/vendor/orders/${order.id}`}
                                                className="font-medium text-[#DB4444] hover:underline">
                                                    View
                                            </Link>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Orders Section Cards Mobile */}
                    <div className="space-y-4 lg:hidden">
                        {orders.map((order) => (
                            <div
                            key={order.id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                            >
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                <h3 className="font-semibold text-gray-900">
                                    #{order.id.split("-")[0]}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {order.user.name}
                                </p>
                                </div>

                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                {order.items.length} Items
                                </span>
                            </div>

                            {/* Info */}
                            <div className="mt-5 space-y-3 text-sm">

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Total</span>
                                <span className="font-semibold text-gray-900">
                                    ${order.totalAmount.toFixed(2)}
                                </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Order Status</span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    order?.status === "PENDING"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : order?.status === "PROCESSING"
                                        ? "bg-blue-100 text-blue-700"
                                        : order?.status === "SHIPPED"
                                        ? "bg-purple-100 text-purple-700"
                                        : order?.status === "DELIVERED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {order?.status}
                                </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Payment</span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    order?.payment?.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : order?.payment?.status === "PROCESSING"
                                    ? "bg-blue-100 text-blue-700"
                                    : order?.payment?.status === "SHIPPED"
                                    ? "bg-purple-100 text-purple-700"
                                    : order?.payment?.status === "DELIVERED"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                                    // className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    // order.payment?.status === "PENDING"
                                    //     ? "bg-yellow-100 text-yellow-700"
                                    //     : order.payment?.status === "PAID"
                                    //     ? "bg-green-100 text-green-700"
                                    //     : order.payment?.status === "FAILED"
                                    //     ? "bg-red-100 text-red-700"
                                    //     : order.payment?.status === "REFUNDED"
                                    //     ? "bg-gray-100 text-gray-700"
                                    //     : "bg-gray-100 text-gray-700"
                                    // }`}
                                >
                                    {order.payment?.status ?? "N/A"}
                                </span>
                                </div>

                                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                <span className="text-gray-500">Date</span>
                                <span className="font-medium text-gray-900">
                                    {formatDate(order.createdAt)}
                                </span>
                                </div>
                            </div>

                            {/* Action */}
                            <div className="mt-5">
                                <button className="w-full rounded-xl bg-[#DB4444] py-3 text-sm font-medium text-white transition hover:bg-red-600">
                                View Order
                                </button>
                            </div>
                            </div>
                        ))}
                    </div>

                    {/* Orders Section Pagination */}
                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">

                        <p className="text-sm text-gray-500">
                            Showing page {pagination?.page} of {pagination?.totalPages}
                        </p>

                        <div className="flex items-center gap-2">

                            <button
                            onClick={() => setPage((prev) => prev - 1)}
                            disabled={page === 1}
                            className="rounded-xl border border-gray-200 px-4 py-2 text-sm transition hover:border-[#DB4444] hover:text-[#DB4444] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                            Previous
                            </button>


                            {visiblePages.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => setPage(pageNumber)}
                                className={`h-10 w-10 rounded-xl text-sm font-medium transition ${
                                page === pageNumber
                                    ? "bg-[#DB4444] text-white"
                                    : "border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444]"
                                }`}
                            >
                                {pageNumber}
                            </button>
                            ))}

                            <button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page === pagination?.totalPages}
                            className="rounded-xl border border-gray-200 px-4 py-2 text-sm transition hover:border-[#DB4444] hover:text-[#DB4444] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                            Next
                            </button>

                        </div>
                    </div>

                </div>
                :

                // {/* Empty Orders State */} 
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
                    
                    {/* Empty State Icon */}
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                        <FontAwesomeIcon
                            icon={faBoxOpen}
                            className="text-3xl text-[#DB4444]"
                        />
                    </div>

                    {/* Empty State Content */}
                    <h3 className="text-xl font-semibold text-gray-900">
                        No Orders Found
                    </h3>

                    <p className="mt-2 max-w-md text-sm text-gray-500">
                        There are no orders to display at the moment.
                    {debouncedSearch &&
                        " Try adjusting your search or clear the search term."}
                    </p>

                    {/* Clear Search Button */}
                    {debouncedSearch && (
                    <button
                        onClick={() => {
                        setSearch("");
                        setDebouncedSearch("");
                        setPage(1);
                        }}
                        className="mt-6 rounded-xl bg-[#DB4444] px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                        Clear Search
                    </button>
                    )}

                </div> 
                }
                        
            </div>

        </div>
  );
}