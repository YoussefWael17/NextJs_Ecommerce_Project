// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

// import { faApple } from "@fortawesome/free-brands-svg-icons";

// import { faClock, faShoePrints } from "@fortawesome/free-solid-svg-icons";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useGetCategoriesQuery } from "../redux/services/categoriesApi";
// import CategorySideBarSkeleton from "./skeletonUI/categories-sidebar-skeleton";
// import { useGetHeroBannersQuery } from "../redux/services/heroBannersApi";
// import { getImageUrl } from "../admin/utils/getImageUrl";

// export default function HeroSection() {

//   const { data, refetch, isFetching, isLoading, isError } = useGetCategoriesQuery()
//   const categories = data?.data ?? [];

//   const { data: heroBannersData, isFetching: heroBannersFetching, isLoading: heroBannersLoading, isError: heroBannersError } = useGetHeroBannersQuery();
//   const heroBanners = heroBannersData?.data ?? [];

//   console.log(heroBanners)

//   // const slides = [
//   //   {
//   //     image:
//   //       "https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png",
//   //     brand: "iPhone 14 Series",
//   //     icon: faApple,
//   //   },
//   //   {
//   //     image:
//   //       "https://www.pngmart.com/files/1/Nike-Shoes-Transparent-Background.png",
//   //     brand: "Nike Collection",
//   //     icon: faShoePrints,
//   //   },
//   //   {
//   //     image:
//   //       "https://www.pngmart.com/files/23/Apple-Watch-PNG-Pic.png",
//   //     brand: "Smart Watch",
//   //     icon: faClock,
//   //   },
//   // ];

//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const [emblaRef, emblaApi] = useEmblaCarousel(
//     { loop: true },
//     [Autoplay({ delay: 4000 })]
//   );

//   const scrollTo = useCallback(
//     (index: number) => emblaApi?.scrollTo(index),
//     [emblaApi]
//   );

//   const onSelect = useCallback(() => {
//     if (!emblaApi) return;
//     setSelectedIndex(emblaApi.selectedScrollSnap());
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     emblaApi.on("select", onSelect);
//     onSelect();

//     // emblaApi.plugins().autoplay?.play();
//   }, [emblaApi, onSelect]);

  


  
//   if (isError) {
//     return (
//       <div className="flex h-[60vh] items-center justify-center p-6">
//         <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">

//           {/* Icon */}
//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="h-8 w-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
//               />
//             </svg>
//           </div>

//           {/* Title */}
//           <h2 className="text-xl font-bold text-black">
//             Failed to load product to edit
//           </h2>

//           {/* Subtitle */}
//           <p className="mt-2 text-sm text-gray-500">
//             Something went wrong while fetching data. Please try again.
//           </p>

//           {/* Button */}
//           <button
//             onClick={refetch}
//             className="mt-6 w-full rounded-2xl bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-white hover:text-[#DB4444] hover:border hover:border-[#DB4444]"
//           >
//             Retry
//           </button>

//         </div>
//       </div>
//     );
//   }    


//   return (
//     <section className="bg-white mt-24 md:mt-28 mb-10">
//       <div className="w-full max-w-7xl px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

//         {/* Categories */}
//         <div className="border-b lg:border-b-0 lg:border-r border-gray-300 pb-6 lg:pb-0 lg:pr-6">

//           <div className="flex flex-wrap lg:flex-col gap-4 lg:gap-5">

//             {(isLoading || isFetching) ? (

//               <CategorySideBarSkeleton/>
            
//             ) : categories.length === 0 ? (
            
//               <p>No Categories</p>
            
//             ) : (
            
//               categories.map((category) => (
//                 <button
//                   key={category.id}
//                   className="text-left text-sm md:text-[16px] font-medium hover:text-[#DB4444] transition"
//                 >
//                   {category.name}
//                 </button>
//               ))
//             )}

//           </div>

//         </div>

//         {/* Slider */}
        

//         {/* Slider */}
//         <div className="lg:col-span-3 w-full">
//           <div className="relative w-full">

//             {/* Viewport */}
//             <div
//               className="overflow-hidden bg-black w-full rounded-md"
//               ref={emblaRef}
//             >

//               {/* Container */}
//               <div className="flex h-full">

//                 {heroBanners.map((slide) => (
//                   <div
//                     key={slide.id}
//                     className="flex-[0_0_100%] min-w-0"
//                   >

