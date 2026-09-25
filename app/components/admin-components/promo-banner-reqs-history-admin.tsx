"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock, faCheck, faXmark, faBullhorn, faPercent, faCalendar } from "@fortawesome/free-solid-svg-icons";

import { getImageUrl } from "@/app/admin/utils/getImageUrl";

import type { BannerRequest } from "@/app/types/banner-request";
import { PromoBannerRequest } from "@/app/types/promo-banner-request";

interface PromoBannerRequestsHistoryProps {
  promoBannerRequests: PromoBannerRequest[];
  isLoading?: boolean;
  onApprove?: (request: PromoBannerRequest) => void;
  onReject?: (request: PromoBannerRequest) => void;
}

export default function PromoBannerRequestsHistoryAdmin({
  promoBannerRequests,
  isLoading = false,
  onApprove,
  onReject,
}: PromoBannerRequestsHistoryProps) {
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

  const getStatusStyle = (status: PromoBannerRequest["status"]) => {
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

  /* ================================================================
     Empty
  ================================================================ */

  if (!promoBannerRequests.length) {
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
                  <th className="w-[35%] px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
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

                  <th className="w-[15%] px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* ==========================================================
                  Body
              ========================================================== */}

              <tbody className="divide-y divide-gray-100">
                {promoBannerRequests.map((promoBannerRequest) => {
                  const statusStyle = getStatusStyle(promoBannerRequest.status);

                  return (
                    <tr
                      key={promoBannerRequest.id}
                      className="transition-colors hover:bg-gray-50/60"
                    >
                      {/* ==================================================
                          Product
                      ================================================== */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                            {promoBannerRequest.product.thumbnail ? (
                              <img
                                src={getImageUrl(promoBannerRequest.product.thumbnail)}
                                alt={promoBannerRequest.product.title}
                                sizes="48px"
                                className="h-full w-full object-cover"
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
                              {promoBannerRequest.product.title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-400">
                              #{promoBannerRequest.id.split("-")[0]}
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

                          {formatDate(promoBannerRequest.createdAt)}
                        </div>
                      </td>

                      {/* ==================================================
                          Offer
                      ================================================== */}

                      <td className="px-4 py-4">
                        {promoBannerRequest.offerPercentage !== null ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-[#DB4444]">
                            {promoBannerRequest.offerPercentage}

                            <FontAwesomeIcon
                              icon={faPercent}
                              className="text-[10px]"
                            />
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
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

                          {promoBannerRequest.status}
                        </span>
                      </td>

                      {/* ==================================================
                          Actions
                      ================================================== */}

                      <td className="px-5 py-4 text-center">
                        {promoBannerRequest.status === "PENDING" ? (
                          <div className="flex items-center justify-end gap-2">
                            {/* Approve */}

                            <button
                              type="button"
                              onClick={() => onApprove?.(promoBannerRequest)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-50"
                              title="Approve request"
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-xs"
                              />
                            </button>

                            {/* Reject */}

                            <button
                              type="button"
                              onClick={() => onReject?.(promoBannerRequest)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                              title="Reject request"
                            >
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="text-xs"
                              />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">
                            No actions
                          </span>
                        )}
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
        {promoBannerRequests.map((promoBannerRequest) => {
          const statusStyle = getStatusStyle(promoBannerRequest.status);

          return (
            <div
              key={promoBannerRequest.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 transition hover:shadow-sm"
            >
              {/* Product */}

              <div className="flex items-start gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  {promoBannerRequest.product.thumbnail ? (
                    <img
                      src={getImageUrl(promoBannerRequest.product.thumbnail)}
                      alt={promoBannerRequest.product.title}
                      sizes="56px"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                      <FontAwesomeIcon icon={faBullhorn} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    {promoBannerRequest.product.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    #{promoBannerRequest.id.split("-")[0]}
                  </p>

                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyle.wrapper}`}
                    >
                      <FontAwesomeIcon
                        icon={statusStyle.icon}
                        className="text-[10px]"
                      />

                      {promoBannerRequest.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-3">
                <div>
                  <p className="text-xs text-gray-400">Submitted</p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {formatDate(promoBannerRequest.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Offer</p>

                  <p className="mt-1 text-sm font-semibold text-[#DB4444]">
                    {promoBannerRequest.offerPercentage !== null
                      ? `${promoBannerRequest.offerPercentage}%`
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Actions */}

              {promoBannerRequest.status === "PENDING" ? (
                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                  {/* Approve */}

                  <button
                    type="button"
                    onClick={() => onApprove?.(promoBannerRequest)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-green-200 px-3 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
                  >
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-xs"
                    />

                    Approve
                  </button>

                  {/* Reject */}

                  <button
                    type="button"
                    onClick={() => onReject?.(promoBannerRequest)}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-xs"
                    />

                    Reject
                  </button>
                </div>
              ) : (
                <div className="mt-3 border-t border-gray-100 pt-3 text-center">
                  <span className="text-xs text-gray-400">
                    No actions available
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}