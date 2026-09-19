"use client";

import Image from "next/image";
import { useGetBannerRequestsQuery } from "@/app/redux/services/adminsApi";
import { faTags, faPercent, faCalendarDays, faCircleCheck, faClock, faBan, faPlus, faMagnifyingGlass, faEllipsisVertical, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import formatDate from "../utils/formateData";

export default function AdminPromotionsPage() {
  

  // Search State & Page State 
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Using RTK For Admin Banner Requests
  const { data, refetch, isLoading, isFetching, isError} = useGetBannerRequestsQuery({page, limit:5, search: debouncedSearch});
  
  // Variables Declarations
  const banners = data?.data?.bannerRequests ?? [];
  const pagination = data?.data?.pagination;    
  const totalPages = pagination?.totalPages || 1;
  const totalBanners = pagination?.total ?? 0;
  const activeBanners = pagination?.approved ?? 0;
  const pendingBanners = pagination?.pending ?? 0;
  const rejectedBanners = pagination?.rejected ?? 0;

  // console.log(data)
  console.log(banners)

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

  function handleApprove(id: string) {
    console.log("approved +", id)
  }

  function handleReject(id: string) {
    console.log("approved +", id)
  }

  

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Promotions Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage promotional campaigns across your marketplace.
          </p>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Total Requests */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faTags} />
          </div>

          <h3 className="text-2xl font-bold">{totalBanners}</h3>

          <p className="text-sm text-gray-500">
            Total Requests
          </p>
        </div>

        {/* Approved */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>

          <h3 className="text-2xl font-bold">{activeBanners}</h3>

          <p className="text-sm text-gray-500">
            Approved
          </p>
        </div>

        {/* Pending */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600">
            <FontAwesomeIcon icon={faClock} />
          </div>

          <h3 className="text-2xl font-bold">{pendingBanners}</h3>

          <p className="text-sm text-gray-500">
            Pending
          </p>
        </div>

        {/* Rejected */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <FontAwesomeIcon icon={faBan} />
          </div>

          <h3 className="text-2xl font-bold">{rejectedBanners}</h3>

          <p className="text-sm text-gray-500">
            Rejected
          </p>
        </div>
      </div>

      {/* Promotions */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-2xl font-semibold">
              Promotions
            </h2>

            <p className="text-sm text-gray-500">
              Manage all promotional campaigns.
            </p>

          </div>

          <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 sm:w-75">
                <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-400"
                />

                <input
                type="text"
                placeholder="Search products..."
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


        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Vendor</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Requested At</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {banners.map((promotion) => (
                <tr key={promotion.id}>
                  {/* Product */}
                  <td className="rounded-l-2xl bg-gray-50 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-200">
                        <Image
                          src={getImageUrl(promotion.product.thumbnail)}
                          alt={promotion.product.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {promotion.product.title}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {formatDate(promotion.createdAt)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Vendor */}
                  <td className="bg-gray-50 px-4 py-4">
                    <span className="font-medium">
                      {promotion.vendor.name}
                    </span>
                  </td>

                  {/* Slug */}
                  <td className="bg-gray-50 px-4 py-4">
                    <span className="text-sm text-gray-600">
                      {promotion.product.slug}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="bg-gray-50 px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        promotion.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : promotion.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {promotion.status}
                    </span>
                  </td>

                  {/* Requested At */}
                  <td className="bg-gray-50 px-4 py-4 text-sm text-gray-500">
                    {formatDate(promotion.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="rounded-r-2xl bg-gray-50 px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Approve */}
                      <button
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 transition hover:bg-green-600 hover:text-white"
                        title="Approve"
                        onClick={() => handleApprove(promotion.id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>

                      {/* Reject */}
                      <button
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 transition hover:bg-red-600 hover:text-white"
                        title="Reject"
                        onClick={() => handleReject(promotion.id)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>





        {/* Mobile Cards */}

        {/* <div className="space-y-4 lg:hidden">

          {promotions.map((promotion) => (

            <div
              key={promotion.id}
              className="rounded-2xl border border-gray-200 p-5 shadow-sm"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-semibold">
                    {promotion.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {promotion.stock}
                  </p>

                </div>

                <button>

                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                  />

                </button>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-gray-50 p-3">

                  <p className="text-xs text-gray-500">
                    Discount
                  </p>

                  <h4 className="mt-1 font-semibold">

                    {promotion.discount > 0
                      ? `${promotion.discount}%`
                      : "Free"}

                  </h4>

                </div>

                <div className="rounded-xl bg-gray-50 p-3">

                  <p className="text-xs text-gray-500">
                    Type
                  </p>

                  <h4 className="mt-1 font-semibold">
                    {promotion.type}
                  </h4>

                </div>

                <div className="rounded-xl bg-gray-50 p-3">

                  <p className="text-xs text-gray-500">
                    Start
                  </p>

                  <h4 className="mt-1 font-semibold">
                    {promotion.startDate}
                  </h4>

                </div>

                <div className="rounded-xl bg-gray-50 p-3">

                  <p className="text-xs text-gray-500">
                    End
                  </p>

                  <h4 className="mt-1 font-semibold">
                    {promotion.endDate}
                  </h4>

                </div>

              </div>

              <div className="mt-5">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium

                    ${
                      promotion.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"

                        : promotion.status === "SCHEDULED"
                        ? "bg-blue-100 text-blue-700"

                        : promotion.status === "DRAFT"
                        ? "bg-orange-100 text-orange-700"

                        : "bg-gray-100 text-gray-700"
                    }

                  `}
                >

                  {promotion.status}

                </span>

              </div>

            </div>

          ))}

        </div> */}

        {/* Empty State */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#DB4444]" />
          </div>
        ) : banners.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 py-20">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
                <FontAwesomeIcon
                  icon={faTags}
                  className="text-4xl text-[#DB4444]"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900">
                No Banner Requests Found
              </h3>

              <p className="mt-3 max-w-md text-center text-gray-500">
                There are currently no banner requests from vendors.
                New requests will appear here for review and approval.
              </p>
            </div>
        ) : null}

        {/* Promotions Section Pagination */}
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

    </div>
  );
}