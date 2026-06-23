"use client"
import { getImageUrl } from '@/app/admin/utils/getImageUrl';
import CartSkeleton from '@/app/components/skeletonUI/cart-skeleton';
import { cartContext } from '@/app/context/cartContext';
import { CartItem } from '@/app/types/cart';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FaShoppingCart, FaTimes } from 'react-icons/fa'

import { toast } from 'sonner';

export default function CartPage() {

  const [ cartItems, setCartItems ] = useState<CartItem[]>([]);
  const cart = useContext(cartContext);

  const [ isLoading, setIsLoading ] = useState(false)
  
  async function getCart() {
    try {
      setIsLoading(true)
      if (!cart) return;

      const res = await cart?.getUserCart();
      console.log(res.data);

      if(res.data.success === true){
        setCartItems(res.data.data.items);
        // console.log(res.data.data.items)
        // console.log(mockData);
        setIsLoading(false)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  async function updateQuantity(cartItemId: string, quantity: number) {
    try {
      if (!cart) return;

      const res = await cart?.updateCartItemQuantity(cartItemId, quantity);

      console.log(res)

      if(res.data.success === true){
        toast.success("Item Quantity Updated Successfully")
        getCart();
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function removeItem(cartItemId: string) {
    try {
      if (!cart) return;

      const res = await cart?.removeCartItem(cartItemId);

      console.log(res)

      if(res.data.success === true){
        toast.success("Item Deleted Successfully")
        getCart();
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return <CartSkeleton />;
  }

  // if(cartItems.length === 0){
  //   return (
  //     <div className="flex flex-col items-center justify-center py-24 text-center min-h-screen">

  //       {/* ICON */}
  //       <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 mb-5">
  //         <FaShoppingCart className="text-3xl text-gray-500" />
  //       </div>

  //       {/* TITLE */}
  //       <h2 className="text-2xl font-semibold text-gray-800">
  //         Your cart is empty
  //       </h2>

  //       {/* DESCRIPTION */}
  //       <p className="text-gray-500 mt-2 max-w-sm">
  //         Looks like you haven’t added anything yet. Start exploring our products and add your favorites.
  //       </p>

  //       {/* BUTTON */}
  //       <Link
  //         href="/"
  //         className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
  //       >
  //         Go Shopping
  //       </Link>

  //     </div>
  //   )
  // }

  return (
    <div className="container mx-auto px-4 py-10 mt-15 min-h-screen">

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>

        <span>/</span>

        <span className="text-black font-medium">
          Cart
        </span>
      </div>

      {/* TABLE HEADER */}
      <div className="hidden md:grid grid-cols-4 gap-6 items-center bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-5 mb-6 text-sm font-semibold text-black uppercase">
        <div>Product</div>

        <div className="text-center">
          Price
        </div>

        <div className="text-center">
          Quantity
        </div>

        <div className="text-end">
          Subtotal
        </div>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-5"
          >

            {/* PRODUCT */}
            <div className="flex items-center gap-4 group relative">

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={getImageUrl(item.variant.product.thumbnail)}
                  alt={item.variant.product.title}
                  className="w-16 h-16 rounded-xl object-contain"
                />

                {/* REMOVE BUTTON */}
                <button
                  onClick={()=> {removeItem(item.id)}}
                  className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#DB4444] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                >
                  <FaTimes className="text-[12px]" />
                </button>
              </div>

              {/* PRODUCT INFO */}
              <div>
                <h2 className="text-[16px] font-medium text-black">
                  {item.variant.product.title}
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="w-4 h-4 rounded-full border"
                    style={{
                      backgroundColor: item.variant.color.hexCode
                    }}
                  />

                  <span className="text-sm text-gray-500">
                    {item.variant.color.name}
                  </span>

                  <span className="text-gray-300">|</span>

                  <span className="text-sm text-gray-500 uppercase">
                    {item.variant.size.name}
                  </span>
                </div>
              </div>
            </div>

            {/* PRICE */}
            <div className="text-center text-gray-700 font-medium text-base">
              $
              {item.variant.discountPrice ?? item.variant.price}
            </div>

            {/* QUANTITY */}
            <div className="flex justify-center">
              <div className="flex items-center border rounded-xl overflow-hidden">

                <button
                  onClick={ () => {item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)} } 
                  className="px-4 py-2 text-lg hover:bg-[#DB4444] hover:text-white transition duration-300">
                  -
                </button>

                <span className="px-5 font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={()=>{ updateQuantity(item.id, item.quantity+1)}}
                  className="px-4 py-2 text-lg hover:bg-[#DB4444] hover:text-white transition duration-300">
                  +
                </button>

              </div>
            </div>

            {/* SUBTOTAL */}
            <div className="text-end font-semibold text-lg text-black">
              $
              {(item.variant.discountPrice ?? item.variant.price) *
                item.quantity}
            </div>

          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-end mt-10">
        <div className="w-full md:w-87.5 border rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Cart Total
          </h2>

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500">
              Subtotal
            </span>

            <span className="font-medium">
              $
              {cartItems.reduce(
                (sum, item) =>
                  sum +
                  (item.variant.discountPrice ?? item.variant.price) *
                    item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <span className="text-gray-500">
              Shipping
            </span>

            <span className="font-medium">
              Free
            </span>
          </div>

          <div className="flex items-center justify-between text-lg font-semibold mb-6">
            <span>Total</span>

            <span>
              $
              {cartItems.reduce(
                (sum, item) =>
                  sum +
                  (item.variant.discountPrice ?? item.variant.price) *
                    item.quantity,
                0
              )}
            </span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
            Proceed To Checkout
          </button>

        </div>
      </div>

    </div>
  );

  // return (
  //   <div className="w-full py-10">
  //     <div className="mx-auto max-w-7xl px-4">

  //       {/* BREADCRUMB */}
  //       <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
  //         <Link href="/" className="hover:text-black transition">
  //           Home
  //         </Link>

  //         <span>/</span>

  //         <span className="text-black font-medium">
  //           Cart
  //         </span>
  //       </div>

  //       {/* TABLE HEADER */}
  //       <div className="hidden md:grid grid-cols-4 gap-6 items-center bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-5 mb-6 text-sm font-semibold text-black uppercase">

  //           <div>Product</div>

  //           <div className="text-center">
  //               Price
  //           </div>

  //           <div className="text-center">
  //               Quantity
  //           </div>

  //           <div className="text-end">
  //               Subtotal
  //           </div>

  //       </div>

  //       {/* CART ITEMS */}
  //       <div className="space-y-4">

  //       {cartItems.map((item) => (
  //           <div
  //           key={item.id}
  //           className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-5">

  //           {/* PRODUCT */}
  //           <div className="flex items-center gap-4 group relative">

  //             {/* IMAGE */}
  //             <div className="relative">

  //               <img
  //                 src={item.image}
  //                 alt={item.name}
  //                 className="w-14 h-14 rounded-xl object-contain"
  //               />

  //               {/* REMOVE BUTTON */}
  //               <button
  //                 className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#DB4444] text-white 
  //                 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
  //               >
  //                 <FaTimes className="text-[12px]" />
  //               </button>

  //             </div>

  //             {/* PRODUCT INFO */}
  //             <div>
  //               <h2 className="text-[16px] text-black">
  //                 {item.name}
  //               </h2>

  //               {/* <p className="text-sm text-gray-500 mt-1">
  //                 {item.color}
  //               </p> */}
  //             </div>

  //           </div>

  //           {/* PRICE */}
  //           <div className="text-center text-gray-700 font-medium text-base">
  //               ${item.price}
  //           </div>

  //           {/* QUANTITY */}
  //           <div className="flex justify-center">
  //               <div className="flex items-center border rounded-xl overflow-hidden">
  //               <button className="px-4 py-2 text-lg hover:bg-[#DB4444] hover:text-white transition duration-300">
  //                   -
  //               </button>

  //               <span className="px-5 font-medium">
  //                   {item.quantity}
  //               </span>

  //               <button className="px-4 py-2 text-lg hover:bg-[#DB4444] hover:text-white transition duration-300">
  //                   +
  //               </button>
  //               </div>
  //           </div>

  //           {/* SUBTOTAL */}
  //           <div className="text-end font-semibold text-lg text-black">
  //               ${item.price * item.quantity}
  //           </div>

  //           </div>
  //       ))}

  //       </div>

  //       {/* TOTAL */}
  //       <div className="flex justify-end mt-10">
  //         <div className="w-full md:w-87.5 border rounded-2xl p-6">

  //           <h2 className="text-xl font-semibold mb-6">
  //             Cart Total
  //           </h2>

  //           <div className="flex items-center justify-between mb-4">
  //             <span className="text-gray-500">
  //               Subtotal
  //             </span>

  //             <span className="font-medium">
  //               $280
  //             </span>
  //           </div>

  //           <div className="flex items-center justify-between border-b pb-4 mb-6">
  //             <span className="text-gray-500">
  //               Shipping
  //             </span>

  //             <span className="font-medium">
  //               Free
  //             </span>
  //           </div>

  //           <div className="flex items-center justify-between text-lg font-semibold mb-6">
  //             <span>Total</span>

  //             <span>$280</span>
  //           </div>

  //           <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
  //             Proceed To Checkout
  //           </button>

  //         </div>
  //       </div>

  //     </div>
  //   </div>
  // )
}
