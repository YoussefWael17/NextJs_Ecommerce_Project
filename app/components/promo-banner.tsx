"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getImageUrl } from "@/app/admin/utils/getImageUrl";
import { useGetPromoBannersQuery } from "../redux/services/promoBannerApi";

export default function PromoBanner() {
  const {
    data,
    isFetching,
    isLoading,
    isError,
  } = useGetPromoBannersQuery();

  const promoBanners = data?.data ?? [];

  // Get the first active promo banner
  const promo = promoBanners[0];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!promo) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();

      const start = new Date(promo.startDate).getTime();
      const end = new Date(promo.endDate).getTime();

      // Promo hasn't started yet
      if (now < start) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      // Promo has ended
      if (now >= end) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      const difference = end - now;

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    };

    calculateTimeLeft();

    const interval = setInterval(
      calculateTimeLeft,
      1000
    );

    return () => clearInterval(interval);
  }, [promo]);

  // Loading
  if (isLoading || isFetching) {
    return (
      <section className="w-full py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-105 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  // Error
  if (isError) {
    return null;
  }

  // No active promo
  if (!promo) {
    return null;
  }

  const product = promo.product;

  const productImage = product.thumbnail || "";

  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden"
          style={{
            backgroundColor:
              promo.backgroundColor || "#000000",
          }}
        >
          {/* LEFT SIDE */}
          <div className="p-10 flex flex-col justify-center text-white">
            <p className="text-[#00FF66] font-semibold mb-3">
              Categories
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {product.title}
            </h2>

            {/* COUNTDOWN */}
            <div className="flex gap-4 mt-8 flex-wrap">
              <CountdownItem
                value={timeLeft.hours}
                label="Hours"
              />

              <CountdownItem
                value={timeLeft.days}
                label="Days"
              />

              <CountdownItem
                value={timeLeft.minutes}
                label="Minutes"
              />

              <CountdownItem
                value={timeLeft.seconds}
                label="Seconds"
              />
            </div>

            {/* BUTTON */}
            <Link
              href={`/products/${product.slug}`}
              className="
                mt-8
                bg-[#00FF66]
                hover:bg-red-600
                transition
                text-white
                px-8
                py-3
                rounded-md
                w-fit
              "
            >
              Buy Now
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center justify-center bg-black">
            <div className="relative flex items-center justify-center bg-black w-full h-full min-h-80">
              {/* WHITE GLOW */}
              <div
                className="
                  absolute
                  w-87.5
                  h-87.5
                  bg-white/20
                  blur-3xl
                  rounded-full
                "
              />

              {/* SECOND SOFT LAYER */}
              <div
                className="
                  absolute
                  w-62.5
                  h-62.5
                  bg-white/10
                  blur-2xl
                  rounded-full
                "
              />

              {/* PRODUCT IMAGE */}
              {productImage && (
                <img
                  src={getImageUrl(productImage)}
                  alt={product.title}
                  className="
                    relative
                    z-10
                    h-80
                    max-w-[90%]
                    object-contain
                    drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]
                  "
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CountdownItemProps {
  value: number;
  label: string;
}

function CountdownItem({
  value,
  label,
}: CountdownItemProps) {
  return (
    <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
      <span className="text-lg font-bold">
        {String(value).padStart(2, "0")}
      </span>

      <span className="text-xs">
        {label}
      </span>
    </div>
  );
}