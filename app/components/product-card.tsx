"use client";

import { faHeart, faEye, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  isOffered: boolean;
  isAdded: boolean
}

interface ProductCardProps {
  // isOffer: boolean;
  // isAdded: boolean;
  product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
  const { isOffered, isAdded } = product;
  return (
    <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]">

      {/* INNER */}
      <div className="px-2">

        {/* CARD */}
        <div className="group h-[350px] overflow-hidden bg-white rounded-lg">

          {/* IMAGE */}
          <div className="relative flex h-[250px] items-center justify-center bg-[#F5F5F5]">

            <img
              src={product.image}
              alt={product.name}
              className="h-[150px] object-contain"
            />

            {/* OFFER BADGE */}
            {isOffered && (
              <span className="absolute top-3 left-3 bg-[#DB4444] px-2 py-1 text-sm text-white rounded">
                -{product.discount}%
              </span>
            )}

            {/* ACTION BUTTONS */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">

              {!isAdded && (
                <button className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              )}

              <button className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                <FontAwesomeIcon icon={faEye} />
              </button>

              {isAdded && (
                <button className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={faTrashCan} />
              </button>
              )}

            </div>

            {/* ADD TO CART */}
            <button
              className="
                absolute bottom-0 left-0 w-full
                translate-y-3
                bg-black py-3 text-white
                opacity-0
                transition-all duration-300
                group-hover:translate-y-0
                group-hover:opacity-100
                hover:bg-gray-900
                cursor-pointer
              "
            >
              Add To Cart
            </button>

          </div>

          {/* CONTENT */}
          <div className="p-4">

            <h3 className="text-lg font-bold">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500">
              {product.category}
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="font-bold text-red-500">
                ${product.price}
              </span>

              {isOffered && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.discount}
                </span>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}