"use client";

import React from "react";
import Image from "next/image";

import speaker from "../../public/speaker.png";
import ps5 from "../../public/ps5.png";
import perfume from "../../public/perfume.png";
import bag from "../../public/bag.png";

export default function NewArrival() {
  return (
    <section className="mx-auto mb-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <span className="h-10 w-5 rounded bg-[#DB4444]"></span>

          <span className="font-semibold text-[#DB4444]">
            Featured
          </span>
        </div>

        <h2 className="mt-4 text-3xl font-semibold text-black md:text-4xl">
          New Arrival
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:grid-rows-2">
        
        {/* PS5 */}
        <div className="group relative min-h-[600px] overflow-hidden rounded bg-black p-8 lg:col-span-2 lg:row-span-2">
          
          {/* Content */}
          <div className="absolute bottom-8 left-8 z-20 max-w-xs">
            <h3 className="mb-3 text-3xl font-semibold text-white">
              PlayStation 5
            </h3>

            <p className="mb-5 text-sm leading-6 text-gray-300">
              Black and White version of the PS5 coming out on sale.
            </p>

            <button className="border-b border-white pb-1 text-sm font-medium text-white transition hover:border-[#DB4444] hover:text-[#DB4444]">
              Shop Now
            </button>
          </div>

          {/* Glow */}
          <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"></div>

          {/* Image */}
          <div className="absolute bottom-0 left-1/2 z-10 h-[85%] w-[85%] -translate-x-1/2 transition duration-500 group-hover:scale-105">
            <Image
              src={ps5}
              alt="PS5"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Women Collection */}
        <div className="group relative min-h-[285px] overflow-hidden rounded bg-black p-6 lg:col-span-2">
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-6 left-6 z-20 max-w-xs">
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Women’s Collections
            </h3>

            <p className="mb-4 text-sm leading-6 text-gray-300">
              Featured woman collections that give you another vibe.
            </p>

            <button className="border-b border-white pb-1 text-sm font-medium text-white transition hover:border-[#DB4444] hover:text-[#DB4444]">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="absolute bottom-0 right-0 z-10 h-[100%] w-[55%] transition duration-500 group-hover:scale-105">
            <Image
              src={bag}
              alt="Women Collection"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Speakers */}
        <div className="group relative min-h-[285px] overflow-hidden rounded bg-black p-6">
          
          {/* Glow */}
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>

          {/* Content */}
          <div className="absolute bottom-6 left-6 z-20">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Speakers
            </h3>

            <p className="mb-4 text-sm text-gray-300">
              Amazon wireless speakers
            </p>

            <button className="border-b border-white pb-1 text-sm font-medium text-white transition hover:border-[#DB4444] hover:text-[#DB4444]">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="relative flex h-full items-center justify-center">
            <div className="relative h-[170px] w-[170px] transition duration-500 group-hover:scale-110">
              <Image
                src={speaker}
                alt="Speaker"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Perfume */}
        <div className="group relative min-h-[285px] overflow-hidden rounded bg-black p-6">
          
          {/* Glow */}
          <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"></div>

          {/* Content */}
          <div className="absolute bottom-6 left-6 z-20">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Perfume
            </h3>

            <p className="mb-4 text-sm text-gray-300">
              GUCCI INTENSE OUD EDP
            </p>

            <button className="border-b border-white pb-1 text-sm font-medium text-white transition hover:border-[#DB4444] hover:text-[#DB4444]">
              Shop Now
            </button>
          </div>

          {/* Image */}
          <div className="relative flex h-full items-center justify-center">
            <div className="relative h-[150px] w-[150px] transition duration-500 group-hover:scale-110">
              <Image
                src={perfume}
                alt="Perfume"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}