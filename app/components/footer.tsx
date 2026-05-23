import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        {/* Logo */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Cartify
          </h2>

          <p className="text-sm text-gray-400">
            Subscribe to get updates and offers.
          </p>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-4 font-semibold">
            Support
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>Cairo, Egypt</li>
            <li>exclusive@gmail.com</li>
            <li>+20 100 000 0000</li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="mb-4 font-semibold">
            Account
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm text-gray-400">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © Copyright Exclusive 2025. All rights reserved
      </div>
    </footer>
  );
}