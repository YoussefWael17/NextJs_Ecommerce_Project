'use client'

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Script from 'next/script';

export default function SignUpPage() {

  const initialized = useRef(false)

  const handleResponse = async (response: any) => {
  // console.log("ID TOKEN:", response.credential)

  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
    token: response.credential  
  })
}

  useEffect(() => {
  const interval = setInterval(() => {
    const google = (window as any).google

    if (!google || initialized.current) return

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleResponse,
    })

    const buttonDiv = document.getElementById("google-hidden-btn")

    if (buttonDiv) {
      google.accounts.id.renderButton(buttonDiv, {
        theme: "outline",
        size: "large",
      })
    }

    initialized.current = true
    clearInterval(interval)
  }, 100)

  return () => clearInterval(interval)
}, [])
  

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* Google Script */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />

      {/* LEFT SIDE IMAGE */}
      <div className="relative hidden lg:block h-screen w-full py-15">
        <img
            src="https://plus.unsplash.com/premium_photo-1681487791907-7013a2b375af?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="signup"
            className="w-full h-full object-ccover"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center bg-white px-6 py-30 md:py-10">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <h2 className="text-4xl font-bold text-black mb-6">
            Create an account
          </h2>

          <p className="text-black text-[16px] mb-12">
            Enter your details below
          </p>

          {/* FORM */}
          <form className="space-y-5">

            {/* NAME */}
            <div>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
            </div>

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

            {/* CONFIRM PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
            </div>

            <div className="space-y-3">

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                className="w-full rounded bg-[#DB4444] border border-[#DB4444] text-white py-3 hover:bg-white hover:text-[#DB4444] transition duration-300"
              >
                Create Account
              </button>

              {/* GOOGLE BUTTON */}
              <button
                type="button"
                onClick={() => {
                  const googleButton = document.querySelector(
                    '#google-hidden-btn div[role="button"]'
                  ) as HTMLElement

                  googleButton?.click()
                }}
                className="w-full flex items-center justify-center gap-3 rounded border border-gray-300 bg-white text-black py-3 hover:bg-black hover:text-white transition duration-300"
              >
                <FcGoogle className="text-lg" />
                <span>Sign up with Google</span>
              </button>

              <div id="google-hidden-btn" className="hidden"></div>             

            </div>
            

          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="text-black font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
