"use client";

import { faHeart, faEye, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import React from "react";
import { Variant } from "../types/variant";
import { ProductImage } from "../types/product-images";
import { Vendor } from "../types/vendor";
import { Category } from "../types/category";
import { getImageUrl } from "../admin/utils/getImageUrl";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: string;

  title: string;
  
  slug?: string;
  description?: string;
  thumbnail: string;

  isActive?: boolean;
  isSale?: boolean;

  category: Category;
  categoryId?: string;


  vendorId?: string;
  vendor?: Vendor;

  variants?: Variant[];
  images?: ProductImage[];

  createdAt?: string;
  updatedAt?: string;

  price?: number;
  discount?: number;
  isOffered?: boolean;
  isAdded?: boolean

  totalReviews: number;
  avgRating: number;




  
  
  
  

  

  
}

interface ProductCardProps {
  product: Product;
}






export default function ProductCard({product}: ProductCardProps) {
  const { isOffered, isAdded } = product;

  const prices = product.variants?.map(v => v.price) ?? [];
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return (
    <div className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]">

      {/* INNER */}
      <div className="px-2">

        {/* CARD */}
        <div className="group overflow-hidden bg-white rounded-lg">

          {/* IMAGE */}
          <div className="relative flex h-62.5 items-center justify-center bg-[#F5F5F5]">

            <img
              src={getImageUrl(product.thumbnail)}
              alt={product.title}
              className="h-37.5 object-contain"
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
                <button onClick={() =>
                  toast.success("Product Added To Wishlist")
                } 
                className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              )}

              <button className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                <FontAwesomeIcon icon={faEye} />
              </button>

              {isAdded && (
                <button
                  onClick={() =>
                    toast.error("Product Removed From Wishlist")
                  }
                  className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}

            </div>

            {/* ADD TO CART */}
            <button
              onClick={() =>
                toast.success("Product added to cart")
              }
              className="
                absolute bottom-0 left-0 w-full
                translate-y-0 lg:translate-y-3 
                bg-black py-3 text-white
                opacity-100 lg:opacity-0
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
              {product.title}
            </h3>

            <p className="text-sm text-gray-500">
              {product.category.name}
            </p>

            <div className="mt-2 flex items-center gap-2">

              <span className="font-bold text-red-500">
                ${maxPrice}
              </span>


              {isOffered && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.discount}
                </span>
              )}

            </div>

            <div className="mt-2 flex items-center gap-2">
    
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`text-sm ${
                      star <= Math.round(product.avgRating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="text-sm text-gray-500">
                ({product.totalReviews})
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}