"use client"

import React, { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar"
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faMinus, faPlus, faRotateLeft, faRotateRight, faTriangleExclamation, faTruck, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"
import ProductCard from "@/app/components/product-card"
import { useParams } from "next/navigation"
import { useGetSingleProductQuery } from "@/app/redux/services/productsApi"
import { getImageUrl } from "@/app/admin/utils/getImageUrl"
import ProductDetailsSkeleton from "@/app/components/skeletonUI/product-details-sleleton"


export default function ProductDetails() {

  const [hovered, setHovered] = useState(false);

  let [ quantity, setQuantity ] = useState(1);

  const params = useParams();
  
    const id = params?.["product-details"] as string;

    const { data: product, isLoading, isError, isFetching, refetch } = useGetSingleProductQuery(id as string, {
        skip: !id,
    });



    

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


  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  // const [mainImage, setMainImage] = useState("")

  const [mainImage, setMainImage] = useState<string | null>(null);
  

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.plugins()?.autoplay?.play()
  }, [emblaApi])

  useEffect(() => {
    if (product?.data?.thumbnail) {
      setMainImage(getImageUrl(product.data.thumbnail));
    }
  }, [product]);


  if (isLoading || isFetching) return <ProductDetailsSkeleton />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-2xl p-8 text-center max-w-md w-full border border-gray-200">

          {/* Icon */}
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-5xl text-black mb-4"
          />

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 mb-6">
            We couldn’t load the product details. Please try again.
          </p>

          {/* Button */}
          <button
            onClick={() => refetch()}
            className="w-full py-2.5 bg-black border border-black text-white rounded-lg cursor-pointer hover:bg-white hover:text-black transition duration-300 flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faRotateRight} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 pt-20">
      <div className="mx-auto max-w-7xl px-2 lg:px-4">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-10 mt-6">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/" className="hover:text-black">{ product?.data?.category?.name }</Link>
          <span>/</span>
          <span className="text-black font-medium">
            { product?.data?.title } 
          </span>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* DETAILS */}
          <div className="order-3 lg:col-span-5 bg-white p-4 lg:p-6 lg:pt-0">

            {/* TITLE */}
            <h1 className="text-2xl font-semibold mb-2">
              { product?.data?.title } 
            </h1>

            {/* STARS */}
            <div className="flex items-center gap-2 text-sm mb-3">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon key={star} icon={faStar} />
                ))}
              </div>

              <span className="text-gray-500">{ product?.data?.totalReviews }</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-600 font-medium">In Stock</span>
            </div>

            {/* PRICE */}
            <div className="text-2xl mb-3">
              ${product?.data?.variants?.[0]?.price ?? 199}
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm mb-3">
              {product?.data?.description || "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removalPressure sensitive."}
            </p>

            <hr className="mb-3" />

            {/* COLORS */}
            {product?.data?.variants?.length ?
             (
              <div className="mb-3 flex gap-4 items-center">
                <h3 className="text-lg">Colours:</h3>
                <div className="flex gap-2">
                  {product?.data?.variants?.map((variant) => (
                    <div
                      key={variant.id}
                      className="w-5 h-5 rounded-full border cursor-pointer"
                      style={{ backgroundColor: variant.color?.hexCode }}
                      title={variant.color?.name}
                    />
                  ))}
                </div>
              </div>
            ) : (null)}
            

            {/* SIZE */}
            {product?.data?.variants?.length ?
            (
              <div className="mb-3 flex gap-4 items-center">
                <h3 className="text-lg">Size:</h3>
                <div className="flex gap-2">
                  {product?.data.variants?.map((variant) => (
                    <button
                      key={variant.id}
                      className="border px-2 py-1 cursor-pointer hover:bg-[#DB4444] hover:text-white transition duration-300"
                    >
                      {variant.size?.name}
                    </button>
                  ))}
                </div>
            </div>
            ) : (null)}
            

            {/* QTY + ACTIONS */}
            <div className="flex items-center gap-3 mt-4">

              <div className="flex items-center border rounded-r-sm rounded-l-sm">
                <button className="border-r border-black px-3 py-3 hover:bg-[#DB4444] hover:text-white rounded-l-sm transition duration-300 cursor-pointer" onClick={()=> {setQuantity(quantity - 1)}}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                <span className="px-6">{quantity}</span>

                <button className="border-l border-black px-3 py-3 hover:bg-[#DB4444] hover:text-white rounded-r-sm transition duration-300 cursor-pointer" onClick={()=> {setQuantity(quantity + 1)}}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <button className="bg-[#DB4444] text-white px-5 py-3 hover:bg-white hover:text-[#DB4444] rounded-sm border border-[#DB4444] transition duration-300 cursor-pointer">
                Add To Cart
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

          {product?.data?.images? (
            <>
              {product?.data?.images?.length ? (
                <>
                <div className="order-1 md:order-2 lg:col-span-5 bg-[#F5F5F5] flex items-center justify-center p-4">
                  <img
                    src={mainImage || undefined}
                    className="w-full max-h-80 object-contain hover:scale-105 transition"
                    alt=""
                  />
                </div>

                <div className="order-1 lg:col-span-2">
                  {/* Desktop */}
                  <div className="hidden lg:flex lg:flex-col gap-3">
                    {product.data.images.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setMainImage(getImageUrl(img.image))}
                        className="w-full h-30 bg-[#F5F5F5] flex items-center justify-center cursor-pointer"
                      >
                        <img
                          src={getImageUrl(img.image)}
                          className="w-full h-full object-contain p-2 hover:scale-105 transition duration-300"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>

                  {/* Mobile */}
                  <div className="lg:hidden overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                      {product.data.images.map((img, i) => (
                        <div 
                          key={i}
                          onClick={() => setMainImage(getImageUrl(img.image))}
                          className="min-w-[50%] p-2">
                          <div className="h-30 bg-[#F5F5F5] flex items-center justify-center">
                            <img src={getImageUrl(img.image)} className="w-full h-full object-contain p-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
                </>
              ) : (
                <>
                  <div className="order-1 md:order-2 lg:col-span-7 bg-[#F5F5F5] flex items-center justify-center p-4">
                    <img
                      src={mainImage || undefined}
                      className="w-full max-h-80 object-contain hover:scale-105 transition"
                      alt=""
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            null
          )}
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