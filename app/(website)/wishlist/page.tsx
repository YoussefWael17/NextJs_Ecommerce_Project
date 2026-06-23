"use client";

import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/product-card";
import { wishlistContext } from "@/app/context/wishlistContext";
import { ProductCardUI } from "@/app/types/product";

export default function WishlistPage() {

  const [ wishlistItems, setWishlistItems ] = useState<ProductCardUI[]>([]);
  const wishlist = useContext(wishlistContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    
  async function getWishlist() {
    try {
      setIsLoading(true);
      setError(null);

      if (!wishlist) return;

      const res = await wishlist.getUserWishlist();

      if (res.data.success) {
        setWishlistItems(res.data.data);
      } else{
        setError("Failed to load wishlist");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    getWishlist();
  }, [])



  if (isLoading) {
    return (
      <main className="container mx-auto py-10">
        <div className="flex justify-center items-center min-h-75">
          <p className="text-lg">Loading wishlist...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center min-h-75 gap-4">
          <p className="text-red-500">{error}</p>

          <button
            onClick={getWishlist}
            className="rounded bg-[#DB4444] px-4 py-2 text-white"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen w-full items-center py-10 mt-15 md:mt-15 mb-10">
      <div className="mx-auto w-full max-w-7xl px-4">

        {/* WISHLIST SECTION */}
        <section className="mb-20">

          {/* HEADER */}
          <header className="mb-10 flex w-full flex-row items-end justify-between px-4">

            <div className="flex flex-col">
              
              {wishlistItems.length === 0 ? (
                <h1 className="text-[20px] font-semibold md:text-[20px]">
                  Wishlist (0)
                </h1>
              ) : (
                <h1 className="text-[20px] font-semibold md:text-[20px]">
                  Wishlist ({wishlistItems.length})
                </h1>
              )}
              
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

            {wishlistItems.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">Your wishlist is empty.</p>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))
            )}

            {/* {wishlistItems.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))} */}

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

            {wishlistItems.map((item) => (
                <ProductCard
                key={item.id}
                product={item}
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