import React from "react";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-4xl py-10 px-20 shadow-md">
      <div className="bg-white">
        <h1 className="mb-4 text-[20px] font-medium text-[#DB4444]">
          Edit Your Profile
        </h1>

        <form className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full bg-[#F5F5F5] rounded-md px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full bg-[#F5F5F5] rounded-md px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email & Address */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-[#F5F5F5] rounded-md px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full bg-[#F5F5F5] rounded-md px-4 py-3 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password Section */}
          <div>
            <h2 className="mb-2 block text-sm font-medium text-gray-700">
              Password Changes
            </h2>

            <div className="grid grid-cols-1 gap-3 ">
              <div>
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full bg-[#F5F5F5] rounded-md px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full bg-[#F5F5F5] rounded-md px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full bg-[#F5F5F5] rounded-md px-4 py-3 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-6 py-3 font-medium text-gray-700 transition duration-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-[#DB4444] border border-[#DB4444] px-6 py-3 font-medium text-white transition duration-300 hover:bg-white hover:text-[#DB4444]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}