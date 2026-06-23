import React from 'react'
import ProductCardSkeleton from './product-card-skeleton';

export default function FlashSaleSkeleton() {
  return (
      <div className="mx-auto w-full max-w-7xl px-4 animate-pulse mb-10">
  
        {/* Header */}
        <div className="mb-10 flex w-full flex-row items-end justify-between px-4">
  
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="h-10 w-5 rounded bg-gray-200"></div>
              <div className="ms-4 h-5 w-20 rounded bg-gray-200"></div>
            </div>
  
            <div className="mt-4 flex items-center gap-12 md:gap-20">
  
              <div className="h-10 w-48 rounded bg-gray-200"></div>
  
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex flex-col items-center">
                    <div className="mb-2 h-4 w-12 rounded bg-gray-200"></div>
                    <div className="h-8 w-14 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
  
            </div>
          </div>
  
          <div className="hidden gap-3 md:flex">
            <div className="h-11 w-11 rounded-full bg-gray-200"></div>
            <div className="h-11 w-11 rounded-full bg-gray-200"></div>
          </div>
  
        </div>
  
        {/* Products */}
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
  
        {/* Button */}
        <div className="my-15 flex justify-center">
          <div className="h-14 w-60 rounded bg-gray-200"></div>
        </div>
  
        {/* Divider */}
        <div className="hidden h-px w-full bg-gray-200 md:block"></div>
  
      </div>
    );
}