//                     <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-130 md:min-h-90 px-5 md:px-12 py-8 md:py-10 gap-8">

//                       {/* Left Content */}
//                       <div className="text-white flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">

//                         {/* Brand + Icon */}
//                         <div className="flex items-center justify-center md:justify-start gap-3 mb-5">

                          
//                           <FontAwesomeIcon
//                             icon={slide.icon}
//                             className="text-3xl md:text-4xl"
//                           />

//                           <h1 className="text-lg md:text-xl font-medium">
//                             {slide.title}
//                           </h1>

//                         </div>

//                         {/* Subtitle
//                         {slide.subtitle && (
//                           <p className="text-lg md:text-xl mb-3 text-gray-300">
//                             {slide.subtitle}
//                           </p>
//                         )} */}

//                         {/* Offer */}
//                         {slide.offerPercentage && (
//                           <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
//                           Up to {slide.offerPercentage}%
//                           <br />
//                           off Voucher
//                         </h2>
//                         )}
                        

//                         {/* Offer / Title */}
//                         <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
//                           {slide.title}
//                         </h2>

//                         {/* Button */}
//                         <a
//                           href={slide.buttonLink}
//                           className="w-fit mx-auto md:mx-0 border-b border-white pb-1 text-base md:text-lg hover:text-gray-300 transition"
//                         >
//                           {slide.buttonText} →
//                         </a>

//                       </div>

//                       {/* Right Image */}
//                       <div className="w-full md:w-1/2 flex justify-center items-center">

//                         <img
//                           src={getImageUrl(slide.image)}
//                           alt={slide.title}
//                           className="max-h-55 sm:max-h-65 md:max-h-75 object-contain drop-shadow-2xl"
//                         />

//                       </div>

//                     </div>

//                   </div>
//                 ))}

//               </div>
//             </div>

//             {/* Dots */}
//             <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-3 z-20">

//               {heroBanners.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => scrollTo(index)}
//                   aria-label={`Go to slide ${index + 1}`}
//                   className={`w-3 h-3 rounded-full transition-all ${
//                     selectedIndex === index
//                       ? "bg-[#DB4444] scale-125"
//                       : "bg-white/50"
//                   }`}
//                 />
//               ))}

//             </div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }



"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGetCategoriesQuery } from "../redux/services/categoriesApi";
import CategorySideBarSkeleton from "./skeletonUI/categories-sidebar-skeleton";
import { useGetHeroBannersQuery } from "../redux/services/heroBannersApi";
import { getImageUrl } from "../admin/utils/getImageUrl";
import { iconMap } from "../admin/utils/fontAwesomeIcons";
import HeroBannerSkeleton from "./skeletonUI/hero-banner-skeleton";



