"use client";

import { faHeart, faEye, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import { getImageUrl } from "../admin/utils/getImageUrl";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ProductCardUI } from "../types/product";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { cartContext } from "../context/cartContext";
import { wishlistContext } from "../context/wishlistContext";


interface ProductCardProps {
  product: ProductCardUI;
  isAdded: boolean,
  onRemove?: () => void;
}


export default function ProductCard({product, isAdded, onRemove}: ProductCardProps) {

  const router = useRouter();
  const cart = useContext(cartContext)
  const wishlist = useContext(wishlistContext);

  // const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  
  function navigateToProductDetails(id: string) {
    return router.push(`/products/${id}`)
  }

  

  async function addVaraintToCart(varId: string, quantity: number) {
      try {
        if (!cart) return;
  
        const res = await cart?.addToCart(varId, quantity);
  
        console.log(res)
  
        if(res.data.success === true){
          toast.success("Product Added To Cart Successfully")
        }
      } catch (error) {
        console.log(error)
      }
    }

    async function addVaraintToWishlist(varId: string) {
      try {
        if (!cart) return;
  
        const res = await wishlist?.addItemToWishlist(varId);
  
        console.log(res)
  
        if(res.data.success === true){
          toast.success("Product Added To Wishlist Successfully")
        }
      } catch (error) {
        console.log(error)
      }
    }

    async function removeWishlistItem(wishlistItemId: string) {
        try {
          if (!wishlist) return;
    
          const res = await wishlist?.removeWishlistItem(wishlistItemId);
    
          console.log(res)
    
          if(res.data.success === true){
            toast.success("Item Removed Successfully")
            onRemove?.();
          }
          
        } catch (error) {
          console.log(error)
        }
        
      }
  
  const isOffered = true;
  // const isAdded = false;

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
              className="h-37.5 object-contain cursor-pointer"
              onClick={()=> {navigateToProductDetails(product.id)}}
            />

            {/* OFFER BADGE */}
            {Number(product?.salePercentage) > 0 && (
              <span className="absolute top-3 left-3 bg-[#DB4444] px-2 py-1 text-sm text-white rounded">
                -{product.salePercentage}%
              </span>
            )}

            {/* ACTION BUTTONS */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">

              {!isAdded && (
                <button 
                  onClick={() => {
                if (!product.variants?.[0]?.id) {
                  toast.error("Product is unavailable");
                  return;
                }
                addVaraintToWishlist(product.variants?.[0]?.id);
                
              }
                } 
                className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              )}

              <button className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                <FontAwesomeIcon icon={faEye} />
              </button>

              {/* {isAdded && (
                <button
                  onClick={() => {
                    if (!product.variants?.id) {
                  toast.error("Product is unavailable");
                  return;
                    }
                    removeWishlistItem(product.variants?.id)
                  }
                    // toast.error("Product Removed From Wishlist")
                  }
                  className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition">
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )} */}

              {isAdded && (
                <button
                  onClick={() => {
                    const variantId = product.variant?.id;

                    if (!variantId) {
                      toast.error("Product is unavailable");
                      return;
                    }

                    removeWishlistItem(variantId);
                    
                  }}
                  className="rounded-full bg-white shadow w-8 h-8 flex justify-center items-center cursor-pointer hover:bg-gray-100 transition"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}

            </div>

            {/* ADD TO CART */}
            <button
              onClick={() => {
                if (!product.variants?.[0]?.id) {
                  toast.error("Product is unavailable");
                  return;
                }
                addVaraintToCart(product.variants?.[0]?.id, 1);
                
              }
                
                // toast.success("Product added to cart")
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
          <div className="p-4 cursor-pointer" onClick={()=> {navigateToProductDetails(product.id)}}>

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
                  ${product.salePercentage}
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