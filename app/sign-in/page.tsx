'use client'

import Link from 'next/link'
import React from 'react'
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE IMAGE */}
      <div className="relative hidden lg:block h-screen w-full py-15">
        <img
            src="https://plus.unsplash.com/premium_photo-1681487791907-7013a2b375af?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="signup"
            className="w-full h-full object-ccover"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center bg-white px-6 py-10 ">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <h2 className="text-4xl font-bold text-black mb-6">
            Log in to Cartify
          </h2>

          <p className="text-black text-[16px] mb-12">
            Enter your details below
          </p>

          {/* FORM */}
          <form className="space-y-5">

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
            </div>

            <div className="flex items-center justify-between gap-4 pt-4">

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className="w-[50%] rounded bg-[#DB4444] border border-[#DB4444] text-white py-3 hover:bg-white hover:text-[#DB4444] transition duration-300"
              >
                Log In
              </button>

              <Link
                href="/forget-password"
                className="text-[#DB4444] hover:underline text-sm"
              >
                Forget Password?
              </Link>

            </div>
            

          </form>

          {/* SIGN UP LINK */}
          <p className="text-gray-500 mt-10">
            Don’t have an account?{' '}

            <Link
              href="/sign-up"
              className="text-black font-semibold hover:underline"
            >
              Sign Up
            </Link>

          </p>

        </div>
      </div>
    </div>
  )
}