"use client";

import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/product-card";
import { wishlistContext } from "@/app/context/wishlistContext";
import { ProductCardUI } from "@/app/types/product";
import WishlistSkeleton from "@/app/components/skeletonUI/wishlist-skeleton";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WishlistPage() {

  const wishlist = useContext(wishlistContext);
  const [ wishlistItems, setWishlistItems ] = useState<ProductCardUI[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
    
  async function getWishlist() {
    try {
      setIsLoading(true);
      setError(null);

      if (!wishlist) return;

      const res = await wishlist.getUserWishlist();

      if (res?.data?.success) {
        setWishlistItems(res.data.data);
      } else{
        setError("Failed To Load Wishlist");
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
      <WishlistSkeleton />
    );
  }

  if (error) {
    return (
      <main className="container mx-auto py-10 md:h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center min-h-75 gap-4">
          <p className="text-gray-700">{error}</p>

          <button
            onClick={getWishlist}
            className="flex items-center gap-2 border border-black rounded bg-black px-4 py-2 text-white cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
          >
            <FontAwesomeIcon
              icon={faRotateRight}
            />
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
                null
              ) : (
                <h1 className="text-[20px] font-semibold md:text-[20px]">
                  Wishlist ({wishlistItems.length})
                </h1>
              )}
              
            </div>

            {/* BUTTON */}
            {wishlistItems.length === 0 ? (
              null
            ) : (
              <div className="hidden md:flex items-center">
                <button className="rounded-sm border bg-white px-6 py-3 text-black shadow transition hover:bg-[#DB4444] hover:text-white md:px-12">
                  Move All To Bag
                </button>
              </div>
            )}
            

          </header>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {wishlistItems.length === 0 ? (

              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
  
                {/* ICON */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-5">
                  <FaHeart className="text-3xl text-gray-500" />
                </div>

                {/* TITLE */}
                <h2 className="text-2xl font-semibold text-gray-800">
                  Your wishlist is Empty
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-500 mt-2 max-w-sm">
                  Save items you love to your wishlist and come back to them anytime.
                  Start browsing and add your favorite products.
                </p>

                {/* BUTTON */}
                <Link
                  href="/"
                  className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Explore Products
                </Link>

              </div>
            ) : (
              wishlistItems.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  isAdded={true}
                  onRemove={() => {
                    getWishlist()
                  }}
                />
              ))
            )}

          </div>

            {/* MOBILE BUTTON */}
            {wishlistItems.length === 0 ? (
              null
            ) : (
              <div className="mt-8 flex justify-center md:hidden w-full">
                <button className="rounded-sm border bg-white px-6 py-3 text-black shadow transition hover:bg-[#DB4444] hover:text-white w-full">
                    Move All To Bag
                </button>
              </div>
            )}
            

        </section>

        {/* JUST FOR YOU SECTION */}
        {wishlistItems.length === 0 ? (
          null
        ) : (
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
                isAdded={false}
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
        )}
        

      </div>
    </main>
  );
}