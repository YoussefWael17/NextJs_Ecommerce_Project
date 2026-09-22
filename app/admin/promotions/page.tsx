"use client";

import Image from "next/image";
import { useApproveBannerRequestMutation, useGetBannerRequestsQuery, useRejectBannerRequestMutation } from "@/app/redux/services/adminsApi";
import { faTags, faPercent, faCalendarDays, faCircleCheck, faClock, faBan, faPlus, faMagnifyingGlass, faEllipsisVertical, faCheck, faXmark, faBullhorn, faBoxOpen, faRotateRight, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import formatDate from "../utils/formateData";
import BannerRequestsHistory from "@/app/vendor/banner-requests/banner-requests-history";
import VendorBannerRequestsPageSkeleton from "@/app/components/skeletonUI/vendor-banner-requests-history-skeleton";
import { BannerRequest } from "@/app/types/banner-request";
import { toast } from "sonner";
import BannerRequestsHistoryAdmin from "@/app/components/admin-components/banner-reqs-history-admin";

export default function AdminPromotionsPage() {
  

  // Search State & Page State 
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  // Using RTK For Admin Banner Requests
  const { data, refetch, isLoading, isFetching, isError} = useGetBannerRequestsQuery({page, limit:5, search: debouncedSearch});
  const [ approveRequestBanner ] = useApproveBannerRequestMutation()
  const [ rejectRequestBanner ] = useRejectBannerRequestMutation()
  
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

  async function handleApprove(request: BannerRequest) {
    try {
      await approveRequestBanner(request.id).unwrap();
      toast.success("Banner Request Approved Successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to Approve Banner Request");
    }
  }

  async function handleReject(request: BannerRequest) {
    try {
      await rejectRequestBanner(request.id).unwrap();
      toast.success("Banner Request Rejected Successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to Reject Banner Request");
    }
  }

  

  /* ================================================================
  Loading
  ================================================================ */

  if (isLoading || isFetching) {
    return <VendorBannerRequestsPageSkeleton />;
  }

  /* ================================================================
     Error
  ================================================================ */

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
            Failed to load banner requests
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We couldn't retrieve your banner requests right now.
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

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
              <FontAwesomeIcon icon={faBullhorn} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-black sm:text-3xl">
                Promotions Management
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Manage promotional campaigns across your marketplace.
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        
        {/* Total */}

        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faBullhorn} />
          </div>

          <h3 className="text-2xl font-bold">
            {totalBanners || "total requests"}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
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

        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <FontAwesomeIcon icon={faXmark} />
          </div>

          <h3 className="text-2xl font-bold">
            {rejectedBanners}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Rejected
          </p>

        </div>
        
      </div>


      {/* ================================================================
          Requests Section
      ================================================================ */}

      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

        {/* ================================================================
            Section Header + Search
        ================================================================ */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Requests List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage and track your banner requests.
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
                placeholder="Search requests..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
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


        {/* ================================================================
            Requests
        ================================================================ */}

        {banners.length > 0 ? (

          <div>

            <BannerRequestsHistoryAdmin
              requests={banners}
              isLoading={false}
              onApprove={handleApprove}
              onReject={handleReject}
            />


            {/* ============================================================
                Pagination
            ============================================================ */}

            <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-gray-500">
                Showing page {pagination?.page} of{" "}
                {pagination?.totalPages}
              </p>


              <div className="flex items-center justify-center gap-2">

                {/* Previous */}

                <button
                  type="button"
                  onClick={() =>
                    setPage((previous) => previous - 1)
                  }
                  disabled={
                    !pagination?.hasPreviousPage ||
                    isFetching
                  }
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm transition hover:border-[#DB4444] hover:text-[#DB4444] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>


                {/* Page Numbers */}

                {visiblePages.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    disabled={isFetching}
                    className={`h-10 w-10 rounded-xl text-sm font-medium transition ${
                      page === pageNumber
                        ? "bg-[#DB4444] text-white"
                        : "border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444]"
                    } disabled:cursor-not-allowed`}
                  >
                    {pageNumber}
                  </button>
                ))}


                {/* Next */}

                <button
                  type="button"
                  onClick={() =>
                    setPage((previous) => previous + 1)
                  }
                  disabled={
                    !pagination?.hasNextPage ||
                    isFetching
                  }
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm transition hover:border-[#DB4444] hover:text-[#DB4444] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>

              </div>

            </div>

          </div>

        ) : (

          /* ==============================================================
             Empty State
          ============================================================== */

          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-3xl text-[#DB4444]"
              />
            </div>


            <h3 className="text-xl font-semibold text-gray-900">
              No Banner Requests Found
            </h3>


            <p className="mt-2 max-w-md text-sm text-gray-500">
              There are no banner requests to display at the moment.

              {debouncedSearch &&
                " Try adjusting your search or clear the search term."}
            </p>


            {debouncedSearch && (
              <button
                type="button"
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

        )}

      </div>

      

    </div>
  );
}









