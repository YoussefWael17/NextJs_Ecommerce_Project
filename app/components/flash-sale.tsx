"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./product-card";
import { Product } from "../types/product";
import axios from "axios";
import ProductCardSkeleton from "./skeletonUI/product-card-skeleton";
import FlashSaleSkeleton from "./skeletonUI/flash-sale-skeleton";


export default function FlashSale() {

  

  const [days, setDays] = useState("0");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

  const [isLoading, setIsLoading] = useState(false)

  const [salesProducts, setSalesProducts] = useState<Product[]>([]);

  const saleEndDate = salesProducts?.[0]?.saleEndDate;

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

    emblaApi.plugins()?.autoplay;
    // emblaApi.plugins()?.autoplay?.play();
  }, [emblaApi, onSelect]);

  async function getFlashSales() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/flash-sales`)
      console.log(data)
      if(data.success){
        setSalesProducts(data.data);
      }else{
        setSalesProducts([]);
      } 
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getFlashSales();
  }, [])

  useEffect(() => {
    if (!salesProducts.length || !salesProducts[0].saleEndDate) return;

    const endDate = new Date(salesProducts[0].saleEndDate);

    const intervalId = setInterval(() => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(intervalId);
        setDays("00");
        setHours("00");
        setMinutes("00");
        setSeconds("00");
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );
      const m = Math.floor(
        (diff % (1000 * 60 * 60)) /
          (1000 * 60)
      );
      const s = Math.floor(
        (diff % (1000 * 60)) / 1000
      );

      setDays(String(d).padStart(2, "0"));
      setHours(String(h).padStart(2, "0"));
      setMinutes(String(m).padStart(2, "0"));
      setSeconds(String(s).padStart(2, "0"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [salesProducts]);

  if (isLoading) {
    return <FlashSaleSkeleton />;
  }

  if (salesProducts.length === 0) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full items-center mb-10">

      <div className="mx-auto w-full max-w-7xl px-4">
        
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
                  <span className="text-2xl font-bold text-black md:text-3xl">{days}</span>
                </div>

                <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-black">Hours</span>
                  <span className="text-2xl font-bold text-black md:text-3xl">{hours}</span>
                </div>

                <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-black">Minutes</span>
                  <span className="text-2xl font-bold text-black md:text-3xl">{minutes}</span>
                </div>

                <span className="mx-1 text-2xl md:mx-4 md:text-3xl">:</span>

                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-black">Seconds</span>
                  <span className="text-2xl font-bold text-black md:text-3xl">{seconds}</span>
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

            {salesProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

          </div>

        </div>

        <button className="mx-auto rounded bg-[#DB4444] px-12 py-4 shadow w-58.5 h-14 flex justify-center items-center cursor-pointer text-white my-15">View All Products</button>

        <hr className="hidden md:block border-0 h-px bg-gray-200" />


      </div>

    </div>
  );
}

