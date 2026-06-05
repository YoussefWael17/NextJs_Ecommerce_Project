"use client";

import Link from "next/link";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const linkClass =
    "block px-3 py-2 rounded-md text-gray-500 hover:text-[#DB4444] hover:bg-gray-50 transition";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-black font-medium">My Account</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden border px-3 py-1 rounded text-sm"
        >
          Menu
        </button>
      </div>

      {/* ================= MOBILE DRAWER (FIXED PROPER) ================= */}
      {open && (
        <div className="fixed inset-0 top-0 z-99999 lg:hidden">

          {/* Overlay */}
          <div
            className="fixed top-0 inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed left-0 top-0 h-full w-[80%] max-w-[320px] bg-white p-6 shadow-2xl overflow-y-auto">

            <button
              onClick={() => setOpen(false)}
              className="mb-6 border px-3 py-1 rounded text-sm"
            >
              Close
            </button>

            <h2 className="mb-4 text-[16px] font-medium">Manage My Account</h2>

            <nav className="flex flex-col gap-2 mb-6">
              <Link onClick={() => setOpen(false)} href="/profile" className={linkClass}>
                My Profile
              </Link>
              <Link onClick={() => setOpen(false)} href="/profile/address-book" className={linkClass}>
                Address Book
              </Link>
              <Link onClick={() => setOpen(false)} href="/profile/payment-options" className={linkClass}>
                My Payment Options
              </Link>
            </nav>

            <h2 className="mb-4 text-[16px] font-medium">My Orders</h2>

            <nav className="flex flex-col gap-2 mb-6">
              <Link onClick={() => setOpen(false)} href="/profile/orders/returns" className={linkClass}>
                My Returns
              </Link>
              <Link onClick={() => setOpen(false)} href="/profile/orders/cancellations" className={linkClass}>
                My Cancellations
              </Link>
            </nav>

            <h2 className="text-[16px] font-medium">My Wishlist</h2>

          </div>

        </div>
      )}

      <div className="flex min-h-screen gap-6">

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-1/3 border-r border-gray-200 pr-6">
          <div className="sticky top-6">

            <h2 className="mb-4 text-[16px] font-medium">Manage My Account</h2>

            <nav className="flex flex-col gap-2 mb-6">
              <Link href="/profile" className={linkClass}>My Profile</Link>
              <Link href="/profile/address-book" className={linkClass}>Address Book</Link>
              <Link href="/profile/payment-options" className={linkClass}>My Payment Options</Link>
            </nav>

            <h2 className="mb-4 text-[16px] font-medium">My Orders</h2>

            <nav className="flex flex-col gap-2 mb-6">
              <Link href="/profile/orders/returns" className={linkClass}>My Returns</Link>
              <Link href="/profile/orders/cancellations" className={linkClass}>My Cancellations</Link>
            </nav>

            <h2 className="text-[16px] font-medium">My Wishlist</h2>

          </div>
        </aside>

        

        {/* Content */}
        <main className="w-full lg:w-2/3">
          {children}
        </main>

      </div>

      

    </div>
  );
}