export default function HeroSection() {
  // ------------------------------------------------------------------------
  // Categories
  // ------------------------------------------------------------------------

  const {
    data,
    refetch,
    isFetching,
    isLoading,
    isError,
  } = useGetCategoriesQuery();

  const categories = data?.data ?? [];

  // ------------------------------------------------------------------------
  // Hero Banners
  // ------------------------------------------------------------------------

  const {
    data: heroBannersData,
    isFetching: heroBannersFetching,
    isLoading: heroBannersLoading,
    isError: heroBannersError,
  } = useGetHeroBannersQuery();

  const heroBanners = heroBannersData?.data ?? [];

  console.log(heroBanners);

  // ------------------------------------------------------------------------
  // Embla
  // ------------------------------------------------------------------------

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 4000,
      }),
    ]
  );

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // ------------------------------------------------------------------------
  // Categories Error
  // ------------------------------------------------------------------------

  if (isError) {
    return (
      <div className="flex h-[60vh] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">

          {/* Icon */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-black">
            Failed to load categories
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-sm text-gray-500">
            Something went wrong while fetching data. Please try again.
          </p>

          {/* Button */}
          <button
            onClick={refetch}
            className="mt-6 w-full rounded-2xl bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition hover:border hover:border-[#DB4444] hover:bg-white hover:text-[#DB4444]"
          >
            Retry
          </button>

        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------------

  return (
    <section className="mt-24 mb-10 bg-white md:mt-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-8 px-4 md:px-6 lg:grid-cols-4">

        {/* ================================================================
            Categories
        ================================================================ */}

        <div className="border-b border-gray-300 pb-6 lg:border-r lg:border-b-0 lg:pb-0 lg:pr-6">

          <div className="flex flex-wrap gap-4 lg:flex-col lg:gap-5">

            {isLoading || isFetching ? (
              <CategorySideBarSkeleton />
            ) : categories.length === 0 ? (
              <p className="text-sm text-gray-500">
                No Categories
              </p>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  className="text-left text-sm font-medium transition hover:text-[#DB4444] md:text-[16px]"
                >
                  {category.name}
                </button>
              ))
            )}

          </div>

        </div>

        {/* ================================================================
            Hero Slider
        ================================================================ */}

        <div className="w-full lg:col-span-3">

          <div className="relative w-full">

            {/* ============================================================
                Embla Viewport
            ============================================================ */}

            <div
              ref={emblaRef}
              className="w-full overflow-hidden rounded-md "
            >

              {/* ==========================================================
                  Embla Container
              ========================================================== */}

              <div className="flex h-full">

                {heroBannersFetching || heroBannersLoading ? (

                  <HeroBannerSkeleton/>

                ) : heroBanners.length === 0 ? (

                  // Empty State
                  <div className="flex min-h-130 w-full items-center justify-center text-white bg-black">
                    <p className="text-gray-400">
                      No hero banners available
                    </p>
                  </div>

                ) : (

                  // Banners
                  heroBanners.map((slide) => {

                    /*
                    |--------------------------------------------------------------------------
                    | Convert database icon name to FontAwesome icon object
                    |--------------------------------------------------------------------------
                    */

                    const bannerIcon = slide.icon
                      ? iconMap[
                          slide.icon as keyof typeof iconMap
                        ]
                      : null;

                    return (
                      <div
                        key={slide.id}
                        className="min-w-0 flex-[0_0_100%] bg-black"
                      >

                        <div className="flex min-h-130 flex-col-reverse items-center justify-between gap-8 px-5 py-8 md:min-h-90 md:flex-row md:px-12 md:py-10">

                          {/* ============================================================
                              Left Content
                          ============================================================ */}

                          <div className="flex w-full flex-col justify-center text-center text-white md:w-1/2 md:text-left">

                            {/* ==========================================================
                                Brand + Icon
                            ========================================================== */}

                            {(bannerIcon || slide.title) && (
                              <div className="mb-5 flex items-center justify-center gap-3 md:justify-start">

                                {bannerIcon && (
                                  <FontAwesomeIcon
                                    icon={bannerIcon}
                                    className="text-3xl md:text-4xl"
                                  />
                                )}

                                <h1 className="text-lg font-medium md:text-xl">
                                  {slide.title}
                                </h1>

                              </div>
                            )}

                            {/* ==========================================================
                                Subtitle
                            ========================================================== */}

                            {slide.subtitle && (
                              <p className="mb-3 text-lg text-gray-300 md:text-xl">
                                {slide.subtitle}
                              </p>
                            )}

                            {/* ==========================================================
                                Offer
                            ========================================================== */}

                            {slide.offerPercentage != null && (
                              <h2 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-4xl lg:text-5xl">
                                Up to {slide.offerPercentage}%
                                <br />
                                off Voucher
                              </h2>
                            )}

                            {/* ==========================================================
                                Title
                            ========================================================== */}

                            <h2 className="mb-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-4xl lg:text-5xl">
                              {slide.title}
                            </h2>

                            {/* ==========================================================
                                Button
                            ========================================================== */}

                            {slide.buttonLink && (
                              <a
                                href={slide.buttonLink}
                                className="mx-auto w-fit border-b border-white pb-1 text-base transition hover:text-gray-300 md:mx-0 md:text-lg"
                              >
                                {slide.buttonText || "Shop Now"} →
                              </a>
                            )}

                          </div>

                          {/* ============================================================
                              Right Image
                          ============================================================ */}

                          <div className="flex w-full items-center justify-center md:w-1/2">

                            <img
                              src={getImageUrl(slide.image)}
                              alt={slide.title}
                              className="max-h-55 object-contain drop-shadow-2xl sm:max-h-65 md:max-h-75"
                            />

                          </div>

                        </div>

                      </div>
                    );
                  })

                )}

              </div>

            </div>

            {/* ==============================================================
                Slider Dots
            ============================================================== */}

            {heroBanners.length > 1 && (
              <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 gap-3 md:flex">

                {heroBanners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-3 w-3 rounded-full transition-all ${
                      selectedIndex === index
                        ? "scale-125 bg-[#DB4444]"
                        : "bg-white/50"
                    }`}
                  />
                ))}

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
