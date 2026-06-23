"use client"
import Link from 'next/link'
import React from 'react'

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center bg-white py-10 ">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <h2 className="text-[54px] font-semibold text-black mb-6">
            Our Story
          </h2>

          <p className="text-black text-[16px] mb-6">
            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
          </p>

          <p className="text-black text-[16px] mb-12">
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
          </p>


        </div>
      </div>

      {/* LEFT SIDE IMAGE */}
      <div className="relative hidden lg:block h-full w-full ">
        <img
            src="https://images.unsplash.com/photo-1713693212309-acdbf3a3feb4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="signup"
            className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
