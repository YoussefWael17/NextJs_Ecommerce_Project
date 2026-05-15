"use client"

import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar"
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus, faRotateLeft, faTruck, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"
import ProductCard from "../components/product-card"

export default function ProductDetails() {

  const [hovered, setHovered] = useState(false);

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
  ];

  const images = [
    "https://www.pngmart.com/files/7/PS4-PNG-Transparent-Image.png",
    "https://www.pngmart.com/files/22/iPhone-14-PNG-Image.png",
    "https://www.pngmart.com/files/23/Apple-Watch-PNG-Pic.png",
    "https://www.pngmart.com/files/1/Nike-Shoes-Transparent-Background.png",
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  const [mainImage, setMainImage] = useState(images[0])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.plugins()?.autoplay?.play()
  }, [emblaApi])

  return (
    <div className="w-full py-4">
      <div className="mx-auto max-w-screen-xl px-2 lg:px-4">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-10 mt-6">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-black">Gaming</Link>
          <span>/</span>
          <span className="text-black font-medium">
            Sony PlayStation 4
          </span>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* DETAILS */}
          <div className="order-3 lg:col-span-5 bg-white p-4 lg:p-6 lg:pt-0">

            {/* TITLE */}
            <h1 className="text-2xl font-semibold mb-2">
              Sony PlayStation 4
            </h1>

            {/* STARS */}
            <div className="flex items-center gap-2 text-sm mb-3">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon key={star} icon={faStar} />
                ))}
              </div>

              <span className="text-gray-500">(25 Reviews)</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>

            {/* PRICE */}
            <div className="text-2xl mb-3">$199.00</div>

            {/* DESCRIPTION */}
            <p className="text-sm mb-3">
              PlayStation 5 Controller Skin High quality vinyl with air 
              channel adhesive for easy bubble free install & mess free removal
              Pressure sensitive.
            </p>

            <hr className="mb-3" />

            {/* COLORS */}
            <div className="mb-3 flex gap-4 items-center">
              <h3 className="text-lg">Colours:</h3>
              <div className="flex gap-2">
                <div className="w-5 h-5 rounded-full bg-black border cursor-pointer" />
                <div className="w-5 h-5 rounded-full bg-red-500 border cursor-pointer" />
                <div className="w-5 h-5 rounded-full bg-blue-500 border cursor-pointer" />
              </div>
            </div>

            {/* SIZE */}
            <div className="mb-3 flex gap-4 items-center">
              <h3 className="text-lg">Size:</h3>
              <div className="flex gap-2">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    className="border px-2 py-1 cursor-pointer hover:bg-[#DB4444] hover:text-white transition duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* QTY + ACTIONS */}
            <div className="flex items-center gap-3 mt-4">

              <div className="flex items-center border rounded-r-sm rounded-l-sm">
                <button className="border-r border-black px-3 py-3 hover:bg-[#DB4444] hover:text-white rounded-l-sm transition duration-300 cursor-pointer">
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <span className="px-6">1</span>

                <button className="border-l border-black px-3 py-3 hover:bg-[#DB4444] hover:text-white rounded-r-sm transition duration-300 cursor-pointer">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <button className="bg-[#DB4444] text-white px-5 py-3 hover:bg-white hover:text-[#DB4444] rounded-sm border border-[#DB4444] transition duration-300 cursor-pointer">
                Buy Now
              </button>

              <button
                className="border p-2 text-xl rounded-sm transition-all duration-300 ease-in-out cursor-pointer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <FontAwesomeIcon
                  icon={hovered ? solidHeart : regularHeart}
                  className={`transition-all duration-300 ease-in-out ${
                    hovered ? "text-[#DB4444] scale-100" : "text-black scale-100"
                  }`}
                />
              </button>
            </div>

            {/* DELIVERY BOX */}
            <div className="border mt-10 overflow-hidden">

              {/* TOP */}
              <div className="flex gap-3 p-3 border-b">
                <FontAwesomeIcon icon={faTruck} className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Free Delivery</h3>
                  <p className="text-sm underline text-black">
                    Enter your postal code for availability
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex gap-3 p-3">
                <FontAwesomeIcon icon={faRotateLeft} className="text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Return Delivery</h3>
                  <p className="text-sm text-black">
                    Free 30 Days Returns
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* MAIN IMAGE */}
          <div className="order-1 md:order-2 lg:col-span-5 bg-[#F5F5F5] flex items-center justify-center p-4">
            <img
              src={mainImage}
              className="w-full max-h-[320px] object-contain hover:scale-105 transition"
              alt=""
            />
          </div>

          {/* THUMBNAILS */}
          <div className="order-1 lg:col-span-2">

            {/* DESKTOP */}
            <div className="hidden lg:flex lg:flex-col gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className="w-full h-[120px] bg-[#F5F5F5] flex items-center justify-center cursor-pointer hover:border-[#DB4444] border border-[#F5F5F5] transition duration-300"
                >
                  <img src={img} className="w-full h-full object-contain p-2 hover:scale-105 transition duration-300" />
                </div>
              ))}
            </div>

            {/* MOBILE */}
            <div className="lg:hidden overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {images.map((img, i) => (
                  <div key={i} className="min-w-[50%] p-2">
                    <div className="h-[120px] bg-[#F5F5F5] flex items-center justify-center">
                      <img src={img} className="w-full h-full object-contain p-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

    
        {/* HEADER */}
        <div className="flex w-full flex-row items-end justify-between px-4 mt-40 mb-10">
          
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="h-10 w-5 rounded bg-[#DB4444]"></span>
              <span className="ms-4 font-semibold text-[#DB4444]">
                Related Item
              </span>
            </div>

          </div>


        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>
  

      </div>
    </div>
  )
}