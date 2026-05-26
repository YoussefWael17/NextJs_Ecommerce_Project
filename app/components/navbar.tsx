"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";

import { faMagnifyingGlass, faCartShopping, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const isLoggedIn = false;

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-gray-300 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-black">
          Cartify
        </h1>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">

          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`text-[16px] font-medium transition ${
                pathname === link.path
                  ? "underline underline-offset-8"
                  : "hover:underline hover:underline-offset-8"
              }`}
            >
              {link.name}
            </Link>
          ))}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 md:gap-5">

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

          {/* Desktop Auth */}
          <div className="hidden md:flex">

            {isLoggedIn ? (
              <div className="flex items-center gap-5 text-[20px] text-black">

                <Link
                  href="/wishlist"
                  className="transition hover:text-[#DB4444]"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </Link>

                <Link
                  href="/cart"
                  className="transition hover:text-[#DB4444]"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>

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
                <Link
                  href="/sign-in"
                  className="rounded-sm text-sm border border-gray-300 px-4 py-2 bg-white text-black shadow hover:bg-black hover:text-white transition duration-300"
                >
                  Log In
                </Link>

                {/* Sign Up */}
                <Link
                  href="/sign-up"
                  className="rounded-sm text-sm border border-[#DB4444] bg-[#DB4444] px-4 py-2 text-white shadow hover:bg-white hover:text-[#DB4444] transition duration-300"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-black md:hidden"
          >
            <FontAwesomeIcon
              icon={isOpen ? faXmark : faBars}
            />
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen
            ? "max-h-[500px] border-t border-gray-200"
            : "max-h-0"
        }`}
      >

        <div className="flex flex-col gap-5 px-6 py-6 bg-white">

          {/* Mobile Search */}
          <div className="relative">

            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md bg-[#F5F5F5] py-3 pl-4 pr-10 text-sm outline-none"
            />

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-4">

            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-[16px] font-medium transition ${
                  pathname === link.path
                    ? "text-[#DB4444]"
                    : "text-black"
                }`}
              >
                {link.name}
              </Link>
            ))}

          </div>

          {/* Mobile Actions */}
          {isLoggedIn ? (
            <div className="flex items-center gap-6 text-xl pt-4">

              <Link href="/wishlist">
                <FontAwesomeIcon icon={faHeart} />
              </Link>

              <Link href="/cart">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>

              <Link href="/profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>

            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-4">

              <Link
                href="/sign-in"
                className="rounded-sm border border-gray-300 px-4 py-3 text-center text-black hover:bg-black hover:text-white transition"
              >
                Log In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-sm border border-[#DB4444] bg-[#DB4444] px-4 py-3 text-center text-white hover:bg-white hover:text-[#DB4444] transition"
              >
                Sign Up
              </Link>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
}