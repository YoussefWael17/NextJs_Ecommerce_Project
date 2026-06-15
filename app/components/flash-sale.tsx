"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./product-card";

export default function FlashSale() {

  const [days, setDays] = useState("0");
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");

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
      id: "1",
      thumbnail: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      title: "PS5 Controller",
      category: {
        name: "Gaming",
        id: "15523",
      },
      price: 120,
      discount: 240,
      isOffered: true,
      isAdded: false,
      totalReviews: 200,
      avgRating: 4.5
    },
    {
      id: "2",
      thumbnail: "https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png",
      title: "Iphone 14 Pro Max",
      category: {
        name: "Phones",
        id: "123",
      },
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false,
      totalReviews: 200,
      avgRating: 4.5
    },
    {
      id: "3",
      thumbnail: "https://www.pngmart.com/files/23/Apple-Watch-PNG-Pic.png",
      title: "Apple Watch",
      category: {
        name: "Watches",
        id: "1223",
      },
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false,
      totalReviews: 200,
      avgRating: 4.5
    },
    {
      id: "4",
      thumbnail: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      title: "PS5 Controller",
      category: {
        name: "Gaming",
        id: "10023",
      },
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false,
      totalReviews: 200,
      avgRating: 4.5
    },
    {
      id: "5",
      thumbnail: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      title: "PS5 Controller",
      category: {
        name: "Gaming",
        id: "12355",
      },
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false,
      totalReviews: 200,
      avgRating: 4.5
    },
    {
      id: "6",
      thumbnail: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      title: "PS5 Controller",
      category: {
        name: "Gaming",
        id: "123",
      },
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false,
      totalReviews: 200,
      avgRating: 2.5
    },
  ];

  function timer() {

  const saleEndDate = new Date("2026-06-17T23:59:00");

  const intervalId = setInterval(() => {

    const nowDate = new Date();

    const difference = saleEndDate.getTime() - nowDate.getTime();

    if (difference <= 0) {
      clearInterval(intervalId);
      console.log("Sale Ended");
      return;
    }

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const formattedDays = String(days).padStart(2, "0");

    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const formattedHours = String(hours).padStart(2, "0");

    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const formattedMinutes = String(minutes).padStart(2, "0");

    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    const formattedSeconds = String(seconds).padStart(2, "0");

    setDays(formattedDays);
    setHours(formattedHours);
    setMinutes(formattedMinutes);
    setSeconds(formattedSeconds);



    // console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);

  }, 1000);
}

timer();

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

            {products.map((product) => (
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

