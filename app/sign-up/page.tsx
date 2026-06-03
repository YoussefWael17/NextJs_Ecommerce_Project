'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import Script from 'next/script';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';



export default function SignUpPage() {

  const router = useRouter();
  let [errors, setErrors] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Minimum 3 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be at most 30 characters")
      .matches(
        /^[a-zA-Z0-9]{6,30}$/,
        "Password must be 6-30 characters and contain only letters and numbers"
      ),

    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

    async function handleRegister(values: any) {
      try {
        setErrors(null);
        setIsLoading(true);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          values
        );

        // console.log(response);

        response?.status

        if (response?.status === 201) {
          // console.log("Success");
          router.push("/sign-in");
        }
      } catch (err: any) {
        setErrors(err.response?.data);
        console.log(errors)
      } finally {
        setIsLoading(false);
      }
    }

      let formik = useFormik({
        initialValues:{
          name: "",
          email: "",
          password: "",
          rePassword: ""
        },
        validationSchema,
        onSubmit: handleRegister
      })




  const initialized = useRef(false)

  const handleResponse = async (response: any) => {

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
          <form className="space-y-5" onSubmit={formik.handleSubmit}>

            {/* NAME */}
            <div>
              <input
                name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}  
                type="text"
                placeholder="Enter Your Name"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
                {formik.errors.name && formik.touched.name ? (
                  <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {formik.errors.name}
                  </div>
                  ) : null
                }
            </div>

            {/* EMAIL */}
            <div>
              <input
                name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  
                type="email"
                placeholder="Enter Your Email"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
                {formik.errors.email && formik.touched.email ? (
                  <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {formik.errors.email}
                  </div> 
                  ) : null
                }
            </div>

            {/* PASSWORD */}
            <div>
              <input
                name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}  
                type="password"
                placeholder="Enter Your Password"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
                {formik.errors.password && formik.touched.password ? (
                  <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {formik.errors.password}
                  </div> 
                  ) : null
                }
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <input
                name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}  
                type="password"
                placeholder="Confirm your password"
                className="w-full border-b border-gray-300 px-4 py-3 outline-none focus:border-black transition"
              />
               {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                    {formik.errors.rePassword}
                  </div> 
                  ) : null
                }
            </div>

            <div className="space-y-3">

              {/* CREATE ACCOUNT */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded bg-[#DB4444] border border-[#DB4444] text-white py-3 hover:bg-white hover:text-[#DB4444] transition duration-300"
              >
                 {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              {/* GOOGLE BUTTON */}
              <button
                type="button"
                disabled={isLoading}
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
