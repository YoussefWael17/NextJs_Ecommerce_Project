"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSection() {
  const categories = [
    "Woman’s Fashion",
    "Men’s Fashion",
    "Electronics",
    "Home & Lifestyle",
    "Medicine",
    "Sports & Outdoor",
  ];

 const slides = [
  {
    image: "https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png",
    brand: "iPhone 14 Series",
    logo: "🍎",
  },
  {
    image: "https://www.pngmart.com/files/1/Nike-Shoes-Transparent-Background.png",
    brand: "Nike Collection",
    logo: "👟",
  },
  {
    image: "https://www.pngmart.com/files/23/Apple-Watch-PNG-Pic.png",
    brand: "Smart Watch",
    logo: "⌚",
  },
];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
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

    emblaApi.plugins().autoplay?.play();
  }, [emblaApi, onSelect]);

  return (
    <section className="bg-white mt-28 mb-10">
      <div className="w-full max-w-7xl px-6 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

        {/* Categories */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-300 pb-6 lg:pb-0 lg:pr-6">
          <div className="flex flex-col gap-5">
            {categories.map((category, index) => (
              <button
                key={index}
                className="text-left text-[16px] font-medium hover:text-[#DB4444] transition"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="lg:col-span-3 w-full">
          <div className="relative w-full">

            {/* viewport */}
            <div
              className="overflow-hidden bg-black w-full h-[500px] sm:h-[420px] md:h-[360px] lg:h-[320px]"
              ref={emblaRef}
            >
              {/* container */}
              <div className="flex h-full">

                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0 h-full"
                  >
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between h-full px-6 md:px-10 py-8 gap-6">

                      {/* Left Content */}
                      <div className="text-white flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">

                        {/* Top text */}
                        <span className="text-sm text-gray-400 mb-4">
                          Up to 15% off
                        </span>

                        {/* Brand + logo */}
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                          <span className="text-3xl">
                            {slide.logo}
                          </span>

                          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
                            {slide.brand}
                          </h1>
                        </div>

                        {/* Button */}
                        <button className="w-fit mx-auto md:mx-0 border-b border-white pb-1 text-lg hover:text-gray-300 transition">
                          Shop Now →
                        </button>
                      </div>

                      {/* Right Image */}
                      <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
                        <img
                          src={slide.image}
                          alt={slide.brand}
                          className="max-h-[280px] object-contain drop-shadow-2xl mix-blend-lighten"                        />
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    selectedIndex === index
                      ? "bg-[#DB4444] scale-125"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
