"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./product-card";

export default function FlashSale() {

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

  const products = [
    {
      id: 1,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
    },
    {
      id: 2,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
    },
    {
      id: 3,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
    },
    {
      id: 4,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
    },
    {
      id: 5,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
    },
    {
      id: 6,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
    },
  ];
  const offer:boolean = true;

  return (
    <div className="flex min-h-screen w-full items-center mb-10">

      <div className="mx-auto w-full max-w-screen-xl px-4">
        
        <div className="flex w-full flex-row items-end justify-between px-4 mb-10">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="h-10 w-5 rounded bg-[#DB4444]"></span>
              <span className="ms-4 font-semibold text-[#DB4444]">Today's</span>
            </div>

            <div className="mt-2 flex items-center gap-12 md:gap-20">
              <h3 className="text-3xl font-semibold md:text-4xl">Flash Sales</h3>

              <div className="flex items-center text-[#DB4444]">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-black">Days</span>
                  <span className="text-2xl font-bold text-black md:text-3xl">05</span>
                </div>

                <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-black">Hours</span>
                  <span className="text-2xl font-bold text-black md:text-3xl">12</span>
                </div>

                <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-black">Minutes</span>
                  <span className="text-2xl font-bold text-black md:text-3xl">30</span>
                </div>

                <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-black">Seconds</span>
                  <span className="text-2xl font-bold text-black md:text-3xl">45</span>
                </div>
              </div>
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

            {products.map((product) => (
              <ProductCard key={product.id} isOffer={offer} product={product} />
            ))}

          </div>

        </div>

        <button className="mx-auto rounded bg-[#DB4444] px-12 py-4 shadow w-[234px] h-[56px] flex justify-center items-center cursor-pointer text-white my-15">View All Products</button>

        <hr className="hidden md:block border-0 h-0.25 bg-gray-200" />


      </div>

    </div>
  );
}

