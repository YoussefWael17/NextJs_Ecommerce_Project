"use client";

import React from "react";
import ProductCard from "./product-card";

export default function BestSelling() {
  const products = [
    {
      id: 1,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false
    },
    {
      id: 2,
      image: "https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png",
      name: "Iphone 14 Pro Max",
      category: "Phones",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false
    },
    {
      id: 3,
      image: "https://www.pngmart.com/files/23/Apple-Watch-PNG-Pic.png",
      name: "Apple Watch",
      category: "Watches",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false
    },
    {
      id: 4,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false
    },
    {
      id: 5,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false
    },
    {
      id: 6,
      image: "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
      name: "PS5 Controller",
      category: "Gaming",
      price: 120,
      discount: 240,
      isOffered: false,
      isAdded: false
    },
  ];

  const offer:boolean = false;
  const isAdded:boolean = false;

  return (
    <div className="flex w-full items-center">
      <div className="mx-auto w-full max-w-screen-xl px-4">

        {/* HEADER */}
        <div className="flex w-full flex-row items-end justify-between px-4 mb-10">
          
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="h-10 w-5 rounded bg-[#DB4444]"></span>
              <span className="ms-4 font-semibold text-[#DB4444]">
                This Month
              </span>
            </div>

            <h3 className="text-3xl font-semibold md:text-4xl mt-2">
              Best Selling Products
            </h3>
          </div>

          {/* BUTTON */}
          <div className="hidden md:flex items-center">
            <button className="bg-[#DB4444] text-white px-6 py-3 rounded-md shadow hover:bg-red-600 transition">
              View All
            </button>
          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

        <hr className="hidden md:block border-0 h-[1px] bg-gray-200 mt-10" />

      </div>

    </div>
  );
}