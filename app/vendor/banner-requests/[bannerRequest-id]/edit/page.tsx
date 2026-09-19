// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faBullhorn,
//   faFire,
//   faTag,
//   faPercent,
//   faShoePrints,
//   faAppleWhole,
//   faBolt,
//   faStar,
//   faTriangleExclamation,
//   faRotateRight,
//   faArrowLeft,
//   faCalendar,
// } from "@fortawesome/free-solid-svg-icons";

// import { faApple } from "@fortawesome/free-brands-svg-icons";

// import BannerPreview from "../../banner-preview";

// import BannerRequestsPageSkeleton from "@/app/components/skeletonUI/banner-requests-skeleton";

// import {
//   useGetProductsQuery,
//   useGetSingleBannerRequestQuery,
// } from "@/app/redux/services/vendorsApi";
// import { date } from "yup";

// export default function ViewBannerRequestPage() {
//   const router = useRouter();

//   const params = useParams<{ id: string }>();
//   const requestId = params.id;

//   /* ================================================================
//       Form / View State
//   ================================================================ */

//   const [product, setProduct] = useState("");
//   const [icon, setIcon] = useState("faFire");
//   const [offerPercentage, setOfferPercentage] = useState("");
//   const [backgroundColor, setBackgroundColor] = useState("#000000");
//   const [note, setNote] = useState("");

//   /* ================================================================
//       Get Banner Request
//   ================================================================ */

//   const {
//     data: requestData,
//     isLoading: isRequestLoading,
//     isError: isRequestError,
//     refetch: refetchRequest,
//   } = useGetSingleBannerRequestQuery(requestId, {
//     skip: !requestId,
//   });

//   /* ================================================================
//       Get Products
//   ================================================================ */


//   const products = requestData?.data ?? [];

//   /* ================================================================
//       Icons
//   ================================================================ */

//   const icons = [
//     {
//       name: "faFire",
//       label: "Fire",
//       icon: faFire,
//     },
//     {
//       name: "faTag",
//       label: "Tag",
//       icon: faTag,
//     },
//     {
//       name: "faPercent",
//       label: "Percent",
//       icon: faPercent,
//     },
//     {
//       name: "faShoePrints",
//       label: "Shoes",
//       icon: faShoePrints,
//     },
//     {
//       name: "faAppleWhole",
//       label: "Apple",
//       icon: faAppleWhole,
//     },
//     {
//       name: "faApple",
//       label: "Apple Brand",
//       icon: faApple,
//     },
//     {
//       name: "faBolt",
//       label: "Flash",
//       icon: faBolt,
//     },
//     {
//       name: "faStar",
//       label: "Featured",
//       icon: faStar,
//     },
//   ];

//   /* ================================================================
//       Populate View
//   ================================================================ */

//   useEffect(() => {
//     const request = requestData?.data;

//     if (!request) {
//       return;
//     }

//     setProduct(request.productId);

//     setIcon(
//       request.icon || "faFire"
//     );

//     setOfferPercentage(
//       request.offerPercentage !== null &&
//       request.offerPercentage !== undefined
//         ? String(request.offerPercentage)
//         : ""
//     );

//     setBackgroundColor(
//        "#000000"
//     );

//     setNote(
//       request.note || ""
//     );
//   }, [requestData]);

//   /* ================================================================
//       Initial Loading
//   ================================================================ */

//   if (
//     isRequestLoading ) {
//     return <BannerRequestsPageSkeleton />;
//   }

//   /* ================================================================
//       Request Error
//   ================================================================ */

//   if (isRequestError) {
//     return (
//       <div className="flex min-h-[70vh] items-center justify-center px-4">
//         <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-lg">

//           <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
//             <FontAwesomeIcon
//               icon={faTriangleExclamation}
//               className="text-3xl text-red-500"
//             />
//           </div>

//           <h2 className="mt-6 text-2xl font-bold text-gray-900">
//             Failed to load banner request
//           </h2>

//           <p className="mt-2 text-sm leading-6 text-gray-500">
//             We couldn't retrieve this banner request.
//             Please try again.
//           </p>

//           <div className="mt-8 flex gap-3">

