"use client";

import React from "react";
import ProductCard from "../components/product-card";

export default function WishlistPage() {
  const products = [
    {
      id: 1,
      image:
        "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: true
    },
    {
      id: 2,
      image:
        "https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png",
      name: "iPhone 14 Pro Max",
      category: "Phones",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: true
    },
    {
      id: 3,
      image:
        "https://www.pngmart.com/files/23/Apple-Watch-PNG-Pic.png",
      name: "Apple Watch",
      category: "Watches",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: true
    },
    {
      id: 4,
      image:
        "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: true
    }
  ];

  return (
    <main className="flex min-h-screen w-full items-center py-10 mt-15 md:mt-15 mb-10">
      <div className="mx-auto w-full max-w-screen-xl px-4">

        {/* WISHLIST SECTION */}
        <section className="mb-20">

          {/* HEADER */}
          <header className="mb-10 flex w-full flex-row items-end justify-between px-4">

            <div className="flex flex-col">
              <h1 className="text-[20px] font-semibold md:text-[20px]">
                Wishlist ({products.length})
              </h1>
            </div>

            {/* BUTTON */}
            <div className="hidden md:flex items-center">
              <button className="rounded-sm border bg-white px-6 py-3 text-black shadow transition hover:bg-[#DB4444] hover:text-white md:px-12">
                Move All To Bag
              </button>
            </div>

          </header>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}

          </div>

            {/* MOBILE BUTTON */}
            <div className="mt-8 flex justify-center md:hidden w-full">
                <button className="rounded-sm border bg-white px-6 py-3 text-black shadow transition hover:bg-[#DB4444] hover:text-white w-full">
                    Move All To Bag
                </button>
            </div>

        </section>

        {/* JUST FOR YOU SECTION */}
        <section>

          {/* HEADER */}
          <header className="mb-10 flex w-full flex-row items-end justify-between px-4">

            <div className="flex flex-col">

              <div className="flex items-center">
                <span className="h-10 w-5 rounded bg-[#DB4444]"></span>

                <h2 className="ms-4 font-semibold text-black">
                  Just For You
                </h2>
              </div>

            </div>

            {/* BUTTON */}
            <div className="hidden items-center md:flex">
              <button className="rounded-sm border bg-white px-6 py-3 text-black shadow transition hover:bg-[#DB4444] hover:text-white md:px-12">
                See All
              </button>
            </div>

          </header>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {products.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                />
            ))}

          </div>

            {/* MOBILE BUTTON */}
            <div className="mt-8 w-full flex justify-center md:hidden">
                <button className="rounded-sm border bg-white px-6 py-3 text-black shadow transition hover:bg-[#DB4444] hover:text-white w-full">
                    See All
                </button>
            </div>

        </section>

      </div>
    </main>
  );
}