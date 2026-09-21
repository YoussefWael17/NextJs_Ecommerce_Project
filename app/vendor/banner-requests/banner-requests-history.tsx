"use client";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faClock,
  faCheck,
  faXmark,
  faPen,
  faTrash,
  faBullhorn,
  faPercent,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";

import { getImageUrl } from "@/app/admin/utils/getImageUrl";

import type { BannerRequest } from "@/app/types/banner-request";


interface BannerRequestsHistoryProps {
  requests: BannerRequest[];
  isLoading?: boolean;
  onDelete?: (request: BannerRequest) => void;
}

export default function BannerRequestsHistory({
  requests,
  isLoading = false,
  onDelete,
}: BannerRequestsHistoryProps) {



  /* ================================================================
     Loading
  ================================================================ */

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-20 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  /* ================================================================
     Helpers
  ================================================================ */

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusStyle = (status: BannerRequest["status"]) => {
    switch (status) {
      case "PENDING":
        return {
          wrapper: "bg-yellow-50 text-yellow-600 border-yellow-100",
          icon: faClock,
        };

      case "APPROVED":
        return {
          wrapper: "bg-green-50 text-green-600 border-green-100",
          icon: faCheck,
        };

      case "REJECTED":
        return {
          wrapper: "bg-red-50 text-red-600 border-red-100",
          icon: faXmark,
        };

      default:
        return {
          wrapper: "bg-gray-50 text-gray-600 border-gray-100",
          icon: faClock,
        };
    }
  };

  const router = useRouter();


  function navigateToViewBannerRequest(id: string) {
      return router.push(`/vendor/banner-requests/${id}/edit`)
  }

  /* ================================================================
     Empty
  ================================================================ */

  if (!requests.length) {
    return null;
  }

  return (
    <>
      {/* ================================================================
          Desktop Table
      ================================================================ */}

      <div className="hidden md:block">
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* ==========================================================
                  Header
              ========================================================== */}

              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="w-[40%] px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Product
                  </th>

                  <th className="w-[20%] px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Submitted
                  </th>

                  <th className="w-[15%] px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Offer
                  </th>

                  <th className="w-[15%] px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="w-[10%] px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* ==========================================================
                  Body
              ========================================================== */}

              <tbody className="divide-y divide-gray-100">
                {requests.map((request) => {
                  const statusStyle = getStatusStyle(request.status);

                  return (
                    <tr
                      key={request.id}
                      className="transition-colors hover:bg-gray-50/60"
                    >
                      {/* ==================================================
                          Product
                      ================================================== */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                            {request.product.thumbnail ? (
                              <img
                                src={getImageUrl(request.product.thumbnail!)}
                                alt={request.product.title}
                                // fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-400">
                                <FontAwesomeIcon
                                  icon={faBullhorn}
                                  className="text-sm"
                                />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <h3 className="max-w-65 truncate text-sm font-semibold text-gray-900">
                              {request.product.title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-400">
                              #{request.id.split("-")[0]}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* ==================================================
                          Submitted
                      ================================================== */}

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            className="text-xs text-gray-400"
                          />

                          {formatDate(request.createdAt)}
                        </div>
                      </td>

                      {/* ==================================================
                          Offer
                      ================================================== */}

                      <td className="px-4 py-4">
                        {request.offerPercentage !== null ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-[#DB4444]">
                            {request.offerPercentage}
                              <FontAwesomeIcon
                                icon={faPercent}
                                className="text-[10px]"
                              />
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">
                            —
                          </span>
                        )}
                      </td>

                      {/* ==================================================
                          Status
                      ================================================== */}

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-xs font-semibold ${statusStyle.wrapper}`}
                        >
                          <FontAwesomeIcon
                            icon={statusStyle.icon}
                            className="text-[10px]"
                          />

                          {request.status}
                        </span>
                      </td>

                      {/* ==================================================
                          Actions
                      ================================================== */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit */}

                          <button
                            type="button"
                            // onClick={() => onEdit?.(request)}
                            onClick={() => {navigateToViewBannerRequest(request.id)}}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                            title="Edit request"
                          >
                            <FontAwesomeIcon
                              icon={faPen}
                              className="text-xs"
                            />
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() => onDelete?.(request)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                            title="Delete request"
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-xs"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================================================================
          Mobile Cards
      ================================================================ */}

      <div className="space-y-3 md:hidden">
        {requests.map((request) => {
          const statusStyle = getStatusStyle(request.status);

          return (
            <div
              key={request.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-sm"
            >
              {/* Product */}

              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  {request.product.thumbnail ? (
                    <img
                      src={getImageUrl(request.product.thumbnail!)}
                      alt={request.product.title}
                      // fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <FontAwesomeIcon icon={faBullhorn} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    {request.product.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    #{request.id.split("-")[0]}
                  </p>

                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle.wrapper}`}
                    >
                      <FontAwesomeIcon
                        icon={statusStyle.icon}
                        className="text-[10px]"
                      />

                      {request.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
                <div>
                  <p className="text-xs text-gray-400">
                    Submitted
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {formatDate(request.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Offer
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#DB4444]">
                    {request.offerPercentage !== null
                      ? `${request.offerPercentage}%`
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Actions */}

              <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                <button
                  type="button"
                  // onClick={() => onEdit?.(request)}
                  onClick={() => {navigateToViewBannerRequest(request.id)}}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-xs"
                  />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => onDelete?.(request)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-xs"
                  />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