//             <button
//               type="button"
//               onClick={() => router.back()}
//               className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 font-medium text-gray-600 transition hover:bg-gray-50"
//             >
//               <FontAwesomeIcon icon={faArrowLeft} />
//               Back
//             </button>

//             <button
//               type="button"
//               onClick={() => refetchRequest()}
//               className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#DB4444] px-5 py-3 font-medium text-white transition hover:bg-[#c83a3a]"
//             >
//               <FontAwesomeIcon icon={faRotateRight} />
//               Try Again
//             </button>

//           </div>

//         </div>
//       </div>
//     );
//   }

//   /* ================================================================
//       Selected Product
//   ================================================================ */

// //   const selectedProduct = products.find(
// //     (item) => item.id === product
// //   );

//   const currentRequest = requestData?.data;

//   /* ================================================================
//       Status Style
//   ================================================================ */

//   const getStatusStyle = (
//     status?: string
//   ) => {
//     switch (status) {
//       case "PENDING":
//         return {
//           wrapper:
//             "border-orange-100 bg-orange-50 text-orange-600",
//           dot: "bg-orange-500",
//         };

//       case "APPROVED":
//         return {
//           wrapper:
//             "border-green-100 bg-green-50 text-green-600",
//           dot: "bg-green-500",
//         };

//       case "REJECTED":
//         return {
//           wrapper:
//             "border-red-100 bg-red-50 text-red-600",
//           dot: "bg-red-500",
//         };

//       default:
//         return {
//           wrapper:
//             "border-gray-200 bg-gray-50 text-gray-600",
//           dot: "bg-gray-500",
//         };
//     }
//   };

//   const statusStyle = getStatusStyle(
//     currentRequest?.status
//   );

//   /* ================================================================
//       Format Date
//   ================================================================ */

//   const formatDate = (
//     date?: string
//   ) => {
//     if (!date) {
//       return "—";
//     }

//     return new Date(date).toLocaleDateString(
//       "en-US",
//       {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }
//     );
//   };

//   /* ================================================================
//       Current Icon
//   ================================================================ */

//   const selectedIcon =
//     icons.find(
//       (item) => item.name === icon
//     )?.icon ?? faFire;

//   /* ================================================================
//       Return
//   ================================================================ */

//   return (
//     <div className="space-y-8">

//       {/* ================================================================
//           Header
//       ================================================================ */}

//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//         <div className="flex items-center gap-3">

//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#DB4444]">
//             <FontAwesomeIcon icon={faBullhorn} />
//           </div>

//           <div>

//             <h1 className="text-2xl font-bold text-gray-900">
//               Banner Request Details
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               View the details and preview of your banner request.
//             </p>

//           </div>

//         </div>

//         <button
//           type="button"
//           onClick={() => router.back()}
//           className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} />
//           Back
//         </button>

//       </div>

//       {/* ================================================================
//           Request Information
//       ================================================================ */}

//       <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

//         {/* ============================================================
//             Card Header
//         ============================================================ */}

//         <div className="mb-8 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">

//           <div>

//             <h2 className="text-lg font-semibold text-gray-900">
//               Request Information
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Details submitted for this banner request.
//             </p>

//           </div>

//           {currentRequest?.status && (
//             <span
//               className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle.wrapper}`}
//             >
//               <span
//                 className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
//               />

//               {currentRequest.status}
//             </span>
//           )}

//         </div>

//         {/* ============================================================
//             Product + Icon
//         ============================================================ */}

//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

//           {/* ==========================================================
//               Product
//           ========================================================== */}

//           <div>

//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Selected Product
//             </label>

//             <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

//               {currentRequest?.product.thumbnail ? (
//                 <img
//                   src={currentRequest.product?.thumbnail}
//                   alt={currentRequest.product.title}
//                   className="h-10 w-10 rounded-lg object-cover"
//                 />
//               ) : (
//                 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-400">
//                   <FontAwesomeIcon
//                     icon={faBullhorn}
//                   />
//                 </div>
//               )}

//               <div className="min-w-0">

