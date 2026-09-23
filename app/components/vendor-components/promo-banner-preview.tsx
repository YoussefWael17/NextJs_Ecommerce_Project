"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { getImageUrl } from "@/app/admin/utils/getImageUrl";
import type { Product } from "@/app/types/product";

type PromoBannerPreviewProps = {
  product?: Product;
  offerPercentage: string;
  backgroundColor: string;
  startDate: string;
  endDate: string;
};

export default function PromoBannerPreview({
  product,
  offerPercentage,
  backgroundColor,
  startDate,
  endDate,
}: PromoBannerPreviewProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /* ---------------------------------
     PRODUCT IMAGE
  --------------------------------- */

  const productImage = useMemo(() => {
    if (!product) return null;

    if (product.thumbnail) {
      return product.thumbnail;
    }

    // if (product.images?.length) {
    //   return product.images[0].image;
    // }

    return null;
  }, [product]);

  const imageUrl = productImage
    ? getImageUrl(productImage)
    : null;

  /* ---------------------------------
     COUNTDOWN
  --------------------------------- */

  useEffect(() => {
    if (!endDate) {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const end = new Date(endDate).getTime();

      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(
          distance / (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (distance / (1000 * 60 * 60)) % 24
        ),

        minutes: Math.floor(
          (distance / (1000 * 60)) % 60
        ),

        seconds: Math.floor(
          (distance / 1000) % 60
        ),
      });
    };

    updateCountdown();

    const interval = setInterval(
      updateCountdown,
      1000
    );

    return () => clearInterval(interval);
  }, [endDate]);

  const countdown = [
    {
      value: timeLeft.days,
      label: "Days",
    },
    {
      value: timeLeft.hours,
      label: "Hours",
    },
    {
      value: timeLeft.minutes,
      label: "Minutes",
    },
    {
      value: timeLeft.seconds,
      label: "Seconds",
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="mx-auto max-w-7xl px-4">

        <div
          className="grid grid-cols-1 overflow-hidden rounded-lg md:grid-cols-2"
          style={{
            backgroundColor:
              backgroundColor || "#000000",
          }}
        >
          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="flex flex-col justify-center p-10 text-white">

            <p className="mb-3 font-semibold text-[#00FF66]">
              Categories
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              {product?.title || "Product Name"}
            </h2>

            {/* OFFER */}

            {offerPercentage && (
              <p className="mt-3 text-2xl font-bold text-[#00FF66]">
                {offerPercentage}% OFF
              </p>
            )}

            {/* COUNTDOWN */}

            <div className="mt-8 flex flex-wrap gap-4">

              {countdown.map((item) => (
                <div
                  key={item.label}
                  className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white text-black"
                >
                  <span className="text-lg font-bold">
                    {String(item.value).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <span className="text-[10px]">
                    {item.label}
                  </span>
                </div>
              ))}

            </div>

            {/* BUTTON */}

            <button
              type="button"
              disabled
              className="mt-8 w-fit rounded-md bg-[#00FF66] px-8 py-3 text-white"
            >
              Buy Now
            </button>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="relative flex items-center justify-center bg-black">

            <div className="relative flex min-h-100 w-full items-center justify-center">

              {/* WHITE GLOW */}

              <div className="absolute h-87.5 w-87.5 rounded-full bg-white/20 blur-3xl" />

              {/* SECOND SOFT LAYER */}

              <div className="absolute h-62.5 w-62.5 rounded-full bg-white/10 blur-2xl" />

              {/* PRODUCT IMAGE */}

              {imageUrl ? (
                <div className="relative z-10 h-80 w-80">
                  <img
                    src={imageUrl}
                    alt={
                      product?.title ||
                      "Product"
                    }
                    // fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]"
                    sizes="320px"
                  />
                </div>
              ) : (
                <div className="relative z-10 flex h-80 w-80 items-center justify-center text-sm text-white/50">
                  No Product Image
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}