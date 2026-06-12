"use client";

import React from "react";
import ProductCard from "./product-card";

export default function BestSelling() {
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
      isOffered: false,
      isAdded: false
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
      isAdded: false
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
      isAdded: false
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
      isAdded: false
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
      isAdded: false
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
      isAdded: false
    },
  ];

  const offer:boolean = false;
  const isAdded:boolean = false;

  return (
    <div className="flex w-full items-center">
      <div className="mx-auto w-full max-w-7xl px-4">

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

        <hr className="hidden md:block border-0 h-px bg-gray-200 mt-10" />

      </div>

    </div>
  );
}