//                 <p className="truncate text-sm font-semibold text-gray-800">
//                   {currentRequest?.product.title ||
//                     currentRequest?.product?.title ||
//                     "—"}
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-400">
//                   Product ID:{" "}
//                   {currentRequest?.productId || "—"}
//                 </p>

//               </div>

//             </div>

//           </div>

//           {/* ==========================================================
//               Icon
//           ========================================================== */}

//           <div>

//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Banner Icon
//             </label>

//             <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#DB4444]">

//                 <FontAwesomeIcon
//                   icon={selectedIcon}
//                 />

//               </div>

//               <div>

//                 <p className="text-sm font-semibold text-gray-800">
//                   {
//                     icons.find(
//                       (item) =>
//                         item.name === icon
//                     )?.label ||
//                     icon
//                   }
//                 </p>

//                 <p className="mt-0.5 text-xs text-gray-400">
//                   {icon}
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//         {/* ============================================================
//             Offer + Dates
//         ============================================================ */}

//         <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">

//           {/* ==========================================================
//               Offer
//           ========================================================== */}

//           <div>

//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Offer Percentage
//             </label>

//             <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-[#DB4444]">

//                 <FontAwesomeIcon
//                   icon={faPercent}
//                 />

//               </div>

//               <p className="text-sm font-semibold text-gray-800">
//                 {offerPercentage !== ""
//                   ? `${offerPercentage}%`
//                   : "—"}
//               </p>

//             </div>

//           </div>

//           {/* ==========================================================
//               Created At
//           ========================================================== */}

//           <div>

//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Submitted
//             </label>

//             <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">

//                 <FontAwesomeIcon
//                   icon={faCalendar}
//                 />

//               </div>

//               <p className="text-sm font-medium text-gray-700">
//                 {formatDate(
//                   currentRequest?.createdAt
//                 )}
//               </p>

//             </div>

//           </div>

//           {/* ==========================================================
//               Updated At
//           ========================================================== */}

//           <div>

//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Last Updated
//             </label>

//             <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">

//                 <FontAwesomeIcon
//                   icon={faCalendar}
//                 />

//               </div>

//               <p className="text-sm font-medium text-gray-700">
//                 {formatDate(
//                   currentRequest?.updatedAt
//                 )}
//               </p>

//             </div>

//           </div>

//         </div>

//         {/* ============================================================
//             Note
//         ============================================================ */}

//         <div className="mt-6">

//           <label className="mb-2 block text-sm font-medium text-gray-700">
//             Note
//           </label>

//           <div className="min-h-24 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

//             <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
//               {note.trim()
//                 ? note
//                 : "No note provided."}
//             </p>

//           </div>

//         </div>

//         {/* ============================================================
//             Background Color
//         ============================================================ */}

//         <div className="mt-6">

//           <label className="mb-2 block text-sm font-medium text-gray-700">
//             Banner Background
//           </label>

//           <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

//             <div
//               className="h-9 w-9 rounded-lg border border-black/10 shadow-sm"
//               style={{
//                 backgroundColor,
//               }}
//             />

//             <div>

//               <p className="text-sm font-semibold uppercase text-gray-800">
//                 {backgroundColor}
//               </p>

//               <p className="mt-0.5 text-xs text-gray-400">
//                 Selected banner background color
//               </p>

//             </div>

//           </div>

//         </div>

//         {/* ============================================================
//             Banner Preview
//         ============================================================ */}

//         <div className="mt-8 border-t border-gray-200 pt-8">

//           <div className="mb-4">

//             <h3 className="text-sm font-semibold text-gray-900">
//               Banner Preview
//             </h3>

//             <p className="mt-1 text-xs text-gray-500">
//               Preview of how your banner request will appear.
//             </p>

//           </div>

//           <BannerPreview
//             product={currentRequest?.product}
//             icon={icon}
//             offerPercentage={offerPercentage}
//             backgroundColor={backgroundColor}
//           />

//         </div>

//         {/* ============================================================
//             Footer
//         ============================================================ */}

//         <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">

//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
//           >
//             <FontAwesomeIcon
//               icon={faArrowLeft}
//             />

//             Back to Requests
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }


"use client";

