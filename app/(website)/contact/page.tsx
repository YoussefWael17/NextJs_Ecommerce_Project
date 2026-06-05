import Link from "next/link";
import React from "react";

import {
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="mx-auto mt-20 w-full max-w-7xl px-4 py-10 pb-26">

      {/* Breadcrumb */}
      <div className="mb-10 flex items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="transition hover:text-black">
          Home
        </Link>

        <span>/</span>

        <span className="font-medium text-black">
          Contact
        </span>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3">
          <div className="space-y-6">

            {/* Call Us */}
            <div className="rounded-md border border-gray-200 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-white">
                  <FaPhoneAlt size={14} />
                </div>

                <h3 className="text-lg font-semibold text-black">
                  Call To Us
                </h3>
              </div>

              <p className="mb-2 text-sm text-gray-600">
                We are available 24/7, 7 days a week.
              </p>

              <p className="text-sm font-medium text-black">
                Phone: +20 123 456 7890
              </p>
            </div>

            {/* Write To Us */}
            <div className="rounded-md border border-gray-200 p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-white">
                  <FaEnvelope size={14} />
                </div>

                <h3 className="text-lg font-semibold text-black">
                  Write To Us
                </h3>
              </div>

              <p className="mb-2 text-sm text-gray-600">
                Fill out our form and we will contact you within 24 hours.
              </p>

              <p className="text-sm font-medium text-black">
                customer@Cartify.com
              </p>

              <p className="mt-1 text-sm font-medium text-black">
                support@Cartify.com
              </p>
            </div>

          </div>
        </aside>

        {/* Contact Form */}
        <main className="w-full lg:w-2/3">
          <div className="rounded-md bg-white p-6 shadow-md md:p-10">

            <form className="space-y-6">

              {/* Inputs */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 outline-none transition"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 outline-none transition"
                />

                <input
                  type="text"
                  placeholder="Your Phone"
                  className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 outline-none transition"
                />
              </div>

              {/* Message */}
              <textarea
                rows={7}
                placeholder="Your Message"
                className="w-full resize-none rounded-md bg-[#F5F5F5] px-4 py-3 outline-none transition"
              />

              {/* Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md border border-[#DB4444] bg-[#DB4444] px-8 py-3 font-medium text-white transition duration-300 hover:bg-white hover:text-[#DB4444]"
                >
                  Send Message
                </button>
              </div>

            </form>
          </div>
        </main>

      </div>
    </div>
  );
}