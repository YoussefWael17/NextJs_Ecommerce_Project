"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  // Example
  const isLoggedIn = false;
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-300 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">
          Cartify
        </h1>

        {/* Links */}
        <div className="hidden items-center gap-8 md:flex">

            <Link
                href="/"
                className={`text-[16px] font-medium transition
                ${
                    pathname === "/"
                    ? "underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8"
                }`}
            >
                Home
            </Link>

            <Link
                href="/shop"
                className={`text-[16px] font-medium transition
                    ${
                        pathname === "/shop"
                        ? "underline underline-offset-8"
                        : "hover:underline hover:underline-offset-8"
                    }`}          
                >
                Shop
            </Link>

            <Link
                href="/about"
                className={`text-[16px] font-medium transition
                ${
                    pathname === "/about"
                    ? "underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8"
                }`}
            >
                About
            </Link>

            <Link
                href="/contact"
                className={`text-[16px] font-medium transition
                ${
                    pathname === "/contact"
                    ? "underline underline-offset-8"
                    : "hover:underline hover:underline-offset-8"
                }`}
            >
                Contact
            </Link>

        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-64 rounded-md bg-[#F5F5F5] py-2 pl-4 pr-10 text-sm outline-none"
            />

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Ternary */}
          {isLoggedIn ? (
            <div className="flex items-center gap-5 text-[20px] text-black">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="transition hover:text-[#DB4444]"
              >
                <FontAwesomeIcon icon={faHeart} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="transition hover:text-[#DB4444]"
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>

              {/* Account */}
              <Link
                href="/profile"
                className="transition hover:text-[#DB4444]"
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
                {/* Log In */}
                <button className="rounded-sm text-sm rounded border border-gray-300 px-4 py-2 bg-white text-black shadow hover:bg-black hover:text-white transition duration-300 cursor-pointer">
                    <Link href={"/sign-in/"} >
                        Log In
                    </Link>
                </button>
         
                {/* Sign Up */}
                <button className="rounded-sm text-sm border border-[#DB4444] bg-[#DB4444] px-4 py-2 text-white shadow hover:bg-white hover:text-[#DB4444] transition duration-300 cursor-pointer">
                    <Link href={"/sign-up/"} >
                        Sign Up 
                    </Link>
                </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}