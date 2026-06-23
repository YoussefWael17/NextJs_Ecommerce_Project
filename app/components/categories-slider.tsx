"use client"
import { faHeart, faEye, faHeadphones } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faArrowRight, faGamepad, faMobileScreen, faShirt, faTv } from '@fortawesome/free-solid-svg-icons';
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera';
import { faLaptop } from '@fortawesome/free-solid-svg-icons/faLaptop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react'
import { useGetCategoriesQuery } from '../redux/services/categoriesApi';

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const iconMap: Record<string, IconDefinition> = {
  faMobileScreen,
  faLaptop,
  faCamera,
  faHeadphones,
  faGamepad,
  faTv,
  faShirt,
};


export default function CategoriesSlider() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const { data, refetch, isLoading, isFetching} = useGetCategoriesQuery();

    const categories = data?.data ?? [];
    
    
      const [emblaRef, emblaApi] = useEmblaCarousel(
        {
          loop: true,
          align: "start",
          containScroll: "trimSnaps",
        },
        [Autoplay({ delay: 4000, stopOnInteraction: false })]
      );
    
      const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
      }, [emblaApi]);
    
      const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
      }, [emblaApi]);
    
      const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
      }, [emblaApi]);
    
      useEffect(() => {
        if (!emblaApi) return;
    
        emblaApi.on("select", onSelect);
        onSelect();
    
        emblaApi.plugins()?.autoplay;
        // emblaApi.plugins()?.autoplay?.play();
      }, [emblaApi, onSelect]);
    
  //     const categories = [
  //   { name: "Phones", icon: faMobileScreen },
  //   { name: "Laptops", icon: faLaptop },
  //   { name: "Camera", icon: faCamera },
  //   { name: "Headphones", icon: faHeadphones },
  //   { name: "Gaming", icon: faGamepad },
  //   { name: "TV", icon: faTv },
  //   { name: "Fashion", icon: faShirt },
  // ];

  return (
    <div className="flex w-full items-center mb-17.5">

      <div className="mx-auto w-full max-w-7xl px-4">
        
        <div className="flex w-full flex-row items-end justify-between px-4 mb-10">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="h-10 w-5 rounded bg-[#DB4444]"></span>
              <span className="ms-4 font-semibold text-[#DB4444]">Categories</span>
            </div>

            <div className="mt-2 flex items-center gap-12 md:gap-20">
              <h3 className="text-3xl font-semibold md:text-4xl">Browse By Category</h3>

            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">

            <button
              onClick={scrollPrev}
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full bg-[#F5F5F5]
                transition hover:bg-[#DB4444] hover:text-white cursor-pointer
              "
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <button
              onClick={scrollNext}
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full bg-[#F5F5F5]
                transition hover:bg-[#DB4444] hover:text-white cursor-pointer
              "
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>

          </div>

        </div>


        {/* VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}>

          {/* TRACK */}
          <div className="flex">

            {/* {categories?.map((cat, index) => (

              <div
                key={index}
                className="
                  flex-[0_0_50%]
                  sm:flex-[0_0_50%]
                  md:flex-[0_0_33.333%]
                  lg:flex-[0_0_16.666%]
                "
              >


                <div className="px-2">
                  <div className="group h-37.5 flex flex-col items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg hover:bg-[#DB4444]  transition-colors duration-300 cursor-pointer">
                    
                    <FontAwesomeIcon
                      icon={cat.icon}
                      className="group-hover:text-white transition-colors duration-300 text-[56px] text-black"
                    />

    
                    <p className="group-hover:text-white transition-colors duration-300 text-[16px] font-medium text-black">
                      {cat.name}
                    </p>

                  </div>
                </div>

              </div>
            ))} */}
            {categories.map((cat, index) => {
              const icon = cat.icon ? iconMap[cat.icon] : null;

              return (
                <div key={index} className="flex-[0_0_16.666%] px-2">
                  <div className="group h-37.5 flex flex-col items-center justify-center gap-3 bg-white border border-gray-200 rounded-lg hover:bg-[#DB4444] transition">

                    {icon && (
                      <FontAwesomeIcon
                        icon={icon}
                        className="group-hover:text-white text-[56px] text-black"
                      />
                    )}

                    <p className="group-hover:text-white text-[16px] font-medium">
                      {cat.name}
                    </p>

                  </div>
                </div>
              );
            })}

          </div>

        </div>

        <hr className="hidden md:block border-0 h-px bg-gray-200 mt-17.5" />

      </div>

    </div>
  );
}
