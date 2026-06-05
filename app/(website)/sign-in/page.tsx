'use client'

import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import * as Yup from 'yup';

import { jwtDecode } from 'jwt-decode';
import { authContext } from '@/app/context/authContext';
import { User } from '@/app/redux/services/adminsApi';

export default function SignInPage() {

  const auth = useContext(authContext);

  const router = useRouter();
  let [errors, setErrors] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  let validationSchema = Yup.object({
    
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
  });

    async function handleLogin(values: any) {
      try {
        setErrors(null);
        setIsLoading(true);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          values
        );

        // console.log(response.data.token);

        localStorage.setItem("userToken", response.data.token)

        const decoded = jwtDecode<User>(response.data.token);

        console.log(decoded)
        
        auth?.setUser(decoded);

        if (response?.status === 200) {
          console.log("Success");
          if (decoded.role === "ADMIN") {
            return router.push("/admin");
          }

          if (decoded.role === "VENDOR") {
            return router.push("/vendor");
          }

          return router.push("/");
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
          email: "",
          password: ""
        },
        validationSchema,
        onSubmit: handleLogin
      })

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
          <form className="space-y-5" onSubmit={formik.handleSubmit}>

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

            <div className="flex items-center justify-between gap-4 pt-4">

              {/* Log In ACCOUNT */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-[50%] rounded bg-[#DB4444] border border-[#DB4444] text-white py-3 hover:bg-white hover:text-[#DB4444] transition duration-300"
              >
                {isLoading ? "Log In Account..." : "Log In"}
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