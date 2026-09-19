// "use client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faFire,
//   faTag,
//   faPercent,
//   faShoePrints,
//   faAppleWhole,
//   faBolt,
//   faStar,
// } from "@fortawesome/free-solid-svg-icons";

// import { faApple } from "@fortawesome/free-brands-svg-icons";
// import { getImageUrl } from "@/app/admin/utils/getImageUrl";



// const iconMap = {
//   faFire,
//   faTag,
//   faPercent,
//   faShoePrints,
//   faAppleWhole,
//   faApple,
//   faBolt,
//   faStar,
// };

// interface BannerPreviewProps {
//   product?: {
//     id: string;
//     title: string;
//     thumbnail?: string;
//     image?: string;
//   };

//   icon: string;
//   offerPercentage: string;
// }

// export default function BannerPreview({
//   product,
//   icon,
//   offerPercentage,
// }: BannerPreviewProps) {
//   const bannerIcon =
//     iconMap[icon as keyof typeof iconMap] ?? faFire;

//   return (
//     <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//       {/* Header */}
//       <div className="border-b border-gray-200 p-6">
//         <h2 className="text-lg font-semibold text-gray-900">
//           Banner Preview
//         </h2>

//         <p className="mt-1 text-sm text-gray-500">
//           Preview how your banner will appear on the homepage.
//         </p>
//       </div>

//       {/* ============================================================
//           Hero Preview
//       ============================================================ */}
//       <div className="p-6">
//         <div className="overflow-hidden rounded-xl bg-black">
//           <div className="flex min-h-130 flex-col-reverse items-center justify-between gap-8 px-5 py-8 md:min-h-90 md:flex-row md:px-12 md:py-10">

//             {/* ======================================================
//                 Left Content
//             ====================================================== */}
//             <div className="flex w-full flex-col justify-center text-center text-white md:w-1/2 md:text-left">

//               {/* Brand + Icon */}
//               <div className="mb-5 flex items-center justify-center gap-3 md:justify-start">
//                 <FontAwesomeIcon
//                   icon={bannerIcon}
//                   className="text-3xl md:text-4xl"
//                 />

//                 <h1 className="text-lg font-medium md:text-xl">
//                   {product?.title || "Your Product"}
//                 </h1>
//               </div>

//               {/* Subtitle */}
//               <p className="mb-3 text-lg text-gray-300 md:text-xl">
//                 Featured Product
//               </p>

//               {/* Offer */}
//               {offerPercentage &&
//                 Number(offerPercentage) > 0 && (
//                   <h2 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-4xl lg:text-5xl">
//                     Up to {offerPercentage}%
//                     <br />
//                     off Voucher
//                   </h2>
//                 )}

//               {/* Product Title */}
//               <h2 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-4xl lg:text-5xl">
//                 {product?.title || "Product Title"}
//               </h2>

//               {/* Button */}
//               <div>
//                 <span className="mx-auto w-fit border-b border-white pb-1 text-base md:mx-0 md:text-lg">
//                   Shop Now →
//                 </span>
//               </div>
//             </div>

//             {/* ======================================================
//                 Right Image
//             ====================================================== */}
//             <div className="flex w-full items-center justify-center md:w-1/2">
//               {product?.thumbnail || product?.image ? (
//                 <img
//                   src={getImageUrl(product.thumbnail || product.image!)}
//                   alt={product.title}
//                   className="max-h-55 object-contain drop-shadow-2xl sm:max-h-65 md:max-h-75"
//                 />
//               ) : (
//                 <div className="flex h-55 w-full max-w-70 items-center justify-center rounded-xl border border-dashed border-gray-700 text-sm text-gray-500">
//                   Product Image
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFire,
  faTag,
  faPercent,
  faShoePrints,
  faAppleWhole,
  faBolt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import { faApple } from "@fortawesome/free-brands-svg-icons";
import { getImageUrl } from "@/app/admin/utils/getImageUrl";

const iconMap = {
  faFire,
  faTag,
  faPercent,
  faShoePrints,
  faAppleWhole,
  faApple,
  faBolt,
  faStar,
};

interface BannerPreviewProps {
  product?: {
    id: string;
    title: string;
    thumbnail?: string;
    image?: string;
  };

  icon: string;
  offerPercentage: string;
  backgroundColor: string;
}

export default function BannerPreview({
  product,
  icon,
  offerPercentage,
  backgroundColor,
}: BannerPreviewProps) {
  const bannerIcon =
    iconMap[icon as keyof typeof iconMap] ?? faFire;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Banner Preview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Preview how your banner will appear on the homepage.
        </p>
      </div>

      {/* ============================================================
          Hero Preview
      ============================================================ */}

      <div className="p-6">
        <div
          className="overflow-hidden rounded-xl"
          style={{
            backgroundColor,
          }}
        >
          <div className="flex min-h-130 flex-col-reverse items-center justify-between gap-8 px-5 py-8 md:min-h-90 md:flex-row md:px-12 md:py-10">

            {/* ======================================================
                Left Content
            ====================================================== */}

            <div className="flex w-full flex-col justify-center text-center text-white md:w-1/2 md:text-left">

              {/* Brand + Icon */}
              <div className="mb-5 flex items-center justify-center gap-3 md:justify-start">
                <FontAwesomeIcon
                  icon={bannerIcon}
                  className="text-3xl md:text-4xl"
                />

                <h1 className="text-lg font-medium md:text-xl">
                  {product?.title || "Your Product"}
                </h1>
              </div>

              {/* Subtitle */}
              <p className="mb-3 text-lg text-gray-300 md:text-xl">
                Featured Product
              </p>

              {/* Offer */}
              {offerPercentage &&
                Number(offerPercentage) > 0 && (
                  <h2 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-4xl lg:text-5xl">
                    Up to {offerPercentage}%
                    <br />
                    off Voucher
                  </h2>
                )}

              {/* Product Title */}
              <h2 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-4xl lg:text-5xl">
                {product?.title || "Product Title"}
              </h2>

              {/* Button */}
              <div>
                <span className="mx-auto w-fit border-b border-white pb-1 text-base md:mx-0 md:text-lg">
                  Shop Now →
                </span>
              </div>
            </div>

            {/* ======================================================
                Right Image
            ====================================================== */}

            <div className="flex w-full items-center justify-center md:w-1/2">
              {product?.thumbnail || product?.image ? (
                <img
                  src={getImageUrl(
                    product.thumbnail || product.image!
                  )}
                  alt={product.title}
                  className="max-h-55 object-contain drop-shadow-2xl sm:max-h-65 md:max-h-75"
                />
              ) : (
                <div className="flex h-55 w-full max-w-70 items-center justify-center rounded-xl border border-dashed border-white/30 text-sm text-white/60">
                  Product Image
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}