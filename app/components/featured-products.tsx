"use client"

import { faHeart, faEye} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect} from 'react'

export default function FeaturedProducts() {

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

        emblaApi.plugins()?.autoplay?.play();
    }, [emblaApi, onSelect]);

    const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const groupedProducts = [];

    for (let i = 0; i < products.length; i += 2) {
        groupedProducts.push(products.slice(i, i + 2));
    }

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
                <div className="px-2 flex flex-col gap-4">

                    {group.map((item, idx) => (

                        <div
                        key={idx}
                        className="group overflow-hidden bg-white"
                        >

                        {/* IMAGE */}
                        <div className="relative flex h-62.5 items-center justify-center bg-[#F5F5F5]">

                            <img
                            src="https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png"
                            className="h-37.5 object-contain"
                            />

                            <span className="absolute top-3 left-3 bg-[#DB4444] px-2 py-1 text-sm text-white">
                            -50%
                            </span>

                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <button className="rounded-full bg-white p-1.25 shadow w-6 h-6 flex justify-center items-center cursor-pointer">
                                <FontAwesomeIcon icon={faHeart} />
                            </button>

                            <button className="rounded-full bg-white p-1.25 shadow w-6 h-6 flex justify-center items-center cursor-pointer">
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            </div>

                            {/* ADD TO CART */}
                            <button
                            className="
                                absolute bottom-0 left-0 w-full
                                translate-y-3
                                bg-black py-3 text-white
                                opacity-0
                                transition-all duration-300
                                group-hover:translate-y-0
                                group-hover:opacity-100
                                cursor-pointer
                            "
                            >
                            Add To Cart
                            </button>

                        </div>

                        {/* CONTENT */}
                        <div className="p-4">
                            <h3 className="text-lg font-bold">Product Name</h3>
                            <p className="text-sm text-gray-500">Category</p>

                            {/* <div className="mt-2 flex items-center gap-2">
                            <span className="font-bold text-red-500">$120</span>
                            </div> */}
                            <div className="mt-2 flex items-center gap-3">

                                <span className="font-bold text-red-500">$120</span>

                                {/* Rating */}
                                <div className="flex items-center gap-1">

                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                             <FontAwesomeIcon key={star}  icon={faStar} />
                                        ))}
                                    </div>

                                    <span className="text-sm text-gray-500">(23)</span>

                                </div>

                            </div>
                        </div>

                        </div>

                    ))}

                </div>

            </div>

            ))}

          </div>

        </div>

        <button className="mx-auto rounded bg-[#DB4444] px-12 py-4 shadow w-58.5 h-14 flex justify-center items-center cursor-pointer text-white my-15">View All Products</button>

        <hr className="hidden md:block border-0 h-px bg-gray-200 mt-17.5" />

        {/* <hr className="hidden md:block border-0 h-0.25 bg-gray-200 mt-[70px]" /> */}

      </div>

    </div>
  );
}