import { useParams, useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBullhorn,
  faFire,
  faTag,
  faPercent,
  faShoePrints,
  faAppleWhole,
  faBolt,
  faStar,
  faTriangleExclamation,
  faRotateRight,
  faArrowLeft,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

import { faApple } from "@fortawesome/free-brands-svg-icons";

import BannerPreview from "../../banner-preview";

import BannerRequestsPageSkeleton from "@/app/components/skeletonUI/banner-requests-skeleton";

import { useGetSingleBannerRequestQuery } from "@/app/redux/services/vendorsApi";

import { getImageUrl } from "@/app/admin/utils/getImageUrl";

import type { BannerRequest } from "@/app/types/banner-request";

export default function ViewBannerRequestPage() {
  const router = useRouter();

  const params = useParams<{"bannerRequest-id": string;}>();

    const requestId = params["bannerRequest-id"];
 

  /* ================================================================
      Get Banner Request
  ================================================================ */

  const {
    data: requestData,
    isLoading: isRequestLoading,
    isError: isRequestError,
    refetch: refetchRequest,
  } = useGetSingleBannerRequestQuery(requestId, {
    skip: !requestId,
  });

  const currentRequest: BannerRequest | undefined =
    requestData?.data;

  /* ================================================================
      Icons
  ================================================================ */

  const icons = [
    {
      name: "faFire",
      label: "Fire",
      icon: faFire,
    },
    {
      name: "faTag",
      label: "Tag",
      icon: faTag,
    },
    {
      name: "faPercent",
      label: "Percent",
      icon: faPercent,
    },
    {
      name: "faShoePrints",
      label: "Shoes",
      icon: faShoePrints,
    },
    {
      name: "faAppleWhole",
      label: "Apple",
      icon: faAppleWhole,
    },
    {
      name: "faApple",
      label: "Apple Brand",
      icon: faApple,
    },
    {
      name: "faBolt",
      label: "Flash",
      icon: faBolt,
    },
    {
      name: "faStar",
      label: "Featured",
      icon: faStar,
    },
  ];

  /* ================================================================
      Loading
  ================================================================ */

  if (isRequestLoading) {
    return <BannerRequestsPageSkeleton />;
  }

  /* ================================================================
      Error
  ================================================================ */

  if (isRequestError || !currentRequest) {
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
            Failed to load banner request
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We couldn't retrieve this banner request.
            Please try again.
          </p>

          <div className="mt-8 flex gap-3">

            <button
              type="button"
              onClick={() => router.back()}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 font-medium text-gray-600 transition hover:bg-gray-50"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back
            </button>

            <button
              type="button"
              onClick={() => refetchRequest()}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#DB4444] px-5 py-3 font-medium text-white transition hover:bg-[#c83a3a]"
            >
              <FontAwesomeIcon icon={faRotateRight} />
              Try Again
            </button>

          </div>

        </div>
      </div>
    );
  }

  /* ================================================================
      Current Values
  ================================================================ */

  const iconName = currentRequest.icon || "faFire";

  const offerPercentage =
    currentRequest.offerPercentage !== null &&
    currentRequest.offerPercentage !== undefined
      ? currentRequest.offerPercentage
      : null;

  const backgroundColor =
     "#000000";

  const selectedIcon =
    icons.find((item) => item.name === iconName)?.icon ??
    faFire;

  const selectedIconLabel =
    icons.find((item) => item.name === iconName)?.label ??
    iconName;

  /* ================================================================
      Status Style
  ================================================================ */

  const getStatusStyle = (
    status: BannerRequest["status"]
  ) => {
    switch (status) {
      case "PENDING":
        return {
          wrapper:
            "border-orange-100 bg-orange-50 text-orange-600",
          dot: "bg-orange-500",
        };

      case "APPROVED":
        return {
          wrapper:
            "border-green-100 bg-green-50 text-green-600",
          dot: "bg-green-500",
        };

      case "REJECTED":
        return {
          wrapper:
            "border-red-100 bg-red-50 text-red-600",
          dot: "bg-red-500",
        };

      default:
        return {
          wrapper:
            "border-gray-200 bg-gray-50 text-gray-600",
          dot: "bg-gray-500",
        };
    }
  };

  const statusStyle = getStatusStyle(
    currentRequest.status
  );

  /* ================================================================
      Format Date
  ================================================================ */

  const formatDate = (date?: string | null) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  /* ================================================================
      Return
  ================================================================ */

  return (
    <div className="space-y-8">

      {/* ============================================================
          Header
      ============================================================ */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faBullhorn} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Banner Request Details
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View the details and preview of your banner request.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => router.push("/vendor/banner-requests/history")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </button>

      </div>

      {/* ============================================================
          Main Card
      ============================================================ */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* ==========================================================
            Card Header
        ========================================================== */}

        <div className="mb-8 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Request Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Details submitted for this banner request.
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Request ID: #{currentRequest.id.split("-")[0]}
            </p>
          </div>

          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle.wrapper}`}
          >
            <span
              className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
            />

            {currentRequest.status}
          </span>

        </div>

        {/* ==========================================================
            Product + Icon
        ========================================================== */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Product */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Selected Product
            </label>

            <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white">

                {currentRequest.product.thumbnail ? (
                  <img
                    src={getImageUrl(
                      currentRequest.product.thumbnail
                    )}
                    alt={currentRequest.product.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <FontAwesomeIcon icon={faBullhorn} />
                  </div>
                )}

              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-gray-800">
                  {currentRequest.product.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-gray-400">
                  Product ID: {currentRequest.productId}
                </p>

              </div>

            </div>

          </div>

          {/* Icon */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Banner Icon
            </label>

            <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#DB4444]">
                <FontAwesomeIcon icon={selectedIcon} />
              </div>

              <div>

                <p className="text-sm font-semibold text-gray-800">
                  {selectedIconLabel}
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {iconName}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================================
            Offer + Dates
        ========================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Offer */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Offer Percentage
            </label>

            <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#DB4444]">
                <FontAwesomeIcon icon={faPercent} />
              </div>

              <p className="text-sm font-semibold text-gray-800">
                {offerPercentage !== null
                  ? `${offerPercentage}%`
                  : "—"}
              </p>

            </div>

          </div>

          {/* Submitted */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Submitted
            </label>

            <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <FontAwesomeIcon icon={faCalendar} />
              </div>

              <p className="text-sm font-medium text-gray-700">
                {formatDate(currentRequest.createdAt)}
              </p>

            </div>

          </div>

          {/* Updated */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Last Updated
            </label>

            <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <FontAwesomeIcon icon={faCalendar} />
              </div>

              <p className="text-sm font-medium text-gray-700">
                {formatDate(currentRequest.updatedAt)}
              </p>

            </div>

          </div>

        </div>

        {/* ==========================================================
            Note
        ========================================================== */}

        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Note
          </label>

          <div className="min-h-24 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
              {currentRequest.note?.trim()
                ? currentRequest.note
                : "No note provided."}
            </p>

          </div>

        </div>

        {/* ==========================================================
            Background Color
        ========================================================== */}

        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Banner Background
          </label>

          <div className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4">

            <div
              className="h-9 w-9 shrink-0 rounded-lg border border-black/10 shadow-sm"
              style={{
                backgroundColor,
              }}
            />

            <div>

              <p className="text-sm font-semibold uppercase text-gray-800">
                {backgroundColor}
              </p>

              <p className="mt-0.5 text-xs text-gray-400">
                Selected banner background color
              </p>

            </div>

          </div>

        </div>

        {/* ==========================================================
            Banner Preview
        ========================================================== */}

        <div className="mt-8 border-t border-gray-200 pt-8">

          <div className="mb-4">

            <h3 className="text-sm font-semibold text-gray-900">
              Banner Preview
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Preview of how your banner request will appear.
            </p>

          </div>

          <BannerPreview
            product={currentRequest.product}
            icon={iconName}
            offerPercentage={
              offerPercentage !== null
                ? String(offerPercentage)
                : ""
            }
            backgroundColor={backgroundColor}
          />

        </div>

        {/* ==========================================================
            Footer
        ========================================================== */}

        <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c83a3a]"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Requests
          </button>

        </div>

      </div>

    </div>
  );
}