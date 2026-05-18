import Link from 'next/link'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

export default function CartPage() {

  const cartItems = [
    {
      id: 1,
      name: 'Leather Bag',
      color: 'Black Color',
      image: 'https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png',
      price: 120,
      quantity: 1,
    },
    {
      id: 2,
      name: 'Classic Shoes',
      color: 'Brown Color',
      image: 'https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png',
      price: 80,
      quantity: 2,
    },
  ]

  return (
    <div className="w-full py-10">
      <div className="mx-auto max-w-screen-xl px-4">

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
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-5">

            {/* PRODUCT */}
            <div className="flex items-center gap-4 group relative">

              {/* IMAGE */}
              <div className="relative">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-contain"
                />

                {/* REMOVE BUTTON */}
                <button
                  className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-[#DB4444] text-white 
                  flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                >
                  <FaTimes className="text-[12px]" />
                </button>

              </div>

              {/* PRODUCT INFO */}
              <div>
                <h2 className="text-[16px] text-black">
                  {item.name}
                </h2>

                {/* <p className="text-sm text-gray-500 mt-1">
                  {item.color}
                </p> */}
              </div>

            </div>

            {/* PRICE */}
            <div className="text-center text-gray-700 font-medium text-base">
                ${item.price}
            </div>

            {/* QUANTITY */}
            <div className="flex justify-center">
                <div className="flex items-center border rounded-xl overflow-hidden">
                <button className="px-4 py-2 text-lg hover:bg-[#DB4444] hover:text-white transition duration-300">
                    -
                </button>

                <span className="px-5 font-medium">
                    {item.quantity}
                </span>

                <button className="px-4 py-2 text-lg hover:bg-[#DB4444] hover:text-white transition duration-300">
                    +
                </button>
                </div>
            </div>

            {/* SUBTOTAL */}
            <div className="text-end font-semibold text-lg text-black">
                ${item.price * item.quantity}
            </div>

            </div>
        ))}

        </div>

        {/* TOTAL */}
        <div className="flex justify-end mt-10">
          <div className="w-full md:w-[350px] border rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-6">
              Cart Total
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-medium">
                $280
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

              <span>$280</span>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
              Proceed To Checkout
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
