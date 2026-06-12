"use client"

import { faHeart, faEye} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useMemo} from 'react'
import { useGetProductsQuery } from '../redux/services/productsApi';
import ProductCard from './product-card';
import ProductCardSkeleton from './skeletonUI/product-card-skeleton';

export default function FeaturedProducts() {

    const { data, refetch, isLoading, isFetching} = useGetProductsQuery();

    console.log(data)

    const products = data?.data?.products ?? [];

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            containScroll: "trimSnaps",
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
    );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on("select", onSelect);
        onSelect();

        // emblaApi.plugins()?.autoplay?.play();
    }, [emblaApi, onSelect]);

    const groupedProducts = useMemo(() => {
      const groups = [];

      for (let i = 0; i < products.length; i += 2) {
        groups.push(products.slice(i, i + 2));
      }

      return groups;
    }, [products]);

  return (
    <div className="flex w-full items-center mb-17.5">

      <div className="mx-auto w-full max-w-7xl px-4">
        
        <div className="flex w-full flex-row items-end justify-between px-4 mb-10">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="h-10 w-5 rounded bg-[#DB4444]"></span>
              <span className="ms-4 font-semibold text-[#DB4444]">Our Products</span>
            </div>

            <div className="mt-2 flex items-center gap-12 md:gap-20">
              <h3 className="text-3xl font-semibold md:text-4xl">Explore Our Products</h3>

            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">

            <button
              onClick={scrollPrev}
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full bg-[#F5F5F5]
                transition hover:bg-[#DB4444] hover:text-white cursor-pointer
              "
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <button
              onClick={scrollNext}
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full bg-[#F5F5F5]
                transition hover:bg-[#DB4444] hover:text-white cursor-pointer
              "
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

          </div>

        </div>


        {/* VIEWPORT */}
        {isLoading || isFetching ? (
          <div>
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                >
                  <div className="flex flex-col gap-4 px-2">
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
         : 
        (
          <div>
            <div className="overflow-hidden" ref={emblaRef}>

            {/* TRACK */}
            <div className="flex">

              {groupedProducts.map((group, index) => (

              <div
                  key={index}
                  className="
                  flex-[0_0_100%]
                  sm:flex-[0_0_50%]
                  md:flex-[0_0_33.333%]
                  lg:flex-[0_0_25%]
                  "
              >

                  {/* INNER */}
                  <div className="flex flex-col gap-4">

                      {group.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                        />
                      ))}

                  </div>

              </div>

              ))}

            </div>

            </div>

            <button className="mx-auto rounded bg-[#DB4444] px-12 py-4 shadow w-58.5 h-14 flex justify-center items-center cursor-pointer text-white my-15">View All Products</button>

            <hr className="hidden md:block border-0 h-px bg-gray-200 mt-17.5" />
          </div>

        )}
        

      </div>

    </div>
  );
}
