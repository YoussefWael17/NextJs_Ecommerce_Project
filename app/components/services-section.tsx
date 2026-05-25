"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTruckFast, faHeadset, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function ServicesSection() {
  const services = [
    {
      id: 1,
      icon: faTruckFast,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      id: 2,
      icon: faHeadset,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      id: 3,
      icon: faShieldHalved,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <section className="mx-auto mb-20 mt-30 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="group flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="mb-6 flex h-22 w-22 items-center justify-center rounded-full bg-[#7D8184]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl text-white transition duration-300 group-hover:bg-[#DB4444]">
                <FontAwesomeIcon icon={service.icon} />
              </div>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-[20px] font-semibold text-black">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-[14px] text-black">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}