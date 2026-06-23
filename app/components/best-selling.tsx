"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";


import axios from "axios";
import { ProductUI } from "../types/product";
import ProductCardSkeleton from "./skeletonUI/product-card-skeleton";

export default function BestSelling() {
  const [ bestSellingProducts, setBestSellingProducts ] = useState<ProductUI []>([]);
  const [ isloading, setIsLoading ] = useState(false);

  async function getBestSellingProducts() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/new-arrivals`)
      // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/best-sellers`)
      console.log(res)
      setBestSellingProducts(res.data.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  

  useEffect(()=> {
    getBestSellingProducts()
  }, [])

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
      salePercentage: 240,
      totalReviews: 200,
      avgRating: 5
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
      salePercentage: 240,
      totalReviews: 200,
      avgRating: 5
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
      salePercentage: 240,
      totalReviews: 200,
      avgRating: 5
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
      salePercentage: 240,
      totalReviews: 200,
      avgRating: 5
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
      salePercentage: 240,
      totalReviews: 200,
      avgRating: 5
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
      salePercentage: 240,
      totalReviews: 200,
      avgRating: 5
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

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> */}

          {isloading ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                  >
                    <div className="flex flex-col gap-4 px-2">
                      <ProductCardSkeleton />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          

        {/* </div> */}

        <hr className="hidden md:block border-0 h-px bg-gray-200 mt-10" />

      </div>

    </div>
  );
}